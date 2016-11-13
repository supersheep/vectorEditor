export default {
  mouseup (e, { dispatch }) {
    dispatch('stopDragAll')
  },
  click (e, { dispatch }) {
    console.log('yoyoyoo')
    if (e.target === this.$el) {
      dispatch('unselectAll')
    }
  },
  mousemove (e, { dispatch, getters }) {
    let { draggingGraphs, selectedGraphs } = getters
    if (draggingGraphs.length) {
      if (selectedGraphs.length > draggingGraphs.length) {
        selectedGraphs.forEach((g) => {
          dispatch('startDrag', {
            graph: g,
            event: e
          })
        })
      } else {
        dispatch('moveDraggingGraphs', {
          x: e.clientX,
          y: e.clientY
        })
      }
    }
  }
}
