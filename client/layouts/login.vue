<template>
  <div>
    <common-header/>
    <div>
      <nuxt/>
    </div>
    <common-footer/>
    <side-bar/>
    <feedback-dialog/>
  </div>
</template>
<script>
  import CommonHeader from '../components/layoutLogin/Header'
  import CommonFooter from '../components/layoutLogin/footer'
  import SideBar from '../components/common/SideBar'
  import FeedbackDialog from '../components/common/FeedbackDialog'

  export default {
    components: {
      CommonHeader,
      CommonFooter,
      SideBar,
      FeedbackDialog
    }
  }
</script>
