import Vue from 'vue'
import App from './App.vue' // 不加路径 是默认去 node_modules 中查找
import router from './router/router.js' // 加上路径 是根据路径查找
import store from './store/store.js'

// 引入公用less
import './less/common.less'
// 引入 swiper css文件
import 'swiper/dist/css/swiper.min.css'
// 引入所有过滤器
import './filter/index.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


