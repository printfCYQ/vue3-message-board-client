import '@/styles/index.scss';
import mitt from 'mitt';
import "nprogress/nprogress.css"; // 进度条组件
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import 'uno.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
const Mit = mitt()
const store = createPinia()
const app = createApp(App)

declare module 'vue' {
    export interface ComponentCustomProperties {
        $Bus: typeof Mit
    }
}

store.use(piniaPluginPersistedstate)

app.config.globalProperties.$Bus = Mit
app.use(router)
app.use(store)
app.mount('#app')
