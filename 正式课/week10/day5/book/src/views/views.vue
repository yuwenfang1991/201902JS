<template>
  <div class="views">
    <router-view></router-view>
    <div class="nav">
      <router-link to="/home">
        <div class="iconfont icon-home"></div>
        <div>首页</div>
      </router-link>
      <router-link to="/list">
        <div class="iconfont icon-list"></div>
        <div>列表页</div>
      </router-link>
      <router-link to="/collect">
        <div class="iconfont icon-unie601"></div>
        <div>收藏页</div>
      </router-link>
      <router-link to="/add">
        <div class="iconfont icon-icon-test"></div>
        <div>添加页</div>
      </router-link>
      <router-link to="/login">
        <div class="iconfont icon-yonghu"></div>
        <div>登陆页</div>
      </router-link>
    </div>
  </div>
</template>

 
<style lang="less" scoped>
//scoped 有该行内属性的style 那么其中的样式只对当前组件起作用
.nav {
  position: fixed;
  bottom: 0;
  background: #fff;
  left: 0;
  width: 100%;
  height: 1rem;
  font-size: 0.4rem;
  display: flex;
  align-items: center;
  box-shadow: 0px -0.02rem 0.1rem 0px #ccc;
}

a {
  flex: 1;
  text-align: center;
  &.current {
    color: #42b983;
  }
}

.iconfont {
  font-size: 0.5rem;
}
</style>
