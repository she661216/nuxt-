<template>
  <section class="article-index common-wrapper clearfix">
    <div class="blk70"></div>
    <div class="content-wrapper-l bg-f" v-if="articleInfo">
      <div class="title-wrapper">
        <h3 class="title">{{articleInfo.title}}</h3>
        <p class="times">
          <span class="browse">{{articleInfo.pv}}次</span>
          <span class="clock">{{articleInfo.create_time*1000 | formatDate}}</span>
        </p>
      </div>
      <div class="detail_content">
        <p v-html="articleInfo.summary"></p>
        <img v-if="articleInfo.face_pic" :src="articleInfo.face_pic" alt="">
        <div v-html="articleInfo.content"></div>
      </div>
      <div class="share">
        <bd-share/>
      </div>
      <!-- <div class="last-next" v-if="prevNext">
        <p v-if="prevNext && prevNext.prev.id">上一篇：
          <button @click="openPage({name:'article-id',params: {id:prevNext.prev.id}})">{{prevNext.prev.title}}</button>
        </p>
        <p v-if="prevNext && prevNext.next.id">下一篇：
          <button @click="openPage({name:'article-id',params: {id:prevNext.next.id}})">{{prevNext.next.title}}</button>
        </p>
      </div> -->
    </div>

    <div class="content-wrapper-r bg-f mb-30" v-if="false">
      <div class="side-top">
        <h4>相关延伸阅读</h4>
        <p>RALATED EXTENDED READING</p>
      </div>
      <a
        href="javascript:void (0)"
        @click="openPage({name:'article-id',params:{id:item.id}})"
        class="lists" v-for="(item,index) in sideList"
        :key="index"
      >
        <div class="img-wrapper">
          <img :src="item.face_pic" alt="">
        </div>
        <p class="txt row2">{{item.title | sliceStr(10)}}</p>
        <p class="times">
          <span class="browse">{{item.pv}}次</span>
          <span class="clock">{{item.create_time*1000 | formatDate}}</span>
        </p>
      </a>
    </div>
  </section>
</template>

<script>
  import {apiArticleInfo, apiArticleListRelevance, apiArticlePrevNext} from '../../api/phpApi'
  import BdShare from '@/components/other/BdShare'

  export default {
    name: 'ArticleDetail',
    components: {
      BdShare
    },
    validate ({params}) {
      return /^\d+$/.test(params.id)
    },
    data () {
      return {
        articleInfo: null,
        sideList: [],
        prevNext: null
      }
    },
    async asyncData ({params}) {
      let info = await apiArticleInfo({id: parseInt(params.id)})
      let list = await apiArticleListRelevance({limit: 3, page: 1, id: parseInt(params.id)})
      let prevNext = await apiArticlePrevNext({
        id: parseInt(params.id),
        cate_id: info.data && info.data.list ? info.data.list.cate_id : ''
      })

      return {
        articleInfo: info.data ? info.data.list : null,
        sideList: list.data ? list.data.list : [],
        prevNext: prevNext ? prevNext.data : null
      }
    },
    async fetch ({store, params}) {
      await store.commit('SET_HEADER_ACTIVE', true)
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/variables/index";

  .article-index {
    height: auto;
    .blk70 {
      height: 70px;
    }
    .title-wrapper {
      height: 160px;
      border-bottom: 1px solid #ededed;
      padding: 55px 30px 20px;
      text-align: center;
      .title {
        color: #333;
        font-size: 30px;
      }
      .times {
        margin-top: 25px;
        span {
          font-size: 14px;
          color: #4c4c4c;
          &.browse {
            padding: 0 30px;
            background: url("../../static/images/article-eyes.png") no-repeat left center;
          }
          &.clock {
            padding-left: 20px;
            background: url("../../static/images/article-clock.png") no-repeat left center;
          }

        }

      }
    }
    .content-wrapper-l {
      /*width: 880px;*/
      width: 100%;
      height: auto;
      float: left;
      margin-bottom: 50px;
      .detail_content {
        padding: 25px 45px 35px;
        text-align: center;
        line-height: 24px;
        img {
          display: inline-block;
          padding-bottom: 30px;
        }
        p {
          padding-bottom: 30px;
          font-size: 14px;
          color: #333;
          -ms-text-align-last: right;
          text-align-last: left;
          line-height: 24px;
        }
      }
      .share {
        /*width: 780px;*/

        padding: 0 45px 20px;
        margin: 0 auto 20px;
        border-bottom: 1px solid #f2f2f2;
      }
      .last-next {
        /*width: 780px;*/
        padding: 0px 45px 20px;
        margin: 20px auto;
        p {
          width: 90%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-bottom: 15px;
          &:hover {
            button {
              color: @theme-color;
            }
          }
        }
      }

    }
    .content-wrapper-r {
      width: 300px;
      height: auto;
      float: right;
      /*text-align: center;*/
      .side-top {
        height: 90px;
        padding-top: 30px;
        padding-left: 25px;
        border-bottom: 1px solid #ededed;
        h4 {
          font-size: 20px;
          color: #333;
        }
        p {
          font-size: 12px;
          color: #cccccc;
          padding-top: 10px;
        }
      }
      .lists {
        display: block;
        width: 100%;
        height: 272px;
        border-bottom: 1px solid #ededed;
        padding: 30px 20px 20px;
        .img-wrapper {
          width: 240px;
          height: 120px;
          overflow: hidden;
          margin: 0 auto;
          border-radius: 5px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .txt {
          margin: 15px 0;
          line-height: 22px;
          color: #333;
        }
        .times {
          padding: 0 5px;
          span {
            font-size: 12px;
            color: #4c4c4c;
            height: 24px;
            line-height: 24px;
            &.browse {
              padding: 0 30px;
              background: url("../../static/images/article-eyes.png") no-repeat left center;
            }
            &.clock {
              float: right;
              padding-left: 20px;
              background: url("../../static/images/article-clock.png") no-repeat left center;
            }

          }

        }
        &:last-of-type {
          border-bottom: none;
        }
      }
    }
  }
</style>
