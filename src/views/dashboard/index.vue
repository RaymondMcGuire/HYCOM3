<template>
  <div class="dashboard-editor-container">
    <div class="hycom" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
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
        trident: u.indexOf('Trident') > -1, // IE
        presto: u.indexOf('Presto') > -1, // opera
        webKit: u.indexOf('AppleWebKit') > -1, // apple google
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // firefox
        mobile: !!u.match(/AppleWebKit.*Mobile.*/),
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios
        android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, // android
        iPhone: u.indexOf('iPhone') > -1, // iPhone
        iPad: u.indexOf('iPad') > -1, // iPad
        webApp: u.indexOf('Safari') === -1
      }
    })(),
    language: navigator.language.toLowerCase()
  };

  private dynamicResize() {
    // init canvas height and width
    $('.hycom').css({
      height: $('.dashboard-editor-container').height() + 'px'
    })
    $('.hycom').css({ width: $('.dashboard-editor-container').width() + 'px' })
  }

  private addListener() {
    $(window).resize(() => {
      this.dynamicResize()
    })
  }

  mounted() {
    this.dynamicResize()
    this.addListener()
    if (!this.browser.versions.iPhone && !this.browser.versions.android) {
      this.initRipple()
    } else {
      window.addEventListener('popstate', this.leaveHandler, false)
    }
  }

  created() {
    window.addEventListener('beforeunload', this.leaveHandler)
  }

  beforeDestroyed() {
    window.removeEventListener('beforeunload', this.leaveHandler)
  }

  private leaveHandler(e: any) {
    // e.preventDefault();
    // e.returnValue = "";

    UserModule.LogOut()
    AV.User.logOut()
    // location.reload();
  }

  private initRipple() {
    let $hycom = $('.hycom')
    $hycom.ripples({
      resolution: 512,
      dropRadius: 20,
      perturbance: 0.02
    })
  }
}
</script>

<style lang="scss" scoped>
.hycom {
  display: block;
  width: 100%;
  margin: 0 auto;

  //phone
  @media screen and (max-width: 768px) {
    background: url("../../assets/images/HYCOM_2.0.png") no-repeat;
    background-size: contain;
  }
  //pc
  @media screen and (min-width: 768px) {
    background: url("../../assets/images/HYCOM_2.0.png") center center no-repeat;
    background-size: cover;
  }
}

.dashboard-editor-container {
  background-color: #afd5fb;
  min-height: 100vh;
}
</style>
