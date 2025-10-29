import { createApp } from 'vue';
import App from './App.vue';

import router from './router'; // must exist and export the router
import store from './store';   // must exist and export the store

createApp(App)
  .use(router)
  .use(store)
  .mount('#app');
