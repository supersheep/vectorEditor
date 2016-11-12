<template lang="jade">
  .circle-panel
    class-input(v-model='graph.data.type')
    .row
      .label radius
      input.input(type='range',v-model='graph.data.radius')
</template>

<script>
import ClassInput from './ClassInput'

export default {
  props: {
    graph: Object
  },
  components: {
    ClassInput
  },
  methods: {
    focus () {
      console.log('focus')
    },
    blur () {
      console.log('blur')
    }
  }
}
</script>

<style lang="less">
.circle-panel{}
</style>
