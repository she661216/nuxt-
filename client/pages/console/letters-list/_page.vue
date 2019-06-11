<template>
  <div class="common-content letters-list mb-40">
    <h6 class="title fs-20 font-blod">优选快报</h6>
    <div class="letters-list__content">
      <ul v-if="kbList.length>0">
        <li class="letters-list__item relative" v-for="(item,index) in kbList" :ref="`list${item.id}`" :key="index">
          <div>
            <h6>{{item.title}}</h6>
            <div class="mb-10" v-html="item.summary"></div>
            <div v-html="item.content"></div>
          </div>
          <nuxt-link
            class="color-link absoluteLB mb-20 fs-14"
            v-if="item.service_relate_tags && item.service_relate_tags.s_id"
            :to="{name:'service-detail-id',params:{id:item.service_relate_tags.s_id}}"
          >
            【关联服务】{{item.service_relate_tags.s_name}}
          </nuxt-link>
        </li>
      </ul>
      <global-no-data v-else/>

      <global-pagination :total="total" :page="page" @change="paginationChange"/>

    </div>
  </div>
</template>

<script>
  import scrollTopMixin from '../../../mixins/scrollTopMixin'
  import {apiKBList} from '../../../api/phpApi'

  export default {
    name: 'letters-list',
    layout: 'console',
    mixins: [scrollTopMixin],
    data () {
      return {
        kbList: [],
        total: 0,
        page: 1
      }
    },
    mounted () {
      this.getKBData().then(res => {
        if (res.length > 0 && this.$route.query.id) {
          this.scrollTop(document.getElementsByTagName('html')[0], this.$refs[`list${this.$route.query.id}`][0].getBoundingClientRect().top - 100, false)
        }
      })
    },
    methods: {
      async getKBData (page = 1) {
        let {data} = await apiKBList({limit: 10, page})
        data && (this.kbList = data.list)
        data && (this.total = data.count)
        return this.kbList
      },
      paginationChange (page) {
        this.page = page
        this.scrollTop()
        this.getKBData(page)
      }
    }
  }
</script>

<style lang="less">
  @import "../../../assets/less/variables/index";

  .letters-list {
    .title {
      padding: 20px 40px;
      border-bottom: 1px solid #e6e6e6;
    }
    .letters-list__content {
      padding: 0 40px 40px;
      .letters-list__item {
        padding: 40px 0 60px;
        border-bottom: 1px solid #e6e6e6;
        h6 {
          color: #333;
          font-weight: bold;
          margin-bottom: 20px;
        }
        div {
          color: #808080;
          font-size: 14px;
        }
      }
    }
  }
</style>
