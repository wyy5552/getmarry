<template>
  <view class="w-full h-full bg-white">
    <view v-if="loginStatus == 1">
      <user-card :item="userInfo">
      </user-card>
      <view class="bg-white rounded-4px mx-12px my-6px p-10px">
        <view class="flex justify-between" @tap="clickMyCollectionHandler">
          <view>我的收藏</view>
          <view>></view>
        </view>
        <view class="flex justify-between">
          <view>我的相册</view>
          <view>></view>
        </view>
        <view class="flex justify-between" @tap="clickEditHandler">
          <view>个人信息登记</view>
          <view>></view>
        </view>
      </view>
      <view class="bg-white rounded-4px mx-12px my-6px p-10px">
        <view>我的红娘</view>
        <view>手机号：1333333</view>
        <view>微信：</view>
      </view>
      <button type="primary" @click="submit('customForm')">退出登录</button>
      <button type="primary" @click="submit('customForm')">注销账号</button>
    </view>
    <view v-if="loginStatus == 0">
      <button type="primary" @click="onClickLoginHandler">登录</button>
      <button type="primary" @click="onClickRegisterHandler">注册</button>
    </view>

  </view>
</template>
<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue';
import { getUserInfoListByTag } from '@/api/mock';

const userInfo = ref(getUserInfoListByTag(1, 1)[0]);
// 登陆状态 0 未登录 1 登录
const loginStatus = ref(0);

// 获取本机的登录用户信息
// uni app 获取localStorage
onMounted(() => {
  // 获取本机的登录用户信息
  // uni app 获取localStorage
  const userInfo = uni.getStorageSync('userInfo');
  loginStatus.value = 0;
  // 判断是否有用户信息
  if (userInfo) {
    // 判断是否过期
    // 如果过期，重新登录
    // 如果没有过期，显示用户信息
  } else {
    // 显示登录or注册页面
    loginStatus.value = 0;
  }
  // 登录成功后，显示用户信息
});
const onClickLoginHandler = () => {
  uni.navigateTo({
    url: '/pages/tab/user/login',
    events: {
      // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
      acceptDataFromOpenedPage: function (data) {
        if (data == 'success') {
          loginStatus.value = 1;
        }
      },
    }
  });
}

const onClickRegisterHandler = () => {
  uni.navigateTo({
    url: '/pages/tab/user/register'
  });
}


const clickMyCollectionHandler = (e: any) => {
  console.log(e);
  uni.navigateTo({
    url: '/pages/tab/user/my-collection'
  });
}
const clickEditHandler = (e: any) => {
  console.log(e);
  uni.navigateTo({
    url: '/pages/tab/user/register'
  });
}
</script>
