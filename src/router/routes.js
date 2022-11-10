
const routes = [
  {
    path: '/:slug',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/u852', component: () => import('pages/Utilizatori.vue') },
      { path: '/sp987', component: () => import('pages/Specialitati.vue') },
      { path: '/ser369', component: () => import('pages/Servicii.vue') },
      { path: '/med1313', component: () => import('pages/Medici.vue') },
      { path: '/cab999', component: () => import('pages/Cabinete.vue') },
      { path: '/soli456', component: () => import('pages/Solicitari.vue') },
      { path: '/clin777', component: () => import('pages/Clinica.vue') },
      { path: '/indi13', component: () => import('pages/Indisponibilitati.vue') },
      { path: '/orarcab777', component: () => import('pages/OrarCabinete.vue') },
      { path: '/adminpro', component: () => import('pages/Administrare.vue') },
      { path: '/rappro', component: () => import('pages/Rapoarte.vue') },
      { path: '/libere638', component: () => import('pages/Libere.vue') }
    ]
  },
  {
    path: '/programari/:token',
    component: () => import('layouts/ProgramariLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Programare.vue') },
      { path: 'succes', component: () => import('pages/Succes.vue') },
      { path: 'anulare', component: () => import('pages/Anulare.vue') }
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
