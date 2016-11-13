<template lang="jade">
.paper(
    @click='click',
    @mousedown='mousedown',
    @mousemove='mousemove',
    @mouseup='mouseup')
  graph(v-for='graph in graphs', :graph='graph')
</template>

<script>
import Graph from './Graph'

import CircleTool from './tools/Circle'
import SelectTool from './tools/Select'

let actions = {
  circle: CircleTool,
  select: SelectTool
}

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
      if (e.key === 'v') {
        dispatch('setCurrentTool', 'select')
      }

      if (e.key === 'o') {
        dispatch('setCurrentTool', 'circle')
      }

      if (e.key === 'r') {
        dispatch('setCurrentTool', 'rect')
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
    actFor (event, e) {
      let tool = this.$store.state.currentTool
      let toolConfig = actions[tool]
      let handler = toolConfig && toolConfig[event]
      if (handler) {
        handler.bind(this)(e, this.$store)
      }
    },
    click (e) {
      this.actFor('click', e)
    },
    mousedown (e) {
      this.actFor('mousedown', e)
    },
    mousemove (e) {
      this.actFor('mousemove', e)
    },
    mouseup (e) {
      this.actFor('mouseup', e)
    }
  }
}
</script>

<style lang="less">
.paper{
  overflow: hidden;
  width: 1000px;
  height: 600px;
  background-color: #fff;
  float: left;
  position: relative;
  user-select: none;
}
</style>
