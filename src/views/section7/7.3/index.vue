<template>
  <el-card class="box-card">
    <div
      slot="header"
      class="clearfix"
    >
      <h3>7.3 水锤计算</h3>
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
