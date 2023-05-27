import { VoiceRecordManage } from "./recordManage"

const recordModule = require("recordManage")
// pages/chat/chat.ts

const textContainerPaddingBottomSize = 20
const textContainerPaddingBottomUpWithKeyboard = 5

// TODO, 用户发音后，能否对用户的发音进行评分和校准？
Page({
    /**
     * 页面的初始数据
     */
    data: {
        inputMode: true,
        showUserTextView: false,
        voiceRecorder: null,
        startPoint: { clientX: 0, clientY: 0 },
        userConfirmText: "",
        inputValue: "",
        textContainerBottom: 0,
        textContainerPaddingBotton: textContainerPaddingBottomSize,
        rippleStyle: '',
        hideVoiceCurveLine: true,
        hideLongPressButton: false,
        hideLongPressText: false,
        hideLoaddingDialog: true,
        hideButtonWave: true,
        longPressButtonParams: {
            centerX: 0,
            centerY: 0,
            radius: 0
        },
        curveAniComponent: null,
        buttonWaveAniComponent: null,
    },

    /**
     * 长按事件
     */
    pressLongVoiceButton: function (e: { touches: { clientX: number, clientY: number }[] }) {
        console.info("pressLongVoiceButton" + e.touches[0].clientY)

        wx.vibrateShort({ type: "medium" })
        this.data.startPoint = e.touches[0]; // 记录长按时开始点信息，后面用于计算上划取消时手指滑动的距离。
        const vR: VoiceRecordManage = this.data.voiceRecorder;
        if (vR) {
            vR.getUsageCount().then(userUsageCount => {
                if (userUsageCount > 0) {
                    this.startPlayWaveAnim()
                    vR.stopAudioPlay()
                    vR.startRecord();
                } else {
                    wx.showToast({
                        title: '剩余次数不足，请使用兑换码兑换',
                        icon: 'error',
                        duration: 2000
                    });
                }
            })
        }
    },

    onTouchStart() {
        console.info("onTouchStart")
        this.setData({
            hideLongPressText: true
        })
    },

    onTouchMoved: function (e: { touches: { clientX: number, clientY: number }[] }) {  // TODO, weszhang, 这里不知道为什么暂时没用
        var x = e.touches[0].clientX;
        var y = e.touches[0].clientY;
        console.info(`x: ${x}, y: ${y}`)
        this.data.rippleStyle = 'top:' + y + 'px;left:' + x + 'px;animation: ripple 0.5s linear;'
        this.setData({
            rippleStyle: ''
        })
        //touchmove时触发
        const vr: any = this.data.voiceRecorder;
        const distance = Math.sqrt(Math.pow(x - this.data.longPressButtonParams.centerX, 2) + Math.pow(y - this.data.longPressButtonParams.centerY, 2));
        console.info(`distance: ${distance}`)
        if (vr) {
            const curveChild: any = this.data.curveAniComponent;
            const buttonWaveChild: any = this.data.buttonWaveAniComponent;
            if (distance <= this.data.longPressButtonParams.radius) {
                // 触控点在圆形按钮范围内
                if (curveChild) {
                    curveChild.changeText("松开发送")
                }
                if (buttonWaveChild) {
                    buttonWaveChild.setActivateState(true);
                }
                vr.startSendMsg()
            } else {
                // 触控点不在圆形按钮范围内
                if (curveChild) {
                    curveChild.changeText("松开取消发送")
                }
                if (buttonWaveChild) {
                    buttonWaveChild.setActivateState(false);
                }
                vr.stopSendMsg()
            }
        }
    },

    onTouchEnd: function () {
        console.log('onTouchEnd, stop recordManager')
        // wx.hideToast()
        const vr: VoiceRecordManage = this.data.voiceRecorder
        if (vr) {
            console.info(`onTouchEnd stopRecord`)
            vr.stopRecord()
        }
        this.showAiTextView();
        this.setData({
            hideVoiceCurveLine: true,
            hideButtonWave: true,
            hideLongPressText: false,
        })
    },

    clickMenuButton: function () {
        wx.vibrateShort({ type: "medium" })
        const menuButton = this.selectComponent('#menu-bar');
        menuButton.show()
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        console.log("onLoad")
        const page = this
        const vR = new recordModule.VoiceRecordManage(({
            onError(errorMsg: string) {
                console.error(errorMsg)
                page.showAiTextView()
                // 关闭录音动画
                page.setData({
                    hideVoiceCurveLine: true
                })
                const child = page.selectComponent('#curve-wave-view');
                child.pause()
            },
            onStart() {

            },
            onEnd() {
                page.showAiTextView()
                page.setData({
                    hideVoiceCurveLine: true

                })
                // 关闭录音动画
                const child = page.selectComponent('#curve-wave-view');
                child.pause()
            }
        }), ({
            onError(errorMsg: string) {
                page.setSentences(['抱歉，你的网络好像不太好'])
                page.showAiTextView()
                page.setData({
                    hideLoaddingDialog: true,
                    hideLongPressButton: false
                })
            },
            onStartDownload() {
                page.hideAiTextView()
                page.setData({
                    hideLoaddingDialog: false,
                    hideLongPressButton: true,
                    hideLongPressText: true
                })
            },
            onGetWholeTextArray(sentences: [string], urls: [string]) {
                console.info("sentences:" + sentences)
                console.info(sentences)
                page.setSentences(sentences, urls)
                page.showAiTextView()
                page.setData({
                    hideLoaddingDialog: true,
                    hideLongPressButton: false,
                    hideLongPressText: false
                });
            },
            onTraverseIndex(index: number) {
                console.info("onTraverseIndex: " + index)
                page.highlightSentence(index)
            }
        }))
        this.data.voiceRecorder = vR;
        vR.authJudge()

        // 触控点在圆形按钮范围内
        this.data.curveAniComponent = page.selectComponent('#curve-wave-view');
        this.data.buttonWaveAniComponent = page.selectComponent('#button-wave-view');
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        const page = this;
        // 注意，这里必须要做一个延时，不然button的参数获取是相对于bottom-container呢，似乎300ms可以确保按钮组件渲染到正确的位置
        setTimeout(() => {
            // 在下一个时间片执行的回调函数
            const subQuery = wx.createSelectorQuery()
            subQuery.select('.chat-button').boundingClientRect()
            subQuery.selectViewport().scrollOffset()
            subQuery.exec(function (rect) {
                console.info(`按钮top: ${rect[0].top}`)
                const voiceButtonTop = rect[0].top
                console.log(rect)
                page.data.longPressButtonParams.centerX = rect[0].left + rect[0].width / 2;
                page.data.longPressButtonParams.centerY = voiceButtonTop + rect[0].height / 2;
                page.data.longPressButtonParams.radius = rect[0].width / 2
                console.info(`底部长按按钮参数: centerX ${page.data.longPressButtonParams.centerX} centerY ${page.data.longPressButtonParams.centerY} radius ${page.data.longPressButtonParams.radius}`)
            });
        }, 500)
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        wx.showToast({
            title: `iC: ${getApp().globalData.inviteCode}`,
            icon: 'success',
            duration: 2000
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    //设置右上角分享
    setShareAppMessage: function (args) {
        //分享标题
        var title = args.title || "语伴听说"
        const database = getApp().globalData.db;
        var path = '/pages/chat/chat'
        database.collection(getApp().globalData.share_table_name).where({
            _openid: getApp().globalData.openId
        }).get().then(res => {
            // res.data 包含该记录的数据
            const inviteCode = res.data[0].inviate_code
            console.log(`查询记录成功， 用户邀请码为: ${inviteCode}`)
            path += `?inviteCode=${inviteCode}`
        }, err => {
            console.error(`onShareAppMessage 获取用户邀请码失败`, err)
            console.error(err)
        });
        if (args.sharefrom === 'button') {
            //来自页面内转发按钮
            console.log(args.target)
        }
        return {
            title: title,
            path: path,
            success: function (res) {
                // 转发成功
                if (typeof args.success == "function") {
                    args.success(res);
                }
            },
            fail: function (res) {
                // 转发失败
                if (typeof args.fail == "function") {
                    args.fail(res);
                }
            }
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage(res) {
        return this.setShareAppMessage({
            //转发来源
            sharefrom: res.from
        })
    },

    //格式化录音时间
    fmtRecoderTime(duration = 0) {
        duration = duration / 1000;
        const seconds = duration.toString().split(".")[0]; //取秒
        return Number(seconds);
    },

    //提示弹窗
    tip(msg: string) {
        wx.showModal({
            title: "提示",
            content: msg,
            showCancel: false
        });
    },

    //输入聚焦
    foucus: function (e) {
        var that = this;
        this.hideAiTextView()
        that.setData({
            textContainerBottom: e.detail.height,
            textContainerPaddingBotton: textContainerPaddingBottomUpWithKeyboard,
            textContainerBgColor: "#ffefef86"
        })
    },

    //失去聚焦
    blur: function (e) {
        this.setData({
            textContainerBottom: 0,
            textContainerPaddingBotton: textContainerPaddingBottomSize,
            textContainerBgColor: "#f1eded86"
        })
        this.showAiTextView()
    },

    aiImageViewClickEvent: function () {
        console.info('aiImageViewClickEvent')
        this.reverseAiTextViewShowState()
    },

    startPlayWaveAnim: function () {
        console.info(`startPlayCurveWaveAnim`)
        this.setData({
            hideVoiceCurveLine: false,
            hideButtonWave: false,
            showAiTextView: false
        })
        // 展示录音动画
        const curve: any = this.data.curveAniComponent;
        curve.play();
        const buttonwave: any = this.data.buttonWaveAniComponent;
        buttonwave.setActivateState(true);
    },

    setSentences(sentences: [string], filenames: [string]) {
        const textGroup = this.selectComponent('#ai-text-group');
        textGroup.setSentences(sentences, filenames)
    },

    highlightSentence(index: number) {
        const textGroup = this.selectComponent('#ai-text-group');
            textGroup.highlight(index)

    },

    showAiTextView() {
        const textGroup = this.selectComponent('#ai-text-group');
        textGroup.show()
    },

    hideAiTextView() {
        const textGroup = this.selectComponent('#ai-text-group');
        textGroup.hide()
    },

    reverseAiTextViewShowState() {
        const textGroup = this.selectComponent('#ai-text-group');
        textGroup.reverseAiTextViewShowState()
    }
})