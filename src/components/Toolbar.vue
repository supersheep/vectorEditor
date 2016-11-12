<template lang="jade">
.toolbar
  .item 添加图片
    image-picker(@change='addImage')
  .item 矩形
  .item 圆
</template>

<script>
import ImagePicker from './ImagePicker'

export default {
  components: {
    ImagePicker
  },
  methods: {
    addImage (url) {
      console.log('add Image')
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
}
</style>
