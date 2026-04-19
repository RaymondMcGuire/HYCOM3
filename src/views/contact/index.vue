<!--
 * @Author: Xu.WANG raymondmgwx@gmail.com
 * @Date: 2022-08-19 18:00:23
 * @LastEditors: Xu.WANG raymondmgwx@gmail.com
 * @LastEditTime: 2022-08-19 20:57:55
 * @FilePath: \hycom3.0\src\views\contact\index.vue
 * @Description:
 * Copyright (c) 2022 by Xu.WANG raymondmgwx@gmail.com, All Rights Reserved.
-->
<template>
  <div class="app-container">
    <panel-shell :title="title">
      <el-form
        ref="contact_form"
        :model="data"
        :rules="contactRules"
        class="contact-form"
        auto-complete="on"
        label-width="120px"
      >
        <app-stack gap="20px">
          <el-form-item
            label="标题"
            prop="title"
          >
            <el-input
              v-model="data.title"
              type="text"
              name="title"
            />
          </el-form-item>

          <el-form-item
            label="称呼"
            prop="to_name"
          >
            <el-input
              v-model="data.to_name"
              type="text"
              name="to_name"
            />
          </el-form-item>

          <el-form-item
            label="您的邮箱"
            prop="email_address"
          >
            <el-input
              v-model="data.email_address"
              type="email"
              name="email_address"
            />
          </el-form-item>

          <el-form-item
            label="意见内容"
            prop="message"
          >
            <el-input
              v-model="data.message"
              type="textarea"
              name="message"
            />
          </el-form-item>

          <div class="contact-form__actions">
            <el-button
              class="contact-form__submit"
              type="primary"
              @click.prevent="SendEmail"
            >
              提交
            </el-button>
          </div>
        </app-stack>
      </el-form>
    </panel-shell>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { FormInstance } from 'element-plus'
import { feedbackService } from '@/services/feedbackService'
import { ServiceError } from '@/services/errors'
import AppStack from '@/shared/components/layout/AppStack.vue'
import PanelShell from '@/shared/components/layout/PanelShell.vue'
import { uiFeedback } from '@/shared/ui/uiFeedback'

const validateEmail = (rule: any, value: string, callback: any) => {
  const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
  if (regEmail.test(value)) {
    // 合法的邮箱
    return callback()
  }
  callback(new Error('请输入合法的邮箱'))
}

const validateMsg = (rule: any, value: string, callback: any) => {
  if (value.length < 1) {
    callback(new Error('信息不能为空'))
  } else {
    callback()
  }
}

export default defineComponent({
  name: 'ContactFormPage',
  components: {
    AppStack,
    PanelShell
  },
  data() {
    return {
      title: '意见反馈',
      data: {
        title: '',
        to_name: '',
        email_address: '',
        message: ''
      },
      contactRules: {
        title: [{ required: true, trigger: 'blur', validator: validateMsg }],
        to_name: [{ required: true, trigger: 'blur', validator: validateMsg }],
        email_address: [{ required: true, trigger: 'blur', validator: validateEmail }],
        message: [{ required: true, trigger: 'blur', validator: validateMsg }]
      }
    }
  },
  methods: {
    async SendEmail() {
      const form = this.$refs.contact_form as FormInstance | undefined
      if (!form) {
        return
      }

      try {
        await form.validate()
      } catch {
        return
      }

      feedbackService.submit(this.data)
        .then(() => {
          uiFeedback.success('感谢您的提交,我们会尽快与您取得联系！')
          this.data.title = ''
          this.data.to_name = ''
          this.data.email_address = ''
          this.data.message = ''
        })
        .catch((error: ServiceError) => {
          uiFeedback.error(error.message || '提交意见失败!')
        })
    }
  }
})
</script>

<style lang="scss" scoped>
.contact-form {
  max-width: 860px;
}

.contact-form__actions {
  display: flex;
  justify-content: center;
}

.contact-form__submit {
  width: min(320px, 100%);
}
</style>
