<template>
  <div class="home">
    <van-swipe :autoplay="3000" indicator-color="red">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
// @ is an alias to /src
import axios from 'axios'
export default {
  name: 'home',
  data() {
    return {
      images: []
    }
  },
  created(){
    axios.get('http://localhost:3000/banner?type=2').then((res)=>{
      console.log(res);
      console.log(res.data.banners);
      // this.images.push(res.data.banners.forea)
      res.data.banners.forEach(item => {
        this.images.push(item.pic)
      });
    })
  }
}
</script>

<style lang="less" scoped>
.van-tabs__content {
  width: 100%;
  height: 20vh;
  .van-swipe-item {
    img {
      width: 100%;
      height: 20vh;
    }
  }
}
</style>
