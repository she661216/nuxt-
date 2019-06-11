<template>
  <section class="login-index">
    <div class="common-wrapper relative login-index-content">
      <div ref="ruleForm" :model="formParams" class="form-wrapper absoluteRC bg-f">
        <template v-if="action==='register'">
          <h6 class="form-title mb-30 fs-20">欢迎加入一品优选
            <div class="r color-9 fs-12">已有账号，
              <nuxt-link
                :to="$route.query.from == 'application'?'/user/login?from=application':'/user/login'"
                class="common-color select-login-btn"
              >直接登录></nuxt-link>
            </div>
          </h6>

          <div class="form-item">
            <input
              class="width-100"
              v-model.trim="formParams.account"
              type="text"
              maxlength="11"
              placeholder="请输入您的手机号"
            >
          </div>

          <div class="form-item clearfix">
            <input
              class="l code-input"
              v-model.trim="formParams.code"
              type="text"
              placeholder="请输入您的验证码"
            >
            <div
              class="r code-btn"
              type="button"
              @click="getCodeHandle('register_mobile')"
            >{{btnText}}</div>
          </div>

          <div class="form-item">
            <input
              class="width-100"
              v-model.trim="formParams.password"
              type="password"
              placeholder="登录密码设置（6-20位数字+英文）"
            >
          </div>

          <div class="form-item">
            <input
              class="width-100 submit-btn"
              :class="{disabled: !isAgree}"
              @click="submitHandle()"
              type="button"
              value="注册"
            >
          </div>

          <div class="color-6 fs-12 lh1-5">
            <global-check class-name="ml-20" v-model="isAgree" size="16px">
              <!--《一品优选服务条款》|-->
              <a href="http://www.epwk.com/about-view-service.html" target="_blank">《法律声明及隐私权政策》</a>
            </global-check>
          </div>
        </template>

        <template v-if="action==='login'">
          <h6 class="form-title mb-30 fs-20">用户登录</h6>

          <div class="form-item">
            <input
              class="width-100"
              maxlength="11"
              v-model="formParams.account"
              type="text"
              placeholder="账号"
            >
          </div>

          <div class="form-item">
            <input class="width-100" v-model="formParams.password" type="password" placeholder="密码">
          </div>

          <div class="form-item">
            <captcha @callSuccess="captchaOk" color="orange" resolve="text"></captcha>
          </div>
          <!--<div id="your-dom-id" class="nc-container form-item"></div>-->
          <!--No-Captcha渲染的位置，其中 class 中必须包含 nc-container-->
          <!--<div id="nc"></div>-->
          <div class="form-item">
            <input
              class="width-100 submit-btn"
              :class="{disabled:!isCaptcha}"
              type="button"
              :disabled="!isCaptcha"
              @click="submitHandle()"
              value="登录"
            >
          </div>
          <div class="clearfix">
            <div class="r fs-14">
              <a href="/user/forget" class="mr-20 inline">忘记密码</a>
              <a
                :href="$route.query.from == 'application'?'/user/register?from=application':'/user/register'"
              >免费注册</a>
            </div>
          </div>
        </template>

        <template v-if="action==='forget'">
          <h6 class="form-title mb-30 fs-20">忘记密码
            <div class="r color-9 fs-12">放弃修改，
              <nuxt-link to="/user/login" class="common-color select-login-btn">返回登录></nuxt-link>
            </div>
          </h6>
          <div class="form-item">
            <input
              class="width-100"
              type="text"
              v-model.trim="formParams.account"
              placeholder="请输入您的手机号"
              maxlength="11"
            >
          </div>

          <div class="form-item clearfix">
            <input
              class="l code-input"
              type="text"
              v-model.trim="formParams.code"
              placeholder="请输入您的验证码"
            >
            <div class="r code-btn" @click="getCodeHandle('find_password_mobile')">{{btnText}}</div>
          </div>

          <div class="form-item">
            <input
              class="width-100"
              type="password"
              v-model.trim="formParams.password"
              placeholder="登录密码设置（6-20位数字+英文）"
            >
          </div>

          <div class="form-item">
            <input
              class="width-100"
              type="password"
              v-model.trim="formParams.yesPassword"
              placeholder="请再次确认您的密码"
            >
          </div>

          <div class="form-item">
            <input class="width-100 submit-btn" @click="submitHandle()" type="button" value="确认修改">
          </div>
        </template>
      </div>

      <div class="title color-f absoluteLC" style="left:270px;top:280px">
      <p class="fs-40 pb-30 font-blod">定制开发服务就找一品优选</p>
      <p style="font-size: 60px">省心 省钱 更高效！</p>
    </div>
    </div>

    <el-dialog
      title="友情提示，页面跳转中..."
      :visible.sync="dialogVisible"
      :before-close="goConsole"
      width="500px"
      style="top:20%"
      center
    >
      <p class="fs-14 mb-40 text-center">您已登录本站 {{goTime}} 秒后自动跳转</p>
      <div class="fs-14 text-center">如您的浏览器不能跳转，请点击
        <global-button @click="goConsole">这里</global-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import { mapMutations } from "vuex";
