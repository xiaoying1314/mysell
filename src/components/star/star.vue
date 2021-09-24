<template>
  <div class="star" :class="starType">
    <span v-for="(itemClass,index) in itemClasses" :key="index" v-bind:class="itemClass"  class="star-item"></span>
  </div>
</template>

<script type="text/ecmascript-6">
const LENGTH = 5
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'

export default {
  name: 'star',
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    starType() {
      return 'star-' + this.size
    },
    itemClasses() {
      let result = []
      let hasDecimal = this.score % 1 !== 0
      let score = Math.floor(this.score * 2) / 2
      let integer = Math.floor(score)
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON)
      }
      if (hasDecimal) {
        result.push(CLS_HALF)
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF)
      }
      return result
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .star
    display: flex
    align-items: center
    justify-content: center
    .star-item
      text-align: center
      background-repeat: no-repeat
    &.star-48
      .star-item
        width: 20px
        height: 20px
        margin-right: 22px
        background-size: 20px 20px
        &:last-child
          margin-right: 0
        &.on
          background: url("star48_on@2x.png")
          background-size: 20px 20px
        &.half
          background: url("star48_off@2x.png")
          background-size: 20px 20px
        &.off
          background: url("star48_off@2x.png")
          background-size: 20px 20px
    &.star-36
      .star-item
        margin-right: 6px
        background-size: 15px 15px
        width: 15px
        height: 15px
        &:last-child
          margin-right: 0
        &.on
          background: url("star36_on@2x.png")
          background-size: 15px 15px
        &.half
          background: url("star36_half@2x.png")
          background-size: 15px 15px
        &.off
          background: url("star36_off@2x.png")
          backgound-size: 15px 15px
    &.star-24
      .star-item
        margin-right: 3px
        width: 10px
        height: 10px
        &:last-child
          margin-right: 0
        &.on
          background: url("star24_on@2x.png")
          background-size: 10px 10px
        &.half
          background: url("star24_half@2x.png")
          background-size: 10px 10px
        &.off
          background: url("star24_off@2x.png")
          background-size: 10px 10px
</style>
