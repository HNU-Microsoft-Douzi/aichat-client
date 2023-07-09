// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const db = cloud.database()
const _ = db.command

async function getUserPartnerName(openid) {
    const res = await db.collection('user_setting').where({
        _openid: openid
    }).get();
    if (res && res.data && res.data.length > 0 && res.data[0]) {
        // get data success
        console.log(`get user partner_id success: ${res.data[0].partner_name}`);
        const partner_name = res.data[0].partner_name;
        return partner_name;
    } else {
        // 使用默认的id
        return '莉莉';
    }
}

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const openid = wxContext.OPENID;
    let {
        sessionId
    } = event
    try {
        // 先获取用户的选择
        const partnerName = await getUserPartnerName(openid);
        const res = await db.collection('user_talk_history').where({
            openid: openid,
            partner: partnerName, 
            sessionId: sessionId,
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