<template lang="jade">
  .rect-panel
    .row
      .label width
      input.input(type='range',v-model='graph.data.width')
    .row
      .label height
      input.input(type='range',v-model='graph.data.height')
</template>

<script>
export default {
  props: {
    graph: Object
  },
  mounted () {
    console.log('graph', this.graph)
  }
}
</script>

<style lang="less">
.rect-panel{
}
</style>
