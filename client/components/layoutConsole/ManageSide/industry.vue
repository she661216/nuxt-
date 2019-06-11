<template>
  <el-dialog
    :modal-append-to-body="false"
    :visible.sync="dialogTableVisiblee"
    @close="close"
    :close-on-click-modal="false"
    width="800px"
  >
    <div v-if="!type" slot="title" class="title">选择您擅长的行业：{{checkboxGroup.length}}/5</div>
    <div v-else slot="title" class="title">选择服务范围</div>
    <div class="content">
      <div v-for="(item,index) in goodSkills" :key="index">
        <h5>{{item.cate_name}}</h5>
        <el-checkbox-group v-model="checkboxGroup" @change="checkNum">
          <el-checkbox-button v-for="(v,m) in item._child" :label="v.id" :key="m">{{v.cate_name}}</el-checkbox-button>
        </el-checkbox-group>
      </div>
      <el-row>
        <el-button type="danger" @click="submit">确定</el-button>
      </el-row>
    </div>
  </el-dialog>
</template>
<script>
import { apiGetGoodSkillsAll } from "../../../api/phpApi";

export default {
  props: {
    dialogTableVisiblee: Boolean,
    killsId: Array,
    mixLength: Number,
    type: Boolean //区分人才列表和添加人员，两处选择行业
  },
  data() {
    return {
      goodSkills: [],
      checkboxGroup: []
    };
  },
  watch: {
    killsId: function(newVal) {
      if (newVal) {
        this.checkboxGroup = newVal;
      }
    }
  },
  mounted() {
    this.get_good_skills_all();
  },
  methods: {
    checkNum() {
      if (this.checkboxGroup.length > 5 && !this.type) {
        this.$message({
          message: "最多只能选择5个行业",
          center: true
        });
        this.checkboxGroup.splice(this.checkboxGroup.length - 1, 1);
        return;
      }
    },

    close() {
      this.$emit("dialogHide");
    },

    async get_good_skills_all() {
      let { data } = await apiGetGoodSkillsAll();
      this.goodSkills = data ? data : [];
    },

    async submit() {
      if (this.mixLength) {
        if (this.checkboxGroup.length < 1) {
          this.$message({
            message: "请选择1个行业",
            center: true
          });
          return;
        }
      } else {
        if (this.checkboxGroup.length < 2 && !this.type) {
          this.$message({
            message: "请选择2至5个行业",
            center: true
          });
          return;
        }
      }

      var name = [];

      for (var index in this.goodSkills) {
        for (var item in this.goodSkills[index]["_child"]) {
          if (
            this.checkboxGroup.includes(
              this.goodSkills[index]["_child"][item].id
            )
          ) {
            name[name.length] = this.goodSkills[index]["_child"][
              item
            ].cate_name;
          }
        }
      }

      this.$emit("selectIndustry", {
        id: this.checkboxGroup.join(","),
        name: name
      });
      this.close();
    }
  }
};
</script>

<style lang="less">
@import "../../../assets/less/variables/index";
.el-dialog {
  padding: 20px;
  .title {
    font-size: 20px;
    color: #333;
  }
  .el-dialog__body {
    padding: 20px;
  }
  .content {
    h5 {
      color: #333;
      font-size: 18px;
      font-weight: 700;
      padding: 20px 0;
    }
    .el-checkbox-button .el-checkbox-button__inner {
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

    .el-checkbox-button.is-checked .el-checkbox-button__inner {
      color: @theme-color;
      font-size: 14px;
      background-color: #fff;
      border-color: @theme-color;
      width: 160px;
      height: 40px;
      margin-right: 20px;
      box-shadow: none;
      border-left: 1px solid @theme-color;
    }
  }
  .el-row {
    text-align: center;
    .el-button {
      width: 150px;
      height: 40px;
      color: #fff;
      border-radius: 5px;
    }
  }
}
.el-button--danger,.el-button--danger:hover {
  color: #fff;
  background-color: @theme-color;
  border-color: @theme-color;
}
</style>


