import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home' 
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
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../pages/HomePage.vue')
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: () => import('../pages/TaskPage.vue')
    },
    {
      path: '/pomodoro',
      name: 'pomodoro',
      component: () => import('../pages/PomodoroPage.vue')
    }
  ]
})

export default router 