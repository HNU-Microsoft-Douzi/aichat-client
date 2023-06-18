import { getLanguage, getVcn, getMode, getSpeed } from "./tts-storage-util"
var log = require('./log.js')

var startTap = false;

let talkHistory: string = '';
export class VoiceRecordManage {
    private recordManager: WechatMiniprogram.RecorderManager
    private recoderAuthStatus: boolean //录音授权状态
    private banSendMsg: boolean // 禁止发送消息
    private listener: VoiceRecordManageCallback
    private innerAudioContextList: Array<WechatMiniprogram.InnerAudioContext>
    private conversationRemainingUsageCount: number
    constructor(callback: VoiceRecordManageCallback, ttsCallback: TtsDownloadManageCallback) {
        log.info("VoiceRecordManage init")
        this.setTalkHistory();
        this.recordManager = wx.getRecorderManager();
        this.recoderAuthStatus = false
        this.banSendMsg = false
        this.listener = callback
        this.innerAudioContextList = []
        this.conversationRemainingUsageCount = 0

        this.recordManager.onStart(() => {
            log.info('record start')
            this.listener.onStart()
        })
        this.recordManager.onPause(() => {
            log.info('record pause')
        })
        this.recordManager.onStop((res: { tempFilePath: string }) => {
            if (this.banSendMsg) {
                // TODO, weszhang, 这里应该会存储文件，后面需要将文件进行删除
                log.info("banSendMsg = true")
                wx.showToast({ title: '取消发送', icon: 'none', duration: 500, });
                return
            }
            this.listener.onEnd()
            log.info('record stop', res)
            const { tempFilePath } = res
            this.sendUserVoiceToService(tempFilePath, ttsCallback)
        })
        // this.recordManager.onFrameRecorded((res) => {
        //     const { frameBuffer } = res
        //     log.info('frameBuffer.byteLength', frameBuffer.byteLength)
        // })
        this.recordManager.onError((callback) => {
            this.listener.onError(callback.errMsg)
        });
    }

    //开始录音
    public startRecord() {
        log.info("startRecord")
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
            log.info(`stop and destroy audio play`)
            item.stop();
            item.destroy();
        })
    }

    //调用recorderManager.start开始录音
    private recordLogic() {
        log.info("recordLogic")
        const that = this;
        // TODO 这里检查使用次数是不是还够
        const app = getApp();
        const db = app.globalData.db;
        db.collection('user_rate_limit').where({
            _openid: app.globalData.openId
        }).get().then(res => {
            // res.data 包含该记录的数据
            const currentUsageCount = res.data[0].conversation_remaining_usage_count;
            log.info(`查询记录成功， 用户剩余使用次数: ${currentUsageCount}`)
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
                            log.info("getAuthSetting recorderAuth get success")
                        },
                        fail() {
                            that.recoderAuthStatus = false;
                            log.info("getAuthSetting recorderAuth get fail")
                        }
                    });
                } else {
                    that.recoderAuthStatus = true;
                    log.info("getAuthSetting recorderAuth get success")
                }
            }
        });
    }

    /**
    * 将用户的语音传递给服务端
    * @param path 录音文件的本地路径
    */
    private sendUserVoiceToService(path: string, ttsCallback: TtsDownloadManageCallback) {
        log.info("sendUserVoiceToService: path - ", path)
        const that = this;
        ttsCallback.onStartDownload();
        const origin = getLanguage();
        const personName = getVcn();
        const mode = getMode();
        const speed = getSpeed();
        log.info(`origin: ${origin} personName: ${personName} mode: ${mode} talkHistory: ${talkHistory}`)
        wx.uploadFile({
            url: `https://www.yubanstar.top/voice?openId=${getApp().globalData.openId}&origin=${origin}&history=${talkHistory}&personName=${personName}&mode=${mode}&speed=${speed}`,
            filePath: path,
            name: 'file',
            timeout: 30000,
            success(res) {
                log.info(`sendUserVoiceToService response: ${JSON.stringify(res)}`);
                if (res.statusCode !== 200) {
                    log.error('后台异常');
                    ttsCallback.onError('Internal Server Error')
                    return;
                }
                that.setTalkHistory();
                startTap = false;
                const { user, result } = JSON.parse(res.data);
                log.info(`user: ${user} result:` + JSON.stringify(result));
                let textArray: Array<string> = [];
                let urlArray: Array<string> = [];
                let serverResponseText = '';
                result.forEach((item: { file: string, origin: string }) => {
                    const fileUrl = item.file;
                    const responseText = item.origin;
                    serverResponseText += responseText;
                    textArray.push(responseText);
                    urlArray.push(fileUrl);
                    log.info(`fileUrl: ${fileUrl}  responseText: ${responseText}`);
                });
                that.reportData(user, serverResponseText);
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
                        log.info(`用户使用次数-1`)
                    }
                })
                ttsCallback.onGetWholeTextArray(textArray, urlArray)
                // TODO, 这里应该封装成一个完整的函数放在chat.js中控制，并由chat.js在调用这个接口前开始展示loadding进度条，在播放完毕后隐藏进度条
                // 或者可以在ttsCallback增加一个针对单个句子开始下载、下载完毕的回调通知，全部都放在callback里实现
                that.playNext(0, result, ttsCallback);
            },
            fail(err) {
                log.error(err);
                ttsCallback.onError(err.errMsg)
            }
        });
    }
    setTalkHistory() {
        wx.cloud.callFunction({
            // 云函数名称
            name: 'getUserTalkHistory',
            success: function (res) {
                const result = res.result;
                const data = result?.data;
                talkHistory = JSON.stringify(data);
                console.info(`getTalkHistory: ${talkHistory}`)
            },
            fail: console.error
        })
    }

    /**
     * 数据上报
     * @param user 用户文本
     * @param response 回复文本
     */
    private reportData(user: string, response: string) {
        wx.cloud.callFunction({
            // 云函数名称
            name: 'userDataReport',
            data: {
                userText: user,
                serverResponseText: response
            },
            success: function (res) {
                console.info(`report user data success`)
            },
            fail: console.error
        })
    }

    private playNext(currentIndex: number, array: Array<{ file: string, origin: string }>, ttsCallback: TtsDownloadManageCallback) {
        if (currentIndex + 1 > array.length) {
            log.info("playNext over bound")
            return
        }
        if (startTap) {
            // 开始点击了，这个时候就不要进行播报了
            console.info(`user taped, return`)
            return
        }
        const origin = getLanguage();
        const personName = getVcn();
        var speed = getSpeed();
        const mode = getMode();
        const fileUrl = `https://www.yubanstar.top/tts?filename=${array[currentIndex].file}&openId=${getApp().globalData.openId}&text=${array[currentIndex].origin}&origin=${origin}&personName=${personName}&mode=${mode}&speed=${speed}`
        const that = this;
        ttsCallback.startDownloadTtsSentence()
        log.info(`fileUrl: ${fileUrl}`)
        wx.request({
            url: fileUrl,
            responseType: 'arraybuffer',
            success: res => {
                ttsCallback.endDownloadTtsSentence()
                // 开始播放前，先将其它的所有音频全部停掉
                for (var item of that.innerAudioContextList) {
                    item.stop()
                }
                if (startTap) {
                    // 开始点击了，这个时候就不要进行播报了
                    console.info(`user taped, return`)
                    return
                }
                const filePath = `${wx.env.USER_DATA_PATH}/${array[currentIndex].file}`;
                wx.getFileSystemManager().writeFileSync(filePath, res.data, 'binary');
                const audio = wx.createInnerAudioContext();
                that.innerAudioContextList.push(audio)
                audio.src = filePath;
                log.info(`voice download address: ${filePath}`)
                audio.onPlay(() => {
                    log.info("audio 开始播放")
                })
                audio.onStop(() => {
                    log.info("audio 停止播报")
                })
                audio.onError((res) => {
                    log.info("audio 播放异常:" + res.errMsg)
                })
                audio.onEnded((listener) => {
                    log.info("audio 播放完成")
                    audio.destroy(); // 销毁当前音频
                    this.playNext(currentIndex + 1, array, ttsCallback);
                });
                ttsCallback.onTraverseIndex(currentIndex)
                audio.play();
            },
            fail: err => {
                log.error(err);
            }
        });
    }
}

