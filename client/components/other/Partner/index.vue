<template>
  <div class="partner-user common-wrapper">
    <global-title
      class="relative pb-10"
      title="合作客户"
      type="bar"
    >
      <div class="absoluteRC">
        <button class="arrow" @click="$refs.swiperRef.slidePrevHandle()">
          ＜
        </button>
        <button class="arrow" @click="$refs.swiperRef.slideNextHandle()">
          ＞
        </button>
      </div>
    </global-title>
    <global-swiper
      ref="swiperRef"
      :option="{slidesPerView :5,spaceBetween : 25,speed:1000,slidesPerGroup:5,loop:true,autoplay:2000}"
    >
      <div class="swiper-slide" v-for="i in 12" :key="i">
        <img class="slide-img default-img" :src="`/images/temp_f${i}.png`" alt="">
        <img class="slide-img active-img" :src="`/images/temp_f${i}_active.png`" alt="">
      </div>
    </global-swiper>
  </div>
</template>

<script>

  export default {
    name: 'Partner'
  }
</script>

<style scoped lang="less">
  @import "../../../assets/less/variables/index";

  .partner-user {
    margin-bottom: 80px;
    overflow: hidden;
    .arrow {
      @h: 30px;
      width: @h;
      height: @h;
      border-radius: @h;
      background: #999;
      color: #fff;
      line-height: @h;
      text-align: center;
      &.active,
      &:hover {
        background: @theme-color;
      }
    }
    .swiper-slide {
      &:hover {
        .default-img {
          display: none;
        }
        .active-img {
          display: block;
        }
      }
      .active-img {
        display: none;
      }
    }
    .slide-img {
      width: 220px;
      height: 100px;
      border: 1px solid #eee;
    }
  }
</style>
