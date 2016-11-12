<template lang="jade">
  input.image-picker(type='file',accept="image/*")
</template>

<script>
  export default {
    mounted () {
      let FileReader = window.FileReader
      let reader = new FileReader()
      reader.onload = (e) => {
        let result = e.target.result
        console.log('onload')
        this.$emit('change', result)
      }
      this.$el.onchange = (e) => {
        reader.readAsDataURL(this.$el.files[0])
      }
    }
  }
</script>

<style lang="less">
  
</style>
