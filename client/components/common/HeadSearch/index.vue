<template>
  <div class="head-search middle middle-box" :class="{active:isActive}" @keydown.enter="searchHandle">
    <input
      ref="inputRef"
      v-model="searchval"
      class="middle search-input"
      type="text"
      @focus="isActive=true"
      @blur="isActive=false"
      placeholder=""
    />
    <button class="middle search-icon height-100 relative" @click="searchHandle">
      <img class="absoluteCC " src="/images/icon_search.png" alt="">
    </button>
  </div>
</template>

<script>
  export default {
    name: 'HeadSearch',
    data () {
      return {
        searchval: '',
        isActive: false
      }
    },
    methods: {
      searchHandle () {
        if (!this.searchval) {
          this.$refs.inputRef.focus()
          this.$message.error('请输入搜索内容')
          return
        }
        this.openPage({name: 'search', query: {keywords: this.searchval}}, true)
      }
    }
  }
</script>

<style scoped lang="less">

  .head-search {
    @h: 36px;
    height: @h;
    border: 1px solid transparent;
    border-radius: @h;
    transition: all .3s;
    padding-left: 0px;
    /*transform: scaleX(0.2);*/
    &.active,
    &:hover {
      /*transform: scaleX(1);*/
      border-color: #fff;
      padding-left: 20px;
      .search-input {
        width: 160px;
        transform: scaleX(1);
        /*display: inline-block;*/
      }
    }
    .search-input {
      width: 0px;
      color: #fff;
      height: 100%;
      transition: all .3s;
      transform: scaleX(0);
      /*display: none;*/
    }
    .search-icon {
      padding: 0 20px;
    }
  }
</style>
