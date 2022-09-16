<template>
  <div class="footer_detail">
    <img lazy-load :src="songdetail.al.picUrl" alt="" class="bgc" />

    <transition name="van-slide-left">
      <div class="Cover" v-if="isshowCover" @click="showOrhide">
        <van-image lazy-load :src="songdetail.al.picUrl" class="bot_img" />
        <h3>{{songdetail.name}}</h3>
      </div>
    </transition>

    <transition name="van-slide-right">
      <div class="lyric" v-if="!isshowCover" @click="showOrhide" ref="alllyric">
        <!-- <div class="alllyric" ref="alllyric"> -->
        <p v-for="item in lyric_format" :key="item.id" :class="{active:(item.time<=(currentTime*1000)&&item.preTime>(currentTime*1000))}">{{item.reallyric}}</p>
      </div>
    </transition>

    <div class="bottom">
      <div class="time">
        <p>{{currentTime_format}}</p>
        <p>{{alltime_format}}</p>
      </div>
      <van-progress :percentage="process" stroke-width="5" :show-pivot="false" color="white" track-color="gray" />
      <van-button icon="play" @click="play" round v-if="ispause" />
      <van-button icon="pause" @click="pause" round v-else />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'FooterDetail',
  props: ['process', 'play', 'pause', 'ispause', 'currentTime_format', 'alltime_format'],
  computed: {
    ...mapState({ lyric_format: 'lyric_format', songdetail: 'songdetail', currentTime: 'currentTime' })
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
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .bgc {
    width: 100%;
    height: 100%;
    filter: blur(10vw) brightness(50%);
  }
  .Cover {
    position: absolute;
    top: 10%;
    left: 50%;
    width: 8.125rem;
    height: 8.125rem;
    transform: translateX(-50%);
    h3 {
      color: #fff;
      opacity: 0.8;
    }
  }
  .lyric {
    position: absolute;
    top: 10%;
    left: 50%;
    width: 8.125rem;
    height: 60%;
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
      font-weight: 800;
      margin-bottom: 15px;
      opacity: 1;
    }
  }
  .bottom {
    // display: flex;
    // flex-direction: column;
    // justify-content: space-evenly;
    position: absolute;
    top: 75%;
    left: 50%;
    transform: translateX(-50%);
    width: 8.125rem;
    height: 30%;
    color: #fff;
    .time {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
    .van-progress {
      width: 100%;
      margin-top: .3125rem;
      opacity: 0.7;
    }
    .van-button {
      width: .9375rem;
      height: .9375rem;
      box-shadow: 1px 2px 6px 3px rgba(0, 0, 0, 0.2);
      opacity: 0.8;
      margin-top: .3125rem;
    }
  }
}
</style>