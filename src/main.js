import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios"
import VueAxios from "vue-axios"
import { EventBus } from "@/eventBus.js"
import VueCookie from 'vue-cookie'
import Vuetify from 'vuetify'
import firebase from 'firebase'
import VueNoty from 'vuejs-noty'
import SocialSharing from 'vue-social-sharing'
import config from '@/settings.js'

import 'vuetify/dist/vuetify.min.css'
import 'vuejs-noty/dist/vuejs-noty.css'
import '../static/css/style.css'

Vue.router = router

Vue.use(SocialSharing)
Vue.use(VueAxios, axios)
Vue.use(VueCookie)
Vue.use(Vuetify)
Vue.use(VueNoty, {
	timeout: 2500
})

Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return EventBus
    },
  },
})

Vue.config.productionTip = false

firebase.initializeApp(config)
firebase.auth().onAuthStateChanged((user) => {
	new Vue({
		el: '#app',
		render: h => h(App),
		router,
		data () {
			return {
				currentUser: user
			}
		},
	})
})

