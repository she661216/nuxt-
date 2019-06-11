<template>
  <section class="issue-index">
    <div class="issue-header-bg relative">
      <img class="height-100 width-100 absoluteCC" src="/images/issue_bg.png" alt>
    </div>
    <div class="common-wrapper clearfix">
      <div class="content-main l">
        <global-title title="选择您的需求类型" type="small"></global-title>
        <div class="issue-type mb-40">
          <div v-if="categoryList && categoryList.length>0">
            <button
              class="common-btn"
              v-for="(item,index) in categoryList"
              :key="index"
              :class="{active:params.cate_pid==item.id}"
              @click="selectItemHandle(item.id,index)"
            >{{item.cate_name}}</button>
          </div>
          <global-no-data v-else/>
        </div>
        <global-title title="选择您的需求子类型*" type="small"></global-title>
        <div class="issue-type mb-40" v-loading="!!loadingNum">
          <div v-if="serviceList && serviceList.length>0">
            <button
              class="common-btn"
              v-for="item in serviceList"
              :key="item.s_id"
              :class="{active:params.cate_id==item.id}"
              @click="params.cate_id=item.id"
            >{{item.cate_name}}</button>
          </div>
          <global-no-data v-else :content="params.cate_pid ? '该需求类型下暂无子类型' :'请先选择需求类型' "/>
        </div>
        <global-title title="一句话需求*" type="small"></global-title>
        <div class="issue-type mb-40">
          <textarea
            class="issue-content"
            v-model.trim="params.content"
            cols="30"
            rows="1"
            placeholder="请您输入5字以上的需求简要描述......"
          ></textarea>
        </div>
        <global-title title="您可以进一步描述您的需求：" type="small"></global-title>
        <div class="issue-type mb-40">
          <textarea class="issue-content" v-model.trim="params.content2" cols="30" rows="8" placeholder="1.需求介绍


2.参考网站/产品


3.具体要求"></textarea>
        </div>
        <!-- <global-title title="你想要服务模式" type="small"></global-title>
        <div class="clearfix">
        <global-check
        class="col-xs-6 mb-30"
        v-for="item in modelList"
        :key="item.model_id"
        v-model="item.isCheck"
        &gt;>
        <h6 :class="{'common-color':item.isCheck}" class="fs-20 color-3">{{item.title}}</h6> 
        <p class="color-9 fs-16 mt-10" :class="{'common-color':item.isCheck}">
        {{item.desc}}
        </p>
        </global-check>
        </div> -->
        <div class="color-9 pl-20 pr-20 pt-30 pb-30 bg-e fs-14 lh1-9 mb-40">
          <p>1. 您的需求提交后，为保证服务质量，我们会提供1对1的优质项目经理跟进。</p>
          <p>2. 一品优选平台会保护您的个人信息，仅有我们平台可见您的联系方式、需求内容，请您放心提供。</p>
          <p>3. 接到您的需求、建立合作方案后，团队采用项目管理制，由项目经理对整个团队的开发进度，质量进行负责把关，速度高效，对接省心；使用内部项目管理系统，过程透明，实时追踪，轻松无忧！</p>
        </div>

        <!-- <global-check class="mb-45" v-model="isAgree">
        <p class="color-3 fs-14 lh1-6">
        同意 《一品优选平台需求发布规则》
        </p>
        </global-check> -->
        <button class="common-btn active" @click="submitHandle">发布需求</button>
      </div>
      <div class="content-side r">
        <div class="side-title">选择一品优选定制平台
          <p class="mt-10">ADVANTAGE</p>
        </div>
        <ul class="side-content pd-20">
          <li v-for="(item,index) in sideList" :key="index" class="side-item mb-20">
            <img class="middle mr-15" :src="item.icon" alt>
            <span class="middle color-3">{{item.title}}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import {
  apiServiceCategory1,
  apiServiceCategory2,
  apiServiceModel,
  apiIssueSubmit
} from "../../../api/phpApi";

