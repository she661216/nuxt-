<template>
  <section class="appli-index">
    <div class="issue-header-bg relative">
      <img class="absoluteCC" src="/images/togetherWorksBg.png" alt>
      <button class="btn" @click="$router.push({name:'service-issue'})"></button>
    </div>

    <div class="common-wrapper clearfix">
      <i class="left-top-icon">
        <img src="/images/shaixuan.png" alt>
      </i>
      <div class="top-form">
        <h5>雇佣我们的优质人才</h5>
        <div>
          <el-form ref="form" :model="form" label-width="82px" class="pad30">
            <el-row>
              <el-col :span="7">
                <el-form-item label="服务范围：" class="hy">
                  <el-input
                    @focus="industryBox"
                    v-model="good_skills_name"
                    class="w300"
                    placeholder
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="7">
                <el-form-item label="职位：" class="hy1">
                  <el-input
                    @focus="talentBox"
                    v-model="talent_c_name"
                    class="w300"
                    placeholder
                    readonly
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="7">
                <el-form-item label="排序方式：">
                  <el-select v-model="form.order" placeholder="请选择" @change="selectOrder">
                    <el-option
                      v-for="item in orderList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="main-list">
        <ul v-if="list.length">
          <li v-for="item in list" :key="item">
            <div class="top-box">
              <!-- <router-link :to="'/togetherWorks/detail?id='+item.t_id" target="_blank"> -->
                <img :src="item.face_pic">
              <!-- </router-link> -->
              <div class="content">
                <!-- <router-link :to="'/togetherWorks/detail?id='+item.t_id" target="_blank"> -->
                  <p class="name">
                    {{item.true_name[0]}}**({{item.nick_name}})
                    <span>&nbsp;{{item.experience.p_name}}</span>
                  </p>
                <!-- </router-link> -->
                <p class="info">
                  <!-- <i>{{item.experience.p_name}}</i>
                  <i>&nbsp;|&nbsp;</i> -->
                  <i class="s-name">{{item.shop_name}}</i>
                  <i>&nbsp;|&nbsp;</i>人才分:
                  <span>{{item.sys_score}}</span>分
                </p>
                <p class="inco-info">
                  <i>
                    <img src="/images/togetherWorksTSchool.png">
                    {{item.add_work_time}}年
                  </i>
                  <i>
                    <img src="/images/togetherWorksTime.png">
                    {{item.school}}
                  </i>
                </p>
              </div>
            </div>
            <div class="bottom-box">
              <ul>
                <li v-for="(index,k) in item.skills_span.split(',')" :key="k" v-if="k < 5">{{index}}</li>

                <!-- <li class="active">
                  <router-link :to="'/togetherWorks/detail?id='+item.t_id" target="_blank">TA的资料</router-link>
                </li> -->
              </ul>
            </div>
          </li>
        </ul>
        <div v-else class="no-data">暂无数据</div>

        <!-- 分页 -->
        <div class="pagination">
          <global-pagination
            :total="total"
            :page="form.page"
            :pageSize="form.limit"
            @change="paginationChange"
            class="page"
          />
        </div>
      </div>

      <div class="title-pro">
        <i></i>项目启动三步走
      </div>
      <div class="step">
        <img src="/images/togetherWorksStep.png" alt>
      </div>
    </div>
    <console-manager-store
      @dialogHide="dialogHanderHide"
      @selectIndustry="selectIndustry"
      :dialogTableVisiblee="industryIsShow"
      :type="true"
    ></console-manager-store>

    <console-manager-Talent
      @dialogHide="dialogHanderHide"
      @selectTalent="selectTalent"
      :dialogTableVisiblee="talentIsShow"
    ></console-manager-Talent>
  </section>
</template>

<script>
import { apiTalentList } from "../../api/phpApi";
import consoleManagerStore from "../../components/layoutConsole/ManageSide/industry";
import consoleManagerTalent from "../../components/layoutConsole/Talent/index";

export default {
  name: "togetherWorks-page",
  components: {
    consoleManagerStore,
    consoleManagerTalent
  },
  data() {
    return {
      pid: this.$route.query.p_id,
      orderList: [
        {
          id: 0,
          name: "默认排序"
        },
        {
          id: 1,
          name: "评分最高"
        },
        {
          id: 2,
          name: "工龄倒序"
        },
        {
          id: 3,
          name: "工龄正序"
        }
      ],
      list: [],
      industryIsShow: false,
      talentIsShow: false,
      good_skills_name: "",
      talent_c_name: "",
      total: 0,
      form: {
        good_skills: "",
        talent_c_id: "",
        talent_c_pid: "",
        order: "",
        limit: 12,
        page: 1
      }
    };
  },

  mounted() {
    if (this.pid) {
      this.form.talent_c_pid = this.pid;
    }
    this.submitFrom();
  },
  methods: {
    paginationChange(page) {
      this.scrollTop();
      this.form.page = page;
      this.submitFrom();
    },
    talentBox() {
      this.talentIsShow = true;
    },
    industryBox() {
      this.industryIsShow = true;
    },
    dialogHanderHide() {
      this.industryIsShow = false;
      this.talentIsShow = false;
    },

    selectIndustry(data) {
      let id = data.id;
      let name = data.name;
      this.form.good_skills = id;
      this.good_skills_name = name;
      this.form.page = 1;
      this.submitFrom();
    },

    selectTalent(data) {
      let id = data.id;
      let name = data.name;
      this.form.talent_c_id = id;
      this.form.talent_c_pid = "";
      this.talent_c_name = name;
      this.form.page = 1;
      this.submitFrom();
    },

    selectOrder(data) {
      this.form.page = 1;
      this.submitFrom();
    },
    async submitFrom() {
      let { count, data } = await apiTalentList(this.form);
      this.list = data ? data.list : data;
      this.total = data ? data.count : 0;
    }
  }
};
</script>

