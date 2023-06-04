import { getStroage, MODEULE_KEY } from "./storage-util";

export function getSpeed() {
    const value = getStroage(MODEULE_KEY.AUDIO_SPEED);
    if (value) {
        return value;
    }
    return 60;
}

export function getMode() {
    const mode = getStroage(MODEULE_KEY.TTS_ENGINE);
    if (mode === '1') {
        return 0;
    } else if (mode === '2') {
        return 1;
    }
    return 0;
}

/**
 * 对应微软的语言模型
 */
export function getLanguage() {
    const language = getStroage(MODEULE_KEY.LANGUAGE);
    if (language === '1') { // 英文
        return 'en-GB';
    } else if (language === '2') { // 粤语
        return 'yue-CN';
    } else if (language === '3') { // 中文简体
        return 'zh-CN';
    }
    return 'zh-CN';
}

/**
 * 主要是提供给讯飞选择语音人
 */
export function getVcn() {
    const language = getStroage(MODEULE_KEY.LANGUAGE);
    const mode = getMode();
    console.info(`language: ${language}`);

    if (language === '1') { // 英文
        if (mode === 0) { // 讯飞
            return 'x2_engam_laura';
        } else { // 微软
            // 英音
            // en-GB-AbbiNeural（女）
            // en-GB-AlfieNeural（男）
            // en-GB-BellaNeural（女）
            // en-GB-ElliotNeural（男）
            // en-GB-EthanNeural（男）
            // en-GB-HollieNeural（女）
            // en-GB-LibbyNeural（女）
            // en-GB-MaisieNeural（女性、儿童）
            // en-GB-NoahNeural（男）
            // en-GB-OliverNeural（男）
            // en-GB-OliviaNeural（女）
            // en-GB-RyanNeural（男）
            // en-GB-SoniaNeural（女）
            // en-GB-ThomasNeural（男）
            return 'AbbiNeural'
        }
    } else if (language === '2') { // 粤语
        if (mode === 0) { // 讯飞
            return 'x3_xiaoyue';
        } else {
            // yue-CN-XiaoMinNeural（女）
            // yue-CN-YunSongNeural（男）
            return 'XiaoMinNeural'
        }
    } else if (language === '3') { // 中文
        if (mode === 0) { // 讯飞
            return 'xiaoyan';
        } else {
            // zh-CN-XiaochenNeural（女）
            // zh-CN-XiaohanNeural（女）
            // zh-CN-XiaomengNeural（女）
            // zh-CN-XiaomoNeural（女）
            // zh-CN-XiaoqiuNeural（女）
            // zh-CN-XiaoruiNeural（女）
            // zh-CN-XiaoshuangNeural（女性、儿童）
            // zh-CN-XiaoxiaoNeural（女）
            // zh-CN-XiaoxuanNeural（女）
            // zh-CN-XiaoyanNeural（女）
            // zh-CN-XiaoyiNeural（女）
            // zh-CN-XiaoyouNeural（女性、儿童）
            // zh-CN-XiaozhenNeural（女）
            // zh-CN-YunfengNeural（男）
            // zh-CN-YunhaoNeural（男）
            // zh-CN-YunjianNeural（男）
            // zh-CN-YunxiaNeural（男）
            // zh-CN-YunxiNeural（男）
            // zh-CN-YunyangNeural（男）
            // zh-CN-YunyeNeural（男）
            // zh-CN-YunzeNeural（男）
            return 'XiaochenNeural'
        }
    }
    if (mode === 0) { // 讯飞
        return 'xiaoyan';
    } else {
        return 'XiaochenNeural'
    }
}