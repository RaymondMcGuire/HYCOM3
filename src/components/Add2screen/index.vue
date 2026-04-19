<!--
 * @Author: Xu.WANG raymondmgwx@gmail.com
 * @Date: 2022-09-01 14:15:40
 * @LastEditors: Xu.WANG raymondmgwx@gmail.com
 * @LastEditTime: 2022-09-01 14:29:21
 * @FilePath: \hycom3.0\src\components\Add2Screen\index.vue
 * @Description:
 * Copyright (c) 2022 by Xu.WANG raymondmgwx@gmail.com, All Rights Reserved.
-->
<template>
  <div>
    <button
      v-if="deferredPrompt"
      ref="addBtn"
      class="add-button"
      @click="clickCallback"
    >
      添加到桌面
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

type BeforeInstallPromptEventLike = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default defineComponent({
  name: 'Add2screen',
  data() {
    return {
      deferredPrompt: null as BeforeInstallPromptEventLike | null
    }
  },
  mounted() {
    this.captureEvent()
  },
  methods: {
    captureEvent() {
      window.addEventListener('beforeinstallprompt', (event) => {
        event.preventDefault()
        this.deferredPrompt = event as BeforeInstallPromptEventLike
      })
    },
    clickCallback() {
      if (!this.deferredPrompt) {
        return
      }

      void this.deferredPrompt.prompt()
      void this.deferredPrompt.userChoice.then(() => {
        this.deferredPrompt = null
      })
    }
  }
})
</script>
