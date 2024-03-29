// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const openid = wxContext.OPENID;
    try {
        const res = await db.collection('user_talk_history').where({
            openid: openid
          })
          .orderBy('time', 'desc')
          .limit(5)
          .get();
          const data = res.data;
          console.log(data)
          return {data: data};
    } catch(error) {
        return {data: []}
    }
}