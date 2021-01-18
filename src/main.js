import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import Routes from "@/Routes";
//import { library } from '@fortawesome/fontawesome-svg-core'
import FontAwesomeIcon from "@fortawesome/vue-fontawesome/src/components/FontAwesomeIcon";

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.component('font-awesome-icon', FontAwesomeIcon)

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
})

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
