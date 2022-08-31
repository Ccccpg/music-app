<template>
  <div class="icons">
    <span class="iconfont icon-cdsvg">
      <p>每日推荐</p>
    </span>
    <span class="iconfont icon-radio">
      <p>私人FM</p>
    </span>
    <span class="iconfont icon-song">
      <p>歌单</p>
    </span>
    <span class="iconfont icon-playlist">
      <p>排行榜</p>
    </span>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
@import url("//at.alicdn.com/t/c/font_3616554_u98oe3h79gl.css");
.icons{
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  padding: 2vw;
  .iconfont{
    flex: 1;
    font-size: 7vw;
    color: red;
  }
  p{
    margin-top: 1vh;
    font-size: 3vw;
    font-weight: 800;
  }
}
</style>