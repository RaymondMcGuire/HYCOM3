/*
 * @Author: Xu.WANG
 * @Date: 2020-08-26 19:35:46
 * @LastEditTime: 2022-07-09 11:24:09
 * @LastEditors: Xu.WANG raymondmgwx@gmail.com
 * @Description:
 * @FilePath: \hycom_app\src\utils\auth.ts
 */
const TokenKey = 'hycom3.0'

export const getToken = () => {
  const data = localStorage.getItem(TokenKey)
  if (!data) {
    return null
  }

  const item = JSON.parse(data)

  const now = new Date()
  if (now.getTime() > item.expiry) {
    // console.log("expiry", now.getTime(), item.expiry)
    localStorage.removeItem(TokenKey)
    return null
  }

  return item.value
}

export const setToken = (value: string, ttl: number) => {
  const now = new Date()
  const item = {
    value: value,
    expiry: now.getTime() + ttl * 60 * 1000
  }
  // console.log("init expiry", now.getTime(), ttl, now.getTime() + ttl * 60 * 1000)
  localStorage.setItem(TokenKey, JSON.stringify(item))
}

export const removeToken = () => localStorage.removeItem(TokenKey)
