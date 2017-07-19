import Vue from 'vue';
import App from './App';
import good from './components/good/good.vue';
import comments from './components/ratings/comments.vue';
import seller from './components/seller/seller.vue';
Vue.use(VueRouter);
Vue.use(VueResource);
const routes = [
  {path: '/', redirect: '/goods'},
  { path: '/goods', component:good,name:'good'},
  { path: '/comments', component:comments,name:"comments"},
  { path: '/seller', component:seller,name:'seller'}
];
const router = new VueRouter({
  mode: 'hash',
  linkActiveClass:'current',
  routes // （缩写）相当于 routes: routes
});
new Vue({
  router,
  el: "#app",
  render: h => h(App)
}).$mount('#app');
