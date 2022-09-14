import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Playlist_detail from '@/views/Playlist_detail.vue'
import Album_detail from '@/views/Album_detail'
import Search from '@/views/Search.vue'
import Singer_detail from '@/views/Singer_detail'
import Login from '@/views/Login'
import User from '@/views/User'
import store from '@/store/index'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: '/playlists',
    name: 'playlists',
    component: Playlist_detail
  },
  {
    path: '/album',
    name: 'album',
    component: Album_detail
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  },
  {
    path: '/singer',
    name: 'singer',
    component: Singer_detail
  },
  {
    path: '/user',
    name: 'user',
    component: User
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },

]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path === '/user') {
    if (localStorage.isLogin && localStorage.getItem('token') != '' && localStorage.getItem('cookie') != '') {
      next()
    } else {
      next('/login')
    }
  } else if (to.path === '/login') {
    if (localStorage.isLogin && localStorage.getItem('token')!='' && localStorage.getItem('cookie')!='') {
      next('/user')
    } else {
      next()
    }
  }
  else {
    next()
  }
})
//解决跳转报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
export default router
