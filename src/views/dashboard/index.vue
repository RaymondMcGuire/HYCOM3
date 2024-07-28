<template>
  <div class="dashboard-editor-container">
    <div
      ref="hycom"
      class="hycom"
    >
      <div class="mobile-overlay">
        <h1>水力学计算程序</h1>
        <p>欢迎使用HYCOM3</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'
import { removeToken } from '@/utils/auth'

const $ = require('jquery')
const ripple = require('jquery.ripples')
const AV = require('leancloud-storage')

@Component
export default class DashboardEditor extends Vue {
  private browser = {
    versions: (function() {
      var u = window.navigator.userAgent
      var app = window.navigator.appVersion
      return {
        trident: u.indexOf('Trident') > -1,
        presto: u.indexOf('Presto') > -1,
        webKit: u.indexOf('AppleWebKit') > -1,
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1,
        mobile: !!u.match(/AppleWebKit.*Mobile.*/),
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
        iPhone: u.indexOf('iPhone') > -1,
        iPad: u.indexOf('iPad') > -1,
        webApp: u.indexOf('Safari') === -1
      }
    })(),
    language: navigator.language.toLowerCase()
  };

  private dynamicResize() {
    const hycomElement = this.$refs.hycom as HTMLElement
    if (hycomElement) {
      hycomElement.style.height = '100%'
      hycomElement.style.width = '100%'
    }
  }

  mounted() {
    this.dynamicResize()
    window.addEventListener('resize', this.dynamicResize)
    if (!this.browser.versions.iPhone && !this.browser.versions.android) {
      this.initRipple()
    }
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.dynamicResize)
  }

  private initRipple() {
    const hycomElement = this.$refs.hycom as HTMLElement
    if (hycomElement) {
      $(hycomElement).ripples({
        resolution: 512,
        dropRadius: 20,
        perturbance: 0.02
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  height: 100%;
  width: 100%;
  background-color: #afd5fb;
  overflow: hidden;
}

.hycom {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 0;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  transition: background-image 0.3s ease-in-out;
  background-image: url("../../assets/images/HYCOM_2.0.png");
}

.mobile-overlay {
  display: none;
  text-align: center;
  color: white;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;

  h1 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
  }
}

@media screen and (max-width: 768px) {
  .hycom {
    background-size: 150% auto;
    background-position: center top;
    align-items: flex-start;
    padding-top: 60px;
  }

  .mobile-overlay {
    display: block;
  }
}

@media screen and (max-width: 480px) {
  .hycom {
    background-size: 200% auto;
  }
}
</style>
