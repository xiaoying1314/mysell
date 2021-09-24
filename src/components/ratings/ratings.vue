<template>
    <div class="ratings">
      <div class="ratings-wrapper" v-if="ratings.data">
        <cube-scroll-nav>
          <div class="ratings-overview">
            <div class="overview-left" v-if="ratingsScore.data">
              <h2>{{ratingsScore.data.score}}</h2>
              <div class="title">综合评分</div>
              <div class="rank">高于周边国家{{ratingsScore.data.rankRate}}%</div>
            </div>
            <div class="overview-right">
              <div class="score-wrapper" v-if="ratingsScore.data">
                <span class="title">服务态度</span>
                <star :score="ratingsScore.data.serviceScore" :size="36"></star>
                <span class="score">{{ratingsScore.data.serviceScore}}</span>
              </div>
              <div class="score-wrapper" v-if="ratingsScore.data">
                <span class="title">商品评分</span>
                <star :score="ratingsScore.data.foodScore" :size="36"></star>
                <span class="score">{{ratingsScore.data.foodScore}}</span>
              </div>
              <div class="delivery-wrapper" v-if="ratingsScore.data">
                <span class="title">送达时间</span>
                <span class="time">{{ratingsScore.data.deliveryTime}}分钟</span>
              </div>
            </div>
          </div>
          <div class="line"></div>
          <div class="ratings-select">
            <div class="both" @click="selectAll">
              <span>全部</span>
              <span>{{ratings.data.length}}</span>
            </div>
            <div class="positive">
              <span>满意</span>
              <span>{{positiveCount}}</span>
            </div>
            <div class="negative">
              <span>不满意</span>
              <span>{{ratings.data.length-positiveCount}}</span>
            </div>
          </div>
          <div class="ratings-switch">
          </div>
          <div class="ratings-list">
            <div class="content">
              <ul>
                <li class="list" v-for="(user,index) in ratings.data" :key="index">
                  <div class="list-left">
                    <div class="avatar">
                      <img :src="user.avatar">
                    </div>
                    <div class="content">
                      <span class="username">{{user.username}}</span>
                      <div class="star-wrapper">
                        <star :score="user.score" :size="24"></star>
                        <span class="delivery-time">{{user.deliveryTime}}</span>
                      </div>
                      <span class="text">{{user.text}}</span>
                      <div class="recommend">
                        <span class="icon"></span>
                        <span class="item" v-for="(recommend,index) in user.recommend" :key="index">
                        {{recommend}}
                      </span>
                      </div>
                    </div>
                  </div>
                  <div class="list-right">
                    <span>{{getDate(user.rateTime)}}</span>
                  </div>
                </li>
                <span class="date"></span>
              </ul>
            </div>
          </div>
        </cube-scroll-nav>
        </div>
    </div>
</template>

