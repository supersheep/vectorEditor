var mousedown = false
var resizing = false
var startPoint = null
var circle = null
export default {
  mousedown (e, { dispatch }) {
    mousedown = true
    startPoint = {
      x: e.clientX,
      y: e.clientY
    }
  },
  mousemove (e, { dispatch }) {
    if (mousedown) {
      if (!resizing) {
        dispatch('addGraph', {
          type: 'circle',
          data: {
            radius: e.clientY - startPoint.y
          },
          position: startPoint
        }).then((graph) => {
          circle = graph
        })
        resizing = true
      } else {
        if (circle) {
          dispatch('resizeDrawCircle', {
            circle: circle,
            radius: e.clientY - startPoint.y
          })
        }
      }
    }
  },
  mouseup (e, { dispatch }) {
    if (mousedown) {
      circle = null
      startPoint = null
      resizing = false
      mousedown = false
    }
  }
}
