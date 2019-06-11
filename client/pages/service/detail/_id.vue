<template>
  <section class="service-detail  common-wrapper">
    <div v-if="infoData">
      <div class="detail-header clearfix">
        <div v-if="infoData.face_pic" class="middle detail-header__img r">
          <img :src="infoData.face_pic" alt="">
        </div>
        <div class="detail-header__content pb-5">
          <div>
            <img class="middle mr-15" :src="infoData.tmp_pic" alt="">
            <h6 class="fs-40 font-blod middle width-80 lh1-2">
              {{infoData.s_name}}
            </h6>
          </div>
          <p class="fs-14 color-3 lh1-4 mt-40 mb-50 width-80">{{infoData.s_desc}}</p>
          <nuxt-link
            class="inline pt-20 pb-20 pl-40 pr-40 color-f common-border common-bg mr-20"
            :to="{name:'service-issue',query:{cate_pid:infoData.cate_pid,cate_id:infoData.cate_id}}"
          >对，我要做这类型项目
          </nuxt-link>
          <a
            v-if="infoData.demo_url"
            :href="infoData.demo_url"
            class="inline pt-20 pb-20 pl-40 pr-40 common-color common-border"
            target="_blank"
          >体验一下该样本产品</a>
        </div>
      </div>
      <div class="detail-main">
        <no-ssr>
          <sticky ref="stickyNavRef" @reset="reset" @fixedAfter="fixedAfter" @scrolling="scrolling">
            <ul class="detail-nav" :class="{'active':isFixed}">
              <template v-for="(item,index) in navList" >
                <li
                  v-if="item.isShow"
                  @click="scrollToHandle(item.key)"
                  :class="{active:activeIndex===item.key}"
                  ref="navItemRef"
                  :key="index"
                >{{item.title}}
                </li>
              </template>
            </ul>
          </sticky>
        </no-ssr>

        <div v-if="infoData.c_desc" class="pb-40" ref="prodInfoRef1">
          <h6 class="main-title">产品概述</h6>
          <div>
            <p class="desc">{{infoData.c_desc}}</p>
            <template v-if="infoData.second && infoData.second.product">
              <div class="content-item clearfix" v-for="(item,index) in infoData.second.product" :key="index">
                <h6 class="content-title middle-box"><span class="middle">{{item.title | sliceStr(18) }}</span></h6>
                <div class="content-item__r">
                  <div v-html="item.desc"></div>
                  <ul class="clearfix" v-if="item.save_pic">
                    <li class="content-img__box" v-for="(key,subIndex) in Object.keys(item.save_pic)" :key="subIndex">
                      <img class="absoluteCC width-100" :src="item.save_pic[key]" alt="">
                    </li>
                  </ul>
                </div>
              </div>
            </template>
          </div>
        </div>

        <div class="pb-40" ref="prodInfoRef2" v-if="infoData.cs_desc">
          <h6 class="main-title">产品服务</h6>
          <div>
            <p class="desc">{{infoData.cs_desc}}</p>
            <template v-if="infoData.second && infoData.second.product_service">
              <div class="content-item clearfix" v-for="(item,index) in infoData.second.product_service" :key="index">
                <h6 class="content-title middle-box"><span class="middle">{{item.title | sliceStr(18)}}</span></h6>
                <div class="content-item__r">
                  <div v-html="item.desc"></div>
                  <ul class="clearfix" v-if="item.save_pic">
                    <li class="content-img__box" v-for="(key,subIndex) in Object.keys(item.save_pic)" :key="subIndex">
                      <img class="absoluteCC width-100" :src="item.save_pic[key]" alt="">
                    </li>
                  </ul>
                </div>
              </div>
            </template>
          </div>
        </div>

        <div v-if="infoData.yy_desc" class="pb-40" ref="prodInfoRef3">
          <h6 class="main-title">应用场景</h6>
          <div>
            <p class="desc">{{infoData.yy_desc}}</p>
            <template v-if="infoData.second && infoData.second.yun_yong">
              <div class="content-item clearfix" v-for="(item,index) in infoData.second.yun_yong" :key="index">
                <h6 class="content-title middle-box"><span class="middle">{{item.title | sliceStr(18)}}</span></h6>
                <div class="content-item__r">
                  <div v-html="item.desc"></div>
                  <ul class="clearfix" v-if="item.save_pic">
                    <li class="content-img__box" v-for="(key,subIndex) in Object.keys(item.save_pic)" :key="subIndex">
                      <img class="absoluteCC width-100" :src="item.save_pic[key]" alt="">
                    </li>
                  </ul>
                </div>
              </div>
            </template>
          </div>
        </div>

        <div v-if="infoData.second && infoData.second.help_doc" class="pb-40 mb-40" ref="prodInfoRef4">
          <h6 class="main-title">帮助与文档</h6>
          <div>
            <a
              class="common-hover color-3 pr-30"
              v-for="(item,index) in infoData.second.help_doc"
              :key="index"
              :href="item.save_name"
              target="_blank"
            >{{item.file_name}}</a>
          </div>
        </div>
      </div>
    </div>
    <page-no-data class="pt-30 mt-40 bg-f" v-else/>

  </section>
