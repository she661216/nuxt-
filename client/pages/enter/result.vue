<template>
  <div v-if="isShow">
    <top :state="stateRes!=2?'3':'4'"/>
    <!-- 内容 -->
    <div class="equity">
      <h3>{{stateRes!=3?stateRes==1?'待审核':'审核成功':'审核失败'}}</h3>
      <img
        :src="stateRes!=3?stateRes==1?'/images/application_wait.png':'/images/application_success.png':'/images/application_error.png'"
      >
      <h4>{{stateRes!=3?stateRes==1?'您的入驻申请资料已投递成功，请耐心等候审核结果通知！':'恭喜您成功入驻！优选欢迎您！':'非常抱歉，您本次的审核未通过！'}}</h4>

      <p v-if="stateRes== 3">经审核，U+团队督导判定您的审核申请暂未达到优选要求或存在部分需要修改问题，您可以修改申请信息再次发起入驻申请！
        <br>如有疑问请拨打客服电话：17350850670
      </p>

      <p
        v-else-if="stateRes==1"
      >U+团队督导即将审阅您的入驻资料，审阅周期为 1~7个工作日，审阅期间您可能收到U+团队督导的信息确认电话，请保持预留手机通话通畅！</br>感谢您的加盟与等候，审核结果将以平台通知形式发送到您的消息中心，请留意您的消息哦~</p>

      <p v-else>经审核，您正是优选苦苦寻觅的U+团队，请进入个人中心看看您的工作台吧！完善您的商铺吸引更多需求商的青睐！
        <br>如有疑问请拨打客服电话：17350850670
      </p>

      <button
        class="common-btn"
        @click="openPage({path: '/enter/datum?isEdit=true'})"
        v-if="stateRes == 3"
      >重新申请</button>
      
      <button
        class="common-btn"
        @click="$router.push({ path:'/console/manage-console/store-detail'})"
        v-if="stateRes == 2"
      >完善商铺</button>
      
      <button @click="$router.push({path: '/'})">返回首页</button>
    </div>
  </div>
</template>

<script>
import Top from "../../components/other/Steps/top";
import { apiShopAuthStatus } from "../../api/phpApi";

export default {
  name: "StepApplicationWait",
  components: {
    Top
  },
  data() {
    return {
      stateRes: 1,
      isShow:false
    };
  },

async asyncData(){
  
},
  mounted() {},
  async beforeCreate() {
    //  //data.status,0:未提交申请,
    // // 1:已提交申请，待审核状态,
    // // 2:已提交申请，审核成功状态,
    // // 3:已提交申请，审核失败状态
  let { code, data } = await apiShopAuthStatus();
    if (code == 200) {
      if (data.status == 0) {
        window.location.href = "/enter/info";
      } else {
        this.isShow = true;
        this.stateRes = data.status;
      }
    }
  
  },
  methods: {
    async get_status() {}
  }
};
</script>

<style scoped lang="less">
@import "../../assets/less/variables/index";
.equity {
  color: #333;
  text-align: center;
  margin-bottom: 100px;
  img {
    width: 180px;
    height: 160px;
    margin: 0 auto;
  }
  h3 {
    font-size: 40px;
    font-weight: 700;
    margin-bottom: 40px;
  }
  h4 {
    font-size: 30px;
    margin: 60px 0 15px 0;
  }
  p {
    font-size: 12px;
    line-height: 24px;
    width: 780px;
    margin: 0 auto;
    margin-bottom: 60px;
  }
  button {
    width: 160px;
    height: 50px;
    font-size: 16px;
    color: #808080;
    background: #e6e6e6;
    text-align: center;
    border-radius: 5px;
  }
  .common-btn {
    background: @theme-color;
    color: #fff;
    border-color:  @theme-color;
  }
}
</style>
