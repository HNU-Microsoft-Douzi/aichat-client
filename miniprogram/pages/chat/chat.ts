const recordModule = require("recordManage")
const request = require("request")
// pages/chat/chat.ts

const textContainerPaddingBottomSize = 20
const textContainerPaddingBottomUpWithKeyboard = 5

Page({
    /**
     * 页面的初始数据
     */
    data: {
        inputMode: true,
        showAiTextView: false,
        showUserTextView: false,
        aiTextArray: [""],
        aiInitText: [{}],
        voiceRecorder: null,
        startPoint: { clientX: 0, clientY: 0 },
        userConfirmText: "",
        inputValue: "",
        textContainerBottom: 0,
        textContainerPaddingBotton: textContainerPaddingBottomSize,
        rippleStyle: '',
        hideVoiceCurveLine: true,
        hideLongPressText: false,
        hideLoaddingDialog: true,
        longPressButtonParams: {
            centerX: 0,
            centerY: 0,
            radius: 0
        },
    },

    clickCircleVoiceButton: function () {
        this.setData({
            inputMode: !this.data.inputMode,
            showUserTextView: !this.data.showUserTextView
        })
    },

    clickVoiceButton: function () {
        // 获取输入框的内容
        console.log("clickVoiceButton")
        this.setData({
            inputMode: !this.data.inputMode,
            showUserTextView: !this.data.showUserTextView
        }
        )
        if (this.data.inputMode == false) {
            const page = this
            // 这个时候先让ai进行提问，后面这一部分的内容抽离到组件中去
            wx.request({
                url: 'https://www.learnaitutorenglish.club/chat', //仅为示例，并非真实的接口地址
                data: {
                    text: "Now let's start practicing, you could ask me a question first"
                },
                timeout: 30000,
                header: {
                    'content-type': 'application/json' // 默认值
                },
                success(res) {
                    // wx.hideLoading()
                    const { result } = res.data
                    console.log(`clickVoiceButton result: ${result}`)
                    page.setData({
                        aiInitText: page.generateAiText(-1, [result]),
                        showAiTextView: true
                    })
                },
                fail(res) {
                    console.error(res.errMsg)
                    page.setData({
                        aiInitText: page.generateAiText(-1, ["抱歉，你的网络好像不太好"]),
                        showAiTextView: true
                    })
                    // wx.hideLoading()
                }
            })
        }
    },

    userConfirmMessage: function (event: { detail: { value: any } }) {
        const that = this
        request.sendUserTextToService(event.detail.value, ({
            onStart() {
                that.setData({
                    showAiTextView: false,
                    userConfirmText: event.detail.value,
                    hideLoaddingDialog: false,
                    inputValue: ''
                })
            },
            onSuccess(text: string) {
                that.setData({
                    aiInitText: that.generateAiText(-1, [text]),
                    showAiTextView: true,
                    hideLoaddingDialog: true
                })
            },
            onFail() {
                that.setData({
                    aiInitText: that.generateAiText(-1, ["抱歉，你的网络好像不太好"]),
                    showAiTextView: true
                })
            }
        }))
    },

    /**
     * 长按事件
     */
    pressLongVoiceButton: function (e: { touches: { clientX: number, clientY: number }[] }) {
        console.info("pressLongVoiceButton" + e.touches[0].clientY)
        this.data.startPoint = e.touches[0]; // 记录长按时开始点信息，后面用于计算上划取消时手指滑动的距离。
        const vR: VoiceRecordManage = this.data.voiceRecorder;
        if (vR) {
            vR.startRecord();
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
        const page = this;
        const vr: VoiceRecordManage = this.data.voiceRecorder;
        const distance = Math.sqrt(Math.pow(x - this.data.longPressButtonParams.centerX, 2) + Math.pow(y - this.data.longPressButtonParams.centerY, 2));
        console.info(`distance: ${distance}`)
        if (vr) {
            if (distance <= this.data.longPressButtonParams.radius) {
                // 触控点在圆形按钮范围内
                const child = page.selectComponent('#curve-wave-view');
                child.changeText("松开发送")
                vr.startSendMsg()
            } else {
                // 触控点不在圆形按钮范围内
                const child = page.selectComponent('#curve-wave-view');
                child.changeText("松开取消发送")
                vr.stopSendMsg()
            }
        }
    },

    onTouchEnd: function () {
        console.log('onTouchEnd, stop recordManager')
        // wx.hideToast()
        const vr: VoiceRecordManage = this.data.voiceRecorder
        if (vr) {
            vr.stopRecord()
        }
        this.setData({
            hideVoiceCurveLine: true,
            hideLongPressText: false
        })
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
                // 关闭录音动画
                page.setData({
                    hideVoiceCurveLine: true
                })
                const child = page.selectComponent('#curve-wave-view');
                child.pause()
            },
            onStart() {
                page.setData({
                    hideVoiceCurveLine: false
                })
                // 展示录音动画
                const child = page.selectComponent('#curve-wave-view');
                child.play()
                console.log(child)
            },
            onEnd() {
                page.setData({
                    hideVoiceCurveLine: true
                })
                // 关闭录音动画
                const child = page.selectComponent('#curve-wave-view');
                child.pause()
            }
        }), ({
            onError(errorMsg: string) {
                page.setData({
                    aiInitText: page.generateAiText(-1, ["抱歉，你的网络好像不太好"]),
                    showAiTextView: true
                })
            },
            onStartDownload() {
                page.setData({
                    hideLoaddingDialog: false
                })
            },
            onGetWholeTextArray(textArray: Array<string>) {
                console.info("textArray:")
                console.info(textArray)
                page.setData({
                    aiTextArray: textArray,
                    aiInitText: page.generateAiText(-1, textArray),
                    showAiTextView: true,
                    hideLoaddingDialog: true
                });
            },
            onTraverseIndex(index: number) {
                console.info("onTraverseIndex: " + index)
                page.setData({
                    aiInitText: page.generateAiText(index, page.data.aiTextArray)
                })
            }
        }))
        this.data.voiceRecorder = vR;
        vR.authJudge()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        // TODO, weszhang, 这里获取到的rect的左上
        const page = this;
        // 注意，这里必须要做一个延时，不然button的参数获取是相对于bottom-container呢，似乎300ms可以确保按钮组件渲染到正确的位置
        setTimeout(()=>{
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
            })
        }, 300)
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

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

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

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
        that.setData({
            textContainerBottom: e.detail.height,
            showAiTextView: false,
            textContainerPaddingBotton: textContainerPaddingBottomUpWithKeyboard,
            textContainerBgColor: "#ffefef86"
        })
    },

    //失去聚焦
    blur: function (e) {
        var that = this;
        that.setData({
            textContainerBottom: 0,
            textContainerPaddingBotton: textContainerPaddingBottomSize,
            textContainerBgColor: "#f1eded86"
        })
        if (that.data.aiInitText) {
            that.setData({
                showAiTextView: true
            })
        }
    },
    generateAiText(index: number, textArray: Array<String>): Array<object> {
        const richText = [];
        for (var i = 0; i < textArray.length; i++) {
            if (textArray[i] == "") {
                continue
            }
            if (i === index) {
                richText.push({
                    name: 'span',
                    attrs: {
                        style: 'font-weight: bold; color: #1E90FF;'
                    },
                    children: [
                        {
                            type: 'text',
                            text: textArray[index]
                        }
                    ]
                })
            } else {
                richText.push({ type: 'text', text: textArray[i] })
            }
        }
        return richText;
    }
})