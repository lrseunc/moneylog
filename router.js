import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/login.vue'; // Ensure this path is correct
import Register from './components/register.vue';
import Home from './components/home.vue';
import Personal from './components/personal.vue';
import Groupview from './components/groupview.vue';
import View from './components/view.vue';
import Group from './components/group.vue';
import Profile from './components/profile.vue'; 

const routes = [
  { path: '/', redirect: '/login' }, 
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/home', component: Home },
  { path: '/personal', component: Personal },
  { path: '/groupview', component: Groupview },
  { path: '/view', component: View },
  { path: '/group', component: Group },
  { path: '/profile', component: Profile },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router; // Fix export