<style lang="less">
.appli-index {
  .el-form .el-form-item__label {
    color: #999;
  }
  .pagination {
    clear: both;
    .el-pagination {
      margin-top: 15px;
    }
  }
}
</style>

<style scoped lang="less">
@import "../../assets/less/variables/index";
.el-select-dropdown__item:last-child {
  padding-bottom: 42px;
}
.appli-index {
  .c999 {
    color: #999;
  }
  @color: #aaa;

  .hy {
    margin-right: 6px;
  }
  .hy1 {
    margin-right: 26px;
  }
  .issue-header-bg {
    height: 400px;
    overflow: hidden;
    position: relative;
    .btn {
      position: absolute;
      width: 112px;
      top: 174px;
      left: 25%;
      height: 39px;
    }
    a {
      display: block;
      width: 202px;
      height: 52px;
      position: absolute;
      top: 284px;
      left: 44.4%;
    }
  }

  .common-wrapper {
    margin-top: -80px;
    position: relative;
    z-index: 1;
    width: 1185px;
    min-height: 200px;
    margin-bottom: 100px;
    position: relative;
    .left-top-icon {
      position: absolute;
      width: 50px;
      height: 50px;
    }
    .top-form {
      padding: 40px 50px 25px 50px;
      background: #fff;
      h5 {
        font-size: 24px;
        margin-bottom: 20px;
      }
    }
    .main-list {
      width: 1200px;
      li {
        margin-top: 15px;
        margin-right: 15px;
        float: left;
        width: 385px;
        background: #fff;
        height: 190px;
        overflow: hidden;
        .top-box {
          border-bottom: 1px solid #eee;
          height: 133px;
          overflow: hidden;
          img {
            width: 80px;
            height: 80px;
            margin: 26px 20px;
            display: inline-block;
            -webkit-border-radius: 130px;
            border-radius: 130px;
          }
          .content {
            width: 264px;
            float: right;
            padding: 20px 0;
            line-height: 30px;
            .name {
              height: 30px;
              font-size: 16px;
              font-weight: 700;
              overflow: hidden;
              span {
                font-weight: 500;
              }
            }
            .info {
              height: 30px;
              font-size: 14px;
              overflow: hidden;
              i {             
                float: left;             
                height: 28px;
              }
                .s-name{
                max-width: 120px;
                   overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              span {
                color: #d70c19;
              }
            }
            .inco-info {
              height: 30px;
              overflow: hidden;
              i {
                color: #999;
                margin-right: 15px;
                font-size: 14px;
                img {
                  width: 20px;
                  height: 20px;
                  vertical-align: sub;
                  padding: 0;
                  border-radius: 0;
                  margin: 0;
                }
              }
            }
          }
        }
        .bottom-box {
          ul {
            li {
              width: 64px;
              height: 30px;
              float: left;
              font-size: 12px;
              color: #666;
              margin-left: 12px;
              border: 1px solid #dfdcdc;
              line-height: 26px;
              text-align: center;
              padding: 0 4px;
              margin-right: 0;
              border-radius: 5px;
            }
            li.active {
              background: @theme-color;
              cursor: pointer;
              a {
                color: #fff;
              }
            }
          }
        }
      }
      .no-data {
        height: 200px;
        padding-top: 80px;
        text-align: center;
        background: #fff;
        color: #666;
        margin-top: 20px;
      }
    }
    .main-list:after {
      content: ".";
      display: block;
      height: 0;
      clear: both;
      visibility: hidden;
    }
    .title-pro {
      clear: both;
      padding-left: 10px;
      font-size: 30px;
      font-weight: 700;
      margin: 70px 0 40px 10px;
      position: relative;
      i {
        width: 5px;
        height: 28px;
        -webkit-border-radius: 10px;
        border-radius: 43px;
        display: inline-block;
        margin-right: 10px;
        background: #dd323b;
        position: absolute;
        left: -5px;
        top: 3px;
      }
    }

    .step {
      img {
        height: 200px;
      }
    }
  }
}
</style>



