<template>
  <section class="appli-detail">
    <!-- <div class="issue-header-bg relative"></div> -->
    <div class="issue-index clearfix">
      <div class="common-wrapper clearfix">
        <div class="content-main l">
          <div class="main-top">
            <img :src="URL+detailData.face_pic" class="l">
            <div class="box">
              <p>
                <span class="name">{{detailData.true_name.slice(0,1)}}**({{detailData.nick_name}})</span>
                &nbsp;&nbsp;{{detailData.position_type_name}}
              </p>
              <p>{{detailData.experience[0].p_name}} | {{detailData.experience[0].company_name}} |</p>
              <p class="school">
                <img src="/images/togetherWorksTime.png">
                {{detailData.school}}{{detailData.major}}
              </p>
            </div>
            <img src="/images/togetherWorksDetailIcon.png" class="icon">
          </div>
          <div class="main-info">
            <ul class="info-nav">
              <li>
                <p class="f20">
                  <span>{{detailData.add_work_time_year}}</span>年
                </p>
                <p>工龄</p>
              </li>
              <li>
                <p class="f20">
                  <span>{{detailData.sys_score}}</span>分
                </p>
                <p>人才分评</p>
              </li>
              <li>
                <p class="f20">
                  <span>{{detailData.add_work_time_days}}</span>天
                </p>
                <p>优选成长周期</p>
              </li>
            </ul>
            <div
              v-if="evaluate_length_type && detailData.evaluate.length>447"
              class="text clearfix"
            >{{detailData.evaluate}}</div>
            <div v-else class="text clearfix">{{detailData.evaluate.slice(0,447)}}</div>
            <div
              class="r more-btn"
              @click="evaluateLengthTypeFun"
              v-if="detailData.evaluate.length>447 && !evaluate_length_type"
            >查看更多</div>
          </div>
          <div class="main-work-list">
            <div class="title">
              <div class="l">
                工作经历与项目经验
                <span>WORK EXPERIENCE</span>
              </div>
              <div class="r">按照时间最新查看></div>
            </div>
            <div class="content">
              <ul>
                <li v-for="(item,index) in detailData.experience" :key="index">
                  <div v-if="index < more_length" class="list-box">
                    <div class="t">
                      <div class="l">
                        <span>{{item.company_name}}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.p_name}}
                      </div>
                      <div class="r">{{item.p_start_time}}~{{item.p_end_time}}</div>
                    </div>
                    <div class="text">{{item.p_content}}</div>
                  </div>
                </li>
              </ul>

              <div>
                <button @click="showMorePro" v-if=" detailData.experience.length > more_length">展开更多</button>
              </div>
            </div>
          </div>

          <div class="main-work-list">
            <div class="title fag">
              <div class="l">
                技能标签
                <span>SKILL TAG</span>
              </div>
            </div>
            <div class="content">
              <ul class="skill-group">
                <li v-for="(item,index) in detailData.skills_span_arr" :key="index">{{item}}</li>
              </ul>
              <div class="clearfix"></div>
            </div>
          </div>
        </div>

        <div class="content-side r">
          <div class="server">
            <img src="/images/togetherWorksOnLine.png">
            <a :href="`http://wpa.qq.com/msgrd?v=3&uin=${contactUs.zx[0].qq}&site=qq&menu=yes`"  target="_blank"></a>
          </div>
          <div class="team">
            <div class="title">所在U+团队</div>
            <div class="box">
              <img :src="URL+shopInfoData.face_pic">
              <div>
                <p class="name">{{shopInfoData.company_name}}</p>
                <p>{{shopInfoData.good_skills_name.replace(/,/g, "|")}}</p>
                <p>综合评分：{{shopInfoData.syn_score}} 分</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="position-top">
      <div class="main-top">
        <img :src="URL+detailData.face_pic" class="l">
        <div class="box">
          <p>
            <span class="name">{{detailData.true_name.slice(0,1)}}**({{detailData.nick_name}})</span>
            &nbsp;&nbsp;{{detailData.position_type_name}}
          </p>
          <p>{{detailData.experience[0].p_name}} | {{detailData.experience[0].company_name}} |</p>
          <p class="school">
            <img src="/images/togetherWorksTime.png">
            {{detailData.school}}{{detailData.major}}
          </p>
        </div>
        <div class="info-nav">
          <div class="tab">
            <a :href="`http://wpa.qq.com/msgrd?v=3&uin=${contactUs.zx[0].qq}&site=qq&menu=yes`" target="_blank">联系TA</a>
          </div>
          <ul>
            <li>
              <p class="f20">
                <span>{{detailData.sys_score}}</span>分
              </p>
              <p>人才分评</p>
            </li>

            <li>
              <p class="f20">
                <span>{{detailData.add_work_time_days}}</span>天
              </p>
              <p>优选成长周期</p>
            </li>

            <li>
              <p class="f20">
                <span>{{detailData.add_work_time_year}}</span>年
              </p>
              <p>工龄</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { apiGetShopTalentInfo, apiShopInfoById } from "../../api/phpApi";
