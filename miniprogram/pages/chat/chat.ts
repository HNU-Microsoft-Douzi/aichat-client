const recordManage = require("../../components/recordComponent")
// pages/chat/chat.ts
Page({
    /**
     * 页面的初始数据
     */
    data: {
        inputMode: false,
        showAiTextView: false,
        showUserTextView: true,
        aiInitText: "",
        recordManager: wx.getRecorderManager(),
        recordManagerOptions: {
            recoderAuthStatus: false //录音授权状态
        },
        sendLock: false, // 是否允许发送消息
        startPoint: { clientX: 0, clientY: 0 },
        userConfirmText: "",
        inputValue: "",
        textContainerBottom: 0,
        textContainerPaddingBotton: 150,
        textContainerBgColor: "#f1eded86",
        rippleStyle: '',
        innerAudioContext: wx.createInnerAudioContext(),
        hideVoiceCurveLine: true,
        siriwave: null
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
                        aiInitText: result,
                        showAiTextView: true
                    })
                },
                fail(res) {
                    console.error(res.errMsg)
                    page.setData({
                        aiInitText: "抱歉，你的网络好像不太好",
                        showAiTextView: true
                    })
                    // wx.hideLoading()
                }
            })
        }
    },

    userConfirmMessage: function (event: { detail: { value: any } }) {
        this.sendUserTextToService(event.detail.value)
        this.setData({
            userConfirmText: event.detail.value,
            inputValue: ''
        })
    },

    sendUserTextToService(msg: String) {
        const page = this
        console.log("sendUserTextToService: " + msg)
        wx.showLoading({
            title: "让我思考一下...",
            mask: true
        })
        this.setData({
            showAiTextView: false
        })
        // 开始向后台发送post请求
        wx.request({
            url: 'https://www.learnaitutorenglish.club/chat', //仅为示例，并非真实的接口地址
            data: {
                text: msg
            },
            timeout: 30000,
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                wx.hideLoading()
                const { result } = res.data
                console.log(`sendUserTextToService response: ${result}`)
                page.setData({
                    aiInitText: result,
                    showAiTextView: true
                })
            },
            fail(res) {
                console.error(res.errMsg)
                page.setData({
                    aiInitText: "抱歉，你的网络好像不太好",
                    showAiTextView: true
                })
                wx.hideLoading()
            }
        })
    },

    /**
     * 将用户的语音传递给服务端
     * @param path 录音文件的本地路径
     */
    sendUserVoiceToService(path: string) {
        console.log("sendUserVoiceToService: path - ", path)
        const page = this
        this.setData({
            showAiTextView: false
        })
        wx.showLoading({
            title: "让我思考一下...",
            mask: true
        })
        wx.uploadFile({
            url: 'https://www.learnaitutorenglish.club/voice',
            filePath: path,
            name: 'file',
            timeout: 30000,
            success(res) {
                wx.hideLoading()
                const data = JSON.parse(res.data);
                console.debug("sendUserVoiceToService file", data.file)
                console.debug("sendUserVoiceToService origin", data.origin)
                page.setData({
                    aiInitText: data.origin,
                    showAiTextView: true
                });
                const fileUrl = `https://www.learnaitutorenglish.club/tts?filename=${data.file}`
                console.debug(`sendUserVoiceToService fileUrl ${fileUrl}`)
                // TODO, 这里调用wx的音频播放器直接对wav进行播放就可以了
                const innerAudioContext = wx.createInnerAudioContext()
                innerAudioContext.src = fileUrl
                innerAudioContext.onPlay(() => {
                    console.log("开始播放")
                })
                innerAudioContext.onError((res) => {
                    console.log("播放异常:" + res.errMsg)
                    console.log("播放异常:" + res.errCode)
                })
                innerAudioContext.onEnded((listener) => {
                    console.log("播放完成")
                })
                innerAudioContext.play()
            },
            fail(err) {
                console.error(err);
                page.setData({
                    aiInitText: "抱歉，你的网络好像不太好",
                    showAiTextView: true
                })
                wx.hideLoading()
            }
        });
    },

    /**
     * 长按事件
     */
    pressLongVoiceButton: function (e: { touches: { clientX: number, clientY: number }[] }) {
        console.debug("pressLongVoiceButton" + e.touches[0].clientY)
        this.data.startPoint = e.touches[0]; // 记录长按时开始点信息，后面用于计算上划取消时手指滑动的距离。
        this.startRecord()
    },

    //开始录音
    startRecord: function () {
        this.data.sendLock = false; // 允许发送消息
        let that = this;
        if (this.data.recordManagerOptions.recoderAuthStatus) {
            this.recordLogic();
        } else {
            wx.openSetting({
                success(res) {
                    if (res.authSetting["scope.record"]) {
                        that.data.recordManagerOptions.recoderAuthStatus = true;
                        that.recordLogic();
                    }
                }
            });
        }
    },

    //调用recorderManager.start开始录音
    recordLogic() {
        console.log("recordLogic")
        // wx.showToast({
        //     title: "正在录音，松开发送，上划取消",
        //     icon: "none",
        //     duration: 60000
        // });
        this.data.sendLock = false; // 允许发送消息
        this.setData({
            hideVoiceCurveLine: false
        })
        // TODO, 这里的编码采样率的大小可能影响到整个录音文件的大小
        this.data.recordManager.start({
            duration: 10000,
            sampleRate: 44100,
            numberOfChannels: 1,
            encodeBitRate: 192000,
            format: 'aac',
            frameSize: 0.01
        });
        // this.data.recordManagerOptions.recodeStatus = 1;
    },

    onTouchMoved: function (e: { touches: { clientX: number, clientY: number }[] }) {  // TODO, weszhang, 这里不知道为什么暂时没用
        var x = e.touches[0].clientX;
        var y = e.touches[0].clientY;
        this.data.rippleStyle = 'top:' + y + 'px;left:' + x + 'px;animation: ripple 0.5s linear;'
        setTimeout(() => {
            this.setData({
                rippleStyle: ''
            })
        }, 500);
        //touchmove时触发
        var moveLenght = e.touches[e.touches.length - 1].clientY - this.data.startPoint.clientY; //移动距离
        if (Math.abs(moveLenght) > 50) {
            // wx.showToast({
            //     title: "松开手指,取消发送",
            //     icon: "none",
            //     duration: 60000
            // });
            this.data.sendLock = true; // 不允许发送消息
        } else {
            this.data.sendLock = false; // 允许发送消息
        }
    },

    onTouchEnd: function () {
        console.log('onTouchEnd, stop recordManager')
        // wx.hideToast()
        this.data.recordManager.stop()
        this.setData({
            hideVoiceCurveLine: true
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        //判断是否已授权录音权限
        this.getAuthSetting();
        //初始化音频管理器
        this.initRecorderManager();
        // 初始化播放管理器
        this.initPlayManager();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        const siriwave = this.selectComponent('.siriwave') as any;
        console.log("onLoad: siriwave")
        console.log(siriwave)
        this.data.siriwave = siriwave;
        siriwave.start();
    },

    //获取权限设置
    getAuthSetting: function () {
        let that = this;
        wx.getSetting({
            success(res) {
                if (!res.authSetting["scope.record"]) {
                    wx.authorize({
                        scope: "scope.record",
                        success() {
                            that.data.recordManagerOptions.recoderAuthStatus = true;
                            console.log("getAuthSetting recorderAuth get success")
                        },
                        fail() {
                            that.data.recordManagerOptions.recoderAuthStatus = false;
                            console.log("getAuthSetting recorderAuth get fail")
                        }
                    });
                } else {
                    that.data.recordManagerOptions.recoderAuthStatus = true;
                    console.log("getAuthSetting recorderAuth get success")
                }
            }
        });
    },

    //初始化音频管理器
    initRecorderManager() {
        console.log("initRecorderManager")
        const that = this;
        const recorderManager = this.data.recordManager;
        recorderManager.onFrameRecorded((res) => {
            const {
                frameBuffer
            } = res
            let uint8Array = new Uint8Array(frameBuffer)
            that.setData({
                voiceLine: new Array(...uint8Array)
            })
        })
        recorderManager.onStart(() => {
            console.log('recorder start')
        })
        recorderManager.onPause(() => {
            console.log('recorder pause')
        })
        recorderManager.onStop((res) => {
            if (this.data.sendLock) {
                // TODO, weszhang, 这里应该会存储文件，后面需要将文件进行删除
                console.log("recorder stop, but sendLock, drop the file")
                return
            }
            console.log('recorder stop', res)
            const { tempFilePath } = res
            this.sendUserVoiceToService(tempFilePath)
        })
        recorderManager.onFrameRecorded((res) => {
            const { frameBuffer } = res
            console.log('frameBuffer.byteLength', frameBuffer.byteLength)
        })
        recorderManager.onError(() => { });
    },

    // 初始化播放管理期
    initPlayManager() {
        console.log("initPlayManager")
        const innerAudioContext = this.data.innerAudioContext;
        innerAudioContext.onPlay(() => {
            console.log("开始播放")
        })
        innerAudioContext.onError((res) => {
            console.log("播放异常:" + res.errMsg)
            console.log("播放异常:" + res.errCode)
        })
        innerAudioContext.onEnded((listener) => {
            console.log("播放完成")
        })
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
        const innerAudioContext = this.data.innerAudioContext
        innerAudioContext.destroy();
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
            textContainerPaddingBotton: 85,
            textContainerBgColor: "#ffefef86"
        })
    },

    //失去聚焦
    blur: function (e) {
        var that = this;
        that.setData({
            textContainerBottom: 0,
            textContainerPaddingBotton: 150,
            textContainerBgColor: "#f1eded86"
        })
        if (that.data.aiInitText != '') {
            that.setData({
                showAiTextView: true
            })
        }
    }
})