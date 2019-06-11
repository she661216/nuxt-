<template>
  <div class="index-article-list">
    <ul class="common-wrapper clearfix">
      <li class="col-xs-3 information-item" v-for="(item,index) in list" :key="index">
        <nuxt-link :to="{name:'article-id',params:{id:item.id}}">
          <h6 class="information-item__title row1">{{item.title}}</h6>
          <p class="information-item__content row2 lh1-3">{{item.summary  | sliceStr(25)}}</p>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'IndexArticleList',
    props: ['list']
  }
</script>

<style scoped lang="less">
  .index-article-list {
    background: #10172D;
    margin-bottom: 80px;
    .information-item {
      color: #fff;
      height: 160px;
      padding: 45px 20px 0 47px;
      border-right: 1px solid #1D253B;
      cursor: pointer;
      &:hover {
        background: #1D253B;
      }
      .information-item__title {
        font-size: 24px;
        color: rgba(255, 255, 255, 1);
        margin-bottom: 18px;
      }
      .information-item__content {
        width: 197px;
        font-size: 14px;
        color: rgba(86, 94, 115, 1);
      }
    }
  }
</style>
