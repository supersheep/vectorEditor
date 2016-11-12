import Vuex from 'vuex'
import Vue from 'vue'
import uuid from 'node-uuid'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)
export default new Vuex.Store({
  plugins: [createLogger()],
  state: {
    startPoint: null,
    shiftKey: false,
    commandKey: false,
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
    START_DRAG_GRAPH (state, data) {
      data.graph.dragging = true
      data.graph.startPoint = data.position
    },
    STOP_DRAG_ALL (state) {
      state.graphs.forEach((g) => {
        g.dragging = false
        g.startPoint = null
      })
    },
    STOP_DRAG_GRAPH (state, graph) {
      graph.dragging = false
      graph.startPoint = null
    },
    SELECT_GRAPH (state, id) {
      let target = state.graphs.filter(g => g.id === id)[0]
      target && (target.selected = true)
    },
    UNSELECT_GRAPH (state, id) {
      let target = state.graphs.filter(g => g.id === id)[0]
      target && (target.selected = false)
    },
    UNSELECT_ALL (state, id) {
      state.graphs.forEach((g) => {
        g.selected = false
      })
    },
    SET_START_POINT (state, point) {
      state.startPoint = point
    },
    MOVE_GRAPH (state, graph) {
      if (!state.startPoint) { return }
      let target = state.graphs.filter(g => g.id === graph.id)[0]

      target.position = {
        x: target.position.x + (graph.position.x - state.startPoint.x),
        y: target.position.y + (graph.position.y - state.startPoint.y)
      }
      console.log('delta', (graph.position.x - state.startPoint.x), (graph.position.y - state.startPoint.y))
    },
    ADD_GRAPH (state, graph) {
      state.graphs.push(graph)
    }
  },
  actions: {
    /* drag */
    startDrag ({ commit }, data) {
      commit('START_DRAG_GRAPH', data)
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
    unselectAll ({ commit }) {
      commit('UNSELECT_ALL')
    },
    /* move */
    moveDraggingGraphs ({ commit, state }, point) {
      state.graphs.filter(g => g.dragging)
        .forEach((g) => {
          console.log('move position', point)
          commit('MOVE_GRAPH', {
            graph: g,
            position: point
          })
        })
    },
    setStartPoint ({ commit }, point) {
      console.log('point', point)
      commit('SET_START_POINT', point)
    },
    addGraph ({ commit }, graph) {
      commit('ADD_GRAPH', graph)
    }
  }
})
