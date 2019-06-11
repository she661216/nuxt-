<template>
  <!--<el-scrollbar wrap-class="content-scroll">-->
  <div class="height-100 common-top">
    <console-header/>
    <div class="main height-100 relative">
      <side-menu/>
      <div
        v-loading="!!loadingNum"
        class="nuxt-wrapper relative height-100"
        :class="{'nuxt-wrapper-collapse':isCollapse,'nuxt-wrapper-notice':isNotice,'overflow-hidden':serviceListActive}"
      >
        <service-list/>
        <nuxt/>
      </div>
      <side-notice v-if="isNotice"/>
    </div>
    <side-bar/>
    <feedback-dialog/>
  </div>
  <!--</el-scrollbar>-->
</template>

<script>
import { mapState, mapMutations } from "vuex";
import SideBar from "../components/common/SideBar";
import FeedbackDialog from "../components/common/FeedbackDialog";
import ConsoleHeader from "../components/layoutConsole/Header";
import SideMenu from "../components/layoutConsole/SideMenu";
import SideNotice from "../components/layoutConsole/SideNotice";
import ServiceList from "../components/layoutConsole/ServiceList";

let showNoticePath = [
  "console",
  "console-project-manage-page",
  "console-account-page"
];
export default {
  name: "console",
  components: {
    ConsoleHeader,
    SideBar,
    SideMenu,
    SideNotice,
    ServiceList,
    FeedbackDialog
  },
  middleware: "checkAuth",
  computed: {
    ...mapState({
      serviceListActive: state => state.console.serviceListActive,
      isCollapse: state => state.console.isCollapse,
      isNotice: state => state.console.isNotice
    })
  },
  watch: {
    $route: {
      handler(val) {
        this.showNoticeCompute(val.name);
      },
      immediate: true
    }
  },
  methods: {
    ...mapMutations({
      SET_IS_NOTICE: "SET_IS_NOTICE"
    }),
    showNoticeCompute(name) {
      let pathArr = showNoticePath.filter(item => {
        return item === name;
      });
      this.SET_IS_NOTICE(pathArr.length > 0);
    }
  }
};
</script>

<style lang="less">
@import "../assets/less/variables/index";

body,
#__nuxt,
#__layout {
  height: 100%;
}

.nuxt-wrapper {
  margin-left: 200px;
  margin-right: @sideBarW;
  padding: 40px;
  transition: all 0.3s;
  &.nuxt-wrapper-collapse {
    margin-left: 60px;
  }
  &.nuxt-wrapper-notice {
    /*transition: none;*/
    margin-right: @sideNoticeW + @sideBarW + 40px;
  }
  &.overflow-hidden {
    overflow: hidden;
  }
}
.common-content {
  .el-form-item__label {
    color: #999;
  }
  .el-select-dropdown__item:last-child {
    padding-bottom: 44px;
  }

  ::-webkit-input-placeholder {
    /* WebKit, Blink, Edge */
    color: #999;
  }
  :-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #999;
  }
  ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #999;
  }
  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #999;
  }
}
</style>
