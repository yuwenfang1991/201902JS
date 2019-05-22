Vue.filter('money', function (val, n = 2) {
    return '￥' + (val / 100).toFixed(n);
});

let vm = new Vue({
    el: '.app',
    data: {
        ary: [],
    },
    created() {
        this.getData();
    },

    computed: {
        // 把data 中的all 挪到计算属性中
        all: {
            get() {
                // 只有当下边的项 都是被选中时 才被选中
                return this.ary.every(item => item.isSelect)
            },
            set(val) {
                // val 是当checkBox 被选中 或者取消选中时; 赋给的 true或者 false
                // val 是true; 我们就要让所有的 isSelect 都是true
                this.ary.forEach(item => item.isSelect = val);

            }

        },

        computeTotal() {
            let total = this.ary.reduce((prev, next) => {
                // prev 上一个回调 的返回值
                // next 数组中的当前项
                // 根据该条数的 isSelect来决定进行累加
                if (next.isSelect) {
                    return prev + next.price * next.count;
                    // 上一次的和 再去加 当前的 价格*数量
                }

                return prev;
            }, 0);

            return total;
        }
    },


    methods: {
        getData() {
            axios.get('./data.json').then((data) => {
                // data.data 是我们要使用的数据
                console.log(data.data);

                this.ary = data.data;
            }).catch((err) => {

            });
        },
        changeCount(item, e) {
            // count 必须是正整数
            let str = (item.count + '').replace(/[^\d]*/g, '');
            str = str.replace(/^0/, '');
            item.count = str;
        },
        del(n) {
            this.ary.splice(n, 1); // 删除指定项
        },
        // 清空购物车
        clear() {
            this.ary = [];
        }
    },


});