<template>
  <div>
    <div class="main common-content message-index mb-30">
      <h6 @click="$router.back(-1)">&lt;&lt;返回工作台</h6>
      <div>
        <global-upload :face_pic="form.face_pic" @upload_pic_event="handleAvatar"/>

        <div class="info">
          <p>团队</p>
          <p>商铺综合评分：{{form.syn_score?form.syn_score:'--'}}</p>
          <p>优选成长时间：{{form.add_youxuan_days?form.add_youxuan_days:'--'}}</p>
        </div>

        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
          <el-form-item label="商铺昵称：" prop="shop_name">
            <el-input v-model="form.shop_name" placeholder="一品威客股份有限公司（15字以内商铺昵称）" maxlength="15"></el-input>
          </el-form-item>

          <el-form-item label="团队/公司名称：">
            <p>{{form.company_name}}</p>
          </el-form-item>

          <el-form-item label="擅长行业：" class="hy hy_input">
            <div v-if="form.good_skills.length">
              <el-input
                v-for="(item,index) in form.good_skills.split(',')"
                :value="good_skills_name[index]"
                :key="index"
                readonly
              ></el-input>
              <a @click="handleClick()">修改</a>
            </div>
          </el-form-item>

          <el-form-item label="地理位置：" prop="area">
            <console-manager-address
              @selectAddressData="selectAddressData"
              widthData="480px"
              :province="form.province"
              :city="form.city"
              :area="form.area"
            ></console-manager-address>
          </el-form-item>

          <el-form-item label>
            <el-input v-model="form.address" placeholder="详细地址（楼栋-楼层-单元）"></el-input>
          </el-form-item>

          <el-form-item label="商铺描述" prop="shop_desc">
            <el-input
              :rows="5"
              v-model="form.shop_desc"
              type="textarea"
              maxlength="1500"
              placeholder="请输入1500字以内的商铺描述"
            ></el-input>
          </el-form-item>

          <el-form-item label>
            <el-button type="danger" style="  width: 120px;" @click="submitForm('form')">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="history-content">
      <h6 class="fs-20 font-blod">成员管理</h6>
      <button
        class="color-link pt-20 pb-20 absoluteRT"
        @click="$router.push({path:'/console/manage-console/add-user',query: {shop_name:form.shop_name,good_skills_name: good_skills_name?good_skills_name:[]}})"
      >+添加成员</button>
      <div class="issue-typerelative">
        <div class="clearfix" v-if="kbList.length > 0">
          <template v-for="(item,index) in kbList">
            <div
              :key="index"
              class="contain-box"
              @click="$router.push({path:'/console/manage-console/add-user',query: {t_id:item.t_id,check_status:item.check_status}})"
            >
              <img :src="item.face_pic">
              <div class="box">
                <p class="row1 mb-5 c333 fz16">
                 {{item.true_name.slice(0,1)}}** ({{item.nick_name}})&nbsp;&nbsp;&nbsp;
                  <span class="c666 fz14">{{item.position_type_name}}</span>
                </p>
                <p class="row1 mb-5 c666 fz14">{{item.add_work_time}}年工作经验</p>
                <p class="row1 mb-5 c666 fz14">{{item.school}}{{item.major}}</p>
              </div>
              <div class="state">
                <div class="wait" v-if='item.check_status==1'>待审核</div>
                <div class="success" v-if='item.check_status==2'>审核成功</div>
                <div class="fail" v-if='item.check_status==3'>审核失败</div>
              </div>
            </div>
          </template>
        </div>
        <global-no-data v-else content="暂无成员数据"/>
      </div>
    </div>

    <console-manager-side/>

    <console-manager-store
      @dialogHide="dialogHanderHide"
      @selectIndustry="selectIndustry"
      :dialogTableVisiblee="industryIsShow"
      :killsId="killsId"
    ></console-manager-store>
  </div>
</template>

<script>
import {
  apiShopInfo,
  apiGetAreaProvince,
  apiGetAreaCity,
  apiGetAreaArea,
  apiEditShopInfo,
  apiGetShopTalentList
} from "../../../api/phpApi";

import { baseURL, nodeApi } from "../../../config";
import consoleManagerSide from "../../../components/layoutConsole/ManageSide/index";
import consoleManagerStore from "../../../components/layoutConsole/ManageSide/industry";
import consoleManagerAddress from "../../../components/layoutConsole/ManageSide/address";

