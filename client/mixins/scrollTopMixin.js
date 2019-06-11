export default {
  data () {
    return {
      isMoving: false
    }
  },
  methods: {
    scrollTop (scrollEl = document.getElementsByTagName('html')[0], scrollTo = 0, animate = false) {
      if (!animate) {
        scrollEl.scrollTop = scrollTo
        return
      }
      if (this.isMoving) return
      const start = scrollEl.scrollTop
      // let i = 0
      this.isMoving = true

      if (start > scrollTo) {
        this.interval = setInterval(_ => {
          scrollEl.scrollTop -= Math.ceil((scrollEl.scrollTop) / 10)
          // 向上
          // console.log(scrollEl.scrollTop, scrollTo)
          if ((scrollEl.scrollTop) <= scrollTo || scrollEl.scrollTop <= 0) {
            this.isMoving = false
            clearInterval(this.interval)
          }
        }, 10)
      } else {
        this.interval = setInterval(_ => {
          scrollEl.scrollTop += Math.ceil((scrollTo - scrollEl.scrollTop) / 5)
          // 向下
          // console.log(scrollEl.scrollTop, scrollTo)
          if ((scrollEl.scrollTop) >= scrollTo) {
            this.isMoving = false
            clearInterval(this.interval)
          }
        }, 10)
      }
    }
  }
}
