import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index.js';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import axios from './axios';
Vue.use(ElementUI);
Vue.config.productionTip = false;
import axios from './axios';
Vue.prototype.$axios = axios
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
