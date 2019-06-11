<template>
  <div>
    <div class="common-content message-index mb-40">
      <div class="history-content">
        <h6 class="fs-20 font-blod">工作台</h6>
        <button
          class="color-link pt-20 pb-20 absoluteRT"
       @click="openPage({path: '/console/manage-console/store-detail'})"
        >更新商铺信息</button>
        <div class="issue-typerelative">
          <div>
            <div class="history-btns">
              <el-col :span="5">
                <div class="box">
                  <p>
                    {{shopInfo.add_youxuan_days?shopInfo.add_youxuan_days:0}}
                    <span>天</span>
                  </p>
                  <p>优选成长时间</p>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="box">
                  <p>
                    {{shopInfo.add_project_num?shopInfo.add_project_num:0}}
                    <span>个</span>
                  </p>
                  <p>参与项目总数</p>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="box">
                  <p>
                    {{shopInfo.add_project_success_num?shopInfo.add_project_success_num:0}}
                    <span>个</span>
                  </p>
                  <p>完成项目总数</p>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="box">
                  <p>
                    {{shopInfo.money_total?shopInfo.money_total:0}}
                    <span>元</span>
                  </p>

                  <p>挣到的钱</p>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="box">
                  <p>
                    {{shopInfo.syn_score?shopInfo.syn_score:0}}
                    <span>分</span>
                  </p>
                  <p>综合评分</p>
                </div>
              </el-col>
            </div>
          </div>
          <!-- <global-no-data v-else content="暂无浏览服务记录"/> -->
        </div>
      </div>

      <div class="project-content">
        <h6 class="fs-20 font-blod">我的工单</h6>
        <div class="main-content" v-if="false">
          <el-table :data="arrProject.list" border style="width: 100%">
            <global-no-data slot="empty"/>
            <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>
            <el-table-column label="项目名称" prop="p_name" align="center">
              <template slot-scope="scope">
           <router-link :to="'/console/project-manage/page?id='+scope.row.p_id">
                  {{scope.row.p_name || '--'}}
              </router-link>
              </template>
            </el-table-column>
            <el-table-column label="服务一级分类" prop="cate_pid_name" align="center">
              <template slot-scope="scope">
                <div>{{scope.row.cate_pid_name || '--'}}</div>
              </template>
            </el-table-column>
            <el-table-column label="服务二级分类" prop="cate_id_name" align="center">
              <template slot-scope="scope">
                <div>{{scope.row.cate_id_name || '--'}}</div>
              </template>
            </el-table-column>
            <el-table-column label="项目进度" align="center">
              <template slot-scope="scope">
                <div>{{scope.row.progress_name}}</div>
              </template>
            </el-table-column>
            <el-table-column label="商务顾问" prop="advisor_username" align="center">
              <template slot-scope="scope">
                <div>{{scope.row.advisor_username || '--'}}</div>
              </template>
            </el-table-column>
            <el-table-column label="需求发布时间" align="center">
              <template slot-scope="scope">
                <div>{{scope.row.create_time*1000 | formatDate}}</div>
              </template>
            </el-table-column>
          </el-table>
          <div class="text-center mt-20">
            <button
              class="common-btn pd-20"
              @click="showMorePro"
              v-if="arrProject.length>0 && arrProject.count!=arrProject.length"
            >展开更多
            </button>
          </div>
        </div>

        <div v-else  class="main-content">
                <global-no-data  content="暂无工单数据"/>
        </div>
      </div>

      <div class="project-content">
        <h6 class="fs-20 font-blod">商铺案例</h6>
        <div class="main-content">
          <el-table :data="ShopCasetableData.list" border style="width: 100%">
            <global-no-data slot="empty"/>
            <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>
            <el-table-column label="案例名称" align="center">
              <template slot-scope="scope">
                <div>{{scope.row.title || '--'}}</div>
              </template>
            </el-table-column>

            <el-table-column label="案例描述" align="center">
              <template slot-scope="scope">
                <div style=  "white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{scope.row.content}}</div>
              </template>
            </el-table-column>
            <el-table-column label="服务类型" align="center">
              <template slot-scope="scope">
                <div>{{scope.row.cate_pid_name}}</div>
              </template>
            </el-table-column>
            <el-table-column label="服务" align="center">
              <template slot-scope="scope">
                <div>{{scope.row.cate_id_name}}</div>
              </template>
            </el-table-column>
            <el-table-column label="项目周期" prop="cycle" align="center">
              <template slot-scope="scope">
                <div>{{scope.row.cycle}}天</div>
              </template>
            </el-table-column>
            <el-table-column label="服务性质" align="center">
              <template slot-scope="scope">
                <div>{{scope.row.unit_name}}</div>
              </template>
            </el-table-column>

            <el-table-column label="定价" align="center">
              <template slot-scope="scope">
                <div>{{scope.row.price}}</div>
              </template>
            </el-table-column>

            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <div>
                  <button class @click="handleClick(scope.row.c_id)">编辑</button>
                  <button class @click="delShopCase(scope.row.c_id)">删除</button>
                </div>
              </template>
            </el-table-column>
          </el-table>

          <div class="text-center mt-20">
            <button
              class="common-btn pd-20"
              @click="showMoreCase"
              v-if="ShopCasetableData.list.length > 0 && ShopCasetableData.count != ShopCasetableData.list.length"
            >展开更多</button>
          </div>
        </div>
        <button class="color-link pt-20 pb-20 absoluteRT" @click="handleClick()">+添加新案例</button>
      </div>
    </div>

    <console-manager-side/>

    <console-manager-store
      @dialogHide="dialogHanderHide"
      :dialogTableVisiblee="storeIsShow"
      :storeId="editStoreId"
    ></console-manager-store>
  </div>
