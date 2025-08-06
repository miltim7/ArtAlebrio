import { createRouter, createWebHistory } from 'vue-router'
import ProductListing from '../views/ProductListing.vue'
import ProfileEditing from '../views/ProfileEditing.vue'
import CompetitionAddition from '../views/CompetitionAddition.vue'

const routes = [
  {
    path: '/',
    name: 'ProductListing',
    component: ProductListing
  },
  {
    path: '/profile',
    name: 'ProfileEditing',
    component: ProfileEditing
  },
  {
    path: '/competition',
    name: 'CompetitionAddition',
    component: CompetitionAddition
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router