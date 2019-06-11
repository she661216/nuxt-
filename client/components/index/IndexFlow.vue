<template>
  <div class="index-flow" v-if="list && list.length>0">
    <div class="common-wrapper">
      <div class="title">
        <span></span>行业解决方案
        <span></span>
      </div>
      <div class="title-info">感受一品优选多年技术探索与专业决策沉淀</div>
      <div class="text-center">
        <a class="common-btn" href="/solution">查看更多解决方案</a>
      </div>
      <ul class="clearfix">
        <li class="bottom-line"></li>
        <li
          class="flow-item col-xs-2"
          v-for="(item,index) in list"
          :key="index"
          @click="activeIndex=index"
          :class="{active:activeIndex===index}"
        >
          <span class="mt-20 inline">{{item.title}}</span>
        </li>
      </ul>
    </div>

    <div class="flow-content relative">
      <div class="absolute-left">
        <img :src="list[activeIndex].face_pic_left" alt>
      </div>
      <div class="absolute-right">
        <img :src="list[activeIndex].face_pic_right" alt>
        <div class="relative" style="z-index: 1">
          <h6 class="flow-content__title">{{list[activeIndex].title}}</h6>
          <div class="content" v-html="list[activeIndex].desc"></div>
          <a
            class="common-btn"
            v-if="contactUs && contactUs.zx"
            :href="`http://wpa.qq.com/msgrd?v=3&uin=${contactUs.zx[Math.floor(Math.random()*contactUs.zx.length)].qq}&site=qq&menu=yes`"
            target="_blank"
          >点击咨询</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
export default {
  name: "IndexFlow",
  props: ["list"],
  data() {
    return {
      activeIndex: 0
    };
  },
  computed: {
    ...mapState({
      contactUs: state => state.common.contactUs
    })
  }
};
</script>

<style scoped lang="less">
@import "../../assets/less/variables/index";

.index-flow {
  padding-top: 60px;
  background: #fff;
  overflow: hidden;
  .title {
    font-size: 44px;
    margin: 0 auto;
    color: #333;
    font-weight: 700;
    width: 640px;
    span {
      display: inline-block;
      background-color: #ddd;
      width: 158px;
      height: 1px;
      margin-bottom: 10px;
      margin-left: 10px;
      margin-right: 10px;
    }
  }
  .title-info {
    color: #666;
    font-size: 20px;
    width: 380px;
    margin: 0 auto;
    margin-top: 15px;
  }
  .common-btn {
    display: inline-block;
    border-radius: 0;
    padding: 12px 26px;
    color: #fff;
    font-size: 16px;
    line-height: 1em;
    border: none;
    margin: 30px 0;
    background: #4267b5;
  }
  ul {
    position: relative;
    .bottom-line {
      position: absolute;
      width: 1920px;
      height: 1px;
      background: #98b5ff;
      bottom: 0px;
      left: -322px;
    }
    .flow-item {
      text-align: center;
      color: #333;
      font-size: 24px;
      cursor: pointer;
      position: relative;
      &.active {
        .inline {
          color: @theme-color;
          font-weight: 700;
          font-size: 24px;
          border-bottom: 5px solid @theme-color;
        }
        &:after {
          opacity: 1;
        }
      }
      // &:after {
      //   display: block;
      //   content: "";
      //   width: 0;
      //   height: 0;
      //   position: absolute;
      //   bottom: -31px;
      //   left: 50%;
      //   transform: translate3d(-50%, 0%, 0);
      //   border: 15px solid transparent;
      //   border-bottom-color: #2f3445;
      //   border-bottom-color: rgba(6, 9, 24, 0.8);
      //   border-bottom-color: rgba(0, 0, 0, 0.85);
      //   /*transition: all .1s;*/
      //   opacity: 0;
      // }
      .icon-box {
        width: 120px;
        height: 80px;
        margin: 0 auto;
        text-align: center;
        img {
          display: inline-block;
        }
      }
      .inline {
        color: #333;
        font-size: 18px;

        padding-bottom: 8px;
      }
    }
  }

  .flow-content {
    height: 510px;
    margin-top: 50px;
    /*background: url("../../assets/images/index_flow_bg.png") no-repeat center;*/
    /*background-size: 100%;*/
    color: #fff;
    .flow-content__title {
      font-size: 32px;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      line-height: 25px;
      margin-bottom: 50px;
    }
    .content {
      width: 1000px;
      font-size: 22px;
      margin-bottom: 30px;
      color: rgba(255, 255, 255, 1);
      line-height: 25px;
      overflow: hidden;
    }
    .common-btn {
      background: #fff;
      color: @theme-color;
      padding: 12px 46px;
    }
  }

  .absolute-right {
    width: 65%;
    height: 410px;
    vertical-align: middle;
    float: left;
    position: relative;
    margin-top: 25px;
    img {
      width: 100%;
      height: 100%;
    }
    .relative {
      position: absolute;
      top: 60px;
      left: 70px;
    }
  }
  .absolute-left {
    width: 35%;
    height: 460px;
    vertical-align: middle;
    float: left;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
