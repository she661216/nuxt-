<template>
  <div class="height-100 ">
    <common-header/>
    <div>
      <nuxt/>
    </div>
    <common-footer/>
    <copyright/>
    <side-bar/>
    <feedback-dialog/>
  </div>
</template>
<script>
  import CommonHeader from '../components/layout/Header'
  import CommonFooter from '../components/layout/Footer'
  import Copyright from '../components/layout/Copyright'
  import SideBar from '../components/common/SideBar'
  import FeedbackDialog from '../components/common/FeedbackDialog'

  export default {
    components: {
      CommonHeader,
      CommonFooter,
      Copyright,
      SideBar,
      FeedbackDialog
    }
  }
</script>
