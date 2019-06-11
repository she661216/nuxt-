<template>
  <div class="index-banner">
  <div class="common-wrapper">
       <div class="box-bg"></div>
    <div class="box">
      <p>已有
        <span>{{data_num.company_num}}</span>个企业选择
      </p>
      <p>一品优选项目开发</p>
      <button        @click="openPage({path:'/service/issue'})">我要开发项目</button>

      <p class="mt40">已有
        <span>{{data_num.project_num}}</span>个优选专家加入
      </p>
      <p>一品优选</p>
      <button   @click="openPage({path:userInfo.uid?userInfo.user_type == 2?'/console':'/enter/result':'/user/login?from=application'})">我要加入U+团队</button>
    </div>
  </div>
  </div>
</template>

<script>
import { apiGetIndexInitData } from "../../api/phpApi";
export default {
  name: "IndexBanner",
  components: {},
  data() {
    return {
      data_num:{
        company_num:0,
        project_num:0
      }
    };
  },
    mounted() {
    this.get_index_init_data();
  },
    methods: {
    async get_index_init_data() {
      let { data } = await apiGetIndexInitData();
      if(data){
       this.data_num = data
      }
    },
    }
};
</script>

<style scoped lang="less">
.index-banner {
  background: url('../../assets/images/index_banner.png')no-repeat center 0;
  height: 562px;
  width: 100%;
  position: relative;
  > .common-wrapper {
   position: relative;
  }
  .box-bg {
    width: 280px;
    height: 356px;
    overflow: hidden;
    position: absolute;
    right: 0;
    top: 100px;
    background: #4167b5;
    opacity: 0.5;
  }
  .box {
    width: 280px;
    height: 356px;
    overflow: hidden;
    position: absolute;
    right: 0;
    top: 100px;
    padding: 40px 20px;
    p {
      color: #fff;
      font-size: 16px;
      line-height: 28px;
      span {
        font-size: 24px;
        font-weight: 700;
        color: #fff;
      }
    }
    .mt40{
          margin-top: 40px;
    }
    button{
      background: #FF8643;
    padding: 10px 20px;
    color: #fff;
    margin-top: 18px;
    }
  }
}
</style>