import { apiSeedCode, apiForgetPass, apiIsNewUser } from "../../api/phpApi";
import { apiLogin, apiRegister, apiGetUserInfo } from "../../api/nodeApi";
import Captcha from "../../components/other/Captcha";
import getCodeMixin from "../../mixins/getCodeMixin";
import { setLocalStore, getLocalStore } from "../../utils/storeUtils";

export default {
  name: "login",
  layout: "login",
  components: {
    Captcha
  },
  mixins: [getCodeMixin],
  data() {
    return {
      action: "register",
      isCaptcha: false,
      isAgree: false,
      isNewUser: false,
      dialogVisible: false,
      goTime: 3,
      apiFunc: {
        register: {
          api: apiRegister,
          message: "注册成功",
          successPath: { path: "/console" }
        },
        login: {
          api: apiLogin,
          message: "登录成功",
          successPath: { path: "/console" }
        },
        forget: {
          api: apiForgetPass,
          message: "修改成功",
          successPath: { name: "user-action", params: { action: "login" } }
        }
      },
      formParams: {
        account: "",
        password: "",
        yesPassword: "",
        code: ""
      },
      interTime: null,
      fromPath: this.$route.query.from
        ? decodeURIComponent(this.$route.query.from)
        : ""
    };
  },
  async asyncData({ params }) {
    return { action: params.action || "login" };
  },
  mounted() {
    if (this.userInfo.uid && getLocalStore("Authorization")) {
      this.dialogVisible = true;
      this.interTime = setInterval(_ => {
        this.goTime--;
        if (this.goTime <= 0) {
          this.goConsole();
        }
      }, 1000);
    }
  },
  methods: {
    ...mapMutations(["SET_USER"]),
    async submitHandle() {
      let { account, password, yesPassword, code } = this.formParams;
      let params = {};
      if (!account) {
        this.$message({
          message:
            this.action === "login" ? "账号不能为空！" : "请输入有效手机号！",
          type: "error",
          duration: 1500
        });
        return;
      }
      if (!code && (this.action === "register" || this.action === "forget")) {
        this.$message({
          message: "验证码不能为空！",
          type: "error",
          duration: 1500
        });
        return;
      }
      if (!password) {
        this.$message({
          message: "密码不能为空！",
          type: "error",
          duration: 1500
        });
        return;
      }
      if (!password) {
        this.$message({
          message: "密码不能为空！",
          type: "error",
          duration: 1500
        });
        return;
      }
      if (this.action === "login") {
        if (!this.isCaptcha) {
          this.$message({
            message: "请按住滑块，拖动到最右边！",
            type: "error",
            duration: 1500
          });
          return;
        }
        params.txt_account = account;
        params.pwd_password = password;
      } else if (this.action === "register") {
        if (!this.isAgree) {
          this.$message({
            message: "请认真阅读《法律声明及隐私权政策》，并确认！",
            type: "error",
            duration: 3000
          });
          return;
        }

        params.mobile = account;
        params.pwd_password = password;
        params.phone_code = code;
      } else if (this.action === "forget") {
        params.mobile = account;
        params.phone_code = code;
        params.password_one = password;
        params.password_two = yesPassword;
      }
      let data = await this.apiFunc[this.action].api(params, true);
      if (data.code === 200) {
        if (this.action !== "forget") {
          setLocalStore("Authorization", data.jwt);
          let userData = await apiGetUserInfo({}, false);
          if (userData.code !== 200) return;
          this.SET_USER(Object.assign({ jwt: data.jwt }, userData.data.list));
          setLocalStore("AuthUserInfo", JSON.stringify(userData.data.list));
          if (this.$route.query.from == "application") {
            if (userData.data.list.user_type != 2) {
              this.$router.push({ path: "/enter/result" });
            } else {
              this.$router.push({ path: "/console/manage-console" });
            }
            return;
          }
        }
        if (this.action == "forget") {
          this.$message({
            title: "成功",
            message: this.apiFunc[this.action].message,
            type: "success",
            duration: 500
          });
        }

        setTimeout(_ => {
          if (this.fromPath && this.action !== "forget") {
            this.openPage({ path: this.fromPath });
            return;
          }
          // this.$router.push(this.apiFunc[this.action].successPath)
          this.openPage(this.apiFunc[this.action].successPath);
        }, 500);
      }
    },
    captchaOk() {
      this.isCaptcha = true;
    },
    async getCodeHandle(type) {
      if (this.isGetCode) return;
      if (type === "register_mobile") {
        await this.checkUser();
        if (!this.isNewUser) return;
      }
      this.getCode(apiSeedCode, {
        mobile: this.formParams.account,
        auth_type: type
      });
    },
    async checkUser() {
      if (this.formParams.account.length !== 11) {
        this.$message({
          message: "请输入有效手机号！",
          type: "error",
          duration: 1500
        });
        return;
      }
      let { code } = await apiIsNewUser(
        { mobile: this.formParams.account },
        true
      );
      this.isNewUser = code === 200;
    },
    goConsole() {
      this.interTime && clearInterval(this.interTime);
      this.$router.push({ path: "/console" });
    }
  }
};
</script>

