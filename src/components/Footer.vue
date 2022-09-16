<template>
  <div class="footer">
    <van-cell :is-link="false" @click="showPopup">
      <van-image v-if="songdetail.al" :src="songdetail.al.picUrl" fit="cover"></van-image>

    </van-cell>
    <van-popup v-model="show" position="bottom" closeable>
      <FooterDetail :alltime_format="alltime_format" :currentTime_format="currentTime_format" :songdetail="songdetail" :ispause="ispause" :play="play" :pause="pause" :process="process"></FooterDetail>
    </van-popup>
    <div class="middle">
      <h5 class="van-ellipsis songname">{{songdetail.name}}</h5>
      <van-progress v-if="!isNaN(process)&&process<=100" :percentage="process" stroke-width="5" :show-pivot="false" color="red" />
      <div class="time">
        <p class="current">{{currentTime_format}}</p>
        <p class="alltime">{{alltime_format}}</p>
      </div>
    </div>
    <van-button icon="play" @click="play" round v-if="ispause" />
    <van-button icon="pause" @click="pause" round v-else />
    <audio :src="url" ref="audio"></audio>

  </div>

</template>

<script>
import FooterDetail from '@/components/FooterDetail'
import { mapState } from 'vuex'
export default {
  components: {
    FooterDetail
  },
  data() {
    return {
      time1: null,
      show: false,
      songAllTime: 0
    }
  },
  computed: {
    ...mapState({ songlists: 'songlists', index: 'index', alltime_format: 'alltime_format', songdetail: 'songdetail', ispause: 'ispause', url: 'url', currentTime: 'currentTime', currentTime_format: 'currentTime_format', process: 'process' })
  },
  watch: {
    url(nv) {
      if (nv != '') {
        this.pause()
        setTimeout(() => {
          this.play()
        }, 300)
      }
    },
    currentTime(nv) {
      this.$store.dispatch('updateCurrentTime_format', nv)
      this.$store.dispatch('updateProcess')
    },
    process(nv) {
      if (nv >= 100) {
        this.pause()
        this.$store.dispatch('autoPlayNext', this.songlists[this.index + 1].id)
      }
    }
  },
  methods: {
    showPopup() {
      this.show = true
    },
    play() {
      if (this.$refs.audio.paused) {
        setTimeout(() => {
          this.updateCurrentTime()
          this.$refs.audio.play()
          this.$store.commit('UpdatePause', false)
        }, 300)
      }
    },
    pause() {
      setTimeout(() => {
        this.$refs.audio.pause()
        this.$store.commit('UpdatePause', true)
        clearInterval(this.time1)
        console.log('清理了')
      }, 300)
    },
    //自动更新当前播放时间
    updateCurrentTime() {
      this.time1 = setInterval(() => {
        console.log(this.$refs.audio.currentTime)
        this.$store.commit('UpdateCurrentTime', this.$refs.audio.currentTime)
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 1.875rem;
  background-color: #fff;
  padding: 0.0625rem 0.3125rem;
  box-shadow: 0 2px 6px 3px rgba(0, 0, 0, 0.1);
  .van-cell {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.25rem;
    padding: 0;
    .van-image {
      width: 1.25rem;
      height: 1.25rem;
    }
  }
  .middle {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 70%;
    height: 100%;
    .songname {
      font-size: 16px;
      width: 100%;
    }
    .time {
      .alltime {
        float: right;
      }
      .current {
        float: left;
      }
      p {
        font-size: 12px;
      }
    }
  }
  .van-button {
    width: 1.25rem;
    height: 1.25rem;
  }
}
</style>