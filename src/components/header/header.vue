<template>
    <div class="header">
      <div class="content-wrapper">
        <div class="avatar">
          <img v-if="seller_data.data" :src='seller_data.data.avatar' width="64" height="64">
        </div>
        <div class="content" v-if="seller_data.data">
          <div class="title">
            <span class="brand"><img src="./brand.png" width="30" hight="18"/></span>
            <span class="name">{{seller_data.data.name}}</span>
          </div>
          <div class="description">
            <span class='icon'></span>
            <span class='description'>{{seller_data.data.description}}/{{seller_data.data.deliveryTime}}分钟送达</span>
          </div>
          <div class="support" v-if="seller_data.data">
            <span><div class="icon" :class="classMap[0]"></div></span>
            <span class="text">{{seller_data.data.supports[0].description}}</span>
          </div>
        </div>
      </div>
      <div v-if="seller_data.data" class="support-count" @click="showDetail">
        <span class="count">{{seller_data.data.supports.length}}个</span>
        <!--        <img class="icon-keyboard-arrow-right">-->
        <i class="icon-keyboard_arrow_right"></i>
      </div>
      <div class="bulletin-wrapper" v-if="seller_data.data">
        <span class="bulletin-title"></span>
        <span class="bulletin-text">{{seller_data.data.bulletin}}</span>
        <span class="icon-keyboard_arrow_right"></span>
      </div>
      <div class="background"></div>
      <div v-show="detailShow" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main" v-if="seller_data.data">
            <h1 class="name">{{seller_data.data.name}}</h1>
            <star :size="48" :score="seller_data.data.score"></star>
            <div class="title">
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul class="supports">
              <li class="support-item" v-for="(item,index) in seller_data.data.supports" :key="index">
                <span class="icon" :class="classMap[item.type]"></span>
                <span class="text">{{item.description}}</span>
              </li>
            </ul>
          </div>
          <div class="detail-close">
            <div class="icon-close" @click="closeDetail">
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
import 'src/components/common/stylus/icon.styl'
import star from 'src/components/star/star.vue'
export default {
  props: {
    seller_data: {
      type: Object
    }
  },
  data() {
    return {
      detailShow: false,
      result: false,
      message: ''
    }
  },
  methods: {
    showDetail() {
      this.detailShow = true
    },
    closeDetail() {
      this.detailShow = false
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  components: {
    star
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.header
  position: relative
  color: #fff
  .content-wrapper
    background: rgba(0,0,0,0.2)
    padding:24px 12px 18px 24px
    font-size: 0
    .avatar
      display: inline-block
    .content
      color: #FFFFFF
      margin-left: 16px
      display: inline-block
      font-size: 14px
      .title
        height: 18px
        margin: 2px 0 8px 0
        .name
          font-size: 16px
          margin-left: 6px
          line-height: 18px
          font-weight: bold
        .brand
          display: inline-block
          vertical-align: text-top
          width: 30px
          height: 18px
          background-size: 30px 18px
      .description
        font-size: 12px
        line-height: 12px
        margin-bottom: 10px
      .support
        font-size: 12px
        .decrease
            height: 16px
            width: 16px
            display: inline-block
            background: url("./decrease.png")
            background-repeat: no-repeat
            background-size: 16px 16px
            vertical-align: text-bottom
          .text
            font-size: 12px
  .bulletin-wrapper
    position: relative
    height: 28px
    line-height: 28px
    padding: 0 22px 0 12px
    background-color: rgba(0,0,0,0.5)
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
    .bulletin-title
      display: inline-block
      width: 22px
      height: 12px
      margin-top: 8px
      background: url("./bulletin.png")
      background-size: 22px 12px
      background-repeat: no-repeat
      padding: 2px
      vertical-align: top
    .bulletin-text
      font-size: 12px
      margin-left: 8px
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      vertical-align: top
    .icon-keyboard_arrow_right
      position: absolute
      font-size: 10px
      right: 12px
      top: 8px
  .support-count
    color: #FFFFFF
    font-size: 10px
    position: absolute
    right: 12px
    bottom: 32px
    padding: 0 8px
    height: 24px
    line-height: 24px
    border-radius: 14px
    background: rgba(0,0,0, 0.2)
    text-align: center
    .count
      font-size: 10px
    .icon-keyboard-arrow-right
      width: 12px
      height: 12px
      line-height: 24px
  .background
    position: absolute
    left: 0
    top: 0
    z-index: -1
    width: 100%
    height: 100%
    filter: blur(10px)
    background: url("./avatar.png")
    background-repeat: no-repeat
    background-size: 100% 100%
  .detail
    position: fixed
    top: 0
    left: 0
    z-index: 100
    width: 100%
    height: 100%
    background: rgba(0, 0, 0, 0.7)
    .detail-wrapper
      top: 30px
      position: relative
      width: 100%
      height: 100%
      font-size: 10px
      .detail-main
        font-size: 10px
        .title
          display: flex
          width: 80%
          margin: 30px auto 24px auto
          .text
            font-size: 14px
            padding: 0 12px
          .line
            flex: 1
            position: relative
            top: -6px
            border-bottom: 2px solid rgba(255,255,255,0.2)
        .supports
            width: 80%
            margin: 0 auto
          .support-item
            padding: 0 12px
            margin-bottom: 12px
            font-size: 0
            .text
              font-size: 10px
            .icon
              width: 16px
              height: 16px
              vertical-align: top
              margin-right: 6px
              background-size: 16px 16px
            .decrease
              display: inline-block
              background: url("./decrease.png")
              background-size: 16px 16px
            .discount
              width: 16px
              display: inline-block
              background: url("./discount.png")
              background-size: 16px 16px
            .special
              display: inline-block
              background: url("./special.png")
              background-size: 16px 16px
            .invoice
              display: inline-block
              background: url("./invoice.png")
              background-size: 16px 16px
            .guarantee
              display: inline-block
              background: url("./guarantee.png")
              background-size: 16px 16px
        .name
          text-align: center
      .detail-close
        font-size: 20px
        position: absolute
        width: 100%
        bottom: 20%
        .icon-close
          width: 20%
          text-align: center
          margin: 30px auto 24px auto
</style>
