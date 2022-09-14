<template>
  <div id="app">
    <van-tabs class="Apptop"  sticky>
      <van-tab title="首页" to="/home"></van-tab>
      <van-tab title="我的" to="/user"></van-tab>
      <van-tab title="搜索" to="/search"></van-tab>
    </van-tabs>
    <router-view></router-view>
    <Footer v-show="url!=''"></Footer>
  </div>
</template>
<script>
import '@/lib/index.css'
import Footer from '@/components/Footer.vue'
import { mapState } from 'vuex'

export default {
  components: {
    Footer
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({ url: 'url' })
  },
  methods: {}
}
</script>
<style lang="less">
@import url('//at.alicdn.com/t/c/font_3616554_md2t3xwyui.css');
.Apptop {
  position: fixed;
  top: 0;
  left: 0;
  .van-tabs__line {
    z-index: 0;
  }
}
</style>
