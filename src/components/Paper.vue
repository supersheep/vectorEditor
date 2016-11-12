<template lang="jade">
.paper(@mousemove='mousemove',@mouseup='mouseup')
  graph(v-for='graph in graphs', :graph='graph')
</template>

<script>
import Graph from './Graph'
export default {
  components: {
    Graph
  },
  computed: {
    graphs () {
      return this.$store.state.graphs
    }
  },
  methods: {
    mousemove (e) {
      if (this.$store.getters.draggingGraphs.length) {
        console.log('paper mousemove', this.$store.getters.draggingGraphs.length)
      }
    },
    mouseup () {
      this.$store.dispatch('stopDragAll')
    }
  }
}
</script>

<style lang="less">
.paper{
  width: 500px;
  height: 400px;
  background-color: #fff;
  float: left;
  position: relative;
}
</style>
