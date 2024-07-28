<template>
  <div id="mav-editor">
    <el-row :gutter="20">
      <el-col
        :span="8"
        style="text-align: center"
      >
        <el-button
          type="primary"
          @click="onMavEdit"
        >
          编辑
        </el-button>
      </el-col>

      <el-col
        :span="8"
        style="text-align: center"
      >
        <el-button
          type="primary"
          @click="onMavPreview"
        >
          预览
        </el-button>
      </el-col>
      <el-col
        :span="8"
        style="text-align: center"
      >
        <el-button
          type="primary"
          @click="onHtml2PDF()"
        >
          生成PDF
        </el-button>
      </el-col>
    </el-row>

    <br>

    <mavon-editor
      class="md"
      :value="config.value"
      :subfield="config.subfield"
      :default-open="config.defaultOpen"
      :toolbars-flag="config.toolbarsFlag"
      :editable="config.editable"
      :scroll-style="config.scrollStyle"
      :external-link="externalLink"
      @change="change"
    />

    <html2pdf
      ref="h2p"
      :html-content="htmlContent"
      :config="config"
    />
  </div>
</template>

<script lang="ts">

import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import Html2pdf from '@/components/Html2pdf/Html2pdf.vue'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.use(mavonEditor)

@Component({
  components: {
    Html2pdf
  }
})

export default class MavEditor extends Vue {
         @Prop() config!: any

externalLink={
  hljs_css: false,
  hljs_js: false,
  hljs_lang: false,
  markdown_css: function() {
    return 'https://cdn.bootcdn.net/ajax/libs/github-markdown-css/5.1.0/github-markdown.min.css'
  },
  katex_js: function() {
    return 'https://cdn.bootcdn.net/ajax/libs/KaTeX/0.15.3/katex.min.js'
  },
  katex_css: function() {
    return 'https://cdn.bootcdn.net/ajax/libs/KaTeX/0.15.3/katex.min.css'
  }
};

 private htmlContent:any = ''

 mounted() {

 }

 private onHtml2PDF() {
   let h2p = this.$refs.h2p as any
   h2p.generatePdf()
 }

 private onMavEdit() {
   this.config.defaultOpen = ''
   this.config.subfield = true
   this.config.editable = true
   this.config.toolbarsFlag = true
 }

 private onMavPreview() {
   this.config.defaultOpen = 'preview'
   this.config.subfield = false
   this.config.editable = false
   this.config.toolbarsFlag = false
 }

  @Watch('change')
 change(val:string, render:string) {
   this.htmlContent = render
 }
}
</script>
