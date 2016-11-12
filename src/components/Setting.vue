<template lang="jade">
.setting(v-show='selected')
  .type {{type}}
  component(:is='compName',:graph='selected')
</template>

<script>
import CirclePanel from './panels/CirclePanel'
import RectPanel from './panels/RectPanel'
import ImagePanel from './panels/ImagePanel'

export default {
  components: {
    CirclePanel,
    RectPanel,
    ImagePanel
  },
  computed: {
    type () {
      if (this.selected) {
        return this.selected.type
      } else {
        return ''
      }
    },
    compName () {
      if (this.selected) {
        console.log(this.selected.type + '-panel')
        return this.selected.type + '-panel'
      }
      return ''
    },
    selected () {
      let { selectedGraphs } = this.$store.getters
      if (selectedGraphs.length === 0) {
        return null
      } else if (selectedGraphs.length === 1) {
        return selectedGraphs[0]
      }
      return {
        type: 'group',
        graph: selectedGraphs
      }
    }
  }
}
</script>

<style>
.setting {
  float: left;
  width: 200px;
  height: 300px;
  background-color: #999;
}
</style>
