<template>
  <div class="global-swiper" v-swiper:mySwiper="swiperOption" ref="mySwiper" @someSwiperEvent="callback">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
    <!-- Optional controls -->
    <template v-if="isPagination">
      <div class="swiper-pagination" slot="pagination"/>
    </template>
    <template v-if="isArrow">
      <div class="swiper-button-prev" slot="button-prev"/>
      <div class="swiper-button-next" slot="button-next"/>
    </template>
    <template v-if="isScrollbar">
      <div class="swiper-scrollbar" slot="scrollbar"/>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'SwiperSlide',
    props: {
      option: {
        type: Object,
        default () {
          return {}
        }
      },
      isPagination: {
        type: Boolean,
        default: false
      },
      isArrow: {
        type: Boolean,
        default: false
      },
      isScrollbar: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        swiperOption: Object.assign({}, this.option)
      }
    },
    computed: {
      swiper () {
        return this.$refs.mySwiper.swiper
      }
    },
    mounted () {
      // current swiper instance
      // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
      // console.log('this is current swiper instance object', this.swiper)
      // this.swiper.slideTo(3, 1000, false)
    },
    methods: {
      slideToHandle (index) {
        this.swiper.slideTo(index, 1000, false)
      },
      slideNextHandle (speed = 1000, runCallbacks = _ => {
      }) {
        this.swiper.slideNext(runCallbacks, speed)
      },
      slidePrevHandle (speed = 1000, runCallbacks = _ => {
      }) {
        this.swiper.slidePrev(runCallbacks, speed)
      },
      callback () {

      }
    }
  }
</script>
<style lang="less">
  .global-swiper {
    .swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets {
      bottom: 30px;
    }

    .swiper-pagination-bullet {
      border: 1px solid #fff;
    }

    .swiper-pagination-bullet-active {

      background: #fff;
    }
  }

</style>
