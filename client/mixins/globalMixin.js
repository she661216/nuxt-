import {mapState} from 'vuex'

export default {
  data () {
    return {
      isMoving: false,
      seoData: {
        title: '一品优选_一站式托管服务，只为你的满意。',
        keywords: '区块链智能合约,区块链开发,区块链应用,智能合约解决方案,区块链,区块链游戏,区块链宠物,区块链开发,区块链技术开发,区块链变现,区块链宠物开发,区块链公司,区块链金融,区块链溯源,区块链投资,区块链项目,挖矿,以太坊,莱特币',
        desc: '一品优选是一品威客旗下专业区块链开发供应商,快速落地区块链钱包区块链商城/区块链游戏/挖矿/企业私链等,提供安全、高效、全面的区块链服务,包交付保上线。'
      }
    }
  },
  head () {
    return {
      title: this.seoData.title,
      meta: [
        {hid: 'keywords', name: 'keywords', content: this.seoData.keywords},
        {hid: 'description', name: 'description', content: this.seoData.desc}
      ]
    }
  },
  computed: {
    ...mapState({
      loadingNum: state => state.common.loadingNum,
      userInfo: state => state.user.userInfo
    })
  },
  methods: {
    openPage (option, blank = false) {
      let routeData = this.$router.resolve(option)
      blank ? window.open(routeData.href) : window.location.href = routeData.href
    },
    scrollTop (scrollEl = document.getElementsByTagName('html')[0], scrollTo = 0, animate = true) {
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
