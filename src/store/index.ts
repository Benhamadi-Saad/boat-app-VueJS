import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from './model';
import boat from './modules/boat';

Vue.use(Vuex);

const strict = process.env.NODE_ENV !== 'production';

const storeOptions: StoreOptions<RootState> = {
  state: {} as RootState,
  modules: {
    boat,
  },
  strict,
};

const store = new Vuex.Store<RootState>(storeOptions);

export default store;
