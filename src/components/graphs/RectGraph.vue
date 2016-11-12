<template lang="jade">
  svg.rect-graph(:width='width',:height='height',:style='style')
    rect(:width='width',:height='height',:style='rectStyle')
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
    rectStyle () {
      return {
        fill: this.data.fillColor,
        opacity: this.data.opacity
      }
    },
    width () {
      return this.data.width
    },
    height () {
      return this.data.height
    }
  }
}
</script>

<style lang="less">
.rect-graph{
  position: absolute;
}
</style>
