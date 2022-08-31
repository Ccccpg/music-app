<template>
  <div>
    <van-swipe class="my-swipe" indicator-color="white" :show-indicators="false">
      <van-swipe-item>
        <img :src="mdesc.coverImgUrl" alt="">
        <div class="left">
          <div class="top">
            {{mdesc.name}}
            <div class="tags">
              <van-tag round size="large" color="red" v-for="(item,index) in tags" :key="index">{{item}}</van-tag>
            </div>
          </div>
          <div class="bottom">
            <p v-if="mdesc.creator">创建者：<img :src="creator.avatarUrl" alt=""></p>
            <p>播放次数：{{playCount}}</p>
          </div>
        </div>
      </van-swipe-item>
      <van-swipe-item>
        <span>{{mdesc.description}}</span>
      </van-swipe-item>
    </van-swipe>
    <div class="middle_button">
      <van-button color="red">
        <span class="iconfont icon-comments-fill">
          <p>评论</p>
        </span>
      </van-button>
      <van-button color="red">
        <span class="iconfont icon-play-fill">
          <p>全部播放</p>
        </span>
      </van-button>
      <van-button color="red">
        <span class="iconfont icon-collection-fill">
          <p>收藏({{mdesc.subscribedCount}})</p>
        </span>
      </van-button>
    </div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <!-- <van-cell v-for="(item,index) in songs" :key="item.id" :title="index+1+item.name" /> -->
      <Playlists v-for="(item1,index) in songs" :key="item1.id" :songname="item1.name" :index="index" :author="item1.ar" :mv="item1.mv" :al="item1.al"></Playlists>
    </van-list>
  </div>
</template>

<script>
import { getPlaylist, getPlaydesc } from '@/api/playlist_detail'
import Playlists from '@/components/PLaylists.vue'
export default {
  name: 'playlist_detail',
  data() {
    return {
      loading: true,
      finished: false,
      mdesc: {},
      songs: [],
      num: 0
    }
  },
  computed: {
    id() {
      return location.hash.split('?')[1].split('=')[1]
    },
    tags() {
      return this.mdesc.tags
    },
    playCount() {
      return this.mdesc.playCount
    },
    creator() {
      return this.mdesc.creator
    }
  },
  created() {
    getPlaydesc(this.id).then(res => {
      this.mdesc = res.data.playlist
    })
    this.initinfor()
  },
  methods: {
    async initinfor() {
      this.loading = true
      this.num += 15
      const { data: res } = await getPlaylist(this.id, this.num)
      if (res.songs.length === 0) {
        return (this.finished = true)
      }
      this.songs = [...this.songs, ...res.songs]
      console.log('触发了一次刷新222!!!!!!!!!')
      this.loading = false
    },
    onLoad() {
      this.initinfor()
    }
  },
  components: {
    Playlists
  }
}
</script>

<style lang="less" scoped>
.van-swipe-item {
  width: 100%;
  height: 30vh;
  padding: 5vw;
  img {
    width: 50%;
    height: 100%;
    border-radius: 10%;
    box-shadow: 1px 2px 9px 4px rgba(0, 0, 0, 0.2);
  }
  .left {
    width: 50%;
    float: right;
    padding-left: 5vw;
    font-size: 5vw;
    font-weight: 800;
    .top {
      .tags {
        .van-tag {
          margin-right: 1vw;
          font-size: 3vw;
        }
      }
    }
    .bottom {
      margin-top: 4vh;
      p {
        font-size: 3vw;
        font-weight: 400;
      }
      p {
        img {
          border-radius: 50%;
          width: 5vw;
          vertical-align: middle;
          box-shadow: none;
        }
      }
    }
  }
}
.van-cell__title {
  width: 5px;
  font-size: 2vh;
}
.middle_button {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 7vh;
  background-color: red;
  box-shadow: 1px 4px 9px 5px #ff000033;
  .van-button {
    height: 100%;
    line-height: 7vh;
    span {
      display: inline-block;
      height: 100%;
      font-size: 4vh;
      color: white;
      p {
        float: right;
        font-size: 2vh;
      }
    }
  }
}
</style>