</template>

<script>
import {
  apiMyProject,
  apiShopCase,
  apiShopInfo,
  apiDelShopCase
} from "../../../api/phpApi";

import consoleManagerSide from "../../../components/layoutConsole/ManageSide/index";
import consoleManagerStore from "../../../components/layoutConsole/ManageSide/store";

export default {
  name: "message",
  layout: "console",
  components: {
    consoleManagerSide,
    consoleManagerStore
  },
  data() {
    return {
      storeIsShow: false,
      editStoreId: 0,
      arrProject: {
        list: []
      },
      shopInfo: {},
      action: "notice",
      ShopCasetableData: { list: [] },
      multipleSelection: [],
      page: 1,
      page_project: 1,
      pageSize: 10
    };
  },

  mounted() {
    this.shopCase();
    this.getShopInfo();
    this.getMyProject();
  },
  
  methods: {
    async showMoreCase() {
      ++this.page;
      let { data } = await apiShopCase({
        limit: this.pageSize,
        page: this.page
      });
      let _data = data ? data : [];
      this.ShopCasetableData.list = [ ..._data.list, ...this.ShopCasetableData.list ];
    },

    async showMorePro() {
      this.page_project++;
      let { data } = await apiMyProject({
        limit: this.pageSize,
        page: this.page_project
      });
      let _data = data ? data : [];
      this.ShopCasetableData.list = [ ..._data.list, ...this.ShopCasetableData.list ];
    },

    handleClick(id = "") {
      this.editStoreId = id;
      this.storeIsShow = true;
    },

    dialogHanderHide() {
      this.storeIsShow = false;
    },

    async getMyProject() {
      let { data } = await apiMyProject({
        limit: this.pageSize,
        page: this.page_project
      });
      this.arrProject = data ? data : [];
    },

    async shopCase() {
      let { data } = await apiShopCase({
        limit: this.pageSize,
        page: this.page
      });
      this.ShopCasetableData = data ? data : [];
    },

    async getShopInfo() {
      let { data } = await apiShopInfo();
      this.shopInfo = data ? data.list : [];
    },

    async delShopCaseFun(id) {
      let { code } = await apiDelShopCase({ id: id });

      if (code == 200) {
        this.page = 1;
        this.shopCase();
        this.$message({
          type: "success",
          message: "删除成功!"
        });
      }
    },

    async delShopCase(id) {
      this.$confirm("此操作将永久删除该案例, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delShopCaseFun(id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style lang="less" >
a:hover{
color:#d70c19
}
</style>
<style lang="less" scoped>
@import "../../../assets/less/variables/index";

.red {
  color: #d70c19;
}
.common-content {
  background: #f7f7f7;
  margin-right: 324px;
  .common-btn{
   background: #f2f7ff;
   &:hover{
     color: @theme-color !important;
   }
  }
  .common-color {
    color: @theme-color !important;
    border: 1px solid #d70c19;
    padding: 10px 30px;
    margin-top: 10px;
    border-radius: 5px;
    background: #fff2f2;
  }
  
  .history-content {
    background: #fff;
    position: relative;
    .history-btns {
      padding: 0 70px;
      .box {
        margin-top: 13px;
        float: left;
        p {
          text-align: center;
          line-height: 30px;
          span {
            font-size: 20px;
          }
        }
        p:first-child {
          font-size: 30px;
        }
        p:last-child {
          font-size: 16px;
        }
      }
    }
    h6 {
      padding: 30px 40px 20px 40px;
      border-bottom: 1px solid #e6e6e6;
    }
    .issue-typerelative {
      height: 130px;
      padding: 25px 0;
    }
    .absoluteRT {
      position: absolute;
      top: 7px;
      right: 63px;
      font-size: 14px;
      color:@theme-color !important;
    }
  }
  .project-content {
    background: #fff;
    margin-top: 20px;
    position: relative;
    h6 {
      padding: 30px 40px 20px;
      border-bottom: 1px solid #e6e6e6;
    }
    .main-content {
      padding: 40px;
    }
  }
  .absoluteRT {
    position: absolute;
    top: 7px;
    right: 63px;
    color: @theme-color !important;
  }
}
</style>
