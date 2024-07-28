<template>
  <div class="register-container">
    <div class="register-box">
      <div class="wave"></div>
      <div class="wave"></div>
      <div class="register-content">
        <h2 class="title">注册账号</h2>
        <el-form
          ref="registerForm"
          :model="registerForm"
          :rules="registerRules"
          class="register-form"
        >
          <el-form-item prop="username">
            <el-input
              v-model="registerForm.username"
              placeholder="请输入用户名"
              prefix-icon="el-icon-user"
            />
          </el-form-item>
          <el-form-item prop="work">
            <el-input
              v-model="registerForm.work"
              placeholder="请输入从事职业"
              prefix-icon="el-icon-suitcase"
            />
          </el-form-item>
          <el-form-item prop="level">
            <el-input
              v-model="registerForm.level"
              placeholder="请输入您的职称"
              prefix-icon="el-icon-medal"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="registerForm.password"
              :type="pwdType"
              placeholder="请输入密码"
              prefix-icon="el-icon-lock"
            />
          </el-form-item>
          <el-form-item prop="confirm_password">
            <el-input
              v-model="registerForm.confirm_password"
              :type="pwdType"
              placeholder="请再次输入密码"
              prefix-icon="el-icon-lock"
              @keyup.enter.native="handleRegister"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="loading" @click="handleRegister">注册</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="text" @click="loginPage">返回登录</el-button>
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
import { Identicon } from '../../identicon_lib/identicon'

const AV = require('leancloud-storage')

@Component
export default class Register extends Vue {
  private registerForm = {
    username: '',
    password: '',
    confirm_password: '',
    work: '',
    level: ''
  };

  private registerRules = {
    username: [
      { required: true, trigger: 'blur', validator: this.validateUsername }
    ],
    password: [
      { required: true, trigger: 'blur', validator: this.validatePass }
    ],
    confirm_password: [
      { required: true, trigger: 'blur', validator: this.validateConfirmPass }
    ]
  };

  private loading = false;
  private redirect: string | undefined = undefined;
  private pwdType = 'password';

  @Watch('$route', { immediate: true })
  private OnRouteChange(route: Route) {
    this.redirect = route.query && (route.query.redirect as string)
  }

  private validateUsername(rule: any, value: string, callback: any) {
    if (value.length < 5) {
      callback(new Error('用户名不能小于5位'))
    } else {
      callback()
    }
  }

  private validatePass(rule: any, value: string, callback: any) {
    if (value.length < 5) {
      callback(new Error('密码不能小于5位'))
    } else {
      callback()
    }
  }

  private validateConfirmPass(rule: any, value: string, callback: any) {
    if (value !== this.registerForm.password) {
      callback(new Error('与输入密码不一致'))
    } else {
      callback()
    }
  }

  private showPwd() {
    this.pwdType = this.pwdType === 'password' ? '' : 'password'
  }

  private loginPage() {
    this.$router.push({ path: '/login' })
  }

  private handleUserIcon(usrId: string) {
    const size = 420
    const pixel = 70
    const frame = 35
    const patternSize = 5
    const bgColor = 240

    let canvas = document.createElement('canvas') as any
    canvas.height = size
    canvas.width = size
    let context = canvas.getContext('2d')
    let imageBuf = Identicon.Generate(
      usrId,
      patternSize,
      size,
      pixel,
      frame,
      bgColor
    )

    Identicon.Write2Canvas(context, imageBuf, size)

    let data = canvas.toDataURL('image/png')

    return data
  }

  private handleCopyUsrInfo() {
    var usricon = this.handleUserIcon(this.registerForm.username)

    var Forms = AV.Object.extend('UsrInfo')
    var formObject = new Forms()
    formObject
      .save({
        username: this.registerForm.username,
        password: this.registerForm.password,
        job: this.registerForm.work,
        title: this.registerForm.level,
        usericon: usricon
      })
      .then((object: any) => {})
      .catch(() => {})
  }

  private handleRegister() {
    (this.$refs.registerForm as ElForm).validate((valid: boolean) => {
      if (valid) {
        this.loading = true
        AV.User.signUp(this.registerForm.username, this.registerForm.password, {
          job: this.registerForm.work,
          title: this.registerForm.level,
          auth: 'D'
        })
          .then((user: any) => {
            this.loading = false
            this.handleCopyUsrInfo()
            this.$message({
              message: '创建用户成功!',
              type: 'success'
            })
            this.registerForm.username = this.registerForm.password = this.registerForm.level = this.registerForm.work = this.registerForm.confirm_password = ''
            // this.loginPage()
          })
          .catch(() => {
            this.loading = false
            this.$message({
              message: '创建用户失败!',
              type: 'error'
            })
          })
      }
    })
  }
}
</script>

<style lang="scss" scoped>
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

.register-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, $deep-blue, $medium-blue);
  overflow: hidden;
}

.register-box {
  position: relative;
  width: 400px;
  max-width: 100%;
  height: 600px;
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

.register-content {
  position: relative;
  z-index: 1;
  padding: 20px;
  text-align: center;
}

.title {
  color: $light-blue;
  font-size: 28px;
  margin-bottom: 20px;
}

.register-form {
  .el-form-item {
    margin-bottom: 20px;
  }

  .el-input {
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
        background-color: darken($light-blue, 10%);
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      }
    }

    &[type="text"] {
      color: $light-blue;
      background: transparent;
      margin-top: 10px;

      &:hover {
        color: darken($light-blue, 10%);
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