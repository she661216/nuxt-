<template>
  <section class="index-wrapper">
    <!-- <global-swiper class="banner-wrapper relative" :option="bannerOption" isPagination>
      <div class="swiper-slide banner-slide" v-for="(item,index) in indexBannerList" :key="index">
        <a
          v-if="index===0"
          :href="item.to_url || 'javascript:void(0)'"
          :class="{'no-link':!item.to_url}"
          target="_blank"
        >
          <img class="absoluteCC" :src="item.img_url" alt="">
        </a>
        <a v-else
           :href="item.to_url || 'javascript:void(0)'"
           :class="{'no-link':!item.to_url}"
           target="_blank"
        >
          <img class="absoluteCC swiper-lazy" :data-src="item.img_url" alt="">
          <div class="swiper-lazy-preloader"></div>
        </a>
      </div>
    </global-swiper> -->

  <index-banner/>
    <!-- <index-article-list :list="indexArticleList"/> -->

    <index-flow :list="indexShemeList"/>

    <index-business :list="indexProjectList"/>

    <index-case :list="indexTalentList"/>

      <index-yx/>
    <!-- <global-ad :list="indexAdList"/>

    <index-map/> -->

    <!-- <partner/> -->

    <!-- <user-link/> -->

  </section>
</template>

<script>
  import IndexArticleList from '../components/index/IndexArticleList'
  import IndexFlow from '../components/index/IndexFlow'
  import IndexBusiness from '../components/index/IndexBusiness'
  import IndexYx from '../components/index/IndexYx'
  import IndexCase from '../components/index/IndexCase'
  import IndexMap from '../components/index/IndexMap'
   import IndexBanner from '../components/index/IndexBanner'
  import UserLink from '../components/other/UserLink/index'
  import Partner from '../components/other/Partner'
  import {apiBanner, apiIndexArticleList, apiIndexFlow, apiSchemeMenu,apiIndexTalentList, apiProjectList} from '../api/phpApi'

  export default {
    components: {
      IndexArticleList,
      IndexFlow,
      IndexBusiness,
      IndexYx,
      IndexCase,
      IndexMap,
      IndexBanner,
      UserLink,
      Partner
    },
    data () {
      return {
        bannerOption: {
          autoplay: 3000,
          effect: 'slide',
          speed: 500,
          pagination: '.index-wrapper .swiper-pagination',
          lazyLoading: true,
          lazyLoadingInPrevNext: true
        },
        indexBannerList: [],
        indexAdList: [],
        indexArticleList: [],
        indexFlowList: [],
        indexSchemeList: [],
        indexTalentList:[],
        indexProjectList:[]
      }
    },
    async asyncData ({params, store}) {
      let indexBanner = await apiBanner({ad_type: 1, page: 1, limit: 6})
      let indexAd = await apiBanner({ad_type: 2, page: 1, limit: 6})
      // let indexArticle = await apiIndexArticleList({limit: 4, page: 1})
      let indexFlow = await apiIndexFlow()
      let indexProject = await apiProjectList({page:1,limit:8})
      let indexSheme = await apiSchemeMenu({page: 1, limit: 6})
      let indexTalent = await apiIndexTalentList({page: 1, limit: 20})

      const indexBannerList = indexBanner.data ? indexBanner.data.list : []
      const indexAdList = indexAd.data ? indexAd.data.list.map(item => {
        return Object.assign(item, {content: item.desc})
      }) : []
      const indexFlowList = indexFlow.data ? indexFlow.data.list : []
      // const indexArticleList = indexArticle.data ? indexArticle.data.list : []
      const indexShemeList = indexSheme.data ? indexSheme.data.list : []
      const indexTalentList = indexTalent.data ? indexTalent.data.list : []
      const indexProjectList = indexProject.data ? indexProject.data.list : []
      return {indexFlowList, indexBannerList, indexProjectList, indexAdList, indexShemeList,indexTalentList}
    },
    mounted () {
      this.$store.commit('SET_IS_SIDEBAR', true)
    },
 
  }
</script>

<style lang="less">
  @import "../assets/less/variables/index";

  .index-wrapper {
    .banner-wrapper {
      width: 100%;
      height: 450px;
      overflow: hidden;
      background: rgba(6, 9, 24, .85);
      .banner-slide {
      /*+ @headerH*/
        height: 450px ;
        position: relative;
        overflow: hidden;
        img {
          width: 100%;
          height: 450px;
        }
      }
      .no-link {
        cursor: initial;
      }
    }
  }
</style>
