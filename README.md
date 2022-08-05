# router-admin

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



# 前端路由小案例（后台管理小案例）

## 1 项目整体功能演示

**进入网站自动进入登录页面：**

![image-20220805200948154](https://img-blog.csdnimg.cn/b4d8929caf9741e28215aa498f7cc410.png)

**登录成功自动存储token，然后跳转到登录成功页面：**

![image-20220805201232115](https://img-blog.csdnimg.cn/0768e82111794c14adb04d67cde98501.png)

**左边功能栏可以切换：**

![image-20220805201304315](https://img-blog.csdnimg.cn/cda50c4da41840189a850913b14b45d9.png)

**点击用户管理的操作可以跳转到用户详情页面，并却可以回退到上一步：**

![image-20220805201404025](https://img-blog.csdnimg.cn/b0e6876a162d47498ce6d320c38a55c4.png)

**完了之后可以退出登录，并清除token，然后跳转到登录页面。**



## 2 **案例用到的知识点**

- 命名路由
- 路由重定向
- 导航守卫
- 嵌套路由
- 动态路由匹配
- 编程式导航

## 3 主要代码

##### 3.1 app.vue

```vue
<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'MyApp',
}
</script>

<style lang="less" scoped>
</style>

```

##### 3.2 MyHome.vue

```vue
<template>
  <div class="home-container">
    <!-- 头部区域 -->
    <MyHeader></MyHeader>
    <!-- 页面主体区域 -->
    <div class="home-main-box">
      <!-- 左侧边栏 -->
      <MyAside></MyAside>
      <!-- 右侧内容主体 -->
      <div class="home-main-body">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
// 头部区域组件
import MyHeader from './subcomponents/MyHeader.vue'
// 左侧边栏组件
import MyAside from './subcomponents/MyAside.vue'

export default {
  name: 'MyHome',
  // 注册组件
  components: {
    MyHeader,
    MyAside,
  },
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
  display: flex;
  flex-direction: column;

  .home-main-box {
    height: 100%;
    display: flex;
    .home-main-body {
      padding: 15px;
      flex: 1;
    }
  }
}
</style>
```

##### 3.3 MyLogin.vue

```vue
<template>
  <div class="login-container">
    <div class="login-box">

      <!-- 头像区域 -->
      <div class="text-center avatar-box">
        <img src="../assets/logo.png" class="img-thumbnail avatar" alt="">
      </div>

      <!-- 表单区域 -->
      <div class="form-login p-4">
        <!-- 登录名称 -->
        <div class="form-group form-inline">
          <label for="username">登录名称</label>
          <input type="text" class="form-control ml-2" id="username" placeholder="请输入登录名称" v-model.trim="username" autocomplete="off">
        </div>
        <!-- 登录密码 -->
        <div class="form-group form-inline">
          <label for="password">登录密码</label>
          <input type="password" class="form-control ml-2" id="password" placeholder="请输入登录密码" v-model.trim="password">
        </div>
        <!-- 登录和重置按钮 -->
        <div class="form-group form-inline d-flex justify-content-end">
          <button type="button" class="btn btn-secondary mr-2" @click="reset">重置</button>
          <button type="button" class="btn btn-primary" @click="login">登录</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'MyLogin',
  data(){
    return{
      username:'',
      password:''
    }
  },
  methods:{
    reset(){
      this.username = '',
      this.password = ''
    },
    login(){
      if(this.username === 'admin' && this.password === '666666'){
        //登录成功
        //1.存储token
        //2.跳转到后台主页
        localStorage.setItem('token','Bearer xxx')
        this.$router.push('/home')
      }else{
        //登录失败
        localStorage.removeItem('token')
        alert('登录失败！')
        this.username = ''
        this.password = ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  background-color: #35495e;
  height: 100%;
  .login-box {
    width: 400px;
    height: 250px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 6px rgba(255, 255, 255, 0.5);
    .form-login {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      box-sizing: border-box;
    }
  }
}

.form-control {
  flex: 1;
}

.avatar-box {
  position: absolute;
  width: 100%;
  top: -65px;
  left: 0;
  .avatar {
    width: 120px;
    height: 120px;
    border-radius: 50% !important;
    box-shadow: 0 0 6px #efefef;
  }
}
</style>
```

##### 3.4 MyAside.vue

```vue
<template>
  <div class="layout-aside-container">
    <!-- 左侧边栏列表 -->
    <ul class="user-select-none menu">
      <li class="menu-item">
        <router-link to="/home/users">用户管理</router-link>
      </li>
      <li class="menu-item">
        <router-link to="/home/rights">权限管理</router-link>
      </li>
      <li class="menu-item">
        <router-link to="/home/goods">商品管理</router-link>
      </li>
      <li class="menu-item">
        <router-link to="orders">订单管理</router-link>
      </li>
      <li class="menu-item">
        <router-link to="setting">系统设置</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MyAside',
}
</script>

<style lang="less" scoped>
.layout-aside-container {
  width: 250px;
  height: 100%;
  border-right: 1px solid #eaeaea;
}

.menu {
  list-style-type: none;
  padding: 0;
  .menu-item {
    line-height: 50px;
    font-weight: bold;
    font-size: 14px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    &:hover {
      background-color: #efefef;
      cursor: pointer;
    }
    a {
      display: block;
      color: black;
      padding-left: 30px;
      &:hover {
        text-decoration: none;
      }
    }
  }
}

// 设置路由高亮效果
.router-link-active {
  background-color: #efefef;
  box-sizing: border-box;
  position: relative;
  // 伪元素实现路由高亮效果
  &::before {
    content: ' ';
    display: block;
    width: 4px;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: #42b983;
  }
}
</style>
```

##### 3.5 MyHeader.vue

```vue
<template>
  <div class="layout-header-container d-flex justify-content-between align-items-center p-3">
    <!-- 左侧 logo 和 标题区域 -->
    <div class="layout-header-left d-flex align-items-center user-select-none">
      <!-- logo -->
      <!-- <img class="layout-header-left-img" src="#" alt=""> -->
      <!-- 标题 -->
      <h4 class="layout-header-left-title ml-3">星月后台管理系统</h4>
    </div>

    <!-- 右侧按钮区域 -->
    <div class="layout-header-right">
      <button type="button" class="btn btn-light" @click="logout">退出登录</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyHeader',
  methods:{
    logout(){
      //1.清除token
      //2.跳转到登录页
      localStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.layout-header-container {
  height: 60px;
  border-bottom: 1px solid #eaeaea;
}

.layout-header-left-img {
  height: 50px;
}
</style>
```

##### 3.6 MyUsers.vue

```vue
<template>
  <div>
    <!-- 标题 -->
    <h4 class="text-center">用户管理</h4>

    <!-- 用户列表 -->
    <table class="table table-bordered table-striped table-hover">
      <thead>
        <tr>
          <th>#</th>
          <th>姓名</th>
          <th>年龄</th>
          <th>头衔</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in userlist" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.age }}</td>
          <td>{{ item.position }}</td>
          <td>
            <a href="#" @click.prevent="gotoDetail(item.id)">详情</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'MyUser',
  data() {
    return {
      // 用户列表数据
      userlist: [
        { id: 1, name: '张三', age: 18, position: '快递员' },
        { id: 2, name: '张四', age: 18, position: '外卖员' },
        { id: 3, name: '张五', age: 19, position: 'Boss' },
        { id: 4, name: '老六', age: 22, position: '老六' }
      ]
    }
  },
  methods:{
    gotoDetail(id){
      // console.log('ok')
      this.$router.push('/home/userinfo/' + id )
      console.log(this);
    }
  }
}
</script>

<style lang="less" scoped></style>

```

##### 3.7 router/index.js (路由模块代码)

```js
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
```

##### 3.8 router (全局守卫路由路径)

```js
export default ['/home','/home/users','/home/orders','/home/rights','/home/setting']
```

