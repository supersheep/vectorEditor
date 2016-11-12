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
      if (e.altKey) {
        this.$store.dispatch('addGraph', this.graph)
          .then((newGraph) => {
            this.$store.dispatch('startDrag', {
              event: e,
              graph: newGraph
            })
          })
      } else {
        this.$store.dispatch('startDrag', {
          event: e,
          graph: this.graph
        })
      }
    },
    mouseup (e) {
      this.$store.dispatch('stopDragAll')
    },
    select (e) {
      let { getters } = this.$store
      let selected = getters.selectedGraphs
      let firstSelected = selected[0]
      if (selected.length === 0) {
        this.$store.dispatch('selectGraph', this.graph)
      } else if (firstSelected !== this.graph) {
        if (e.shiftKey) {
          this.$store.dispatch('toggleGraph', this.graph)
        } else {
          if (selected.length === 1) {
            this.$store.dispatch('unselectGraph', firstSelected)
          }
          this.$store.dispatch('selectGraph', this.graph)
        }
      }
    }
  }
}
</script>




// graph
//
