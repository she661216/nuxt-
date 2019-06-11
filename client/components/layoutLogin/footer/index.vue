<template>
  <div class="login-footer">
    <div class="common-wrapper">
      <div class="nav-box clearfix">
        <div class="l nav-l">
          <a href="/about" target="_blank">关于我们</a>
          <a href="http://www.epwk.com/about-view-service.html" target="_blank">法律声明及隐私权政策</a>
          <!-- <a href="/" target="_blank">廉政举报</a>
          <a href="/" target="_blank">联系我们</a> -->

        </div>
        <div class="r nav-r">
          <a href="http://www.epwk.com/" target="_blank"> 一品威客</a>丨
          <a href="http://www.epzcw.com/" target="_blank"> 一品标局</a>丨
          <a href="http://www.epcsw.com/ " target="_blank"> 一品财税</a>丨
          <a href="http://www.eplogo.cn/" target="_blank"> 智能logo</a>
        </div>
      </div>
      <div class="copyright">
        <img
          class="inline middle"
          src="/images/name_logo.png?ver=90"
          style="height: 9px;"
        >
        智汇一品集团旗下品牌 - 厦门一品威客网络科技股份有限公司版权所有
        <p>Copyright © 2018-2019  www.zhihuiep.com  北京智汇一品集团有限公司</p>
      </div>
    </div>

   <user-link/>
  </div>
</template>

<script>
  import UserLink from '../../other/UserLink/index'
  export default {
      components: {
      UserLink
    },
  }
</script>

<style scoped lang="less">
  @import "../../../assets/less/variables/index";

  .login-footer {
    width: 100%;
    background-color: #10172d;
    .nav-box {
      height: 95px;
      line-height: 95px;
      a {
        color: #565E73;
        &:hover {
          color: @theme-color;
        }
      }
      .nav-l {
        a {
          padding-right: 20px;
        }
      }
      .nav-r {
        padding-left: 10px;
        color: #565E73;
        a {
          font-size: 14px;
        }
      }
    }
    .copyright {
      padding: 40px 0;
      color: #565E73;
      border-top: 1px solid #565E73;
      text-align: center;
      img {
        height: 13px !important;
      }
      p {

        line-height: 35px;
      }
    }
  }

</style>
