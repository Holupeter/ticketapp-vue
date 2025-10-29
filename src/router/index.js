import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../views/LandingPage.vue';
import Login from '../views/auth/LoginPage.vue';
import Signup from '../views/auth/SignupPage.vue';
import Dashboard from '../views/DashboardPage.vue';
import TicketManagement from '../views/TicketManagement.vue';

const routes = [
  { path: '/', name: 'home', component: LandingPage, meta: { layout: 'public' } },
  { path: '/auth/login', name: 'login', component: Login, meta: { layout: 'public' } },
  { path: '/auth/signup', name: 'signup', component: Signup, meta: { layout: 'public' } },

  // Protected (app) pages
  { path: '/dashboard', name: 'dashboard', component: Dashboard, meta: { requiresAuth: true, layout: 'app' } },
  { path: '/tickets', name: 'tickets', component: TicketManagement, meta: { requiresAuth: true, layout: 'app' } },
];

const history = createWebHistory();

const router = createRouter({ history, routes });

router.beforeEach((to, _from, next) => {
  const authed = !!localStorage.getItem('ticketapp_session');
  if (to.meta.requiresAuth && !authed) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;
