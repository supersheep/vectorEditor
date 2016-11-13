var startPoint = null
var polygon = null

export default {
  click (e, { dispatch, state }) {
    const convert = (point) => {
      return {
        x: point.x - state.paperPosition.x,
        y: point.y - state.paperPosition.y
      }
    }

    const closeToStartPoint = (point) => {
      let distance = Math.sqrt(Math.pow(point.y - startPoint.y, 2) + Math.pow(point.x - startPoint.x, 2))
      return distance < 5
    }

    let newPoint = convert({
      x: e.clientX,
      y: e.clientY
    })

    console.log('newPoint', newPoint)

    if (!startPoint) {
      startPoint = newPoint
    } else if (!polygon) {
      console.log('draw line')
      dispatch('addGraph', {
        type: 'polygon',
        data: {
          points: [
            {x: 0, y: 0},
            {x: newPoint.x - startPoint.x, y: newPoint.y - startPoint.y}
          ]
        },
        position: startPoint
      }).then((graph) => {
        polygon = graph
      })
    } else {
      if (closeToStartPoint(newPoint)) {
        startPoint = null
        polygon = null
      } else {
        polygon.data.points.push({
          x: newPoint.x - startPoint.x,
          y: newPoint.y - startPoint.y
        })
      }
    }
  }
}
