// Imports
import Vue from 'vue'
import Router from 'vue-router'
import { auth } from '@/services/firebase'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) return { selector: to.hash }
    if (savedPosition) return savedPosition

    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/base/Index.vue'),
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('@/views/home/Index.vue'),
        },
      ],
    },
    {
      path: '/admin',
      component: () => import('@/layouts/base/admin.vue'),
      children: [
        {
          path: '',
          name: 'AdminHome',
          component: () => import('@/views/admin/index.vue'),
          children: [
            {
              path: 'head',
              name: 'Head',
              component: () => import('@/views/admin/head.vue'),
            },
            {
              path: 'about',
              name: 'about',
              component: () => import('@/views/admin/about.vue'),
            },
            {
              path: 'gallery',
              name: 'Gallery',
              component: () => import('@/views/admin/gallery.vue'),
            },
            {
              path: 'promo',
              name: 'Promo',
              component: () => import('@/views/admin/promo.vue'),
            },
            {
              path: 'skills',
              name: 'Skills',
              component: () => import('@/views/admin/skills.vue'),
            },
            {
              path: 'awards',
              name: 'Awards',
              component: () => import('@/views/admin/awards.vue'),
            },
          ],
        },
      ],
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      component: () => import('@/layouts/base/admin.vue'),
      children: [
        {
          path: '',
          name: 'Login',
          component: () => import('@/views/login.vue'),
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = auth.currentUser
  if (requiresAuth && !currentUser) {
    next('/login')
  } else if (requiresAuth && currentUser) {
    next()
  } else if (to.name === 'login' && currentUser) {
    next('/admin')
  } else {
    next()
  }
})

export default router
