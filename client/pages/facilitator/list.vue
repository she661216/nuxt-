<template>
  <section class="list-index">
    <div class="issue-header-bg relative">
      <img class="height-100 width-100 absoluteCC" src="/images/server_bg.png" alt>
      <a href="javascript:void(0);" @click="openPage({path:'/facilitator/detail/details'})"></a>
    </div>
    <!--搜索-->
    <div class="common-wrapper clearfix">
      <div class="form_top">
        <div>
          <input type="text" placeholder="您可以输入服务商行业或名称直接搜索">
          <button class>搜索</button>
        </div>
        <div class="form_tj">
          <div>
            条件：
            <span>
              WEB开发
              <i></i>
            </span>
            <span>移动开发</span>
            <span>福建省</span>
            <span>天津市</span>
            <span>项目成功率降序</span>
          </div>
          <button>清空条件</button>
        </div>
      </div>
      <!--推荐-->
      <div class="form_bottom">
        <img src="/images/shaixuan.png" alt>
        <div class="label">
          擅长行业：
          <span>WEB开发</span>
          <span class="active">桌面应用开发</span>
        </div>
        <div class="label eight_label">
          地理位置：
          <span>上海市</span>
          <span class="active">北京市</span>
        </div>
        <div class="label">
          排序方式：
          <span>项目成功率降序</span>
          <span class="active">优选老服务商</span>
        </div>
      </div>
      <!-- 列表 -->
      <div class="lists">
        <div class="list_item">
          <div class="texts">
            <img src="/images/fws.png" alt>
            <div>
              <h3>厦门一品威客股份有限公司</h3>
              <p>
                <i></i>
                擅长行业1/擅长行业2/擅长行业3
              </p>
              <p>
                <span>规模：56人</span>
                <span>类型：上市企业项目</span>
                <span>成功率：100%</span>
                <span>公司地址：福建省厦门市集美区软件园三期</span>
              </p>
              <p>公司介绍：介绍自己的业务领域包含了哪些让雇主一眼就可以看到，该位置仅显示一行，超过神略xxxxxxxxxxxxxxxx号...</p>
            </div>
          </div>
          <!-- 全部标签 -->
          <div class="all_label">
            <span>技能标签</span>
            <span>技能标签</span>
            <span>技能标签</span>
            <span>技能标签</span>
            <span class="open_label">
              <i></i>
              展开全部
            </span>
          </div>
        </div>
        <div class="list_item">
          <div class="texts">
            <img src="/images/fws.png" alt>
            <div>
              <h3>厦门一品威客股份有限公司</h3>
              <p class="label_text">
                <i></i>
                擅长行业1/擅长行业2/擅长行业3
              </p>
              <p class="type_text">
                <span>规模：56人</span>
                <span>类型：上市企业项目</span>
                <span>成功率：100%</span>
                <span>公司地址：福建省厦门市集美区软件园三期</span>
              </p>
              <p class="introduce">公司介绍：介绍自己的业务领域包含了哪些让雇主一眼就可以看到，该位置仅显示一行，超过神略xxxxxxxxxxxxxxxx号...</p>
            </div>
          </div>
          <!-- 全部标签 -->
          <div class="all_label">
            <span>技能标签</span>
            <span>技能标签</span>
            <span>技能标签</span>
            <span>技能标签</span>
            <span class="open_label">
              <i></i>
              展开全部
            </span>
          </div>
        </div>

        <!-- 分页 -->
        <global-pagination
          :total="total"
          :page="page"
          :pageSize="pageSize"
          @change="paginationChange"
          class="page"
        />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      total: 10,
      page: 1,
      pageSize: 2
    };
  },
  methods: {
    paginationChange(page) {
      this.scrollTop();
      this.page = page;
    }
  }
};
</script>

