<template lang="jade">
  .rect-panel
    .row
      .label 类别
      input.input(v-model='graph.data.class')
    .row
      .label width
      input.input(type='range',v-model='graph.data.width')
    .row
      .label height
      input.input(type='range',v-model='graph.data.height')
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
.rect-panel{
}
</style>
