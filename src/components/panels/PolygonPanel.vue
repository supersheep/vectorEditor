<template lang="jade">
  .polygon-panel
    class-input(v-model='graph.data.type')
</template>

<script>
import ClassInput from './ClassInput'

export default {
  props: {
    graph: Object
  },
  components: {
    ClassInput
  }
}
</script>

<style lang="less">
.polygon-panel{}
</style>
