<template>
    <div v-if="messages.length">
        <div v-for="m in messages" :key="m.id">
            {{m.message}}
        </div>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            messages:[]
        }
    },

    mounted() { // 组件加载完毕后执行
        this.id = 0;
    },
    methods: {
        // 添加弹层
        add(options) { // {message,duration,type}
            let id = this.id++; // 保证id的唯一性
            let layer = {...options,id};
            // 往数组中添加一层
            this.messages.push(layer);
            layer.timer = setTimeout(()=>{
                this.remove(layer);
            },options.duration)
        },
        // 移除弹层
        remove(layer) { 
            clearTimeout(layer.timer); // 清除定时器
            // 过滤数据中的消息
            this.messages = this.messages.filter(m=> m.id !== layer.id);
        }
    },
}
</script>
