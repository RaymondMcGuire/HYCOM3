<template>
  <el-card class="box-card">
    <div
      slot="header"
      class="clearfix"
    >
      <h3>8 城镇供水长距离输水管（渠）道水力学计算</h3>
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
