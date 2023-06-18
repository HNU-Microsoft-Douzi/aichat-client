import { getMode, getSpeed } from "../../utils/tts-storage-util"
import { setStorage, MODEULE_KEY, getStroage } from "../../utils/storage-util"

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
              this.setData({
                currentValue: getSpeed() * 100,
                radioSecond: getMode().toString(),
                radio: getStroage(MODEULE_KEY.LANGUAGE)
              })
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
