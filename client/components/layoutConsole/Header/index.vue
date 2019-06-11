<template>
  <div class="nav-wrapper active">
    <a
      href="/"
      class="logo l middle-box"
    >
      <img
        class="middle"
        src="~static/images/console/console_logo.png?ver=90"
      >
    </a>
    <div class="r middle-box height-100" style="width:600px;text-align: right;">
      <head-search/>
      <global-button class="middle mr-10 ml-10" type="btn-warning">
        <nuxt-link to="/service/issue">我要做项目</nuxt-link>        
      </global-button >

 
 <nuxt-link  v-if='userInfo.user_type !=2 ' class="middle mr-10 ml-10  be-to"  to="/enter/result">成为优+团队</nuxt-link>        
     
 
    <head-user  is-console/>

    </div>
    <div class=" height-100">
      <ul class="nav-ul">
        <li
          v-for="(item,index) in header"
          :key="index"
          class="nav-item"
        >
          <div class="nav-item-link">
            <a :href="item.link">{{ item.title }}</a>
            <!--<img-->
            <!--class="middle icon-arrow"-->
            <!--src="http://img12.epbiaoju.cn/Template/pc/epbiao/Static/new_images/icon-arrow-small.png"-->
            <!--alt=""-->
            <!--&gt;-->
          </div>
          <!--<div class="sub-nav-wrapper">-->
          <!--<div class="common-wrapper">-->
          <!--<div class="sub-nav-box">-->
          <!--<div class="sub-nav-item">-->
          <!--<a-->
          <!--v-for="i in 10"-->
          <!--:key="i"-->
          <!--class="row1"-->
          <!--href=""-->
          <!--&gt;移动应用专场</a>-->
          <!--</div>-->
          <!--</div>-->
          <!--</div>-->
          <!--</div>-->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import HeadUser from '../../../components/common/HeadUser'
  import HeadSearch from '../../../components/common/HeadSearch'

  export default {
    name: 'CommonHeader',
    components: {
      HeadUser,
      HeadSearch
    },
    data () {
      return {
        header: [
          {
            title: '管理控制台',
            link: '/console'
          }
        ]
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../../assets/less/variables/index";

  .nav-wrapper {
    @time: .3s;
    @h: 80px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: @h;
    padding: 0 40px 0 0;
    /*background: #060918;*/
    background: transparent;
    z-index: 10001;
        min-width: 750px;
    > .common-wrapper {
      height: 100%;
      position: initial;
    }
    &.active {
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
    .be-to{
      border: 1px solid #ffea02;
    padding: 6px;
    color: #ffea02;
    border-radius: 4px;
    }
    .logo {
      height: 100%;
      width: 60px;
      text-align: center;
      img {
        width: 30px;
      }
    }
    .nav-ul {
      height: 100%;
      .nav-item {
        height: 100%;
        float: left;
        padding: 0 10px;
        font-size: 18px;
        cursor: pointer;
        &.line-l {
          padding-right: 15px;
        }
        &:nth-child(2) {
          padding-left: 15px;
        }
        &.active {
          .nav-item-link {
            color: #dc3200;

          }
        }
        &:hover {
          .nav-item-link {
        
            color: #dc3200;
            &.has-link {
              &:after {
                opacity: 1;
              }
              .sub-nav-wrapper {
                transform: scaleY(1);
                opacity: 1;
                z-index: 1;
                width: 100%;
                height: auto;
                overflow: inherit;
                display: block;
              }
            }
          }
          .icon-arrow {
            transform: rotate(-180deg);
          }
        }

        .nav-item-link {
          height: 100%;
          color: #fff;
          line-height: @h;
          position: relative;
          &:after {
            display: block;
            content: '';
            width: 0;
            height: 0;
            position: absolute;
            bottom: -1px;
            left: 30%;
            transform: translate3d(-50%, 0%, 0);
            border: 10px solid transparent;
            border-bottom-color: #fff;
            transition: all .1s;
            opacity: 0;
          }
          > a {
            color: #fff;
          }
        }
        .icon-arrow {
          transition: all .3s;
          margin-left: 5px;
        }
        .sub-nav-wrapper {
          position: absolute;
          top: 100%;
          left: 0;
          transition: opacity @time;
          transition: opacity 0.4s ease-in-out;
          transform-origin: top center;
          opacity: 0;
          width: 0;
          height: 0;
          overflow: hidden;
          display: none;
          .common-wrapper {
            background: #fff;
            padding: 60px 40px 40px 60px;
            /*box-shadow: 0 1px 5px #666;*/
          }
          .sub-nav-box {
            .sub-nav-item {
              h6 {
                //font-weight: bold;
                font-size: 16px;
              }
              a {
                display: inline-block;
                padding: 10px 20px;
                margin: 0 20px 20px 0;
                background: rgba(230, 230, 230, 1);
                font-size: 16px;
                color: #333;
                &:hover {
                  color: #dc3200;
                }
              }
            }
          }
        }
      }
    }
  }

</style>
