<template>
  <div class="navbar">
    <hamburger
      :toggle-click="toggleSideBar"
      :is-active="sidebar.opened"
      class="hamburger-container"
    />
    <breadcrumb />

    <el-dropdown
      class="avatar-container"
      trigger="click"
    >
      <div class="avatar-wrapper">
        <img
          :src="avatar"
          class="user-avatar"
        >
        <i class="el-icon-caret-bottom" />
      </div>
      <el-dropdown-menu
        slot="dropdown"
        class="user-dropdown"
      >
        <router-link
          class="inlineBlock"
          to="/"
        >
          <el-dropdown-item> HYCOM3.0 </el-dropdown-item>
        </router-link>
        <router-link
          class="inlineBlock"
          to="/contact"
        >
          <el-dropdown-item> 意见反馈 </el-dropdown-item>
        </router-link>

        <router-link
          class="inlineBlock"
          to="/guide"
        >
          <el-dropdown-item> 操作指南 </el-dropdown-item>
        </router-link>

        <div v-if="usrname === '超级用户'">
          <router-link
            class="inlineBlock"
            to="/admin_panel"
          >
            <el-dropdown-item> 控制面板 </el-dropdown-item>
          </router-link>
        </div>
        <el-dropdown-item divided>
          <span
            style="display: block"
            @click="logout"
          >退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import Hamburger from '@/components/Hamburger/index.vue'
import { Component, Vue } from 'vue-property-decorator'
import AV from 'leancloud-storage'
import { AppModule } from '@/store/modules/app'
import { UserModule } from '@/store/modules/user'

@Component({
  components: {
    Breadcrumb,
    Hamburger
  }
})
export default class Navbar extends Vue {
  private usricon: string = '';

  get sidebar() {
    return AppModule.sidebar
  }

  get avatar() {
    if (this.usricon === undefined) {
      return UserModule.avatar
    }

    return this.usricon
  }

  get usrname() {
    return UserModule.name
  }

  get roles() {
    return UserModule.roles
  }

  private toggleSideBar() {
    AppModule.ToggleSideBar(false)
  }

  created() {
    this.fetchUsrIcon()
  }

  private fetchUsrIcon() {
    var currentUser = AV.User.current()
    var username = currentUser.attributes['username']
    var cql = 'select * from UsrInfo where username = ?'
    var pvalue = [username]
    AV.Query.doCloudQuery(cql, pvalue).then(
      (results: any) => {
        results.results.forEach((ele: any) => {
          const attr = ele.attributes
          this.usricon = attr['usericon']
        })
      },
      (error: any) => {
        console.log(error)
      }
    )
  }

  private logout() {
    UserModule.LogOut().then(() => {
      AV.User.logOut()
      this.$router.push({ path: '/login' })
    })
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  //phone
  @media screen and (max-width: 768px) {
    height: 15%;
  }
  //pc
  @media screen and (min-width: 768px) {
    height: 50px;
  }

  line-height: 50px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }

  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }

  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;

    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      line-height: initial;

      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }

      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>
