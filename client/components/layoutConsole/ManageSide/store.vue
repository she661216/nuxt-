<template>
  <el-dialog
    title="商铺案例："
    :visible.sync="dialogTableVisiblee"
    @close="close"
    :close-on-click-modal="false"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="案例名称：" prop="title">
        <el-input v-model="form.title" placeholder="请输入50字以内案例名称" maxlength="50"></el-input>
      </el-form-item>

      <el-form-item label="服务类型：" prop="cate_pid">
        <el-select v-model="form.cate_pid" placeholder="请选择" @change="get_Category2">
          <el-option
            v-for="item in categoryList"
            :key="item.id"
            :label="item.cate_name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="服务：" prop="cate_id">
        <el-select v-model="form.cate_id" placeholder="请选择">
          <el-option
            v-for="item in serviceList"
            :key="item.id"
            :label="item.cate_name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="定价：" prop="price">
        <el-input v-model="form.price" placeholder="请输入大于0的售价，保留2位小数"></el-input>
      </el-form-item>

      <el-form-item label="案例描述：" prop="content">
        <el-input
          :rows="6"
          type="textarea"
          v-model="form.content"
          maxlength="1000"
          placeholder="请输入1000字以内的案例描述"
        ></el-input>
      </el-form-item>

      <el-form-item label="案例周期：" prop="cycle">
        <el-input v-model="form.cycle" placeholder="请输入大于1的正整数"></el-input>
      </el-form-item>

      <el-form-item label="服务性质：" prop="unit">
        <el-radio-group v-model="form.unit">
          <el-radio :label="'1'">一次性服务</el-radio>
          <el-radio :label="'2'">周/次</el-radio>
          <el-radio :label="'3'">月/次</el-radio>
          <el-radio :label="'4'">年/次</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-row>
        <el-button type="info" @click="close">取消</el-button>
        <el-button type="danger" @click="storeId?edit('form'):add('form')">确认</el-button>
      </el-row>
    </el-form>
  </el-dialog>
</template>
<script>
import {
  apiServiceCategory1,
  apiServiceCategory2,
  apiAddShopCase,
  apiShopCaseInfo,
  apiEditShopCase
} from "../../../api/phpApi";

export default {
  props: {
    dialogTableVisiblee: Boolean,
    storeId: String
  },
  data() {
    return {
      categoryList: [],
      serviceList: [],
      form: {
        price: "",
        title: "",
        content: "",
        unit: "",
        cycle: "",
        cate_id: "",
        cate_pid: ""
      },
      rules: {
        title: [{ required: true, message: "案例名称", trigger: "blur" }],
        price: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (/^\d+(\.\d{0,2})?$/.test(value) == false) {
                callback(new Error("请输入大于0的售价，保留2位小数"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        content: [
          { required: true, message: "请输入案例描述", trigger: "blur" }
        ],
        cycle: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (/^[0-9]*[1-9][0-9]*$/.test(value) == false) {
                callback(new Error("请输入大于1的正整数"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        unit: [{ required: true, message: "请选择服务性质", trigger: "blur" }],
        cate_id: [
          { required: true, message: "请选择服务二级分类", trigger: "blur" }
        ],
        cate_pid: [
          { required: true, message: "请选择服务一级分类", trigger: "blur" }
        ]
      }
    };
  },
  watch: {
    storeId: function(newVal) {
        this.form.price = "";
        this.form.title = "";
        this.form.content = "";
        this.form.unit = "";
        this.form.cycle = "";
        this.form.cate_id = "";
        this.form.cate_pid = "";
      if (newVal) {   
        this.form.id = newVal;
        this.getShopCaseInfo(newVal);
      } else {
        delete this.form.id;     
      }
    }
  },

  mounted() {
    this.get_Category1();
  },

  methods: {
    
    close() {
     this.$refs["form"].clearValidate();
      this.$emit("dialogHide");

      if(!this.storeId){
        this.form.price = "";
        this.form.title = "";
        this.form.content = "";
        this.form.unit = "";
        this.form.cycle = "";
        this.form.cate_id = "";
        this.form.cate_pid = "";
      }
    },

    async add(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.submit_form(this.form);
        }
      });
    },

    async edit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.edit_form(this.form);
        }
      });
    },

    async edit_form(params) {
  
      let { code } = await apiEditShopCase(params);
      if (code === 200) {
        this.$message({
          type: "success",
          message: "编辑成功!",
          duration: 800
        });
        this.$emit("dialogHide");
        this.$parent.shopCase();
      }
    },

    async submit_form(params) {
      let { code } = await apiAddShopCase(params);
      if (code === 200) {
        this.$message({
          type: "success",
          message: "添加成功!",
          duration: 800
        });
        this.$emit("dialogHide");
        this.$parent.shopCase();
      }
    },

    async get_Category1() {
      let { data } = await apiServiceCategory1({ limit: 1005, page: 1 });
      this.categoryList = data ? data.list : [];
    },

    async get_Category2(id) {
      this.form.cate_id = "";
      let { data } = await apiServiceCategory2({ id: id });
      this.serviceList = data ? data.list : [];
    },

    async getShopCaseInfo(id) {
      var { data } = await apiShopCaseInfo({ id: id });
      if (data) {
        this.form.price = data.list.price;
        this.form.title = data.list.title;
        this.form.content = data.list.content;
        this.form.unit = data.list.unit;
        this.form.cycle = data.list.cycle;
        this.form.cate_pid = data.list.cate_pid;

        var new_id = data.list.cate_id;

        var { data } = await apiServiceCategory2({ id: this.form.cate_pid });

        this.serviceList = data ? data.list : [];
        this.form.cate_id = new_id;
      }
    }
  }
};
</script>

<style lang="less">
@import "../../../assets/less/variables/index";
.el-dialog {
  width: 580px;
  padding: 20px;
}
.el-row {
  text-align: center;
  .el-button {
    width: 150px;
    color: #fff;
  }
}
.el-select-dropdown__list {
  padding-bottom: 15px;
}
.el-select {
  width: 100%;
}
.el-button--danger{
    color: #fff;
    background-color:   @theme-color;
    border-color: @theme-color;
}
.el-radio__input.is-checked .el-radio__inner {
    border-color:@theme-color;
    background:@theme-color;
}
.el-radio__input.is-checked+.el-radio__label{
    color: #606266;
}
.el-button--danger:focus, .el-button--danger:hover {
    background: @theme-color;
    border-color: @theme-color;
    color: #fff;
}
</style>


