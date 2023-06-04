import { setStorage, MODEULE_KEY } from "../../utils/storage-util"

// components/audio-setting-popup/audio-setting-pop.ts
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        radio: "1",
        radioSecond: "1",
        show: false,
        currentValue: 100
    },

    /**
     * 组件的方法列表
     */
    methods: {
        loadCache() {
            try {
                var value = wx.getStorageSync('language')
                if (value) {
                  this.setData({
                      radio: value
                  })
                }
              } catch (e) {
                // Do something when catch error
                console.error(e)
              }
              try {
                var value = wx.getStorageSync('ttsEngine')
                if (value) {
                  this.setData({
                      radioSecond: value
                  })
                }
              } catch (e) {
                // Do something when catch error
                console.error(e)
              }
              try {
                var value = wx.getStorageSync('audioSpeed')
                if (value) {
                  this.setData({
                    currentValue: value * 100
                  })
                }
              } catch (e) {
                // Do something when catch error
                console.error(e)
              }
        },
        onLoad() {
            this.loadCache();
        },
        onChange(event) {
            const radio = event.detail;
            console.info(`language radio: ${radio}`)
            this.setData({
                radio: radio,
            });
            setStorage(MODEULE_KEY.LANGUAGE, radio);
        },

        onChangeSecond(event) {
            const radio = event.detail;
            this.setData({
                radioSecond: radio,
            });
            setStorage(MODEULE_KEY.TTS_ENGINE, radio);
        },
        onClose() {
            this.setData({ show: false });
        },
        onDrag(event) {
            const speed = event.detail.value;
            this.setData({
                currentValue: event.detail.value,
            });
            setStorage(MODEULE_KEY.AUDIO_SPEED, speed / 100);
        },
        show() {
            this.setData({
                show: true
            })
            this.loadCache();
        }
    }
})
