<template>
  <div class="oneplaylist clearbox">
    <p>{{index+1}}</p>
    <div>
      <h1>{{songname}}</h1>
      <div class="middle van-ellipsis">
        <i v-for="item in author" :key="item.id">{{item.name}}</i>
        <!-- <b>—{{al.name}}</b> -->
      </div>
    </div>
    <span class="iconfont icon-bofangMV" v-if="mv!=0"></span>

  </div>
</template>

<script>
export default {
  name: 'OneSongList',
  props: ['index', 'songname', 'author', 'mv', 'sid'],
}
</script>

<style lang="less" scoped>
.oneplaylist {
  margin: 5vw;
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
    }
  }
  .iconfont {
    float: right;
    height: 5vh;
    line-height: 5vh;
  }
}
</style>