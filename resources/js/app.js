import Vue from 'vue'
import App from './views/app.vue'
import router from "./views/router";
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import * as state from './views/state'

Vue.use(Vuex)
Vue.use(VueAxios, axios)
const store = new Vuex.Store(state)


const app = new Vue({
    router,
    el: '#app',
    store: store,
    components: { App }
});

