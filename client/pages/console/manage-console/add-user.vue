<template>
  <div class="main common-content message-index mb-30 add-user-content">
    <h6 class="pad30">
      {{shop_name}}&nbsp;&nbsp;&nbsp;
      <span
        v-for="(item,index) in good_skills_name"
        :key="index"
      >{{index?' | ':''}} {{item}}</span>
    </h6>
    <div :class="t_id?'detail_class':''">
      <div class="pad30 mt-40 circle">
        <global-upload :face_pic="form.face_pic" @upload_pic_event="face_pic_event"/>

        <div class="info">
          <div v-if="!t_id" style="color:#de3741">上传头像</div>
        </div>
      </div>
    </div>

    <el-form ref="form" :model="form" :rules="rules" label-width="124px" class="pad30">
      <div :class="t_id?'detail_class':''">
        <h5>基本信息</h5>
        <el-form-item label="成员类型：" prop="position_type">
          <el-radio-group v-model="form.position_type" v-if="!t_id">
            <el-radio label="4">总监</el-radio>
            <el-radio label="3">主管</el-radio>
            <el-radio label="2">核心员工</el-radio>
            <el-radio label="1">普通员工</el-radio>
          </el-radio-group>
          <span v-else>{{form.position_type_name}}</span>
        </el-form-item>

        <div class="clearfix">
          <el-form-item label="姓名：" class="hy" prop="true_name">
            <el-input class="w140" v-model="form.true_name" placeholder="请输入姓名"></el-input>
            <el-select v-model="form.sex" class="w140" placeholder="请选择">
              <el-option value="1" label="男">男</el-option>
              <el-option value="2" label="女">女</el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="昵称：" class="hy" prop="nick_name">
            <el-input v-model="form.nick_name" class="w300" placeholder="请输入15字昵称" maxlength="15"></el-input>
          </el-form-item>
          <el-form-item label="手机号：" class="hy" prop="mobile">
            <el-input v-model="form.mobile" class="w300" placeholder="请输入有效的11位手机号码" maxlength="11"></el-input>
          </el-form-item>
        </div>

        <div class="clearfix">
          <el-form-item label="身份证：" class="hy" prop="id_card">
            <el-input v-model="form.id_card	" placeholder="请输入合法有效的身份证编码" class="w300"></el-input>
          </el-form-item>
          <el-form-item label="证件有效时间：" class="hy" prop="id_card_effective">
            <el-select v-model="form.id_card_effective" class="w300" placeholder="请选择">
              <el-option value="1" label="五年有效">五年有效</el-option>
              <el-option value="2" label="十年有效">十年有效</el-option>
              <el-option value="3" label="二十年有效">二十年有效</el-option>
              <el-option value="4" label="终生有效">终生有效</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系邮箱：" class="hy" prop="email">
            <el-input v-model="form.email" placeholder="请输入有效的邮箱" class="w300"></el-input>
          </el-form-item>
        </div>

        <div class="clearfix" v-if="check_status!= 2">
          <el-form-item label="证件照：">
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
          </el-form-item>
        </div>

        <el-form-item class="demo-img" v-if="check_status!= 2">
          <img src="/images/console/add-user-zm-demo.jpg">
          <img src="/images/console/add-user-fm-demo.jpg" style="    margin-right: 40px;">
          <img src="/images/console/add-user-sjzm-demo.jpg">
        </el-form-item>
      </div>

      <h5>人才信息</h5>
      <div>
        <el-form-item v-if="!t_id" label="所在城市：" :class="t_id?'detail_class hy':'hy'" prop="area">
          <console-manager-address
            @selectAddressData="selectAddressData"
            :province="form.province"
            :city="form.city"
            :area="form.area"
            widthData="100%"
          ></console-manager-address>
        </el-form-item>
        <el-form-item v-else label="所在城市：" class="hy" prop="area">
          <div class="w300">{{form.province_name}}{{form.city_name}}{{form.area_name}}</div>
        </el-form-item>

        <el-form-item
          v-if="!t_id"
          label="参加工作时间："
          :class="t_id?'detail_class hy':'hy'"
          prop="add_work_time"
        >
          <el-date-picker
            class="w300"
            v-model="form.add_work_time"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期："
          ></el-date-picker>
        </el-form-item>
        <el-form-item v-else label="参加工作时间：" class="detail_class hy" prop="add_work_time">
          <el-input v-model="form.add_work_time" class="w300"></el-input>
        </el-form-item>

        <el-form-item
          v-if="!t_id || (check_status==2 && isEdit)"
          label="岗位："
          :class="t_id && !isEdit?'detail_class hy':'hy'"
          prop="talent_c_id"
        >
          <el-select
            v-model="form.talent_c_pid"
            placeholder="请选择"
            class="w140"
            @change="selectPinDao"
          >
            <el-option
              v-for="item in talent_skills_all"
              :key="item.id"
              :label="item.cate_name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select
            v-model="form.talent_c_id"
            placeholder="请选择"
            class="w140"
            @change="selectZhiNeng"
          >
            <el-option
              v-for="item in talent_skills_all_child"
              :key="item.id"
              :label="item.cate_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-else label="岗位：" class="detail_class hy" prop="add_work_time">
          <el-input v-model="form.position" class="w300"></el-input>
        </el-form-item>
      </div>

      <div :class="t_id?'detail_class':''">
        <el-form-item label="学历：" class="hy" prop="education">
          <el-select v-model="form.education" class="w300" placeholder="请选择">
            <el-option label="高中" value="1">高中</el-option>
            <el-option label="专科" value="2">专科</el-option>
            <el-option label="本科" value="3">本科</el-option>
            <el-option label="研究生" value="4">研究生</el-option>
            <el-option label="博士" value="5">博士</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="毕业院校：" class="hy" prop="school">
          <el-input v-model="form.school" placeholder="请输入您的最高学位毕业院校" class="w300"></el-input>
        </el-form-item>
        <el-form-item label="专业：" class="hy" prop="major">
          <el-input v-model="form.major" placeholder="请输入您的专业名称" class="w300"></el-input>
        </el-form-item>
      </div>

      <div class="jnbq">
        <el-form-item label="技能标签：" class="hy" prop="skills_span">
          <el-checkbox-group
            v-model="form.skills_span"
            v-if="!t_id ||  (check_status==2 && isEdit)"
          >
            <el-checkbox-button
              v-for="(v,m) in talent_skills_all_child_child"
              :label="v.id"
              :key="m"
            >{{v.cate_name}}</el-checkbox-button>
          </el-checkbox-group>
          <span v-else v-for="(v,m) in form.skills_span_arr" :key="m" class="skills_span_arr">{{v}}</span>
        </el-form-item>
      </div>

      <div :class="t_id && !isEdit?'detail_class':''">
        <h5>自我评价</h5>
        <el-form-item label="评价：" class="zwpj" prop="evaluate">
          <el-input
            v-if="!t_id || isEdit"
            type="textarea"
            :rows="4"
            v-model="form.evaluate"
            placeholder="请输入1000字以内的个人评价，让客户看到你的优势！"
            width="100px"
            maxlength="1000"
          ></el-input>
          <span v-else>{{form.evaluate}}</span>
        </el-form-item>

        <h5>工作经历</h5>

        <div v-for="(item,index) in form.experience" :key="index">
          <div class="title-work">
            <p>{{item.company_name}}</p>
            <p>{{item.p_name}}</p>
            <div class="right">
              <p>{{item.p_start_time}} - {{item.p_end_time}}</p>
              <a @click="handleClick(item,index)" v-if="!t_id || isEdit">编辑</a>
              <a @click="delHandleClick(item,index)" v-if="!t_id || isEdit">删除</a>
            </div>
          </div>

          <div class="text-work">
            <p>{{item.p_content}}</p>
          </div>
        </div>

        <div class="jy" v-if="!t_id || isEdit">
          <p @click="handleClick" v-if="form.experience.length < 6">
            <i>+</i>添加工作经验
          </p>
        </div>
      </div>
      <el-form-item label style="    padding: 60px 0;text-align: center;">
        <el-button
          type="info"
          @click="close"
          style=" background:#e6e6e6; border:none;color:#999;  width: 140px;"
        >取消</el-button>
        <el-button
          v-if="(!t_id || isEdit) && check_status!=1"
          type="danger"
          @click="submitForm('form')"
          style="width: 140px;"
        >提交</el-button>
        <el-button
          v-if="t_id && !isEdit  && check_status!=1"
          type="danger"
          @click="isEdit = true"
          style="width: 140px;"
        >编辑</el-button>
      </el-form-item>
    </el-form>

    <console-manager-side/>
    <console-manager-add
      @dialogHide="dialogHanderHide"
      :oldWorkData="oldWorkData"
      @workData="workData"
      :dialogTableVisiblee="storeIsShow"
    ></console-manager-add>
  </div>
