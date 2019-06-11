<template>
  <div class="common-content mt-30 attention-content">
    <h6 class="fs-20 font-blod">你可能关注——行业解决方案</h6>
    <div class="clearfix attention-box">
      <div class="l attention-item" v-for="(item,index) in list" :key="index">
        <a class="attention-item__content" :href="item.url" target="_blank">
          <div class="img-box inline relative">
            <img class="absoluteCC" :src="item.face_pic" alt="">
          </div>
          <p class="mt-25 color-0 text-center lh1-5 row1">{{item.title}}</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import {apiSchemeMenu} from '../../api/phpApi'

  export default {
    name: 'ConsoleAttention',
    data () {
      return {
        list: []
      }
    },
    mounted () {
      this.getList()
    },
    methods: {
      async getList () {
        let {data} = await apiSchemeMenu({page: 1, limit: 15})
        data && (this.list = data.list)
      }
    }
  }
</script>

<style lang="less">
  .attention-content {
    h6 {
      padding: 30px 40px;
    }
    .attention-box {
      padding: 0px 20px 30px;
    }
    .attention-item {
      padding: 0 20px;
      margin-top: 30px;
      width: 20%;
      .attention-item__content {
        display: block;
      }
      .img-box {
        width: 80px;
        height: 80px;
        background: #df3d47;
        border-radius: 6px;
        position: relative;
        overflow: hidden;
        margin: 0 auto;
        display: block;
        img {
          /*min-width: 100%;*/
          /*min-height: 100%;*/
          width: 65px;
          height: 65px;
        }
      }
    }
  }
</style>
