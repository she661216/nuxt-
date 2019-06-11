<template>
  <div class="search-index  common-wrapper">
    <div class="clearfix pt-40 mb-10">
      <div class="l left-box back-index">
        <nuxt-link to="/">返回首页</nuxt-link>
      </div>
      <div class="r right-box search-box relative" @keydown.enter="searchHandle(type)">
        <img class="middle" src="/images/icon_search_active.png" alt="">
        <input type="text" v-model.trim="keywords" placeholder="请输入关键词">
        <button class="absoluteRC search-btn height-100" @click="searchHandle(type)">搜索</button>
      </div>
    </div>
    <div class="clearfix search-content">
      <div class="l left-box search-content__nav">
        <button
          @click="searchHandle(1)"
          :class="{active:type==1}"
        >
          <img class="middle img" src="/images/icon_search1.png" alt="">
          <img class="middle active-img" src="/images/icon_search1_active.png" alt="">
          <!--服务（{{searchResult && searchResult[0] ? searchResult[0].count : 0}}）-->
          <span class="middle">服务（{{serviceCount || 0}}）</span>
        </button>
        <button
          @click="searchHandle(2)"
          :class="{active:type==2}"
        >
          <img class="middle img" src="/images/icon_search2.png" alt="">
          <img class="middle active-img" src="/images/icon_search2_active.png" alt="">
          <!--方案（{{searchResult && searchResult[1] ? searchResult[1].count : 0}}）-->
          <span class="middle">方案（{{schemeCount || 0}}）</span>
        </button>
        <button
          @click="searchHandle(3)"
          :class="{active:type==3}"
        >
          <img class="middle img" src="/images/icon_search3.png" alt="">
          <img class="middle active-img" src="/images/icon_search3_active.png" alt="">
          <!--文章（{{searchResult && searchResult[2] ? searchResult[2].count : 0}}）-->
          <span class="middle">文章（{{articleCount || 0}}）</span>
        </button>
      </div>
      <div class="r right-box search-content__box relative">
        <div v-if="list.length>0">
          <template v-if="type==1">
            <div>
              <nuxt-link
                :to="{name:'service-detail-id',params:{id:item.s_id}}"
                v-for="(item,index) in list"
                :key="index"
                target="_blank"
              >
                <h6 class="title">{{item.s_name}}</h6>
                <p class="desc row2 mt-20 fs-14 color-3 lh1-8" v-if="item.s_desc">{{item.s_desc | sliceStr(130)}}</p>
                <p class="source color-9  mt-20">>来自网页 —— 服务 —— 服务分类</p>
              </nuxt-link>
            </div>
          </template>
          <template v-if="type==2">
            <div>
              <a
                v-for="(item,index) in list"
                :key="index"
                :href="item.url"
                target="_blank">
                <h6 class="title">{{item.title}}</h6>
                <!--<p class="desc row2 mb-20 mt-20 fs-14 color-3 lh1-8">{{item.s_desc}}</p>-->
                <p class="source color-9 mt-20">>来自网页 —— 方案</p>
              </a>
            </div>

          </template>
          <template v-if="type==3">
            <div>
              <nuxt-link
                :to="{name:'article-id',params:{id:item.id}}"
                v-for="(item,index) in list"
                :key="index"
                target="_blank"
              >
                <h6 class="title">{{item.title}}</h6>
                <p class="desc row2 mt-20 fs-14 color-3 lh1-8" v-if="item.summary">{{item.summary | sliceStr(130)}}</p>
                <p class="source color-9 mt-20">>来自网页 —— 文章</p>
              </nuxt-link>
            </div>
          </template>
        </div>
        <page-no-data v-else/>
        <global-pagination
          class="absoluteRB global-pagination"
          v-if="list.length>0"
          :total="type==1 ? serviceCount : type==2 ? schemeCount : articleCount"
          :page="page"
          :pageSize="pageSize"
          @change="paginationChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import PageNoData from '../components/other/PageNoData/index'
  import {apiGlobalSearch} from '../api/phpApi'

  export default {
    name: 'search',
    components: {
      PageNoData
    },
    data () {
      return {
        total: 1,
        page: 1,
        type: 1,
        keywords: '',
        list: [],
        serviceCount: 0,
        schemeCount: 0,
        articleCount: 0,
        pageSize: 10
      }
    },
    async asyncData ({params, query, store}) {
      let keywords = query.keywords || ''
      let type = query.type || 1
      let page = query.page || 1
      await store.commit('SET_HEADER_ACTIVE', true)
      let {data} = await apiGlobalSearch({page, limit: 10, type, keywords})
      let list = data ? data.list : []
      let serviceCount = data ? data.service_count : 0
      let schemeCount = data ? data.scheme_count : 0
      let articleCount = data ? data.article_count : 0
      return {keywords, serviceCount, schemeCount, articleCount, type, page, list}
    },
    methods: {
      searchHandle (type) {
        if (!this.keywords) {
          this.$message({
            message: '请输入内容',
            dutation: 2000,
            type: 'warning'
          })
          return
        }
        this.page = 1
        this.type = type
        this.paginationChange()
      },
      paginationChange (page = this.page) {
        this.page = page
        this.openPage({
          name: 'search',
          query: {type: this.type, keywords: this.keywords, page: this.page}
        })

      }
    }
  }
</script>

<style scoped lang="less">
  @import "../assets/less/variables/index";

  .search-index {
    .left-box {
      width: 160px;
      background: rgba(255, 255, 255, 1);
    }
    .right-box {
      width: 1040px;
      background: rgba(255, 255, 255, 1);
      border-left: 1px solid #EDEDED;
    }
    .back-index {
      a {
        display: block;
        width: 160px;
        height: 80px;
        line-height: 80px;
        text-align: center;
        font-size: 16px;
        color: rgba(77, 77, 77, 1);
      }
    }
    .search-box {
      height: 80px;
      line-height: 80px;
      img {
        margin: 0 12px 0 15px;
      }
      input {
        font-size: 16px;
        width: 75%;
        line-height: 80px;
      }
      ::-webkit-input-placeholder {
        font-size: 16px;
      }
      .search-btn {
        width: 200px;
        background: #4267b5;
        color: #fff;
        font-size: 20px;
      }
    }
    .search-content {
      overflow: hidden;
      margin-bottom: 80px;
      .search-content__nav {
        padding-bottom: 10000px;
        margin-bottom: -10000px;
        button {
          display: block;
          width: 100%;
          height: 46px;
          line-height: 46px;
          text-align: left;
          color: #333;
          img {
            width: 24px;
            margin-left: 30px;
            &.img {
              display: inline-block;
            }
            &.active-img {
              display: none;
            }
          }
          &:first-child {
            margin-top: 15px;
          }
          &.active {
            color: @theme-color;
            .img {
              display: none !important;
            }
            .active-img {
              display: inline-block !important;
            }
          }
        }
      }
      .search-content__box {
        padding: 45px 45px 150px;
        min-height: 500px;
        a {
          display: block;
          padding-bottom: 20px;
          margin-bottom: 30px;
          /*border-bottom: 1px solid #eee;*/
          &:last-child {
            margin-bottom: 0;
            border-bottom: none;
          }
          &:hover {
            .title {
              color: @theme-color;
            }
          }
        }
        .source {
          color: transparent;
          /*display: none;*/
        }
        .title {
          color: #333;
          font-size: 20px;
        }
      }
    }
    .global-pagination {
      right: 40px;
      bottom: 40px;
    }
  }

</style>
