<template>
  <div class="page-common-top">
    <div class="page-top">
      <div class="nav-wrapper h40 logo-icon" :class="{active:headActive}">
        <a  href="javascript:void (0)" class="logo l middle-box" style="cursor: default;">
          <img class="middle img-icon" src="~static/images/logo-icon.png?ver=90"> 智汇一品集团旗下 - 新型创意托付自营服务平台
        </a>
        <div class="common-wrapper height-40">
          <ul class="nav-ul middle f-r">
            <li class="nav-item" v-if="!userInfo.uid">
              <div class="nav-item-link">
                <a href="/user/login">请登录</a>
              </div>
            </li>
            <li class="nav-item" v-if="!userInfo.uid">
              <div class="nav-item-link">
                <a href="/user/register">免费注册</a>
              </div>
            </li>

            <li class="nav-item" v-if="userInfo.uid">
              <div class="nav-item-link">
                您好,              
              <a  href="/console/account" class="name">{{userInfo.username}}</a>用户, 
                <a style="color:#333" href="/console/message-list/1" class="name">您有<span style="color:#4267b5">{{userInfo.no_read_msg_count}}</span>条新消息</a>
              </div>
            </li>

            <li class="nav-item">
              <div class="nav-item-link">
                <a href="http://www.epwk.com" target="_blank">集团首页</a>
              </div>
            </li>
            <!-- <li class="nav-item">
              <div class="nav-item-link line">|</div>
            </li>-->
            <!-- <li class="nav-item has-sub-link"> -->
            <!--<div class="nav-item-link">-->
            <!--<a href="javascript:void (0)">集团导航</a>-->
            <!--<img-->
            <!--class="middle icon-arrow"-->
            <!--src="http://img12.epbiaoju.cn/Template/pc/epbiao/Static/new_images/icon-arrow-small.png"-->
            <!--alt-->
            <!--&gt;-->
            <!--</div>-->
            <!-- <div class="sub-nav-wrapper" v-if="shemeMenu.length>10">
                <div class="common-wrapper">
                  <div class="sub-nav-box">
                    <div class="sub-nav-item">
                      <a
                        v-for="(item,index) in shemeMenu"
                        :key="index"
                        class="row1"
                        :href="item.url"
                        target="_blank"
                      >{{item.title}}</a>
                    </div>
                  </div>
                </div>
            </div>-->
            <!-- </li> -->
            <li class="nav-item">
              <div class=" phone-number">
                <img class="middle icon-arrow" src="~static/images/logo-icon-number.png?ver=90" alt>
                <a href="javascript:void (0)" target="_blank" >0592-3793181</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="page-nav">
      <div class="nav-wrapper .nav-wrapper-hover" :class="{active:headActive}">
        <a href="/" class="logo l middle-box">
          <img class="middle" src="~static/images/logo.png?ver=90">
        </a>
        <div class="r height-100 middle-box nav-btn" :class="{'r-box':userInfo.uid}">
          <a
            href="/service/issue"
            class="white-color"
          >我要开发项目</a>

          <nuxt-link
            class="white-color"
            :to="userInfo.uid?userInfo.user_type == 2?'/console':'/enter/result':'/user/login?from=application'"
          >我要入驻优选</nuxt-link>          
       
        </div>
        <div class="common-wrapper height-100">
          <ul class="nav-ul middle">
            <li class="nav-item" :class="{active:$route.name=='index'}">
              <div class="nav-item-link">
                <a href="/">首页</a>
                <img
                  class="middle icon-arrow"
                  src="http://img12.epbiaoju.cn/Template/pc/epbiao/Static/new_images/icon-arrow-small.png"
                  alt
                >
              </div>
            </li>

            <li class="nav-item has-sub-link" :class="{active:$route.name=='solution'}">
              <div class="nav-item-link">
                <a href="/solution">解决方案</a>
              </div>
            </li>

            <li class="nav-item has-sub-link" :class="{active:$route.name=='project-center'}">
              <div class="nav-item-link">
                <a href="/project-center">项目中心</a>
              </div>
            </li>

            <li class="nav-item has-sub-link" :class="{active:$route.name=='togetherWorks-page'}">
              <div class="nav-item-link">
                <a href="/togetherWorks">优选专家</a>
              </div>
            </li>
            <!--<li v-if="shemeMenu.length>0" class="nav-item has-sub-link">-->
            <!--<div class="nav-item-link">-->
            <!--<a href="javascript:void (0)">解决方案</a>-->
            <!--<img-->
            <!--class="middle icon-arrow"-->
            <!--src="http://img12.epbiaoju.cn/Template/pc/epbiao/Static/new_images/icon-arrow-small.png"-->
            <!--alt-->
            <!--&gt;-->
            <!--</div>-->
            <!--<div class="sub-nav-wrapper" v-if="shemeMenu.length>0">-->
            <!--<div class="common-wrapper">-->
            <!--<div class="sub-nav-box">-->
            <!--<div class="sub-nav-item">-->
            <!--<a-->
            <!--v-for="(item,index) in shemeMenu"-->
            <!--:key="index"-->
            <!--class="row1"-->
            <!--:href="item.url"-->
            <!--target="_blank"-->
            <!--&gt;{{item.title}}</a>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
            <!--</li>-->
            <!--<li-->
            <!--v-if="talentMenu.length>0"-->
            <!--class="nav-item has-sub-link "-->
            <!--:class="{active:$route.name==='service-hot-service-id'}"-->
            <!--&gt;-->
            <!--<div class="nav-item-link">-->
            <!--<nuxt-link to="/togetherWorks">优选人才</nuxt-link>-->
            <!--<img-->
            <!--class="middle icon-arrow"-->
            <!--src="http://img12.epbiaoju.cn/Template/pc/epbiao/Static/new_images/icon-arrow-small.png"-->
            <!--alt-->
            <!--&gt;-->
            <!--</div>-->
            <!--<div class="sub-nav-wrapper" v-if="talentMenu.length>0">-->
            <!--<div class="common-wrapper">-->
            <!--<div class="sub-nav-box">-->
            <!--<div class="sub-nav-item">-->
            <!--<a-->
            <!--class="row1"-->
            <!--v-for="(item,index) in talentMenu"-->
            <!--:key="index"-->
            <!--:href="'/togetherWorks?p_id='+item.id"-->
            <!--&gt;{{item.cate_name}}</a>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
            <!--</li>-->
            <!--<li class="nav-item" :class="$route.name.indexOf('togetherWorks3')>=0?'active':''">-->
            <!--<div class="nav-item-link">-->
            <!--<a href="/togetherWorks">任务中心</a>-->
            <!--<img-->
            <!--class="middle icon-arrow"-->
            <!--src="http://img12.epbiaoju.cn/Template/pc/epbiao/Static/new_images/icon-arrow-small.png"-->
            <!--alt-->
            <!--&gt;-->
            <!--</div>-->
            <!--</li>-->
            <!--<li class="nav-item" :class="{active:$route.name==='abou1'}">-->
            <!--<div class="nav-item-link">-->
            <!--<nuxt-link to="/about">成功案例</nuxt-link>-->
            <!--<img-->
            <!--class="middle icon-arrow"-->
            <!--src="http://img12.epbiaoju.cn/Template/pc/epbiao/Static/new_images/icon-arrow-small.png"-->
            <!--alt-->
            <!--&gt;-->
            <!--</div>-->
            <!--</li>-->
            <!--<li class="nav-item" :class="{active:$route.name==='about4'}">-->
            <!--<div class="nav-item-link">-->
            <!--<nuxt-link to="/about">专业知识</nuxt-link>-->
            <!--<img-->
            <!--class="middle icon-arrow"-->
            <!--src="http://img12.epbiaoju.cn/Template/pc/epbiao/Static/new_images/icon-arrow-small.png"-->
            <!--alt-->
            <!--&gt;-->
            <!--</div>-->
            <!--</li>-->
            <li class="nav-item" :class="{active:$route.name==='about'}">
              <div class="nav-item-link">
                <nuxt-link to="/about">关于我们</nuxt-link>
                <img
                  class="middle icon-arrow"
                  src="http://img12.epbiaoju.cn/Template/pc/epbiao/Static/new_images/icon-arrow-small.png"
                  alt
                >
              </div>
            </li>
          </ul>
          <!-- <head-search class="ml-20"/> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState,mapMutations } from "vuex";
