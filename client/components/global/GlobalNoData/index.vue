<template>
  <div class="global-no-data">
    <img v-if='!content' src='/images/no-data-img.png'/>
    <p v-if='content' v-html='content'></p>
  </div>
</template>

<script>
  export default {
    name: 'GlobalNoData',
    props: {
      content: {
        type: String,
        default: '暂无数据'
      }
    }
  }
</script>

<style lang="less">

  .global-no-data {
    position: relative;
    background: #fff;
    text-align: center;
    padding:40px;
    color:#909399;
    width: 232px;
    margin:  0 auto;
 
    font-size: 14px;
    img{
    margin: 70px 0;
    }
  }

</style>
