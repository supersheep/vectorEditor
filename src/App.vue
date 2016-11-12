<template lang="jade">
#app
  toolbar
  paper
  setting
  .dragging {{dragging}}
  .selected {{selected}}
</template>

<script>
import Toolbar from './components/Toolbar'
import Paper from './components/Paper'
import Setting from './components/Setting'
import store from './store'

export default {
  store,
  name: 'app',
  components: {
    Toolbar,
    Setting,
    Paper
  },
  computed: {
    dragging () {
      return this.$store.getters
        .draggingGraphs
        .map(g => g.id)
        .join(',')
    },
    selected () {
      return this.$store.getters
        .selectedGraphs
        .map(g => g.id)
        .join(',')
    }
  }
}
</script>

<style lang="less">
  body {
    background-color: #f1f1f1;
  }

  #app{
    overflow: hidden;
    .selected, .dragging{
      clear: both;
    }
  }
</style>
