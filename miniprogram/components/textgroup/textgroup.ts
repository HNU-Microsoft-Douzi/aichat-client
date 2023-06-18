import { getTranslation } from "../../utils/request";
import { playAudio } from "../../utils/record-manage";

Component({
    properties: {
        text: {
            type: String,
            value: '',
            observer: 'onTextChange'
        }
    },
    data: {
        showProgess: false,
        showTextGroup: false,
        sentences: [],
        audioFileNames: [],
        current_index: -1,
        translation: "",
        showTranslateView: false,
        marginTop: '-50px',
        percentage: 8,
        timerId: -1,
        timerStarted: false,
        loaddingSuccess: false
    },
    methods: {
        // TODO, weszhang, 注意，这里在播报的时候的点击行为如何兼容？
        onTap: function (event: any) {
            const that = this;
            const index = event.currentTarget.dataset.index;
            console.log('text-view with index', index, 'is tapped');
            this.setData({
                current_index: index,
                loaddingSuccess: false,
                showTranslateView: true
            })
            const sentence = this.data.sentences[index]
            // TODO, show loading
            getTranslation(sentence).then(res => {
                if (res && String(res).length > 0) {
                    // TODO, 隐藏loadding
                    const translation = res as string
                    this.setData({
                        translation: translation,
                        loaddingSuccess: true
                    })
                }
                // 加载结束
            }).catch(error => {
                // TODO, 隐藏loadding
                // TODO, 展示失败结果，让用户进行重试
            })
            playAudio(this.data.audioFileNames[index], this.data.sentences[index], ({
                onError(errorMsg) {

                },
                onStartDownload() {
                    that.startLoadProgress();
                },
                onSuccess() {
                    that.stopLoadProgress();
                }
            }))
        },
        startLoadProgress() {
            console.info(`startLoadProgress`)
            // 启动一个倒计时，1s后开始展示loadding进度条，并且每秒增加5%
            // 如果计时器已经启动，说明上一个item还没加载完，就加载下一个item，那么这里需要重新加载
            if (this.data.timerStarted) {
                this.stopTimer();
            }

            // 在0.5秒后启动计时器
            this.data.timerId = setTimeout(() => {
                this.data.timerStarted = true;
                this.startTimer();
            }, 500);
            // this.setData({
            //     showProgess: true
            // });
        },
        stopLoadProgress() {
            console.info(`stopLoadProgress`)
            // 如果loadding已经在展示了，那么将loadding冲到100%，300ms后关闭loadding
            this.setData({
                percentage: 100
            })
            setTimeout(() => {
                this.stopTimer();
                this.setData({
                    showProgess: false
                });
            }, 300)
        },
        startTimer() {
            console.info(`startTimer`)
            const that = this;
            this.data.timerId = setInterval(() => {
                console.info(`update process percentage`)
                that.setData({
                    percentage: Math.min(that.data.percentage + 5, 100)
                })
            }, 500);
        },
        stopTimer() {
            console.info(`stopTimer`)
            clearInterval(this.data.timerId);
            this.data.timerId = -1;
        },
        formatVocabulary(vocabulary) {
            let text = `Name: ${vocabulary.name}\n`;
            text += `Part of speech: ${vocabulary["part of speech"]}\n`;
            text += `Type: ${vocabulary.type.join(', ')}\n`;
            text += `Paraphrase: ${vocabulary.paraphrase}\n`;
            text += `Memory way: ${vocabulary["memory way"]}\n`;
            return text;
        },

        setSentences: function (sentences: [], audioFileNames: []) {
            console.info(sentences)
            console.info(sentences)
            this.setData({ sentences: sentences, current_index: -1, audioFileNames: audioFileNames });
        },
        highlight: function (index: number) {
            console.info(`highlight index: ${index}`)
            this.setData({
                current_index: index
            })
        },
        show: function () {
            console.info('show')
            if (this.data.sentences.length !== 0) {
                this.setData({
                    showTextGroup: true,
                    showTranslateView: false,
                    percentage: 0
                })
            }
        },
        hide: function () {
            console.info('hide')
            this.setData({
                showTextGroup: false,
                showTranslateView: false
            })
        },
        reverseAiTextViewShowState: function () {
            if (this.data.sentences.length !== 0) {
                this.setData({
                    showTextGroup: !this.data.showTextGroup
                })
                if (this.data.translation !== "") {
                    this.setData({
                        showTranslateView: !this.data.showTranslateView
                    })
                }
            } else {
                this.hide()
            }
        }
    }
})