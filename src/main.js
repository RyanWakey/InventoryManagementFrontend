import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'; // Import the store you just created

const app = createApp(App)
app.use(router) // Use Vue Router
app.use(store) // Use Vuex store
app.mount('#app')
