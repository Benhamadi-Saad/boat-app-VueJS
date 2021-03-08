import '@/plugins/veevalidate';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';

Vue.config.silent = true;
Vue.use(Vuex);

Vue.use(Vuetify);

beforeEach(() => {
  jest.clearAllMocks();
});
