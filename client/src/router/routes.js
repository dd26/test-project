
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/clients', component: () => import('pages/clients/List.vue') },
      { path: '/clients/form', component: () => import('pages/clients/Form.vue') },
      { path: '/clients/form/:id', component: () => import('pages/clients/Form.vue') }
    ]
  },
  {
    path: '/auth',
    component: () => import('pages/Login.vue')
  },
  {
    path: '/',
    redirect: '/auth'
  },
  {
    path: '*',
    redirect: '/auth'
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