var innerAudioContextList: WechatMiniprogram.InnerAudioContext[] = []
export function playAudio(filename: string, text: string, callback: TtsPlayCallback) {
    // 讯飞： x2_engam_laura x2_enus_catherine x2_engam_lindsay x3_john  x3_xiaoyue(香港粤语) x_xiaomei(广东话)
    const origin = getLanguage();
    const personName = getVcn();
    var speed = getSpeed();
    const mode = getMode();
    const fileUrl = `https://www.yubanstar.top/tts?filename=${filename}&openId=${getApp().globalData.openId}&text=${text}&origin=${origin}&personName=${personName}&mode=${mode}&speed=${speed}`
    log.info(`fileUrl: ${fileUrl}`)
    callback.onStartDownload();
    wx.request({
        url: fileUrl,
        responseType: 'arraybuffer',
        success: res => {
            // 用户点击了
            startTap = true;
            for (var item of innerAudioContextList) {
                log.info(`item stopped`)
                item.stop()
            }
            const filePath = `${wx.env.USER_DATA_PATH}/${filename}`;
            wx.getFileSystemManager().writeFileSync(filePath, res.data, 'binary');
            const audio = wx.createInnerAudioContext();
            innerAudioContextList.push(audio);
            audio.src = filePath;
            log.info(`voice download address: ${filePath}`)
            audio.onPlay(() => {
                callback.onSuccess();
                log.info("audio 开始播放")
            })
            audio.onStop(() => {
                log.info("audio 停止播报")
            })
            audio.onError((res) => {
                log.info("audio 播放异常:" + res.errMsg)
                callback.onError(res.errMsg);
            })
            audio.onEnded((listener) => {
                log.info("audio 播放完成")
                audio.destroy(); // 销毁当前音频
                const index = innerAudioContextList.indexOf(audio)
                if (index !== -1) {
                    innerAudioContextList.splice(index, 1);
                    log.info(`recordManager playAudio remove success`);
                } else {
                    log.info(`recordManager playAudio remove error`);
                }
            });
            audio.play();
        },
        fail: err => {
            callback.onError(err.errMsg);
            log.error(err);
        }
    });
}

export async function getUsageCount() {
    const app = getApp();
    const db = app.globalData.db;
    const response = await db.collection('user_rate_limit').where({
        _openid: app.globalData.openId
    }).get();
    if (response && response.data && response.data.length > 0 && response.data[0]) {
        return response.data[0].conversation_remaining_usage_count;
    } else {
        return 0;
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
    onStartDownload(): void
    onGetWholeTextArray(textArray: Array<string>, textUrl: Array<string>): void
    onTraverseIndex(index: number): void,
    startDownloadTtsSentence(): void,
    endDownloadTtsSentence(): void
}

interface TtsPlayCallback {
    onError(
        errorMsg: string
    ): void
    onStartDownload(): void
    onSuccess(): void
}

module.exports.VoiceRecordManage = VoiceRecordManage