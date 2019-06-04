<template>
  <div class="swiper_box">
    <!-- {{list}} -->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="(item, index) in list"
          :key="index"
          :style="`background-image:url(${item.img})`"
        ></div>
        <!-- <div
          class="swiper-slide"
          style="background-image:url(https://www.swiper.com.cn/demo/img/nature2.jpg)"
        ></div>
        <div
          class="swiper-slide"
          style="background-image:url(https://www.swiper.com.cn/demo/img/nature3.jpg)"
        ></div>
        <div
          class="swiper-slide"
          style="background-image:url(https://www.swiper.com.cn/demo/img/nature4.jpg)"
        ></div>
        <div
          class="swiper-slide"
          style="background-image:url(https://www.swiper.com.cn/demo/img/nature5.jpg)"
        ></div>-->
      </div>
      <!-- Add Pagination -->
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  created() {
    if (this.list.length) return; // 若vuex中的bannerList有数据 说明已经请求过了 不用再去请求了
    this.$store.dispatch("getBanner");
  },
  mounted() {
    // 在mounted执行时 this.list还是一个空数组
    // 这时的页面上没有任何 swiper-slide 此时初始化 swiper
    // 没有我们想要的效果
    this.init();
  },

  methods: {
    init() {
    //  初始化轮播图
      new Swiper(".swiper-container", {
        loop: true,
        effect: "cube",
        grabCursor: true,
        cubeEffect: {
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94
        },
        pagination: {
          el: ".swiper-pagination"
        }
      });
    }
  },
  updated() {
    // 可以new 的前提是 页面上已经有了 各个轮播图
    this.init();
  },
  // 组件中使用vuex数据 基本都是使用computed
  computed: {
    list() {
      return this.$store.state.bannerList;
    }
  }
};
</script>

<style lang="less" scoped>
.swiper_box {
  position: relative;
  background: #ccc;
  height: 6rem;
  top: 1rem;
  overflow: hidden;
}
.swiper-container {
  width: 6rem;
  height: 6rem;
  position: absolute;
  left: 50%;
  margin-left: -150px;
}
.swiper-slide {
  background-position: center;
  background-size: cover;
}
</style>