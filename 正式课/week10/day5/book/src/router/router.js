import Vue from 'vue'
import Router from 'vue-router'
// import Home from '../views/Home.vue'
import bookR from "./bookRouter.js"
// 处理非法路径使用的映射表 需要放到总映射表的最下边
let ary = [{
  path:'/*',
  redirect:'/home'
}]

Vue.use(Router) // Vue.component Vue.prototype

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: bookR.concat(ary),
  linkActiveClass:'current'
  // routes: [
  //   {
  //     path: '/',
  //     name: 'home',
  //     component: Home
  //   },
  //   {
  //     path: '/about',
  //     name: 'about',
  //     // route level code-splitting
  //     // this generates a separate chunk (about.[hash].js) for this route
  //     // which is lazy-loaded when the route is visited.
  //     // 路由懒加载 只有当路径走到对应的路径时，才会去加载对应的组件
  //     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  //   }
  // ]
})
