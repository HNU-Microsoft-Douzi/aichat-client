export class VoiceRecordManage {
    private recordManager: WechatMiniprogram.RecorderManager
    private recoderAuthStatus: boolean //录音授权状态
    private banSendMsg: boolean // 禁止发送消息
    private listener: VoiceRecordManageCallback
    private innerAudioContextList: Array<WechatMiniprogram.InnerAudioContext>
    private conversationRemainingUsageCount: number
    constructor(callback: VoiceRecordManageCallback, ttsCallback: TtsDownloadManageCallback) {
        console.log("VoiceRecordManage init")
        this.recordManager = wx.getRecorderManager();
        this.recoderAuthStatus = false
        this.banSendMsg = false
        this.listener = callback
        this.innerAudioContextList = []
        this.conversationRemainingUsageCount = 0

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

    public stopAudioPlay() {
        this.innerAudioContextList.forEach(item => {
            console.info(`stop and destroy audio play`)
            item.stop();
            item.destroy();
        })
    }

    public async getUsageCount() {
        const app = getApp();
        const db = app.globalData.db;
        const response = await db.collection('user_rate_limit').where({
            _openid: app.globalData.openId
        }).get();
        return response.data[0].conversation_remaining_usage_count;
    }

    //调用recorderManager.start开始录音
    private recordLogic() {
        console.log("recordLogic")
        const that = this;
        // TODO 这里检查使用次数是不是还够
        const app = getApp();
        const db = app.globalData.db;
        db.collection('user_rate_limit').where({
            _openid: app.globalData.openId
        }).get().then(res => {
            // res.data 包含该记录的数据
            const currentUsageCount = res.data[0].conversation_remaining_usage_count;
            console.log(`查询记录成功， 用户剩余使用次数: ${currentUsageCount}`)
            that.conversationRemainingUsageCount = currentUsageCount;
            if (currentUsageCount > 0) {
                this.banSendMsg = false; // 允许发送消息
                // TODO, 这里的编码采样率的大小可能影响到整个录音文件的大小
                this.recordManager.start({
                    duration: 60000,
                    sampleRate: 16000,
                    numberOfChannels: 1,
                    encodeBitRate: 48000,
                    format: 'mp3',
                    frameSize: 0.01
                });
            } else {
                // TODO, weszhang， 这里不允许发消息
                wx.showToast({
                    title: '剩余次数不足，请使用兑换码兑换',
                    icon: 'error',
                    duration: 2000
                });
            }
        });
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
        this.recordManager.stop()
        this.stopAudioPlay()
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
        ttsCallback.onStartDownload();
        // TODO, weszhang，口音选择做成配置化
        const origin = "en-ZA"
        const personName = getApp().globalData.ttsVcn;
        const mode = getApp().globalData.ttsMode; 
        wx.uploadFile({
            url: `https://www.yubanstar.top/voice?openId=${getApp().globalData.openId}&origin=${origin}&personName=${personName}&mode=${mode}`,
            filePath: path,
            name: 'file',
            timeout: 30000,
            success(res) {
                console.info(`sendUserVoiceToService response: ${JSON.stringify(res)}`);
                if (res.statusCode !== 200) {
                    console.error('后台异常');
                    ttsCallback.onError('Internal Server Error')
                    return;
                }
                const { result } = JSON.parse(res.data);
                console.log(`result:`)
                console.log(result)
                var textArray: Array<string> = []
                var urlArray: Array<string> = []
                result.forEach((item: { file: string, origin: string }) => {
                    const fileUrl = item.file
                    const responseText = item.origin
                    textArray.push(responseText);
                    urlArray.push(fileUrl)
                    console.log(`fileUrl: ${fileUrl}  responseText: ${responseText}`)
                });
                // TODO, 需要对用户的使用次数 - 1
                const db = getApp().globalData.db;
                db.collection('user_rate_limit').where({
                    _openid: getApp().globalData.openId
                }).update({
                    // data 传入需要局部更新的数据
                    data: {
                        // 表示将 done 字段置为 true
                        conversation_remaining_usage_count: that.conversationRemainingUsageCount - 1
                    },
                    success: function (res) {
                        console.log(`用户使用次数-1`)
                    }
                })
                ttsCallback.onGetWholeTextArray(textArray, urlArray)
                that.playNext(0, result, ttsCallback);
            },
            fail(err) {
                console.error(err);
                ttsCallback.onError(err.errMsg)
            }
        });
    }

    private playNext(currentIndex: number, array: Array<{ file: string, origin: string }>, ttsCallback: TtsDownloadManageCallback) {
        if (currentIndex + 1 > array.length) {
            console.log("playNext over bound")
            return
        }
        const origin = "en-ZA"
        const personName = getApp().globalData.ttsVcn;
        const speed = getApp().globalData.ttsSpeed;
        const mode = getApp().globalData.ttsMode; 
        const fileUrl = `https://www.yubanstar.top/tts?filename=${array[currentIndex].file}&openId=${getApp().globalData.openId}&text=${array[currentIndex].origin}&origin=${origin}&personName=${personName}&mode=${mode}&speed=${speed}`
        const that = this;
        console.info(`fileUrl: ${fileUrl}`)
        wx.request({
            url: fileUrl,
            responseType: 'arraybuffer',
            success: res => {
                // 开始播放前，先将其它的所有音频全部停掉
                for (var item of that.innerAudioContextList) {
                    item.stop()
                }
                const filePath = `${wx.env.USER_DATA_PATH}/${array[currentIndex].file}`;
                wx.getFileSystemManager().writeFileSync(filePath, res.data, 'binary');
                const audio = wx.createInnerAudioContext();
                that.innerAudioContextList.push(audio)
                audio.src = filePath;
                console.info(`voice download address: ${filePath}`)
                audio.onPlay(() => {
                    console.log("audio 开始播放")
                })
                audio.onStop(() => {
                    console.log("audio 停止播报")
                })
                audio.onError((res) => {
                    console.log("audio 播放异常:" + res.errMsg)
                })
                audio.onEnded((listener) => {
                    console.log("audio 播放完成")
                    audio.destroy(); // 销毁当前音频
                    this.playNext(currentIndex + 1, array, ttsCallback);
                });
                ttsCallback.onTraverseIndex(currentIndex)
                audio.play();
            },
            fail: err => {
                console.error(err);
            }
        });
    }
}

var innerAudioContextList: WechatMiniprogram.InnerAudioContext[] = []
export function playAudio(filename: string, text: string) {
    const origin = "en-ZA"
    // 讯飞： x2_engam_laura x2_enus_catherine x2_engam_lindsay x3_john  x3_xiaoyue(香港粤语) x_xiaomei(广东话)
    const personName = getApp().globalData.ttsVcn;
        const mode = getApp().globalData.ttsMode; 
    const fileUrl = `https://www.yubanstar.top/tts?filename=${filename}&openId=${getApp().globalData.openId}&text=${text}&origin=${origin}&personName=${personName}&mode=${mode}`
    console.info(`fileUrl: ${fileUrl}`)
    wx.request({
        url: fileUrl,
        responseType: 'arraybuffer',
        success: res => {
            for (var item of innerAudioContextList) {
                console.info(`item stopped`)
                item.stop()
            }
            const filePath = `${wx.env.USER_DATA_PATH}/${filename}`;
            wx.getFileSystemManager().writeFileSync(filePath, res.data, 'binary');
            const audio = wx.createInnerAudioContext();
            innerAudioContextList.push(audio);
            audio.src = filePath;
            console.info(`voice download address: ${filePath}`)
            audio.onPlay(() => {
                console.log("audio 开始播放")
            })
            audio.onStop(() => {
                console.log("audio 停止播报")
            })
            audio.onError((res) => {
                console.log("audio 播放异常:" + res.errMsg)
            })
            audio.onEnded((listener) => {
                console.log("audio 播放完成")
                audio.destroy(); // 销毁当前音频
                const index = innerAudioContextList.indexOf(audio)
                if (index !== -1) {
                    innerAudioContextList.splice(index, 1);
                    console.log(`recordManager playAudio remove success`);
                } else {
                    console.log(`recordManager playAudio remove error`);
                }
            });
            audio.play();
        },
        fail: err => {
            console.error(err);
        }
    });
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
    onStartDownload(): void
    onGetWholeTextArray(textArray: Array<string>, textUrl: Array<string>): void
    onTraverseIndex(index: number): void
}

module.exports.VoiceRecordManage = VoiceRecordManage