import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import Page403 from '../views/Page403.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  }, {
    path: '/error',
    name: '403',
    component: Page403,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
