<template>
  <div v-loading.fullscreen.lock="fullscreenLoading">
    <el-upload
      :action="action"
      list-type="picture-card"
      :file-list="fileList"
      :limit="limit"
      :data="uploadData"
      :class="{'disabled-form':selectFileList.length>=limit}"
      multiple
      :headers="Object.assign({authorization},headers ? headers :{})"
      :on-success="handleAvatarSuccess"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :before-upload="beforeUpload"
      :on-exceed="onExceed"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>

  export default {
    name: 'index',
    props: {
      value: {
        type: String,
        default: ''
      },
      limit: {
        type: Number,
        default: 1
      },
      action: {
        type: String,
        default: ''
      },
      uploadData: {
        type: Object,
        default () {
          return {}
        }
      },
      headers: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        dialogVisible: false,
        dialogImageUrl: '',
        authorization: '',
        activeUpload: {},
        selectFileList: [],
        fileList: [],
        isUserHandle: false,
        fullscreenLoading: false
      }
    },
    watch: {
      value: {
        handler (val, oldVal) {
          this.selectFileList = val ? [...val.split(',')] : []
          val && !this.isUserHandle && this.setFileList(val)
        },
        immediate: true,
        deep: true
      },
      selectFileList (val) {
        let imgs = val.length > 0 ? val.join(',') : ''
        this.$emit('input', imgs)
      }
    },
    mounted () {
      this.setFileList()
    },
    methods: {
      setFileList (imgs = this.value) {
        this.fileList = imgs ? imgs.split(',').map(item => {
            return {name: (Math.random() * 10000).toFixed(0), url: item}
          })
          : []
      },
      handleAvatarSuccess (res, file, fileList) {
        this.selectFileList = fileList.map(item => {
          return item.response && item.response.data && item.response.data.url
        })
        this.isUserHandle = true
        this.fullscreenLoading = false
        this.$emit('uploadSuccess', res, file, fileList)
      },
      handleRemove (file, fileList) {
        this.selectFileList = fileList.map(item => {
          return item.response && item.response.data && item.response.data.url
        })
        this.isUserHandle = true
      },
      beforeUpload (file) {
        const isJPG = file.type === 'image/jpeg' || true
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!')
        }
        const returnVal = isJPG && isLt2M
        this.fullscreenLoading = returnVal
        return returnVal
      },
      onExceed (files, fileList) {
        this.$message.warning(
          `当前限制选择 ${limit} 个文件，本次选择了 ${
            files.length
            } 个文件，共选择了 ${files.length + fileList.length} 个文件`
        )
        // this.$message.error('超过了可上传图片的最大数量!');
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      }
    }
  }
</script>

<style lang="less">
  .disabled-form {
    .el-upload--picture-card {
      display: none;
    }
  }
</style>
