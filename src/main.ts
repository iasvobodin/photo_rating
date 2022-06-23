import { createApp } from 'vue'
import '../public/neutralino.js';
import App from './App.vue'

const app = createApp(App);

app.mount('#app');

Neutralino.init();