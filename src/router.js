import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import LoginView from './views/LoginView.vue';
import AccessDeniedView from './views/AccessDeniedView.vue';
import { authEnabled, authReady, authState, isAuthorizedUser } from './auth';

const protectedPaths = [
  '/dashboard',
  '/roadmap',
  '/tutorials',
  '/chat',
  '/notes',
  '/projects',
  '/resources',
  '/calendar'
];

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/dashboard' },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/access-denied', name: 'access-denied', component: AccessDeniedView },
    ...protectedPaths.map((path) => ({
      path,
      component: App,
      meta: { requiresAuth: true }
    })),
    { path: '/:pathMatch(.*)*', redirect: '/dashboard' }
  ]
});

router.beforeEach(async (to) => {
  await authReady;

  if (!authEnabled) {
    if (to.name === 'login' || to.name === 'access-denied') {
      return '/dashboard';
    }
    return true;
  }

  const user = authState.user;

  if (to.meta.requiresAuth) {
    if (!user || !isAuthorizedUser(user)) {
      return { name: 'login', query: { redirect: to.fullPath } };
    }
  }

  if (to.name === 'login' && user && isAuthorizedUser(user)) {
    return to.query.redirect || '/dashboard';
  }

  return true;
});

export default router;
