<template>
  <div>
    <van-swipe class="my-swipe" indicator-color="white" :show-indicators="false">
      <van-swipe-item>
        <van-image fit="cover" :src="albumdetail.album.picUrl" alt="" />
        <div class="left">
          <div class="top">
            {{albumdetail.album.name}}
            <br>
            <van-tag round size="medium" color="red">{{albumdetail.album.subType}}</van-tag>
            <p v-for="item in albumdetail.album.artists" :key="item.id" class="van-ellipsis artists">歌手：{{item.name}}</p>
          </div>
          <div class="bottom">
            <p class="van-ellipsis">曲目：{{albumdetail.album.size}}首</p>
            <p>发行时间：{{publishTime_format}}</p>
          </div>
        </div>
      </van-swipe-item>
      <van-swipe-item>

        <div class="description">
          <h3 v-if="albumdetail.album.description!=''">专辑介绍</h3>
          <h3 v-else>该专辑还没有简介！</h3>
          <br>
          <p>{{albumdetail.album.description}}</p>
        </div>
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

    <AllSongLists :id="id" :from="'album'"></AllSongLists>
  </div>
</template>

<script>
import { getAlbumDesc } from '@/api/getAlumByid'
import AllSongLists from '@/components/AllSongLists.vue'
import { mapState } from 'vuex'
export default {
  name: 'Album_detail',
  data() {
    return {
      mdesc: {}
    }
  },
  computed: {
    id() {
      return location.hash.split('?')[1].split('=')[1]
    },
    //格式化发行时间
    publishTime_format() {
      let msec = this.albumdetail.album.publishTime
      let year = new Date(msec).getFullYear()
      let month = new Date(msec).getMonth() + 1
      let day = new Date(msec).getDate()
      return year + '-' + month + '-' + day
    },
    ...mapState({ albumdetail: 'albumdetail' })
  },

  watch: {},
  methods: {
    async getAlbum_Desc() {
      let res = await getAlbumDesc(this.id)
      this.$store.commit('UpdateAlbumDetail', res.data)
    }
  },
  components: {
    AllSongLists
  },

  created() {
    this.getAlbum_Desc()
  },
  beforeDestroy() {
    this.$store.commit('UpdateSongLists', [])
  }
}
</script>

<style lang="less" scoped>
.van-swipe-item {
  width: 100%;
  height: 30vh;
  padding: 5vw;
  .van-image {
    width: 50%;
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
        height: 4.5vh;
        overflow: hidden;
        .van-tag {
          margin-right: 1vw;
          font-size: 3vw;
        }
      }
      .artists {
        margin-top: 5px;
        font-weight: 400;
        font-size: 3vw;
      }
    }
    .bottom {
      margin-top: 3vh;
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
  // margin-top: 2vh;
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
.description {
  width: 100%;
  height: 100%;
  font-size: 4vw;
  overflow: scroll;
}
.bgc {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>