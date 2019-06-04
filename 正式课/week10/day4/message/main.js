import Vue from 'vue';
// 默认内部是基于vue-cli3.0
import App from './App.vue'
// 引入组件库
// 
export default new Vue({
    el: '#app',
    // 调用render函数 可以将某个组件渲染到#app上
    // createElement
    render: h => h(App)
        // h是一个函数 第一个参数是标签

        /* h('h1', {
            attrs: { id: aaa },
            on:{
                click() {
                    alert(1);
                }
            }
        }, '你好'); */

    });

// 启动项目 需要在当前目录下执行vue serve命令
// 会自动查找main.js 如果找不到 会继续查找app.vue
// vue --version
// main.js -> App
// App -> 使用了消息组件 message/index.js
// index 导出了一个方法
// index -> message.vue
// message.vue （add）