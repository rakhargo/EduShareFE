import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Profile from '../views/Profile.vue'
import AskQuestion from '../views/AskQuestion.vue'
import QuestionDetail from '../views/QuestionDetail.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/ask',
    name: 'AskQuestion',
    component: AskQuestion,
    meta: { requiresAuth: true }
  },
  {
    path: '/question/:id',
    name: 'QuestionDetail',
    component: QuestionDetail
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router