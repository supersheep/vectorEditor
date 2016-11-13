var mousedown = false
var resizing = false
var startPoint = null
var rect = null
export default {
  mousedown (e, { dispatch }) {
    mousedown = true
    startPoint = {
      x: e.clientX,
      y: e.clientY
    }
  },
  mousemove (e, { dispatch, state }) {
    if (mousedown) {
      if (!resizing) {
        dispatch('addGraph', {
          type: 'rect',
          data: {
            width: e.clientX - startPoint.x,
            height: e.clientY - startPoint.y
          },
          position: {
            x: startPoint.x - state.paperPosition.x,
            y: startPoint.y - state.paperPosition.y
          }
        }).then((graph) => {
          rect = graph
        })
        resizing = true
      } else {
        if (rect) {
          dispatch('resizeDrawRect', {
            rect: rect,
            size: {
              width: e.clientX - startPoint.x,
              height: e.clientY - startPoint.y
            }
          })
        }
      }
    }
  },
  mouseup (e, { dispatch }) {
    if (mousedown) {
      rect = null
      startPoint = null
      resizing = false
      mousedown = false
    }
  }
}
