class VoiceRecordManage {
    private recordManager: WechatMiniprogram.RecorderManager
    private recoderAuthStatus: boolean //录音授权状态
    private banSendMsg: boolean // 禁止发送消息
    private listener: VoiceRecordManageCallback
    constructor(callback: VoiceRecordManageCallback, ttsCallback: TtsDownloadManageCallback) {
        console.log("VoiceRecordManage init")
        this.recordManager = wx.getRecorderManager();
        this.recoderAuthStatus = false
        this.banSendMsg = false
        this.listener = callback

        this.recordManager.onStart(() => {
            console.log('record start')
            this.listener.onStart()
        })
        this.recordManager.onPause(() => {
            console.log('record pause')
        })
        this.recordManager.onStop((res: { tempFilePath: string }) => {
            if (this.banSendMsg) {
                // TODO, weszhang, 这里应该会存储文件，后面需要将文件进行删除
                console.log("banSendMsg = true")
                return
            }
            this.listener.onEnd()
            console.log('record stop', res)
            const { tempFilePath } = res
            this.sendUserVoiceToService(tempFilePath, ttsCallback)
        })
        // this.recordManager.onFrameRecorded((res) => {
        //     const { frameBuffer } = res
        //     console.log('frameBuffer.byteLength', frameBuffer.byteLength)
        // })
        this.recordManager.onError((callback) => {
            this.listener.onError(callback.errMsg)
        });
    }

    //开始录音
    public startRecord() {
        console.log("startRecord")
        this.banSendMsg = false; // 允许发送消息
        let that = this;
        if (this.recoderAuthStatus) {
            this.recordLogic();
        } else {
            wx.openSetting({
                success(res) {
                    if (res.authSetting["scope.record"]) {
                        that.recoderAuthStatus = true;
                        that.recordLogic();
                    }
                }
            });
        }
    }

    public stopRecord() {
        this.recordManager.stop()
    }

    //调用recorderManager.start开始录音
    private recordLogic() {
        console.log("recordLogic")
        // wx.showToast({
        //     title: "正在录音，松开发送，上划取消",
        //     icon: "none",
        //     duration: 60000
        // });
        this.banSendMsg = false; // 允许发送消息
        // TODO, 这里的编码采样率的大小可能影响到整个录音文件的大小
        this.recordManager.start({
            duration: 10000,
            sampleRate: 44100,
            numberOfChannels: 1,
            encodeBitRate: 192000,
            format: 'aac',
            frameSize: 0.01
        });
        // this.recordManagerOptions.recodeStatus = 1;
    }

    public stopSendMsg() {
        this.banSendMsg = true;
    }

    public startSendMsg() {
        this.banSendMsg = false;
    }

    public recorderAuthJudge() {

    }

    public destroy() {
        this.recordManager
    }

    //判断是否已授权录音权限
    public authJudge() {
        const that = this
        wx.getSetting({
            success(res) {
                if (!res.authSetting["scope.record"]) {
                    wx.authorize({
                        scope: "scope.record",
                        success() {
                            that.recoderAuthStatus = true;
                            console.log("getAuthSetting recorderAuth get success")
                        },
                        fail() {
                            that.recoderAuthStatus = false;
                            console.log("getAuthSetting recorderAuth get fail")
                        }
                    });
                } else {
                    that.recoderAuthStatus = true;
                    console.log("getAuthSetting recorderAuth get success")
                }
            }
        });
    }

    /**
    * 将用户的语音传递给服务端
    * @param path 录音文件的本地路径
    */
    private sendUserVoiceToService(path: string, ttsCallback: TtsDownloadManageCallback) {
        console.log("sendUserVoiceToService: path - ", path)
        const that = this;
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
                const { result } = JSON.parse(res.data);
                console.log(`result:`)
                console.log(result)
                const textArray: Array<string> = []
                result.forEach((item: { file: string, origin: string }) => {
                    const fileUrl = item.file
                    const responseText = item.origin + '\n'
                    textArray.push(responseText);
                    console.log(`fileUrl: ${fileUrl}  responseText: ${responseText}`)
                });
                ttsCallback.onGetWholeTextArray(textArray)
                that.playNext(0, result, ttsCallback);
            },
            fail(err) {
                console.error(err);
                ttsCallback.onError(err.errMsg)
                wx.hideLoading()
            }
        });
    }

    private playNext(currentIndex: number, array: Array<{file: string, origin: string}>, ttsCallback: TtsDownloadManageCallback) {
        if (currentIndex + 1 > array.length) {
            console.log("playNext over bound")
            return
        }
        const audio = wx.createInnerAudioContext();
        const fileUrl = `https://www.learnaitutorenglish.club/tts?filename=${array[currentIndex].file}`
        console.log(`playNext fileUrl: ${fileUrl}`)
        audio.src = fileUrl
        audio.onPlay(() => {
            console.log("开始播放")
        })
        audio.onError((res) => {
            console.log("播放异常:" + res.errMsg)
            console.log("播放异常:" + res.errCode)
        })
        audio.onEnded((listener) => {
            console.log("播放完成")
            audio.destroy(); // 销毁当前音频
            this.playNext(currentIndex + 1, array, ttsCallback);
        });
        ttsCallback.onTraverseIndex(currentIndex)
        audio.play();
    }
}

interface VoiceRecordManageCallback {
    onError(
        errorMsg: string
    ): void
    onStart(): void
    onEnd(): void
}

interface TtsDownloadManageCallback {
    onError(
        errorMsg: string
    ): void
    onGetWholeTextArray(textArray: Array<string>): void
    onTraverseIndex(index: number): void
}

module.exports.VoiceRecordManage = VoiceRecordManage