<template>
  <view class="user-container" :style="style">
    <Member v-if="loginStatus == 1 && role == 0">
    </Member>
    <Matchmaker v-if="loginStatus == 1 && role == 1">
    </Matchmaker>
    <view v-if="loginStatus == 0" class="btn-container">
      <view class="logo">
        Ai
      </view>
      <text class="intro">红豆生南国,春来发几枝~</text>
      <button class='mt-360rpx' type="primary" @click="onClickRegisterHandler">注册</button>
      <button class='login mt-40rpx' type="primary" @click="onClickLoginHandler">登录</button>
    </view>
  </view>
  <tabbar tab-value="person">
  </tabbar>
</template>
<script setup lang="ts">
import tabbar from '@/components/tabbar/tabbar.vue';
import Member from './member/member.vue';
import Matchmaker from './matchmaker/matchmaker.vue';
import envConfig from '@/api/envConfig';

import userUserStore from '@/store/modules/user/useUserStore';
const userStore = userUserStore();
// 解构
const { role, token, loginStatus } = storeToRefs(userStore);

uni.hideTabBar();
onMounted(async () => {
  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjEzMzgxNzAwMDAwIiwiaWF0IjoxNzE2OTA0MTkxLCJleHAiOjE3MTY5OTA1OTF9.PHc6PttpRzxIPLPn_dFovO2GxqTv3MThhLcUqagebd4";
  console.log('token', token.value);
  userStore.checkToken().then(async () => {
    console.log('loginStatus', loginStatus.value);
    await userStore.getUserInfo();
  }).catch(() => {
    console.log('token失效');
  });

});

const onClickLoginHandler = () => {
  uni.navigateTo({
    url: '/pages/user/login',
  });
}



const onClickRegisterHandler = () => {
  uni.navigateTo({
    url: '/pages/user/register'
  });
}

const baseUrl = envConfig.baseUrl;

// 定义css变量
const style = {
  '--bg-img': `url(${baseUrl + '/public/login-bg.png'})`
}
</script>
<style scoped lang="scss">
.user-container {
  width: 100%;
  height: 100vh;
  background-image: var(--bg-img);

  .btn-container {
    background-color: #FF6F6F00;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .logo {
      background-color: #FF5D97;
      height: 300rpx;
      width: 300rpx;
      border-radius: 60rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      line-height: 180rpx;
      font-size: 180rpx;
    }

    .intro {
      color: #ADB5BD;
      margin-top: 40rpx;
    }

    button {
      background-color: #FF92B9;
      width: 540rpx;
      height: 92rpx;
      border-radius: 100rpx;
      border: none;
    }

    .login {
      background-color: #FF5D97;
    }
  }

}
</style>
