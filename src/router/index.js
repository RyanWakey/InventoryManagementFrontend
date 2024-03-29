import { createRouter, createWebHistory } from 'vue-router'
import DashboardPage from '../views/DashboardPage.vue'
import ProductPage from '../views/ProductPage.vue' 
import LoginPage from '@/views/LoginPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import ProfilePage from '../views/ProfilePage.vue'
import SupplierPage from '../views/SupplierPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'DashboardPage',
    component: DashboardPage
  },
  {
    path: '/products',
    name: 'Products',
    component: ProductPage
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage 
  }, 
  {
    path: '/profile', // Added leading slash
    name: 'Profile',
    component: ProfilePage
  },
  {
    path: '/suppliers',
    name: 'Suppliers',
    component: SupplierPage
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})



export default router