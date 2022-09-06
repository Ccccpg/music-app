import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Playlist_detail from '@/views/Playlist_detail.vue'
import Search from '@/views/Search.vue'
import SearchResult from '@/components/SearchResult.vue'
Vue.use(VueRouter)

const routes = [
  {path:'/',redirect:'/home'},
  {
    path: '/home',
    name:'home',
    component: Home,
  },
  {
    path:'/playlist_detail',
    name:'playlist_detail',
    component:Playlist_detail
  },
  {
    path:'/search',
    name:'search',
    component:Search
  },
  {
    path: '/searchResult',
    name: 'searchResult',
    component: SearchResult
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
