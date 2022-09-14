<template>
  <div class="login">
    <h1>登陆啦</h1>
    <van-form @submit="onSubmit">
      <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名" :rules="[{ required: true, message: '请填写用户名' }]" />
      <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]" />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { getLoginByPhone, getLoginUser } from '@/api/login'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    ...mapState({ userInfor: 'userInfor', isLogin: 'isLogin' })
  },
  watch: {
    userInfor: {
      deep: true,
      handler(nv) {
        if (nv.token != '') {
          this.$store.commit('UpdateIsLogin', true)
          localStorage.setItem('cookie', this.userInfor.cookie)
          localStorage.setItem('token', this.userInfor.token)
          localStorage.setItem('isLogin', true)
          this.$router.push('/user')
        }
      }
    }
  },
  methods: {
    async onSubmit(values) {
      let res = await getLoginByPhone(this.username, this.password)
      console.log(res.data)
      this.$store.commit('UpdateUserInfor', res.data)
      // console.log('submit', values)

      let res1 = await getLoginUser()
      console.log('----------------')
      console.log(res1)
      this.getStatus()
    },
  },
  created() {
    let res = localStorage.getItem('isLogin')
    this.$store.commit('UpdateIsLogin', res)
    
  }
}
</script>

<style>
</style>