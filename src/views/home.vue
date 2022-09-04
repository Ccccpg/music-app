<template>
  <div class="home">
    <van-swipe :autoplay="3000" indicator-color="red">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <van-image :src="image" fit="cover" />
      </van-swipe-item>
    </van-swipe>
    <Iconlist></Iconlist>
    <Findplaylists></Findplaylists>
  </div>

</template>
<script>
// @ is an alias to /src
import { getBanner } from '@/api/home'
import Iconlist from '@/components/Iconlist.vue'
import Findplaylists from '@/components/Findplaylists.vue'
export default {
  name: 'home',
  data() {
    return {
      images: []
    }
  },
  created() {
    getBanner().then(res => {
      res.data.banners.forEach(item => {
        this.images.push(item.pic)
      })
    })
  },
  components: {
    Iconlist,
    Findplaylists
  }
}
</script>

<style lang="less" scoped>
.van-swipe {
  margin-top: 1vh;
  .van-swipe-item {
    display: flex;
    justify-content: center;
    padding: 3vw;
    .van-image {
      width: 100%;
      box-shadow: 1px 2px 8px 4px rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
