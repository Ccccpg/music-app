<template>
  <div class="music">
    <div class="title clearbox">
      <h1>发现好歌单</h1>
      <van-button color="gray" plain round size="mini">查看更多</van-button>
    </div>
    <div class="mlist">
      <van-swipe :loop="false" :width="130" :show-indicators="false">
        <van-swipe-item v-for="item in playlist" :key="item.id">
          <router-link :to="{path:'/playlist_detail',query:{id:item.id}}">
            <img :src="item.coverImgUrl" alt="">
            <p>{{item.name}}</p>
            <div>
              <span>{{playCount(item.playCount)}}</span>
              <p class="iconfont icon-bofang"></p>
            </div>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { getplaylists } from '@/api/home'
export default {
  name: 'playlists',
  data() {
    return {
      playlist: []
    }
  },
  created() {
    getplaylists().then(res => {
      this.playlist.push(...res.data.playlists)
    })
  },
  computed: {
    playCount(val) {
      return val => {
        if (val > 99999999) {
          return (val / 100000000).toFixed(1) + '亿'
        } else if (val > 9999) {
          return (val / 10000).toFixed(1) + '万'
        } else {
          return val
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.music {
  .title {
    padding: 2vw;
    h1 {
      float: left;
      font-size: 5vw;
    }
    .van-button {
      float: right;
    }
  }
  .mlist {
    .van-swipe {
      width: 100%;
      .van-swipe-item {
        position: relative;
        padding: 1vw;
        margin: 1vw;
        img {
          width: 100%;
          height: 100%;
          box-shadow: 1px 2px 6px 3px rgba(0, 0, 0, 0.2);
        }
        p {
          padding: 0 1vw;
          font-size: 12px;
          word-break: break-all;
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2; /* 这里是超出几行省略 */
        }
        div {
          position: absolute;
          top: 2vw;
          right: 2vh;
          color: #fff;
          font-size: 4vw;
          height: 3vh;
          line-height: 3vh;
          span {
            float: right;
          }
        }
      }
    }
  }
}
</style>