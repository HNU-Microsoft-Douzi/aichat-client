var log = require('./log.js')

export const MODEULE_KEY = {
    LANGUAGE : 'language',
    TTS_ENGINE : 'ttsEngine',
    AUDIO_SPEED : 'audioSpeed'
}

export function setStorage(key: string, value: any) {
    log.info(`setStorage: key - ${key} value: ${value}`)
    try {
        wx.setStorageSync(key, value);
    } catch (e) {
        console.error(e)
    }
}

export function getStroage(key: string) {
    log.info(`getStroage: key - ${key}`)
    try {
        var value = wx.getStorageSync(key)
        if (value) {
          return value;
        }
      } catch (e) {
        console.error(e);
        return undefined;
      }
      return undefined;
}

