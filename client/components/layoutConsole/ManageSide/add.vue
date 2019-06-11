<template>
  <el-dialog title="新增工作经验/编辑工作经验" :visible.sync="dialogTableVisiblee" @close="close">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="公司名称：" prop="company_name">
        <el-input v-model="form.company_name" placeholder="例如：阿里巴巴"></el-input>
      </el-form-item>

      <el-form-item label="职位：" prop="p_name">
        <el-input v-model="form.p_name" placeholder="例如：产品经理"></el-input>
      </el-form-item>

      <el-form-item label="在职时间：" prop="p_start_time">
        <el-date-picker
          class="w180"
          v-model="form.p_start_time"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期"
        ></el-date-picker> -
        <el-date-picker
          class="w180"
          v-model="form.p_end_time"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="工作内容：" prop="p_content">
        <el-input
          type="textarea"
          maxlength="300"
          v-model="form.p_content"
          placeholder="请输入300字以上的工作描述（项目经验）"
          :rows="4"
        ></el-input>
      </el-form-item>

      <el-row>
        <el-button type="info" @click="close">取消</el-button>
        <el-button type="danger" @click="submit('form')">确认</el-button>
      </el-row>
    </el-form>
  </el-dialog>
</template>
<script>
export default {
  props: {
    dialogTableVisiblee: Boolean,
    oldWorkData:Object
  },
  data() {
    return {
      form: {
        company_name: "",
        p_name: "",
        p_start_time: "",
        p_end_time: "",
        p_content: ""
      },
      rules: {
        company_name: [
          { required: true, message: "请输入公司名称", trigger: "blur,change" }
        ],
        p_name: [
          { required: true, message: "请输入职位", trigger: "blur,change" }
        ],
        p_start_time: [
          {
            required: true,
            message: "请输入在职时间：",
            trigger: "blur,change"
          }
        ],
        p_content: [
          { required: true, message: "请输入工作内容", trigger: "blur,change" }
        ]
      }
    };
  },

    watch: {
    oldWorkData: {
      deep:true,
      handler:function(newVal) {    
      if (newVal != {}) {
      this.form = {...newVal};
      }else{
      this.form.company_name = '';
      this.form.p_name = '';
      this.form.p_start_time = '';
      this.form.p_end_time = '';
      this.form.p_content = '';
      }
    }
    }
  },

  methods: {
    close() {
      this.$refs["form"].clearValidate();
      this.$emit("dialogHide");
    },

    submit(form) {      
   
      if(parseInt(this.form.p_end_time.replace(/-/g,"")) <= parseInt(this.form.p_start_time.replace(/-/g,"")) ){
          this.$message({
          type: "error",
          message: "开始时间不能大于结束时间!",
          duration: 1000
        });
        return
      }
      
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$emit("workData", this.form);    
            this.close();    
        }
      });
    }
  }
};
</script>

<style lang="less">
.el-dialog {
  width: 580px;
  padding: 20px;
}
.el-row {
  text-align: center;
  .el-button {
    width: 120px;
    color: #fff;
  }
}
.el-date-editor.w180.el-input {
  width: 180px;
}
.el-button--danger{
    color: #fff;
    background-color: #d70c19;
    border-color: #d70c19;
}
</style>
