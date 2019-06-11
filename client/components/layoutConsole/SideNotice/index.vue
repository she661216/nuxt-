<template>
  <div class="side-notice">
    <div class="common-content item1-content mb-40">
      <h6 class="fs-16 font-blod ">平台公告</h6>
      <div class="pd-20" v-if="noticeList.length">
        <nuxt-link
          class="row1 link-a common-hover"
          v-for="(item,index) in noticeList"
          :key="index"
          :to="{name:'console-detail-id',params:{id:item.n_id},query:{action:'notice'}}">
          {{item.title}}
        </nuxt-link>
      </div>
      <global-no-data v-else content="暂无公共数据"/>
    </div>
    <div class="common-content item1-content">
      <h6 class="fs-16 font-blod ">优选快报</h6>
      <div class="pd-20 clearfix" v-if="kbList.length">
        <template v-for="(item,index) in kbList">
          <nuxt-link
           :key='index'
            class="link-a"
            :to="{name:'console-letters-list-page',params:{page:1},query: {id:item.id}}"
          >
            <p class="row1 mb-5">{{item.title}}</p>
            <div class="row2 lh1-4">
              {{item.summary | sliceStr(30)}}
            </div>
          </nuxt-link>
        </template>

        <nuxt-link
          class="link-a r color-link pt-10 pb-10 pl-10"
          :to="{name:'console-letters-list-page',params:{page:1}}">
          更多快报
        </nuxt-link>
      </div>
      <global-no-data v-else content="暂无快报数据"/>
    </div>
  </div>
</template>
<script>
  import {apiKBList, apiNoticeList} from '../../../api/phpApi'

  export default {
    name: 'SideNotice',
    data () {
      return {
        kbList: [],
        noticeList: []
      }
    },
    mounted () {
      this.getKBData()
      this.getNoticeData()
    },
    methods: {
      async getKBData () {
        let {data} = await apiKBList({limit: 10, page: 1})
        data && (this.kbList = data.list)
      },
      async getNoticeData () {
        let {data} = await apiNoticeList({limit: 10, page: 1})
        data && (this.noticeList = data.list)
      }
    }
  }
</script>

<style lang="less">
  @import "../../../assets/less/variables/index";

  .side-notice {
    position: absolute;
    top: 40px;
    /*<!--top: @headerH + 40px;-->*/
    right: @sideBarW + 40px;
    width: 300px;
    h6 {
      padding: 20px;
      border-bottom: 1px solid #e6e6e6;
    }
    .item1-content {
      .link-a {
        display: block;
        font-size: 12px;
        padding-bottom: 16px;
        &:hover {
          p {
            color: @theme-color;
          }
          div {
            color: #999;
          }
        }
        p {
          color: #000;
          font-size: 14px;
        }
        div {
          color: #999;
        }
      }
    }
  }
</style>