<script>
import Star from 'src/components/star/star'
export default {
  components: {Star},
  mounted() {
    this.getData()
    this.getRatingsCount()
  },
  data() {
    return {
      ratingsUser: [],
      ratingsScore: [],
      ratings: [],
      allList: [],
      positionList: [],
      negativeList: [],
      bool: true,
      all: false,
      positive: false,
      negative: false,
      positiveCount: 0,
      checked: true,
    }
  },
  computed: {
    getDate () {
      return date => {
        var dateTime = new Date(date)
        dateTime = dateTime.getFullYear() + '-' + dateTime.getMonth() + '-' + dateTime.getDate() + ' ' +
          dateTime.getHours() + ':' + dateTime.getMinutes()
        return dateTime
      }
    }
  },
  methods: {
    showDialog() {
      this.$createDialog({
        type: 'alert',
        title: 'Alert',
        content: 'dialog content'
      }).show()
    },
    getData() {
      this.$axios.get('http://www.linrongtu.top/mysell/static/goods.json').then(response => {
        this.ratingsUser = response.data
      })
      this.$axios.get('http://www.linrongtu.top/mysell/static/seller.json').then(response => {
        this.ratingsScore = response.data
      })
      this.$axios.get('http://www.linrongtu.top/mysell/static/ratings.json').then(response => {
        this.ratings = response.data
      })
    },
    getRatingsCount() {
    },
    selectAll () {
      for (let i = 0; i < this.ratings.data.length; i++) {
        console.log(i)
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .ratings
    position:absolute
    top: 178px
    bottom: 0
    width: 100%
  .ratings-wrapper
    height: 100%
    overflow: hidden
    .ratings-overview
      display: flex
      flex-direction: row
      padding: 6px 0
      text-align: center
      height: 80px
      .overview-left
        flex: 0 0 137px
        border-right: 1px #d9dde1 solid
        h2
          padding: 0
          margin: 0
          color: #f79153
          font-size: 24px
          line-height: 28px
          margin-bottom: 6px
        .title
          color: #333
          font-size: 12px
          line-height: 12px
          margin-bottom: 8px
        .rank
          color: #999
          font-size: 10px
          line-height: 10px
          padding-top: 12px
      .overview-right
        padding-left: 24px
        flex: 1
        font: normal 12px/18px PingFang SC,STHeitiSC-Light,Helvetica-Light,arial,sans-serif,Droid Sans Fallback
        .score-wrapper
          display: flex
          flex-direction: row
          margin-bottom: 14px
          .star
            margin-left: 8px
          .score
            color: #f79153
            margin-left: 8px
        .delivery-wrapper
          display: flex
          flex-direction: row
          .star
            margin-left: 8px
          .time
            margin-left: 8px
    .line
      background: #f3f5f7
      height: 16px
      border-top: 1px solid rgba(7, 17, 27, .1)
      border-bottom: 1px solid rgba(7, 17, 27, .1)
    .ratings-select
      display: flex
      padding: 26px
      text-align: center
      align-items: center
      font-size: 12px
      border: 1px rgba(7, 17, 27, .1) solid
      .both
        color: #666
        background: rgba(0, 160, 220, .2)
        flex: 0 0 80px
        margin-right: 12px
        padding: 12px 0
        border-radius: 2px
      .both:link
        background: #00a0dc
      .both:hover
        background: #00a0dc
      .positive
        background: rgba(0, 160, 220, .2)
        flex: 0 0 80px
        margin-right: 12px
        padding: 12px 0
        color: #666
      .positive:hover
        background: #00a0dc
      .negative
        background: #ccc
        flex: 0 0 80px
        margin-right: 12px
        padding: 12px 0
        color: #666
       .negative:hover
         background: #333
         color: white
    .ratings-list
      .content
        ul
          list-style: none
          padding: 0
          margin: 0
          .list
            display: flex
            flex-direction: row
            border-bottom: 1px rgba(7, 17, 27, 0.1) solid
            .list-left
              display: flex
              padding: 18px 0
              flex: 80%
              .avatar
                flex: 0 0 56px
                padding-left: 12px
                img
                  width: 28px
                  height: 28px
                  border-radius: 14px
              .content
                display: flex
                flex-direction: column
                align-items: left
                flex: 300px
                font: normal 12px/14px PingFang SC,STHeitiSC-Light,Helvetica-Light,arial,sans-serif,Droid Sans Fallback
                .username
                  margin-bottom: 8px
                .star-wrapper
                  display: flex
                  margin-bottom: 8px
                  .star
                    margin-right: 6px
                  .delivery-time
                      font-size: 10px
                      color: #999
                .text
                  font-size: 10px
                  margin-bottom: 8px
                .recommend
                  margin-bottom: 8px
                .item
                    background: #fff
                    border: 1px rgba(7, 17, 27, 0.1) solid
                    padding: 0 6px
                    margin-right: 6px
            .list-right
              padding: 18px 0
              color: #999
              font-size: 10px
              text-align: center
              flex: 20%
</style>
