import Vue from 'vue'
import Vuex from 'vuex'
// 导入state中的导出
import state from './state.js'
// 把mutations 中的导出全部引入 放到一个 名字是mutations 的对象中
import * as mutations from './mutations.js'

import * as actions from './actions.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state:state,
  mutations, // 相当于mutations:mutations
  actions, // 相当于actions:actions
})
