
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'u852', component: () => import('pages/Utilizatori.vue') },
      { path: 'sp987', component: () => import('pages/Specialitati.vue') },
      { path: 'ser369', component: () => import('pages/Servicii.vue') },
    ]
  },
  {
    path: '/programari/:token',
    component: () => import('layouts/ProgramariLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Programare.vue') }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
