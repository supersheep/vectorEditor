<template lang="jade">
  component(:is='graph.type + "-graph"',
    :id='graph.id',
    :data='graph.data',
    :position='graph.position',
    :selected='graph.selected',
    @click='select',
    @mousedown.native.prevent='mousedown',
    @mouseup.native='mouseup')
</template>
<script>
import ImageGraph from './graphs/ImageGraph'
import CircleGraph from './graphs/CircleGraph'
import RectGraph from './graphs/RectGraph'

export default {
  props: {
    graph: Object
  },
  components: {
    ImageGraph,
    CircleGraph,
    RectGraph
  },
  methods: {
    mousedown (e) {
      this.$store.dispatch('startDrag', {
        graph: this.graph,
        position: {
          x: e.clientX,
          y: e.clientY
        }
      })
    },
    mouseup (e) {
      this.$store.dispatch('stopDragAll')
    },
    select () {
      this.$store.dispatch('selectGraph', this.graph)
    }
  }
}
</script>




// graph
//
