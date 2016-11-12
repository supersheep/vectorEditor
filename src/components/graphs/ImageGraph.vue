<template lang="jade">
  img.image-graph(:style='style',:src='data.url',:width='data.width',:height='data.height')
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
    }
  }
}
</script>

<style lang="less">
.image-graph{
  position: absolute;
}
</style>