import HeadUser from "../../../components/common/HeadUser";
import HeadSearch from "../../../components/common/HeadSearch";
import {
  getLocalStore,
  setLocalStore,
  removeLocalStore
} from "../../../utils/storeUtils";
import { apiGetUserInfo } from "../../../api/nodeApi";

export default {
  name: "CommonHeader",
  components: {
    HeadUser,
    HeadSearch
  },
  data() {
    return {
      header: [
        {
          title: "最新活动",
          link: "",
          subMenu: []
        },
        {
          title: "热门服务",
          link: "/service/hot-service/-1",
          subMenu: []
        },
        {
          title: "解决方案",
          link: "",
          subMenu: []
        },
        {
          title: "平台介绍",
          link: "/about",
          subMenu: []
        }
      ]
    };
  },
  computed: {
    ...mapState({
      headActive: state => state.common.headActive,
      newsMenu: state => state.common.newsMenu,
      hotMenu: state => state.common.hotMenu,
      shemeMenu: state => state.common.shemeMenu,
      talentMenu: state => state.common.talentMenu
    })
  },

  methods: {
    ...mapMutations(["SET_USER"]),
    async getUserInfo() {
      let user_info = await apiGetUserInfo({}, false); //登录之后，实时获取用户信息
      if (user_info.code == 200) {
        this.SET_USER(
          Object.assign(
            { jwt: getLocalStore("Authorization") },
            user_info.data.list
          )
        );
        setLocalStore("AuthUserInfo", JSON.stringify(user_info.data.list));
      }
    }
  },

  mounted() {
    if (getLocalStore("Authorization")) {
      this.SET_USER(
        Object.assign(
          { jwt: getLocalStore("Authorization") },
          JSON.parse(getLocalStore("AuthUserInfo"))
        )
      );
      this.getUserInfo();
    } else {
      removeLocalStore("Authorization");
      removeLocalStore("AuthUserInfo");
      this.SET_USER(null)
    }
  }
};
</script>

