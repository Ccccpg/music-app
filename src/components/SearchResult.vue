<template>
  <div class="searchResult">
    <h1>搜索结果</h1>
    <van-list v-if="search_SongResult.length!=0" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <OneSongList v-for="(item,index) in search_SongResult" :key="item.id" :title="item" :songname="item.name" :index="index" :author="item.artists" :mv="item.mv" :sid="item.id"></OneSongList>
    </van-list>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import OneSongList from '@/components/OneSongList.vue'
export default {
  name: 'SearchResult',
  data() {
    return {
      list: [],
      loading: true,
      finished: false,
    }
  },
  computed: {
    ...mapState({ search_SongResult: 'search_SongResult' })
  },
  methods: {
    onLoad() {
      this.loading = false
    },
    
  },
  components: {
    OneSongList
  },
  created(){
    // debugger
    console.log(this.$store.state.search_SongResult);
  }
}
</script>

<style lang="less" scoped>
</style>