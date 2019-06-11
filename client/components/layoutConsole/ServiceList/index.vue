<template>
  <div
    class="service-list pr-40"
    :class="{active:serviceListActive}"
  >
    <div class="service-list__content relative">
      <button
        class="absoluteRT
       pd-30"
        @click="SET_SERVICE_LIST_ACTIVE(false)">
        <img style="width:30px"
             src="/images/console/icon_close.png"
             alt="">
      </button>
      <div class="relative search-box" @keydown.enter="searchCategoryHandle">
        <img class="absoluteLC" src="/images/icon_search_c.png" alt="">
        <input v-model.trim="keywords" class="search-input" type="text" placeholder="请输入关键词"/>
      </div>
      <div class="clearfix service-caterogy-list" v-loading="!!loadingNum">
        <div v-if="hotMenu.length>0">
          <nuxt-link
            class="common-btn bg-e6"
            v-for="(item,index) in hotMenu"
            :key="index"
            :to="{name:'service-hot-service-id',params:{id:item.id}}"
            target="_blank"
          >{{item.cate_name}}
          </nuxt-link>
        </div>
        <global-no-data v-else content="未搜索到数据"/>
      </div>
    </div>
  </div>

</template>

<script>
  import {mapState, mapMutations} from 'vuex'

  export default {
    name: 'ServiceList',
    data () {
      return {
        keywords: ''
      }
    },
    computed: {
      ...mapState({
        hotMenu: state => state.common.hotMenu,
        serviceListActive: state => state.console.serviceListActive
      })
    },
    methods: {
      ...mapMutations(['SET_SERVICE_LIST_ACTIVE']),
      searchCategoryHandle () {
        this.$store.dispatch('getServiceMenuAction', {page: 1, limit: 1000, keywords: this.keywords})
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../../assets/less/variables/index";

  .service-list {
    position: absolute;
    top:0;
    left:0;
    width:100%;
    height: 100%;
    transition: all .4s;
    transform: translateX(-150%);
    z-index: 10;
    box-sizing: border-box;
    .service-list__content {
      background: rgba(255, 255, 255, 1);
      padding: 60px;
      height: 100%;
    }
    &.active {
      transform: translateX(0);
    }
    .search-box {
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid @theme-color;
      margin-bottom: 40px;
      .search-input {
        display: block;
        width: 100%;
        height: 100%;
        text-indent: 30px;
      }
    }
    .service-caterogy-list {
      height: auto;
      a {
        display: block;
        float: left;
      }
    }
  }
</style>
