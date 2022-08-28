<template>
  <div id="app">
    <van-tabs>
      <van-tab title="首页">
        <router-view to="/"></router-view>
      </van-tab>
      <van-tab title="我的">我的</van-tab>
      <van-tab title="广场">内容 3</van-tab>
      <van-tab title="发现">内容 4</van-tab>
    </van-tabs>
  </div>
</template>

<style lang="less">

</style>
