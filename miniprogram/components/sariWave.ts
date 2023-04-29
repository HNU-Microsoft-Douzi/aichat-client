// components/sariWave.ts
// TODO, 这个组件看起来存在内存泄漏的问题，持续使用内存会上升并最终导致crash
var wave = require("./wave");

Component({
    properties: {
        "canvasWidth": {
            type: Number,
            value: 300
        },
        "canvasHeight": {
            type: Number,
            value: 180
        }

    },

    data: {
        siriwave: null
    },

    lifetimes: {
        attached() {
            console.log("attached")
        },
        detached() {
            console.log("detached")
        },
        ready() {
            console.log(`width: ${this.data.canvasWidth} height: ${this.data.canvasHeight}`)
            this.data.siriwave = new wave.SiriWave(
                {
                    width: this.data.canvasWidth,
                    height: this.data.canvasHeight,
                    speed: 0.3,
                    amplitude: 0.3,
                    container: "siri",
                    autostart: false,
                    cover: true
                },
                this
            );
        }
    },
    methods: {
        start() {
            const siriwave = this.data.siriwave
            if (siriwave) {
                siriwave.start()
                console.log("start play siriwave")
            } else {
                console.error("siriwave not init well")
            }
        },
        stop() {
            const siriwave = this.data.siriwave
            if (siriwave) {
                console.log("stop play siriwave")
                siriwave.stop()
            } else {
                console.error("siriwave not init well")
            }
        },
        setCanvasSize(width: Number, height: Number) {
          this.setData({
            canvasWidth: width,
            canvasHeight: height,
          })
        },
      },
});