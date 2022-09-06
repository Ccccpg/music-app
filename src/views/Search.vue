<template>
  <div class="search">
    <van-search ref="search" v-model="value" placeholder="请输入搜索关键词" @search="onSearch" @input="getSearchRecommend" @blur="hideSearchRecommend" />

    <van-list v-if="recommend.length!=0">
      <van-cell v-for="item in recommend" :key="item.id" :title="item.keyword" @click="getKetword(item.keyword)" />
    </van-list>
    <h1>热搜榜</h1>
    <van-row>
      <van-col :class="{hot:(index<3)}" :span="12" v-for="(item,index) in hotLists" :key="item.id"><span>{{(index+1)}}</span>{{item.searchWord}}</van-col>
    </van-row>
  </div>
</template>

<script>
import { getSearchHot, getRecommend, getSearchResult } from '@/api/search'
import { Toast } from 'vant'
import SearchResult from '@/components/SearchResult.vue'
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
      keyword: '',
      show: false
    }
  },
  watch: {
    '$store.state.search_SongResult': {
      handler(newval) {
        if (this.$store.state.search_SongResult.length != 0) {
          this.$store.commit('UPATESONGLISTS',this.$store.state.search_SongResult)
          location.href = '/#/searchResult'
        }
      }
    }
  },
  methods: {
    onSearch(val) {
      console.log('触发一次搜索')
      Toast(val)
      this.keyword = this.value
      this.getSearchRes()
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
    getKetword(keyword) {
      this.keyword = keyword
    },
    //获取搜索结果
    async getSearchRes() {
      const res = await getSearchResult(this.keyword)
      this.$store.commit('GETSEARCHSONGRES', res.data.result.songs)
    },
    //隐藏搜索建议
    hideSearchRecommend() {
      this.recommend = []
    }
  },
  created() {
    this.getHotLists()
  },
  components: {
    SearchResult
  }
}
</script>

<style lang="less" scoped>
.search {
  width: 100vw;
  background-color: #f7f8fa;
  .van-list {
    width: 90vw;
    margin: 0 auto;
    box-shadow: 0 2px 9px 4px rgba(0, 0, 0, 0.1);
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