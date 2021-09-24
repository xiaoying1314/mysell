<template>
  <div class="goods">
    <cube-scroll-nav
            :side="true"
            :data="goods_data"
            :current="current"
            @change="changeHandler"
            @sticky-change="stickyChangeHandler">
      <cube-scroll-nav-panel
              v-for="item in goods_data.data"
              :key="item.name"
              :label="item.name"
              :title="item.name">
        <div :key="index" v-for="(food,index) in item.foods">
          <ul class="foods-wrapper">
            <li class="item">
              <div class="icon">
                <img :src="food.icon" width="56px" height="42px">
              </div>
              <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span>月售{{food.sellCount}}份</span>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span>¥{{food.price}}</span>
                  </div>
                </div>
              <div class="cart-controll">
                <transition name="move">
                  <div class="cart-decrease" v-show="cartCount>0" @click="decreaseCount">
                    <span class="inner icon-remove_circle_outline"></span>
                  </div>
                </transition>
                <div class="cart-count" @click="getDd"></div>
                <div class="cart-add icon-add_circle" id="circle" @click="getArray(index1, index2)"></div>
            </div>
            </li>
          </ul>
        </div>
      </cube-scroll-nav-panel>
    </cube-scroll-nav>
    <div class="shop-cart-wrapper" v-if="seller_data.data">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo">
            <span class="shop-cart icon-shopping_cart"></span>
          </div>
        </div>
        <span class="price">￥</span>
        <span class="fare-delivery">另需配送费￥{{seller_data.data.deliveryPrice}}元</span>
      </div>
      <div class="content-right">
        <div class="fare">￥{{seller_data.data.minPrice}}元起送</div>
      </div>
      <!--      <div class="pay">还差块钱起送</div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'goods',
  components: {
  },
  data() {
    return {
      myMsg: this.msg,
      goods_data: {},
      seller_data: [],
      listHeight: [],
      scrollY: 0, // 时时获取当前Y轴的高度
      clickEvent: false,
      cartCount: 0,
      balls: {
        ball: [false, false, false, false, false]
      },
      foodsScroll: Object,
      currentIndex: [[]],
      dd: 1
    }
  },
  mounted () {
    this.out()
    this.getData()
  },
  computed: {
  },
  methods: {
    getDd () {
      this.dd = this.dd + 1
      console.log(this.dd)
    },
    getArray(index1, index2) {
      if (!this.currentIndex[index1]) {
        this.currentIndex[index1] = [[]]
      }
      if (this.currentIndex[index1][index2]) {
        this.currentIndex[index1][index2] = parseInt(this.currentIndex[index1][index2]) + 1
        console.log(this.currentIndex[index1][index2])
      } else {
        this.currentIndex[index1] = []
        this.currentIndex[index1][index2] = 1
      }
    },
    out() {
    },
    selectMenu(index, event) {
      this.clickEvent = true
      if (!event._constructed) {
        return 0
      } else {
        let rightItems = this.$refs.right.getElementsByClassName('right-item-hook')
        let el = rightItems[index]
        this.rights.scrollToElement(el, 300)
      }
    },
    _getHeight() {
      let rightItems = this.$refs.right.getElementsByClassName('right-item-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < rightItems.length; i++) {
        let item = rightItems[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    getData() {
      this.$axios.get('http://www.linrongtu.top/mysell/static/goods.json').then(response => {
        this.goods_data = response.data
      }, response => {
        console.log(response.data)
      })
      this.$axios.get('http://www.linrongtu.top/mysell/static/seller.json').then(response => {
        this.seller_data = response.data
      }, response => {
        console.log(response.data)
      })
    },
    decreaseCount() {
      if (this.cartCount > 0) {
        this.cartCount = this.cartCount - 1
      }
    }
  },
  created () {
    this.foodMap = []
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.goods
  position:absolute
  top: 178px
  display: flex
  bottom: 46px
  width: 100%
  .cube-scroll-nav
    font-size: 10px
    width: 100%
    .cube-sticky
      font-size: 12px
      .cube-scroll-wrapper
        font-size: 12px
        .cube-scroll-nav-panel-title
          font-size: 12px
          height: 26px
          line-height: 26px
          background: #f3f5f7
          position: sticky
          top: 0
          border-left: 2px solid #d9dde1
          padding-left: 12px
        .cube-scroll-nav-panel
          font-size: 12px
          .foods-wrapper
            font-size: 12px
            .item
              position: relative
              margin: 12px
              display: flex
              .icon
                flex: 0 0 80px
                font-size: 12px
                text-align: center
              .content
                flex: auto
                margin-left: 12px
                .name
                  font-size: 14px
                  margin: 2px 0 8px 0
                  color: #333
                .desc
                  font-size: 12px
                  margin: 2px 0 8px 0
                  color: #999
                .extra
                  font-size: 10px
                  line-height: 12px
                  color: #999
                  margin: 2px 0 8px 0
                .price
                  font-size: 14px
                  color: #f01414

              .cart-controll
                position: absolute
                font-size: 24px
                color: #00a0dc
                right: 2px
                bottom: 2px
      .cube-sticky-fixed
        font-size: 12px
  .shop-cart-wrapper
    z-index: 100
    position: absolute
    bottom: -46px
    left: 0
    width: 100%
    height: 44.8px
    display: flex
    background: #07111b
    flex-direction: row
    .content-left
      flex: 80%
      align-items: center
      color: #999
      display: flex
      .logo-wrapper
        display: inline-block
        position: relative
        top: -10px
        background: #07111b
        width: 56px
        height: 56px
        border-radius: 28px
        padding: 6px
        margin: 0 14px
        box-sizing: border-box
        .logo
          width: 44px
          height: 44px
          background: #333
          border-radius: 22px
          text-align: center
          .shop-cart
            color: #999
            font-size: 24px
            line-height: 44px
      .price
        font-size: 16px
        font-weight: 700px
        flex: 0 0 40px
        text-align: center
      .fare-delivery
        font-size: 10px
        flex: 0 0 auto
    .content-right
      color: #999
      flex: 20%
      text-align: right
      margin: 5px
      .fare
        text-align: center
        height: 100%
</style>
