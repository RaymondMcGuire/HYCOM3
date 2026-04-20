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
      @command="handleCommand"
    >
      <div class="avatar-wrapper">
        <img
          :src="avatar"
          class="user-avatar"
        >
        <span class="caret-bottom" />
      </div>
      <template #dropdown>
        <el-dropdown-menu class="user-dropdown">
          <el-dropdown-item command="home">
            HYCOM3.0
          </el-dropdown-item>
          <el-dropdown-item command="contact">
            意见反馈
          </el-dropdown-item>
          <el-dropdown-item command="guide">
            操作指南
          </el-dropdown-item>
          <el-dropdown-item
            v-if="roles.includes('admin')"
            command="admin_panel"
          >
            控制面板
          </el-dropdown-item>
          <el-dropdown-item
            divided
            command="logout"
          >
            退出
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import Hamburger from '@/components/Hamburger/index.vue'
import { useLayoutState, useSessionState } from '@/app/state'

const layoutState = useLayoutState()
const sessionState = useSessionState()
const commandPathMap = {
  home: '/',
  contact: '/contact',
  guide: '/guide',
  admin_panel: '/admin_panel'
} as const

export default defineComponent({
  name: 'LayoutNavbar',
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    sidebar() {
      return layoutState.sidebar
    },
    avatar(): string {
      return sessionState.avatar
    },
    usrname(): string {
      return sessionState.name
    },
    roles(): string[] {
      return sessionState.roles
    }
  },
  methods: {
    toggleSideBar() {
      void layoutState.toggleSideBar(false)
    },
    async handleCommand(command: string) {
      if (command === 'logout') {
        await this.logout()
        return
      }

      const targetPath = commandPathMap[command as keyof typeof commandPathMap]
      if (targetPath) {
        await this.$router.push({ path: targetPath })
      }
    },
    async logout() {
      try {
        await sessionState.logout()
      } catch (error) {
        console.warn('Logout fallback to local session clear:', error)
        await sessionState.clearLocalSession()
      } finally {
        await this.$router.replace({ path: '/login' })
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
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

      .caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 6px solid currentColor;
      }
    }
  }
}
</style>
