import {
  createRouter,
  createWebHashHistory
} from 'vue-router'

const routes = [{
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/ServerRules',
    name: 'ServerRules',
    component: () => import('../views/ServerRules.vue')
  },
  {
    path: '/Market',
    name: 'Market',
    component: () => import('../views/Market.vue'),
    children: [{
        path: 'Community/:pageId',
        component: () => import('../views/Market-List.vue')
      },
      {
        path: 'Official/:pageId',
        component: () => import('../views/Market-List.vue')
      },{
        path: '/:pathMatch(.*)*',
        name: 'NotFoundPageId',
        component: () => import('../views/NotFound.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router