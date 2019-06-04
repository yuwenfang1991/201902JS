<template>
  <div>
    <button @click="show">点我啊</button>
  </div>
</template>
<script>
// 引入 Message组件 引入的是 Message/index.js

import { Message } from "../message";
import Vue from "vue"
Vue.use(Message); //注册组件用的 或者给vue 的原型上添加方法
// 使用Vue.use 内部会调用
export default {
  methods: {
    show() {
      Message({
        message: "hello",
        type: "success",
        duration: 3000
      });
    }
  }
};
</script>
