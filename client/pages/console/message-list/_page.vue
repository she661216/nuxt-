<template>
  <div class="common-content message-index mb-40">
    <h6 class="title fs-20 font-blod">
      <a
        class="middle"
        href="/console/message-list/1?action=notice"
        :class="{active:action==='notice'}"
      >公告</a>
      <a
        class="middle"
        href="/console/message-list/1?action=msg"
        :class="{active:action==='msg'}"
      >消息</a>
    </h6>
    <div class="message-index__content" v-loading="loadingNum && page===1">
      <div class="content-box" v-show="action==='notice'">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          @row-click="rowClickHandle"
        >
          <global-no-data slot="empty"/>

          <el-table-column type="selection" width="55"></el-table-column>

          <el-table-column label="标题内容">
            <template slot-scope="scope">
              <div class="relative middle" v-show="scope.row.title">
                <global-badge top="8px" right="-10px" v-show="scope.row.is_read!=1"/>
                {{ scope.row.title }}
              </div>
            </template>
          </el-table-column>

          <el-table-column label="发送时间" width="180">
          <template slot-scope="scope">
              <div>{{ scope.row.create_time*1000 | formatDate }}</div>
          </template>
          </el-table-column>

        </el-table>
      </div>

      <div class="content-box" v-show="action!=='notice'">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          @row-click="rowClickHandle"
        >
          <global-no-data slot="empty"/>
          <el-table-column type="selection" width="55"></el-table-column>

          <el-table-column label="标题内容" width="450">
            <template slot-scope="scope">
              <div class="relative middle" v-if="scope.row.title">
                <global-badge v-show="scope.row.view_status!=1" top="8px" right="-10px"/>
                {{ scope.row.title }}
              </div>
            </template>
          </el-table-column>

          <el-table-column label="发送时间">
            <template slot-scope="scope">
              <div>{{ scope.row.on_time*1000 | formatDate }}</div>
            </template>
          </el-table-column>

          <el-table-column label="类型" width="180" prop="classify_type"></el-table-column>
        </el-table>
      </div>

      <div class="opt-btn">
        <button
          v-if="action!=='notice'"
          class="common-btn not-hover bg-e6"
          @click="batchHandle('del')"
        >删除</button>
        <button class="common-btn active" @click="batchHandle('read')">标记为已读</button>
      </div>
      <global-pagination
        :total="total"
        :page="page"
        :pageSize="pageSize"
        @change="paginationChange"
      />
    </div>
  </div>
</template>

<script>
import {
  apiNoticeList,
  apiMsgList,
  apiBatchDispose
} from "../../../api/phpApi";

export default {
  name: "message",
  layout: "console",
  data() {
    return {
      action: "notice",
      tableData: [],
      total: 0,
      multipleSelection: [],
      page: 1,
      pageSize: 10
    };
  },

  mounted() {
    this.action = this.$route.query.action || "notice";
    this.getTabkeData();
  },

  methods: {
    async getTabkeData() {
      let apiFunc = this.action === "notice" ? apiNoticeList : apiMsgList;
      let { data } = await apiFunc({ limit: this.pageSize, page: this.page });
      this.total = data ? data.count : 0;
      this.tableData = data ? data.list : [];
    },

    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },

    paginationChange(page) {
      this.scrollTop();
      this.page = page;
      this.getTabkeData();
    },

    rowClickHandle(row, event, column) {
      this.$router.push({
        name: "console-detail-id",
        params: { id: row.n_id?row.n_id:row.msg_id },
        query: { action: this.action, page: this.page }
      });
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    batchHandle(action) {
      if (this.noSelectTip()) return;
      this.$confirm(
        action === "read"
          ? "此操作将所选标记已读, 是否继续?"
          : "此操作将永久删除该文件, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(async () => {
          let ids = this.multipleSelection
            .map(item => {
              return item.n_id?item.n_id:item.msg_id;
            })
            .join(",");
          let { code } = await apiBatchDispose({
            ids,
            type: this.action === "notice" ? 1 : 2,
            action
          });
          if (code === 200) {
            this.getTabkeData();
            this.$message({
              type: "success",
              message: "操作成功!",
              duration: 2 * 1000
            });
          }
        })
        .catch(() => {});
    },
    /**
     * 判断是否有勾选需要删除项
     * @returns {boolean}
     */
    noSelectTip() {
      let isSelect = this.multipleSelection.length == 0;
      isSelect &&
        this.$message({
          type: "warning",
          message: "至少选择一项",
          duration: 2 * 1000
        });
      return isSelect;
    }
  }
};
</script>

<style lang="less">
@import "../../../assets/less/variables/index";

.message-index {
  .title {
    padding: 20px 40px;
    border-bottom: 1px solid #e6e6e6;
    a {
      margin-right: 80px;
      cursor: pointer;
      color: #333;
      &.active {
        color: @theme-color;
      }
    }
  }
  .message-index__content {
    padding: 48px 45px;
    .content-box {
      min-height: 400px;
    }
    .opt-btn {
      margin: 60px 0 0px;
      .common-btn {
        padding: 14px 30px;
        margin-bottom: 0;
      }
    }
  }
  .cell {
    cursor: pointer;
  }
}
</style>