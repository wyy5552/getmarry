import { createSSRApp } from 'vue';

// 引入UnoCSS
import 'uno.css';
import "@/uni.scss";
import App from '@/App.vue';

// 引入状态管理
import setupStore from '@/store';

// #ifdef VUE3
export function createApp() {
  const app = createSSRApp(App);
  // 状态管理
  setupStore(app);
  return {
    app,
  };
}
// #endif
