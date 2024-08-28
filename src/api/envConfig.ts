// 封装uni-app的网络请求
let baseUrl = "";
let assetUrl = "";
// #ifdef VUE3
baseUrl = import.meta.env.VITE_APP_BASE_API as string;
assetUrl = import.meta.env.VITE_APP_ASSET_API as string;
// #endif

// #ifdef MP-WEIXIN
baseUrl = import.meta.env.VITE_WEIXIN_BASE_API as string;
assetUrl = import.meta.env.VITE_WEIXIN_ASSET_API as string;
// #endif

export default {
  baseUrl,
  assetUrl,
  iconsUrl: assetUrl + "/public/icons",
  headUrl: assetUrl + "/public",
  albumUrl: assetUrl + "/public",
};
