<template>
  <div class="menu-index height-100 absoluteLT" :style="{width: !isCollapse ? '200px' : '60px'}">
    <el-scrollbar wrap-class="menu-scroll">
      <div class="menu-switch" @click="changeCollapseHandle">
        <div class="relative height-100">
          <img
            v-if="!isCollapse"
            class="absoluteLC icon-img"
            style="width:20px;"
            src="/images/console/menu-switch-active.png"
          >
          <img
            v-else
            class="absoluteLC icon-img"
            style="width:20px;"
            src="/images/console/menu-switch.png"
          >
        </div>
      </div>
      <div class="menu-item" :class="($route.path === '/console' || $route.name.indexOf('/project-manage/page') >= 0) && !serviceListActive?'active':''">
        <div class="relative height-100 middle-box" @click="go_home">
          <img
            class="icon-img absoluteLC no-select-img"
            style="width:16px;"
            src="/images/console/icon_home.png"
          >
          <img
            class="icon-img absoluteLC select-img"
            style="width:16px;"
            src="/images/console/icon_home_select.png"
          >
          <span class="middle" v-if="!isCollapse">首页</span>
        </div>
      </div>
      <!-- <div class="menu-item" @click="selectServiceHandle" :class="{active:serviceListActive}">
        <div class="relative height-100 middle-box">
          <img
            class="icon-img absoluteLC no-select-img"
            style="width:16px;"
            src="/images/console/icon_menu.png"
          >
          <img
            class="icon-img absoluteLC select-img"
            style="width:16px;"
            src="/images/console/icon_menu_select.png"
          >
          <span class="middle" v-if="!isCollapse">服务菜单</span>
        </div>
      </div> -->
      <el-menu
        :default-active="currentIndex"
        class="el-menu-vertical-demo"
        :class="activeSelect"
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect"
        :collapse="isCollapse"
        :background-color="backgroundColor"
        :text-color="textColor"
        active-text-color="#fff"
        :collapse-transition="false"
      >
        <template v-for="(item,index) in menus">
          <el-submenu :index="`${index+1}`" v-if="item.leaf" :key="index">
            <template slot="title">
              <img class="middle icon-img no-select-img" :src="item.icon">
              <img class="middle icon-img select-img" :src="item.icon_select">
              <span slot="title" class="middle">{{item.title}}</span>
            </template>
            <el-menu-item
              :class="[item.className||'']"
              v-for="(subItem,subIndex) in item.subMenus"
              :index="subItem.path ? subItem.path : `${index+1}-${subIndex+1}`"
              :key="subIndex"
            >{{subItem.title}}</el-menu-item>
          </el-submenu>

        <div v-if="userInfo.user_type == 1 && item.title == '工作台'?false:true" :key="index"> 
            <el-menu-item
              v-if="!item.leaf"
              :class="[item.className||'']"
              :index="item.path ? item.path : `${index+1}`"
              :key="index"
            >
              <img class="middle icon-img no-select-img" :src="item.icon">
              <img class="middle icon-img select-img" :src="item.icon_select">
              <span slot="title" class="middle">{{item.title}}</span>
            </el-menu-item>
          </div>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { scrollTop } from "../../../utils";
import { getLocalStore } from "../../../utils/storeUtils";

