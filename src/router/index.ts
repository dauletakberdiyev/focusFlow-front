import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/welcome' 
    },
    { 
      path: '/welcome', 
      name: 'welcome',
      component: () => import('../pages/WelcomePage.vue') 
    },
    {
      path: '/questionary',
      name: 'questionary',
      component: () => import('../pages/QuestionaryPage.vue')
    }
  ]
})

export default router 