import { createSSRApp } from 'vue';

// 引入UnoCSS
import 'uno.css';
import "@/uni.scss";
import App from '@/App.vue';
import { createPinia } from 'pinia';
// 引入状态管理
import piniaPersist from 'pinia-plugin-persist-uni';

// #ifdef VUE3
export function createApp() {
  const app = createSSRApp(App);
  const pinia = createPinia();
  pinia.use(piniaPersist);
  app.use(pinia);
  // 状态管理
  return {
    app,
  };
}
// #endif
