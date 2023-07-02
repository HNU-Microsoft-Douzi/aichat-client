// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const database = cloud.database()
const _ = database.command


async function _getUserPartnerId(openid) {
    const res = await database.collection('user_setting').where({
        _openid: openid
    }).get();
    if (res && res.data && res.data.length > 0 && res.data[0]) {
        // get data success
        console.log(`get user partner_id success: ${res.data[0].partner_id}`);
        const partner_id = res.data[0].partner_id;
        return partner_id;
    } else {
        // 使用默认的id
        return '81f60125649eeaf600da8e771e89d3f5';
    }
}

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const openid = wxContext.OPENID;
    let partnerId = await _getUserPartnerId(openid);
    const res = await database.collection('partner').doc(partnerId).get();
    if (res && res.data) {
        const item = res.data;
        return {
            id: item._id,
            name: item.name,
            image: `https://www.yubanstar.top/pic?filename=${item.url}`,
            language: item.language,
            speed: item.speed,
            text_style: item.text_style,
            vcn: item.vcn,
            voice_style: item.voice_style,
            prompt: item.prompt,
            short_description: item.short_description,
            long_description: item.long_description
        }
    }
    return {
        code: -1,
        message: 'get partner result fail' 
    }
}