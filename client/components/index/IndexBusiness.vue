<template>
  <div class="index-business">
    <h1>项目中心</h1>
    <h2>一站式提供您所需的全套软件开发服务</h2>
    <ul class="clearfix common-wrapper">
      <li class="business-item" v-for="(item,index) in list" :key="index">
        <div class="icon-box">
          <img class="img" :src="item.face_pic" alt>
        </div>
        <div class="title">{{item.p_name}}</div>
        <div class="info">类型：{{item.cate_id_name}}</div>
        <div class="state">
          <span></span>
          <a style="cursor: default;">{{item.progress_name}}</a>
          <span></span>
        </div>
        <div class="content">
          <!-- <div>
            <p>价格</p>
            <strong>￥{{item.price}}</strong>
          </div> -->
          <div>
            <p>周期</p>
            <strong>{{item.cycle}}天</strong>
          </div>
        </div>
      </li>
    </ul>
    <div class="clearfix common-btn-enter">
      <a href="/project-center">进入项目中心</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexBusiness",
  props:{
    list:{
      type:Array
    }
  }
};
</script>

<style scoped lang="less">
@import "../../assets/less/variables/index";

.index-business {
  padding-top: 56px;

  background: #eaf4fa;
  > h1 {
    text-align: center;
    font-size: 44px;
    color: #333;
    font-weight: 700;

  }
> h1::before,> h1::after{
     height: 1px;
    width: 180px;
    content: '';
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
    width: 280px;
    height: 390px;
    background: rgba(255, 255, 255, 1);

    color: #333;
    font-size: 24px;
    text-align: center;
    /*cursor: pointer;*/
    margin: 0 30px 30px 0;
    margin-right: 27px;

    .active-img {
      display: none;
    }
    img {
      display: inline-block;
      height: 100px;
      margin-top: 40px;
    }
    .icon-box {
      width: 100%;
      height: 158px;
      margin: 0 auto;
      text-align: center;
    }
    .title {
      font-size: 18px;
      margin-top: 20px;
      font-weight: 700;
    }
    .info {
      font-size: 14px;
      margin-top: 10px;
      margin-bottom: 10px;
      color: #999;
      font-weight: 500;
      height: 16px;
    }
    .state {
      margin-top: 10px;
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
    .content {
      > div {
        float: left;
        width: 100%;
        text-align: center;
        p {
          font-size: 14px;
          margin-top: 20px;
          margin-bottom: 15px;
        }
        strong {
          font-size: 22px;
        }
      }
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
</style>
