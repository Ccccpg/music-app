import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    album: {
      data: {
        album: {
          picUrl: 'none'
        }
      }
    },
    paused: true,
    songUrl: "",
    sid: 0,
    lyric: '',
    reallyric: [],
    currentTime: 0,
    alltime: 0,
    alltime_format: "",
    songlists: [{ name: 'hhh' }],
    songindex: -1,
  },
  getters: {
    albumCover(state) {
      return state.album.data.album.picUrl
    },
    process(state) {
      return ((state.currentTime / (state.alltime * 1000)) * 100).toFixed(2)
    }

  },
  actions: {
    //处理歌词数据
    getRealLyric(context, value) {
      // const Reglyric = new RegExp(/\[\d*:\d*.\d*\]/g)
      // const replacestr = ''
      const reallyric = value.split(/\n/).map((item, index) => {
        let min = item.slice(1, 3)
        let sec = item.slice(4, 6)
        let msec = item.slice(7, 10)
        let reallyric = item.slice(11, item.length)
        let time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(msec)

        if (isNaN(Number(msec))) {
          msec = item.slice(7, 9)
          reallyric = item.slice(10, item.length)
          time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(msec)
        }
        return { time, reallyric }
      })
      reallyric.forEach((item, index) => {
        if (index === reallyric.length - 1) {
          item.preTime = 0
        } else {
          item.preTime = reallyric[index + 1].time
        }
      });
      context.commit('GETREALLYRIC', reallyric)
    },
    // getProcess(context, value){
    //   const process = Math.round(currentTime / alltime)
    //   context.commit('GETPROCESS',process)
    // }
  },
  mutations: {
    GETALBUM(context, value) {
      this.state.album = value
    },
    GETSONGURL(context, value) {
      this.state.songUrl = value
    },
    GETLYRIC(context, value) {
      this.state.lyric = value
    },
    GETREALLYRIC(context, value) {
      this.state.reallyric = value
    },
    UPDATETIME(context, value) {
      this.state.currentTime = value
    },
    //获取歌曲的所有时间
    GETALLTIME(context, value) {
      this.state.alltime = value
      let min = parseInt(value / 60)
      let sec = value - min * 60
      let all = min + ':' + sec
      this.state.alltime_format = all
    },
    CHANGEPAUSED(context, value) {
      if (value) {
        this.state.paused = false
      } else {
        this.state.paused = true
      }
    },
    //更新播放列表
    UPATESONGLISTS(context, value) {
      this.state.songlists = value
    },
    //获取当前播放列表中_播放歌曲的数组下标
    UPATESONGINDEX(context, value) {
      this.state.songindex = value
    },
    //更新当前播放歌曲的id
    UPDATESONGID(context, value) {
      this.state.sid = value
    },
    //更新当前播放歌曲的歌词
    UPDATESONGLYRIC(context, value) {
      this.state.lyric = value
    },
  },
})