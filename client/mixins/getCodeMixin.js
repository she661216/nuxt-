import {regPhone} from '../utils/rules'

export default {
  data () {
    return {
      isGetCode: false,
      waitTime: 60,
      timer: null
    }
  },
  computed: {
    btnText () {
      return this.isGetCode ? `${this.waitTime}秒可重发` : '获取验证码'
    }
  },
  beforeDestroy () {
    this.clearTimer()
  },
  methods: {
    async getCode (apiFunc, params) {
      if (this.isGetCode) return
      if (!regPhone(params.mobile)) {
        this.$message({
          showClose: true,
          message: '请输入正确的手机号!',
          type: 'error',
          duration: 2 * 1000
        })
        return
      }
      // showLoading()
      let {code} = await apiFunc(params, true)
      if (code === 200) {
        this.$message({
          title: '成功',
          message: '短信验证码发送成功，请注意查收！',
          type: 'success'
        })
        this.waitTime = 60
        this.isGetCode = true
        this.timer = setInterval(_ => {
          --this.waitTime
          if (this.waitTime <= 0) {
            this.clearTimer()
          }
        }, 1000)
      }
    },
    clearTimer () {
      clearInterval(this.timer)
      setTimeout(_ => {
        this.isGetCode = false
      }, 1000)
    }
  }
}
