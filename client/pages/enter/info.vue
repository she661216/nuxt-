<template>
  <div>
    <top state="1"/>
    <!-- 内容 -->
    <div class="equity">
      <h1>一品优选自营创意，托付式服务平台</h1>
      <div  class="common-wrapper clearfix">
        <div class="item-div">
          <div class="top-title">U+团队权益</div>

          <div class="item-text" v-for="item in list[1]" :key="item">
            <p class="text text1">
              <i></i>
              {{item.title}}
            </p>
            <div class="text text2" v-html="htmlDecode(item.desc)"></div>
          </div>
        </div>
        <div class="item-div">
          <div class="top-title" style="background: url('/images/black.jpg') no-repeat center;">入驻要求</div>

          <div class="item-text blue-box" v-for="item in list[2]" :key="item">
            <p class="text text1">
              <i></i>
              {{item.title}}
            </p>
           <div class="text text2" v-html="htmlDecode(item.desc)"></div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiShopEquity } from "../../api/phpApi";
import Top from "../../components/other/Steps/top";
export default {
  name: "StepInfo",
  components: {
    Top
  },
  data() {
    return {
      list: {}
    };
  },
  mounted() {
  
    this.get_shop_equity();
  },
  methods: {
    async get_shop_equity() {   
      let { data } = await apiShopEquity({ limit: 10 });
      this.list = data;
    },
        htmlDecode: htmlStr => {
      return htmlStr
        .replace(/nbsp;/g,'')      
        .replace(/&amp;/g,'')      
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')      
        .replace(/&#39;/g, "")
        .replace(/&/g,'');
    }
  }
};
</script>

<style scoped lang="less">
.equity {
  margin-bottom: 100px;
  h1 {
    font-size: 40px;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    margin-bottom: 40px;
    text-align: center;
  }
  > div {
    .item-div {
      width: 580px;
      min-height: 400px;
      box-shadow: 0px 10px 40px 0px rgba(0, 0, 0, 0.2);
      margin-right: 40px;
      float: left;
      &:nth-of-type(2) {
        margin-right: 0;
      }
      .top-title {
        height: 120px;
        line-height: 120px;
        font-size: 30px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        background: url("/images/red.jpg") no-repeat center;
        padding-left: 55px;
        margin-bottom: 40px;
      }
      .item-text {
        padding-left: 40px;
        padding-right: 40px;
        margin-bottom: 30px;
        height: auto;
        background: fff;
      
          .text1{
            padding: 0 40px;
            font-size: 20px;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            margin-bottom: 13px;
            line-height: 26px;
            position: relative;
            i {
              position: absolute;
              display: inline-block;
              width: 27px;
              height: 22px;
              background: url(/images/right.png) no-repeat center;
              left: 1px;
            }
          }
    
          .text2 {
            padding-left: 40px;
            padding-right: 40px;
            font-size: 14px;
            line-height: 18px;
          }
        
      }
          .item-text.blue-box>p> i{
      background: url(/images/blue-right.png) no-repeat center;
          }
    }
  }
}
</style>
