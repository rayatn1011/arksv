import { createRouter, createWebHashHistory } from 'vue-router'
import { store } from '../store/index.js'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomePage.vue'),
  },
  {
    path: '/server-rules',
    name: 'ServerRules',
    component: () => import('../views/ServerRules.vue'),
  },
  {
    path: '/market',
    name: 'market',
    component: () => import('../views/market/MarketLayout.vue'),
    redirect: { name: 'market-community' },
    children: [
      {
        path: 'community',
        name: 'market-community',
        component: () => import('../views/market/MarketCommunity.vue'),
      },
      {
        path: 'official',
        name: 'market-official',
        component: () => import('../views/market/MarketOfficial.vue'),
      },
      {
        path: 'user',
        name: 'market-user',
        meta: { requiresAuth: true },
        component: () => import('../views/market/MarketUser.vue'),
        redirect: { name: 'market-user-add' },
        children: [
          {
            path: 'add',
            name: 'market-user-add',
            component: () => import('../views/market/MarketUserAdd.vue'),
          },
          {
            path: 'launched',
            name: 'market-user-launched',
            component: () => import('../views/market/MarketUserLaunched.vue'),
          },
          {
            path: 'booked',
            name: 'market-user-booked',
            component: () => import('../views/market/MarketUserBooked.vue'),
          },
          {
            path: 'mybooked',
            name: 'market-user-mybooked',
            component: () => import('../views/market/MarketUserMyBooked.vue'),
          },
          // {
          //   path: 'record',
          //   name: 'market-user-record',
          //   component: () => import('../views/market/MarketUserRecord.vue'),
          // },
        ],
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
})

router.beforeEach(async (to) => {
  // 檢查是否已經登入
  let isLogin = await store.dispatch('checkLogin')
  if (to.meta.requiresAuth && !isLogin) {
    return false
  }
})

export { router }
