<template>
  <div class="global-avatar" :class="{circle:isCircle}" :style="{width:size,height:size}">
    <img class="absoluteCC" :src="image" alt="">
  </div>
</template>

<script>
export default {
  name: "GlobalAvatar",
  props: {
    image: {
      type: String,
      default: "/images/icon_avatar.png"
    },
    size: {
      type: String,
      default: "40px"
    },
    isCircle: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="less">
.global-avatar {
  position: relative;
  background: #eee;
  overflow: hidden;
  &.circle {
    border-radius: 100%;
    img {
      border-radius: 100%;
    }
  }
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
