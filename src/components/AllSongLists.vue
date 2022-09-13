<template>
  <div class="allSongLists">
    <van-list v-if="from==='playlists'" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <OneSongList @click.native="getSongDetail(item1.id),getItem(item1)" v-for="(item1,index) in songlists" :key="item1.id" :songname="item1.name" :index="index" :author="item1.ar" :mv="item1.mv" :sid="item1.id"></OneSongList>
    </van-list>
    <h3 v-if="from==='searchRes'">相关单曲</h3>
    <van-list v-if="from==='searchRes'" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <OneSongList @click.native="getSongDetail(item2.id),getItem(item2)" v-for="(item2,index) in searchSongLists" :key="item2.id" :songname="item2.name" :index="index" :author="item2.ar" :mv="item2.mv" :sid="item2.id"></OneSongList>
    </van-list>

    <van-list v-if="from==='album'" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <OneSongList @click.native="getSongDetail(item2.id),getItem(item2)" v-for="(item2,index) in albumdetail.songs" :key="item2.id" :songname="item2.name" :index="index" :author="item2.ar" :mv="item2.mv" :sid="item2.id"></OneSongList>
    </van-list>

    <van-list v-if="from==='singerTop50'" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <OneSongList @click.native="getSongDetail(item2.id),getItem(item2)" v-for="(item2,index) in singerTop50" :key="item2.id" :songname="item2.name" :index="index" :author="item2.ar" :mv="item2.mv" :sid="item2.id"></OneSongList>
    </van-list>

  </div>
</template>

<script>
import { getPlaylist } from '@/api/playlist_detail'
import OneSongList from '@/components/OneSongList.vue'
import { getSearchSongsResult } from '@/api/search'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      loading: true,
      finished: false,
      num: 0,
      item: null,
      isNext: false,
      flag: true
    }
  },
  computed: {
    ...mapState({ searchSongLists: 'searchSongLists', keyword: 'keyword', songdetail: 'songdetail', songCanPlay: 'songCanPlay', index: 'index', songlists: 'songlists', albumdetail: 'albumdetail', singerTop50: 'singerTop50' })
  },
  props: ['id', 'from'],
  watch: {
    songdetail: {
      deep: true,
      handler() {
        this.$store.dispatch('updateSongCanPlay')
        //重置当前时间为0
        this.$store.commit('UpdateCurrentTime', 0)
      }
    },
    songCanPlay(nv) {
      if (nv === -1) {
        console.log('重置为-1')
      } else if (nv) {
        this.$store.dispatch('updateLyric')
        this.$store.dispatch('updateAlltime')
        this.$store.commit('UpdatePause', false)
        this.$store.dispatch('updateSongUrl')
        if (!this.isNext) {
          this.$store.commit('UpdateSongIndex', this.item)
          this.isNext = true
        } else {
          this.$store.commit('UpdateSongIndex', this.index + 1)
        }
        this.$store.dispatch('updateSongCanPlay', -1)
      }
    },
    keyword() {
      this.num = 0
      this.initinfor()
    }
  },
  methods: {
    //点击那首歌就更新sid
    getSongDetail(sid) {
      this.isNext = false
      this.$store.dispatch('updateSongDetail', sid)
    },

    getItem(item) {
      this.item = item
    },
    //加载歌单数据
    async initinfor(nv) {
      //加载非搜索歌单列表
      if (this.id != 'search' && this.from === 'playlists') {
        this.loading = true
        const { data: res } = await getPlaylist(this.id, this.num)
        if (res.songs.length === 0) {
          return (this.finished = true)
        }
        // this.songlists = [...this.songlists, ...res.songs]
        this.num += 50
        this.$store.commit('UpdateSongLists', res.songs)
      } //加载搜索歌单列表
      else if (this.id === 'search' && this.from === 'searchRes') {
        this.loading = true
        if (this.keyword && this.keyword != '') {
          const res = await getSearchSongsResult(this.keyword, this.num)
          if (!res.data.result.songs) {
            return (this.finished = true)
          }
          if (this.num === 0) {
            this.$store.commit('UpdateSearchSongResult', ['ischange', res.data.result.songs])
          } else {
            this.$store.commit('UpdateSearchSongResult', res.data.result.songs)
          }
          this.num += 30
        }
      } else {
      }
      this.loading = false
    },
    //上拉加载
    onLoad() {
      this.initinfor()
    }
  },
  created() {
    this.initinfor()
  },
  components: {
    OneSongList
  }
}
</script>

<style lang="less" scoped>
h3 {
  padding: 2vw;
  font-size: 4vw;
}
</style>