<template lang="jade">
.row
  .label 类别
  input.input(@keyup='change',:value='value',@focus='focus',@blur='blur')
</template>

<script>
export default {
  props: {
    value: String
  },
  methods: {
    change (e) {
      console.log('change', e.target.value)
      this.$emit('input', e.target.value)
    },
    focus (e) {
      this.$store.dispatch('setCurrentInput', e.target)
    },
    blur () {
      this.$store.dispatch('setCurrentInput', null)
    }
  }
}
</script>
