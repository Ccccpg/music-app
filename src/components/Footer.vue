<template>
  <div class="footer">
    <van-cell :is-link="false" @click="showPopup">
      <svg v-if="albumCover==='none'" t="1662025024891" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3449" width="128" height="128">
        <path d="M150.588235 542.117647a30.117647 30.117647 0 1 1 60.235294 0 271.058824 271.058824 0 0 0 271.058824 271.058824 30.117647 30.117647 0 1 1 0 60.235294C298.917647 873.411765 150.588235 725.082353 150.588235 542.117647z m722.82353-60.235294a30.117647 30.117647 0 1 1-60.235294 0 271.058824 271.058824 0 0 0-271.058824-271.058824 30.117647 30.117647 0 1 1 0-60.235294c182.964706 0 331.294118 148.329412 331.294118 331.294118zM512 1024C229.225412 1024 0 794.774588 0 512S229.225412 0 512 0s512 229.225412 512 512-229.225412 512-512 512z m0-60.235294c249.494588 0 451.764706-202.270118 451.764706-451.764706 0-249.494588-202.270118-451.764706-451.764706-451.764706C262.505412 60.235294 60.235294 262.505412 60.235294 512c0 249.494588 202.270118 451.764706 451.764706 451.764706z m0-331.294118a120.470588 120.470588 0 1 1 0-240.941176 120.470588 120.470588 0 0 1 0 240.941176z m0-60.235294a60.235294 60.235294 0 1 0 0-120.470588 60.235294 60.235294 0 0 0 0 120.470588z" fill="#7F7F7F" p-id="3450"></path>
      </svg>
      <van-image v-else :src="albumCover" fit="cover"></van-image>

    </van-cell>
    <van-popup v-model="show" position="bottom" closeable>
      <FooterDetail :album="album" :albumCover="albumCover" :pause="pause" :play="play" :process="process"></FooterDetail>
    </van-popup>
    <div class="middle">
      <h5 class="van-ellipsis songname">{{songName}}</h5>
      <van-progress v-if="!isNaN(process)" :percentage="process" stroke-width="5" :show-pivot="false" color="red" />
      <div class="time">
        <p class="current">{{currentTime_format}}</p>
        <p class="alltime">{{alltime_format}}</p>
      </div>
    </div>
    <van-button icon="play" @click="play" round v-if="paused" />
    <van-button icon="pause" @click="pause" round v-else />
    <audio :src="songUrl" ref="audio" @canplay="canplaysong"></audio>

  </div>

</template>

<script>
import FooterDetail from '@/components/FooterDetail'
import { mapGetters, mapState } from 'vuex'
import { getSong, getSongLyric } from '@/api/getSongByid'
export default {
  components: {
    FooterDetail
  },
  data() {
    return {
      num: 0,
      time1: null,
      show: false,
      songAllTime: 0
    }
  },
  computed: {
    album: {
      get() {
        return this.$store.state.album
      },
      set() {}
    },
    ...mapGetters({ albumCover: 'albumCover', process: 'process', currentTime_format: 'currentTime_format', alltime_format: 'alltime_format' }),
    ...mapState({ paused: 'paused', lyric: 'lyric', songindex: 'songindex', songlists: 'songlists', songUrl: 'songUrl', songName: 'songName' })
  },
  watch: {
    '$store.state.album': {
      deep: true,
      handler(newval, oldval) {
        this.album = newval
      }
    },
    songUrl(newval) {
      // debugger
      this.play()
      this.$store.commit('GETSONGNAME', this.songlists[this.songindex].name)
    },

    // 'this.$refs.audio.duration': {
    //   handler(newval, oldval) {
    //     console.log(newval)
    //   }
    // },
    lyric(newval) {
      this.$store.dispatch('getRealLyric', newval)
    },
    //侦听vuex里的songindex的改变来获取歌曲的url和歌词
    songindex(newval) {
      if (newval != -1) {
        let sid = this.songlists[this.songindex].id
        this.getSongUrl(sid)
        this.getLyric(sid)
      }
    },
    process(newval) {
      if (newval >= 100) {
        console.log('暂停！')
        this.$refs.audio.pause()
        this.$store.commit('UPDATETIME', 0)
        clearInterval(this.time1)
        this.$store.commit('CHANGEPAUSED', false)
        this.autoPlayNext()
      }
    }
    // 'this.$store.state.nowSong': {
    //   deep: true,
    //   handler(newval) {
    //     if (newval.songUrl) {
    //       this.play()
    //
    //     }else if(newval.process>=100){
    //       this.autoPlayNext()
    //     }
    //   }
    // }
  },
  methods: {
    //获取歌曲url
    async getSongUrl(sid) {
      const song = await getSong(sid)
      this.$store.commit('GETSONGURL', song.data.data[0].url)
    },
    //获取歌词
    async getLyric(sid) {
      if (sid != 0) {
        const res = await getSongLyric(sid)
        if (res.data.lrc.lyric) {
          this.$store.commit('GETLYRIC', res.data.lrc.lyric)
        }
      } else {
        console.log('sid为0!!!')
      }
    },
    showPopup() {
      this.show = true
    },
    //播放
    play() {
      console.log('播放！')
      this.$nextTick(() => {
        this.$refs.audio.play()
      })
      this.updateTime()
      this.$store.commit('CHANGEPAUSED', true)
    },
    //暂停播放
    pause() {
      console.log('暂停！')
      this.$refs.audio.pause()
      this.num--
      console.log('num:' + this.num)
      clearInterval(this.time1)
      this.$store.commit('CHANGEPAUSED', false)
    },
    //更新现在播放歌曲时间
    updateTime() {
      this.num++
      console.log('------------------------第' + this.num + '次调用')
      this.time1 = setInterval(() => {
        let currentTime = parseInt(this.$refs.audio.currentTime) * 1000
        this.$store.commit('UPDATETIME', currentTime)
        // this.autoPlayNext()
      }, 1000)
    },
    //判断是否该歌曲是否能播放（vip
    canplaysong() {
      console.log(parseInt(this.$refs.audio.duration))
      this.$store.commit('GETALLTIME', parseInt(this.$refs.audio.duration))
    },
    //自动播放下一首
    autoPlayNext() {
      if (this.songlists[this.songindex + 1]) {
        this.getSongUrl(this.songlists[this.songindex + 1].id)
        this.$store.commit('UPATESONGINDEX', this.songindex + 1)
        //重新获取歌词
        this.getLyric(this.songlists[this.songindex + 1].id), this.$store.commit('GETALBUM', this.songlists[this.songindex + 1].al.id)
        console.log('下一首')
      } else {
        this.pause()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.footer {
  position: fixed;
  top: 90vh;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 10vh;
  background-color: #fff;
  padding: 1vw 5vw;
  box-shadow: 0 2px 6px 3px rgba(0, 0, 0, 0.1);
  .van-cell {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10vw;
    padding: 0;
    svg {
      width: 10vw;
      height: 10vw;
    }
    .van-image {
      width: 10vw;
      height: 10vw;
    }
  }
  .middle {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 70%;
    height: 100%;
    .songname {
      width: 100%;
    }
    .van-progress {
      width: 60vw;
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
    width: 10vw;
    height: 10vw;
  }
}
</style>