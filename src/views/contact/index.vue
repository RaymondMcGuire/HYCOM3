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
    <el-container>
      <el-header>
        <h2>{{ title }}</h2>
      </el-header>
      <el-main>
        <el-form
          ref="contact_form"
          :model="data"
          :rules="contactRules"
          class="contact_form"
          auto-complete="on"
          label-width="120px"
        >
          <el-row :gutter="20">
            <el-col :span="24">
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
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="24">
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
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="24">
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
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
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
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col
              :span="12"
              :offset="6"
            >
              <el-button
                type="submit"
                style="width: 100%"
                @click.native.prevent="SendEmail"
              >
                提交
              </el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Form as ElForm } from 'element-ui'
import { feedbackService } from '@/services/feedbackService'
import { ServiceError } from '@/services/errors'

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

@Component
export default class ContactForm extends Vue {
  private title = '意见反馈';
  private data = {
    title: '',
    to_name: '',
    email_address: '',
    message: ''
  };

  private contactRules = {
    title: [{ required: true, trigger: 'blur', validator: validateMsg }],
    to_name: [{ required: true, trigger: 'blur', validator: validateMsg }],
    email_address: [{ required: true, trigger: 'blur', validator: validateEmail }],
    message: [{ required: true, trigger: 'blur', validator: validateMsg }]
  };

  private SendEmail() {
    (this.$refs.contact_form as ElForm).validate((valid: boolean) => {
      if (valid) {
        feedbackService.submit(this.data)
          .then(() => {
            this.$message('感谢您的提交,我们会尽快与您取得联系！')
            this.data.title = ''
            this.data.to_name = ''
            this.data.email_address = ''
            this.data.message = ''
          })
          .catch((error: ServiceError) => {
            this.$message(error.message || '提交意见失败!')
          })
      } else {
        return false
      }
    })
  }
}
</script>

<style lang="scss">
.line {
  text-align: center;
}

.contact_form .el-form-item__content {
  margin-left: 120px !important;
}
</style>
