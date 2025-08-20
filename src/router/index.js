// src\router\index.js

import { createRouter, createWebHistory } from 'vue-router'
import ProductListing from '../views/ProductListing.vue'
import ProfileEditing from '../views/ProfileEditing.vue'
import CompetitionAddition from '../views/CompetitionAddition.vue'
import AddProductPage from '../views/AddProduct.vue'
import Profile from '../views/ProfileView.vue'
import Contest from '../views/ContestView.vue'

const routes = [
  {
    path: '/',
    name: 'Contest',
    component: Contest
  },
  {
    path: '/',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/product-listing',
    name: 'ProductListing',
    component: ProductListing
  },
  {
    path: '/profile-editing',
    name: 'ProfileEditing',
    component: ProfileEditing
  },
  {
    path: '/competition',
    name: 'CompetitionAddition',
    component: CompetitionAddition
  },
  {
    path: '/add-product',
    name: 'AddProductPage',
    component: AddProductPage
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router