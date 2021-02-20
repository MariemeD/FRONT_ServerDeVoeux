import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import Routes from "@/Routes";
import { library } from '@fortawesome/fontawesome-svg-core'
import FontAwesomeIcon from "@fortawesome/vue-fontawesome/src/components/FontAwesomeIcon";
import {
  faServer,
  faUsers,
  faBook,
  faEdit,
  faTrash,
  faSortDown,
  faSortUp,
  faSort,
  faPlusSquare,
  faClipboardList,
  faSpinner,
  faUserTie,
  faEye } from "@fortawesome/free-solid-svg-icons";
import VueCookies from 'vue-cookies';
import VueDropdown from 'vue-dynamic-dropdown';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueCookies)

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('vue-dropdown', VueDropdown);

library.add(faServer)
library.add(faUsers)
library.add(faBook)
library.add(faEdit)
library.add(faTrash)
library.add(faPlusSquare)
library.add(faClipboardList)
library.add(faSpinner)
library.add(faUserTie)
library.add(faEye)
library.add(faSortUp)
library.add(faSortDown)
library.add(faSort)


const router = new VueRouter({
  routes: Routes,
  mode: 'history'
})

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
