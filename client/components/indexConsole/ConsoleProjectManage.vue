<template>
  <div class="common-content project-content">
    <h6 class="fs-20 font-blod">项目管理</h6>
    <div class="main-content">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我的项目" name="first">
          <el-table
            :data="arrName.first.tableData"
            border
            style="width: 100%">
            <global-no-data slot="empty"/>
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="60">
            </el-table-column>
            <el-table-column label="项目名称" prop="p_name" align="center">
              <template slot-scope="scope">
                <router-link :to="'/console/project-manage/page?id='+scope.row.p_id">
                <div class="hover-p_name">{{scope.row.p_name || '--'}}</div>
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
              class=" common-btn pd-20"
              @click="showMoreHandle"
              v-if="arrName.first.count!=arrName.first.tableData.length"
            >展开更多项目
            </button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="一键预约" name="second">
          <el-table
            :data="arrName.second.tableData"
            border
            style="width: 100%">
            <global-no-data slot="empty"/>
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="60">
            </el-table-column>
            <el-table-column
              v-for="(item,index) in arrName.second.keyName"
              :key="index"
              :prop="item.prop"
              :label="item.label"
              align="center">
              <template slot-scope="scope">
                <div v-if="item.prop==='on_time'">{{scope.row[item.prop]*1000 | formatDate}}</div>
                <div v-if="item.prop==='op_time'">{{scope.row[item.prop]*1000 | formatDate}}</div>
                <div v-if="item.prop==='yy_status'">
                  {{scope.row[item.prop]!=1 ? '待处理' : '已处理'}}
                </div>
                <div v-if="item.prop==='deal_status'">
                  {{scope.row[item.prop] == 0||!scope.row[item.prop]? '待处理' :scope.row[item.prop] == 1 ? '已发布 ' : '关闭'}}
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="text-center mt-20">
            <button
              v-if="arrName.second.count!=arrName.second.tableData.length"
              class=" common-btn pd-20"
              @click="showMoreHandle"
            >展开更多预约
            </button>
          </div>
        </el-tab-pane>
        <!--<el-tab-pane label="文件" name="third">-->
        <!--文件-->
        <!--<div class="text-center mt-20">-->
        <!--<button class="common-color pd-20" @click="showMoreHandle">展开更多文件</button>-->
        <!--</div>-->
        <!--</el-tab-pane>-->
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import {apiMyProject, apiMyConsole} from '../../api/phpApi'

  export default {
    name: 'ConsoleProjectManage',
    data () {
      return {
        activeName: 'first',
        arrName: {
          first: {
            apiFunc: apiMyProject,
            page: 1,
            limit: 10,
            tableData: [],
            count: 0
          },
          second: {
            apiFunc: apiMyConsole,
            page: 1,
            limit: 10,
            tableData: [],
            count: 0,
            keyName: [
              {
                prop: 'on_time',
                label: '预约时间'
              }, {
                prop: 'yy_status',
                label: '预约状态'
              }, {
                prop: 'deal_status',
                label: '处理结果'
              }, {
                prop: 'op_time',
                label: '处理时间'
              }
            ]
          },
          third: {
            apiFunc: apiMyProject,
            page: 1,
            limit: 10,
            tableData: [],
            keyName: [
              {
                prop: 'p_name',
                label: '项目名称'
              }, {
                prop: 'cate_name',
                label: '文件类型'
              }, {
                prop: 's_name',
                label: '文件'
              }
            ]
          }
        }
      }
    },
    filters: {
      progressName (progress) {
        let progressNames = ['商务洽谈', '合同签署', '需求确认', '原型框架文档输出', 'UI确认', '二期款项收取', '合同签署', '完成', '开发', '测试', '产品验收', '公测', '验收结款', '圆满完成', '冻结']
        return progressNames[parseInt(progress) - 1]
      }
    },
    mounted () {
      this.getList()
    },
    methods: {
      async getList () {
        let {data} = await this.arrName[this.activeName].apiFunc({
          limit: this.arrName[this.activeName].limit,
          page: this.arrName[this.activeName].page
        })
        if (data) {
          this.arrName[this.activeName].tableData = [...this.arrName[this.activeName].tableData, ...data.list]
          this.arrName[this.activeName].count = data.count
        }
      },
      handleClick (tab, event) {
        this.arrName[this.activeName].tableData.length === 0 && this.getList()
      },
      showMoreHandle () {
        this.arrName[this.activeName].page++
        this.getList()
      }
    }
  }
</script>

<style lang="less">
.hover-p_name:hover{
   color:#d70c19 
   }
  .project-content {
    h6 {
      padding: 30px 40px 20px;
      border-bottom: 1px solid #e6e6e6;
    }
    .main-content {
      padding: 0 40px 40px;
    }
    .common-btn{
        background: #f2f7ff;
    }
  }
</style>
