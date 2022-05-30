import Home from '@/Pages/Home'
import Cart from '@/Pages/Cart'
import Products from '@/Pages/Products'
import Login from '@/Pages/Auth/Login'
import register from '@/Pages/Auth/Register'
import MyOrders from '@/Pages/Auth/MyOrders'
import DetailOrder from '@/Pages/DetailOrder'
import LoadTableCompany from '@/Pages/LoadTableCompany'
import PageNotFound from '@/Pages/PageNotFound'



const routes = [
    {
        path:'/',
        component:() => import('@/layouts/DefaultTemplate.vue'),
        children:[
            {
                path:'/',
                component:Home,
                name:'home',
                meta:{
                    title: 'Home  Vuefood'
                }
            },
            {
                path:'/loja/:companyFlag',
                component:Products,
                name:'products',
                props: true,
                meta:{
                    title: 'Products  Vuefood'
                }
                
            },
        
            {
                path:'/cart',
                component:Cart,
                name:'cart',
                meta:{
                    title: 'Carrinho  Vuefood'
                }
            },

            {
                path:'/meus-pedidos',
                component:MyOrders,
                name:'my.orders',
                meta:{
                    title: 'Pedidos Vuefood'
                }
            },

            {
                path:'/pedido/:identify',
                component:DetailOrder,
                name:'order.detail',
                props:true,
                meta:{
                    title: 'Detalhe do pedido  Vuefood'
                }
            },

            {
                path:'/:token_company/:token_table',
                component:LoadTableCompany,
                name:'load.table.company',
                props:true
            },
        ]
    },
    
    {
        path:'/',
        component:() => import('@/layouts/Partes/AuthTemplate.vue'),
        children:[
            {
                path:'/login',
                component:Login,
                name:'login',
                meta:{
                    title: 'Login  Vuefood'
                }

            },
            {
                path:'/register',
                component:register,
                name:'register',
                meta:{
                    title: 'Cadastrar  Vuefood'
                }
            },
        ]

    },

   {

    path:'*',
    component:PageNotFound,
    meta:{
        title: 'Pagina não encontrada'
    }

   }
]


export default routes