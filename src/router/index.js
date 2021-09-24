import Vue from 'vue'
import VueRouter from 'vue-router'
import goods from 'src/components/goods/goods.vue'
import seller from 'src/components/seller/seller.vue'
import ratings from 'src/components/ratings/ratings.vue'
Vue.use(VueRouter)

const routes = [
  {path: '/mysell/goods', component: goods},
  {path: '/mysell/seller', component: seller},
  {path: '/mysell/ratings', component: ratings}
]
// 生成路由器
const router = new VueRouter({mode: 'history',
  routes})
export default router
