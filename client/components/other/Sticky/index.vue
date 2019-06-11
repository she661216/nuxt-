<template>
  <div :style="{height:height+'px',zIndex:zIndex}">
    <div :class="className"
         :style="{top:stickyTop+'px',zIndex:zIndex,position:position,width:width,height:height+'px'}"
    >
      <slot>
        <div>sticky</div>
      </slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Sticky',
    props: {
      stickyTop: {
        type: Number,
        default: 0
      },
      zIndex: {
        type: Number,
        default: 1
      },
      className: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        active: false,
        position: '',
        width: undefined,
        height: undefined,
        isSticky: false,
        scrollEl: window
      }
    },
    mounted () {
      // this.height = this.$el.getBoundingClientRect().height
      // console.log(this.scrollEl)
      // this.scrollEl.addEventListener('scroll', this.handleScroll)
      // this.scrollEl.addEventListener('resize', this.handleReize)
    },
    activated () {
      this.handleScroll()
    },
    destroyed () {
      this.scrollEl.removeEventListener('scroll', this.handleScroll)
      this.scrollEl.removeEventListener('resize', this.handleReize)
    },
    methods: {
      initListener (scrollEl) {
        if (process.browser) {
          scrollEl && (this.scrollEl = scrollEl.$el)
          this.height = this.$el.getBoundingClientRect().height
          this.scrollEl.addEventListener('scroll', this.handleScroll)
          this.scrollEl.addEventListener('resize', this.handleReize)
        }
      },
      sticky () {
        if (this.active) {
          return
        }
        this.position = 'fixed'
        this.active = true
        this.width = this.width + 'px'
        this.isSticky = true
        this.$emit('fixedAfter')
      },
      reset () {
        if (!this.active) {
          return
        }
        this.position = ''
        this.width = 'auto'
        this.active = false
        this.isSticky = false
        this.$emit('reset')
      },
      handleScroll () {
        this.width = this.$el.getBoundingClientRect().width
        const offsetTop = this.$el.getBoundingClientRect().top
        this.$emit('scrolling')
        if (offsetTop < this.stickyTop) {
          this.sticky()
          return
        }
        this.reset()
      },
      handleReize () {
        if (this.isSticky) {
          this.width = this.$el.getBoundingClientRect().width + 'px'
        }
      }
    }
  }
</script>
