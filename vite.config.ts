import { resolve } from "node:path";
import { defineConfig } from "vite";
import type { UserConfig } from "vite";
import createVitePlugins from "./build/vite/plugins";

// https://vitejs.dev/config/
export default defineConfig((): UserConfig => {
  const isBuild = process.env.NODE_ENV === "production";
  return {
    resolve: {
      // https://cn.vitejs.dev/config/#resolve-alias
      alias: {
        // 设置别名
        "@": resolve(__dirname, "./src"),
      },
    },
    // vite 相关配置
    server: {
      port: 5173,
      host: true,
      open: true,
      proxy: {
        // 选项写法
        "/api": {
          target: "http://localhost:3000",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
        "/public": {
          // 将/public路径下的请求转发到http://localhost:3000
          target: "http://localhost:3000/",
          changeOrigin: true,
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/static/styles/common.scss";`,
        },
      },
    },
    build: {
      target: "es2015", // 输出ES6代码
      minify: false, // 不进行代码压缩
    },
    plugins: createVitePlugins(isBuild),
  };
});
