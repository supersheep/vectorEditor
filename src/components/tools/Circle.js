export default {
  mousedown (e, { dispatch }) {
    dispatch('startDrawCircle', {
      point: {x: e.offsetLeft, y: e.offsetTop}
    })
  },
  mousemove (e, { dispatch }) {
    dispatch('resizeDrawCircle', {
      point: {x: e.offsetLeft, y: e.offsetTop}
    })
  },
  mouseup (e, { dispatch }) {
    dispatch('finishResizeCircle', {
      point: {x: e.offsetLeft, y: e.offsetTop}
    })
  }
}