import { baseURL, nodeApi } from "../../config";
import { mapState, mapMutations } from "vuex";
export default {
  name: "togetherWorks-detail",
  components: {},
  data() {
    return {
      URL:baseURL,
      t_id: this.$route.query.id,
      evaluate_length_type: false,
      shopInfoData: {
        good_skills: "",
        good_skills_name:''
      },
      detailData: {
        evaluate: [],
        skills_span_arr: "",
        true_name: [],
        experience: [
          {
            company_name: "",
            p_name: ""
          }
        ]
      },
      more_length: 3
    };
  },
  computed: {
    ...mapState({
      contactUs: state => state.common.contactUs
    })
  },
  mounted() {
    this.get_shop_talent_info();
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      var root = document.getElementsByClassName("position-top")[0];
      var nav = document.getElementsByClassName("page-common-top")[0];
      var nav_bg = document.getElementsByClassName("issue-header-bg")[0];

      if (scrollTop > 0) {
        nav.style.cssText = "position:fixed;  z-index: 222;width:100%;background: #ffff;";
        root.style.cssText = "display:block";
        nav_bg.style.cssText = "position:fixed;top:0;    width: 100%;    z-index: 222;";
      } else {
        root.style.cssText = "display:none";
        nav.style.cssText = "  width:100%; background: #ffff; ";
        nav_bg.style.cssText = "position:relative";
      }
    },

    showMorePro() {
      this.more_length = 100;
    },
    evaluateLengthTypeFun() {
      this.evaluate_length_type = true;
    },
    async get_shop_talent_info() {
      let { data } = await apiGetShopTalentInfo({ id: this.t_id });
      this.detailData = data ? data.list : [];
      this.get_shop_info();
    },
    async get_shop_info() {
      let { data } = await apiShopInfoById({ id: this.detailData.shop_id });
      this.shopInfoData = data ? data.list : [];
    }
  }
};
</script>



