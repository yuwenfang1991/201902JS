<template>
  <div class="item-box">
    <div class="img-box">
      <img :src="item.bookCover" alt>
    </div>
    <div class="content-box">
      <h2 class="title">{{item.bookName}}</h2>
      <p class="desc">{{item.bookInfo}}</p>
      <div class="price-box">{{item.bookPrice|money}}</div>
      <div class="btn-box">
        <!-- 点击删除按钮 把该条数据从vuex中删除 -->
        <button class="del" @click="remove">删除</button>
        <button class="collect" @click="collect" v-if="isShowCollect">收藏</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  //   props: ["item"],
  props: {
    item: {
      default() {
        return {};
      }
    },
    isShowCollect: {
      default: true
    }
  },

  methods: {
    remove() {
      // 改变vuex中的数据只能通过mutations中的函数去改变
      // 触发mutations中的函数 用commit
      // 触发actions中的函数 用dispatch
      //   this.$store.commit("removeList", this.item);
      this.$emit('mydel',this.item);
    },

    // 向收藏列表添加数据
    collect() {
      this.$store.commit("addCollect", this.item);
    }
  }
};
</script>

<style lang="less" scoped>
.item-box {
  display: flex;
  .img-box {
    width: 2.5rem;
    img {
      width: 100%;
    }
  }
  .content-box {
    flex: 1;
    .title {
      font-size: 0.4rem;
    }
    .desc {
      font-size: 0.29rem;
      color: rgb(173, 173, 173);
    }

    .price-box {
      color: red;
      font-size: 0.3rem;
    }

    .btn-box {
      display: flex;
      justify-content: space-around;
      button {
        width: 1.2rem;
      }
    }
  }
}
</style>