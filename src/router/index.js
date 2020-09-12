import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/Profile.vue')
  },
  {
    path: '/product/:id',
    props: true,
    name: 'Product',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/Product.vue')
  },
  {
    path: '/cart',
    name: 'ShoppingCart',
    component: () => import( /* webpackChunkName: "about" */ '../views/ShoppingCart.vue')
  },
  {
    path: '/success',
    name: 'Success',
    component: () => import( /* webpackChunkName: "about" */ '../views/Success.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router