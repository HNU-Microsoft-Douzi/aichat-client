
export const MODEULE_KEY = {
    LANGUAGE : 'language',
    TTS_ENGINE : 'ttsEngine',
    AUDIO_SPEED : 'audioSpeed'
}

export function setStorage(key: string, value: any) {
    try {
        wx.setStorageSync(key, value);
    } catch (e) {
        console.error(e)
    }
}

export function getStroage(key: string) {
    try {
        var value = wx.getStorageSync(key)
        if (value) {
          return value;
        }
      } catch (e) {
        console.error(e)
        return undefined
      }
}

