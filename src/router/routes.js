
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Pool.vue') },
      { path: '/vermietung', component: () => import('pages/Vermietung.vue') },
      { path: '/packliste', component: () => import('pages/Packliste.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
