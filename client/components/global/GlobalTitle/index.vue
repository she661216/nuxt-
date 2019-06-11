<template>
  <div class="common-title relative" :class="[`common-title_${type}`]">
    <h6 class="inline">{{ title }} <span>{{ subTitle }}</span></h6>
    <slot/>
  </div>
</template>

<script>
  export default {
    name: 'CommonTitle',
    props: {
      title: {
        type: String,
        default: 'title'
      },
      subTitle: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'default'
      }
    }
  }
</script>

<style lang="less">
  @import "../../../assets/less/variables/index";

  .common-title {
    margin-bottom: 30px;
    &.common-title_default {
      text-align: center;
      margin-bottom: 40px;
      h6 {
        color: #333;
        font-weight: bold;
        font-size: 40px;
      }
    }
    &.common-title_small {
      margin-bottom: 40px;
      h6 {
        font-size: 24px;
        color: rgba(51, 51, 51, 1);
      }
    }
    &.common-title_bar {
      &.common-title_small {
        margin-bottom: 15px;
        h6 {
          font-size: 16px;
          padding-left: 10px;
          &:after {
            width: 4px;
            height: 15px;
            border-radius: 15px;
          }
        }
      }
      h6 {
        font-size: 30px;
        color: #333;
        //font-weight: normal;
        background: transparent;
        padding-left: 30px;
        position: relative;
        &:after {
          content: '';
          display: block;
          position: absolute;
          top: 50%;
          left: 0;
          width: 8px;
          height: 30px;
          transform: translateY(-50%);
          border-radius: 5px;
          background: @theme-color;
        }
        span {
          color: #999999;
          font-weight: normal;
          font-size: 16px;
          -webkit-text-fill-color: #999999;
        }
      }
    }
  }

</style>
