<template>
  <div class="singer_detail">
    <div class="top">
      <van-image class="singerCover" :src="singerDetail.cover" fit="cover" />
      <span class="singer_name">
        <p>{{singerDetail.name}}</p>
      </span>

    </div>
    <div class="middle_button">
      <van-button color="red">
        <span>
          <p>热门50首</p>
        </span>
      </van-button>
      <van-button color="red">
        <span>
          <p>全部单曲</p>
        </span>
      </van-button>
      <van-button color="red">
        <span>
          <p>MV({{singerDetail.mvSize}})</p>
        </span>
      </van-button>
    </div>

    <AllSongLists :id="id" :from="'singerTop50'"></AllSongLists>
  </div>
</template>

<script>
import { getSingerDetail, getSingerTop50Songs } from '@/api/getSingerByid'
import AllSongLists from '@/components/AllSongLists.vue'
import { mapState } from 'vuex'
export default {
  name: 'Album_detail',
  data() {
    return {
      mdesc: {},
      current: 0
    }
  },
  computed: {
    id() {
      return location.hash.split('?')[1].split('=')[1]
    },
    ...mapState({ singerDetail: 'singerDetail' })
  },

  watch: {},
  methods: {
    onChange(index) {
      this.current = index
    },
    async getSinger_detail() {
      let res = await getSingerDetail(this.id)
      console.log(res)
      this.$store.commit('UpdateSingerDetail', res.data.data.artist)
    },
    async getSingerTop50() {
      let res = await getSingerTop50Songs(this.id)
      // console.log(res.data.songs)
      this.$store.commit('UpdateSingerTop50', res.data.songs)
    }
  },
  components: {
    AllSongLists
  },

  created() {
    this.getSinger_detail()
    this.getSingerTop50()
  },
  beforeDestroy() {
    this.$store.commit('UpdateSongLists', [])
  }
}
</script>

<style lang="less" scoped>
.top {
  position: relative;
  width: 100vw;
  height: 40vh;
  overflow: hidden;
  .singerCover {
    .van-image {
      height: 100%;
    }
  }
  .singer_name {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 10vh;
    padding: 15px;
    font-size: 4vh;
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%);
    // filter: blur(80px);
    p {
      color: #fff;
    }
  }
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
</style>