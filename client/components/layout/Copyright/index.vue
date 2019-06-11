<template>
  <div class="s-ftbt">
    <div class="compart clearfix common-wrapper">
      <div class="s-item">
        <img
          class="inline"
          src="http://static10.epbiaoju.cn/Template/pc/epbiao/Static/new_images/name_logo.jpg?ver=90"
          style="height: 9px;"
        >
        智汇一品集团旗下品牌 - 厦门一品威客网络科技股份有限公司版权所有
        <p>Copyright © 2018-2019  www.zhihuiep.com  北京智汇一品集团有限公司</p>
      </div>
      <div class="s-marks">
        <img src="http://img11.epbiaoju.cn/Template/pc/epbiao/Static/new_images/mark_1.jpg?ver=90">
        <img src="http://img10.epbiaoju.cn/Template/pc/epbiao/Static/new_images/mark_2.jpg?ver=90">
        <img src="http://img11.epbiaoju.cn/Template/pc/epbiao/Static/new_images/mark_3.jpg?ver=90">
        <img src="http://img12.epbiaoju.cn/Template/pc/epbiao/Static/new_images/mark_4.jpg?ver=90">
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
  .s-ftbt {
    width: 100%;
    background-color: #fff;
    padding-bottom: 100px;
    .compart {
      padding: 40px 0;
      .s-item {
        float: left;
        img {
          height: 13px !important;
        }
        p {
          color: #999999;
          line-height: 35px;
        }
      }
      .s-marks {
        float: right;
        img {
          display: inline-block;
          margin-left: 20px;
        }
      }
    }
  }

</style>
