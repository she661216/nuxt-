<template>
  <div class="point-area" :style="{top,bottom,left,right,width:pointNum*20 + 'px',height:pointNum*20 + 'px'}">
    <span class="inline point-dot absoluteCC"></span>
    <span class="point" v-for="i in pointNum" :key="i" :style="{'animation-delay':`${500*i}ms`}"></span>
  </div>
</template>

<script>
  export default {
    name: 'Point',
    props: {
      pointNum: {
        type: Number,
        default: 4
      },
      top: {
        type: String,
        default: 'auto'
      },
      bottom: {
        type: String,
        default: 'auto'
      },
      left: {
        type: String,
        default: 'auto'
      },
      right: {
        type: String,
        default: 'auto'
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../../assets/less/variables/index";

  .point-area {
    position: absolute;
    width: 80px;
    height: 80px;
    visibility: visible;
    opacity: 1;
    .point-dot {
      width: 10px;
      height: 10px;
      border-radius: 100%;
      background: @theme-color;
    }
    .point {
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 50%;
      border: 2px solid @theme-color;
      opacity: 0;
      animation: ripple 4500ms ease-out 225ms infinite;

    }
  }

  @keyframes ripple {
    0% {
      opacity: 0;
      -webkit-transform: scale(0.1, 0.1);
      -moz-transform: scale(0.1, 0.1);
      -ms-transform: scale(0.1, 0.1);
      transform: scale(0.1, 0.1);
    }
    5% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      -webkit-transform: scale(1);
      -moz-transform: scale(1);
      -ms-transform: scale(1);
      transform: scale(1);
      border-width: 1.5px;
    }
  }
</style>
