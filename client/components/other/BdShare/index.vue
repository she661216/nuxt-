<template>
  <div class="bdsharebuttonbox" data-tag="share_1" style="height: 28px">
    <a href="#" class="bds_more" data-cmd="more"></a>
    <a href="#" class="bds_qzone" data-cmd="qzone"></a>
    <a href="#" class="bds_tsina" data-cmd="tsina"></a>
    <a href="#" class="bds_tqq" data-cmd="tqq"></a>
    <a href="#" class="bds_renren" data-cmd="renren"></a>
    <a href="#" class="bds_weixin" data-cmd="weixin"></a>
  </div>
</template>
<script>
  export default {
    name: 'BdShare',
    head: {
      script: [
        {
          type: 'text/javascript',
          src: 'http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion=' + ~(-new Date() / 36e5)
        }
      ]
    }
  }
</script>

<style scoped lang="less">

</style>
