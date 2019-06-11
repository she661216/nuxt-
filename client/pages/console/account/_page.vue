<template>
  <div class="mb-40">
    <div class="letters-list">
      <h6 class="title fs-20 font-blod">账号信息</h6>
      <div class="letters-list__content">
        <div class="_circle">
          <!-- <global-upload :face_pic="face_pic" @upload_pic_event="face_pic_event"/> -->
          <el-upload
            class="avatar-uploader"
            :action="action"
            :show-file-list="false"
            :headers="headers"
            :data="{uid:userInfo.uid}"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="userInfo.avatar" :src="userInfo.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

          <div class="info">
            <p>账号： {{userInfo.mobile}}</p>
            <p>
              用户名： {{userInfo.username}}
              <span @click="dialogVisible = true" v-if='userInfo.allow_change_username'>修改</span>
            </p>
          </div>
        </div>

        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <i class="qq"></i>QQ：未绑定QQ，绑定后可使用该QQ直接登录
              <span class="text"></span>
            </div>
          </el-col>
          <!-- <el-col :span="7">
            <div class="grid-content bg-purple">
              <button>绑定</button>
            </div>
          </el-col> -->
        </el-row>

        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <i class="yx"></i>邮箱：未绑定邮箱，绑定后可使用该邮箱直接登录
              <span class="text"></span>
            </div>
          </el-col>
          <!-- <el-col :span="7">
            <div class="grid-content bg-purple">
              <button>绑定</button>
            </div>
          </el-col> -->
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <i class="wx"></i>微信：未绑定微信，绑定后可使用该微信直接登录
              <span class="text"></span>
            </div>
          </el-col>
          <!-- <el-col :span="7">
            <div class="grid-content bg-purple">
              <button>绑定</button>
            </div>
          </el-col> -->
        </el-row>
      </div>
    </div>

    <div class="letters-list">
      <h6 class="title fs-20 font-blod">账号交易记录</h6>
      <global-no-data content slot="empty"/>
      <el-table v-if="false" :data="arrName.tableData" border style="width: 100%">
        <el-table-column label="文件名称" prop="p_name" align="center">
          <template slot-scope="scope">
            <div>{{scope.row.p_name || '--'}}</div>
          </template>
        </el-table-column>
        <el-table-column label="大小" prop="cate_pid_name" align="center">
          <template slot-scope="scope">
            <div>{{scope.row.cate_pid_name || '--'}}</div>
          </template>
        </el-table-column>
        <el-table-column label="上传时间" prop="cate_id_name" align="center">
          <template slot-scope="scope">
            <div>{{scope.row.cate_id_name || '--'}}</div>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template>
            <div>下载</div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="修改用户名" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户名：" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="danger" @click="editAccount('form')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { apiChangeUsername } from "../../../api/phpApi";
import { mapState, mapMutations } from "vuex";
import { baseURL, nodeApi } from "../../../config";
import UploadImg from "../../../components/other/UploadImage";
import {
  setLocalStore,
  getLocalStore
} from "../../../utils/storeUtils";
import { apiGetUserInfo } from "../../../api/nodeApi";

export default {
  name: "account",
  layout: "console",
  components: {
    UploadImg
  },
  data() {
    return {
      dialogVisible: false,
      face_pic: "",
      form: {
        username: ""
      },
      // action: `${nodeApi}/backend/api/uc_upload_avatar`,
      action: "http://yx.epwk.net/backend/api/uc_upload_avatar",
      headers: {
        authorization: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur,change"
          }
        ]
      },
      arrName: {
        tableData: []
      }
    };
  },

  mounted() {
    this.form.username = this.userInfo.username;
    if (this.userInfo.uid) {
      this.headers.authorization = this.userInfo.jwt;
    }
  },

  methods: {
    ...mapMutations(["SET_USER"]),
    handleAvatarSuccess(res, file) {
      if (res.code == 200) {
        this.SET_USER({ avatar: `${baseURL}` + res.data.src });
      }
    },
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    face_pic_event(value) {
      this.face_pic = value;
    },

    async editAccount(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.editAccountFun(this.form);
        }
      });
    },

    async editAccountFun(param) {
      let { code, msg } = await apiChangeUsername(param);
      this.dialogVisible = false;
      if (code == 200) {
        this.userInfo.username = this.form.username;
       this.userInfo.allow_change_username = 0;
        setLocalStore('AuthUserInfo',JSON.stringify(this.userInfo))
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
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/less/variables/index";
._circle {
  img {
    width: 152px;
    height: 152px;
    display: block;
    background: #eee;
    overflow: hidden;
    border-radius: 180px;
  }
  .avatar-uploader {
    width: 148px;
    height: 148px;
    margin: 0 auto;
    margin-top: 60px;
    margin-bottom: 15px;
    border-radius: 180px;
  }
}
.grid-content{
    text-align: left;
    width: 400px;
    margin: 0 auto;
}
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
    .tx {
      width: 150px;
      height: 150px;
      margin: 0 auto;
    }
    .info {
      margin-top: 10px;
      text-align: center;

      p {
        text-align: center;
        line-height: 30px;
        margin: 0 auto;
      }
      span {
        font-size: 14px;
        color: #999;
        margin-left: 30px;
        display: inline-block;
        cursor: pointer;
      }
    }
    .info:last-child {
      margin-bottom: 50px;
    }
    .el-row {
      height: 68px;
      line-height: 68px;
      font-size: 16px;
      border-top: 1px solid #eee;
      padding: 0 15%;
      color: #333;
      .text {
        color: #333;
        font-size: 14px;
      }
      button {
        color: #d70c19;
        font-size: 14px;
      }
      .edit {
        font-size: 14px;
        cursor: pointer;
        display: inline-block;
        color: red;
        margin-left: 50px;
      }
      i {
        width: 15px;
        height: 16px;
        display: inline-block;

        vertical-align: middle;
        margin-right: 10px;
      }
      i.qq {
        background: url("/images/console/icon_account_qq.jpg") no-repeat;
      }
      i.yx {
        background: url("/images/console/icon_account_yx.jpg") no-repeat;
      }
      i.wx {
        background: url("/images/console/icon_account_wx.jpg") no-repeat;
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
}
</style>
