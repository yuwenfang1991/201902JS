<template>
  <div class="hot_book_box">
    <h2>热门图书</h2>
    <div class="list_box">
        <list v-for="(item, index) in homeList" :key="index" :item="item"></list>
    </div>
  </div>
</template>

<script>
import list from './list.vue'
export default {
    data() {
        return {
            homeList:[]
        }
    },
    components:{
        list
    },

    created() {
        // 触发获取列表数据 函数
        let p = this.$store.dispatch('getHomeList');
        p.then(data=> {
            this.homeList = data.data;
            
        })
    },
};
</script>

<style lang="less" scoped>
.hot_book_box {
  position: relative;
  top: 1rem;
  h2 {
    color: sandybrown;
    font-size: 0.5rem;
    padding: 0.2rem;
  }
  padding-bottom: 1rem;
}

.list_box {
  width: 100%;
  overflow: hidden;
}
</style>