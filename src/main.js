import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import Routes from "@/Routes";
import { library } from '@fortawesome/fontawesome-svg-core'
import FontAwesomeIcon from "@fortawesome/vue-fontawesome/src/components/FontAwesomeIcon";
import { faServer, faUsers, faBook,faEdit, faTrash, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.component('font-awesome-icon', FontAwesomeIcon)

library.add(faServer)
library.add(faUsers)
library.add(faBook)
library.add(faEdit)
library.add(faTrash)
library.add(faPlusSquare)

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
})

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