</template>

<script>
  import Sticky from '../../../components/other/Sticky/index'
  import {apiServiceDetail} from '../../../api/phpApi'
  import PageNoData from '../../../components/other/PageNoData/index'

  export default {
    name: 'ServiceDetail',
    components: {
      Sticky,
      PageNoData
    },
    data () {
      return {
        activeIndex: 0,
        navList: [{
          title: '产品概述',
          key: 1,
          isShow: false
        }, {
          title: '产品服务',
          key: 2,
          isShow: false
        }, {
          title: '应用场景',
          key: 3,
          isShow: false
        }, {
          title: '帮助与文档',
          key: 4,
          isShow: false
        }],
        isFixed: false,
        offsetTop: 120,
        isHandleScroll: false,
        infoData: null
      }
    },
    async asyncData ({params, store}) {
      let {data} = await apiServiceDetail({id: params.id, uid: store.state.user.userInfo.uid})
      return {infoData: data}
    },
    async fetch ({store, params}) {
      await store.commit('SET_HEADER_ACTIVE', true)
    },
    mounted () {
      if (this.infoData && this.infoData.second) {
        this.navList[0].isShow = !!this.infoData.c_desc
        this.navList[1].isShow = !!this.infoData.cs_desc
        this.navList[2].isShow = !!this.infoData.yy_desc
        this.navList[3].isShow = this.infoData.second && !!this.infoData.second.help_doc
      }
      setTimeout(_ => {
        this.$refs.stickyNavRef.initListener()
      }, 1000)
    },
    methods: {
      scrollToHandle (index) {
        this.isHandleScroll = true
        this.activeIndex = index
        let scrollTop = document.getElementsByTagName('html')[0].scrollTop - this.offsetTop
        document.getElementsByTagName('html')[0].scrollTop = scrollTop + this.$refs[`prodInfoRef${index}`].getBoundingClientRect().top
        setTimeout(_ => {
          this.isHandleScroll = false
        }, 400)
      },
      reset () {
        this.isFixed = false
      },
      fixedAfter () {
        this.isFixed = true
      },
      scrolling () {
        if (this.isHandleScroll) return
        [1, 2, 3, 4].forEach(key => {
          this.$refs[`prodInfoRef${key}`] && this.$refs[`prodInfoRef${key}`].getBoundingClientRect().top <= this.offsetTop && (this.activeIndex = key)
        })
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../../assets/less/variables/index";

  .service-detail {
    .detail-header {
      padding: 80px 0;
      border-bottom: 1px solid #E6E6E6;
      .detail-header__content {
        overflow: hidden;
        img {
          width: 90px;
          height: 90px;
        }
      }
      .detail-header__img {
        width: 400px;
        height: 280px;
        margin: 20px 40px 0 60px;
        background: rgba(230, 230, 230, 1);
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .detail-nav {
      text-align: center;
      &.active {
        width: 100%;
        background: #f7f7f7;
        /*box-shadow: 0 1px 15px #ccc;*/
        li {
          padding: 25px 10px;
        }
      }
      li {
        padding: 40px 10px;
        display: inline-block;
        cursor: pointer;
        transition: all .3s;
        &.active {
          color: @theme-color;
        }
      }
    }
    .main-title {
      font-size: 20px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      margin-bottom: 30px;
    }
    .desc {
      font-size: 14px;
      color: rgba(51, 51, 51, 1);
      line-height: 20px;
      margin-bottom: 38px;
    }
    .content-item {
      position: relative;
      margin-bottom: 40px;
      background: #fff;
      .content-title {
        position: absolute;
        top: 0;
        left: 0;
        /*float: left;*/
        width: 100px;
        height: 100%;
        background: #E6E6E6;
        text-align: center;
        padding: 0 35px;
        span{
          width:12px;
        }
      }
      .content-item__r {
        padding: 40px 50px 40px 150px;
        background: #fff;
        > div {
          font-size: 14px;
          color: rgba(51, 51, 51, 1);
          line-height: 20px;
          margin-bottom: 20px;
        }
        .content-img__box {
          width: 300px;
          height: 150px;
          margin-right: 30px;
          background: #eee;
          float: left;
          position: relative;
          img {
            width: 300px;
            height: 150px;
          }
          &:nth-child(3) {
            margin-right: 0;
          }
        }
      }
    }
  }

</style>
