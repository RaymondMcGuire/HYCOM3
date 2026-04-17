/*
 * @Author: Xu.WANG raymondmgwx@gmail.com
 * @Date: 2020-08-26 19:35:46
 * @LastEditors: Xu.WANG raymondmgwx@gmail.com
 * @LastEditTime: 2022-05-22 00:03:11
 * @FilePath: \hycom_app\src\api\login.ts
 * @Description:
 * Copyright (c) 2022 by Xu.WANG raymondmgwx@gmail.com, All Rights Reserved.
 */
import request from '@/utils/request'
import wxIcon from '@/assets/images/icon/wx_icon.png'

export const login: any = (username: string, password: string) =>
  request({
    url: '/1.1/login',
    method: 'post',
    data: {
      username,
      password
    }
  })

export const getUserInfo = (token: any) =>
  request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })

export const logout = () =>
  request({
    url: '/user/logout',
    method: 'post'
  })

export const users: { [index: string]: any } = {
  'admin-token': {
    roles: ['admin'],
    introduction: '超级用户',
    avatar: wxIcon,
    name: '超级用户'
  },
  'developer-token': {
    roles: ['developer'],
    introduction: '开发者',
    avatar: wxIcon,
    name: '开发者'
  }
}
