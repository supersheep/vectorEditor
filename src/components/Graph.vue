<template lang="jade">
  component(:is='graph.type + "-graph"',
    :id='graph.id',
    :data='graph.data',
    :position='graph.position',
    :selected='graph.selected',
    @click.native='select',
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
        event: e,
        graph: this.graph
      })
    },
    mouseup (e) {
      this.$store.dispatch('stopDragAll')
    },
    select () {
      if (this.$store.state.commandKey) {
        this.$store.dispatch('toggleGraph', this.graph)
      } else {
        console.log('selectGraph')
        this.$store.dispatch('selectGraph', this.graph)
      }
    }
  }
}
</script>




// graph
//
