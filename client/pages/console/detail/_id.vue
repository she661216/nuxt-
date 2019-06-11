<template>
  <div class="common-content detail-index mb-40" v-loading="!!loadingNum">
    <template v-if="infoData">
      <div class="detail-head">
        <h5 class="row1 pl-20 pr-20">
          {{infoData.title}}
        </h5>
        <span>
          <img
            class="middle"
            src="/images/icon_time.png"
            alt="">
          <span class="middle">{{(infoData.create_time*1000 || infoData.on_time *1000)  | formatDate}}</span>
        </span>
      </div>
      <div class="detail__content">
        <div v-html="infoData.content"></div>
        <div class="mt-50 pt-30">
          <global-button
            type="btn-theme-color"
            @click="openPage({name: 'console-message-list-page',params: {page:$route.query.page},query: {action: $route.query.action}})">
            返回消息列表
          </global-button>
        </div>
      </div>
    </template>
    <div style="padding:200px 0;" v-if="!infoData && !isLoading">
      <page-no-data/>
    </div>
  </div>
</template>

<script>
  import PageNoData from '../../../components/other/PageNoData'
  import {apiMsgDetail, apiNoticeDetail} from '../../../api/phpApi'

  export default {
    name: 'MsgDetail',
    layout: 'console',
    components: {
      PageNoData
    },
    data () {
      return {
        infoData: null,
        isLoading: true
      }
    },
    // async asyncData ({params, query, store}) {
    //   let action = query.action
    //   let apiFunc = action === 'notice' ? apiNoticeDetail : apiMsgDetail
    //   let info = await apiFunc({
    //     id: params.id
    //   })
    //   const infoData = info.data ? info.data.list : null
    //   return {infoData}
    // },
    mounted () {
      this.getDetail()
    },
    methods: {
      async getDetail () {
        let action = this.$route.query.action
        let apiFunc = action === 'notice' ? apiNoticeDetail : apiMsgDetail
        let {data} = await apiFunc({
          id: this.$route.params.id
        }, true)
        this.isLoading = false
        data && (this.infoData = data.list)
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../../assets/less/variables/index";

  .detail-index {
    .detail-head {
      padding: 48px 0 30px;
      border-bottom: 1px solid #e6e6e6;
      text-align: center;
      h5 {
        font-size: 30px;
        color: #333;
        margin-bottom: 30px;
      }
      span {
        font-size: 14px;
        color: #4D4D4D;
      }
    }
    .detail__content {
      padding: 88px 180px;
      color: #333;
      line-height: 50px;
      p {
        color: #333;
        text-indent: 20px;
      }
    }
  }
</style>
