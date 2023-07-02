// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const res = await db.collection('user_rate_limit').where({
        _openid: wxContext.OPENID
    }).get();
    const currentUsageCount = res.data[0].conversation_remaining_usage_count;
    return {
        event,
        currentUsageCount: currentUsageCount
    }
}