<template>
  <div class="oneplaylist clearbox" @click="getAlbum_(aid),updateSongIndex(),play()">
    <p>{{index+1}}</p>
    <div>
      <h1>{{songname}}</h1>
      <div class="middle van-ellipsis">
        <i v-for="item in author" :key="item.id">{{item.name}}</i>
        <b>—{{al.name}}</b>
      </div>
    </div>
    <span class="iconfont icon-bofangMV" v-if="mv!=0"></span>

  </div>
</template>

<script>

import { mapMutations, mapState } from 'vuex'
export default {
  name:'PlayLists',
  props: ['aid', 'index', 'songname', 'author', 'mv', 'al'],
  computed: {
    ...mapState({ paused: 'paused' })
  },
  methods: {
    //获取该歌曲的所在专辑
    getAlbum_(aid) {
      this.$store.commit('GETALBUM', aid)
    },
    //更新vuex里的paused值为false
    play() {
      this.$store.commit('CHANGEPAUSED', true)
    },
    //更新当前歌曲的数组下标
    updateSongIndex(){
      this.RESETSONGINDEX()
      setTimeout(() => {
        this.UPATESONGINDEX(this.index)
      }, 300);
    },
    ...mapMutations(['UPATESONGINDEX','RESETSONGINDEX'])
    
  }
}
</script>

<style lang="less" scoped>
.oneplaylist {
  margin: 5vw;
  // padding: 2vw;
  // border-radius: 4vw;
  // box-shadow: 1px 2px 4px 2px rgba(0, 0, 0, .1);
  p {
    font-size: 4vw;
    float: left;
    width: 8vw;
    height: 5vh;
    line-height: 5vh;
    vertical-align: middle;
    color: gray;
  }
  div {
    width: 75%;
    float: left;
    h1 {
      width: 100%;
      font-size: 4vw;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .middle {
      width: 100%;
      i {
        font-size: 3vw;
        color: gray;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      i::before {
        content: '/';
        display: inline-block;
      }
      i:first-child::before {
        content: '';
        display: inline-block;
      }
      b {
        width: 100%;
        font-size: 3vw;
        color: gray;
        font-weight: 400;
      }
    }
  }
  .iconfont {
    float: right;
    height: 5vh;
    line-height: 5vh;
  }
}
</style>