<style scoped lang="less">
@import "../../../assets/less/variables/index";

.btn-theme .common-color {
  color: #fff !important;
}
.page-top,
.page-nav {
  .nav-wrapper {
    @time: 0.3s;
    @h: 80px;
    position: relative;
    top: 0;
    left: 0;
    width: 1260px;
    height: @h;
    margin: 0 auto;
    background: transparent;
    z-index: 999;
    > .common-wrapper {
      height: 100%;
      position: initial;
    }

    .f-r {
      float: right;
    }

    .nav-wrapper-hover.active,
    .nav-wrapper-hover:hover {
      background: #4267b5;
      background: rgba(6, 9, 24, 0.85);
      .nav-ul {
        height: 100%;
        .nav-item {
          color: #fff;
          > a,
          > span {
            color: #fff;
          }
        }
      }
    }
    .nav-ul .nav-item-link a:hover {
      color: #4267b5 !important;
    }
    .logo {
      height: 100%;
      img {
        width: 169px;
        height: 48px;
        margin-right: 25px;
      }
      .img-icon {
        width: 36px;
        height: 12px;
        margin-right: 0;
      }
    }
    // .r-box {
    //   width: 275px;
    // }
    .nav-ul {
      height: 100%;
      .nav-item {
        height: 100%;
        float: left;
        padding: 0 8px;
        font-size: 18px;
        &.line-l {
          padding-right: 15px;
        }

        &.active {
          .nav-item-link {
            color: #4267b5;
            > a {
              color: @theme-color;
            }
          }
        }
        &:hover {
          .nav-item-link {
            > a {
              color: @theme-color;
            }
            color: #4267b5;
          }
        }
        &.has-sub-link {
          .icon-arrow {
            display: inline-block;
          }
          &:hover {
            .nav-item-link {
              > a {
                color: @theme-color;
              }
              color: #4267b5;
              &:after {
                opacity: 1;
              }
            }
            .icon-arrow {
              transform: rotate(-180deg);
            }
            .sub-nav-wrapper {
              transform: scaleY(1);
              opacity: 1;
              z-index: 10000;
              width: 100%;
              height: auto;
              overflow: inherit;
              display: block;
            }
          }
        }

        .nav-item-link {
          height: 100%;
          line-height: @h;
          position: relative;
          &:after {
            display: block;
            content: "";
            width: 0;
            height: 0;
            position: absolute;
            bottom: -1px;
            left: 30%;
            transform: translate3d(-50%, 0%, 0);
            border: 10px solid transparent;
            border-bottom-color: #fff;
            transition: all 0.1s;
            opacity: 0;
          }
          > a {
            color: #000;
            font-size: 18px;
            font-weight: 700;
          }
        }
        .icon-arrow {
          transition: all 0.3s;
          margin-left: -2px;
          display: none;
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
            box-shadow: 0 1px 10px #aaa;
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
                  color: #4267b5;
                }
              }
            }
          }
        }
      }
      .nav-item:hover .nav-item-link a {
        color: #4267b5;
      }
    }
  }
  .top40 {
    top: 40px;
  }
  .h40 {
    height: 40px;
  }
}
.page-nav {
  background: #fff;
  .nav-wrapper .nav-ul .nav-item {
    padding: 0 12px;
  }
  .nav-wrapper .nav-ul .nav-item.active {
    border-top: 3px solid #4267b5;

    .nav-item-link {
      line-height: 74px;
      > a {
        color: #4267b5;
      }
    }
  }
  .white-color {
    color: #fff;
  }
  .nav-btn {
    width: 330px;
    height: 40px;
    text-align: right;
    margin-top: 20px;
    background: url("../../../assets/images/nav-btn-img.png");
    a {
      display: inline-block;
      width: 162px;
      height: 40px;
      line-height: 40px;
      text-align: center;
    }
  }
}
.page-top {
  background: #f7f7f7;
  .nav-wrapper {
    z-index: 1000;
    .common-wrapper {
      .nav-item {
        .nav-item-link {
          a {
            font-size: 12px;
            color: #4c4c4c;
          }
        }
      }
    }
  }

  .logo-icon {
    > a {
      color: #4c4c4c;
      font-size: 12px;
    }
    .common-wrapper {
      .nav-item {
        font-size: 12px;
        color: #4c4c4c;
        .nav-item-link {
          line-height: 40px;
          font-size: 12px;
          a {
            color: #4c4c4c;
            font-weight: 500;
          }
          .name {
            color: #4267b5;
          }
        }
        .nav-item-link.line {
          color: #cdc3c3;
        }
        .phone-number {
          color: #010101;
          font-size: 16px;
          font-weight: 700;
          margin-top: 12px;
          a {
            color: #010101;
            font-size: 16px;
            font-weight: 700;
            cursor: default;
          }
          a:hover{
            color:#010101!important
          }
          img {
            width: 18px;
            height: 20px;
            display: inline-block;
          }
        }
      }
    }
  }
}
</style>
