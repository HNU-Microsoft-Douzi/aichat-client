// export function sendUserTextToService(msg: String, requestCall: RequestCallback) {
//     console.log("sendUserTextToService: " + msg)
//     requestCall.onStart()
//     // 开始向后台发送post请求
//     wx.request({
//         url: 'https://www.yubanstar.top/chat',
//         data: {
//             text: msg
//         },
//         timeout: 30000,
//         header: {
//             'content-type': 'application/json' // 默认值
//         },
//         success(res) {
//             const { result } = res.data
//             console.log(`sendUserTextToService response: ${result}`)
//             requestCall.onSuccess(result)
//         },
//         fail(res) {
//             console.error(res.errMsg)
//             requestCall.onFail()
//         }
//     })
// }

export function getGrammerTreeJson(sentence: string, requestCall: RequestCallback) {
    if (!sentence || sentence.trim().length === 0) {
        console.error(`getGrammerTree error: sentence is null`)
        return;
    }
    requestCall.onStart()
    wx.request({
        url: 'https://www.yubanstar.top/syntaxtree',
        data: {
            text: sentence
        },
        timeout: 30000,
        header: {
            'content-type': 'application/json' // 默认值
        },
        success(res) {
            const data = res.data
            console.info(`data: ${JSON.stringify(data)}`)
            const translation = data['translation']
            const keyWords = data['key words']
            console.info(`translation: ${translation} keyWords: ${keyWords}`)
            requestCall.onSuccess(data)
        },
        fail(res) {
            console.error(res.errMsg)
            requestCall.onFail()
        }
    })
}

export function getTranslation(sentence: string) {
    return new Promise((resolve, reject) => {
        if (!sentence || sentence.trim().length === 0) {
            reject(`sentence is null`);
            console.error(`getGrammerTree error: sentence is null`);
            return;
        }
        wx.request({
            url: 'https://www.yubanstar.top/translate',
            data: {
                text: sentence
            },
            timeout: 10000,
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                const data = res.data
                console.info(`data: ${JSON.stringify(data)}`);
                const translation = data['translation'];
                console.info(`translation: ${translation}`);
                resolve(translation);
            },
            fail(error) {
                resolve(error);
            }
        })
    });
}


function isJson(str) {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  }
  

interface RequestCallback {
    onStart(): void
    onSuccess(response: any): void
    onFail(): void
}

