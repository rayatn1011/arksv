import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import axios from 'axios'

let app = createApp(App);
app.use(store);
app.use(router);
app.config.globalProperties.axios=axios;
app.mount('#app')