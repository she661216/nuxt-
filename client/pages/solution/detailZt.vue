<template>
  <div>
    <!-- 内容 -->
    <iframe id="ztiframe" name="ztiframe" :height="iheight" :src="url" width="100%" scrolling="no"></iframe>
  </div>
</template>

<script>
export default {
  name: "zt",
  layout: "zt",
  data() {
    return {
       url:this.$route.query.u,
     // url: "/togetherWorks",
      iheight: ""
    };
  },
  mounted() {
    setTimeout(_ => {
      this.setHeight();
    }, 1500);
    setTimeout(_ => {
      this.setHeight();
    }, 3000);
  },
  methods: {
    setHeight() {
      this.iheight = ztiframe.document.body.scrollHeight + "px";
    }
  }
};
</script>

<style scoped lang="less">
</style>
