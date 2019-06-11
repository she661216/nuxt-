<template>
  <div>
    <el-upload
      class="avatar-uploader"
      :action="action"
      :show-file-list="false"
      :headers="headers"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="face_pic" class="tx avatar" :src="face_pic">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import { baseURL, nodeApi } from "../../../config";
export default {
  name: "GlobalUpload",
  props: {
    face_pic: String
  },
  data() {
    return {
       action: `${nodeApi}/backend/api/uc_ajax_upload_one`,
        headers: {
        authorization: ""
      }
    };
  },
  mounted() {
    if (this.userInfo.uid) {
      this.headers.authorization = this.userInfo.jwt;
    }
  },
  watch:{
   face_pic (val) {
        if(val.indexOf('http:') < 0){
          this.face_pic = `${baseURL}` + val;
        }
      },
  },
  methods: {
    handleAvatarSuccess(res, file, fileList) {
      if (res.code === 200) {
        let pic = res.data.src;
        this.face_pic = `${baseURL}` + pic;
        this.$emit("upload_pic_event", pic);
      } else {
        this.$message({
          message: res.msg,
          type: "error"
        });
      }
    },

    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg";
      const isLt2M = file.size / 1024 / 1024 < 3;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG或png 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 3MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="less">
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
  width: 150px;
  height: 150px;
  display: block;
  background: #eee;
  border-radius: 5px;
}
</style>
