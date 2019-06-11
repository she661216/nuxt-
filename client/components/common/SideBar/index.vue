<template>
  <div
    :class="{active:isSidebar}"
    class="side-bar-wrapper"
    v-if="contactUs"
  >
    <div class="absoluteCC width-100" style="z-index: 1">
      <div class="slide-item" v-if="contactUs.zx">
        <div class="icon-box">
          <img src="~/static/images/icon_side_qq.png?ver=90">
        </div>
        <div class="name">在线<br/>咨询</div>
        <div class="content-box link-box">
          <a
            v-for="(item,index) in contactUs.zx"
            class="link-a"
            :key="index"
            :href="`http://wpa.qq.com/msgrd?v=3&uin=${item.qq}&site=qq&menu=yes`"
            target="_blank"
          >
            {{item.name}}
          </a>
        </div>
      </div>
      <div class="slide-item">
        <div class="icon-box">
          <img src="~static/images/icon_side_tel.png?ver=90">
        </div>
        <div class="name">人工<br/>咨询</div>
        <div class="content-box link-box">
          <template v-if="contactUs.sq">
            <p
              v-for="item in contactUs.sq"
              :key="item.id"
            >{{item.name}}：{{item.mobile}}</p>
          </template>
          <template v-if="contactUs.sh">
            <p
              v-for="item in contactUs.sh"
              :key="item.id"
            >{{item.name}}：{{item.mobile}}</p>
          </template>

        </div>
      </div>
      <a
        class="slide-item"
        href="javascript:void (0)"
        @click="SET_FEEDBACK_VISIBLE(true)"
      >
        <div class="icon-box">
          <img
            class="icon-gnsb"
            src="~static/images/icon_side_feedback.png?ver=90"
          >
        </div>
        <div class="name">意见<br>反馈</div>
      </a>
      <nuxt-link
        class="slide-item"
        to="/service/issue"
      >
        <div class="icon-box">
          <img
            class="icon-gnsb"
            src="~static/images/icon_side_project.png?ver=90"
          >
        </div>
        <div class="name">我要做 项目</div>
      </nuxt-link>
    </div>
    <div class="absoluteLB width-100 foot-btn">
      <button
        class="gotop-btn"
        @click="scrollTop(scrollEl,0,true)"
      >
        <img
          class="inline"
          src="http://img10.epbiaoju.cn/Template/pc/epbiao/Static/new_images/icon_side_top.png?ver=90"
        >
      </button>
      <!--<button-->
      <!--class="close-btn"-->
      <!--@click="isSidebar=false"-->
      <!--&gt;-->
      <!--<img-->
      <!--class="inline"-->
      <!--src="http://img13.epbiaoju.cn/Template/pc/epbiao/Static/new_images/icon_side_close.png?ver=90"-->
      <!--&gt;-->
      <!--</button>-->


    </div>
    <button class="arrow" @click="toggleHandle">
      <i :class="[isSidebar ? 'el-icon-arrow-right' : 'el-icon-arrow-left']"></i>
    </button>
    <img class="width-100 height-100" src="/images/sidebar-bg.jpg" alt="">
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import scrollTopMixin from '../../../mixins/scrollTopMixin'
  import {setLocalStore, getLocalStore} from '../../../utils/storeUtils'

  export default {
    name: 'SideBar',
    mixins: [scrollTopMixin],
    computed: {
      ...mapState({
        contactUs: state => state.common.contactUs,
        isSidebar: state => state.common.isSidebar
      }),
      scrollEl () {
        return document.getElementsByTagName('html')[0]
      }
    },
    mounted () {
      this.$route.path !== '/' && this.SET_IS_SIDEBAR(getLocalStore('isSidebar') == 1)
    },
    methods: {
      ...mapMutations(['SET_FEEDBACK_VISIBLE', 'SET_IS_SIDEBAR']),
      toggleHandle () {
        this.SET_IS_SIDEBAR(!this.isSidebar)
      }
    }
  }
</script>

<style lang="less">
  @import "../../../assets/less/variables/index";

  .side-bar-wrapper {
    position: fixed;
    height: 100%;
    width: @sideBarW;
    right: -@sideBarW;
    top: 0;
    /*z-index: 998;*/
    z-index: 10000;
    /*<!--background: linear-gradient(to bottom, @theme-color, #df3d47);-->*/
    transition: right .3s;
    &.active {
      right: 0px;
    }
    .arrow {
      @h: 38px;
      position: absolute;
      top: 50%;
      width: @h;
      height: @h;
      right: @sideBarW - @h/2.5;
      background:@theme-color;
      border-radius: @h 0 0 @h;
      z-index: 0;
      i {
        color: #fff;
        margin-left: -10px;
      }
    }
    .slide-item {
      display: block;
      width: 100%;
      text-align: center;
      font-size: 12px;
      padding: 10px 0;
      position: relative;
      //transition: all .5s;
      &:hover,
      &.active {
        background: #fff;
        .icon-box {
          background: transparent;
          img {
            width: 24px;
            &.icon-gnsb {
              width: 20px;
            }
          }
        }
        .name {
          color: @theme-color;
        }
        .content-box {
          display: block;
        }

      }
      .icon-box {
        background: #fff;
        width: 30px;
        height: 30px;
        margin: 0 auto;
        position: relative;
        border-radius: 100%;
        img {
          width: 20px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate3d(-50%, -50%, 0);
          transition: all .3s;
          &.icon-gnsb {
            width: 15px;
          }
        }
      }
      .name {
        width: 37px;
        margin: 0 auto;
        padding-top: 9px;
        color: #fff;
        line-height: 17px;
        font-size: 12px;
        padding-bottom: 2px;
      }
      .content-box {
        position: absolute;
        top: 0;
        background: #fff;
        transition: opacity .3s;
        right: 100%;
        display: none;
        padding-right: 20px;
        p {
          display: block;
          border-bottom: 1px solid #ededed;
          height: @sideBarW - 2px;
          line-height: @sideBarW - 2px;
          text-align: left;
          font-size: 12px;
          color: #4c4c4c;
          padding: 0 10px;
          min-width: 140px;
          white-space: nowrap;
        }
      }
      .link-a {
        display: block;
        background: url("../../../assets/images/icon_side_qq3.png") no-repeat 19px center;
        border-bottom: 1px solid #ededed;
        width: 100px;
        height: @sideBarW - 2px;
        line-height: @sideBarW - 2px;
        text-align: left;
        text-indent: 47px;
        font-size: 12px;
        color: #4c4c4c;
        &:hover {
          background: url("../../../assets/images/icon_side_qq2.png") no-repeat 19px center;
          color: @theme-color;
        }
        &:last-child {
          border-bottom: none;
        }
      }
    }
    .foot-btn {
      width: 100%;
      button {
        width: 100%;
        padding: 10px 0;
      }
    }
  }
</style>
