<template>
  <div>
    <mytil>列表页</mytil>
    <!-- list 代表的是 后台返回的数据 -->
    <div class="list-box">
      <item v-for="(item) in list" :key="item.bookId" :item="item" @mydel='fn'></item>
    </div>
  </div>
</template>

<script>
import title from "../../common/title.vue";
import item from "./item.vue";
export default {
  components: {
    mytil: title,
    item
  },

  methods: {
    fn(item) {
      this.$store.commit('removeList',item);
    }
  },
  created() {
    // 触发actions中的getList函数
    // 去请求list页中的数据
    // 这个请求需要一个判断 请求过之后就不用再请求了
    if(this.$store.state.isGetList) return;
    this.$store.dispatch("getList");
  },

  computed: {
    // 使用计算属性 去使用state中的listData
    list() {
      return this.$store.state.listData;
    }
  }
};
</script>

<style lang="less" scoped>
.list-box {
  margin: 1.2rem 0;
}
</style>