<template>
  <div class="seller">
    <cube-scroll-nav>
      <div class="seller-wrapper">
        <div class="content">
          <div class="overview" v-if="seller_data.data">
            <h1 class="title">{{seller_data.data.name}}</h1>
            <div class="desc">
              <star :size="36" :score="seller_data.data.score"></star>
              <span class="text">({{seller_data.data.ratingCount}})</span>
              <span class="text">月售{{seller_data.data.sellCount}}单</span>
            </div>
            <ul class="remark">
              <li class="block">
                <h2>起送价</h2>
                <div class="content">
                  <span class="stress">{{seller_data.data.minPrice}}</span>元
                </div>
              </li>
              <li class="block">
                <h2>商家配送</h2>
                <div class="content">
                  <span class="stress">{{seller_data.data.deliveryPrice}}</span>元
                </div>
              </li>
              <li class="block">
                <h2>平均配送时间</h2>
                <div class="content">
                  <span class="stress">{{seller_data.data.deliveryTime}}</span>元
                </div>
              </li>
            </ul>
            <div class="favorite-sc">
              <span class="favorite-sc-icon" :class="getClassSelector" @click="clickFavorite"></span>
              <span class="text">{{favoriteText}}</span>
            </div>
          </div>
          <div class="line-split"></div>
          <div class="supports">
            <h2>公告与活动</h2>
            <div class="content-wrapper" v-if="seller_data.data">
              <p class="content">{{seller_data.data.bulletin}}</p>
            </div>
            <ul v-if="seller_data.data">
              <li class="support-item" :key="index" v-for="(support,index) in seller_data.data.supports">
                <span class="icon" :class="classMap[support.type]"></span>
                <span class="description">{{support.description}}</span>
              </li>
            </ul>
          </div>
          <div class="line-split"></div>
          <div class="pics">
            <h2>商家实景</h2>
            <ul v-if="seller_data.data">
              <li :key="index" v-for="(item,index) in seller_data.data.pics" class="pic-item">
                <img :src="item" class="pic-item">
              </li>
            </ul>
          </div>
          <div class="line-split"></div>
          <div class="infos">
            <h2>商家信息</h2>
            <ul v-if="seller_data.data">
              <li class="info-item" :key="index" v-for="(info,index) in seller_data.data.infos">{{info}}</li>
            </ul>
          </div>
        </div>
      </div>
    </cube-scroll-nav>
  </div>
</template>

<script>
import star from 'src/components/star/star.vue'

export default {
  name: 'seller',
  data() {
    return {
      seller_data: {},
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      isActive: false,
      selectClass: '',
      scroll: null,
    }
  },
  components: {
    star
  },
  mounted() {
    this.getData()
  },
  computed: {
    favoriteText() {
      return this.isActive ? '已收藏' : '未收藏'
    },
    getClassSelector() {
      return this.isActive ? 'favorite-sc-yes' : 'favorite-sc-no'
    }
  },
  methods: {
    changeHandler(label) {
      console.log('changed to:', label)
    },
    stickyChangeHandler(current) {
      console.log('sticky-change', current)
    },
    getData() {
      this.$axios.get('http://www.linrongtu.top/mysell/static/seller.json').then(response => {
        this.seller_data = response.data
      }, response => {
        console.log(response.data)
      })
    },
    clickFavorite: function(event) {
      if (!event._constructed) {
        return
      }
      this.isActive = !this.isActive
      console.log(this.isActive)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.seller
  overflow: hidden
  position: absolute
  width: 100%
  top: 176px
  bottom: 0
  font:normal 14px/30px PingFang SC,STHeitiSC-Light,Helvetica-Light,arial,sans-serif,Droid Sans Fallback
  .seller-wrapper
    overflow: hidden
    .content
      .overview
        .title
          color: #333
          font-size: 14px
          line-height: 14px
          margin-bottom: 8px
          font-weight: 400
        .desc
          align-items: center
          padding-bottom: 18px
          display: flex
          .star
            margin-right: 8px
          .text
            line-height: 18px
            margin-right: 12px
        .remark
          display: flex
          list-style-type: none
          padding:0
          margin: 0
          padding-top: 12px
          h2
            font-size: 10px
            line-height: 10px
            color: #999
            margin-bottom: 4px
          .block
            font-size: 10px
            text-align: center
            border-right: 1px #d9dde1 solid
            flex: 1
            .stress
              font-size: 20px
              line-height: 24px
        .favorite-sc
          display: flex
          flex-direction: column
          position: absolute
          top: 20px
          right: 50px
          .favorite-sc-icon
            margin-left: 8px
          .favorite-sc-yes
            width: 20px
            height: 20px
            background: url("./favorite.png") no-repeat
            background-size: 20px 20px
          .favorite-sc-no
            width: 20px
            height: 20px
            background: url("./favorite-no.png") no-repeat
            background-size: 20px 20px
      .supports
        margin: 0 auto
        .content-wrapper
          .content
            color: #f01414
        h2
          font-weight: normal
        ul
          padding: 0
          margin: 0
          .support-item
            display: flex
            display: -webkit-flex
            align-items: center
            padding: 0 12px
            padding-top: 6px
            margin-bottom: 12px
            border-top: 1px #eeeff0 solid
            /*font-size: 0*/
            .description
              font-size: 12px
              vertical-align: top
              padding-left: 8px
            .icon
              width: 16px
              height: 16px
            .decrease
              display: inline-block
              background: url("./decrease.png")
              background-size: 16px 16px
            .discount
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
      .line-split
        width: 100%
        height: 20px
        background: #f3f5f7
        border-top: 1px solid rgba(7, 17, 27, .1)
        border-bottom: 1px solid rgba(7, 17, 27, .1)
      .pics
        ul
          padding: 0
          margin: 0
          .pic-item
            display: inline-flex
            font-size: 20px
            flex: 1
            width: 120px
            height: 90px
            margin-left: 9px
            list-style: none
      .infos
        h2
        ul
          padding: 0
          margin: 0
          .info-item
            margin: 0
            list-style: none
            padding: 16px 12px
            font-size: 12px
            border-top: 2px #eeeff0 solid
</style>
