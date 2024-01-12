import { createRouter, createWebHistory } from 'vue-router'
import DashboardPage from '../views/DashboardPage.vue'
import ProductPage from '../views/ProductPage.vue' 

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: DashboardPage
  },
  {
    path: '/products',
    name: 'Products',
    component: ProductPage
  },
  // Define other routes as needed
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
