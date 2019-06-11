<template>
  <div class="clearfix" v-if="total">
    <el-pagination
      class="r"
      background
      layout="prev, pager, next"
      :total="parseInt(total)"
      :current-page="parseInt(page)"
      :page-size="parseInt(pageSize)"
      @current-change="paginationChange">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'GlobalPagination',
    props: {
      total: {
        type: [Number, String],
        default: 0
      },
      page: {
        type: [Number, String],
        default: 1
      },
      pageSize: {
        type: [Number, String],
        default: 10
      }
    },
    methods: {
      paginationChange (page) {
        this.$emit('change', page)
      }
    }
  }
</script>

<style scoped>

</style>
