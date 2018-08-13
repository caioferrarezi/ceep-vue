import Vue from 'vue'
import Router from 'vue-router'
import Painel from '@/components/Painel'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Painel',
      component: Painel
    }
  ]
})
