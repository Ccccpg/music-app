<template>
  <div class="music">
    <div class="title clearbox">
      <h2>{{title}}</h2>
      <van-button v-if="type==='playlists'" color="gray" plain round size="mini">查看更多</van-button>
    </div>
    <div class="mlist">
      <!-- 展示歌单封面列表 -->
      <van-swipe v-if="type==='playlists'" :loop="false" :show-indicators="false" :width="120" :height="170">
        <van-swipe-item v-for="item in playlist" :key="item.id">
          <router-link class="normal" :to="{path:'/playlists',query:{id:item.id} }">
            <van-image class="normalCover" :src="item.coverImgUrl" fit="cover" width="120" height="120" />
            <div class="van-multi-ellipsis--l2 title_in">{{item.name}}</div>
            <div class="playCount">
              <span>{{playCount(item.playCount)}}</span>
              <p class="iconfont icon-bofang"></p>
            </div>
          </router-link>
        </van-swipe-item>
      </van-swipe>
      <!-- 展示搜索专辑封面列表 -->
      <van-swipe v-if="type==='album'" :loop="false" :show-indicators="false" :width="120" :height="170">
        <van-swipe-item v-for="item in searchAlbumLists" :key="item.id">
          <router-link class="normal" :to="{path:'/album',query:{id:item.id} }">
            <van-image class="normalCover" :src="item.picUrl" fit="cover" width="120" height="120" />
            <div class="van-multi-ellipsis--l2 title_in">{{item.name}}—<span v-for="a in item.artists" :key="a.id">{{a.name}}</span></div>
          </router-link>
        </van-swipe-item>
      </van-swipe>
      <!-- 展示搜索用户封面列表 -->
      <van-swipe v-if="type==='users'" :loop="false" :show-indicators="false" :width="50" :height="80">
        <van-swipe-item v-for="item in searchUsersLists" :key="item.id">
          <router-link :to="{path:'/album',query:{id:item.id} }">
            <van-image lazy-load class="userCover normal" round :src="item.avatarUrl" fit="cover" width="50" height="50" />
            <div class="van-ellipsis nickname">{{item.nickname}}</div>
          </router-link>
        </van-swipe-item>
      </van-swipe>
      <!-- 展示搜索歌手封面列表 -->
      <van-swipe v-if="type==='singers'" :loop="false" :show-indicators="false" :width="150" :height="100">
        <van-swipe-item v-for="item in searchSingersLists" :key="item.id">
          <router-link class="singer" :to="{path:'/singer',query:{id:item.id} }">
            <van-image lazy-load class="singerCover" round :src="item.picUrl" fit="cover" width="50" height="50" />
            <div class="van-ellipsis singername">{{item.name}}</div>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { getplaylists } from '@/api/home'
import { mapState } from 'vuex'
export default {
  name: 'Showplaylists',
  data() {
    return {
      playlist: []
    }
  },
  props: ['title', 'type'],
  created() {
    getplaylists().then(res => {
      this.playlist.push(...res.data.playlists)
    })
  },
  computed: {
    //计算播放量
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
    },
    ...mapState({ searchAlbumLists: 'searchAlbumLists', searchUsersLists: 'searchUsersLists', searchSingersLists: 'searchSingersLists' })
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
        margin: 8px;
        .normal {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 100%;
          height: 90%;
          .van-image
           {
            box-shadow: 1px 2px 6px 3px rgba(0, 0, 0, 0.1);
          }
          //通用部分
          .title_in {
            height: 30%;
            font-size: 12px;
          }
          //播放次数
          .playCount {
            position: absolute;
            top: 2px;
            right: 5px;
            color: #fff;
            font-size: 15px;
            line-height: 3vh;
            span {
              float: right;
            }
            p {
              float: left;
            }
          }
        }
        //歌手部分
        .singer {
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          width: 100%;
          height: 80%;
          background-color: #fff;
          line-height: 66px;
          box-shadow: 1px 2px 6px 3px rgba(0, 0, 0, 0.1);
          .singername {
            font-weight: 800;
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>