/// <reference path="./types/index.d.ts" />

interface IAppOption {
    globalData: {
        userInfo?: WechatMiniprogram.UserInfo,
        openId: string | null,
        db: DB.Database | null
        inviteCode: string | null,
        share_table_name: string,
        user_limit_table_name: string,
        usageCount: number,
        partner_name: string,
        default_partner_id: string,
        user_setting: string,
        user_setting_data: any
    }
    userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback
    _initUserSettingData(): void
}