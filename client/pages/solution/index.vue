<template>
  <div>
    <div class="header">
      <div class="row">
        <div class="solution_btn">
         <a href="service/issue"><button >发布定制需求</button></a>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="items clearfix">
   
        <div class="list" v-for="(item,index) in solutionList" :key="index" @click="open_page(item.url)">
          <div class="bant">
            <img :src="item.face_pic"/>
          </div>
          <div class="text">
            <div class="text_title">{{item.title}}</div>
            <div class="s"></div>
            <div class="desc row3" v-html="htmlDecode(item.desc_html)">
     
            </div>
          </div>
          <div class="search">
            <img src="/images/solution/xq.png"/>
            查看详情    
            </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
  import {apiSchemeMenuList} from '../../api/phpApi'

  export default {
    data () {
      return {}
    },
    async asyncData () {
      let data = await apiSchemeMenuList({page: 1, limit: 10000})
      return {
        solutionList: data.data ? data.data.list : []
      }
    },
      methods: {
    htmlDecode: htmlStr => {
      return htmlStr
       .replace(/<br>/g, '')
        .replace(/ &nbsp;/g, "")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')       
        .replace(/&#39;/g, "");
    },
    tip(){
      this.$message({
          type: "warning",
          message: "正在开发中，敬请期待！！！",
          duration: 1000
        });
    },
    open_page(url){
      if(url){
          window.open('/solution/detailZt?u='+url);
      }else{
        this.tip()
      }
    }
  }
  }
</script>

<style scoped lang="less">

  .header {
    background: url(../../static/images/solution/banner.png) no-repeat center;
    width: 100%;
    height: 400px;
  }

  .solution_btn {
    padding-top: 276px;
    padding-left: 50px;
  }

  .solution_btn button {
    border: 1px solid #FFFFFF;
    border-radius: 5px;
    background: transparent;
    font-size: 20px;
    color: #FFFFFF;
    width: 194px;
    height: 62px;
    cursor: pointer;
    outline: none;
  }

  .row {
    width: 1200px;
    margin: 0 auto;
  }

  .items {
    width: 1250px;
    margin: 0 auto;
    margin-top: 40px;
  }

  .list {
    width: 280px;
    height: 340px;
    background: #FFFFFF;
    border: 1px solid #f5f5f5;
    float: left;
    margin: 0 13px;
    margin-bottom: 21px;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    transition: box-shadow .5s;
    box-sizing: content-box;
  }

  .list .bant {
    width: 100%;
  }

  .list .bant img {
    width: 100%;
    height:160px;
  }

  .list:hover {
    /*border-color: transparent;*/
    border: none;
    width: 282px;
    height: 342px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .3);
    .search {
      transform: translateY(0%);
    }
  }

  .s {
    border: 2px solid #B0D6FD;
    width: 30px;
    height: 1px;
    margin: 14px auto;
    background-color: #b0d6fd;
  }

  .text_title {
    text-align: center;
    font-size: 22px;
    color: #131313;
    margin-top: 15px;
  }

  .desc {
    font-size: 14px;
    color: #4A4A4A;
    width: 240px;
    margin: 0 auto;
    line-height: 24px;
  }

  .search img {
    position: relative;
    top: 5px;
    right: 10px;
  }

  .search {
    width: 100%;
    height: 71px;
    background: rgba(66, 103, 181, 0.8);
    position: absolute;
    bottom: 0;
    text-align: center;
    line-height: 71px;
    font-size: 16px;
    color: #FFFFFF;
    transition: all .3s;
    transform: translateY(100%);
    img {
      display: inline-block;
    }
  }

</style>
