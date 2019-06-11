<template>
  <div>
       <top state="2"/>
    <!-- 内容 -->
    <div class="user-info">
      <h1>用户信息登记</h1>
      <p>致力于打造真实、合法、有效的互联网平台。为了更好的保障你和广大平台用户的合法权益，请你认真填写以下登记信息</p>
      <div class="user-form">
        <el-form ref="form" :model="form" label-width="200px" :rules="rules">
          <el-form-item label="请选择主体类型 " class="home-type" prop="auth_type">&nbsp;
            <el-radio-group v-model="form.auth_type" @change='changeAuthType'>
              <div class="mb-20 mt-10">
                <el-radio label="1"><span class="fz20">&nbsp;&nbsp;团队</span> <span class="fz16">&nbsp;&nbsp;个人类型：自然人注册申请</span></el-radio>
              </div>
              <div>
                <el-radio v-if='form.auth_type == 2' label="2"><span class="fz20">&nbsp;&nbsp;企业</span> <span class="fz16">&nbsp;&nbsp;企业类型：企业、分支机构、个体工商户、企业相关</span></el-radio>
                <el-radio v-if='form.auth_type != 2' label="3"><span class="fz20">&nbsp;&nbsp;企业</span> <span class="fz16">&nbsp;&nbsp;企业类型：企业、分支机构、个体工商户、企业相关</span></el-radio>
              </div>
            </el-radio-group>
          </el-form-item>

          <h5>{{form.auth_type==1?'团队':'主体'}}信息登记</h5>

          <el-form-item v-if="form.auth_type!=1" label="企业类型 " prop="auth_type" class="home-type">&nbsp;
            <el-radio-group v-model="form.auth_type"  @change='changeAuthType'>
              <el-radio label="3">&nbsp;<span class='fz20'>企业</span></el-radio>
              <el-radio label="2">&nbsp;<span class='fz20'>个体商户</span></el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item :label="form.auth_type==1?'团队名称':'企业名称'" prop="company_name">
            <el-input v-model="form.company_name" class="w400" maxlength="50"></el-input>
            <div
              v-if="form.auth_type!=1"
              style="color:#808080"
            >需与当地政府颁发的商业许可证书或企业注册证上的企业名称完全一致，信息审核成功后，企业名称不可修改</div>
          </el-form-item>

          <el-form-item v-if="form.auth_type!=1" label="营业执照注册号 " prop="license_number">
            <el-input v-model="form.license_number" class="w400" maxlength="15"></el-input>
            <div v-if="form.auth_type!=1" style="color:#808080">请输入15位营业执照注册号或18位的统一社会信用代码</div>
          </el-form-item>

          <el-form-item :label="form.auth_type==1?'团队规模':'企业规模'" prop="scale">
            <el-input v-model="form.scale" class="w400"></el-input>&nbsp;人
          </el-form-item>

          <el-form-item label="擅长行业(多选)" prop="good_skills">
            <div v-if="form.good_skills">
              <el-input
                class="w100 skill-list-more"
                v-for="(item,index) in form.good_skills.split(',')"
                :value="good_skills_name[index]"
                :key="index"
                readonly
              ></el-input>
            </div>
            <div v-else>请先选择行业</div>
            <div class="clearfix">
              <a class="common-color fz16" @click="handleClick()">+选择行业</a>
            </div>
          </el-form-item>

          <h5 style="margin-left:45px">{{form.auth_type==1?'负责人':'法人'}}信息登记</h5>

          <el-form-item label="姓名 " prop="true_name">
            <el-input v-model="form.true_name" class="w400"></el-input>
            <div style="color:#808080">信息审核成功后证件姓名不可修改；</div>
          </el-form-item>

          <el-form-item label="证件号 " prop="id_card">
            <el-input v-model="form.id_card" class="w400"></el-input>
            <div v-if="form.auth_type!=1" style="color:#808080">请输入证件编码，错误证件编码审核无法通过请确认后准确性！</div>
          </el-form-item>

          <el-form-item label="证件上传(身份证)" prop="id_card_pic_face">
            <div class="upload_img_box">
              <global-upload
                :face_pic="form.id_card_pic_face?form.id_card_pic_face:'/images/console/add-user-zm.jpg'"
                @upload_pic_event="id_card_pic_face_event"
              />
            </div>
            <div class="upload_img_box">
              <global-upload
                :face_pic="form.id_card_pic_side?form.id_card_pic_side:'/images/console/add-user-fm.jpg'"
                @upload_pic_event="id_card_pic_side_event"
              />
            </div>
            <div class="upload_img_box">
              <global-upload
                :face_pic="form.id_card_pic_hand?form.id_card_pic_hand:'/images/console/add-user-sjzm.jpg'"
                @upload_pic_event="id_card_pic_hand_event"
              />
            </div>
            <div v-show="form.auth_type!=1" class="upload_img_box">
              <global-upload
                :face_pic="form.license_pic?form.license_pic:'/images/console/add-user-yyzz.png'"
                @upload_pic_event="license_pic_event"
              />
            </div>
          </el-form-item>
          <el-form-item class="demo-img">
            <img src="/images/console/add-user-zm-demo.jpg">
            <img src="/images/console/add-user-fm-demo.jpg" style="    margin-right: 40px;">
            <img src="/images/console/add-user-sjzm-demo.jpg">
            <img v-if="form.auth_type!=1" src="/images/console/add-user-yyzz-demo.png">
          </el-form-item>

          <el-form-item label="联系手机号 " prop="mobile">
          
            <el-input  v-model="form.mobile" class="w260"></el-input>
            <el-button
              v-if="isMobileCode"
              class="w140"
              type="info"
              plain
              @click="sendMobileCode"
            >获取验证码</el-button>
            <el-button v-else class="w140" type="info" plain>{{MobileCodeTime}}s</el-button>
          </el-form-item>

          <el-form-item label="短信验证码 " prop="mobile_code">
            <el-input v-model="form.mobile_code" class="w400"></el-input>
          </el-form-item>

          <el-form-item label>
            <el-button class="w100 mt-20" type="danger" @click="submit('form')">提交</el-button>
          </el-form-item>
        </el-form>

        <console-manager-store
          @dialogHide="dialogHanderHide"
          @selectIndustry="selectIndustry"
          :dialogTableVisiblee="industryIsShow"
          mixLength=1
        ></console-manager-store>
      </div>
    </div>
  </div>