<style scoped lang="less">
@import "../../assets/less/variables/index";
.list-index {
  @color: #aaa;
  .issue-header-bg {
    height: 450px;
    overflow: hidden;
    a {
      display: block;
      width: 185px;
      height: 47px;
      position: absolute;
      top: 157px;
      left: 45.2%;
    }
  }
  .common-wrapper {
    margin-top: -205px;
    position: relative;
    z-index: 1;
    margin-bottom: 100px;
    .form_top {
      margin-bottom: 20px;
      > div:nth-child(1) {
        height: 60px;
        input {
          width: 1000px;
          height: 60px;
          background: rgba(255, 255, 255, 1);
          font-size: 16px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          padding-left: 20px;
          float: left;
        }
        button {
          width: 200px;
          height: 60px;
          text-align: center;
          font-size: 20px;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          background: rgba(215, 12, 25, 1);
        }
      }
      > div:nth-child(2) {
        height: 50px;
        div {
          width: 1000px;
          height: 50px;
          line-height: 50px;
          background: rgba(245, 245, 245, 1);
          font-size: 14px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          padding-left: 20px;
          float: left;
          span {
            font-size: 14px;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            margin-right: 30px;
            position: relative;
            i {
              width: 11px;
              height: 11px;
              background: url("/images/del.png") no-repeat center;
              position: absolute;
              top: -1px;
              right: -5px;
            }
          }
        }
        button {
          width: 200px;
          height: 50px;
          text-align: center;
          background: rgba(204, 204, 204, 1);
          font-size: 14px;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
        }
      }
    }
    .form_bottom {
      height: 250px;
      background: rgba(255, 255, 255, 1);
      padding: 10px 0 30px 40px;
      position: relative;
      margin-bottom: 21px;
      img {
        width: 50px;
        height: 50px;
        position: absolute;
        top: 0;
        left: 0;
      }
      .label {
        margin-top: 30px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        span {
          display: inline-block;
          width: 120px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          margin-right: 10px;
          border: 1px solid rgba(230, 230, 230, 1);
          border-radius: 4px;
          font-size: 12px;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          &:nth-child(1) {
            margin-left: 26px;
          }
          &.active {
            border: 1px solid rgba(215, 12, 25, 1);
            color: rgba(215, 12, 25, 1);
          }
        }
        &.eight_label {
          span {
            width: 80px;
          }
        }
      }
    }
    .lists {
      width: 1200px;
      background: rgba(255, 255, 255, 1);
      padding: 40px 80px 85px 80px;
      .list_item {
        margin-bottom: 40px;
        padding-bottom: 40px;
        padding-right: 60px;
        border-bottom: 1px solid rgba(245, 245, 245, 1);
        .texts {
          > img {
            width: 300px;
            height: 150px;
            border-radius: 6px;
            float: left;
            margin-right: 30px;
          }
          > div {
            h3 {
              font-size: 20px;
              font-weight: bold;
              color: rgba(0, 0, 0, 1);
              line-height: 25px;
            }
            p {
              &:nth-of-type(1) {
                font-size: 14px;
                font-weight: 400;
                color: rgba(0, 0, 0, 1);
                margin: 20px 0;
                i {
                  display: inline-block;
                  width: 14px;
                  height: 14px;
                  background: url("/images/label.png") no-repeat center;
                  margin-right: 8px;
                }
              }
              &:nth-of-type(2) {
                font-weight: 400;
                color: rgba(77, 77, 77, 1);
                span {
                  font-size: 12px;
                  margin-right: 20px;
                }
              }
              &:nth-of-type(3) {
                font-size: 14px;
                font-weight: 400;
                color: rgba(153, 153, 153, 1);
                margin: 23px 0 24px 0;
              }
            }
          }
        }
        .all_label {
          text-align: right;
          span {
            display: inline-block;
            width: 120px;
            height: 40px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(230, 230, 230, 1);
            border-radius: 4px;
            margin-left: 10px;
            font-size: 14px;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            line-height: 40px;
            text-align: center;
            &.open_label {
              background: rgba(237, 237, 237, 1);
              position: relative;
              cursor: pointer;
              i {
                display: inline-block;
                position: absolute;
                width: 7px;
                height: 4px;
                background: url("/images/open_label.png") no-repeat top;
                top: 18px;
                left: 16px;
              }
            }
          }
        }
      }
      .page {
        margin-top: -100px;
      }
    }
  }
}
</style>