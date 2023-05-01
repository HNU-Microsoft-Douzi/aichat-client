// components/curveWaveAnim.ts
import lottie from 'lottie-miniprogram'
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        "canvasWidth": {
            type: Number,
            value: 1600
        },
        "canvasHeight": {
            type: Number,
            value: 1200
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        _inited: false,
        ani: null,
        text: "松开发送"
    },

    lifetimes: {
        ready() {
            if (this.data._inited) {
                return
            }

            // 在这里处理文件保存成功后的逻辑
            const query = this.createSelectorQuery().in(this);
            query.select('#c1').fields({ node: true, size: true }).exec((res) => {
                console.info("curveWave");
                console.info(res);
                const canvas = res[0].node;
                const context = canvas.getContext('2d')

                canvas.width = this.properties.canvasWidth
                canvas.height = this.properties.canvasHeight
                lottie.setup(canvas)
                this.data.ani = lottie.loadAnimation({
                    loop: true,
                    autoplay: false,
                    // animationData: require('../json/curve-wave.js'),
                    path: 'https://www.learnaitutorenglish.club/lottie?filename=curve-wave.json',
                     rendererSettings: {
                        context,
                    },
                })
                this.data._inited = true
            });
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        play() {
            const ani: any = this.data.ani
            if (ani) {
                ani.play()
            }
        },
        pause() {
            const ani: any = this.data.ani
            if (ani) {
                ani.pause()
            }
        },
        changeText(text: string) {
            if (this.data.text != text) {
                this.setData({
                    text: text
                })
            }
        }
    }
})
