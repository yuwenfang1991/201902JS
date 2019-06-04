<template>
  <div>
    <!-- 首页 -->
    <!-- <button @click="add">增加</button>
    <button @click="remove">减少</button>
    <button @click="add2">异步增加</button>
    当前数字是{{count}}-->
    <!-- <mytil name="首页"> -->
    <mytil>首页</mytil>
    <my-swiper></my-swiper>
    <hot-book></hot-book>
  </div>
</template>

<script>
import title from "../../common/title.vue";
import mySwiper from './swiper.vue'
import hotbook from './hotbook.vue'
export default {
  data() {
    return {
      name: "珠峰"
    };
  },

  computed: {
    count() {
      return this.$store.state.count;
      // 调用vuex中的公用数据
    }
  },

  components: {
    mytil: title,
    'my-swiper':mySwiper,
    "hot-book":hotbook
  },



  methods: {
    add() {
      // 调用mutations中的add函数
      this.$store.commit("add");
    },
    remove() {
      // 调用mutations中的add函数
      this.$store.commit("remove");
    },

    add2() {
      this.$store.dispatch("addFn");
    }
  }
};
</script>

<style lang="less" scoped>
</style>