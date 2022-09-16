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
  margin: .5rem .3125rem;
  p {
    font-size: 15px;
    float: left;
    width: .9375rem;
    height: .9375rem;
    line-height: .9375rem;
    vertical-align: middle;
    color: gray;
  }
  div {
    width: 75%;
    float: left;
    h1 {
      width: 100%;
      font-size: 17px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .middle {
      width: 100%;
      i {
        font-size: 14px;
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
    height: .9375rem;
    line-height: .9375rem;
  }
}
</style>