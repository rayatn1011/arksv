import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/_bs-variables.scss'
import 'bootstrap'
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import axios from 'axios'

let app = createApp(App);
app.use(store);
app.use(router);
app.config.globalProperties.axios=axios;
app.use(VueLoading,{
    color: '#E24973',
    loader: 'bars', //spinner/dots/bars
});
app.mount('#app')
app.config.devtools = true;  
