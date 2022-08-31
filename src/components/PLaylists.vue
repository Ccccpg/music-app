<template>
  <div class="oneplaylist clearbox">
    <p>{{index+1}}</p>
    <div>
      <h1>{{songname}}</h1>
      <span class="middle">
        <i v-for="item in author" :key="item.id">{{item.name}}</i>
        <b>—{{al.name}}</b>
      </span>
    </div>
    <span class="iconfont icon-bofangMV" v-if="mv!=0"></span>

  </div>
</template>

<script>
export default {
  props: ['index', 'songname', 'author', 'mv', 'al']
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
    width: 4vw;
    height: 5vh;
    line-height: 5vh;
    margin-right: 2vw;
    vertical-align: middle;
    color: gray;
  }
  div {
    width: 70%;
    float: left;
    h1 {
      font-size: 4vw;
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
      i:first-child::before{
        content: '';
        display: inline-block;
      }
      b{
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