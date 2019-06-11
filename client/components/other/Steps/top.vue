<template>
  <section class="appli-index">
    <div class="issue-header-bg relative">
      <img
        v-show="state==1"
        class="height-100 width-100 absoluteCC"
        src="/images/server_add.png"
        alt
      >
      <img v-show="state!=1" class="height-100 width-100 absoluteCC" src="/images/step_add.png" alt>
      <a v-show="state==1" href="/enter/datum">免费申请入驻</a>
    </div>
    <div class="common-wrapper clearfix">
      <div>
        <div class="datum-step">
          <div :class="state==1?'active':''">
            <img class="step-icon" src="/images/icon_info.png" alt>
            <img class="step-icon-active" src="/images/icon_info_active.png" alt>
            <p>账号信息</p>
            <span class="line"></span>
          </div>
          <div :class="state==2?'active':''">
            <img class="step-icon" src="/images/icon_dengji.png" alt>
            <img class="step-icon-active" src="/images/icon_dengji_active.png" alt>
            <p>资料登记</p>
            <span class="line"></span>
          </div>
          <div :class="state == 3 ?'active':''">
            <img class="step-icon" src="/images/icon_shenhe.png" alt>
            <img class="step-icon-active" src="/images/icon_shenhe_active.png" alt>
            <p>审核沟通</p>
          </div>
          <div :class="state == 4 ?'active':''">
            <img class="step-icon" src="/images/icon_ruzhu.png" alt>
            <img class="step-icon-active" src="/images/icon_ruzhu_active.png" alt>
            <p>入驻</p>
            <span class="line" style="left:0;"></span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getLocalStore } from "../../../utils/storeUtils";
export default {
  props: {
    state: String
  },
  middleware: "checkAuth",
  data() {
    return {};
  },
  mounted() {
    if (!getLocalStore("Authorization")) {
      location.href =
        "/user/login?from=" +
        encodeURIComponent(location.pathname + location.search);
    }
  },
  methods: {}
};
</script>

<style scoped lang="less">
@import "../../../assets/less/variables/index";
.appli-index {
  @color: #aaa;
  .issue-header-bg {
    height: 430px;
    overflow: hidden;
    a {
      display: block;
      width: 202px;
      height: 52px;
      position: absolute;
      top: 222px;
      left: 44.4%;
      background: #ffea00;
      border-radius: 5px;
      color: #000;
      text-align: center;
      line-height: 50px;
      font-size: 18px;
    }
  }
  .common-wrapper {
    margin-top: -85px;
    position: relative;
    z-index: 1;
    margin-bottom: 100px;
  }
}

.datum-step {
  width: 1200px;
  height: 150px;
  border-radius: 3px;
  position: relative;
  box-shadow: 0px 10px 40px 0px rgba(51, 51, 51, 0.1);
  > div {
    width: 300px;
    height: 150px;
    padding: 30px 0;
    text-align: center;
    float: left;
    background: rgba(255, 255, 255, 1);
    position: relative;
    &.active {
      height: 180px;
      padding: 39px 0 46px 0;
      background: linear-gradient(0deg, @theme-color 0%, @theme-color 100%);
      border-radius: 3px;
      top: -15px;
      p {
        color: #fff;
        margin-top: 23px;
      }
      img {
        &.step-icon {
          display: none;
        }
        &.step-icon-active {
          display: inline-block;
        }
      }
      .line {
        display: none;
      }
    }
    img {
      display: inline-block;
      &.step-icon-active {
        display: none;
      }
    }
    p {
      font-size: 18px;
      font-weight: 400;
      color: @theme-color;
      margin-top: 20px;
    }
    .line {
      width: 2px;
      height: 100px;
      background: rgba(230, 230, 230, 1);
      position: absolute;
      top: 25px;
      right: 0;
    }
  }
}
</style>