<style lang="less">
@import "../../assets/less/variables/index";

.login-index {
  background: url("../../assets/images/login_bg.png") no-repeat center;
  background-size: 100% 100%;
  .select-login-btn {
    cursor: pointer;
  }
  .login-index-content {
    height: 568px;
  }
  .form-wrapper {
    width: 430px;
    padding: 30px;
    .form-item {
      margin-bottom: 20px;
      border: 1px solid rgba(230, 230, 230, 1);
    }
    input {
      height: 40px;
      text-indent: 13px;
      font-size: 14px;
    }
    .code-input {
      line-height: 38px;
    }
    .code-btn {
      width: 96px;
      height: 40px;
      line-height: 40px;
      background: rgba(230, 230, 230, 1);
      font-size: 14px;
      color: #808080;
      text-indent: 0px;
      cursor: pointer;
      text-align: center;
      &.disabled {
        cursor: not-allowed;
      }
    }
    .submit-btn {
      display: block;
      background: @theme-color;
      color: #fff;
      cursor: pointer;
      text-indent: 0;
      height: 40px;
      &.disabled {
        cursor: not-allowed;
      }
    }
  }
  .nc_scale {
    height: 38px;
    /*background: #e8e8e8; !* 默认背景色 *!*/
  }
  .nc_scale .scale_text {
    color: #9c9c9c; /* 默认字体颜色 */
  }
 
  .nc_scale .scale_text2 {
    color: #fff; /* 滑过时的字体颜色 */
  }

  .nc-container .nc_scale .btn_ok {
    height: 38px;
    line-height: 38px;
    /*left: 328px !important;*/
    border: none;
  }
  .nc-container #nc_1_wrapper,
  .nc-container.tb-login #nc_1_wrapper {
    width: 100%;
  }
  .nc-container .nc_scale span {
    height: 38px;
    line-height: 38px;
  }
}
</style>
