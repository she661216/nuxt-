<template>
  <div class="index-map common-wrapper">
    <global-title title="星火燎原、携手共赢，成就我们共同的发展">
      <p class="title-content">
        跬步累积，持续扩张的服务案例让一品优选帮助众多大中小型企业（个人）打造属于自己的项目。从0到1，您的技术团队，与您共同成长！我们的团队为各个合作伙伴竭力打造优质产品！找到我们，您就已经赢了第一步！欢迎全国各地各级政府部门、各行业协会机构、行业领先品牌企业、上市公司、知名集团企业、中小企业加入!
      </p>
    </global-title>
    <div class="map-content relative">
      <img class="map-img" src="/images/map.png" alt="">
      <point  left="700px" top="500px"  :point-num="6"/><!--广州-->
      <point  left="760px" top="360px"  :point-num="4"/><!--合肥-->
      <point  left="570px" top="360px"  :point-num="4"/> <!--成都-->
      <point  left="300px" top="180px"  :point-num="4"/> <!--乌鲁木齐-->
      <point  left="360px" top="350px"  :point-num="4"/> <!--拉萨-->
      <point  left="584px" top="475px" :point-num="5"/><!--贵州-->
      <point  left="717px" top=" 190px"  :point-num="6"/><!--北京-->
      <point  left="717px" top=" 240px"  :point-num="5"/><!--石家庄-->
      <point  left="667px" top=" 240px"  :point-num="6"/><!--太原-->
      <point  right="257px" top="50px"  :point-num="4"/><!--哈尔滨-->
      <point  left="757px" top=" 250px"  :point-num="6"/><!--山东-->
      <point  left="804px" top="405px"  :point-num="4"/><!--浙江-->
      <point  left="774px" top="455px"  :point-num="5"/><!--厦门-->
      <point  left="824px" top="505px"  :point-num="4"/><!--台湾-->
    </div>
  </div>
</template>

<script>
  import Point from '../other/Point/index'
  export default {
    name: 'IndexMap',
    components:{
      Point
    }
  }
</script>

<style scoped lang="less">

  .index-map {
    margin-top: 70px;
    margin-bottom: 50px;
    .title-content{
      width:1030px;
      margin:40px auto 0;
      font-size: 14px;
      line-height: 26px;
    }
    .map-content{
      .map-img{
        width:756px;
        margin: 0 auto;
      }
    }
  }
</style>
