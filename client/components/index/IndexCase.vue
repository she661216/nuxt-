<template>
  <div class="index-case">
    <h1>优选人才</h1>
    <h2>云集IT圈技术开发服务专家 优秀开发人才</h2>
    <div class="case-content">
      <div class="clearfix common-wrapper case-ul">
        <el-carousel
          :interval="4000"
          indicator-position="none"
          arrow="always"
          :autoplay="false"
          type="card"
          height="720px"
          width="340px"
        >
          <el-carousel-item v-for="(item,index) in list" :key="index">
            <div class="business-item">
              <div class="icon-box">
                <div class="circle-avatar">
                  <img class="img" :src="item.face_pic" alt>
                </div>
              </div>
              <div class="title">{{item.nick_name}}</div>
              <div class="info">{{item.position}}</div>
              <div class="skill">
                <span>{{item.position_type}}</span>
                <span>{{item.shop_name}}</span>
              </div>
              <div class="state">
                <span></span>
                <a>擅长领域</a>
                <span></span>
              </div>
              <div class="content clearfix">
                <div v-for="index in item.skills_span_arr" :key="index">{{index}}</div>
              </div>
              <a
                class="btn"
                v-if="contactUs && contactUs.zx"
                :href="`http://wpa.qq.com/msgrd?v=3&uin=${contactUs.zx[Math.floor(Math.random()*contactUs.zx.length)].qq}&site=qq&menu=yes`"
                target="_blank"
              >立即咨询他</a>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "IndexCase",
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      new_list: []
    };
  },
  computed: {
    ...mapState({
      contactUs: state => state.common.contactUs
    })
  }
};
</script>
<style lang="less">
.index-case {
  .el-carousel__container {
    .el-carousel__arrow--right {
      width: 44px;
      height: 106px;
      background: url("../../assets/images/arrow--right.png");
      border-radius: 0;
    }
    .el-carousel__arrow--right ::before,
    .el-carousel__arrow--left ::before {
      content: "";
    }
    .el-carousel__arrow--left {
      height: 106px;
      width: 44px;
      background: url("../../assets/images/arrow--left.png");
      border-radius: 0;
    }
    .el-carousel__mask {
      width: auto;
    }
    .is-active {
      .business-item {
        background: #3668bb;
        height: 720px;
        .btn {
          display: block;
        }
      }
    }
    .el-carousel__item--card{
     opacity: 0;
          width: 32%;
    margin: 0 9%;
    }
    .is-in-stage{
        opacity: 1;
    }
  }
}
</style>
<style scoped lang="less">
@import "../../assets/less/variables/index";

.index-case {
  padding-top: 50px;
  @h: 970px;
  height: @h;
  background: url("../../assets/images/case_bg.png") no-repeat center 0;

  > h1 {
    text-align: center;
    font-size: 44px;
    color: #fff;
    font-weight: 700;
  }
  > h1::before,
  > h1::after {
    height: 1px;
    width: 180px;
    content: "";
    background: #5679a6;
    display: inline-block;
    margin-bottom: 15px;
    margin-right: 20px;
    margin-left: 20px;
  }
  > h2 {
    text-align: center;
    font-size: 20px;
    color: #ddd;
    margin-top: 15px;
    margin-bottom: 45px;
  }
  .case-content {
    @h: 420px;
    margin-bottom: 80px;
    color: #fff;
    overflow: hidden;

    .case-item {
      float: left;
      width: 20%;
      height: @h;
      cursor: pointer;
      &:hover {
        background: url("../../assets/images/case_active.png");
        .detail-btn {
          /*display: inline-block;*/
          opacity: 1;
        }
        .icon-box {
          margin-top: 90px;
        }
        .content-p {
          margin: 35px 0;
        }
      }
      .icon-box,
      .content-p,
      .detail-btn {
        transition: all 0.5s;
      }
      .content-p {
        padding: 0 20px;
      }
      .icon-box {
        width: 90px;
        height: 90px;
        margin-top: 130px;
        overflow: hidden;
        img {
          display: inline-block;
          width: 90px;
          height: 90px;
        }
      }
      .detail-btn {
        display: block;
        width: 100px;
        margin: 0 auto;
        opacity: 0;
      }
    }
  }
  .business-item {
    width: 340px;
    margin: 0 auto;
    height: 560px;
    color: #fff;
    font-size: 24px;
    text-align: center;

    .active-img {
      display: none;
    }
    .circle-avatar {
      width: 274px;
      height: 295px;
      background: url("../../assets/images/circle_avatar.png");
      img {
        display: inline-block;
        width: 188px;
        margin-top: 44px;
        height: 188px;
        border-radius: 300px;
      }
    }

    .icon-box {
      width: 274px;
      height: 360px;
      margin: 0 auto;
      padding-top: 50px;
      text-align: center;
      overflow: hidden;
    }
    .title {
      font-size: 28px;
      margin-top: 5px;
      font-weight: 700;
    }
    .info {
      font-size: 22px;
      margin-top: 15px;
      margin-bottom: 10px;
      color: #fff;
      font-weight: 500;
      height: 16px;
    }
    .skill {
      span {
        display: inline-block;
        width: 50%;
        height: 20px;
        font-size: 16px;
        text-align: center;
        float: left;
        margin-top: 10px;
        overflow: hidden;
        height: 16px;
      }
      span:first-child {
        border-right: 1px solid #5988d6;
      }
    }
    .state {
      a {
        display: inline-block;
        height: 34px;
        font-size: 16px;
        color: #fff;
        line-height: 34px;
        margin-top: 15px;
  
      }
      span {
        display: inline-block;
        background-color: #5988d6;
        width: 70px;
        height: 1px;
        margin-bottom: 5px;
        margin-left: 5px;
        margin-right: 5px;
      }
    }
    .content {
      padding: 20px 52px;
      padding-right: 20px;
      height: 120px;
      overflow: hidden;
      margin-bottom: 10px;
      > div {
        float: left;
        width: 50%;
        text-align: center;
        font-size: 14px;
        color: #fff;
        border: 1px solid #fff;
        width: 110px;
        height: 30px;
        line-height: 30px;
        margin-right: 20px;
        margin-bottom: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .btn {
      cursor: pointer;
      margin: 0 auto;
      width: 180px;
      color: #4267b5;
      background: #fff;
      font-size: 16px;
      height: 44px;
      line-height: 34px;
      display: none;
      margin-top: 0;
      clear: both;
    }
  }
}
</style>
