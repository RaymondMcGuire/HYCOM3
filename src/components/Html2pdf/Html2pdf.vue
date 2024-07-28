<template>
     <vue-html2pdf
        :show-layout="false"
        :float-layout="true"
        :enable-download="config.download"
        :preview-modal="config.preview"
        :paginate-elements-by-height="1400"
        :filename="config.filename"
        :pdf-quality="2"
        :manual-pagination="true"
        pdf-format="a4"

        @progress="onProgress($event)"
        @hasStartedGeneration="hasStartedGeneration()"
        @hasGenerated="hasGenerated($event)"
        ref="html2Pdf"
    >
      <section slot="pdf-content">
        <section class="pdf-content">
          <section class="report-info">

          <div v-html="htmlContent"></div>

          </section>
        </section>
      </section>
    </vue-html2pdf>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import VueHtml2pdf from 'vue-html2pdf'
import VueMobileDetection from "vue-mobile-detection";

Vue.use(VueMobileDetection)

@Component({
  components: {
    VueHtml2pdf
  }
})

export default class Html2pdf extends Vue {
@Prop() htmlContent!: string;
@Prop() config!: any;

  mounted()
  {
    if (!Vue.prototype.$isMobile()) {
      this.config.download = true
      this.config.preview=true
    } else {
       this.config.download = true
      this.config.preview=false
    }
  }

  @Watch("progress")
  onProgress (val:number) {
      this.$emit('progress', val)
  }

  generatePdf () {
      let h2p = this.$refs.html2Pdf as any
      h2p.generatePdf()
  }

}
</script>

<style lang="scss" scoped>
.pdf-content {
  width: 100%;
  background: #fff;
  .report-info {
    padding: 40px;
    padding-bottom: 0px;
    
  }
}
</style>