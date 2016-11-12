<template lang="jade">
#app
  toolbar
  paper
  .selected {{selected}}
</template>

<script>
import Toolbar from './components/Toolbar'
import Paper from './components/Paper'
import store from './store'

export default {
  store,
  name: 'app',
  components: {
    Toolbar,
    Paper
  },
  computed: {
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
    .selected{
      clear: both;
    }
  }
</style>
