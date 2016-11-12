import Vuex from 'vuex'
import Vue from 'vue'
import uuid from 'node-uuid'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)
export default new Vuex.Store({
  plugins: [createLogger()],
  state: {
    shiftKey: false,
    commandKey: false,
    paperPosition: null,
    graphs: [{
      id: uuid.v4(),
      type: 'circle',
      data: {
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
      type: 'rect',
      data: {
        width: 200,
        height: 100
      },
      selected: false,
      dragging: false,
      position: {
        x: 50,
        y: 50
      }
    }, {
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
      console.log('graph', event.clientX - event.target.offsetLeft - state.paperPosition.x)
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
    MOVE_GRAPH (state, config) {
      let { graph, position } = config
      graph.position = {
        x: position.x - state.paperPosition.x - graph.startOffset.x,
        y: position.y - state.paperPosition.y - graph.startOffset.y
      }
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
      if (!state.commandKey) {
        commit('UNSELECT_ALL')
      }
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
    /* move */
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
      commit('ADD_GRAPH', graph)
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
    }
  }
})
