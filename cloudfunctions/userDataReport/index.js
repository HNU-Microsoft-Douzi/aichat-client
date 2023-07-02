// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const openid = wxContext.OPENID;
    let {
        userText,
        serverResponseText,
        partnerName,
        sessionId
    } = event
    db.collection('user_talk_history').add({
        // data 字段表示需新增的 JSON 数据
        data: {
            // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
            openid: openid,
            partner: partnerName, 
            sessionId: sessionId,
            time: new Date(),
            user: userText,
            response: serverResponseText
        },
        success: function (res) {
            // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
            console.log(res)
        }
    })
    return {
        code: 0,
        message: 'success'
    }
}