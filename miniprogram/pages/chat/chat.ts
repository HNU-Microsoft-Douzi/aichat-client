// pages/chat/chat.ts

import { resetSessionId } from "../../utils/session-manager"
import { getUsageCount, VoiceRecordManage } from "../../utils/record-manage"

const textContainerPaddingBottomSize = 20
const textContainerPaddingBottomUpWithKeyboard = 5

var log = require('../../utils/log.js')

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
        longPressButtonParams: {
            centerX: 0,
            centerY: 0,
            radius: 0
        },
        url: '',
        userNewSentence: '',
        loading: false
    },

    onTouchStart() {
        log.info("onTouchStart")
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
        const page = this
        const vR = new VoiceRecordManage(({
            onError(errorMsg: string) {
                log.error(errorMsg)
                page.showAiTextView()
                const inputComponent = page.selectComponent('.voice-input');
                inputComponent.setLoadingState(false);
                page.setData({
                    loading: false
                });
            },
            onStart() {
                log.info(`record start`)
            },
            onEnd() {
                log.info(`record end`)
                getApp().globalData.usageCount = getApp().globalData.usageCount - 1;
            }
        }), ({
            onError(errorMsg: string) {
                log.error(errorMsg)
                const inputComponent = page.selectComponent('.voice-input');
                inputComponent.setLoadingState(false);
                page.setSentences(['抱歉，你的网络好像不太好'], [""])
                page.showAiTextView();
                page.setData({
                    loading: false
                });
            },
            onStartDownload() {
                const inputComponent = page.selectComponent('.voice-input');
                inputComponent.setLoadingState(true);
            },
            onGetWholeTextArray(sentences: [string], urls: [string], userText: string) {
                log.info(`sentences: ${sentences} userText: ${userText}`)
                const inputComponent = page.selectComponent('.voice-input');
                inputComponent.setLoadingState(false);
                page.setSentences(sentences, urls)
                page.showAiTextView()
                page.setData({
                    userNewSentence: userText,
                    loading: false
                })
            },
            onTraverseIndex(index: number) {
                log.info("onTraverseIndex: " + index)
                page.highlightSentence(index)
            },
            startDownloadTtsSentence() {
                console.info(`startDownloadTtsSentence`)
            },
            endDownloadTtsSentence() {
                console.info(`endDownloadTtsSentence`)
            }
        }))
        this.data.voiceRecorder = vR;
        vR.authJudge()
         // 在页面 onLoad 时调用 wx.showShareMenu() 方法来显示分享菜单
         wx.showShareMenu({
            withShareTicket: true // 是否使用带 shareTicket 的转发
          });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        this.launchFirstCall(500);
    },

    launchFirstCall(delay: number) {
        const _this = this;
        getUsageCount().then(userUsageCount => {
            getApp().globalData.usageCount = userUsageCount
            if (userUsageCount > 0) {
                _this.sendTextToService();
            };
        })
    },

    sendTextToService() {
        const vR: VoiceRecordManage = this.data.voiceRecorder;
        if (vR) {
            wx.cloud.callFunction({
                // 云函数名称
                name: 'getUserChatParams',
                success: function (res) {
                    const result = res.result;
                    if (result) {
                        vR.sendTextToService(result.openid, result.language, 1, result.speed, result.vcn, result.prompt, result.text_style, result.voice_style, '');
                    } else {
                        console.error(`getUserChatParams get result nothing`);
                    }
                },
                fail: console.error
            })
        }
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        console.info(`onShow`)
        this.updateImage();
    },

    updateImage() {
        const _this = this;
        wx.cloud.callFunction({
            // 云函数名称
            name: 'getUserSelectPartner',
            success: function (res) {
                const result = res.result;
                console.info(`chat getUserSelectPartner: ${JSON.stringify(result)} image: ${result.image}`)
                _this.setData({
                    url: result.image
                })
            },
            fail: console.error
        })
    },

    onLongPressed() {
        console.info(`onLongPressed`)
        wx.vibrateShort({ type: "medium" })
        // this.data.startPoint = e.touches[0]; // 记录长按时开始点信息，后面用于计算上划取消时手指滑动的距离。
        const vR: VoiceRecordManage = this.data.voiceRecorder;
        vR.stopAudioPlay();
        vR.startRecord();
    },

    onConfirm(e) {
        const userNewSentence = e.detail.inputValue;
        console.log('inputValue:', userNewSentence);
        const vR: VoiceRecordManage = this.data.voiceRecorder;
        if (vR) {
            vR.sendUserTextToService(userNewSentence);
        }
        this.setData({
            userNewSentence: userNewSentence,
            loading: true
        })
    },

    onTouchEnd() {
        console.info(`onTouchEnd`)
        const vr: VoiceRecordManage = this.data.voiceRecorder
        if (vr) {
            log.info(`onTouchEnd stopRecord`, vr)
            vr.stopRecord()
        }
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

    //失去聚焦o
    blur: function (e) {
        this.setData({
            textContainerBottom: 0,
            textContainerPaddingBotton: textContainerPaddingBottomSize,
            textContainerBgColor: "#f1eded86"
        })
        this.showAiTextView()
    },

    aiImageViewClickEvent: function () {
        log.info('aiImageViewClickEvent')
        this.reverseAiTextViewShowState()
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
    },
    onPartnerChange(event) {
        console.info(`onPartnerChange ${event.detail.name}`);
        this.updateImage();
        resetSessionId();
        this.hideAiTextView();
        this.setData({
            inputValue: '',
            userNewSentence: ''
        })
        // 更新历史记录
        const vR: VoiceRecordManage = this.data.voiceRecorder;
        if (vR) {
            vR.setTalkHistory();
            vR.stopAudioPlay();
        }
        const inputComponent = this.selectComponent('.voice-input');
        inputComponent.setLoadingState(true);
        // TODO, 假设这个时候用户刚打开小程序，第一次调用还没回来，那么这个时候需要将第一次调用关掉，然后重启一次新的调用
        this.launchFirstCall(1000);
    },  
    onShareAppMessage: function (options) {
        // 获取当前用户的 openid
        const openid = getApp().globalData.openId
        // 构建分享的数据对象
        const shareData = {
          title: '万象虚拟派',
          path: '/pages/chat/chat?openid=' + openid
        }
        // 返回分享的数据对象
        return shareData
      },
      onShareTimeline: function () {
        const shareData = {
          title: '万象虚拟派',
          imageUrl: 'https://example.com/share-timeline-image.jpg',
        }
        return shareData
      }
})