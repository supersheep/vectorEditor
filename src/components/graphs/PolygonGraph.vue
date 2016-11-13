<template lang="jade">
  svg.polygon-graph(:width='width',:height='height',:style='style')
    line(v-show='points.length == 2',
      stroke-width='2',
      stroke='black',
      :x1='points[0].x',
      :y1='points[0].y',
      :x2='points[1].x',
      :y2='points[1].y')
    polygon(v-show='points.length > 2',:points="polygonPoints",:style='polygonStyle')*/
</template>

<script>
import props from './props'
export default {
  props: props,
  computed: {
    points () {
      console.log('points', this.data.points)
      return this.data.points
    },
    polygonPoints () {
      console.log
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
  overflow: visible;
}
</style>
