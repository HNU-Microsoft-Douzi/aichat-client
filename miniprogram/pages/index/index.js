// index.ts
import lottie from 'lottie-miniprogram'
Page({
    data: {
    },
    onLoad() {
    },

    init() {
        if (this._inited) {
          return
        }
        wx.createSelectorQuery().selectAll('#c1').node(res => {
          const canvas = res[0].node
          const context = canvas.getContext('2d')
    
          canvas.width = 300
          canvas.height = 300
    
          lottie.setup(canvas)
          this.ani = lottie.loadAnimation({
            loop: true,
            autoplay: true,
            animationData: require('../../json/curve-wave.js/index.js'),
            rendererSettings: {
              context,
            },
          })
          this._inited = true
        }).exec()
      },
      play() {
        this.ani.play()
      },
      pause() {
        this.ani.pause()
      },
})
