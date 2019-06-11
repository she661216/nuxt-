<template>
  <div class="page-no-data-index">
    <div class="error-content clearfix">
      <div class="col-md-6 text-center">
        <img class="inline" style="margin-top: -18px" :src="errorText.img" alt="">
      </div>
      <div class="col-md-6 error-text">
        <p>{{errorText.tip}}</p>
        <div class="mb-10">
          {{errorText.title}}
          <p class="fs-20">
            {{errorText.desc}}
          </p>
        </div>
        <global-button
          class="pl-40 pr-40 pt-10 pb-10"
          type="btn-theme-color"
          @click="openPage({path:$route.fullPath})">
          刷新页面
        </global-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PageNoData',
    props: {
      errorText: {
        type: Object,
        default () {
          return {
            tip: '暂无数据',
            title: '点击刷新页面试一试~',
            desc: '',
            img: '/images/no-data.png'
          }
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../../assets/less/variables/index";

  .page-no-data-index {
    width: 100%;
    .error-content {
      margin: 40px auto 60px;
      background: #fff;
      /*width:700px;*/
      .error-text {
        padding-left: 60px;
        padding-top: 25px;
        font-size: 25px;
        color: #4c4c4c;
        line-height: 45px;
      }
    }
  }
</style>
