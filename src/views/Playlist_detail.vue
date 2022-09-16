<template>
  <div>
    <van-swipe class="my-swipe" indicator-color="white" :show-indicators="false">
      <van-swipe-item>
        <van-image fit="cover" :src="mdesc.coverImgUrl" alt="" />
        <div class="left">
          <div class="top">
            {{mdesc.name}}
            <br>
            <span class="tag" v-for="(item,index) in tags" :key="index">{{item}}</span>
          </div>
          <div class="bottom">
            <p v-if="mdesc.creator" class="van-ellipsis">创建者：<img :src="creator.avatarUrl" alt="">{{'   '+mdesc.creator.nickname}}</p>
            <p class="van-ellipsis">曲目：{{mdesc.trackCount}}首</p>
            <p class="van-ellipsis">播放次数：{{playCount}}</p>
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
    <AllSongLists :id="id" :from="'playlists'"></AllSongLists>
  </div>
</template>

<script>
import { getPlaydesc } from '@/api/playlist_detail'
import AllSongLists from '@/components/AllSongLists.vue'
export default {
  name: 'playlist_detail',
  data() {
    return {
      mdesc: {}
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

  watch: {},

  components: {
    AllSongLists
  },

  created() {
    getPlaydesc(this.id).then(res => {
      this.mdesc = res.data.playlist
    })
  },
  beforeDestroy() {
    this.$store.commit('UpdateSongLists', [])
  }
}
</script>

<style lang="less" scoped>
.van-swipe-item {
  width: 100%;
  height: 5rem;
  padding: 0.625rem;
  .van-image {
    width: 50%;
    border-radius: 10%;
    box-shadow: 1px 2px 9px 4px rgba(0, 0, 0, 0.2);
  }
  .left {
    width: 50%;
    float: right;
    padding-left: 0.3125rem;
    font-size: 18px;
    font-weight: 800;
    .top {
      .tag{
        height: .9375rem;
        padding: .0313rem .125rem;
        margin-right: .125rem;
        background-color: red;
        font-size: 12px;
        color: #fff;
        border-radius: .625rem;
      }
    }
    .bottom {
      margin-top: .625rem;
      p {
        font-size: 12px;
        font-weight: 400;
      }
      p {
        img {
          border-radius: 50%;
          width: .5rem;
          vertical-align: middle;
          box-shadow: none;
        }
      }
    }
  }
}
.middle_button {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 1.25rem;
  background-color: red;
  box-shadow: 1px 4px 9px 5px #ff000033;
  margin-top: .3125rem;
  .van-button {
    height: 100%;
    line-height: 1.25rem;
    span {
      display: inline-block;
      height: 100%;
      font-size: 25px;
      color: white;
      p {
        float: right;
        font-size: 14px;
      }
    }
  }
}
</style>