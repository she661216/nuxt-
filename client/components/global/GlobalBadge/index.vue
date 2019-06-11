<template>
  <div class="global-badge" :class="{'show-count':count>0}" :style="{top,right,left,bottom}">
    <span class="absoluteCC">{{count>0?count:''}}</span>
  </div>
</template>

<script>
  export default {
    name: 'GlobalBadge',
    props: {
      count: {
        type: Number,
        default: 0
      },
      top: {
        type: String,
        default: 'auto'
      },
      right: {
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
      }
    }
  }
</script>

<style lang="less">
  @import "../../../assets/less/variables/index";

  .global-badge {
    position: absolute;
    @L: 8px;
    display: block;
    top: 0px;
    right: 0px;
    width: @L;
    height: @L;
    background: @color-red;
    border-radius: 100%;
    /*border: 2px solid #fff;*/
    color: #fff;
    font-size: 10px;
    transform: scale(1);
    &.show-count {
      @L: 18px;
      width: @L;
      height: @L;
      /*padding: 0 4px;*/
      span {
        display: block;
        font-size: 12px;
        transform: translate3d(-50%, -50%, 0) scale(1);
        transform-origin: center;
      }
    }
  }

</style>
