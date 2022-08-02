import { createApp } from 'vue'
import App from './App.vue'
import LoginView from './components/LoginView.vue';
import ChatView from './components/ChatView.vue';
const app = createApp(App);

app.component('LoginView', LoginView);
app.component('ChatView', ChatView);

app.mount('#app');
