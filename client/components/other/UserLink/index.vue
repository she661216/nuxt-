<template>
  <div
    class="index-user-link" v-loading="!!loadingNum"
    v-show="isShow"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="common-wrapper height-100">
      <div class="l height-100 middle-box color-f fs-32">
        <div class="middle">
          系统化梳理需求 按需定制开发
          <p class="sub__title">一品优选，严格监督项目开发质量，只为应您所需！</p>
        </div>
      </div>
      <div class="r clearfix mt-15">
        <div class="l input-box">
          <input v-model="username" class=" username-input" type="text"  placeholder="请输入联系人姓名 如：王先生">
          <div class="line"></div>
          <input v-model="phone" class=" phone-input" type="text" maxlength="11" placeholder="请输入您的11位手机号">
        </div>
        <global-button class="l submit-btn middle-box" type="btn-theme" @click="submitHandle">
          <span class="middle">免费获取<br>解决方案</span></global-button>
      </div>
      <div class="close-btn" @click='close'>✖</div>
    </div>
  </div>
</template>
<script>
  import {apiConsole} from '../../../api/phpApi'

  export default {
    name: 'UserLink',
    data () {
      return {
        isShow:true,
        phone: '',
        username:''
      }
    },
    methods: {
      close(){
      this.isShow = false;
      },
      async submitHandle (phone = this.phone) {

         if (!this.username) {
           this.$message.error('请输入您的称呼')
           return
         }
        if (phone.length !== 11) {
          this.$message.error('请输入正确的手机号')
          return
        }

        
        let {code} = await apiConsole({phone:this.phone,tmp_name:this.username,url:decodeURIComponent(window.location)}, true)
        if (code === 200) {
          setTimeout(_ => {
            if (!this.userInfo.uid) {
              this.openPage({name: 'user-action', params: {action: 'login'}})
            }
          }, 1500)
          this.phone = ''
        }
      }
    }
  }
</script>

<style lang="less">
  @import "../../../assets/less/variables/index";

  .index-user-link {
    width: 100%;
    height: 120px;
    background: @theme-color;
    position: fixed;
    bottom: 0;
    z-index: 999;
    .common-wrapper{
      position: relative;
    }
    .common-wrapper .close-btn{
      cursor: pointer;
    position: absolute;
    right: -29px;
    color: #fff;
    top: 7px;
    display: inline-block;
    width: 20px;
    height: 20px;
    font-size: 20px;
    }
    .sub__title{
      font-size: 16px;
      color:#feea00;
      margin-top: 15px;
    }
    @h:90px;
    @radius:6px;
    .input-box{
      height:@h;
      border-radius: @radius 0 0 @radius;
      overflow: hidden;
      .line{
        width:100%;
        height:1px;
        background: #e6e6e6;
      }

      .username-input,
      .phone-input {
        display: block;
        width: 300px;
        height: 50%;
        /*line-height: 60px;*/
        margin-right: -3px;
        text-indent: 40px;
        font-size: 16px;
        color: #000;
        background: #fff;
      }
      .phone-input{
        background:#fff url("../../../static/images/icon_phone.png") no-repeat 10px center;
        background-size: 24px;
      }
      .username-input {
        background:#fff url("../../../static/images/icon_edit.png") no-repeat 15px center;
        background-size: 18px;
      }
      ::-webkit-input-placeholder {
        font-size: 15px;
        color:#666;
      }
    }
    .submit-btn {
      width: 150px;
      height: @h;
      padding:0;
      background: #feea00;
      font-size: 20px;
      color:#333;
      font-weight: bold;
      border:none;
      border-radius:0  @radius @radius 0;
    }
  }

</style>
