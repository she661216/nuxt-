<template>
  <div class="footer">
    <div class="compart clearfix">
      <div class="s-logo">
        <img src="~static/images/footer_logo.png?ver=90">
      </div>
      <template v-if="footerLinks">
        <div
          v-for="(links , index) in footerLinks"
          :key="index"
          class="s-item"
        >
          <p class="h1">{{ links.title }}</p>
          <div class="clearfix">
            <template v-for="(item,itemIndex) in links.menu" >
              <div v-if="item.link==='feedback'" :key='itemIndex'>
                <a href="javascript:void (0)" @click="SET_FEEDBACK_VISIBLE(true)">
                  {{ item.linkName }}
                </a>
              </div>

              <div v-else-if="item.link==='newLink'" :key='itemIndex'>
                <a v-if="newsMenu && newsMenu.address" :href="newsMenu.address" target="_blank">
                  {{ item.linkName }}
                </a>
              </div>

              <div v-else-if="item.link==='shemeLink'" :key='itemIndex'>
                <a v-if="shemeMenu.length>0" :href="shemeMenu[0].url" target="_blank">
                  {{ item.linkName }}
                </a>
              </div>

              <div v-else :key='itemIndex'>
                <a :href="item.link" target="_blank">
                  {{ item.linkName }}
                </a>
              </div>

            </template>

          </div>
        </div>
        <template v-if="contactUs">
          <div class="s-item">
            <p class="h1">联系我们</p>
            <div class="clearfix fs-14">
              <p class="mb-10" v-if="contactUs.fw">服务热线：{{contactUs.fw[0].mobile}}</p>
              <p class="mb-10" v-if="contactUs.sq">售前咨询：{{contactUs.sq[0].mobile}}</p>
              <p class="mb-10">(工作日 9：00-18：00)</p>
              <p class="mb-10" v-if="contactUs.sh">售后服务：{{contactUs.sh[0].mobile}}</p>
              <p class="mb-10">(工作日 9：00-18：00)</p>
            </div>
          </div>
          <div class="s-item gz-item text-center" v-for="(item,index) in contactUs.gz" :key="index">
            <img
              :src="item.qrcode"
              style="width:100px;height:100px;"
              :alt="item.qrcode_name"
            >
            <p class="h4">{{item.desc}}</p>
            <p class="h4" v-if='index == 0'>智汇一品集团</p>
            <p class="h4" v-else>一品优选</p>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'

  export default {
    name: 'CommonFooter',
    data () {
      return {
        footerLinks: [
          {
            title: '智汇一品',
            menu: [
              {
                linkName: '集团简介',
                link: 'http://www.zhihuiep.com/cn/about/overview/'
              }, {
                linkName: '管理团队',
                link: 'http://www.zhihuiep.com/cn/about/leadership/'
              }, {
                linkName: '发展历程',
                link: 'http://www.zhihuiep.com/cn/about/history/'
              }, {
                linkName: '企业文化',
                link: 'http://www.zhihuiep.com/cn/about/culture/'
              }, {
                linkName: '企业荣誉',
                link: 'http://www.zhihuiep.com/cn/about/honor/'
              }
            ]
          },
          {
            title: '集团服务',
            menu: [
              {
                linkName: '创意交易',
                link: 'http://www.epwk.com/'
              }, {
                linkName: '知识产权',
                link: 'http://www.epzcw.com/'
              }, {
                linkName: '企业孵化',
                link: 'http://www.epjike.com/'
              }, {
                linkName: '财税金融',
                link: 'http://www.epcsw.com/ '
              }, {
                linkName: '人工智能与大数据',
                link: 'http://www.eplogo.cn/'
              }
            ]
          },
          {
            title: '网站导航',
            menu: [
              {
                linkName: '解决方案',
                link: 'solution'
              }, {
                linkName: '项目中心',
                link: 'project-center'
              }, {
                linkName: '优选专家',
                link: 'togetherWorks'
              }, {
                linkName: '关于我们',
                link: 'about'
              },
              // {
              //   linkName: '最新活动',
              //   link: 'newLink'
              // }, {
              //   linkName: '热门服务',
              //   link: '/service/hot-service/-1'
              // }, {
              //   linkName: '解决方案',
              //   link: 'shemeLink'
              // },
              // {
              //   linkName: '服务定价',
              //   link: ''
              // },
              // {
              //   linkName: '平台介绍',
              //   link: '/about'
              // }, 
               {
                linkName: '平台介绍',
                link: '/article/110'
              },{
                linkName: '意见反馈',
                link: 'feedback'
              }
            ]
          }
        ]
      }
    },
    computed: {
      ...mapState({
        newsMenu: state => state.common.newsMenu,
        shemeMenu: state => state.common.shemeMenu,
        contactUs: state => state.common.contactUs
      })
    },
    methods: {
      ...mapMutations(['SET_FEEDBACK_VISIBLE'])
    }
  }
</script>

<style scoped lang="less">
  @import "../../../assets/less/variables/index";

  .compart {
    width: 1200px;
    margin: 0 auto;
  }

  //底部
  .footer {
    width: 100%;
    background-color: #fff;
    .compart {
      border-bottom: #f0f0f0 1px solid;
      padding: 40px 0;
      .s-logo {
        float: left;
        margin-right: 88px;
        img {
          width: 150px;
          margin-top: 10px;
        }
      }
      .s-item {
        float: left;
        /*text-align: center;*/
        margin-right: 80px;
        &.gz-item {
          margin-right: 27px;
        }
        &:last-child {
          margin-right: 0 !important;
        }
        p {
          font-size: 14px;
          color: #666666;
          &.h1 {
            font-size: 16px;
            color: #333;
            font-weight: 600;
            padding-bottom: 20px;
          }
          &.h3 {
            font-size: 28px;
            font-weight: 600;
          }
          &.h4 {
            font-size: 14px;
            margin: 10px 0;
            &:nth-of-type(1) {
              margin-top: 15px;
            }
          }

        }
        a {
          display: block;
          padding-bottom: 10px;
          font-size: 14px;
          color: #666666;
          &:hover {
            color: @theme-color;
          }
        }
      }
    }
  }

</style>
