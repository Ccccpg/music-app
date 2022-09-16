import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vue_use_vant from '@/plugins/index'
import '../node_modules/amfe-flexible'
vue_use_vant(Vue)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