</template>

<script>
import {
  apiGetTalentSkillsAll,
  apiAddShopTalent,
  apiGetShopTalentInfo,
  apiEditShopTalent
} from "../../../api/phpApi";
import consoleManagerAdd from "../../../components/layoutConsole/ManageSide/add";
import consoleManagerSide from "../../../components/layoutConsole/ManageSide/index";
import consoleManagerAddress from "../../../components/layoutConsole/ManageSide/address";

export default {
  name: "message",
  layout: "console",
  components: {
    consoleManagerSide,
    consoleManagerAdd,
    consoleManagerAddress
  },
  data() {
    return {
      check_status: this.$route.query.check_status, //审核状态
      shop_name: this.$route.query.shop_name, //商铺名称
      t_id_new: this.$route.query.t_id, //详情和编辑情况下的人才id
      t_id: this.$route.query.t_id ? true : false, //boolean,是否是编辑模式
      isEdit: false,
      oldWorkData: {},
      editWorkIndex: -1,
      good_skills_name: this.$route.query.good_skills_name,
      form: {
        talent_c_id: "",
        talent_c_pid: "",
        face_pic: "",
        position_type: "",
        true_name: "",
        nick_name: "",
        sex: "1",
        id_card: "",
        id_card_effective: "",
        id_card_pic_face: "",
        id_card_pic_side: "",
        id_card_pic_hand: "",
        mobile: "",
        email: "",
        province: "",
        city: "",
        area: "",
        add_work_time: "",
        education: "",
        school: "",
        major: "",
        talent_c_id: "",
        talent_c_pid: "",
        skills_span: [],
        evaluate: "",
        experience: []
      },
      rules: {
        position_type: [
          { required: true, message: "请选择成员类型", trigger: "blur,change" }
        ],
        true_name: [
            { 
             required: true,
            validator: (rule, value, callback) => {
            if ((/^[\u4E00-\u9FA5\/ ]{2,12}$/.test(value) == false && /^[a-zA-Z\/ ]{2,20}$/.test(value) == false) || value.trim().length === 0) {
                  callback(new Error("请输入有效的姓名"));
              } else {
                callback();
              }
            },
            trigger: "change"
            }
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        nick_name: [{ required: true, message: "请输入昵称", trigger: "blur" }],
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
            trigger: "blur"
          }
        ],
        id_card_effective: [
          { required: true, message: "请选择证件有效时间", trigger: "blur" }
        ],
        email: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(value) == false) {
                callback(new Error("请输入正确的邮箱"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        id_card_pic_face: [
          { required: true, message: "请上传证件头像面照片", trigger: "blur" }
        ],
        id_card_pic_side: [
          { required: true, message: "请上传证件国徽面照片", trigger: "blur" }
        ],
        id_card_pic_hand: [
          {
            required: true,
            message: "请上传持证人手持证件头像面照片",
            trigger: "blur"
          }
        ],
        area: [
          { required: true, message: "请上选择所在城市", trigger: "blur" }
        ],
        add_work_time: [
          { required: true, message: "请输入参加工作时间", trigger: "blur" }
        ],
        talent_c_id: [
          { required: true, message: "请选择岗位", trigger: "blur" }
        ],
        skills_span: [
          { required: true, message: "请选择技能标签", trigger: "blur" }
        ],
        education: [{ required: true, message: "请选择学历", trigger: "blur" }],
        school: [
          { required: true, message: "请输入毕业院校", trigger: "blur" }
        ],
        major: [{ required: true, message: "请输入专业：", trigger: "blur" }],
        evaluate: [
          { required: true, message: "请输入评价内容", trigger: "blur" }
        ]
      },
      storeIsShow: false,
      talent_skills_all: [{ id: "" }],
      talent_skills_all_child: [{ id: "" }],
      talent_skills_all_child_child: [{ id: "" }]
    };
  },

  mounted() {
    this.get_talent_skills_all();

    if (this.check_status == 3) {
      this.t_id = "";
    }
  },

  methods: {
    workData(data) {
      if (this.editWorkIndex >= 0) {
        //编辑
        this.form.experience[this.editWorkIndex] = { ...data };
      } else {
        this.form.experience.push({ ...data });
      }
    },

    async get_shop_talent_info() {
      let { data } = await apiGetShopTalentInfo({ id: this.t_id_new });
      data.list.talent_c_id = data.list.talent_c_id.toString();

      this.selectPinDao(data.list.talent_c_pid);
      this.selectZhiNeng(data.list.talent_c_id);
      this.form = data ? data.list : [];
      this.form.skills_span = this.form.skills_span.split(",");
      this.good_skills_name = { ...this.form.good_skills_arr };
    },

    selectAddressData(data) {
      this.form.province = data.province;
      this.form.city = data.city;
      this.form.area = data.area;
    },

    selectPinDao(id) {
      for (var index in this.talent_skills_all) {
        if (id == this.talent_skills_all[index]["id"]) {
          this.talent_skills_all_child = {
            ...this.talent_skills_all[index]["_child"]
          };
        }
      }

      this.form.skills_span = [];
      this.talent_skills_all_child_child = [];
    },

    selectZhiNeng(id) {
      for (var index in this.talent_skills_all_child) {
        if (id == this.talent_skills_all_child[index]["id"]) {
          this.talent_skills_all_child_child = this.talent_skills_all_child[
            index
          ]["_child"];
        }
      }
    },

    async get_talent_skills_all() {
      let { data } = await apiGetTalentSkillsAll();
      this.talent_skills_all = data ? data : [];
      this.t_id ? this.get_shop_talent_info() : "";
    },

    handleChange() {},

    close() {
      this.$router.back(-1);
    },

    face_pic_event(url) {
      this.form.face_pic = url;
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

    async submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          if (this.form.experience.length < 2) {
            this.$message({
              type: "error",
              message: "请填写至少2个工作经历",
              duration: 1000
            });
            return;
          }
          
       if(/.*[\u4e00-\u9fa5]+.*$/.test(this.form.true_name)) {
       this.form.true_name  = this.form.true_name.replace(/ /g,'')
      }else{
         this.form.true_name  = this.form.true_name.replace(/ /,'')
      }

          if ((this.t_id && this.isEdit) || this.check_status == 3) {
            this.editFormFun(this.form);
          } else {
            this.submitFormFun(this.form);
          }
        }
      });
    },

    async editFormFun(param) {
      let new_param = {
        ...this.t_id_new,
        ...param.evaluate,
        ...param.experience
      };
      let { code } = await apiEditShopTalent(param);
      if (code == 200) {
        this.$message({
          type: "success",
          message: "编辑保存成功!",
          duration: 1000
        });
        setTimeout(() => {
          this.$router.back(-1);
        }, 1000);
      }
    },
    async submitFormFun(param) {
      let { code } = await apiAddShopTalent(param);
      if (code == 200) {
        this.$message({
          type: "success",
          message: "保存成功!",
          duration: 1000
        });
        setTimeout(() => {
          this.$router.back(-1);
        }, 1000);
      }
    },

    showMoreHandle() {},
    handleClick(oldWorkData = {}, index = -1) {
      this.oldWorkData = { ...oldWorkData };
      this.editWorkIndex = index;
      this.storeIsShow = true;
    },

    delHandleClick(item, index) {
      this.form.experience.splice(index, 1);
    },
    dialogHanderHide() {
      this.storeIsShow = false;
    }
  }
};
</script>


