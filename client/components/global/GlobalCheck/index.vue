<template>
  <div
    class="global-check"
    @click="currentVal=!currentVal"
    :class="{active:currentVal}"
  >
    <span class="check-icon" :style="{width:size,height:size}"></span>
    <div :class="[className]">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GlobalCheck',
    props: {
      value: {
        type: Boolean,
        default: false
      },
      size: {
        type: String,
        default: '18px'
      },
      className: {
        type: String,
        default: 'ml-30'
      }
    },
    data () {
      return {
        currentVal: this.value
      }
    },
    watch: {
      value (val) {
        this.currentVal = val
      },
      currentVal (val) {
        this.$emit('input', val)
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../../assets/less/variables/index";

  .global-check {
    cursor: pointer;
    position: relative;
    .check-icon {
      display: inline-block;
      width: 18px;
      height: 18px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(204, 204, 204, 1);
      position: absolute;
      left: 0;
      top: 2px;
      &:after {
        content: '';
        position: absolute;
        display: none;
        top: 50%;
        left: 50%;
        width: 9px;
        height: 5px;
        margin: -3.5px 0 0 -4.5px;
        border: 1px solid transparent;
        border-color: transparent transparent @theme-color @theme-color;
        transform: rotate(-45deg);
      }
    }
    &.active {
      color: @theme-color;
      .check-icon {
        border-color: @theme-color;
        &:after {
          display: block;
        }
      }
    }
  }
</style>
