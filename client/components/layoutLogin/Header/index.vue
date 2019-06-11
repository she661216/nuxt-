<template>
  <div class="nav-wrapper">
    <a
      href="/"
      class="logo l middle-box"
    >
      <img
      v-if="$route.name == 'user-action'"
        class="middle"
        src="~static/images/logo-wihte.png?ver=90"
      >
          <img 
          v-else
        class="middle"
        src="~static/images/logo.png?ver=90"
      >
    </a>
    <div class="r height-100 middle-box">
      <nuxt-link class="color-f pd-30 common-hover" to="/">首页</nuxt-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CommonHeader'
  }
</script>

<style scoped lang="less">
  @import "../../../assets/less/variables/index";

  .nav-wrapper {
    @time: .3s;
    @h: 80px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: @h;
    padding: 0 40px;
    /*background: #060918;*/
    background: transparent;
    z-index: 999;
    > .common-wrapper {
      height: 100%;
      position: initial;
    }
    &.nav-bg-f {
      background:@theme-color;
      .nav-ul {
        height: 100%;
        .nav-item {
          color: #fff;
          > a, > span {
            color: #fff;
          }
        }
      }
    }
    .logo {
      height: 100%;
      img {
        width: 150px;
      }
    }
  }

</style>
