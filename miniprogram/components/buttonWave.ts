// components/buttonwave.ts

const shineButtonConst = ['shine-button', 'shine-button active']
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        "canvasWidth": {
            type: Number,
            value: 500
        },
        "canvasHeight": {
            type: Number,
            value: 500
        },
        hidden: {
            type: Boolean,
            value: false
          }
    },
    observers: {
        'hidden': function(hidden) {
          if (hidden) {
            this.setData({
              show: false
            });
          } else {
            this.setData({
              show: true
            });
          }
        }
      },
    /**
     * 组件的初始数据
     */
    data: {
        show: true,
        classStyle: shineButtonConst[1],
    },

    lifetimes: {
    },

    /**
     * 组件的方法列表
     */
    methods: {
        setActivateState(result: boolean) {
            console.log(`setActivateState: ${result} ${this.data.classStyle}`)
            if (result == true && this.data.classStyle !== shineButtonConst[1]) {
                console.log(`setActivate classStyle: ${shineButtonConst[1]}`)
                this.setData({
                    classStyle: shineButtonConst[1]
                })
            }
            if (result == false && this.data.classStyle !== shineButtonConst[0]) {
                console.log(`setActivate classStyle: ${shineButtonConst[0]}`)
                this.setData({
                    classStyle: shineButtonConst[0]
                })
            }
        }
    }
})
