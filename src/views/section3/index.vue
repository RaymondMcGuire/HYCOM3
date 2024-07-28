<template>
  <el-card class="box-card">
    <div
      slot="header"
      class="clearfix"
    >
      <h3>3 水工隧洞水力学计算</h3>
    </div>
    <transition
      name="fade-transform"
      mode="out-in"
    >
      <router-view />
    </transition>
  </el-card>
</template>

<script lang="ts">
export default {}
</script>
