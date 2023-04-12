import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Produk from '@/components/Produk'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Produk',
      component: Produk
    }
  ]
})
