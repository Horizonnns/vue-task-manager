// Import our custom CSS
import './assets/scss/main.scss';

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

import router from './router';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import './assets/css/main.css';
import App from './App.vue';

createApp(App).use(router).use(createPinia()).mount('#app');
