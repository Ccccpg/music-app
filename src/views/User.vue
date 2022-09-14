<template>
  <div class="user">
    <h1>用户</h1>
    <input type="button" name="" id="" value="退出登陆" @click="unlogin">
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {getLoginStatus} from '@/api/login'
export default {
  methods: {
    unlogin() {
      if (this.isLogin) {
        localStorage.setItem('cookie', '')
        localStorage.setItem('token', '')
        localStorage.setItem('isLogin', false)
        this.$router.push('/login')
      }
    },
  },
  computed: {
    ...mapState({ isLogin: 'isLogin' })
  },
  created() {
    let res = localStorage.getItem('isLogin')
    this.$store.commit('UpdateIsLogin', res)
  }
}
</script>

<style>
</style>