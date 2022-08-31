<template>
    <div class="home">
      <van-swipe :autoplay="3000" indicator-color="red">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" />
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
  .van-swipe__track {
    .van-swipe-item {
      height: 25vh;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
