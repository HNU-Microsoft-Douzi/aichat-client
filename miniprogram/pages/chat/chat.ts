// pages/chat/chat.ts

import { _getUserSettingData } from "miniprogram/utils/user-setting"
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
        userNewSentence: ''
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
            },
            onStartDownload() {
                const inputComponent = page.selectComponent('.voice-input');
                inputComponent.setLoadingState(true);
            },
            onGetWholeTextArray(sentences: [string], urls: [string], userText: string) {
                log.info("sentences:" + sentences)
                const inputComponent = page.selectComponent('.voice-input');
                inputComponent.setLoadingState(false);
                log.info(sentences)
                page.setSentences(sentences, urls)
                page.showAiTextView()
                page.setData({
                    userNewSentence: userText
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
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        getUsageCount().then(userUsageCount => {
            getApp().globalData.usageCount = userUsageCount
        })
        const _this = this;
        setTimeout(() => {
            const vR: VoiceRecordManage = _this.data.voiceRecorder;
            if (vR) {
                vR.sendUserTextToService('');
            }
        }, 1000);
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        console.info(`onShow`)
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
        vR.stopAudioPlay()
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
            userNewSentence: userNewSentence
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
    }
})