import Vue from 'vue';
import Vuex from 'vuex';
import App from './app/App.vue';
import vuetify from './plugins/vuetify';
import router from './app/app-router';

Vue.config.productionTip = false

Vue.use(Vuex);

const EventBus = new Vue();

Vue.prototype.$bus = EventBus

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
