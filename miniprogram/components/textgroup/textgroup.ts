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
                    console.info(`start download tts`);
                },
                onSuccess() {
                    console.info(`download tts success`);
                }
            }))
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