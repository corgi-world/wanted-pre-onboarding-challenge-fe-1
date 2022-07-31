const KEY_USER = "user";

function getStorageItem(key: string, defaultValue: string) {
  try {
    const value = localStorage.getItem(key);
    if (!value) {
      return defaultValue;
    }
    return value;
  } catch {
    return defaultValue;
  }
}

function setStorageItem(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    clearStorage();
    console.log(e);
  }
}

export function getUserToken() {
  return getStorageItem(KEY_USER, "");
}

export function setUserToken(token: string) {
  setStorageItem(KEY_USER, token);
}

export function clearStorage() {
  try {
    localStorage.clear();
  } catch (e) {
    console.log(e);
  }
}