</template>

<script>
import { apiShopAuth, apiSeedCode,apiShopAuthInfo,apiEditShopAuth } from "../../api/phpApi";
import consoleManagerStore from "../../components/layoutConsole/ManageSide/industry";
import Top from "../../components/other/Steps/top";

export default {
  name: "StepDatum",

  components: {
    consoleManagerStore,
    Top
  },
  data() {
    return {
      isEdit:this.$route.query.isEdit,
      isMobileCode: true,
      MobileCodeTime: 0,
      form: {
        auth_type: "1",
        company_name: "",
        scale: "",
        id_card: "",
        good_skills: "",
        true_name: "",
        id_card_pic_face: "",
        id_card_pic_side: "",
        id_card_pic_hand: "",
        license_pic: "",
        mobile: '',
        license_number: "",
        mobile_code: ""
      },
      rules: {
        good_skills: [
          { required: true, message: "请选择擅长行业", trigger: "blur" }
        ],
        auth_type: [
          { required: true, message: "请选择主体类型", trigger: "change" }
        ],
        company_name: [
          {
            required: true,
            message: "请输入团队/企业名称",
            trigger: "change"
          }
        ],
        license_number: [
          {
            required: true,
            message: "请输入营业执照注册号",
            trigger: "change"
          }
        ],
        scale: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (/^[0-9]*[1-9][0-9]*$/.test(value) == false) {
                callback(new Error("请输入大于1的整数"));
              } else {
                callback();
              }
            },
            trigger: "change"
          }
        ],
        true_name: [
          { 
             required: true,
             validator: (rule, value, callback) => {
              if ((/^[\u4E00-\u9FA5\/ ]{2,12}$/.test(value) == false && /^[a-zA-Z\/ ]{2,20}$/.test(value) == false) || value.trim().length === 0) {
                callback(new Error("请输入有效的真实姓名"));
              } else {
                callback();
              }
            },
            trigger: "change"
            }
        ],
        id_card_pic_face: [
          {
            required: true,
            message: "请上传身份证正面照",
            trigger: "blur"
          }
        ],
        id_card_pic_side: [
          {
            required: true,
            message: "请上传身份证反面照",
            trigger: "blur"
          }
        ],
        id_card_pic_hand: [
          {
            required: true,
            message: "请上传身份证手持正面照",
            trigger: "blur"
          }
        ],
        license_pic: [
          {
            required: true,
            message: "请上传营业执照",
            trigger: "blur"
          }
        ],
        id_card: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (
                /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
                  value
                ) == false
              ) {
                callback(new Error("请输入合法有效的身份证号码"));
              } else {
                callback();
              }
            },
            trigger: "change"
          }
        ],
        mobile: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (/^1(3|4|5|7|8|6|9)\d{9}$/.test(value) == false) {
                callback(new Error("请输入11位手机号码"));
              } else {
                callback();
              }
            },
            trigger: "change"
          }
        ],
        mobile_code: [
          { required: true, message: "请输入验证码", trigger: "change" }
        ]
      },
      industryIsShow: false,
      good_skills_name: []
    };
  },
 
  mounted(){

    if(this.isEdit == 'true'){
     this.get_shop_auth_info()
    }
   setTimeout(()=>{
     this.form.mobile = this.userInfo.mobile_true
   },1000);  
   },
  methods: {

      async get_shop_auth_info(){
      let { data } = await apiShopAuthInfo(this.form);   
      if(data.list){
         this.form = data.list
         this.good_skills_name = data.list.good_skills_name.split(',')
      }      
      },

    changeAuthType(){
   　　this.$refs['form'].clearValidate()
    },

    async sendMobileCode() {
      if (!this.form.mobile) {
        this.$message({
          type: "error",
          message: "请输入手机号码"
        });
        return;
      }
      this.isMobileCode = false;
      this.MobileCodeTime = 60;
      var timeHandel = setInterval(_ => {
        if (this.MobileCodeTime) {
          this.MobileCodeTime--;
        } else {
          this.isMobileCode = true;
          clearInterval("timeHandel");
        }
      }, 1000);

      let { code } = await apiSeedCode({
        mobile: this.form.mobile,
        auth_type: "shop_auth"
      });
      if (code == 200) {
        this.$message({
          type: "success",
          message: "验证码发送成功"
        });
      }
    },

    submit(form) {    
      this.$refs[form].validate(valid => {
        if (valid) {
          this.submitFun();
        }
      });
    },
    
    async submitFun() { 

     if(/.*[\u4e00-\u9fa5]+.*$/.test(this.form.true_name)) {
           this.form.true_name  = this.form.true_name.replace(/ /g,'')
      }else{
         this.form.true_name  = this.form.true_name.replace(/ /,'')
      }

      if(this.isEdit == 'true'){       
         var { code } = await apiEditShopAuth(this.form);    
      }else{
         var { code } = await apiShopAuth(this.form);     
      }

      if (code == 200) {
        this.$router.push({ path: "/enter/result" });//等待审核
      }
    },

    handleClick() {
      this.industryIsShow = true;
    },

    dialogHanderHide() {
      this.industryIsShow = false;
    },

    selectIndustry(data) {
      let id = data.id;
      let name = data.name;
      this.form.good_skills = id;
      this.good_skills_name = name;
    },

    id_card_pic_face_event(url) {
      this.form.id_card_pic_face = url;
    },

    id_card_pic_side_event(url) {
      this.form.id_card_pic_side = url;
    },

    id_card_pic_hand_event(url) {
      this.form.id_card_pic_hand = url;
    },
    license_pic_event(url) {
      this.form.license_pic = url;
    }
  }
};
</script>

