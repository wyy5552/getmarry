// 封装uni-app的网络请求
let baseUrl = '';
// #ifdef VUE3
baseUrl = import.meta.env.VITE_APP_BASE_API as string;
// #endif

// #ifdef MP-WEIXIN
baseUrl = "https://www.nikee.top/api"
// #endif

export default {
    baseUrl
};