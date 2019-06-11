<template>
  <el-dialog
     lock-scroll
    :modal-append-to-body="false"
    :visible.sync="dialogTableVisiblee"
    @close="close"
    width="800px"
    :close-on-click-modal="false"
  >
    <div slot="title" class="title">选择职位</div>
    <!-- <div class="content-talent">
      <el-radio-group v-model="checkboxGroup">
        <el-radio :label="j" v-for="(item,j) in talent_skills_all" :key="j">
          {{item.cate_name}}——
          <span
            class="text"
            v-for="(index,k) in item._child"
            :key="k"
          >{{k?'、':''}}{{index.cate_name}}</span>
        </el-radio>
      </el-radio-group>
      <el-row>
        <el-button type="danger" @click="submit">确定</el-button>
      </el-row>
    </div>-->
    <div class="content">
      <div v-for="(item,index) in talent_skills_all" :key="index">
        <h5>{{item.cate_name}}</h5>
        <el-checkbox-group v-model="checkboxGroup">
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
import { apiGetTalentSkillsAll } from "../../../api/phpApi";

export default {
  props: {
    dialogTableVisiblee: Boolean
  },
  data() {
    return {
      checkboxGroup: [],
      talent_skills_all: []
    };
  },
  watch: {},
  mounted() {
    this.get_good_skills_all();
  },
  methods: {
    close() {
      this.$emit("dialogHide");
    },

    async get_good_skills_all() {
      let { data } = await apiGetTalentSkillsAll();
      this.talent_skills_all = data ? data : [];
    },

    async submit() {
      var name = [];
      for (var index in this.talent_skills_all) {
        for (var item in this.talent_skills_all[index]["_child"]) {
          if (
            this.checkboxGroup.includes(
              this.talent_skills_all[index]["_child"][item].id
            )
          ) {
            name[name.length] = this.talent_skills_all[index]["_child"][
              item
            ].cate_name;
          }
        }
      }

      this.$emit("selectTalent", {
        id: this.checkboxGroup.join(","),
        name: name
      });
      this.close();
    }
  }
};
</script>

<style lang="less">
.content-talent {
  .el-radio__input.is-checked .el-radio__inner {
    border-color: #d70c19;
    background: #d70c19;
  }
  .el-radio__input.is-checked + .el-radio__label {
    color: #606266;
  }
  .el-radio-group {
    > label {
      display: block;
      margin: 20px 0;
      .text {
        display: inline-block;
        margin-right: 10px;
      }
    }
  }
  .el-button--danger {
    color: #fff;
    background-color: #d70c19;
    border-color: #d70c19;
  }
}
</style>


