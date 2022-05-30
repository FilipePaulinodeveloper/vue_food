import vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes.map'

vue.use(VueRouter)


const router = new VueRouter({
    routes,
    mode:'history',      
})

router.beforeEach((to,from,next) => { 
    document.title ='Vuefood'
    if (to.hasOwnProperty('meta')){
        document.title = to.meta.title
    };
    next()
})
export default router