<style scoped lang="less">
@import "../../assets/less/variables/index";
.clearfix {
  content: " ";
  clear: both;
}
.el-select-dropdown__item:last-child {
  padding-bottom: 42px;
}
.appli-detail {
  .c999 {
    color: #999;
  }
  @color: #aaa;

  .issue-header-bg {
    height: 80px;
    overflow: hidden;
    position: relative;
    background: #000;
  }

  .issue-index {
    .content-main {
      width: 880px;
      position: relative;

      .main-top {
        background: #fff;
        padding: 40px;
        height: 230px;
        border-bottom: 1px solid #eee;
        img {
          width: 150px;
          height: 150px;
          border-radius: 180px;
          margin-right: 30px;
        }
        .box {
          float: left;
          width: 470px;
          overflow: hidden;
          height: 150px;
          p {
            font-size: 16px;
            color: #4c4c4c;
            line-height: 50px;
            .name {
              font-size: 22px;
              font-weight: 700;
            }
          }
          .school {
            img {
              width: 18px;
              height: 18px;
              vertical-align: sub;
              padding: 0;
              -webkit-border-radius: 0;
              border-radius: 0;
              margin: 0;
              display: inline-block;
              margin-right: 10px;
            }
            font-size: 14px;
          }
        }
        .icon {
          position: absolute;
          width: 146px;
          height: 36px;
          right: 40px;
          top: 30px;
          margin-right: 0;
          border-radius: 0;
        }
      }
      .main-info {
        background: #fff;
        padding: 40px;
        padding-bottom: 85px;
        .info-nav {
          li {
            float: left;
            margin: 8px 60px 25px 60px;
            text-align: center;
            p {
              color: #333;

              line-height: 33px;
              font-size: 16px;
              span {
                font-size: 30px;
              }
            }
            .f20 {
              color: #060918;
              font-size: 20px;
            }
          }
        }
        .more-btn {
          color: @theme-color;
          margin-top: 20px;
          margin-bottom: 55px;
          cursor: pointer;
        }
        .text {
          line-height: 24px;
          width: 100%;
          display: block;
          word-break: break-all;
        }
      }
      .main-work-list {
        margin-top: 20px;
        background: #fff;
        .title {
          height: 80px;
          border-bottom: 1px solid #eee;
          padding: 20px 40px;
          .l {
            width: 192px;
            font-size: 20px;
            span {
              font-size: 12px;
              color: #ccc;
            }
          }

          .r {
            font-size: 14px;
            color: #999;
            margin-top: 15px;
          }
        }
        .fag .l {
          width: 100px;
        }
        .content {
          padding: 10px 40px 40px 40px;
          .list-box {
            padding: 30px 0;
            border-bottom: 1px solid #eee;
          }
          .t {
            color: #333;
            font-size: 20px;
            height: 22px;
            span {
              margin-bottom: 20px;
              font-weight: 700;
              color: #333;
            }
            .r {
              font-size: 14px;
              color: #4c4c4c;
            }
          }
          .text {
            clear: both;
            line-height: 22px;
            margin-top: 20px;
            color: #666666;
            width: 600px;
          }
          .skill-group {
            margin-top: 30px;
            li {
              border: 1px solid #eee;
              margin-left: 10px;
              float: left;
              text-align: center;
              padding: 15px 25px;
              margin-bottom: 20px;
              border-radius: 5px;
              color: #666;
              font-size: 16px;
            }
          }
        }
        button {
          width: 160px;
          height: 50px;
          color:  @theme-color;
          background: #fff2f2;
          border: 1px solid @theme-color;
          border-radius: 5px;
          display: block;
          margin: 0 auto;
          margin-top: 50px;
        }
      }
    }

    .content-side {
      width: 300px;
      .server {
        position: relative;
        img {
          width: 300px;
          height: 300px;
          margin-bottom: 20px;
        }
        a {
          cursor: pointer;
          position: absolute;
          bottom: 37px;
          width: 200px;
          height: 41px;
          left: 50px;
        }
      }
      .team {
        background: #fff;

        .title {
          font-size: 20px;
          color: #333;
          padding: 20px 30px;
          border-bottom: 1px solid #eee;
        }
        .box {
          height: 120px;
          overflow: hidden;
          width: 300px;
          padding: 20px;
          img {
            float: left;
            width: 80px;
            height: 80px;
            margin-right: 17px;
          }

          p {
            font-size: 14px;
            color: #666;
            line-height: 27px;
            float: right;
            width: 155px;
            height: 28px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .name {
            font-size: 16px;
            color: #333;
          }
        }
      }
    }

    .common-wrapper {
      margin-top: 70px;
      position: relative;
      z-index: 1;
      margin-bottom: 100px;
    }
  }

  .position-top {
    display: none;
    position: fixed;
    width: 100%;
    background: #fff;
    top: 120px;
    box-shadow: 0px 10px 40px 0px #dfdede;
    z-index: 1111;
       border-top: 1px solid #eee;
    .main-top {
      background: #fff;
      width: 1200px;
      margin: 0 auto;
      padding: 25px 0;
      height: 200px;
      border-bottom: 1px solid #eee;
      img {
        width: 150px;
        height: 150px;
        border-radius: 180px;
        margin-right: 30px;
      }
      .box {
        float: left;
        width: 470px;
        overflow: hidden;
        height: 150px;
        p {
          font-size: 16px;
          color: #4c4c4c;
          line-height: 50px;
          .name {
            font-size: 22px;
            font-weight: 700;
          }
        }
        .school {
          img {
            width: 18px;
            height: 18px;
            vertical-align: sub;
            padding: 0;
            -webkit-border-radius: 0;
            border-radius: 0;
            margin: 0;
            display: inline-block;
            margin-right: 10px;
          }
          font-size: 14px;
        }
      }
      .icon {
        position: absolute;
        width: 146px;
        height: 36px;
        right: 40px;
        top: 30px;
        margin-right: 0;
        border-radius: 0;
      }

      .info-nav {
        float: right;
        width: 500px;
        .tab {
          float: right;
          width: 100px;
          height: 40px;
          border-radius: 5px;
          text-align: center;
          line-height: 40px;
          margin: 5px 0px 20px 0;
          cursor: pointer;
          background: @theme-color;
          a {
            font-size: 16px;
            color: #fff;
          }
        }
        ul {
          clear: both;
          content: " ";
          li {
            float: right;
            margin: 8px 0 25px 100px;
            text-align: center;
            p {
              color: #333;

              line-height: 33px;
              font-size: 14px;
              span {
                font-size: 30px;
              }
            }
            .f20 {
              color: #060918;
              font-size: 20px;
            }
          }
        }
      }
    }
  }
}
</style>



