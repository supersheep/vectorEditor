<template lang="jade">
  svg.circle-graph(:width='radius * 2',:height='radius * 2',:style='style')
    circle(:cx="radius",:cy="radius",:r="radius")
</template>

<script>
import props from './props'
export default {
  props: props,
  computed: {
    style () {
      return {
        left: this.position.x + 'px',
        top: this.position.y + 'px'
      }
    },
    radius () {
      return this.data ? this.data.radius : 0
    },
    width () {
      return (this.radius || 0) * 2
    },
    height () {
      return this.width
    }
  }
}
</script>

<style lang="less">
.circle-graph{
  position: absolute;
}
</style>
