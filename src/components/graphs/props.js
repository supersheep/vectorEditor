export default {
  position: Object,
  data: Object,
  moveOffset: {
    type: Object
  },
  startPoint: {
    type: Object,
    default: () => {
      return null
    }
  },
  dragging: {
    type: Boolean,
    default: false
  },
  selected: {
    type: Boolean,
    default: false
  },
  id: {
    type: String,
    required: true
  }
}
