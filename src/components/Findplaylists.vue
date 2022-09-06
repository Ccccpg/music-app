<template>
  <div class="music">
    <div class="title clearbox">
      <h2>发现好歌单</h2>
      <van-button color="gray" plain round size="mini">查看更多</van-button>
    </div>
    <div class="mlist">
      <van-swipe :loop="false" :show-indicators="false" :width="120" :height="170">
        <van-swipe-item v-for="item in playlist" :key="item.id">
          <router-link :to="{path:'/playlist_detail',query:{id:item.id}}">
            <van-image :src="item.coverImgUrl" fit="cover" width="120" height="120" />
            <div class="van-multi-ellipsis--l2 title_in">{{item.name}}</div>
            <div class="playCount">
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
    h2 {
      float: left;
      font-size: 4vw;
    }
    .van-button {
      float: right;
    }
  }
  .mlist {
    .van-swipe__track {
      .van-swipe-item {
        position: relative;
        margin: 8px;
        .van-image {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          box-shadow: 1px 2px 6px 3px rgba(0, 0, 0, 0.2);
        }
        .title_in {
          position: absolute;
          bottom: 0;
          height: 42px;
          font-size: 12px;
        }
        .playCount {
          position: absolute;
          top: 0;
          right: 5px;
          color: #fff;
          font-size: 20px;
          line-height: 3vh;
          span {
            float: right;
          }
          p{
            float: left;
          }
        }
      }
    }
  }
}
</style>