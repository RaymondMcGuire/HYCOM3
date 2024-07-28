<!--
 * @Author: Xu.WANG raymondmgwx@gmail.com
 * @Date: 2020-08-26 19:35:46
 * @LastEditors: Xu.WANG raymondmgwx@gmail.com
 * @LastEditTime: 2022-09-01 14:51:06
 * @FilePath: \hycom3.0\src\views\login\index.vue
 * @Description:
 * Copyright (c) 2022 by Xu.WANG raymondmgwx@gmail.com, All Rights Reserved.
-->
<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <h3 class="title">
        水力学计算程序HYCOM3.0
      </h3>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon name="user" />
        </span>
        <el-input
          v-model="loginForm.username"
          name="username"
          type="text"
          auto-complete="on"
          placeholder="用户名"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon name="password" />
        </span>
        <el-input
          v-model="loginForm.password"
          :type="pwdType"
          name="password"
          auto-complete="on"
          placeholder="密码"
          @keyup.enter.native="handleLogin"
        />
        <span
          class="show-pwd"
          @click="showPwd"
        >
          <svg-icon :name="pwdType === 'password' ? 'eye-off' : 'eye-on'" />
        </span>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          style="width: 100%"
          @click.native.prevent="handleLogin"
        >
          登录
        </el-button>
      </el-form-item>

      <el-button
        type="primary"
        style="width: 100%"
        @click.native.prevent="registerPage"
      >
        注册
      </el-button>
      <el-row class="tips">
        <br>
        <span>如有任何问题请联系</span>
        <a :href="`mailto:hycom3@gmail.com`">hycom3@gmail.com</a>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
import { isValidUsername } from '@/utils/validate'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
import { Form as ElForm } from 'element-ui'
import { setToken } from '@/utils/auth'

const AV = require('leancloud-storage')

const validateUsername = (rule: any, value: string, callback: any) => {
  if (value.length < 5) {
    callback(new Error('用户名不能小于5位'))
  } else {
    callback()
  }
}
const validatePass = (rule: any, value: string, callback: any) => {
  if (value.length < 5) {
    callback(new Error('密码不能小于5位'))
  } else {
    callback()
  }
}

@Component
export default class Login extends Vue {
  public loginForm = {
    username: '',
    password: ''
  };
  public loginRules = {
    username: [
      { required: true, trigger: 'blur', validator: validateUsername }
    ],
    password: [{ required: true, trigger: 'blur', validator: validatePass }]
  };
  public loading = false;
  public pwdType = 'password';
  public redirect: string | undefined = undefined;

  @Watch('$route', { immediate: true })
  public OnRouteChange(route: Route) {
    // TODO: remove the "as string" hack after v4 release for vue-router
    // See https://github.com/vuejs/vue-router/pull/2050 for details
    this.redirect = route.query && (route.query.redirect as string)
  }

  public showPwd() {
    if (this.pwdType === 'password') {
      this.pwdType = ''
    } else {
      this.pwdType = 'password'
    }
  }

  public registerPage() {
    this.$router.push({ path: '/register' })
  }

  public handleLogin() {
    (this.$refs.loginForm as ElForm).validate((valid: boolean) => {
      if (valid) {
        this.loading = true
        AV.User.logIn(this.loginForm.username.trim(), this.loginForm.password)
          .then((user: any) => {
            const usr = user.toJSON()

            if (usr.auth === 'S') {
              setToken('admin-token', 60)
            } else {
              setToken('developer-token', 60)
            }

            this.$message('欢迎用户 ' + usr.username + ' 使用HYCOM3.0！')
            this.loading = false
            this.$router.push({ path: this.redirect || '/' })
          })
          .catch(() => {
            this.$message('账号不匹配')
            this.loading = false
          })
      } else {
        return false
      }
    })
  }
}
</script>

<style lang="scss">
@import "src/styles/variables.scss";

.login-container {
  .el-input {
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      color: $lightGray;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $loginBg inset !important;
        -webkit-box-shadow: 0 0 0px 1000px $loginBg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
@import "src/styles/variables.scss";

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $loginBg;

  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }

  .el-input {
    display: inline-block;
    width: 85%;
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $darkGray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title {
    font-size: 26px;
    font-weight: 400;
    color: $lightGray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $darkGray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
