import Vue from 'vue'
import VueRouter from 'vue-router'
//导入前置路由地址数组
import Arrrouter from '@/router/router.js'

import Login from '@/components/MyLogin.vue'

import Home from '@/components/MyHome.vue'

import Users from '@/components/menus/MyUsers.vue'
import Rights from '@/components/menus/MyRights.vue'
import Goods from '@/components/menus/MyGoods.vue'
import Orders from '@/components/menus/MyOrders.vue'
import Setting from '@/components/menus/MySettings.vue'
import UserDetail from '@/components/user/MyUserDetail.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes:[
    //路由重定向
    { path:'/',redirect:'/login'},
    //登录路由规则
    { path:'/login',component:Login},
    { 
      path:'/home',
      component:Home,
      //路由重定向
      redirect:'/home/users',
      children:[
        //路由重定向
        // { path:'/',redirect:'users' }, 
        //子路由规则
        { path:'users',component:Users },
        { path:'rights',component:Rights },
        { path:'goods',component:Goods },
        { path:'orders',component:Orders },
        { path:'setting',component:Setting },
        //用户详情页路由规则
        { path:'userinfo/:id',component:UserDetail,props:true }
    ]
    },
  ]
})

// 全局前置守卫
router.beforeEach((to,from,next)=>{
  if(Arrrouter.indexOf(to.path) != -1){
    const token = localStorage.getItem('token')
    if(token){
      next()
    }else{
      next('/login')
    }
  }else{
    next()
  }
})

export default router