<style lang="less" scoped >
@import "../../../assets/less/console";
</style>

<style lang="less" >
@import "../../../assets/less/variables/index";
.add-user-content {
  .circle .avatar-uploader {
    border-radius: 100px;
  }
  .detail_class {
    input,
    select,
    textarea,
    .el-select,
    .el-upload {
      pointer-events: none !important;
      border: none !important;
    }
    .el-icon-arrow-up:before,
    .el-icon-arrow-up:after {
      content: "";
    }
  }
  .jnbq .el-checkbox-button__inner {
    color: #666;
    font-size: 14px;
    background-color: #fff;
    border-color: #ccc;
    width: 160px;
    height: 40px;
    margin-right: 20px;
    box-shadow: none;
    border-left: 1px solid #ccc;
    border-radius: 3px;
    margin-bottom: 20px;
    overflow: hidden;
  }
.jnbq .el-form-item{
      border-bottom: 1px solid #e6e6e6;
}
  .jnbq .el-checkbox-button.is-checked .el-checkbox-button__inner {
    color: #db0b19;
    font-size: 14px;
    background-color: #fff;
    border-color: #db0b19;
    width: 160px;
    height: 40px;
    margin-right: 20px;
    box-shadow: none;
    border-left: 1px solid #db0b19;
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

  .el-radio__input.is-checked .el-radio__inner {
    border-color: @theme-color;
    background: @theme-color;
  }
  .el-radio__input.is-checked + .el-radio__label {
    color: #333;
  }
}
</style>

