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
    <div class="login-box">
      <div class="wave" />
      <div class="wave" />
      <div class="login-content">
        <h2 class="title">
          HYCOM3 <span class="version">v{{ version }}</span>
        </h2>
        <p class="subtitle">
          水力学计算程序
        </p>
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
        >
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              placeholder="用户名"
              prefix-icon="el-icon-user"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="密码"
              prefix-icon="el-icon-lock"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="handleLogin"
            >
              登录
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button
              type="text"
              @click="registerPage"
            >
              注册新账号
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
import { Form as ElForm } from 'element-ui'
import { authService } from '@/services/authService'
import { ServiceError } from '@/services/errors'
import { getVersion } from '@/utils/version'

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
  public version = getVersion()

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
        authService.login(this.loginForm)
          .then((session) => {
            this.$message('欢迎用户 ' + session.username + ' 使用HYCOM3.0！')
            this.loading = false
            this.$router.push({ path: this.redirect || '/' })
          })
          .catch((error: ServiceError) => {
            this.$message(error.message || '账号不匹配')
            this.loading = false
          })
      } else {
        return false
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@use "sass:color";

$deep-blue: #0f4c75;
$medium-blue: #3282b8;
$light-blue: #bbe1fa;

.login-container,
.register-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, $deep-blue, $medium-blue);
  overflow-y: auto; // 允许在必要时滚动
}

.login-box,
.register-box {
  width: 400px;
  max-width: 90%;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  backdrop-filter: blur(5px);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  padding: 40px 20px;
  margin: 20px 0; // 添加上下边距
  box-sizing: border-box;
}

.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, $deep-blue, $medium-blue);
  overflow: hidden;
}

.login-box {
  position: relative;
  width: 400px;
  height: 480px; // 稍微增加高度以容纳新按钮
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  backdrop-filter: blur(5px);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
}

.wave {
  position: absolute;
  top: -50%;
  left: 50%;
  width: 1000px;
  height: 1000px;
  margin-left: -500px;
  margin-top: -500px;
  border-radius: 40%;
  background: rgba(255, 255, 255, 0.1);
  animation: wave 15s infinite linear;

  &:nth-child(2) {
    animation-delay: -5s;
  }
}

@keyframes wave {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.login-content {
  position: relative;
  z-index: 1;
  padding: 20px;
  text-align: center;
}

.title {
  color: $light-blue;
  font-size: 36px;
  margin-bottom: 10px;
}

.version {
  font-size: 14px;
  vertical-align: super;
}

.subtitle {
  color: $light-blue;
  font-size: 18px;
  margin-bottom: 30px;
}

.login-form {
  .el-input {
    margin-bottom: 20px;

    :deep(input) {
      background-color: rgba(255, 255, 255, 0.2);
      border: none;
      color: $light-blue;
      height: 40px;

      &::placeholder {
        color: rgba(187, 225, 250, 0.7);
      }
    }

    :deep(.el-input__prefix) {
      color: $light-blue;
    }
  }

  .el-button {
    width: 100%;
    height: 40px;
    font-size: 16px;
    font-weight: bold;
    transition: all 0.3s ease;

    &[type="primary"] {
      background-color: $light-blue;
      border: none;
      color: $deep-blue;

      &:hover {
        background-color: color.adjust($light-blue, $lightness: -10%);
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      }
    }

    &[type="text"] {
      color: $light-blue;
      background: transparent;
      margin-top: 10px;

      &:hover {
        color: color.adjust($light-blue, $lightness: -10%);
      }
    }
  }
}

// 响应式调整
@media screen and (max-height: 600px) {
  .login-box,
  .register-box {
    padding: 20px 15px;
  }

  .title {
    font-size: 24px;
    margin-bottom: 15px;
  }

  .el-form-item {
    margin-bottom: 15px;
  }
}

</style>
