<template>
  <div class="footer_detail">
    <van-image width="100vw" height="100vh" lazy-load :src="albumCover" alt="" class="bgc" />

    <van-image width="80vw" height="80vw" lazy-load :src="albumCover" class="bot_img" v-if="isshowCover" @click="showOrhide" />
    <transition name="van-slide-right">
      <div class="lyric" v-if="!isshowCover" @click="showOrhide" ref="alllyric">
        <!-- <div class="alllyric" ref="alllyric"> -->
        <p v-for="item in reallyric" :key="item.id" :class="{active:(item.time<=currentTime&&item.preTime>currentTime)}">{{item.reallyric}}</p>
      </div>
    </transition>

    <van-progress :percentage="process" stroke-width="5" :show-pivot="false" color="white" track-color="gray" />
    <van-button icon="play" @click="play" round v-if="paused" />
    <van-button icon="pause" @click="pause" round v-else />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'FooterDetail',
  props: ['album', 'albumCover', 'process', 'play', 'pause'],
  computed: {
    ...mapState({ reallyric: 'reallyric', currentTime: 'currentTime', paused: 'paused' })
  },
  data() {
    return {
      isshowCover: true
    }
  },
  methods: {
    //展示专辑封面或者隐藏
    showOrhide() {
      if (this.isshowCover) {
        this.isshowCover = false
      } else {
        this.isshowCover = true
      }
    }
  },
  watch: {
    currentTime() {
      let pactive = document.querySelector('.active')
      if (pactive && pactive.offsetTop >= 200) {
        this.$refs.alllyric.scrollTop = pactive.offsetTop - 200
      }
    }
  }
}
</script>

<style lang="less" scoped>
.footer_detail {
  position: relative;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .bgc {
    filter: blur(10vw) brightness(50%);
  }
  .bot_img {
    position: absolute;
    top: 10%;
    left: 50%;
    width: 70vw;
    height: 70vw;
    transform: translateX(-50%);
    box-shadow: 2px 4px 10px 5px rgba(0, 0, 0, 0.2);
  }
  .lyric {
    position: absolute;
    top: 10%;
    left: 50%;
    width: 80vw;
    height: 60vh;
    transform: translateX(-50%);
    overflow: scroll;
    p {
      color: #fff;
      font-size: 25px;
      margin-bottom: 6px;
      opacity: 0.8;
    }
    .active {
      color: #fff;
      font-size: 30px;
      font-weight: 800;
      margin-bottom: 15px;
      opacity: 1;
    }
  }
  .van-progress {
    position: absolute;
    top: 80%;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    opacity: 0.7;
  }
  .van-button {
    position: absolute;
    top: 85%;
    left: 50%;
    width: 10vw;
    height: 10vw;
    transform: translateX(-50%);
    box-shadow: 1px 2px 6px 3px rgba(0, 0, 0, 0.2);
  }
}
</style>