export function sendUserTextToService(msg: String, requestCall: RequestCallback) {
    console.log("sendUserTextToService: " + msg)
    requestCall.onStart()
    // 开始向后台发送post请求
    wx.request({
        url: 'https://www.learnaitutorenglish.club/chat', //仅为示例，并非真实的接口地址
        data: {
            text: msg
        },
        timeout: 30000,
        header: {
            'content-type': 'application/json' // 默认值
        },
        success(res) {
            const { result } = res.data
            console.log(`sendUserTextToService response: ${result}`)
            requestCall.onSuccess(result)
        },
        fail(res) {
            console.error(res.errMsg)
            requestCall.onFail()
        }
    })
}

interface RequestCallback {
    onStart(): void
    onSuccess(text: string): void
    onFail(): void
}
