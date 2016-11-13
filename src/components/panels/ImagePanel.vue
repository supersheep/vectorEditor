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
import ClassInput from './ClassInput'

export default {
  components: {
    ClassInput
  },
  props: {
    graph: Object
  }
}
</script>

<style lang="less">
.image-panel{
}
</style>
