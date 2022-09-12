import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Playlist_detail from '@/views/Playlist_detail.vue'
import Album_detail from '@/views/Album_detail'
import Search from '@/views/Search.vue'
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
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
