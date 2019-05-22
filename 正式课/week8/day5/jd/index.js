Vue.filter('money', function (val, n = 2) {
    return '￥' + (val / 100).toFixed(n);
});

let vm = new Vue({
    el: '.app',
    data: {
        ary: [],
        all: true,
        total: 0
    },
    created() {
        this.getData();
    },

    
    methods: {
        getData() {
            axios.get('./data.json').then((data) => {
                // data.data 是我们要使用的数据
                console.log(data.data);

                this.ary = data.data;
                this.checkOne(); // 初始化 all的值
            }).catch((err) => {

            });
        },
        changeCount(item, e) {
            // count 必须是正整数
            let str = (item.count + '').replace(/[^\d]*/g, '');
            str = str.replace(/^0/, '');
            item.count = str;
            this.computeTotal();
        },
        del(n) {
            this.ary.splice(n, 1); // 删除指定项
            this.checkOne(); // 删除没被勾中的项时 重置 all
        },
        // 清空购物车
        clear() {
            this.ary = [];
            this.computeTotal()
        },
        checkAll() {
            this.ary.forEach(item => {
                item.isSelect = this.all;
            });

            this.computeTotal();
        },
        checkOne() {
            // 所有数据的isSelect 是true this.all 才是true
            this.all = this.ary.every(item => {
                return item.isSelect;
            })

            this.computeTotal();

        },

        computeTotal() {
            this.total = this.ary.reduce((prev, next) => {
                // prev 上一个回调 的返回值
                // next 数组中的当前项
                // 根据该条数的 isSelect来决定进行累加
                if (next.isSelect) {
                    return prev + next.price * next.count;
                    // 上一次的和 再去加 当前的 价格*数量
                }

                return prev;
            }, 0);
        }


    },


});