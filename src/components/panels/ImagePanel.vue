<template lang="jade">
  .image-panel
    .row
      .label width
      input.input(v-model='graph.data.width')
    .row
      .label height
      input.input(v-model='graph.data.height')
</template>

<script>
export default {
  props: {
    graph: Object
  }
}
</script>

<style lang="less">
.image-panel{
}
</style>
