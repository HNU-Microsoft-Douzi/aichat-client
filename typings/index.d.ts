/// <reference path="./types/index.d.ts" />

interface IAppOption {
    globalData: {
        userInfo?: WechatMiniprogram.UserInfo,
        openId: string | null,
        db: DB.Database | null
        inviteCode: string | null,
        share_table_name: string,
        user_limit_table_name: string
    }
    userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback
}