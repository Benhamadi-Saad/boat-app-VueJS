import { mdiDelete, mdiPencil } from '@mdi/js';
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdiSvg',
    values: {
      'mdi-delete': mdiDelete,
      'mdi-pencil': mdiPencil,
    },
  },
});
