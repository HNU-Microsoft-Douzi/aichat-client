// components/grammerTreeGroup.ts
Component({
    properties: {
    },

    data: {
        componentVisible: false,
        translationVisible: true,
        grammarVisible: true,
        wordsVisible: true,
        translation: "译文",
        grammar: "语法树",
        words: "词汇"
    },

    methods: {
        hideComponent: function () {
            this.setData({
                componentVisible: false
            })
        },

        setContent(translation: string, grammarTree: string, words: string) {
            this.setData({
                translation: translation,
                grammar: grammarTree,
                words: words
            })
        },

        showComponent: function () {
            this.setData({
                componentVisible: true
            })
        },

        /**
         * 隐藏指定的view
         * @param index 隐藏view对应的索引
         */
        hideIndicatorView(index: number) {
            console.info(`index: ${index}`)
            switch (index) {
                case 0:
                    this.setData({ translationVisible: false });
                    break;
                case 1:
                    this.setData({ grammarVisible: false });
                    break;
                case 2:
                    this.setData({ wordsVisible: false });
                    break;
            }
        },
    },
});