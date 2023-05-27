// index.ts
import lottie from 'lottie-miniprogram'
Page({
    data: {
        side: {//滑动操作
          newopen: false,//判断侧边栏是否打开-显示
        },
      },
      tap_click: function () {//点击菜单
          this.setData({ 'side.newopen': !this.data.side.newopen });
      }
})
