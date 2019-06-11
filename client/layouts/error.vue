<template>
  <div class="error-index common-wrapper ">
    <div class="error-content clearfix">
      <div class="col-md-6 text-center">
        <img class="inline" :class="[`img-${error.statusCode}`]" :src="`/images/${error.statusCode || 500}.png`" alt="">
        <!--<img class="inline img-502" :src="`/images/502.png`" alt="">-->
      </div>
      <div class="col-md-6 error-text">
        <p>{{errorText.tip}}</p>
        <div class="mb-10">
          {{errorText.title}}
          <p class="fs-20">
            {{errorText.desc}}
          </p>
        </div>
        <global-button class="pl-40 pr-40 pt-10 pb-10" type="btn-theme-color" @click="openPage({path:'/'})">返回首页
        </global-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'error',
    props: ['error'],
    computed: {
      errorText () {
        let returnData = {}
        switch (this.error.statusCode) {
          case 500 : {
            returnData = {
              tip: 'Sorry~',
              title: '内部服务器错误！',
              desc: '正在维修中......'
            }
            break
          }
          case 502 : {
            returnData = {
              tip: 'Emmm...',
              title: '诶呀，网页走丢了！',
              desc: '刷新一下试试，或者点击下方返回首页'
            }
            break
          }
          default : {
            returnData = {
              tip: 'Oppps!',
              title: '对不起，遇到了点麻烦！',
              desc: '您要访问的页面......在火星.......'
            }
            break
          }
        }
        return returnData
      }
    },
    mounted () {
      this.$store.commit('SET_HEADER_ACTIVE', true)
    }
  }
</script>

<style scoped lang="less">
  @import "../assets/less/variables/index";

  .error-index {
    .error-content {
      margin: 40px 0 60px;
      background: #fff;
      height: 600px;
      padding: 180px;
      .img-502{
        width:150px;
        margin-top: -40px;
      }
      .error-text {
        padding-left: 60px;
        padding-top: 25px;
        font-size: 30px;
        color: #4c4c4c;
        line-height: 45px;
      }
    }
  }
</style>
