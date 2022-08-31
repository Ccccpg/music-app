<template>
  <div id="app">
    <van-tabs>
      <van-tab title="首页" to="/home"></van-tab>
      <van-tab title="我的" to="/my">我的</van-tab>
      <van-tab title="广场" to="square">广场</van-tab>
      <van-tab title="发现" to="">内容 4</van-tab>
    </van-tabs>
    <router-view></router-view>
  </div>
</template>
<script>
import '@/lib/index.css'
export default {
  
}
</script>
<style lang="less">

</style>