<style scoped lang="less">
@import "../../assets/less/variables/index";

.user-info {
  h1 {
    font-size: 40px;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    margin-bottom: 20px;
    text-align: center;
  }
  p {
    font-size: 18px;
    text-align: center;
    margin-bottom: 43px;
  }
  .user-form {
    background: rgba(255, 255, 255, 1);
    padding: 50px 0 60px 150px;
    color: #333;
    font-size: 16px;
        width: 1200px;
    margin: 0 auto;
    margin-bottom: 100px;
    h5 {
      font-weight: 700;
      font-size: 20px;
      padding: 30px 0;
      margin-left: 64px;
    }
    .fz20{
      font-size: 20px
    }
     .fz16{
      font-size: 16px
    }
    .w400 {
      width: 400px;
    }
    .w140 {
      width: 140px;
    }
    .w260 {
      width: 260px;
    }
    .w100 {
      width: 140px;
      margin-right: 20px;
    }
    .skill-list-more{
          width: auto;
    margin-right: 20px;
    display: inline-block;
    margin-bottom: 10px;
    }
  }
}
</style>

<style lang="less">
@import "../../assets/less/variables/index";
.user-form {
  
  .el-form-item__label {
    font-size: 16px;
    color: #333;
  }
  .upload_img_box {
    float: left;
    width: 180px;
    height: 120px;
    margin-right: 20px;
    .avatar-uploader {
      border: none;
      margin-top: 0;
      width: 100%;
      height: 100%;
      .avatar {
        width: 180px;
        height: 120px;
        display: block;
      }
    }
  }
  .demo-img {
    padding-bottom: 40px;
    img {
      float: left;
      width: 180px;
      margin-right: 15px;
    }
  }
  .w100 {
    .el-input__inner {
      text-align: center;
    }
  }
}
.home-type {

  .el-radio__inner{
    vertical-align: super;
  }
}

.el-radio__input.is-checked .el-radio__inner {
  border-color: @theme-color;
  background: @theme-color;
}
.el-radio__input.is-checked + .el-radio__label {
  color: #333;
}
</style>


