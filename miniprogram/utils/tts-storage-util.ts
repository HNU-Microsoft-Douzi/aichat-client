export function getSpeed() {
    const speed = getApp().globalData.user_setting_data.speed;
    if (speed) {
        return speed;
    }
    return 1;
}

export function getMode() {
    return 1; // 默认全部使用微软的模式
}

/**
 * 对应微软的语言模型
 */

export function getLanguage() {
    const language = getApp().globalData.user_setting_data.language;
    if (language) {
        return language;
    }
    return 'en-GB';
}

/**
 * 主要是提供给讯飞选择语音人
 */
export function getVcn() {
    let vcn = 'AbbiNeural';
    if (getApp().globalData.user_setting_data.vcn) {
        vcn = getApp().globalData.user_setting_data.vcn;
    }
    return `${vcn}`;
}

export function getPrompt() {
    let prompt = '你想要和我一起玩海龟汤游戏（一个故事接龙游戏，每人一句），你会怎么开口呢？';
    if (getApp().globalData.user_setting_data.prompt) {
        prompt = getApp().globalData.user_setting_data.prompt;
    }
    return prompt;
}

export function getStyle() {
    let style = '欢快开朗愉悦';
    if (getApp().globalData.user_setting_data.text_style) {
        style = getApp().globalData.user_setting_data.text_style;
    }
    return style;
}

export function getEmotion() {
    let emotion = 'cheerful';
    if (getApp().globalData.user_setting_data.voice_style) {
        emotion = getApp().globalData.user_setting_data.voice_style;
    }
    return emotion;
}