<template>
  <div class="app">
    <v-header v-bind:seller_data='seller_data'></v-header>
    <div class="tab">
      <div class="tab-item" @click="changeBorder1" id="router1">
        <router-link to="/mysell/goods">商品</router-link>
      </div>
      <div class="tab-item" @click="changeBorder2" id="router2">
        <router-link to="/mysell/ratings">评论</router-link>
      </div>
      <div class="tab-item" @click="changeBorder3" id="router3">
        <router-link to="/mysell/seller">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
  import header from 'src/components/header/header'
  export default {
    name: 'app',
    components: {
      'v-header': header
    },
    data() {
      return {
        seller_data: {}
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      getScrollTop() {
        var scrollTop = 0
        if (document.documentElement && document.documentElement.scrollTop) {
          scrollTop = document.documentElement.scrollTop
        } else if (document.body) {
          scrollTop = document.body.scrollTop
        }
        return scrollTop
      },
      getClientHeight() {
        var clientHeight = 0
        if (document.body.clientHeight && document.documentElement.clientHeight) {
          clientHeight = Math.min(
                  document.body.clientHeight,
                  document.documentElement.clientHeight
          )
        } else {
          clientHeight = Math.max(
                  document.body.clientHeight,
                  document.documentElement.clientHeight
          )
        }
        return clientHeight
      },
      getScrollHeight() {
        return Math.max(
                document.body.scrollHeight,
                document.documentElement.scrollHeight
        )
      },
      getData() {
        this.$axios.get('http://www.linrongtu.top/mysell/static/seller.json').then(response => {
          this.seller_data = response.data
          console.log(response.data)
        }, response => {
          console.log(response.error)
        })
      },
      changeBorder1() {
        document.getElementById('router2').style.borderBottom = '2px solid rgba(7, 17, 27, .1)'
        document.getElementById('router3').style.borderBottom = '2px solid rgba(7, 17, 27, .1)'
        document.getElementById('router1').style.borderBottom = '2px red solid'
      },
      changeBorder2() {
        document.getElementById('router1').style.borderBottom = '2px solid rgba(7, 17, 27, .1)'
        document.getElementById('router3').style.borderBottom = '2px solid rgba(7, 17, 27, .1)'
        document.getElementById('router2').style.borderBottom = '2px red solid'
      },
      changeBorder3() {
        document.getElementById('router2').style.borderBottom = '2px solid rgba(7, 17, 27, .1)'
        document.getElementById('router1').style.borderBottom = '2px solid rgba(7, 17, 27, .1)'
        document.getElementById('router3').style.borderBottom = '2px red solid'
      }
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  html, body
    width: 100%
    height: 100%
    margin: 0
  .app
    width: 100%
    height: 100%
    .tab
      display: flex
      width: 100%
      height:40px
      line-height: 40px
      .tab-item
        flex: 1
        text-align: center
        border-bottom: 1px solid rgba(7, 17, 27, .1)
        a
          text-decoration: none
</style>
