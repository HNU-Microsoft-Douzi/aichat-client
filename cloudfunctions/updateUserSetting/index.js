// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境
const database = cloud.database()
const _ = database.command

// 云函数入口函数
exports.main = async (event, context) => {
    let {
        partner_name
    } = event

    const wxContext = cloud.getWXContext()
    const userSettingCollection = database.collection('user_setting');

    const res = await userSettingCollection.where({
        _openid: wxContext.OPENID
    }).get();
    try {
        if (res && res.data && res.data.length > 0) {
            // 如果存在符合条件的记录，则更新记录
            await userSettingCollection.where({
                _openid: wxContext.OPENID
            }).update({
                data: {
                    partner_name: partner_name
                }
            });
            console.log(`update user usage data success`);
        } else {
            // 如果不存在符合条件的记录，则插入新记录
            await userSettingCollection.add({
                data: {
                    _openid: wxContext.OPENID,
                    create: new Date(),
                    partner_name: partner_name
                }
            });
            console.log(`insert user usage data success`);
        }
        return {
            result: 0,
            msg: 'success'
        }
    } catch (e) {
        return {
            result: -10000,
            msg: e
        }
    }
}