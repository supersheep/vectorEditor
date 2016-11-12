<template lang="jade">
  .circle-panel
    .row
      .label radius
      input.input(type='range',v-model='graph.data.radius')
</template>

<script>
export default {
  props: {
    graph: Object
  }
}
</script>

<style lang="less">
.circle-panel{}
</style>
