// app.ts
App<IAppOption>({
    globalData: {
        openId: null,
        db: null,
        inviteCode: null,
        share_table_name: 'user_share',
        user_limit_table_name: 'user_rate_limit',
        partner_name: 'partner',
        user_setting: 'user_setting',
        usageCount: 0,
        user_setting_data: {},
    },
    onLaunch(options) {
        console.log('App Launch', options)
        const app = this;
        wx.cloud.init({
            env: 'cloud1-4gneo72a0a88fdf3'
        });

        this.initUserSettingData();
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
                        if (res && res.data && res.data.length > 0 && res.data[0]) {
                            // get data success
                            console.log(`查询记录成功， 用户剩余使用次数: ${res.data[0].conversation_remaining_usage_count}`)
                        } else {
                            console.log(`记录不存在`)
                            // 开始插入数据
                            database.collection(app.globalData.user_limit_table_name).add({
                                // data 字段表示需新增的 JSON 数据
                                data: {
                                    conversation_remaining_usage_count: 80, // 初始化用户使用次数为80
                                    create: new Date()
                                }
                            }).then(res => {
                                console.log(`insert user usage data success`)
                            })
                        }
                    }, err => {
                        console.error('查询记录失败：', err)
                    });
                }
            },
            fail: console.error
        });
        // 获取分享来源信息
        if (options.query && options.query.openid) {
            // 判断是否通过分享进入小程序，即是否包含 openid 参数
            console.log('通过分享进入小程序')
            // 将 openid 存储到全局数据的 userInfo 对象中
            const userInfo = {
                openid: options.query.openid
            }            
            getApp().globalData.userInfo = userInfo
            wx.cloud.callFunction({
                // 云函数名称
                name: 'updateUserShareReward',
                data: {
                    shared_openid: options.query.openid
                },
                success: function (res) {
                    const result = res.result;
                    console.info(`updateUserShareReward: ${JSON.stringify(result)}`)
                },
                fail: console.error
            })
        } else {
            console.log('通过搜索等方式进入小程序')
        }
    },
    initUserSettingData() {
        console.info(`initUserSettingData`)
        const _this = this;
        wx.cloud.callFunction({
            // 云函数名称
            name: 'getUserSelectPartner',
            success: function (res) {
                const result = res.result;
                // console.info(`getUserSelectPartner: ${JSON.stringify(result)}`)
                _this.globalData.user_setting_data = result;
            },
            fail: console.error
        })
    },
})