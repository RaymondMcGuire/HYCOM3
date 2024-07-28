<template>
  <div class="register-container">
    <el-form
      ref="registerForm"
      :model="registerForm"
      :rules="registerRules"
      class="register-form"
      auto-complete="on"
      label-position="left"
    >
      <h3 class="title">
        注册账号
      </h3>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon name="user" />
        </span>
        <el-input
          v-model="registerForm.username"
          name="username"
          type="text"
          auto-complete="on"
          placeholder="请输入用户名"
        />
      </el-form-item>
      <el-form-item prop="work">
        <span class="svg-container">
          <svg-icon name="form" />
        </span>
        <el-input
          v-model="registerForm.work"
          name="work"
          type="text"
          auto-complete="on"
          placeholder="请输入从事职业"
        />
      </el-form-item>
      <el-form-item prop="level">
        <span class="svg-container">
          <svg-icon name="form" />
        </span>
        <el-input
          v-model="registerForm.level"
          name="level"
          type="text"
          auto-complete="on"
          placeholder="请输入您的职称"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon name="password" />
        </span>
        <el-input
          v-model="registerForm.password"
          :type="pwdType"
          name="password"
          auto-complete="on"
          placeholder="请输入密码"
        />
        <span
          class="show-pwd"
          @click="showPwd"
        >
          <svg-icon :name="pwdType === 'password' ? 'eye-off' : 'eye-on'" />
        </span>
      </el-form-item>
      <el-form-item prop="confirm_password">
        <span class="svg-container">
          <svg-icon name="password" />
        </span>
        <el-input
          v-model="registerForm.confirm_password"
          :type="pwdType"
          name="confirm_password"
          auto-complete="on"
          placeholder="请再次输入密码"
          @keyup.enter.native="handleRegister"
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
          style="width:100%;"
          @click.native.prevent="handleRegister"
        >
          注册
        </el-button>
      </el-form-item>

      <el-button
        type="primary"
        style="width:100%;"
        @click.native.prevent="loginPage"
      >
        返回
      </el-button>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'
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

  private validateUsername = (rule: any, value: string, callback: any) => {
    if (value.length < 5) {
      callback(new Error('用户名不能小于5位'))
    } else {
      callback()
    }
  };
  private validatePass = (rule: any, value: string, callback: any) => {
    if (value.length < 5) {
      callback(new Error('密码不能小于5位'))
    } else {
      callback()
    }
  };

  private validateConfirmPass = (rule: any, value: string, callback: any) => {
    if (value !== this.registerForm.password) {
      callback(new Error('与输入密码不一致'))
    } else {
      callback()
    }
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
  private showPwd() {
    if (this.pwdType === 'password') {
      this.pwdType = ''
    } else {
      this.pwdType = 'password'
    }
  }
  @Watch('$route', { immediate: true })
  private OnRouteChange(route: Route) {
    // TODO: remove the "as string" hack after v4 release for vue-router
    // See https://github.com/vuejs/vue-router/pull/2050 for details
    this.redirect = route.query && (route.query.redirect as string)
  }

  private loginPage() {
    this.$router.push({ path: '/login' })
  }

  private handleUserIcon(usrId: string) {
    // config
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
            this.$message('创建用户成功!')
            this.registerForm.username = this.registerForm.password = this.registerForm.level = this.registerForm.work = this.registerForm.confirm_password =
              ''
            // this.loginPage()
          })
          .catch(() => {
            this.loading = false
            this.$message('创建用户失败!')
          })
      }
    })
  }
}
</script>

<style lang="scss">
@import "src/styles/variables.scss";

.register-container {
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

.register-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $loginBg;

  .register-form {
    position: absolute;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    //phone
    @media screen and (max-width: 1024px) {
      left: 10%;
      width: 80%;
    }
    //pc
    @media screen and (min-width: 1024px) {
      left: 30%;
      width: 40%;
    }
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
