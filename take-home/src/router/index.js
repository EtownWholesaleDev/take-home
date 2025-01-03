import { createRouter, createWebHistory } from 'vue-router'
import ProductGrid from '../components/ProductGrid.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Store',
      component: ProductGrid,
    }
  ],
})

export default router
