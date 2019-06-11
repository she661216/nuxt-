<template>
  <section class="about-index">
    <div class="about-bg relative">
      <img class="height-100 absoluteCC width-100" src="/images/about-bg.png" alt>
      <h2 class="title">一品优选</h2>
      <p class="sub-title">以数字科技领先全球，用行业服务创造价值！</p>
      <div class="tab-wrapper">
        <div class="common-wrapper">
          <ul class="clearfix">
            <li
              class="tabs"
              v-for="(item,index) in menus"
              :key="index"
              :class="{active:activeIndex===index}"
              @click="navHandle(index)"
            >{{item.name}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="about-index__content">
      <div class="story-wrapper" ref="content0">
        <div class="common-wrapper">
          <div class="story-l">
            <h3 class="tab-content-title">我们的故事</h3>
            <p class="tab-content-txt">
              一品优选（http://www.epyxw.cn）是一品威客旗下自营品牌，专注于为用户解决IT研发需求。企业一键托付研发项目
              需求，项目全程由一品优选专业团队提供管家式服务，全程无忧，价格透明，品质保障，省心，省钱更高效。
            </p>
            <p
              class="tab-content-txt"
            >一品威客成立于2011年，是国内领先的创业众包服务平台；国家级电子商务示范企业和国家科技支撑计划项目承担单位。截止2018年10月，拥有超1600万注册用户。</p>
          </div>
          <div class="story-r">
            <img src="/images/about-story.jpg" alt>
          </div>
        </div>
      </div>

      <div class="business-wrapper" ref="content1">
        <div class="common-wrapper">
          <h3 class="tab-content-title">我们的业务</h3>
          <p
            class="tab-content-txt"
          >一品优选专注于为用户解决创意研发需求，包括APP开发、管理系统、网站建设、微信开发、H5开发、工具类软件开发等，涉及互联网、制造业、传媒出版、汽车、金融、烟草、消费品、房地产、建筑、交通运输、产业园区、公用事业、医疗卫生、农业等行业和领域。后续一品优选将根据实际拓展更多业务，为用户提供专业、省心、省钱的服务。</p>
          <p class="tab-content-txt">
            我们始终保持服务初心，做到二包一更：
            <span class="large-txt">包省心、包省钱、更高效</span>
          </p>
          <div class="img-wrapper mt-40">
            <div class="items">
              <div class="img-box">
                <img src="/images/about-business1.png" alt>
              </div>
              <span>包省心</span>
              <p>托付式管家服务，100%满意交付
                <br>承诺产品迭代，拒绝烂尾工程
              </p>
            </div>
            <div class="items">
              <div class="img-box">
                <img src="/images/about-business2.png" alt>
              </div>
              <span>包省钱</span>
              <p>大平台自营，标准化定价
                <br>更低的价格，更好的服务
              </p>
            </div>
            <div class="items">
              <div class="img-box">
                <img src="/images/about-business3.png" alt>
              </div>
              <span>更高效</span>
              <p>秒级响应速度，自营研发团队
                <br>全能型技术支持，项目交付快30%
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="advantage-wrapper" ref="content2">
        <div class="common-wrapper">
          <h3 class="tab-content-title">我们的优势</h3>
          <p class="tab-content-txt fwb">1个优选管家团队=1个项目经理+1个产品经理+2个UI+4个研发+2个测试+2个运维+8年品质服务经验</p>
          <div class="img-wrapper mt-20">
            <div class="items">
              <div class="img-box">
                <img src="/images/about-advantage1.png" alt>
              </div>
              <span>项目管家，托付服务</span>
              <p>项目进度实时跟踪反馈，
                <br>无忧服务，放心托付；
              </p>
            </div>
            <div class="items">
              <div class="img-box">
                <img src="/images/about-advantage2.png" alt>
              </div>
              <span>资源管理，高效协作</span>
              <p>灵活调配研发资源，
                <br>交付速度提升30%；
              </p>
            </div>
            <div class="items">
              <div class="img-box">
                <img src="/images/about-advantage3.png" alt>
              </div>
              <span>专业团队，全程品控</span>
              <p>全能型专业研发团队，
                <br>从需求到验收全程品质管控；
              </p>
            </div>
            <div class="items">
              <div class="img-box">
                <img src="/images/about-advantage4.png" alt>
              </div>
              <span>风险评估，无忧交付</span>
              <p>项目前后期风险评估，
                <br>杜绝烂尾工程，保障产品无忧交付。
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="mission-wrapper" ref="content3">
        <div class="common-wrapper">
          <h3 class="tab-content-title">我们的服务愿景和使命</h3>
          <p class="tab-content-txt fwb">6步走，从“0”打造你要的产品 / 从灵感到成品，竟如此简单</p>
          <img class="mt-20 mb-20 width-100" src="/images/about-mission.png" alt>
          <div class="img-wrapper mt-20">
            <div class="items">
              <span>需求沟通</span>
              <p>沟通评估用户需求
                <br>提供专业方案及报价
              </p>
            </div>
            <div class="items">
              <span>合作签署</span>
              <p>签署合作协议
                <br>明确合作及交付时间
              </p>
            </div>
            <div class="items">
              <span>业务梳理</span>
              <p>精选梳理项目
                <br>设计产品原型图
              </p>
            </div>
            <div class="items">
              <span>高效研发</span>
              <p>搭建拓展的技术框架迅
                <br>速投入开发资源
              </p>
            </div>
            <div class="items">
              <span>严苛测试验收</span>
              <p>基于用户需求对开发成
                <br>果进行测试、验收
              </p>
            </div>
            <div class="items">
              <span>售后服务</span>
              <p>终身售后服务
                <br>承诺对产品进行迭代更新
              </p>
            </div>
          </div>
          <p class="tab-content-sub-title">专业团队</p>
          <p
            class="tab-content-txt"
          >一品优选为每个项目配备由“产品经理+UI设计师+研发工程师+测试工程师+运维工程师”组成的独立开发团队，同时高效利用项目管理系统，保障开发过程实时跟踪、便捷验收，品质保障，实现省心对接。此外，一品优选背靠一品威客平台，拥有线上优质的研发类U+团队资源，可以提供专业有保障的研发服务。</p>
        </div>
      </div>

      <div class="growth-wrapper">
        <div class="common-wrapper">
          <h3 class="tab-content-title">一品成长点点滴滴</h3>
          <img class="mt-20" src="/images/about-growth.png" alt>
        </div>
      </div>
    </div>
    <!--<user-link/>-->
  </section>
</template>

<script>
import UserLink from "../components/other/UserLink";

export default {
  name: "about",
  components: {
    UserLink
  },
  data() {
    return {
      activeIndex: 0,
      menus: [
        {
          name: "我们的故事"
        },
        {
          name: "我们的业务"
        },
        {
          name: "我们的优势"
        },
        {
          name: "我们的愿景和使命"
        }
      ]
    };
  },
  methods: {
    navHandle(index) {
      this.activeIndex = index;
      let scrollTop = document.getElementsByTagName("html")[0].scrollTop;
      document.getElementsByTagName("html")[0].scrollTop =
        scrollTop + this.$refs[`content${index}`].getBoundingClientRect().top;
    }
  }
};
</script>

<style lang="less">
@import "../assets/less/variables/index";

.about-index {
  .about-bg {
    height: 380px;
    overflow: hidden;
    .title {
      color: #fff;
      font-size: 60px;
      position: absolute;
      left: 50%;
      top: 115px;
      transform: translate3d(-50%, 0, 0);
    }
    .sub-title {
      color: #fff;
      font-size: 20px;
      position: absolute;
      top: 190px;
      left: 50%;
      transform: translate3d(-50%, 0, 0);
    }
    .tab-wrapper {
      position: absolute;
      bottom: 0;
      opacity: 0.7;
      height: 80px;
      width: 100%;
      background-color: #10172d;
      .tabs {
        float: left;
        width: 300px;
        height: 100%;
        line-height: 80px;
        cursor: pointer;
        color: #6e7994;
        font-size: 24px;
        text-align: center;
        &:hover {
          background-color: @theme-color;
          color: #fff;
        }
      }
    }
  }
  .about-index__content {
    .tab-content-title {
      font-size: 40px;
      font-weight: bold;
      color: #333;
    }
    .tab-content-sub-title {
      font-size: 20px;
      font-weight: bold;
      clear: both;
      margin-top: 80px;
    }

    .tab-content-txt {
      font-size: 16px;
      color: #333;
      line-height: 30px;
      padding-top: 30px;
      &.fwb {
        font-weight: bold;
      }
      .large-txt {
        font-size: 30px;
      }
    }
    .story-wrapper {
      height: 420px;
      background-color: #fff;
      .story-l {
        width: 800px;
        height: 100%;
        float: left;
        padding-top: 75px;
        padding-right: 60px;
      }
      .story-r {
        width: 400px;
        height: 100%;
        float: left;
        padding-top: 155px;
      }
    }

    .business-wrapper {
      height: 760px;
      padding-top: 75px;
      background-color: #f5f5f5;
      .img-wrapper {
        height: 340px;
        .items {
          float: left;
          width: 400px;
          text-align: center;
          .img-box {
            img {
              display: inline-block;
            }
          }
          span {
            display: inline-block;
            color: @theme-color;
            font-size: 30px;
            font-weight: bold;
            padding: 30px 0 20px;
          }
          p {
            font-size: 16px;
            color: #333;
            line-height: 30px;
          }
        }
      }
    }
    .advantage-wrapper {
      height: 600px;
      padding-top: 75px;
      background-color: #ffffff;
      .img-wrapper {
        height: 320px;
        .items {
          float: left;
          width: 300px;
          text-align: center;
          .img-box {
            img {
              display: inline-block;
            }
          }
          span {
            display: inline-block;
            color: #333;
            font-size: 20px;
            font-weight: bold;
            padding: 30px 0 20px;
          }
          p {
            font-size: 16px;
            color: #808080;
            line-height: 20px;
          }
        }
      }
    }
    .mission-wrapper {
      height: 700px;
      padding-top: 75px;
      background-color: #f5f5f5;
      .img-wrapper {
        height: 115px;
        .items {
          float: left;
          /*width: 200px;*/
          text-align: center;
          &:nth-child(1) {
            width: 175px;
          }
          &:nth-child(2) {
            width: 230px;
          }
          &:nth-child(3) {
            width: 185px;
          }
          &:nth-child(4) {
            width: 225px;
          }
          &:nth-child(5) {
            width: 190px;
          }
          &:nth-child(6) {
            width: 180px;
            float: right;
          }
          span {
            display: inline-block;
            color: #333;
            font-size: 24px;
            padding: 10px 0 15px;
          }
          p {
            font-size: 16px;
            color: #808080;
            line-height: 20px;
          }
        }
      }
    }
    .growth-wrapper {
      height: 600px;
      padding-top: 75px;
      background-color: @theme-color;
      .tab-content-title {
        color: #fff;
      }
    }
  }
}
</style>
