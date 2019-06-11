<template>
  <section class="console-index mb-40">
    <console-history/>
    <console-project-manage/>
    <console-attention/>
  </section>
</template>

<script>
  import ConsoleHistory from '../../components/indexConsole/ConsoleHistory'
  import ConsoleProjectManage from '../../components/indexConsole/ConsoleProjectManage'
  import ConsoleAttention from '../../components/indexConsole/ConsoleAttention'

  export default {
    name: 'console',
    layout: 'console',
    components: {
      ConsoleHistory,
      ConsoleProjectManage,
      ConsoleAttention
    }
  }
</script>

<style lang="less">

</style>
