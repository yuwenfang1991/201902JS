// 用户调用的message方法
// vue数据驱动
import MessageComponent from './Message.vue'
import Vue from 'vue';
let getInstance = () =>{
    let vm = new Vue({ // 创建一个vue的实例 渲染这个 MessageComponent组件
        render:h=>h(MessageComponent)
    }).$mount(); // 把它 挂载到 当前电脑的内存中去了 （手动挂载）
    // 将 真的是 dom元素 渲染到页面上
    document.body.appendChild(vm.$el);
    // 组件件的通信 父组件
    let messageComponent = vm.$children[0];
    return {
        add(options) { // 会调用这个函数
            messageComponent.add(options); // 默认调用组件实例上的 add方法
        }
    }
}

// 单例模式
let instance;
const Message = (options) => {
    // console.log(options);
    // 单例 原型 发布订阅 观察者 (基于发布订阅) 代理模式 装饰模式
    if(!instance) { // 如果有缓存 直接从缓存中获取
        instance = getInstance();
    }
    
    instance.add(options); // 添加一层
}
// 如果用户调用了
// Message.install = (Vue)=> { // 第一个参数就是Vue的构造函数
//     Vue.prototype.$message = Message;
// }

export {
    Message
}

// vue vue-router vuex
// 单元测试
// vue-ssr