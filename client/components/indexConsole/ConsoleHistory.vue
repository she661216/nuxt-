<template>
  <div class="common-content mb-30 history-content">
    <h6 class="fs-20 font-blod">最近浏览项目</h6>
    <div class="issue-type mt-30 relative">
      <div v-if="historyList.length>0">
        <div class="history-btns">
          <button
            class="common-btn bg-f5"
            v-for="(item,index) in historyList"
            :key="index"
            @click="openPage({name:'service-detail-id',params:{id:item.s_id}},true)"
          >{{item.s_name}}</button>
          <button
            class="common-btn bg-e6 more-btn"
            @click="$router.push({path:'/service/hot-service/-1'})"
          >查看更多</button>
        </div>
      </div>
      <global-no-data v-else content="暂无浏览服务记录"/>
    </div>
  </div>
</template>

<script>
import { apiServiceRecent } from "../../api/phpApi";

export default {
  name: "ConsoleHistory",
  data() {
    return {
      historyList: []
    };
  },
  mounted() {
    this.getHistoryList();
  },
  methods: {
    async getHistoryList() {
      let { data } = await apiServiceRecent({ page: 1, limit: 5 }, true);
      data &&
        (this.historyList = data.list.filter((item, index) => {
          return index < 5;
        }));
    }
  }
};
</script>

<style lang="less" scoped>
.history-content {
  background: #f5f5f5;
  padding: 30px 40px;
  .history-btns {
    margin-right: 120px;
    .more-btn {
      border: none;
      color: #333;
    }
    .more-btn:hover,
    .more-btn.active {
      background: #e6e6e6;
      border-color: none;
      color: #333;
    }
  }
  .common-btn {
    border-radius: 4px;
  }
  .common-btn:hover,
  .common-btn.active {
    background: #f5f5f5;
    border-color: #4267b5;
    color: #4267b5;
  }
}
</style>
