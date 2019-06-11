<template>
  <div class="hot-service">
    <div class="hot-service-bg relative">
      <img class="height-100 absoluteCC width-100" src="/images/hot-service-bg.jpg" alt="">
    </div>
    <div class="hot-service__content pt-40">
      <template v-for="(menu,index) in menus">
        <div class="tabs-wrapper" :key='index'>
          <div class="clearfix common-wrapper">
            <a
              href="javascript:void (0)"
              class="tab-items"
              v-for="(item,subIndex) in menu"
              :key="subIndex"
              :class="{active:id==item.id}"
              :ref="`tabItemRef${item.id}`"
              @click="selectItemHandle(item.id,index)"
            >
              <div class="icon-box">
                <img class="no-select-img" :src="item.no_select_pic" alt="">
                <img class="select-img" :src="item.select_pic" alt="">
              </div>
              <span class="mt-20 inline">{{item.cate_name}}</span>
            </a>
          </div>
        </div>
        <div class="tabs-content" v-show="activeIndex===index" v-loading="!!loadingNum" :key=index>
          <div class="common-wrapper clearfix" v-if="serviceList.length>0">
            <template v-for="(item,index) in serviceList">
              <nuxt-link
                v-if="item.s_name"
                class="con-items "
                :class="(index-1)%3===0 ? 'col-md-6 middle-item' : 'col-md-3'"
                :style="index%3===0?'clear:both':''"
                :to="{name:'service-detail-id',params:{id:item.s_id}}"
                target="_blank"
                :key='index'
              >
                <div class="con con-t">
                  <h5>{{item.s_name}}</h5>
                  <p>{{item.s_desc}}</p>
                </div>
              </nuxt-link>
              
            </template>
          </div>
          <global-no-data v-else/>
        </div>
      </template>
      <div class="public-demond mt-40">
        <div class="common-wrapper">
          <h4>立即开始免费发布需求</h4>
          <img src="/images/hot-server-flow.jpg" alt="">
          <button class="btn" @click="$router.push({name:'service-issue'})">免费发布需求</button>
        </div>
      </div>

    </div>
    <user-link/>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {apiServiceListInfo, apiServiceCategoryHot} from '../../../api/phpApi'
  import UserLink from '../../../components/other/UserLink/index'
  import GlobalNoData from '../../../components/global/GlobalNoData/index'

  export default {
    name: 'hot-service',
    components: {
      GlobalNoData,
      UserLink
    },
    data () {
      return {
        serviceList: [],
        activeIndex: 0,
        menus: [],
        id: -1
      }
    },
    async asyncData ({params}) {
      let {data} = await apiServiceCategoryHot({limit: 1005, page: 1})
      let list = null
      let id = params.id
      if (data && data.list) {
        if (id == -1 || !id) {
          id = data.list[0].id
        }
        list = await apiServiceListInfo({limit: 1000, page: 1, id})
      }
      let menus = []
      let activeIndex = 0
      data && data.list.forEach((item, index) => {
        index % 5 === 0 && menus.push([])
        menus[Math.floor(index / 5)].push(item)
        item.id === id && (activeIndex = Math.floor(index / 5))
      })
      const serviceList = list.data && list.data.list ? list.data.list : []
      const seoData = {
        title: serviceList.length > 0 ? serviceList[0].cs_desc : '',
        keywords: '',
        desc: serviceList.length > 0 ? serviceList[0].c_desc : ''
      }
      return {menus, serviceList, seoData, id, activeIndex}
    },
    mounted () {
      // if (this.serviceList && this.id != this.menus[0][0].id) {
      if (this.serviceList) {
        this.scrollTop(document.getElementsByTagName('html')[0], this.$refs[`tabItemRef${this.id}`][0].getBoundingClientRect().top, false)
      }
    },
    methods: {
      async selectItemHandle (id, index) {
        // this.$router.push({name: 'service-hot-service-id', params: {id}})
        this.activeIndex = index
        this.id = id
        let {data} = await apiServiceListInfo({limit: 1000, page: 1, id}, true)
        if (data) {
          this.serviceList = data.list
        }
      }
    }
  }
</script>

<style lang="less">
  @import "../../../assets/less/variables/index";

  .hot-service {
    .hot-service-bg {
      height: 300px;
      overflow: hidden;
    }
    .hot-service__content {
      .tabs-wrapper {
        padding-top: 40px;
        background-color: #f7f7f7;
        .tab-items {
          width: 20%;
          height: 130px;
          float: left;
          position: relative;
          text-align: center;
          font-size: 20px;
          cursor: pointer;
          &:after {
            display: block;
            content: '';
            width: 0;
            height: 0;
            position: absolute;
            bottom: -40px;
            left: 50%;
            transform: translate3d(-50%, 0%, 0);
            border: 15px solid transparent;
            border-bottom-color: #ffffff;
            opacity: 0;
          }
          &:last-of-type {
            margin-right: 0;
          }
          .icon-box {
            width: 90px;
            height: 90px;
            margin: 0 auto;
            background-color: #eee;
            background-position-y: 20px;
            border-radius: 50%;
            img {
              width: 100%;
              height: 100%;
              border-radius: 100%;
            }
            .select-img {
              display: none;
            }
            .no-select-img {
              display: block;
            }
          }
          &.active {
            color: @theme-color;
            &:after {
              opacity: 1;
            }
            .icon-box {
              .select-img {
                display: block;
              }
              .no-select-img {
                display: none;
              }
            }
          }

        }
      }
      .tabs-content {
        margin-top: 40px;
        background-color: #ffffff;
        .common-wrapper {
          padding: 60px 60px 0 60px;
        }
        .con-items {
          display: block;
              margin-bottom: 10px;
              margin-top: 5px;
          &.middle-item {
            padding-left: 140px;
          }
          .con {
            width: 100%;
            margin-bottom: 30px;
            &:hover {
              h5 {
                color: @theme-color;
              }
            }
            h5 {
              font-size: 16px;
              color: #333333;
              margin-bottom: 10px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              width: 270px;
            }
            p {
              font-size: 12px;
              color: #999999;
              line-height: 16px;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 10;
              overflow: hidden;
              width: 270px;
            }
          }
        }
      }
      .public-demond {
        height: 450px;
        padding-top: 60px;
        text-align: center;
        background-color: #fff;
        h4 {
          font-size: 40px;
          color: #333;
          text-align: center;
          margin-bottom: 35px;
        }
        .btn {
          width: 260px;
          height: 60px;
          color: #fff;
          font-size: 20px;
          text-align: center;
          margin-top: 40px;
          background-color: @theme-color;
        }

      }
    }
  }
</style>
