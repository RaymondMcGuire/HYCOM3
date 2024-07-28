<template>
  <el-card
    class="menu-card"
    shadow="hover"
  >
    <template #header>
      <div class="card-header">
        <h2 class="title">
          <menu-icon
            :level="level"
            :type="iconType"
          />
          {{ title }}
        </h2>
      </div>
    </template>
    <transition
      name="fade-transform"
      mode="out-in"
    >
      <slot />
    </transition>
  </el-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import MenuIcon from './components/MenuIcon.vue'

@Component({
  components: {
    MenuIcon
  }
})
export default class MenuCard extends Vue {
  @Prop({ required: true }) title!: string
  @Prop({ default: 2 }) level!: number
  @Prop({ default: 'default' }) iconType!: string
}
</script>

<style lang="scss" scoped>
.menu-card {
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  }

  .card-header {
    background-color: #f0f7ff;
    border-bottom: 1px solid #e8e8e8;
    padding: 15px 20px;

    .title {
      margin: 0;
      font-size: 18px;
      color: #1890ff;
      display: flex;
      align-items: center;
    }
  }

  ::v-deep .el-card__body {
    padding: 20px;
  }
}

.fade-transform-enter-active,
.fade-transform-leave-active {
  transition: all 0.5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
