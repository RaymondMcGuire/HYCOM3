<template>
  <div id="mav-editor">
    <app-grid
      class="editor-toolbar"
      columns="repeat(3, minmax(0, 1fr))"
      min-column="120px"
      gap="20px"
    >
      <div class="editor-toolbar__cell">
        <el-button
          type="primary"
          @click="onMavEdit"
        >
          编辑
        </el-button>
      </div>

      <div class="editor-toolbar__cell">
        <el-button
          type="primary"
          @click="onMavPreview"
        >
          预览
        </el-button>
      </div>

      <div class="editor-toolbar__cell">
        <el-button
          type="primary"
          @click="onHtml2PDF"
        >
          生成PDF
        </el-button>
      </div>
    </app-grid>

    <br>

    <app-grid
      v-if="showEditor || showPreview"
      class="editor-layout"
      :columns="showEditor && showPreview ? 'repeat(2, minmax(0, 1fr))' : 'minmax(0, 1fr)'"
      gap="20px"
    >
      <div v-if="showEditor">
        <el-input
          :value="renderSource"
          class="editor-input"
          type="textarea"
          :rows="24"
          resize="vertical"
          @input="onInput"
        />
      </div>

      <div v-if="showPreview">
        <div
          ref="preview"
          class="preview-panel"
          v-html="renderSource"
        />
      </div>
    </app-grid>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { browserPdfExportAdapter } from '@/integrations/pdf/adapter'
import { renderByMathjax } from '@/plugins/mathjax'
import AppGrid from '@/shared/components/layout/AppGrid.vue'

export default defineComponent({
  name: 'MavEditor',
  components: {
    AppGrid
  },
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      syncTimer: null as number | null
    }
  },
  computed: {
    renderSource(): string {
      return String((this.config && this.config.value) || '')
    },
    showEditor(): boolean {
      return Boolean(this.config?.subfield) || this.config?.defaultOpen !== 'preview'
    },
    showPreview(): boolean {
      return Boolean(this.config?.subfield) || this.config?.defaultOpen === 'preview'
    }
  },
  watch: {
    renderSource() {
      this.schedulePreviewSync()
    },
    showEditor() {
      this.schedulePreviewSync()
    },
    showPreview() {
      this.schedulePreviewSync()
    }
  },
  mounted() {
    this.schedulePreviewSync()
  },
  beforeUnmount() {
    if (this.syncTimer !== null) {
      window.clearTimeout(this.syncTimer)
    }
  },
  methods: {
    schedulePreviewSync() {
      if (this.syncTimer !== null) {
        window.clearTimeout(this.syncTimer)
      }

      this.syncTimer = window.setTimeout(() => {
        void this.syncPreview()
      }, 60)
    },
    async syncPreview() {
      await this.$nextTick()

      const preview = this.$refs.preview as HTMLElement | undefined
      if (!preview) {
        return
      }

      try {
        await renderByMathjax(preview)
      } catch (error) {
        console.warn('[MavEditor]', error)
      }
    },
    onInput(value: string) {
      this.config.value = value
      this.schedulePreviewSync()
    },
    async onHtml2PDF() {
      await browserPdfExportAdapter.generatePdf(this.renderSource, this.config)
    },
    onMavEdit() {
      this.config.defaultOpen = ''
      this.config.subfield = true
      this.config.editable = true
      this.config.toolbarsFlag = true
      this.schedulePreviewSync()
    },
    onMavPreview() {
      this.config.defaultOpen = 'preview'
      this.config.subfield = false
      this.config.editable = false
      this.config.toolbarsFlag = false
      this.schedulePreviewSync()
    }
  }
})
</script>

<style lang="scss" scoped>
.editor-toolbar__cell {
  text-align: center;
}

.editor-layout {
  margin-bottom: 20px;
}

.editor-input :deep(textarea) {
  font-family: Consolas, 'Courier New', monospace;
  line-height: 1.6;
}

.preview-panel {
  min-height: 460px;
  padding: 16px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: #fff;
  overflow-x: auto;
}

.preview-panel :deep(p) {
  line-height: 1.8;
}
</style>
