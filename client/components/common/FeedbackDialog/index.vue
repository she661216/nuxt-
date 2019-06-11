<template>
  <el-dialog class="feedback-dialog" :visible.sync="dialogFeedbackVisible" width="700px">
    <el-form :model="feedbackParams" :rules="rules" ref="ruleForm" class="demo-ruleForm">
      <div class="form-wrapper bg-f">
        <h6 class="form-title mb-30 fs-20">
          您的建议反馈，是我们不断成长的动力！
        </h6>
        <div class="clearfix relative">
          <span class="l label-name"><span class="color-red middle">*</span>建议内容</span>
          <el-form-item class="form-box " prop="content">
              <textarea
                v-model="feedbackParams.content"
                class="feedback-content"
                :maxlength="maxLength"
                minlength="5"
              ></textarea>
          </el-form-item>
          <span class="absoluteRB fs-14 color-9 mr-15">{{feedbackParams.content.length}}/{{maxLength}}</span>
        </div>

        <div class="clearfix mt-20">
          <span class="l label-name">联系方式</span>
          <div class="form-box">
            <div class="relative">
              <img class="absoluteLC" src="/images/feed_qq.png" alt="">
              <div class="form-item">
                <input
                  v-model="feedbackParams.qq"
                  class="width-100"
                  type="text"
                  placeholder="是否方便留下您的QQ？"
                />
              </div>
            </div>
            <div class="relative">
              <img class="absoluteLC" src="/images/feed_msg.png" alt="">
              <div class="form-item">
                <input
                  v-model="feedbackParams.email"
                  class="width-100"
                  type="text"
                  placeholder="是否方便留下您的邮箱？"
                />
              </div>
            </div>
            <div class="relative">
              <img class="absoluteLC" src="/images/feed_phone.png" alt="">
              <div class="form-item">
                <input
                  v-model="feedbackParams.mobile"
                  class="width-100"
                  type="text"
                  placeholder="是否方便留下您的手机号码？"
                />
              </div>
            </div>

            <div class="relative">
              <div class="form-item form-item__border0 pt-10">
                <input class="cancel-btn mr-20" type="button" value="取消" @click="clearParam"/>
                <input class="submit-btn" type="button" value="提交" @click="submitHandle"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import {apiFeedback} from '../../../api/phpApi'

  export default {
    name: 'FeedbackDialog',
    data () {
      return {
        maxLength: 500,
        feedbackParams: {
          content: '',
          qq: '',
          email: '',
          mobile: ''
        },
        rules: {
          content: [
            {required: true, message: '请输入反馈内容', trigger: 'blur'},
            {min: 6, message: '请输入5字以上的反馈描述', trigger: 'blur'}
          ]
        }
      }
    },
    computed: {
      ...mapState({
        dialogFeedbackVisible: state => state.common.dialogFeedbackVisible
      })
    },
    methods: {
      ...mapMutations(['SET_FEEDBACK_VISIBLE']),
      submitHandle () {

        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            if (!this.feedbackParams.qq && !this.feedbackParams.email && !this.feedbackParams.mobile) {
              this.$message({
                message: '请至少填写一个联系方式！',
                type: 'error',
                duration: 2 * 1000
              })
              return
            }
            this.submit()
          }
        })
      },
      async submit () {
        let {code} = await apiFeedback(this.feedbackParams, true)
        if (code === 200) {
          this.$message({
            message: '您的反馈我们已收到，感谢您对一品优选的支持！',
            type: 'success',
            duration: 2 * 1000
          })
          this.clearParam()
        }
      },
      clearParam () {
        Object.keys(this.feedbackParams).forEach(key => {
          this.feedbackParams[key] = ''
        })
        this.SET_FEEDBACK_VISIBLE(false)
      }
    }
  }
</script>

<style lang="less">
  @import "../../../assets/less/variables/index";

  .feedback-dialog {
    .el-dialog__header {
      display: none;
    }
    .el-dialog__body {
      padding: 0;
    }
    .form-wrapper {
      /*position: fixed;*/
      /*top: 50%;*/
      /*left: 50%;*/
      /*transform: translate3d(-50%, -50%, 0);*/
      width: 100%;
      padding: 30px;
      z-index: 5;
      .label-name {
        display: block;
        width: 80px;
        text-align: right;
        color: #999;
        font-size: 16px;
      }
      .form-box {
        padding-left: 100px;
      }
      .feedback-content {
        display: block;
        width: 100%;
        line-height: 20px;
        border: 1px solid rgba(230, 230, 230, 1);
        padding: 15px 15px 30px;
        height: 150px;
        overflow: auto;
        user-select: none;
        resize: none;
      }
      .form-item {
        margin-left: 40px;
        height: 40px;
        margin-bottom: 20px;
        line-height: 38px;
        border: 1px solid rgba(230, 230, 230, 1);
        &.form-item__border0 {
          border: none;
        }
      }
      input {
        text-indent: 13px;
        font-size: 14px;
      }
   
      .code-btn {
        width: 96px;
        height: 40px;
        background: rgba(230, 230, 230, 1);
        font-size: 14px;
        color: #808080;
      }
      .submit-btn {
        background: @theme-color;
        color: #fff;
        cursor: pointer;
        text-indent: 0;
        width: 140px;
        height: 40px;
      }
      .cancel-btn {
        background: #e6e6e6;
        text-indent: 0;
        width: 140px;
        cursor: pointer;
        color: #999;
        height: 40px;
      }
    }
  }

</style>
