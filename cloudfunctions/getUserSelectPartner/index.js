// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const database = cloud.database()
const _ = database.command


async function _getUserPartnerName(openid) {
    const res = await database.collection('user_setting').where({
        _openid: openid
    }).get();
    if (res && res.data && res.data.length > 0 && res.data[0]) {
        // get data success
        console.log(`get user partner_id success: ${res.data[0].partner_id}`);
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
    let partnerName = await _getUserPartnerName(openid);
    const res = await database.collection('partner').where({
        name: partnerName
    }).get();
    if (res && res.data) {
        const item = res.data[0];
        return {
            id: item._id,
            name: item.name,
            image: `https://www.yubanstar.top/pic?filename=${item.image}`,
            language: item.language,
            speed: item.speed,
            text_style: item.text_style,
            vcn: item.vcn,
            voice_style: item.voice_style,
            prompt: item.prompt,
            short_description: item.short_description,
            full_description: item.full_description
        }
    }
    return {
        code: -1,
        message: 'get partner result fail' 
    }
}