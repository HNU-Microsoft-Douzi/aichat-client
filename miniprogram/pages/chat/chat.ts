// pages/chat/chat.ts
Page({
    /**
     * 页面的初始数据
     */
    data: {
        inputState: false,
        aiTextViewState: false,
        userTextViewState: true,
        text: "",
        mode: 'scaleToFill',
        src: '../../images/v2_rr1x4o.jpg',
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
        rippleStyle: ''
    },

    clickCircleVoiceButton: function () {
        this.setData({
             inputState: !this.data.inputState,
             userTextViewState: !this.data.userTextViewState
            })
    },

    clickVoiceButton: function () {
        // 获取输入框的内容
        console.log("clickVoiceButton")
        this.setData({ 
            inputState: !this.data.inputState,
            userTextViewState: !this.data.userTextViewState
        }
        )
    },

    inputChange: function (e) {
        this.setData({
            inputValue: e.detail.value
        })
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
        page.data.aiTextViewState = false
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
                    text: result,
                    aiTextViewState: true
                })
            },
            fail(res) {
                console.error(res.errMsg)
                page.setData({
                    text: "抱歉，你的网络好像不太好",
                    aiTextViewState: true
                })
                wx.hideLoading()
            }
        })
        // 开始将后台的返回内容展示到文本框中
        // 清空用户输入框的内容 
    },

    /**
     * 将用户的语音传递给服务端
     * @param path 录音文件的本地路径
     */
    sendUserVoiceToService(path: string) {
        console.log("sendUserVoiceToService: path - ", path)
        const page = this
        this.setData({
            aiTextViewState: false
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
                console.log("sendUserVoiceToService success: ", res.data)
                wx.hideLoading()
                const data = JSON.parse(res.data);
                page.setData({
                    text: data.result,
                    aiTextViewState: true
                });
            },
            fail(err) {
                console.error(err);
                page.setData({
                    text: "抱歉，你的网络好像不太好",
                    aiTextViewState: true
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
        this.data.sendLock = false; // 允许发送消息
        this.startRecorder()
        // 2这里调用open-ai的whisper api接口（proxy），转换成文字
        // 3在后台将文字调用gpt的接口，生成返回文字，然后将返回文字传输给语音播报接口，生成mp3，并返回给客户端
    },

    onTouchMoved: function (e: { touches: { clientX: number, clientY: number }[] }) {  // TODO, weszhang, 这里不知道为什么暂时没用
        var x = e.touches[0].clientX;
        var y = e.touches[0].clientY;
        this.data.rippleStyle = 'top:' + y + 'px;left:' + x + 'px;animation: ripple 0.5s linear;'
        setTimeout(() => {
            this.setData({
                rippleStyle : ''
            })
        }, 500);
        //touchmove时触发
        var moveLenght = e.touches[e.touches.length - 1].clientY - this.data.startPoint.clientY; //移动距离
        if (Math.abs(moveLenght) > 50) {
            wx.showToast({
                title: "松开手指,取消发送",
                icon: "none",
                duration: 60000
            });
            this.data.sendLock = true; // 不允许发送消息
        } else {
            this.data.sendLock = false; // 允许发送消息
        }
    },

    onTouchEnd: function () {
        console.log('onTouchEnd, stop recordManager')
        wx.hideToast()
        this.data.recordManager.stop()
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        this.setData({
            mode: 'widthFix',
            src: '../../images/v2_rr1x4o.jpg'
        })
        //判断是否已授权录音权限
        this.getAuthSetting();
        //初始化音频管理器
        this.initRecorderManager();
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
        const recorderManager = this.data.recordManager;
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

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

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
        this.destoryInnerAudioContext();//销毁当前音频上下文实例
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
    //开始录音
    startRecorder: function () {
        let that = this;
        console.log("startRecorder")
        if (this.data.recordManagerOptions.recoderAuthStatus) {
            this.recorderManagerStart();
        } else {
            wx.openSetting({
                success(res) {
                    if (res.authSetting["scope.record"]) {
                        that.data.recordManagerOptions.recoderAuthStatus = true;
                        that.recorderManagerStart();
                    }
                }
            });
        }
    },
    //调用recorderManager.start开始录音
    recorderManagerStart() {
        console.log("recorderMAnagerStart");

        wx.showToast({
            title: "正在录音，松开发送，上划取消",
            icon: "none",
            duration: 60000
        });
        this.data.sendLock = false; // 允许发送消息

        this.data.recordManager.start({
            duration: 10000,
            sampleRate: 44100,
            numberOfChannels: 1,
            encodeBitRate: 192000,
            format: 'aac',
            frameSize: 50
        });
        // this.data.recordManagerOptions.recodeStatus = 1;
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
    //销毁当前组件音频实例
    destoryInnerAudioContext() {
        wx.createInnerAudioContext().destroy();
        console.log("音频实例销毁啦");
    },

    //输入聚焦
    foucus: function (e) {
        var that = this;
        that.setData({
            textContainerBottom: e.detail.height,
            aiTextViewState: false,
            textContainerPaddingBotton: 85,
            textContainerBgColor: "#ffefef86"
        })
    },

    //失去聚焦
    blur: function(e) {
        var that = this;
        that.setData({
            textContainerBottom: 0,
            textContainerPaddingBotton: 150,
            textContainerBgColor: "#f1eded86"
        })
        if (that.data.text != '') {
            that.setData({
                aiTextViewState: true
            })
        }
    }
})