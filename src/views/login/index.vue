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
  <auth-shell
    title="HYCOM3"
    subtitle="水力学计算程序"
    panel-height="480px"
    :version-text="`v${version}`"
  >
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="auth-form"
    >
      <el-form-item
        prop="username"
        class="auth-form-item"
      >
        <el-input
          v-model="loginForm.username"
          class="auth-input"
          placeholder="用户名"
        />
      </el-form-item>
      <el-form-item
        prop="password"
        class="auth-form-item"
      >
        <el-input
          v-model="loginForm.password"
          class="auth-input"
          type="password"
          placeholder="密码"
        />
      </el-form-item>
      <el-form-item class="auth-form-item">
        <el-button
          type="primary"
          class="auth-button auth-button--primary"
          :loading="loading"
          @click="handleLogin"
        >
          登录
        </el-button>
      </el-form-item>
      <el-form-item class="auth-form-item">
        <el-button
          text
          class="auth-button auth-button--text"
          @click="registerPage"
        >
          注册新账号
        </el-button>
      </el-form-item>
    </el-form>
  </auth-shell>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { FormInstance } from 'element-plus'
import AuthShell from '@/shared/components/auth/AuthShell.vue'
import { authService } from '@/services/authService'
import { ServiceError } from '@/services/errors'
import { uiFeedback } from '@/shared/ui/uiFeedback'
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

export default defineComponent({
  name: 'LoginPage',
  components: {
    AuthShell
  },
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      redirect: undefined as string | undefined,
      version: getVersion()
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(route) {
        this.redirect = route.query && (route.query.redirect as string)
      }
    }
  },
  methods: {
    registerPage() {
      this.$router.push({ path: '/register' })
    },
    async handleLogin() {
      const form = this.$refs.loginForm as FormInstance | undefined
      if (!form || this.loading) {
        return
      }

      try {
        await form.validate()
      } catch {
        uiFeedback.warning('请先输入有效的用户名和密码。')
        return
      }

      this.loading = true

      try {
        await authService.login(this.loginForm)
        uiFeedback.success('登录成功，正在进入系统。')
        this.$router.push({ path: this.redirect || '/' })
      } catch (error) {
        uiFeedback.error(
          error instanceof ServiceError ? error.message || '登录失败，请稍后重试。' : '登录失败，请稍后重试。'
        )
      } finally {
        this.loading = false
      }
    }
  }
})
</script>
