<template lang="jade">
.toolbar
  .item(@click='startSelect') 选择
  .item 添加图片
    image-picker(@change='addImage')
  .item(@click='startDrawRect') 矩形
  .item(@click='startDrawCircle') 圆
  .item(@click='startDrawPolygon') 多边形
</template>

<script>
import ImagePicker from './ImagePicker'

export default {
  components: {
    ImagePicker
  },
  methods: {
    startSelect () {
      this.$store.dispatch('setCurrentTool', 'select')
    },
    startDrawCircle () {
      this.$store.dispatch('setCurrentTool', 'circle')
    },
    startDrawRect () {
      this.$store.dispatch('setCurrentTool', 'rect')
    },
    startDrawPolygon () {
      this.$store.dispatch('setCurrentTool', 'polygon')
    },
    addImage (url) {
      this.$store.dispatch('addGraph', {
        type: 'image',
        data: {
          url: url,
          width: 200,
          height: 200
        }
      })
    }
  }
}
</script>

<style lang="less">
.toolbar{
  width: 100px;
  height: 200px;
  float: left;
  .item {
    cursor: pointer;
  }
}
</style>
