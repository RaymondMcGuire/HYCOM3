<template>
  <auth-shell
    title="注册账号"
    panel-height="600px"
  >
    <el-form
      ref="registerForm"
      :model="registerForm"
      :rules="registerRules"
      class="auth-form"
    >
      <el-form-item
        prop="username"
        class="auth-form-item"
      >
        <el-input
          v-model="registerForm.username"
          class="auth-input"
          placeholder="请输入用户名"
        />
      </el-form-item>
      <el-form-item
        prop="work"
        class="auth-form-item"
      >
        <el-input
          v-model="registerForm.work"
          class="auth-input"
          placeholder="请输入从事职业"
        />
      </el-form-item>
      <el-form-item
        prop="level"
        class="auth-form-item"
      >
        <el-input
          v-model="registerForm.level"
          class="auth-input"
          placeholder="请输入您的职称"
        />
      </el-form-item>
      <el-form-item
        prop="password"
        class="auth-form-item"
      >
        <el-input
          v-model="registerForm.password"
          class="auth-input"
          :type="pwdType"
          placeholder="请输入密码"
        />
      </el-form-item>
      <el-form-item
        prop="confirm_password"
        class="auth-form-item"
      >
        <el-input
          v-model="registerForm.confirm_password"
          class="auth-input"
          :type="pwdType"
          placeholder="请再次输入密码"
          @keyup.enter="handleRegister"
        />
      </el-form-item>
      <el-form-item class="auth-form-item">
        <el-button
          type="primary"
          class="auth-button auth-button--primary"
          :loading="loading"
          @click="handleRegister"
        >
          注册
        </el-button>
      </el-form-item>
      <el-form-item class="auth-form-item">
        <el-button
          text
          class="auth-button auth-button--text"
          @click="loginPage"
        >
          返回登录
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

export default defineComponent({
  name: 'RegisterPage',
  components: {
    AuthShell
  },
  data() {
    return {
      registerForm: {
        username: '',
        password: '',
        confirm_password: '',
        work: '',
        level: ''
      },
      loading: false,
      redirect: undefined as string | undefined,
      pwdType: 'password'
    }
  },
  computed: {
    registerRules(): Record<string, any[]> {
      return {
        username: [
          { required: true, trigger: 'blur', validator: this.validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: this.validatePass }
        ],
        confirm_password: [
          { required: true, trigger: 'blur', validator: this.validateConfirmPass }
        ]
      }
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
    validateUsername(rule: any, value: string, callback: any) {
      if (value.length < 5) {
        callback(new Error('用户名不能小于5位'))
      } else {
        callback()
      }
    },
    validatePass(rule: any, value: string, callback: any) {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    },
    validateConfirmPass(rule: any, value: string, callback: any) {
      if (value !== this.registerForm.password) {
        callback(new Error('与输入密码不一致'))
      } else {
        callback()
      }
    },
    loginPage() {
      this.$router.push({ path: '/login' })
    },
    async handleRegister() {
      const form = this.$refs.registerForm as FormInstance | undefined
      if (!form) {
        return
      }

      try {
        await form.validate()
      } catch {
        return
      }

      this.loading = true
      authService.register({
        username: this.registerForm.username,
        password: this.registerForm.password,
        work: this.registerForm.work,
        level: this.registerForm.level
      })
        .then(() => {
          this.loading = false
          uiFeedback.success('创建用户成功!')
          this.registerForm.username = ''
          this.registerForm.password = ''
          this.registerForm.level = ''
          this.registerForm.work = ''
          this.registerForm.confirm_password = ''
        })
        .catch((error: ServiceError) => {
          this.loading = false
          uiFeedback.error(error.message || '创建用户失败!')
        })
    }
  }
})
</script>
