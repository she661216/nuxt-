<template>
  <div class="global-ad common-wrapper relative" v-if="list && list.length" :style="{backgroundImage:`url(${bg})`}">
    <p class="" ref="p" :style="{}">{{currentTitle}}</p>
  </div>
</template>

<script>
  export default {
    name: 'GlobalAd',
    props: {
      bg: {
        type: String,
        default: '/images/ad_bg.jpg'
      },
      list: {
        type: Array,
        default () {
          return [
            // {content: '赋能数字时代 ，实现价值共赢！'}
          ]
        }
      }
    },
    data () {
      return {
        currentTitle: '',
        activeIndex: 0,
        currentLength: 0,
        timer: null,
        animationDuration: '',
        width: 0
      }
    },
    mounted () {
      this.list &&  this.list.length > 0 && this.typing(this.list[this.activeIndex].content)
    },
    beforeDestroy () {
      this.timer && clearTimeout(this.timer)
    },
    methods: {
      typing (str) {
        if (str && this.currentLength <= str.length) {
          this.currentTitle = str.slice(0, this.currentLength++) + '_'
          setTimeout(_ => {
            this.typing(this.list[this.activeIndex].content)
          }, 100)//递归调用
        } else {
          this.currentTitle = str//结束打字,移除 _ 光标
          this.activeIndex = this.activeIndex + 1 < this.list.length ? this.activeIndex + 1 : 0
          this.timer = setTimeout(_ => {
            this.width = 0
            this.currentLength = 0
            this.typing(this.list[this.activeIndex].content)
          }, 1500)
        }
      }
    }
  }
</script>

<style lang="less">

  .global-ad {
    background-size: 100% 100%;
    height: 80px;
    line-height: 80px;
    font-size: 32px;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    overflow: hidden;
    white-space: nowrap;
    padding-left: 40px;
    text-align: center;
    p {
      /*position: absolute;*/
      text-align: center;
      /*top: 0px;*/
      /*left: 0;*/
      /*word-break: keep-all;*/
      /*white-space: nowrap;*/
      /*animation: i-translateX linear infinite;*/
      /*font-size: 12px;*/
      /*transition: all .6s ease !important;*/
      /*backface-visibility: hidden;*/
    }
  }

  @keyframes i-translateX {
    0% {
      //left:100%;
      transform: translate3d(100%, 0, 0);
    }

    100% {
      //left:-100%;
      transform: translate3d(-100%, 0, 0);
    }

  }
</style>
