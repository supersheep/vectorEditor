<template lang="jade">
  svg.polygon-graph(:width='width',:height='height',:style='style')
    polygon(:points="points",:style='polygonStyle')
</template>

<script>
import props from './props'
export default {
  props: props,
  computed: {
    points () {
      return this.data.points.map((p) => [p.x, p.y].join(',')).join(' ')
    },
    width () {
      return Math.max.apply(null, this.data.points.map(p => p.x)) - Math.min.apply(null, this.data.points.map(p => p.x))
    },
    height () {
      return Math.max.apply(null, this.data.points.map(p => p.y)) - Math.min.apply(null, this.data.points.map(p => p.y))
    },
    style () {
      return {
        left: this.position.x + 'px',
        top: this.position.y + 'px'
      }
    },
    polygonStyle () {
      return {
        fill: this.data.fillColor,
        opacity: this.data.opacity
      }
    }
  }
}
</script>

<style lang="less">
.polygon-graph{
  position: absolute;
}
</style>
