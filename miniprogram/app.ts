// app.ts

App<IAppOption>({
    globalData: {
        openId: null,
        db: null,
        inviteCode: null,
        ttsMode: 0,
        ttsSpeed: 60,
        ttsVcn: "x3_xiaoyue",
        share_table_name: 'user_share',
        user_limit_table_name: 'user_rate_limit',
    },
    onLaunch() {
        const app = this;
        wx.cloud.init();
        const database = wx.cloud.database();
        this.globalData.db = database;
        wx.cloud.callFunction({
            // 云函数名称
            name: 'getUserInfo',
            success: function (res) {
                console.log(`callFunction: getUSerInfo res:`)
                if (res !== undefined && res.result !== undefined) {
                    const openid = res.result.openid;
                    const unionid = res.result.unionid;
                    app.globalData.openId = openid;
                    database.collection(app.globalData.user_limit_table_name).where({
                        _openid: openid
                    }).get().then(res => {
                        // res.data 包含该记录的数据
                        console.log(`查询记录成功， 用户剩余使用次数: ${res.data[0].conversation_remaining_usage_count}`)
                    }, err => {
                        console.error('查询记录失败：', err)
                        // 开始插入数据
                        database.collection(app.globalData.user_limit_table_name).add({
                            // data 字段表示需新增的 JSON 数据
                            data: {
                                conversation_remaining_usage_count: 60, // 初始化用户使用次数为60
                                create: new Date()
                            }
                        })
                            .then(res => {
                                console.log(res)
                            })
                    });
                    console.log(`openid: ${openid} share_table_name: ${app.globalData.share_table_name}`)
                    database.collection(app.globalData.share_table_name).where({
                        _openid: openid
                    }).get().then(res => {
                        if (! res.data[0] || ! res.data[0].inviate_code) {
                            database.collection(app.globalData.share_table_name).add({
                                // data 字段表示需新增的 JSON 数据
                                data: {
                                    inviate_code: Math.random().toString(36).substr(2, 8) + Math.random().toString(36).substr(2, 8), // 初始化用户的邀请码，为一个随机数
                                    create: new Date()
                                }
                            }).then(res => {
                                console.log(`邀请码记录插入成功`)
                            })
                        } else {
                            console.log(`查询记录成功， 用户邀请码为: ${res.data[0].inviate_code}`)
                        }
                    }, err => {
                        console.error('邀请码记录不存在', err)
                        // 开始插入数据
                        database.collection(app.globalData.share_table_name).add({
                            // data 字段表示需新增的 JSON 数据
                            data: {
                                inviate_code: Math.random().toString(36).substr(2, 8) + Math.random().toString(36).substr(2, 8), // 初始化用户的邀请码，为一个随机数
                                create: new Date()
                            }
                        }).then(res => {
                            console.log(`邀请码记录插入成功`)
                        })
                    })
                }
            },
            fail: console.error
        })
    },

    onShow(options) {
        console.info('onShow')
        console.info(options)
        const inviteCode = options.query.inviteCode;
        this.globalData.inviteCode = inviteCode;
        console.info(`onShow inviteCode: ${inviteCode}`)
        // TODO, 这里要查询到对应用户的openId，然后增加奖励

        // 激活码数据库初始化
        // const db = wx.cloud.database()
        // const test = db.collection('CDKEY')
        // for (let i = 0; i < 1000; i++) {
        //   const data = {
        //     cdkey: Math.random().toString(36).substr(2, 12),
        //     num: 30,
        //     consume_state: false,
        //     open_id: null
        //   }
        //   test.add({
        //     data: data,
        //     success: function(res) {
        //       console.log('插入成功', res)
        //     },
        //     fail: function(err) {
        //       console.error('插入失败', err)
        //     }
        //   })
        // }
    },
})