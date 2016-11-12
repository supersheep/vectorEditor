<template lang="jade">
.paper(
    @click='paperClick',
    @mousemove='mousemove',
    @mouseup='mouseup')
  graph(v-for='graph in graphs', :graph='graph')
</template>

<script>
import Graph from './Graph'
export default {
  components: {
    Graph
  },
  mounted () {
    let { dispatch } = this.$store
    dispatch('setPaperPosition', {
      x: this.$el.offsetLeft,
      y: this.$el.offsetTop
    })
    window.addEventListener('keydown', (e) => {
      if (e.shiftKey) {
        dispatch('pressShiftKey')
      }
      if (e.metaKey) {
        dispatch('pressCommandKey')
      }
      if (e.key === 'Backspace') {
        dispatch('deleteSelected')
      }
    })
    window.addEventListener('keyup', (e) => {
      if (e.key === 'Shift') {
        dispatch('releaseShiftKey')
      }
      if (e.key === 'Meta') {
        dispatch('releaseCommandKey')
      }
    })
  },
  computed: {
    graphs () {
      return this.$store.state.graphs
    }
  },
  methods: {
    paperClick (e) {
      if (e.target === this.$el) {
        this.$store.dispatch('unselectAll')
      }
    },
    mousemove (e) {
      let { draggingGraphs, selectedGraphs } = this.$store.getters
      if (draggingGraphs.length) {
        if (selectedGraphs.length > draggingGraphs.length) {
          selectedGraphs.forEach((g) => {
            this.$store.dispatch('startDrag', {
              graph: g,
              event: e
            })
          })
        } else {
          this.$store.dispatch('moveDraggingGraphs', {
            x: e.clientX,
            y: e.clientY
          })
        }
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
  overflow: hidden;
  width: 500px;
  height: 400px;
  background-color: #fff;
  float: left;
  position: relative;
}
</style>
