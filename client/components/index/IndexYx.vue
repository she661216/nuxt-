<template>
  <div>
    <div class="index-yx">
      <h1>实力优选</h1>
      <h2>多年经验专业积累，高效模式，快速交付</h2>
      <ul class="clearfix common-wrapper">
        <li class="business-item" v-for="(item,index) in list" :key="index">
          <div class="icon-box">
            <img class="img" :src="`/images/index/index_yx_${index+1}.png`" alt>
          </div>

          <div class="box">
            <div class="title">{{item.title}}</div>
            <div class="info">{{item.title_info}}</div>
            <div class="info">{{item.title_info2}}</div>
          </div>
        </li>
      </ul>
    </div>

    <div class="index-six">
      <h1>六步赋能</h1>
      <h2>一站式托付平台，专业六步赋能助力企业互联网征途</h2>
      <div class="img" ></div>
      <div style="height:60px;background:#fff;width:100%"></div>

      <div class="img-us" ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexBusiness",
  data() {
    return {
      list: [
        {
          title: "8年",
          title_info: "国家科技计划承担单位 ",
          title_info2: "8年专业研发经验服务背书"
        },
        {
          title: "1500万+",
          title_info: "用户累计突破1500万+",
          title_info2: "专注一站式定制互联网技术服务"
        },
        {
          title: "100+",
          title_info: "五百强等名企客户长期定制服务",
          title_info2: "性价比更高，比市场优惠30%-50%"
        },
        {
          title: "百人团队",
          title_info: "近百人专业定制服务技术团队",
          title_info2: "近1000人新锐U+团队&研发团队"
        },
        {
          title: "533模式",
          title_info: "5人专业顾问小组，3天出项目框架",
          title_info2: "15天出项目方案，3个月完成交付"
        },
        {
          title: "高历史交付率",
          title_info: "历史项目完美交付率",
          title_info2: "承诺持续迭代，保障产品无痛升级"
        }
      ]
    };
  }
};
</script>

<style scoped lang="less">
@import "../../assets/less/variables/index";

.index-yx,.index-six {
  padding-top: 56px;
  padding-bottom: 40px;
  background: #fff;
  > h1 {
    text-align: center;
    font-size: 44px;
    color: #333;
    font-weight: 700;
  }
  > h1::before,
  > h1::after {
    height: 1px;
    width: 180px;
    content: "";
    background: #dee1e3;
    display: inline-block;
    margin-bottom: 15px;
    margin-right: 20px;
    margin-left: 20px;
  }
  > h2 {
    text-align: center;
    font-size: 20px;
    color: #666;
    margin-top: 15px;
    margin-bottom: 45px;
  }
  .business-item {
    float: left;
    width: 586px;
    height: 210px;
    background: rgba(255, 255, 255, 1);
    padding: 35px 30px;
    color: #333;
    font-size: 24px;
    text-align: center;
    /*cursor: pointer;*/
    margin: 0 40px 40px 0;
    border-bottom: 5px solid @theme-color;
    box-shadow: 0 10px 40px 0 rgba(0, 0, 0, 0.2);
    .active-img {
      display: none;
    }
    img {
      display: inline-block;
      width: 100%;
      height: 100%;
      margin-right: 48px;
    }
    .icon-box {
      width: 140px;
      height: 140px;
      float: left;
    }
    .box {
      text-align: left;
      float: left;
      margin-left: 40px;
      .title {
        font-size: 36px;
        margin-top: 15px;
        font-weight: 700;
        color: #4267b5;
      }
      .info {
        font-size: 20px;
        margin-top: 10px;
        margin-bottom: 10px;
        color: #000;
        font-weight: 500;
        height: 16px;
        padding: 12px 0;
      }
      .state {
        a {
          display: inline-block;
          width: 90px;
          height: 34px;
          font-size: 16px;
          background: @theme-color;
          color: #fff;
          line-height: 34px;
        }
        span {
          display: inline-block;
          background-color: #ddd;
          width: 50px;
          height: 1px;
          margin-bottom: 5px;
          margin-left: 10px;
          margin-right: 10px;
        }
      }
    }
  }
  .business-item:hover {
    background: @theme-color;
    .title,
    .info {
      color: #fff;
    }
  }
  .common-btn-enter {
    margin: 0 auto;
    text-align: center;
    a {
      display: inline-block;
      -webkit-border-radius: 0;
      border-radius: 0;
      padding: 12px 26px;
      color: #fff;
      font-size: 16px;
      line-height: 1em;
      border: none;
      margin: 30px 0 60px 0;
      background: @theme-color;
    }
  }
}
.index-six{
  padding-top: 90px;
  padding-bottom: 0;
  background: #f7f7f7;
  >h2{
    margin-bottom: 80px;
  }
  >.img{
        background: url("../../assets/images/index-six.png")no-repeat center 0;
    width: 100%;
    height: 368px;
  }
  >.img-us{
    background: url("../../assets/images/index-us.png")no-repeat center 0;
    width: 99%;
    height: 868px;

  }
}
</style>
