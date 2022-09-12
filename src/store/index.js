import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import { getSongdetail, getSongLyric, getSongUrl } from '@/api/getSongByid'
import { getSearchAlbumResult, getSearchUsersResult, getSearchSingersResult } from '@/api/search'
export default new Vuex.Store({
  state: {
    songlists: [],
    songdetail: {
      al: {
        name: '',
        id: 0,
        picUrl: ''
      },
      id: '',
      mv: -1,
      fee: -1,
      dt: 1
    },
    songCanPlay: -1,
    lyric_format: [],
    alltime_format: '',
    index: -1,
    ispause: true,
    url: '',
    currentTime: 0,
    currentTime_format: '',
    process: 0,
    searchSongLists: [],
    searchAlbumLists: [],
    searchUsersLists: [],
    searchSingersLists: [],
    keyword: ''
  },
  getters: {
  },
  actions: {
    //更新歌曲细节
    async updateSongDetail(context, value) {
      let detail = await getSongdetail(value)
      context.commit('UpdateSongDetail', detail.data.songs[0])
    },
    //更新歌曲能否播放状态
    updateSongCanPlay(context, value) {
      if (value) {
        context.commit('UpdateSongCanPlay', value)
      } else {
        let v1;
        if (this.state.songdetail.fee === 1) {
          console.log('会员歌曲');
          v1 = false
        } else if (this.state.songdetail.fee === 4) {
          console.log('需要购买专辑');
          v1 = false
        } else {
          console.log('可以播放');
          v1 = true
        }
        context.commit('UpdateSongCanPlay', v1)
      }
    },
    //获取格式化歌词
    async updateLyric(context) {
      let lyric = await getSongLyric(this.state.songdetail.id)
      let reallyric = lyric.data.lrc.lyric
      //处理歌词
      let reallyric01 = reallyric.split(/\n/).map((item, index) => {
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
      reallyric01.forEach((item, index) => {
        if (index === reallyric01.length - 1) {
          item.preTime = 0
        } else {
          item.preTime = reallyric01[index + 1].time
        }
      });
      context.commit('UpdateLyric', reallyric01)
    },
    //获取格式化总时长
    updateAlltime(context) {
      let time1 = parseInt(this.state.songdetail.dt / 1000)
      let min = parseInt(time1 / 60)
      let min1 = min < 10 ? '0' + min : min
      let sec = time1 - 60 * min
      let sec1 = sec < 10 ? '0' + sec : sec
      let time2 = min1 + ':' + sec1
      context.commit('UpdateAlltime', time2)
    },
    //更新歌曲url
    async updateSongUrl(context) {
      let surl = await getSongUrl(this.state.songdetail.id)
      context.commit('UpdateSongUrl', surl.data.data[0].url)
    },
    //更新格式化当前时间
    updateCurrentTime_format(context, value) {
      let alltime1 = parseInt(value)
      let min = parseInt(alltime1 / 60)
      let min1 = min < 10 ? '0' + min : min
      let sec = alltime1 - 60 * min
      let sec1 = sec < 10 ? '0' + sec : sec
      let alltime2 = min1 + ':' + sec1
      context.commit('UpdateCurrentTime_format', alltime2)
    },
    //更新进度条
    updateProcess(context) {
      let nowprocess = ((this.state.currentTime) * 1000 / this.state.songdetail.dt) * 100
      context.commit('UpdateProcess', nowprocess)
    },
    //自动播放下一首
    autoPlayNext(context, value) {
      this.dispatch('updateSongDetail', value)
    },
    //更新 搜索 相关专辑信息
    async updateSearchAlbum(context, value) {
      let res = await getSearchAlbumResult(value)
      context.commit('UpdateSearchAlbum', res.data.result.albums)
    },
    //更新 搜索 相关用户信息
    async updateSearchUsers(context, value) {
      let res = await getSearchUsersResult(value)
      context.commit('UpdateSearchUsers', res.data.result.userprofiles)
    },
    //更新 搜索 相关歌手信息
    async updateSearchSingers(context, value) {
      let res = await getSearchSingersResult(value)
      context.commit('UpdateSearchSingers', res.data.result.artists)
    }
  },
  mutations: {
    //更新歌单列表
    UpdateSongLists(state, value) {
      if (value.length === 0) {
        state.songlists = []
      } else {
        state.songlists = [...state.songlists, ...value]
      }

    },
    //更新歌曲下标
    UpdateSongIndex(state, value) {
      if (isNaN(value)) {
        state.index = this.state.songlists.indexOf(value)
      } else {
        state.index = value
      }
    },
    //更新按钮状态
    UpdatePause(state, value) {
      state.ispause = value
    },
    //更新歌曲url
    UpdateSongUrl(state, value) {
      state.url = value
    },
    //更新歌曲细节
    UpdateSongDetail(state, value) {
      state.songdetail = value
    },
    //更新歌曲能否播放状态
    UpdateSongCanPlay(state, value) {
      state.songCanPlay = value
    },
    //更新格式化歌词
    UpdateLyric(state, value) {
      state.lyric_format = value
    },
    //获取格式化总时长
    UpdateAlltime(state, value) {
      state.alltime_format = value
    },
    //更新当前时间
    UpdateCurrentTime(state, value) {
      state.currentTime = value
    },
    //更新格式化当前时间
    UpdateCurrentTime_format(state, value) {
      state.currentTime_format = value
    },
    //更新进度条
    UpdateProcess(state, value) {
      state.process = value
    },
    //更新搜索歌单列表
    UpdateSearchSongResult(state, value) {
      if (value[0] === 'ischange') {
        state.searchSongLists = [...value[1]]
      } else {
        state.searchSongLists = [...state.searchSongLists, ...value]
      }

    },
    //更新关键词
    UpdateKeyword(state, value) {
      state.keyword = value
    },
    //更新 搜索 相关专辑信息
    UpdateSearchAlbum(state, value) {
      state.searchAlbumLists = [...value]
    },
    //更新 搜索 相关用户信息
    UpdateSearchUsers(state, value) {
      state.searchUsersLists = [...value]
    },
    //更新 搜索 相关歌手信息
    UpdateSearchSingers(state, value){
      state.searchSingersLists=[...value]
    }

  },
})