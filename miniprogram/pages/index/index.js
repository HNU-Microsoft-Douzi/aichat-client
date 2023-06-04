// index.ts
import lottie from 'lottie-miniprogram'
Page({
    data: {
        radio: "1",
        radioSecond: "1",
        show: true,
        currentValue: 60,
    },
    onChange(event) {
        this.setData({
            radio: event.detail,
        });
    },

    onChangeSecond(event) {
        this.setData({
            radioSecond: event.detail,
        });
    },

    onClick(event) {
        const {
            name
        } = event.currentTarget.dataset;
        this.setData({
            radio: name,
        });
    },
    onClose() {
        this.setData({ show: false });
      },
      onDrag(event) {
        this.setData({
          currentValue: event.detail.value,
        });
      },
})