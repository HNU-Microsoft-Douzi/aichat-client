import { playAudio } from "../pages/chat/recordManage";
import { getGrammerTreeJson } from "../pages/chat/request";

Component({
    properties: {
        text: {
            type: String,
            value: '',
            observer: 'onTextChange'
        }
    },
    data: {
        showTextGroup: false,
        sentences: [],
        audioFileNames: [],
        current_index: -1
    },
    methods: {
        // TODO, weszhang, 注意，这里在播报的时候的点击行为如何兼容？
        onTap: function (event: any) {
            const index = event.currentTarget.dataset.index;
            console.log('text-view with index', index, 'is tapped');
            this.setData({
                current_index: index
            })
            // const that = this;
            // TODO, weszhang, 我觉得语法树的呈现这里暂时还没有想的特别清楚，先暂时不要上线了
            // const callback = {
            //     onStart: () => {
            //       console.log('请求开始');
            //     },
            //     onSuccess: (response) => {
            //         const translation = response['translation']
            //         const keyWords = response['key words']
            //         var formatVocabularies = ""
            //         for (const word of keyWords) {
            //             console.info(`words: ${JSON.stringify(word)}`)
            //             formatVocabularies = formatVocabularies + that.formatVocabulary(word) + "\n"
            //         }
            //         const child = that.selectComponent('#grammer-tree');
            //         child.setContent(translation, "", formatVocabularies);
            //         child.hideIndicatorView(1);
            //         child.showComponent();
            //     //   console.log(`请求成功，响应数据为：${response.data}`);
            //     },
            //     onFail: () => {
            //       console.log('请求失败');
            //     }
            //   };
            // getGrammerTreeJson(this.data.sentences[index], callback)
            playAudio(this.data.audioFileNames[index], this.data.sentences[index])
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
                    showTextGroup: true
                })
            }
        },
        hide: function () {
            console.info('hide')
            this.setData({
                showTextGroup: false
            })
        },
        reverseAiTextViewShowState: function () {
            if (this.data.sentences.length !== 0) {
                this.setData({
                    showTextGroup: !this.data.showTextGroup
                })
            } else {
                this.hide()
            }
        }
    }
})