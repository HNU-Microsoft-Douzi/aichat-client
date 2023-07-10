import { getSessionId } from "./session-manager";
import { getLanguage, getVcn, getMode, getSpeed, getPrompt, getStyle, getEmotion } from "./tts-storage-util"
var log = require('./log.js')

var startTap = false;

let talkHistory: string = '';
export class VoiceRecordManage {
    private recordManager: WechatMiniprogram.RecorderManager
    private recoderAuthStatus: boolean //录音授权状态
    private banSendMsg: boolean // 禁止发送消息
    private listener: VoiceRecordManageCallback
    private innerAudioContextList: Array<WechatMiniprogram.InnerAudioContext>
    private callback: TtsDownloadManageCallback
    constructor(callback: VoiceRecordManageCallback, ttsCallback: TtsDownloadManageCallback) {
        log.info("VoiceRecordManage init")
        const _this = this;
        this.setTalkHistory();
        this.recordManager = wx.getRecorderManager();
        this.recoderAuthStatus = false
        this.banSendMsg = false
        this.listener = callback
        this.innerAudioContextList = []

        this.callback = ttsCallback;
        this.recordManager.onStart(() => {
            console.info('record start')
            this.listener.onStart()
        })
        this.recordManager.onPause(() => {
            console.info('record pause')
        })
        this.recordManager.onStop((res: { tempFilePath: string }) => {
            if (this.banSendMsg) {
                // TODO, weszhang, 这里应该会存储文件，后面需要将文件进行删除
                console.info("banSendMsg = true")
                wx.showToast({ title: '取消发送', icon: 'none', duration: 500, });
                return
            }
            this.listener.onEnd()
            console.info('record stop', res)
            const { tempFilePath } = res
            this.sendUserVoiceToService(tempFilePath)
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
        console.info(`stopRecord record-manager`)
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
        wx.cloud.callFunction({
            // 云函数名称
            name: 'getUserRemainCount',
            success: function (res) {
                console.info(`recordLogic res: ${JSON.stringify(res)}`);
                if (res && res.result) {
                    const currentUsageCount = res.result.currentUsageCount
                    if (currentUsageCount > 0) {
                        that.banSendMsg = false; // 允许发送消息
                        // TODO, 这里的编码采样率的大小可能影响到整个录音文件的大小
                        console.info(`real recordLogic`)
                        that.recordManager.start({
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
                }
            }, fail(e) {
                console.error(e);
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

    public sendTextToService(openId, language, mode, speed, vcn, prompt, style, emotion,  userNewSentence: string) {
        console.info(`sendTextToService:`);
        const _this = this;
        wx.request({
            url: 'https://www.yubanstar.top/chat',
            method: 'POST',
            data: {
                openId: openId,
                origin: language,
                mode: mode,
                speed: speed,
                vcn: vcn,
                prompt: prompt,
                style: style,
                emotion: emotion,
                talkHistory: talkHistory,
                userNewSentence: userNewSentence
            },
            success(res) {
                _this.handleServerSuccessCallback(res);
            },
            fail(err) {
                _this.handleServerFailCallback(err);
            }
        })
    }

    public sendUserTextToService(text: string) {
        console.info(`sendUserTextToService: ${text}`);
        this.sendTextToService(getApp().globalData.openId, getLanguage(), getMode(), getSpeed(), getVcn(), getPrompt(), getStyle(), getEmotion(), text);
    }

    /**
    * 将用户的语音传递给服务端
    * @param path 录音文件的本地路径
    */
    private sendUserVoiceToService(path: string) {
        log.info("sendUserVoiceToService: path - ", path)
        const _this = this;
        this.callback.onStartDownload();
        wx.uploadFile({
            url: `https://www.yubanstar.top/voice`,
            filePath: path,
            formData: {
                openId: getApp().globalData.openId,
                origin: getLanguage(),
                personName: getVcn(),
                mode: getMode(),
                speed: getSpeed(),
                vcn: getVcn(),
                prompt: getPrompt(),
                style: getStyle(),
                emotion: getEmotion(),
                talkHistory: talkHistory
            },
            name: 'file',
            timeout: 20000,
            success(res) {
                _this.handleServerSuccessCallback(res);
            },
            fail(err) {
                _this.handleServerFailCallback(err);
            }
        });
    }

    private handleServerSuccessCallback(res) {
        let data = res.data;
        console.info(`code: ${res.statusCode} sendUserVoiceToService response: ${data} type: ${typeof data}`);
        if (res.statusCode !== 200) {
            log.error('后台异常');
            this.callback.onError('Internal Server Error')
            return;
        }
        this.setTalkHistory();
        if (typeof data === 'string') {
            data = JSON.parse(data);
        }
        startTap = false;
        const user = data.user;
        const result = data.result;
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
        this.reportData(user, serverResponseText);
        const db = getApp().globalData.db;
        const _ = db.command;
        db.collection('user_rate_limit').where({
            _openid: getApp().globalData.openId
        }).update({
            // data 传入需要局部更新的数据
            data: {
                conversation_remaining_usage_count: _.inc(-1)
            },
            success: function (res) {
                log.info(`用户使用次数-1`)
            }
        })
        this.callback.onGetWholeTextArray(textArray, urlArray, user)
        // TODO, 这里应该封装成一个完整的函数放在chat.js中控制，并由chat.js在调用这个接口前开始展示loadding进度条，在播放完毕后隐藏进度条
        // 或者可以在ttsCallback增加一个针对单个句子开始下载、下载完毕的回调通知，全部都放在callback里实现
        this.playNext(0, result, this.callback);
    }

    private handleServerFailCallback(err) {
        log.error(err);
        this.callback.onError(err.errMsg)
    }

    setTalkHistory() {
        console.info(`setTalkHistory`);
        wx.cloud.callFunction({
            // 云函数名称
            name: 'getUserTalkHistory',
            data: {
                sessionId: getSessionId()
            },
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
        // 空数据也一样存，后台会过滤掉
        wx.cloud.callFunction({
            // 云函数名称
            name: 'userDataReport',
            data: {
                userText: user,
                serverResponseText: response,
                partnerName: getApp().globalData.user_setting_data.name,
                sessionId: getSessionId()
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
    try {
      const res = await wx.cloud.callFunction({
        name: 'getUserRemainCount'
      });
      console.info(`recordLogic res: ${JSON.stringify(res)}`);
      if (res && res.result) {
        const currentUsageCount = res.result.currentUsageCount;
        return currentUsageCount;
      }
    } catch (err) {
      console.error(`recordLogic err: ${err}`);
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
    onGetWholeTextArray(textArray: Array<string>, textUrl: Array<string>, userText: string): void
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