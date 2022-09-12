<template>
  <div class="search">
    <van-search ref="search" v-model="value" placeholder="请输入搜索关键词" @search="onSearch" @input="getSearchRecommend" @blur="hideSearchRecommend" />
    <div class="recommends" ref="recommends">
      <van-list>
        <van-cell v-for="item in recommend" :key="item.id" :title="item.keyword" @click="getKeyword(item.keyword)" />
      </van-list>
    </div>

    <ShowListsCover v-if="searchSingersLists.length!=0" :title="'相关歌手'" :type="'singers'"></ShowListsCover>
    <ShowListsCover v-if="searchAlbumLists.length!=0" :title="'相关专辑'" :type="'album'"></ShowListsCover>
    <AllSongLists v-if="searchSongLists.length!=0" :id="'search'" :from="'searchRes'"></AllSongLists>
    <ShowListsCover v-if="searchUsersLists.length!=0" :title="'相关用户'" :type="'users'"></ShowListsCover>
    <h1>热搜榜</h1>
    <van-row>
      <van-col :class="{hot:(index<3)}" :span="12" v-for="(item,index) in hotLists" :key="item.id"><span>{{(index+1)}}</span>{{item.searchWord}}</van-col>
    </van-row>

  </div>
</template>

<script>
import { getSearchHot, getRecommend } from '@/api/search'
import AllSongLists from '@/components/AllSongLists.vue'
import ShowListsCover from '@/components/ShowListsCover.vue'
import { Toast } from 'vant'
import { mapState } from 'vuex'
export default {
  name: 'Search',
  data() {
    return {
      value: '',
      list: [],
      loading: false,
      finished: false,
      hotLists: [],
      recommend: [],
      show: false
    }
  },
  computed: {
    ...mapState({ searchSongLists: 'searchSongLists', keyword: 'keyword', searchSingersLists: 'searchSingersLists', searchUsersLists: 'searchUsersLists', searchAlbumLists: 'searchAlbumLists', searchSongLists: 'searchSongLists' })
  },
  watch: {
    value(nv){
      this.$refs.recommends.style.display = 'block'
    },
    keyword(nv){
      this.onSearch(nv)
    }
  },
  methods: {
    onSearch(val) {
      console.log('触发一次搜索')
      Toast('已经显示"' + val + '"的相关内容')
      this.$store.commit('UpdateKeyword', val)
      //获取相关专辑信息
      this.$store.dispatch('updateSearchAlbum', this.keyword)
      //获取相关用户信息
      this.$store.dispatch('updateSearchUsers', this.keyword)
      //获取相关歌手信息
      this.$store.dispatch('updateSearchSingers', this.keyword)
      //获取相关单曲信息
      this.$store.commit('UpdateSearchSongResult', this.keyword)
    },
    //获取热搜榜
    async getHotLists() {
      const searchhot = await getSearchHot()
      this.hotLists = searchhot.data.data
    },
    //获取搜索建议
    async getSearchRecommend(keyword) {
      if (keyword != '') {
        const res = await getRecommend(keyword)
        if (res.data.result.allMatch) {
          this.recommend = res.data.result.allMatch = res.data.result.allMatch
        }
      } else {
        console.log('关键词为空')
      }
    },
    //获取搜索关键词
    getKeyword(keyword) {
      // this.$store.commit('UpdateKeyword', keyword)
      console.log(keyword);
      this.$store.commit('UpdateKeyword',keyword)
    },
    //隐藏搜索建议
    hideSearchRecommend(e) {
      setTimeout(() => {
        this.$refs.recommends.style.display = 'none'
      },300)
    },
  },
  created() {
    this.getHotLists()
  },
  components: {
    AllSongLists,
    ShowListsCover
  }
}
</script>

<style lang="less" scoped>
.search {
  width: 100vw;
  background-color: #f7f8fa;
  .van-list {
    position: fixed;
    top: 98px;
    left: 0;
    width: 100vw;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    z-index: 99;
  }
  h1 {
    margin-top: 10px;
    margin-left: 5vw;
    font-size: 18px;
  }
  .van-row {
    margin-top: 10px;
    padding: 10px;
    background-color: #fff;
    // box-shadow: 0 2px 9px 4px rgba(0, 0, 0, 0.1);
    .van-col {
      font-size: 15px;
      padding: 5px;
      color: gray;
      span {
        display: inline-block;
        width: 12%;
        text-align: center;
        margin-right: 10px;
      }
    }
    .hot {
      font-weight: 800;
      font-style: oblique;
      color: #000;
    }
  }
}
</style>