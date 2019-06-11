<template>
  <div class="side-notice-new">
    <div class=" item1-content mb-40">
      <h6 class="fs-16 font-blod ">你的新标的来了！</h6>
      <div class="pd-20" v-if="noticeList.length">
        <nuxt-link
          class="row1 link-a common-hover"
          v-for="(item,index) in noticeList"
          :key="index"
          :to="{name:'console-detail-id',params:{id:item.n_id},query:{action:'notice'}}">
          {{item.title}}
        </nuxt-link>
      </div>
      <global-no-data v-else content="暂无公共数据"/>
    </div>
    <div class="item1-content my">
      <h6 class="fs-16 font-blod ">我的成员</h6>
      <div class="pd-20 clearfix" v-if="kbList.length" style="padding-top:20px">
       <div>
          <div v-for="(item,index) in kbList" :key='index'>
         <a v-if='index<5'  class="kb-list" :href="'/console/manage-console/add-user?t_id='+item.t_id+'&check_status='+item.check_status" >
             <img :src='item.face_pic' />
           <div class="box" >
             <p class="row1 mb-5 c666 fz14">{{item.true_name.slice(0,1)}}** ({{item.nick_name}})</p>
            <p class="row1 mb-5 c666 fz14">{{item.position_type_name}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.add_work_time}}年工作经验</p> 
             <p class="row1 mb-5 c666 fz14">{{item.school}}{{education_name[item.education]}}</p>
            </div>
         </a>
        </div>
       </div>

        <nuxt-link
          class="link-a r color-link pt-10 pb-10 pl-10"
          :to="{name:'console-manage-console-store-detail',params:{page:1}}">
          
         查看更多》
        </nuxt-link>
      </div>
      <global-no-data v-else content="暂无成员数据"/>
    </div>
  </div>
</template>
<script>
import { apiGetShopTalentList, apiNoticeList } from "../../../api/phpApi";

export default {
  name: "SideNotice",
  data() {
    return {
      education_name:{
          1:'高中',
          2:'专科',
          3:'本科',
          4:'研究生',
          5:'博士',
      },
        kbList: [],
      noticeList: []
    };
  },
  
  mounted() {
     this.getShopTalentList()
    this.getNoticeData();
  },

  methods: {

      async getShopTalentList() {
       let { data } = await apiGetShopTalentList({limit:5,page:1});
       this.kbList = data ? data.list : [];
    },

    async getNoticeData() {
      let { data } = await apiNoticeList({ limit: 10, page: 1 });
      data && (this.noticeList = data.list);
    }
  }
};
</script>

<style lang="less" >
@import "../../../assets/less/variables/index";

.side-notice-new {
  position: absolute;
  top: 40px;
  /*<!--top: @headerH + 40px;-->*/
  right: 40px;
  width: 300px;
  h6 {
    padding: 20px;
    border-bottom: 1px solid #e6e6e6;
  }
  .item1-content {
    background: #fff;
    width: 300px;
    .link-a {
      display: block;
      font-size: 12px;
      padding-bottom: 16px;
      &:hover {
        p {
          color: @theme-color;
        }
        div {
          color: #999;
        }
      }
      p {
        color: #000;
        font-size: 14px;
      }
      div {
        color: #999;
      }
    }
  }
  .my {
      .kb-list{
       border-bottom: 1px solid #e6e6e6;
       margin-bottom: 10px;
       margin-top: 10px;
       cursor: pointer;
      
    }
      .kb-list:last-child{
         border-bottom:0;
     }
    img {
      width: 80px;
      height: 80px;
      float: left;
      margin-right: 20px;
      border-radius: 100px;
    }
    .box {
      width: 160px;
      overflow: hidden;
      line-height: 23px;
       margin-bottom: 20px;
      .c333 {
        color: #333;
      }
      .c666 {
        color: #666;
      }
      .fz14 {
        font-size: 14px;
      }
      .fz16 {
        font-size: 16px;
      }
    }
    a.color-link {
       color: @theme-color !important;
    }
  }
}
</style>