export default {
  name: "store-detail",
  layout: "console",
  components: {
    consoleManagerSide,
    consoleManagerStore,
    consoleManagerAddress
  },
  data() {
    return {
      form: {
        id: "",
        province: "",
        city: "",
        area: "",
        shop_name: "",
        face_pic: "",
        good_skills: "",
        address: "",
        shop_desc: ""
      },
      rules: {
        area: [
          {
            required: true,
            message: "请选择所在省市区",
            trigger: "blur,change"
          }
        ],
        shop_name: [
          { required: true, message: "请输入商铺名称", trigger: "blur" }
        ],
        shop_desc: [
          { required: true, message: "请输入商铺描述", trigger: "blur" }
        ]
      },
      kbList: [],
      industryIsShow: false,
      killsId: [],
      provinceList: [],
      cityList: [],
      areaList: [],
      good_skills_name: [],
      action: `${nodeApi}/backend/api/uc_ajax_upload_one`
    };
  },

  mounted() {
    this.getShopInfo();
    this.getShopTalentList();
    this.getAreaProvince();
  },

  methods: {
    handleAvatar(val) {
      this.form.face_pic = val;
    },

    handleClick() {
      this.killsId = this.form.good_skills.split(","); //字符串格式
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

    selectAddressData(data) {
      this.form.province = data.province;
      this.form.city = data.city;
      this.form.area = data.area;
    },

    async submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.submitFormFun(this.form);
        }
      });
    },

    async submitFormFun(param) {
      let { code } = await apiEditShopInfo(param);
      if (code == 200) {
        this.$message({
          type: "success",
          message: "保存成功!",
          duration: 800
        });
      setTimeout(_ => {
      this.openPage({path: '/console'})
            }, 800)

      }
    },

    async getShopInfo() {
      let { data } = await apiShopInfo();

      if (data) {
        data = data.list;
        this.form.good_skills = data.good_skills;
        this.good_skills_name = data.good_skills_name.split(",");
        this.form.province = data.province ? data.province : "";
        this.form.city = data.city ? data.city : "";
        this.form.area = data.area ? data.area : "";

        this.form.id = data.shop_id ? data.shop_id : "";
        this.form.company_name = data.company_name ? data.company_name : "";
        this.form.shop_name = data.shop_name ? data.shop_name : "";
        this.form.face_pic = data.face_pic ? data.face_pic : "";
        this.form.address = data.address ? data.address : "";
        this.form.shop_desc = data.shop_desc ? data.shop_desc : "";
        this.form.add_youxuan_days = data.add_youxuan_days ? data.add_youxuan_days : "";
        this.form.syn_score = data.syn_score ? data.syn_score : "";
      }
    },

    async getShopTalentList() {
      let { data } = await apiGetShopTalentList({ limit: 100, page: 1 });
      this.kbList = data ? data.list : [];
    },

    async getAreaProvince() {
      let { data } = await apiGetAreaProvince();
      this.provinceList = data ? data : [];
    },

    async getAreaCity(id) {
      let { data } = await apiGetAreaCity({ id: id });
      this.cityList = data ? data : [];
    },

    async getAreaArea(id) {
      let { data } = await apiGetAreaArea({ id: id });
      this.areaList = data ? data : [];
    },

    async selectProvince(id) {
      this.getAreaCity(id);
    },

    async selectCity(id) {
      this.getAreaArea(id);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/less/variables/index";

.main.common-content {
  background: #fffefe;
  margin-right: 324px;
  padding: 30px 40px;

  > h6 {
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
  }
  .hy {
    .el-input {
      margin-right: 20px;
      margin-bottom: 10px;
      width:150px;
    }
    a {
      position: absolute;
      right: -45px;
      top: 0px;
      color: @theme-color;
      cursor: pointer;
    }
    .el-input:first-child {
      margin-left: 0px;
    }
  }

  .tx {
    width: 150px;
    height: 150px;
    margin: 0 auto;
    background: #cdcdcd;
  }
  .info {
    text-align: center;
    margin: 20px 0 50px 0;
    p {
      display: inline;
      margin-right: 60px;
    }
  }
  .el-form {
    width: 680px;
    margin: 0 auto;
  }
  .common-color {
    color: @theme-color!important;
    border: 1px solid @theme-color;;
    padding: 10px 30px;
    margin-top: 10px;
    border-radius: 5px;
    background: #fff2f2;
  }
  .el-select {
    width: 143px;
  }
}
.history-content {
  background: #fff;
  position: relative;
  margin-right: 324px;
  .history-btns {
    margin-right: 100px;
    padding: 0 70px;
    .box {
      margin-top: 13px;
      float: left;
      margin-right: 100px;
      p {
        text-align: center;
        line-height: 30px;
        span {
          font-size: 20px;
        }
      }
      p:first-child {
        font-size: 30px;
      }
      p:last-child {
        font-size: 16px;
      }
    }
  }
  h6 {
    padding: 30px 40px 20px 40px;
    border-bottom: 1px solid #e6e6e6;
  }
  .issue-typerelative {
    min-height: 165px;
    padding: 47px 60px;
    margin-bottom: 60px;
    -webkit-box-shadow: 0px 10px 40px 0px rgba(0, 0, 0, 0.1);
    box-shadow: 0px 10px 40px 0px rgba(0, 0, 0, 0.1);

    .contain-box {
      margin-bottom: 40px;
      float: left;
      width: 33%;
      overflow: hidden;
      cursor: pointer;
      .state {
        text-align: center;
        width: 80px;

        div {
          display: inline-block;
          margin: 0 auto;
          font-size: 12px;
          border-radius: 5px;
          padding: 5px 8px;
          margin-top: 5px;
        }
        .wait{
            border: 1px solid #d70c19;
            color:#d70c19
        }
          .success{
            border: 1px solid #d99511;
            color:#fff;
            background: #d99511;
        }
          .fail{
     border: 1px solid #d6d6d6;
    color: #958f8f;
    background: #d6d6d6;
        }
      }
    }
    img {
      width: 80px;
      height: 80px;
      float: left;
      margin-right: 40px;
      border-radius: 100px;
    }
    .box {
      overflow: hidden;
      line-height: 23px;

      .c333 {
        color: #333;
      }
      .c666 {
        color: #666;
      }
      .fz14 {
        font-size: 14px;
      }
      .fz16 {
        font-size: 16px;
      }
    }
    a.color-link {
      color: @theme-color !important;
    }
  }
  .absoluteRT {
    position: absolute;
    top: 7px;
    right: 63px;
    color: @theme-color!important;
  }
}
.el-button--danger {
  color: #fff;
  background-color: @theme-color;;
  border-color: @theme-color;;
}
.avatar-uploader {
  text-align: center;
  margin: 0 auto;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 150px;
  height: 150px;
  margin-top: 60px;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
