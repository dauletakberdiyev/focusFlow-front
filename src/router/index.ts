import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { 
      path: '/welcome', 
      name: 'welcome',
      component: () => import('../pages/WelcomePage.vue') }
  ]
})

export default router 