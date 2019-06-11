<template>
  <div class=" middle ml-15 user-box" v-if="userInfo.uid">
    <global-avatar :image="userInfo.avatar" class="middle"/>
    <img v-show="false" :src="img" alt="">
    <ul class="user-menu" :class="{'is-right':!isSidebar}">
      <template v-if="!isConsole">
        <li>
          <a  href="/console">
            <p class="">{{userInfo.mobile}}</p>
            <!--<div class="color-yellow mt-10 fs-12">-->
            <!--<img class="middle mr-10"-->
            <!--src="/images/icon_yes.png"-->
            <!--alt="">-->
            <!--<span class="">已实名认证</span>-->
            <!--</div>-->
          </a>
        </li>
        <li>
          <nuxt-link
            class="color-f hover-color-f"
            :to="{name:'console-message-list-page',params:{page:1},query:{action:'msg'}}"
          >
            <img class="middle" src="/images/icon_msg.png" alt="">
            <span class="middle ml-10">未读消息</span>
            <global-badge
              v-if="parseInt(userInfo.no_read_msg_count)>0"
              :count="parseInt(userInfo.no_read_msg_count)"
              top="20px"
              right="20px"
            />
          </nuxt-link>
        </li>
        <li>
          <nuxt-link class="color-f hover-color-f" :to="{name:'console'}">
            <img class="middle" src="/images/icon_lock.png" alt="">
            <span class="middle ml-10">需求管理</span>
          </nuxt-link>
        </li>
      </template>
      <li>
        <a href="javascript:void(0)" class="color-f hover-color-f relative upload-a">
          <div class="middle" style="height:22px;width:22px;overflow: hidden"><img
            class="middle icon_upload width-100 height-100" :src="userInfo.avatar" alt=""></div>
          <span class="middle ml-5">上传头像</span>
          <upload-img
            :action="action"
            :limit="1000000000000"
            :uploadData="{uid:userInfo.uid}"
            :headers="headers"
            class="upload-img absoluteCC"
            @uploadSuccess="uploadSuccess"
          />
        </a>
      </li>
      <li class="clearfix">
        <button class="r logout-btn" @click="logoutHandle">退出</button>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import {baseURL, nodeApi} from '../../../config'
  import {apiLogout} from '../../../api/nodeApi'
  import UploadImg from '../../other/UploadImage'
  import {getLocalStore, setLocalStore,removeLocalStore} from '../../../utils/storeUtils'
  import {apiGetUserInfo, apiUpdateUserInfoJwt} from '../../../api/nodeApi'

  export default {
    name: 'UserHead',
    props: {
      isConsole: {
        type: Boolean,
        default: false
      }
    },
    components: {
      UploadImg
    },
    data () {
      return {
        action: `${nodeApi}/backend/api/uc_upload_avatar`,
        headers: {
          authorization: ''
        },
        img: '',
        timer: null
      }
    },
    computed: {
      ...mapState({
        isSidebar: state => state.common.isSidebar
      })
    },
 
    mounted () {
      if (getLocalStore('Authorization')) {       
        this.headers.authorization = getLocalStore('Authorization')
       this.SET_USER(Object.assign({jwt: getLocalStore('Authorization')},JSON.parse(getLocalStore('AuthUserInfo'))))
        this.getUserInfo()
     //   this.timer && clearInterval(this.timer)
      //  this.updateToken()         
      //  this.headers.authorization = this.userInfo.jwt
      }else{
           this.SET_USER(null)
           removeLocalStore('Authorization')
           removeLocalStore('AuthUserInfo')
      }
    },
    methods: {
      ...mapMutations(['SET_USER']),
       async getUserInfo () {
          let user_info =   await apiGetUserInfo({}, false) //登录之后，实时获取用户信息
             if (user_info.code == 200) {
            this.SET_USER(Object.assign({jwt: getLocalStore('Authorization')},user_info.data.list))
            setLocalStore("AuthUserInfo", JSON.stringify(user_info.data.list));
             }    
       },
      async updateToken () {
        this.timer = setInterval(async _ => {
          await apiUpdateUserInfoJwt({access_token: this.userInfo.jwt}, false, false)
        }, 1000 * 60 * 30)
      },
      logoutHandle () {     
        this.$confirm('是否退出登录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let {uid, username} = this.userInfo
          const {code} = await apiLogout({uid, username})
          if (code === 200) {
            this.$message({
              type: 'success',
              message: '退出成功!',
              duration: 1500
            })
            setTimeout(_ => {
              this.SET_USER(null)
              removeLocalStore('Authorization')
              removeLocalStore('AuthUserInfo')
              this.$router.push({path: '/user/login'})
              
              // this.openPage({path: '/user/login'})
            }, 1000)
          }
        }).catch(_ => {

        })
      },
      uploadSuccess (res, file, fileList) {
        if (res.code === 200) {
          this.img = file.url
          this.SET_USER({avatar: file.url})
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      }	

    }
  }
</script>

<style lang="less">
  @import "../../../assets/less/variables/index";

  .user-box {
    &:hover,
    &.active {
      .user-menu {
        transform: scaleY(1);
        opacity: 1;
      }
    }
    .user-menu {
      position: absolute;
      top: @headerH;
      right: @sideBarW;
      /*right: 0;*/
      background: #10172D;
      font-size: 14px;
      transition: .3s;
      transform: scaleY(0);
      transform-origin: center top;
      opacity: 0;
      text-align: left;
      width: 200px;
      &.is-right {
        right: 0;
      }
      > li {
        position: relative;
        padding: 0 20px;
        &:hover {
          background: #1D253B;
        }
        a {
          display: block;
          padding: 20px 0;
          border-bottom: 1px solid #1D253B;
          color: #fff;
          &.border-none {
            border-bottom: none;
          }
        }
        .logout-btn {
          width: 80px;
          height: 30px;
          border: 1px solid rgba(36, 45, 71, 1);
          color: #999;
          margin: 20px 0;
          background: #10172D;
        }
      }
    }
    .upload-a {
      overflow: hidden;
    }
    .upload-img {
      opacity: 0;
      z-index: 1;
      .el-dialog__wrapper {
        display: none !important;
      }
      .el-upload-list--picture-card {
        display: none !important;
      }
    }
  }
</style>
