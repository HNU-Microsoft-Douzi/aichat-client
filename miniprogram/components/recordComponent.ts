// components/recordComponent.ts
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
        recordManager: wx.getRecorderManager(),
        recordManagerOptions: {
            recoderAuthStatus: false //录音授权状态
        },
        banSendMsg: false, // 是否允许发送消息
    },

    lifetimes: {
        ready() {
            const that = this
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
                if (this.data.banSendMsg) {
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
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        startRecord: function () {
            this.data.banSendMsg = false; // 允许发送消息
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
            this.data.banSendMsg = false; // 允许发送消息
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

        banSendMsg(command: boolean) {
            this.data.banSendMsg = command;
        }

    }
})
