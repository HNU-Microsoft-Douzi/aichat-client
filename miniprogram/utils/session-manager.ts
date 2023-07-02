import { getStroage, setStorage } from "./storage-util";
import { generateRandomString } from "./string-util";

const KEY = 'sessionId';
const LENGTH = 16;
export function getSessionId(): string {
    let sessionId = getStroage(KEY);
    if (sessionId) {
        return sessionId;
    }
    sessionId = generateRandomString(LENGTH);
    setStorage(KEY, sessionId);
    return sessionId;
}

export function resetSessionId() {
    const sessionId = generateRandomString(LENGTH);
    setStorage(KEY, sessionId);
}