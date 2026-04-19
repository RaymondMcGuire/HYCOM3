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
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DashboardEditor',
  mounted() {
    this.dynamicResize()
    window.addEventListener('resize', this.dynamicResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.dynamicResize)
  },
  methods: {
    dynamicResize() {
      const hycomElement = this.$refs.hycom as HTMLElement | undefined
      if (!hycomElement) {
        return
      }

      hycomElement.style.height = '100%'
      hycomElement.style.width = '100%'
    }
  }
})
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
  background-image: url("../../assets/images/HYCOM_3.0.png");
}

.mobile-overlay {
  display: none;
  text-align: center;
  color: white;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 8px;

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
