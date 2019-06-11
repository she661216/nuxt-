<template>
  <div>
    <div class="header">
      <div class="project-center__btn">
        <a
          v-if="contactUs && contactUs.zx"
          :href="`http://wpa.qq.com/msgrd?v=3&uin=${contactUs.zx[Math.floor(Math.random()*contactUs.zx.length)].qq}&site=qq&menu=yes`"
          target="_blank"
        >
          <img src="/images/project-center/btn.png">
        </a>
      </div>
    </div>
    <div class="items clearfix">
      <div class="list" v-for="(item,index) in projectList" :key="index">
        <div class="top">
          <img :src="item.face_pic">
        </div>
        <div class="title">{{item.p_name}}</div>
        <div class="desc" v-html="htmlDecode(item.simple_desc)"></div>
        <div class="desc_list">
          <span v-if="item.cate_pid_name">{{item.cate_pid_name}}</span>
          <span v-if="item.cate_id_name">{{item.cate_id_name}}</span>
        </div>
        <div class="hr"></div>
        <div class="systems">
          <div class="left" v-if="item.home_url">
            <div class="win dd">
              <a :href="item.home_url" target="_blank"></a>
            </div>
          </div>
          <div class="left" v-if="item.ios_url">
            <div class="ios dd">
              <a :href="item.ios_url" target="_blank"></a>
            </div>
          </div>
          <div class="left" v-if="item.android_url">
            <div class="android dd">
              <a :href="item.android_url" target="_blank"></a>
            </div>            
          </div>

           <div class="left" v-if="!item.home_url && !item.ios_url && !item.android_url">
            <div class="dd no-sys">
              <a></a>
            </div>            
          </div>


        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { apiProjectListCen } from "../../api/phpApi";

export default {
  data() {
    return {
      projectList: []
    };
  },
  computed: {
    ...mapState({
      contactUs: state => state.common.contactUs
    })
  },
  async asyncData() {
    let data = await apiProjectListCen({ page: 1, limit: 100 });
    return { projectList: data.data ? data.data.list : [] };
  },
  methods: {
    htmlDecode: htmlStr => {
      return htmlStr
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "");
    }
  }
};
</script>

<style lang="less">
.header {
  background: url(../../static/images/project-center/banner.png) no-repeat
    center;
  width: 100%;
  height: 400px;
}

.left {
  float: left;
}

.right {
  float: right;
}

.project-center__btn {
  width: 194px;
  height: 62px;
  margin: 0 auto;
  padding-top: 255px;
}

.project-center__btn img {
  cursor: pointer;
}

.items {
  width: 1250px;
  margin: 0 auto;
  margin-top: 50px;
}

.list {
  width: 288px;
  height: 386px;
  background: #ffffff;
  float: left;
  margin: 0 8px;
  margin-bottom: 20px;
}

.top {
  margin: 0 auto;
  padding-top: 22px;
  padding-bottom: 22px;
  img {
    height: 100px;
    margin: 0 auto;
  }
}

.title {
  font-family: PingFangSC-Semibold;
  font-size: 20px;
  color: #000000;
  text-align: center;
}

.desc {
     font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #9b9b9b;
    line-height: 20px;
    width: 85%;
    margin: 0 auto;
    margin-top: 15px;
    height: 83px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
}

.desc_list {
  width: 85%;
  margin: 0 auto;
  margin-top: 10px;
}

.desc_list span {
    margin-right: 3px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #42585f;
    background: #eef1f2;
    -webkit-border-radius: 9px;
    border-radius: 9px;
    min-width: 62px; 
    height: 20px;
    line-height: 8px;
    display: inline-block;
    padding: 6px 10px;
}

.hr {
  border: 1px solid #eaeaea;
  margin-top: 24px;
}

.win {
  background: url(../../static/images/project-center/win.png) no-repeat;

  height: 24px;
}

.win:hover {
  background: url(../../static/images/project-center/win-active.png) no-repeat;
}

.ios {
  background: url(../../static/images/project-center/ios.png) no-repeat;
  height: 24px;
}

.ios:hover {
  background: url(../../static/images/project-center/ios-active.png) no-repeat;
}

.android {
  background: url(../../static/images/project-center/android.png) no-repeat;

  height: 24px;
}

.android:hover {
  background: url(../../static/images/project-center/android-active.png)
    no-repeat;
}

.kf {
  background: url(../../static/images/project-center/kf.png) no-repeat;

  height: 24px;
}

.dd {
  cursor: pointer;
margin: 0 auto;
  margin-top: 25px;
width: 65px;
  a {
    display: block;
    height: 100%;
    width: 100%;
  }
}
.no-sys{
 background: url(../../static/images/project-center/kf.png) no-repeat;

  height: 24px;
    a{
   color: #fff;
    }
}

.systems {
  width: 100%;
  height: 64px;
  line-height: 64px;
  text-align: center;
      display: flex;
  .left{
    width:100%;
  }
}
</style>
