<template>
  <div>
    <div class="list">
      <img :src="item.img" alt>
      <p>{{item.title}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"]
};
</script>

<style lang="less" scoped>
.list {
  float: left;
  width: 50%;
  img {
    width: 100%;
  }
  text-align: center;
  font-size: 0.4rem;
}
</style>