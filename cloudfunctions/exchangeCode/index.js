// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境

const db = cloud.database()
const _ = db.command

const CODE_NOT_FOUND = 300001
const CODE_HAS_BEEN_USED = 300002
const USER_DATA_EXCEPTION = 300003

// 云函数入口函数
exports.main = async (event, context) => {
    let {
        cdKeyCode
    } = event
    let {
        OPENID
    } = cloud.getWXContext() // 这里获取到的 openId 和 appId 是可信的
    const cdkeyCollection = db.collection('CDKEY')
    const cdkCollectionRes = await cdkeyCollection.where({
        cdkey: cdKeyCode
    }).get()
    if (!(cdkCollectionRes && cdkCollectionRes.data && cdkCollectionRes.data.length > 0 && cdkCollectionRes.data[0])) {
        return {
            code: CODE_NOT_FOUND,
            message: 'code not found'
        }
    }
    // 兑换码一定存在，只是是否有被使用而已
    const remainNum = cdkCollectionRes.data[0].num; // 兑换码对应的使用次数
    const consumeState = cdkCollectionRes.data[0].consume_state;
    if (consumeState) {
        // 兑换码已经被使用
        return {
            code: CODE_HAS_BEEN_USED,
            message: 'code has been used'
        }
    } else {
        // TODO, 给用户增加使用次数
        const userRateLimitRes = await db.collection("user_rate_limit").where({
            _openid: OPENID
        }).get()
        if (userRateLimitRes && userRateLimitRes.data && userRateLimitRes.data.length > 0 && userRateLimitRes.data[0]) {
            // 查询用户的剩余使用次数成功
            const conversation_remaining_usage_count = userRateLimitRes.data[0].conversation_remaining_usage_count + remainNum;
            // 更新，默认成功
            db.collection("user_rate_limit").where({
                _openid: OPENID
            }).update({
                data: {
                    conversation_remaining_usage_count: conversation_remaining_usage_count
                }
            });
            // 这里要更新对应兑换码记录的消费状态
            cdkeyCollection.where({
                cdkey: cdKeyCode
            }).update({
                data: {
                    consume_state: true,
                    open_id: OPENID
                }
            })
            return {
                code: 0,
                message: 'success'
            }
        } else {
            // 失败，这里就有问题了
            return {
                code: USER_DATA_EXCEPTION,
                message: 'user data exception, attach admin'
            }
        }
    }
}