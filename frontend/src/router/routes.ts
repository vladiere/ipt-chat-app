import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    meta: { auth: true },
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/auth',
    meta: { auth: false },
    component: () => import('layouts/OutsideLayout.vue'),
    children: [
      {
        path: 'login',
        meta: { auth: false },
        component: () => import('pages/LoginPage.vue')
      },
      {
        path: 'register',
        meta: { auth: false },
        component: () => import('pages/RegisterPage.vue')
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
