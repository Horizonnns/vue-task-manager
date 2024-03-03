// Import our custom CSS
import './assets/scss/main.scss';

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

import router from './router';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import './assets/css/main.css';
import App from './App.vue';

import { createI18n } from 'vue-i18n';
import messages from '@intlify/unplugin-vue-i18n/messages';

const i18n = createI18n({
	legacy: false,
	globalInjection: true,
	locale: 'ru',
	fallbackLocale: 'en',
	availableLocales: ['en', 'ru'],
	messages: messages,
});

createApp(App).use(router).use(i18n).use(createPinia()).mount('#app');
