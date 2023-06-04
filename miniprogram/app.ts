// app.ts

App<IAppOption>({
    globalData: {
        openId: null,
        db: null,
        inviteCode: null,
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
                    database.collection(app.globalData.share_table_name).where({
                        _openid: openid
                    }).get().then(res => {
                        app.globalData.inviteCode = res.data[0].inviate_code;
                        console.info(`get inviate code success ${res.data[0].inviate_code}`);
                    })
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
                }
            },
            fail: console.error
        })
    }
})