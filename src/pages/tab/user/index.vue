<template>
  <view class="user-container">
    <Member v-if="loginStatus == 1 && role == 0">
    </Member>
    <view v-if="loginStatus == 0" class="btn-container">
      <button class="mt-8rem" type="primary" @click="onClickRegisterHandler">注册</button>
      <button class="mt-1rem" type="primary" @click="onClickLoginHandler">登录</button>
    </view>

  </view>
  <tabbar :is-user="true" :tab-index="2">
  </tabbar>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import tabbar from '@/components/tabbar/tabbar.vue';
import request from "@/api/request";
import { UserInfoType } from "@/api/mock";
import Member from './member/member.vue';

/** 会员信息 */

/** 登陆状态 0 未登录 1 已登录  */
const loginStatus = ref(0);
const role = ref(-1);

onMounted(async () => {
  loginStatus.value = 1;
  // 获取token
  const token = uni.getStorageSync('token');
  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjEzMzgxNzAwMDAwIiwiaWF0IjoxNzE2OTA0MTkxLCJleHAiOjE3MTY5OTA1OTF9.PHc6PttpRzxIPLPn_dFovO2GxqTv3MThhLcUqagebd4";
  console.log('token', token);
  try {
    // 判断是否有token
    if (token) {
      // 判断token是否过期
      let res = await request.get<any>('user/isTokenValid', null);
      // 保存token
      uni.setStorageSync('token', res.data.token);
      uni.$emit('loginSuccess');
      // 获取用户信息
    } else {
      // 清除token
      throw new Error("token不存在")
    }
  } catch (err: any) {
    uni.removeStorageSync('token');
    loginStatus.value = 0;
  }
});

const onClickLoginHandler = () => {
  uni.navigateTo({
    url: '/pages/tab/user/login',
  });
}

const loginSuccess = async () => {
  let res = await request.post<UserInfoType>('member/userInfo', null);
  const user = res.data;
  uni.setStorageSync('userInfo', JSON.stringify(res.data));
  loginStatus.value = 1;
  role.value = (user.role);
}
uni.$on('loginSuccess', loginSuccess);


const onClickRegisterHandler = () => {
  uni.navigateTo({
    url: '/pages/tab/user/register'
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