export default {
  // name: "issue",
  data() {
    return {
      serviceList: null,
      activeIndex: -1,
      categoryList: [],
      cate_pid: -1,
      isAgree: true,
      modelList: [],
      sideList: [
        {
          icon: "/images/issue_1.png",
          title: "项目管家 托付服务"
        },
        {
          icon: "/images/issue_2.png",
          title: "资源管理 高效协作"
        },
        {
          icon: "/images/issue_3.png",
          title: "专业团队 全程品控"
        },
        {
          icon: "/images/issue_4.png",
          title: "风险评估 无忧交付"
        }
      ],
      params: {
        cate_pid: this.$route.query.cate_pid || "",
        cate_id: this.$route.query.cate_id || "",
        content: "",
        content2: "",
        model_id: ""
      }
    };
  },
  async asyncData({ query }) {
    let modelData = await apiServiceModel({ limit: 1005, page: 1 });
    const modelList = modelData.data
      ? modelData.data.list.map(item => {
          return Object.assign({ isCheck: false }, item);
        })
      : [];

    let { data } = await apiServiceCategory1();
    const categoryList = data ? data.list : [];

    let list = null;
    if (query.cate_pid) {
      list = await apiServiceCategory2({ id: query.cate_pid });
    }
    const serviceList = list && list.data ? list.data.list : null;
    return { modelList, categoryList, serviceList };
  },
  mounted() {
    if (!this.params.cate_pid && this.categoryList.length > 0) {
      this.params.cate_pid = this.categoryList[0].id;
      this.selectItemHandle(this.params.cate_pid, 0);
    }
  },
  methods: {
    async submitHandle() {
      if (this.checkParams() && this.loadingNum === 0) {
        const { code } = await apiIssueSubmit(this.params, true);
        if (code === 200) {
          this.$message({
            type: "success",
            message: "发布成功!",
            duration: 800
          });
          setTimeout(() => {
            this.openPage({ path: "/console" });
          }, 800);
        }
      }
    },
    async selectItemHandle(id, index) {
      this.activeIndex = index;
      this.params.cate_pid = id;
      let { data } = await apiServiceCategory2({ id }, true);
      if (data) {
        this.serviceList = data.list;
      }
    },
    checkParams() {
      const isAttr = this.categoryList.filter(item => {
        return this.params.cate_pid === item.id;
      });
      const isAttr2 = this.serviceList.filter(item => {
        return this.params.cate_id === item.id;
      });
      if (isAttr.length === 0 || isAttr2.length === 0) {
        this.$message.error(
          "您尚未选择需求类型/子类型，请先完善需求类型。如有疑问请致电：0592-3793181！"
        );
        return false;
      }
      if (this.params.content.length < 5) {
        this.$message.error(
          "请输入5字以上的需求描述，便于我们快速梳理您的需求。如有疑问请致电：0592-3793181！"
        );
        return false;
      }
      if (!this.isAgree) {
        this.$message.error(
          "请先阅读并同意平台发布规则在发布需求。如有疑问请致电：0592-3793181！"
        );
        return false;
      }
      if (!this.userInfo.uid) {
        this.$confirm("未检测到登录账号，请先登录！", "提示", {
          confirmButtonText: "登录",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$router.push({
              path:
                "/user/login?from=" + encodeURIComponent(this.$route.fullPath)
            });
          })
          .catch(() => {});
        return false;
      }
      return true;
    }
  }
};
</script>

<style scoped lang="less">
@import "../../../assets/less/variables/index";

.issue-index {
  @color: #aaa;
  .issue-header-bg {
    height: 300px;
    overflow: hidden;
  }
  .issue-content {
    display: block;
    width: 100%;
    resize: none;
    border: 1px solid @color;
    padding: 23px 34px;
  }
  .common-wrapper {
    margin-top: -80px;
    position: relative;
    z-index: 1;
    margin-bottom: 100px;
  }
  .content-main {
    width: 880px;
    background: #fff;
    padding: 40px 45px;
  }
  .content-side {
    width: 300px;
    background: #fff;
    .side-title {
      color: #333;
      font-size: 20px;
      padding: 30px;
      border-bottom: 1px solid #f2f2f2;
      p {
        color: #ccc;
        font-size: 12px;
      }
    }
  }
  ::-webkit-input-placeholder {
    font-size: 14px;
  }
}
</style>
