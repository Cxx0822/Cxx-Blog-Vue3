const TokenKey = 'Login-Token'

// export function getToken() {
//   return Cookies.get(TokenKey)
// }

// export function setToken(token) {
//   return Cookies.set(TokenKey, token)
// }

// export function removeToken() {
//   return Cookies.remove(TokenKey)
// }

// 这里的token不能使用Cookies存储，否则electron-build打包会出现问题！
export const getToken = ():string | null => {
  return window.localStorage.getItem(TokenKey)
}

export const setToken = (token:string):void => {
  return window.localStorage.setItem(TokenKey, token)
}

export const removeToken = ():void => {
  return window.localStorage.removeItem(TokenKey)
}
