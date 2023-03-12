// pages/chat/chat.ts
Page({

    /**
     * 页面的初始数据
     */
    data: {
        data: {
            userInfo:'',
            text: "这只是一个良好的开始",
            mode: 'scaleToFill',
            src: '../../images/v2_rr1x4o.jpg'
        }
    },
    /**
     * 点击事件
     */
    userClick: function() {
        // 获取输入框的内容
        console.log("用户点击操作")
        if (this.data.userInfo.length == 0) {
            console.log("用户输入为空，无法进行发送")
        } else {
            const page=this
            // 开始向后台发送post请求
            wx.request({
                url: 'https://154.38.240.226:5000/chat', //仅为示例，并非真实的接口地址
                data: {
                    text: this.data.userInfo
                },
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success (res) {
                    wx.showToast({
                        title: "success",
                        icon: 'none'
                      })
                  console.log(res.data)
                  page.setData({
                    text: res.data
                  })
                },
                fail(res) {
                    wx.showToast({
                        title: res.errMsg,
                        icon: 'none'
                      })
                }
              })
            // 开始将后台的返回内容展示到文本框中
            // 清空用户输入框的内容   
        }
    },

    /**
     * 用户的文本输入
     */
    userContentInput: function(e: { detail: { value: any } }) {
        this.setData({
            userInfo: e.detail.value
          })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        this.setData({
            mode: 'aspectFit',
            src: '../../images/v2_rr1x4o.jpg'
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})