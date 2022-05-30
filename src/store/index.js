import Vue from 'vue'
import Vuex from 'vuex'
import {state,mutations} from './default'
import companies from './modulos/companies'
import cart from './modulos/cart/cart'
import auth from './modulos/auth/auth'
import orders from './modulos/orders/orders'
Vue.use(Vuex)

const store = new Vuex.Store({
    modules:{
        companies,
        cart,
        auth,
        orders,
    },
    state,
    mutations
})

export default store