export default {
  name: "SideMenu",
  data() {
    return {
      currentIndex: "",
      activeSelect: "activeSelect",
      backgroundColor: "#4167b5",
      textColor: "#ffffff",
      menus: [
        {
          title: "消息",
          icon: "/images/console/icon_work.png",
          icon_select: "/images/console/icon_message_select.png",
          leaf: false,
          path: "/console/message-list/1",
          name: "console-message-list-page"
        },
        {
          title: "工作台",
          icon: "/images/console/icon_message.png",
          icon_select: "/images/console/icon_work_select.png",
          leaf: false,
          path: "/console/manage-console",
          name: "console-manage-console-page"
        },
        {
          title: "账号管理",
          icon: "/images/console/icon_accout.png",
          icon_select: "/images/console/icon_accout_select.png",
          leaf: false,
          path: "/console/account",
          name: "console-accoun-page"
        }
      ]
    };
  },
  computed: {
    ...mapState({
      serviceListActive: state => state.console.serviceListActive,
      isCollapse: state => state.console.isCollapse,
      userInfo: state => state.user.userInfo
    })
  },
  watch: {
    serviceListActive(val) {
      this.backgroundColor =
        val || this.$route.path === "/console" ? "#4167b5 " : "#4167b5";
    },
    $route: {
      handler(val) {
        this.backgroundColorCompute(val.name);
      },
      immediate: true
    }
  },
  mounted() {
    // this.SET_ISCOLLAPSE(getLocalStore('isCollapse') == 1)
    this.getActiveIndex();
  },
  methods: {
    ...mapMutations(["SET_ISCOLLAPSE", "SET_SERVICE_LIST_ACTIVE"]),
    getActiveIndex() {
      this.currentIndex = this.$route.path;
    },
    go_home() {
      window.location.href = "/console";
    },
    selectServiceHandle() {
      this.SET_SERVICE_LIST_ACTIVE(true);
      this.activeSelect = "";
      scrollTop();
    },
    handleSelect(key, keyPath) {
      this.SET_SERVICE_LIST_ACTIVE(false);
      this.openPage({ path: key });
    },
    changeCollapseHandle() {
      this.SET_ISCOLLAPSE(!this.isCollapse);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    backgroundColorCompute(name) {
      let pathArr = this.menus.filter(item => {
        return item.name === name;
      });
      this.backgroundColor = pathArr.length === 0 ? "#4167b5 " : "#4167b5";
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/less/variables/index";

.menu-index {
  position: fixed;
  background: @theme-color;
  top: @headerH;
  /*transition: all .3s;*/
  z-index: 15;
  .el-scrollbar {
    height: 100%;
  }

  .menu-scroll {
    height: 100%;
    .icon-img {
      margin-right: 15px;
      margin-left: 3px;
      width: 16px;
      text-align: center;
    }
    .menu-switch {
      width: 100%;
      height: 60px;
      padding: 0 20px;
      border-bottom: 1px solid #5076c2;
      border-top: 1px solid #5076c2;
      cursor: pointer;
      user-select: none;
    }
    .menu-item {
      width: 100%;
      height: 60px;
      padding: 0 20px;
      cursor: pointer;
      position: relative;
      color: #fff;
      &:hover,
      &.active {
        background: #fff;
        color: @theme-color!important;
        .select-img {
          display: inline-block;
        }
        .no-select-img {
          display: none;
        }
      }
      .select-img {
        display: none;
      }
      .no-select-img {
        display: inline-block;
      }
      &.active::after {
        display: inline-block;
        content: " ";
        height: 14px;
        width: 14px;
        border-width: 2px 2px 0 0;
        border-color: @theme-color;
        border-style: solid;
        -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        -ms-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        position: absolute;
        top: 50%;
        left: 167px;
        margin-top: -7px;
      }
      span {
        padding-left: 40px;
        font-size: 14px;
      }
    }
    .el-menu {
      transition: all 0.3s;
      &.el-menu--collapse {
        width: 60px;
      }
      border-right: none;
      .el-menu-item {
        &:hover {
          background: #fff !important;
          color: @theme-color!important;
          .select-img {
            display: inline-block;
          }
          .no-select-img {
            display: none;
          }
        }
        .select-img {
          display: none;
        }
        .no-select-img {
          display: inline-block;
        }
      }
      .is-active {
        .select-img {
          display: none;
        }
        .no-select-img {
          display: inline-block;
        }
      }
    }
  }
}
.activeSelect {
  .is-active {
    background: #fff !important;
    position: relative;
    color: @theme-color!important;
    padding-right: 0;
    .select-img {
      display: inline-block!important;
    }
    .no-select-img {
      display: none!important;
    }
  }
  .is-active::after {
    display: inline-block;
    content: " ";
    height: 14px;
    width: 14px;
    border-width: 2px 2px 0 0;
    border-color: @theme-color;
    border-style: solid;
    -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    -ms-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    position: absolute;
    top: 50%;
    left: 167px;
    margin-top: -7px;
  }
}
</style>

