import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/login.vue'; // Ensure this path is correct
import Register from './components/register.vue';
import Home from './components/home.vue';
import Personal from './components/personal.vue';
import View from './components/view.vue';
import Groupview from './components/groupview.vue';



const routes = [
  { path: '/', redirect: '/login' }, 
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/home', component: Home },
  { path: '/personal', component: Personal },
  { path: '/view', component: View },
  { path: '/groupview', component: Groupview },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router; // Fix 
