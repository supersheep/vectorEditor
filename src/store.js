import Vuex from 'vuex'
import Vue from 'vue'
import uuid from 'node-uuid'
import createLogger from 'vuex/dist/logger'
import _ from 'lodash'

Vue.use(Vuex)
export default new Vuex.Store({
  plugins: [createLogger()],
  state: {
    shiftKey: false,
    commandKey: false,
    paperPosition: null,
    currentInput: null,
    currentTool: 'polygon',
    moving: false,
    graphs: [{
      id: uuid.v4(),
      type: 'image',
      position: {
        x: 20,
        y: 20
      },
      selected: false,
      dragging: false,
      data: {
        width: 200,
        height: 200,
        url: 'http://ww1.sinaimg.cn/mw690/6620fb47gw1f9imdg5baij20np0hswh9.jpg'
      }
    }, {
      id: uuid.v4(),
      type: 'circle',
      data: {
        opacity: 0.6,
        fillColor: 'rgb(93, 235, 120)',
        radius: 30
      },
      selected: false,
      dragging: false,
      position: {
        x: 50,
        y: 50
      }
    }, {
      id: uuid.v4(),
      type: 'polygon',
      data: {
        fillColor: 'rgb(235, 93, 174)',
        points: [
          {x: 0, y: 0},
          {x: 10, y: 150},
          {x: 300, y: 200},
          {x: 150, y: 10}
        ]
      },
      selected: false,
      dragging: false,
      position: {
        x: 50,
        y: 50
      }
    }, {
      id: uuid.v4(),
      type: 'rect',
      data: {
        opacity: 0.6,
        fillColor: 'rgb(235, 93, 174)',
        width: 200,
        height: 100
      },
      selected: false,
      dragging: false,
      position: {
        x: 50,
        y: 50
      }
    }]
  },
  getters: {
    selectedGraphs (state) {
      return state.graphs.filter(g => g.selected)
    },
    draggingGraphs (state) {
      return state.graphs.filter(g => g.dragging)
    }
  },
  mutations: {
    SET_CURRENT_TOOL (state, tool) {
      state.currentTool = tool
    },
    SET_CURRENT_INPUT (state, input) {
      state.currentInput = input
    },
    RESIZE_CIRCLE (state, data) {
      if (data.radius > 0) {
        data.circle.data.radius = data.radius
      }
    },
    RESIZE_DRAW_RECT (state, data) {
      let { width, height } = data.size
      if (width > 0 && height > 0) {
        data.rect.data.width = width
        data.rect.data.height = height
      }
    },
    DELETE_SELECTED (state) {
      state.graphs = state.graphs.filter((g) => !g.selected)
    },
    SET_PAPER_POSITION (state, position) {
      state.paperPosition = position
    },
    PRESS_SHIFT_KEY (state) {
      state.shiftKey = true
    },
    RELEASE_SHIFT_KEY (state) {
      state.shiftKey = false
    },
    PRESS_COMMAND_KEY (state) {
      state.commandKey = true
    },
    RELEASE_COMMAND_KEY (state) {
      state.commandKey = false
    },
    START_DRAG_GRAPH (state, config) {
      let { graph, event } = config

      console.log('target')
      graph.startOffset = {
        x: event.clientX - graph.position.x - state.paperPosition.x,
        y: event.clientY - graph.position.y - state.paperPosition.y
      }
      graph.dragging = true
    },
    STOP_DRAG_ALL (state) {
      state.graphs.forEach((g) => {
        g.dragging = false
        g.startOffset = null
      })
    },
    STOP_DRAG_GRAPH (state, graph) {
      graph.dragging = false
      graph.startOffset = null
    },
    SELECT_GRAPH (state, graph) {
      graph && (graph.selected = true)
    },
    UNSELECT_GRAPH (state, graph) {
      graph && (graph.selected = false)
    },
    UNSELECT_ALL (state, id) {
      state.graphs.forEach((g) => {
        g.selected = false
      })
    },
    SET_MOVING (state, moving) {
      state.moving = moving
    },
    MOVE_GRAPH (state, config) {
      let { graph, position } = config
      console.log('moveX', position.x - state.paperPosition.x - graph.startOffset.x)
      graph.position = {
        x: position.x - state.paperPosition.x - graph.startOffset.x,
        y: position.y - state.paperPosition.y - graph.startOffset.y
      }
    },
    SELECT_BY_TYPE (state, type) {
      state.graphs.forEach((g) => {
        if (g.data.class === type) {
          g.selected = true
        } else {
          g.selected = false
        }
      })
    },
    ADD_GRAPH (state, graph) {
      state.graphs.push(graph)
    }
  },
  actions: {
    setPaperPosition ({ commit }, position) {
      commit('SET_PAPER_POSITION', position)
    },
    /* drag */
    startDrag ({ commit }, config) {
      commit('START_DRAG_GRAPH', config)
    },
    stopDrag ({ commit }, graph) {
      commit('STOP_DRAG_GRAPH', graph)
    },
    stopDragAll ({ dispatch, commit, state }) {
      commit('STOP_DRAG_ALL')
    },
    dragSelected ({ commit, state }) {
      commit('DRAG_SELECTED')
    },
    /* select */
    selectGraph ({ commit, state }, graph) {
      commit('SELECT_GRAPH', graph)
    },
    unselectGraph ({ commit }, graph) {
      commit('UNSELECT_GRAPH', graph)
    },
    toggleGraph ({ commit, state }, graph) {
      if (graph.selected) {
        commit('UNSELECT_GRAPH', graph)
      } else {
        commit('SELECT_GRAPH', graph)
      }
    },
    unselectAll ({ commit }) {
      commit('UNSELECT_ALL')
    },
    /* circle */
    resizeDrawCircle ({ commit }, data) {
      commit('RESIZE_CIRCLE', data)
    },
    resizeDrawRect ({ commit }, data) {
      commit('RESIZE_DRAW_RECT', data)
    },
    /* move */
    setMoving ({ commit }, moving) {
      commit('SET_MOVING', moving)
    },
    moveDraggingGraphs ({ commit, state }, point) {
      state.graphs.filter(g => g.dragging)
        .forEach((g) => {
          commit('MOVE_GRAPH', {
            graph: g,
            position: point
          })
        })
    },
    addGraph ({ commit }, graph) {
      let newGraph = _.cloneDeep(graph)
      newGraph.id = uuid.v4()
      newGraph.selected = false
      newGraph.dragging = false

      commit('ADD_GRAPH', newGraph)
      return new window.Promise((resolve) => {
        resolve(newGraph)
      })
    },
    /* meta keys */
    pressCommandKey ({ commit }) {
      commit('PRESS_COMMAND_KEY')
    },
    releaseCommandKey ({ commit }) {
      commit('RELEASE_COMMAND_KEY')
    },
    pressShiftKey ({ commit }) {
      commit('PRESS_SHIFT_KEY')
    },
    releaseShiftKey ({ commit }) {
      commit('RELEASE_SHIFT_KEY')
    },
    /* polygon */
    setCurrentTool ({ commit }, tool) {
      commit('SET_CURRENT_TOOL', tool)
    },
    /* select */
    selectSameType ({ commit }, graph) {
      if (graph.data.class) {
        commit('SELECT_BY_TYPE', graph.data.class)
      }
    },
    deleteSelected ({ commit, state }) {
      if (!state.currentInput) {
        commit('DELETE_SELECTED')
      }
    },
    /* pannel */
    setCurrentInput ({ commit }, input) {
      commit('SET_CURRENT_INPUT', input)
    }
  }
})
