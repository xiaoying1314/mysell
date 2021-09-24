import Vue from 'vue'
import App from 'src/App.vue'
import router from 'src/router/index'
import Axios from 'axios'
import CubeUI from "cube-ui"
Vue.config.productionTip = false
Vue.prototype.$axios = Axios
Vue.use(CubeUI)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
