// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const database = cloud.database();
const _ = database.command;

/**
 * 根据被分享人的openid找到是否有分享人
 * @param {} openid 被分享人的openid
 */
async function getUserSharedPerson(openid) {
    const res = await database.collection('user_share').where({
        _openid: openid
    }).get();
    if (res && res.data && res.data.length > 0 && res.data[0]) {
        // get data success
        console.log(`get user shared person success: ${res.data[0].shared_openid}`);
        const sharedOpenid = res.data[0].shared_openid;
        return sharedOpenid;
    } else {
        // 使用默认的id
        return null;
    }
}

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const {shareOpenId} = event; // 分享人的openId
    const beSharedOpenId = wxContext.OPENID; // 被分享人的openId
    const historySharedOpenId = await getUserSharedPerson(beSharedOpenId);
    // 检查是否有分享过
    if (historySharedOpenId) {
        return {
            code: 10000,
            msg: '用户已经被分享过了，不能重复进行分享'
        }
    } else {
        // 更新分享人和被分享人关联
        const userShareCollection = database.collection('user_share');
        userShareCollection.add({
            data: {
                _openid: beSharedOpenId,
                shared_openid: shareOpenId
            }
        });
        // 基于万象晶奖励
        const userRateLimit = database.collection('user_rate_limit');
        // 分享1个人得30个晶体，晶体用来做一些有趣的事情
        userRateLimit.where({
            _openid: wxContext.OPENID
        }).update({
            data: {
                crystal:  _.inc(30)
            }
        });
    }
    return {
        event,
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID,
    }
}