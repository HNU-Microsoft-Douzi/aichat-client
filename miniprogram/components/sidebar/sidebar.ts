// components/sidebar.ts
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        side: {//滑动操作
            newopen: true,//判断侧边栏是否打开-显示
        },
        restUsageNum: 0,
        isExchangePopupVisible: false,
        exchangeCodeInputValue: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onLoad() {
            const that = this;
            const app = getApp();
            const db = app.globalData.db;
            db.collection('user_rate_limit').where({
                _openid: app.globalData.openId
            }).get().then(response => {
                that.setData({
                    restUsageNum: response.data[0].conversation_remaining_usage_count
                })
            });
        },
        /**
         * 点击灰色遮罩
         */
        clickGreyMask: function () {
            console.info(`clickGreyMask: isExchangePopupVisible ${this.data.isExchangePopupVisible}`)
            // 这里需要检查，只要有一个弹窗是显示状态，就只针对它进行关闭
            if (this.data.isExchangePopupVisible) {
                this.setData({
                    isExchangePopupVisible: false
                })
            } else {
                this.setData({
                    'side.newopen': !this.data.side.newopen
                })
            }
        },

        /**
         * 点击签到按钮
         */
        clickSignInText() {
            const that = this;
            const app = getApp()
            const db = app.globalData.db;
            const now = new Date()
            const year = now.getFullYear()
            const month = now.getMonth() + 1
            const day = now.getDate()
            const date = `${year}-${month}-${day}`
            db.collection('sign_in_award').where({
                _openid: app.globalData.openId,
                date: date
            }).get().then(response => {
                if (response.data[0]) {
                    wx.showToast({ title: '今日已经签过啦', icon: 'none', duration: 2000, });
                } else {
                    console.info(`没有找到签到记录`);
                    that.insertSignInRecord(date);
                }
            }, err => {
                console.info(`没有找到签到记录, ${err}`)
                that.insertSignInRecord(date);
            });
        },

        /**
         * 向db中加入签到记录
         */
        insertSignInRecord(date) {
            const app = getApp()
            const db = app.globalData.db;
            const that = this;
            const min = 10;
            const max = 30;
            const random = Math.floor(Math.random() * (max - min + 1)) + min;
            db.collection('sign_in_award').add({
                data: { date: date },
                success: function (res) {
                    that.updateUserUsageCount((userUsageNum) => {
                        that.setData({
                            restUsageNum: userUsageNum
                        })
                        wx.showToast({ title: '签到成功', icon: 'success', duration: 2000, });
                    }, random)
                },
                fail: function (err) {
                    console.error(err)
                    wx.showToast({ title: '签到失败', icon: 'error', duration: 2000, });
                }
            })
        },

        updateUserUsageCount(success: (arg0: number) => void, num) {
            const app = getApp()
            const db = app.globalData.db;
            db.collection("user_rate_limit").where({ _openid: getApp().globalData.openId }).get().then(res => {
                const doc = res.data[0]
                if (doc === undefined) {
                    wx.showToast({ title: '兑换失败', icon: 'error', duration: 2000, });
                    return;
                }
                const conversation_remaining_usage_count: number = doc.conversation_remaining_usage_count + num;
                db.collection("user_rate_limit").where({ _openid: getApp().globalData.openId }).update({
                    data: {
                        conversation_remaining_usage_count: conversation_remaining_usage_count
                    },
                    success: function (res) {
                        success(conversation_remaining_usage_count);
                    }
                });
            });
        },
        /**
         * 打开边界栏
         */
        show: function () {
            console.info(`sidebar show`)
            if (this.data.side.newopen === false) {
                return
            }
            const that = this;
            const app = getApp()
            const db = app.globalData.db;
            db.collection('user_rate_limit').where({
                _openid: app.globalData.openId
            }).get().then(response => {
                that.setData({
                    restUsageNum: response.data[0].conversation_remaining_usage_count
                })
            });
            this.setData({ 'side.newopen': false, isExchangePopupVisible: false });
        },

        clickCodeExchange() {
            this.setData({ isExchangePopupVisible: true, 'side.newopen': true });
        },

        hidePopup() {
            this.setData({ isExchangePopupVisible: false });
        },

        stopPropagation(e) {
            // 阻止事件冒泡
        },

        onInput(e) {
            this.setData({ exchangeCodeInputValue: e.detail.value });
        },

        onConfirm() {
            if (this.data.exchangeCodeInputValue) {
                const cdKeyCode = this.data.exchangeCodeInputValue;
                const db = getApp().globalData.db
                const cdkeyCollection = db.collection('CDKEY')
                const that = this;
                cdkeyCollection.where({
                    cdkey: cdKeyCode
                }).get().then(res => {
                    if (res === undefined || res.data[0] === undefined) {
                        wx.showToast({
                            title: '兑换码错误',
                            icon: 'error',
                            duration: 2000,
                        });
                        return;
                    }
                    const doc = res.data[0]
                    console.info(`data: ${JSON.stringify(doc)}`)
                    const remainNum = doc.num;
                    const consumeState = doc.consume_state;
                    if (consumeState) {
                        // 兑换码已经被使用
                        wx.showToast({
                            title: '兑换码无效',
                            icon: 'error',
                            duration: 2000,
                        });
                    } else {
                        // TODO, 给用户增加使用次数
                        that.updateUserUsageCount((userUsageNum) => {
                            console.log(`兑换码核销成功`)
                            cdkeyCollection.where({ cdkey: cdKeyCode }).update({ data: { consume_state: true, open_id: getApp().globalData.openId } })
                            wx.showToast({ title: '兑换成功', icon: 'success', duration: 2000, });
                            that.data.restUsageNum = userUsageNum;
                        }, remainNum);
                    }
                });
                this.hidePopup();
                this.data.isExchangePopupVisible = false;
            } else {
                wx.showToast({
                    title: '请输入内容',
                    icon: 'error',
                    duration: 2000,
                });
            }
        },
        clickAudioSetting: function () {
            console.info(`clickAudioSetting`)
            const audioSetting = this.selectComponent('#audio-setting');
            audioSetting.show()
            this.setData({
                'side.newopen': true
            })
        },
        onVisibleChange(e) {
            this.setData({
                qrCodePopVisible: e.detail.visible,
            });
        },
        onClose() {
            this.setData({
                qrCodePopVisible: false,
            });
        },
        clickQrCode() {
            this.setData({
                'side.newopen': true,
                qrCodePopVisible: true
            })
        }
    }
})
