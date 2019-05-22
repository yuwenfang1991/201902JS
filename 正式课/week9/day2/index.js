Vue.directive('focus', function (el) {
    setTimeout(() => {
        el.focus();
    }, 10);
})
let vm = new Vue({
    el: '#app',
    data: {
        ary: [], // 确定数据结构: [{text:'你好',isSelect:false,isShow:true}] 如果isShow: true 展示input框
        count: 0,
        todo: '',
        myHash: '',
    },

    created() {

        // 初始化ary
        // 初次使用todoAry localStorage中不存在该数据
        // 那么我们获取到的就是null 这时我们给this.ary一个空数组
        // 若不是null之后 我们获取到的就是一个JSON字符串
        // 需要我们转成 JSON对象 然后赋给 this.ary
        let str = localStorage.getItem('todoAry');
        this.ary = str ? JSON.parse(str) : [];

        // 初始化hash值, 若刚进来时没有hash; 则 给一个初始值 #/all
        this.myHash = location.hash || '#/all';
        window.onhashchange = () => {
            console.log(location.hash);
            this.myHash = location.hash;
        }
    },

    methods: {
        add() {
            if (this.todo.length === 0) return; // 防止空值出现

            // 添加要做的事情
            let obj = {
                text: this.todo,
                isSelect: false,
                isShow: false,
                id: Math.random()
            }

            this.ary.unshift(obj);
            this.todo = ''; // 清空input框
        },

        change(item) {
            item.isShow = !item.isShow; // 让该条数据的input 展示出来
        },

        del(item) {
            // 过滤出去 item 这一项 item 是一个地址
            this.ary = this.ary.filter(val => val != item);
        }
    },

    computed: {
        todoAry() {
            localStorage.setItem('todoAry', JSON.stringify(this.ary));
            this.count = this.ary.filter(item => !item.isSelect).length; // 更新count
            // 根据不同的hash 筛选出不同的数组
            switch (this.myHash) {
                case '#/all':
                    return this.ary.map(item => {
                        // item.isSelect; // 就是为了用一下 isSelect 让它有依赖关系
                        return item;
                    });
                    break;
                case '#/finished':
                    // 筛选出isSelect是 true的项
                    return this.ary.filter(item => item.isSelect);
                    break;
                default:
                    // 筛选出isSelect是 true的项
                    return this.ary.filter(item => !item.isSelect);
                    break;
            }
        }
    },

});

/*
    1、首先根据需求 确定大致逻辑 和数据结构(显示文本 显示是否被勾中的 是否显示input)
    2、添加 按回车添加 按照刚才的数据结构 向数组中添加新数据
    3、把数组循环展示到页面上
    4、双击时 我们让input 框显示出来 让文本消失 失去焦点的时候让input 消失文本显示
    5、删除 点击删除的时候 我们把当前的这条数据删除即可
    6、点击实现底部的选项卡功能
    7、点击选项卡时 展示不同的内容 全部就展示整个数组
    未完成 就是数组中isSelect 是false的项
    已完成 就展示数组中isSelect是 true的项
*/