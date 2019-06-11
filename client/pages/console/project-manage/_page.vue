<template>
  <div class="mb-40">
    <div class="letters-list">
      <h6 class="title fs-20 font-blod">需求基本信息</h6>
      <div class="letters-list__content">
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">* 服务一级分类：
              <span class="text">{{baseData.cate_pid_name}}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              * 项目名称：
              <span class="text">{{baseData.p_name}}</span>
              <span class="edit" @click="editSubmit('p_name','项目名称')">修改</span>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">* 服务二级分类：
              <span class="text">{{baseData.cate_id_name}}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">* 商务顾问：
              <span class="text">{{baseData.advisor_username}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="17">
            <div class="grid-content bg-purple">* 一句话需求：
              <span class="text">{{baseData.simple_desc}}</span>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="grid-content bg-purple">
              <button @click="editSubmit('simple_desc','一句话需求')">编辑</button>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="17">
            <div class="grid-content bg-purple">* 详细描述：
              <span class="text">{{baseData.detail_desc}}</span>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="grid-content bg-purple">
              <button @click="editSubmit('detail_desc','详细描述')">编辑</button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="letters-list">
      <h6 class="title fs-20 font-blod">项目进度更新</h6>
      <div class>
        <ul class="update">
          <li v-for="item in 11" :key="item">
            <div v-if="item == baseData.progress" :class="'content active po'+item"></div>
            <div v-else :class="'content po'+item"></div>
            <div class="jt"></div>
          </li>
        </ul>
        <div class="clearfix"></div>
      </div>
    </div>

    <div class="letters-list">
      <h6 class="title fs-20 font-blod">项目附件</h6>
      <el-table :data="baseData.file_ids_arr" border style="width: 100%">
        <global-no-data slot="empty"/>
        <el-table-column label="文件名称"  align="center">
          <template slot-scope="scope">
            <div>{{scope.row.file_name || '--'}}</div>
          </template>
        </el-table-column>
        <el-table-column label="大小"  align="center">
          <template slot-scope="scope">
            <div>{{scope.row.file_size || '--'}}</div>
          </template>
        </el-table-column>
        <el-table-column label="上传时间"  align="center">
          <template slot-scope="scope">
            <div>{{scope.row.create_date || '--'}}</div>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" >
          <template  slot-scope="scope">
            <a :href="baseURL+'/Home/index/get_file_stream_bin/id/'+scope.row.file_id" :download="scope.row.file_name" target="_blank">  下载</a>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog :title="'修改'+editName" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item :label="editName+'：'">
          <el-input type="textarea" rows='4' v-model="form.val" placeholder="请输入内容" maxlength="290"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="danger" @click="editSubmitFun">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { baseURL } from "../../../config";
import scrollTopMixin from "../../../mixins/scrollTopMixin";
import { apiEditProject, apiProjectInfo } from "../../../api/phpApi";


export default {
  name: "project-manage",
  layout: "console",
  mixins: [scrollTopMixin],
  data() {
    return {
      baseURL:baseURL,      
      arrName: {
        tableData: []
      },
      baseData: {
        p_name: "",
        simple_desc: "",
        detail_desc: ""
      },
      form: {
        val: ""
      },
      id:  this.$route.query.id ? this.$route.query.id : '',
      key: "",
      editName: "",
      dialogVisible: false,
      total: 0,
      page: 1
    };
  },
  mounted() {
    if(this.id){
     this.getProjectInfo();
    }
 
  },
  methods: {
    editSubmit(key, editName) {
      this.form.val = this.baseData[key];
      this.dialogVisible = true;
      this.key = key;
      this.editName = editName;
    },
    async editSubmitFun() {
      if (!this.form.val) {
        this.$message({
          type: "error",
          message: "修改内容不能为空！",
          duration: 800
        });
        return;
      }

      var params = {};
      params["id"] = this.id;
      params[this.key] = this.form.val;

      let { code, msg } = await apiEditProject(params);
      this.dialogVisible = false;
      if (code == 200) {
        this.baseData[this.key] = this.form.val;
        this.$message({
          type: "success",
          message: "修改成功!",
          duration: 1000
        });
      } else {
        this.$message({
          type: "error",
          message: msg,
          duration: 1500
        });
      }
    },

    async getProjectInfo() {
      let { data } = await apiProjectInfo({ id: this.id });
      this.baseData = data;
      this.baseData.file_ids_arr =[...this.baseData.file_ids_arr,...this.baseData.help_doc_ids_arr];
    }
  }
};
</script>

<style lang="less">
@import "../../../assets/less/variables/index";


.letters-list {
  margin-bottom: 30px;
  background: #ffffff;
  -webkit-box-shadow: 0px 10px 40px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 10px 40px 0px rgba(0, 0, 0, 0.1);
  .title {
    padding: 25px 40px 15px 40px;
    border-bottom: 1px solid #e6e6e6;
  }
  .letters-list__content {
    padding: 0 50px;
    padding-bottom: 50px;
    .el-row {
      line-height: 65px;
      font-size: 16px;
      border-bottom: 1px solid #eee;
      color: #999;
       text-align: left;
       max-height: 246px;
       overflow: hidden;
      .text {
        color: #333;
        font-size: 14px;
            line-height: 25px;
            display: inline-block;
      }
      button {
        color: #999;
        font-size: 14px;
        margin-left: 15px;
      }
      .edit {
        font-size: 14px;
        cursor: pointer;
        display: inline-block;
        color: @theme-color;
        margin-left: 50px;
      }
    }
    .el-row:last-child {
      border-bottom: none;
    }
    .letters-list__item {
      padding: 40px 0 60px;
      border-bottom: 1px solid #e6e6e6;
      h6 {
        color: #333;
        font-weight: bold;
        margin-bottom: 20px;
      }
      div {
        color: #808080;
        font-size: 14px;
      }
    }
  }
  .update {
    padding: 30px 10px;
    li {
      float: left;
      min-width: 8.4%;
      margin-bottom: 40px;
      position: relative;
      .content {
        width: 100px;
        height: 90px;
        background: url("/images/console/pro-detail.png") no-repeat;
      }
      .active {
        background: url("/images/console/pro-detail-red.png") no-repeat;
      }
      .po1 {
        background-position: 0;
      }
      .po2 {
        background-position: -122px 11px;
      }
      .po3 {
        background-position: -248px 11px;
      }
      .po4 {
        background-position: -386px 11px;
        width: 152px;
      }
      .po5 {
        background-position: -550px 11px;
      }
      .po6 {
        background-position: -676px 11px;
        width: 122px;
      }
      .po7 {
        background-position: -816px 11px;
      }
      .po8 {
        background-position: -909px 11px;
      }
      .po9 {
        background-position: -1018px 11px;
      }
      .po10 {
        background-position: -1130px 11px;
      }
      .po11 {
        background-position: -1238px 11px;
      }
      .jt {
        background: url(/images/console/pro-detail-jt.png) no-repeat;
        position: absolute;
        right: -27px;
        width: 24px;
        height: 20px;
        top: 65px;
      }
    }
    li:last-child .jt {
      display: none;
    }
    .clearfix:after {
      content: " ";
      display: block;
      height: 0;
      clear: both;
      visibility: hidden;
    }
  }
}
</style>
