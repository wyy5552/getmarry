<template>
  <view class="user-container">
    <Member v-if="loginStatus == 1 && role == 0">
    </Member>
    <Matchmaker v-if="loginStatus == 1 && role == 1">
    </Matchmaker>
    <view v-if="loginStatus == 0" class="btn-container">
      <button class="mt-8rem" type="primary" @click="onClickRegisterHandler">注册</button>
      <button class="mt-1rem" type="primary" @click="onClickLoginHandler">登录</button>
    </view>

  </view>
  <tabbar tab-value="person">
  </tabbar>
</template>
<script setup lang="ts">
import tabbar from '@/components/tabbar/tabbar.vue';
import Member from './member/member.vue';
import Matchmaker from './matchmaker/matchmaker.vue';

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

</script>
<style scoped lang="scss">
.user-container {
  width: 100%;
  height: 100%;



  .btn-container {
    background-color: #FF6F6F00;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    button {
      box-shadow: 0 .3rem .8rem rgba(255, 111, 111, .4);
      background-color: #fff;
      background: -webkit-linear-gradient(315deg, rgba(255, 111, 111, .6) 0%, #FF6F6F 100%);
      width: 80%;
      border-radius: 10rem;
      height: 5rem;
      line-height: 5rem;
      padding: 0 2.5rem;
      font-size: 1.8rem;
      vertical-align: middle;
    }
  }

}
</style>
