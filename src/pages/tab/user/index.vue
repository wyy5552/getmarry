<template>
  <view class="user-container">
    <view v-if="loginStatus == 1" class="has-user-info">
      <view class="user-info-header">
        <view class="flex">
          <image src="https://www.8520y.cn/up/p/m/2024/05/101034_1715327064586_m.jpg" mode="scaleToFill" />
          <view class="h-full my-auto ml-1rem">
            <view class="flex font-bold text-1rem">
              <view>{{ userInfo.name + " " }}</view>
              <view>——{{ userInfo.nickname + " " }}</view>
              <view>——{{ userInfo.gender == 0 ? "男" : "女" }}</view>
            </view>
            <view class="mt-1rem opacity-90">{{ birthday + " · " + userInfo.height + "cm · " + userInfo.education }}
            </view>
          </view>
        </view>
      </view>
      <view class="card">
        <view class="one-line" @tap="clickMyCollectionHandler">
          <view>我的收藏</view>
          <view>></view>
        </view>
        <view class="one-line">
          <view>我的相册</view>
          <view>></view>
        </view>
        <view class="one-line" @tap="clickEditHandler">
          <view>个人信息登记</view>
          <view>></view>
        </view>
      </view>
      <view class="card">
        <view class="one-line">我的红娘</view>
        <view class="one-line">手机号：1333333</view>
        <view class="one-line">微信：</view>
      </view>
      <button type="primary" @click="submit('customForm')">退出登录</button>
      <button type="primary" @click="submit('customForm')">注销账号</button>
    </view>
    <view v-if="loginStatus == 0" class="btn-container">
      <button class="mt-8rem" type="primary" @click="onClickRegisterHandler">注册</button>
      <button class="mt-1rem" type="primary" @click="onClickLoginHandler">登录</button>
    </view>

  </view>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const userInfo = ref<any>({});
// 登陆状态 0 未登录 1 登录
const loginStatus = ref(0);

onMounted(() => {
  loginStatus.value = 1;
  // 获取token
  // const token = uni.getStorageSync('token');
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjEzMzgxNzAwMDAwIiwiaWF0IjoxNzE2OTA0MTkxLCJleHAiOjE3MTY5OTA1OTF9.PHc6PttpRzxIPLPn_dFovO2GxqTv3MThhLcUqagebd4";
  uni.setStorageSync('token', token);
  console.log('token', token);
  // 判断是否有token
  if (token) {
    // 判断token是否过期
    uni.request({
      url: 'http://localhost:3000/isTokenValid',
      method: 'GET',
      data: {
        token
      },
      success: (res) => {
        console.log(res);
        if (res.data.code === 200) {
          // 保存token
          uni.setStorageSync('token', res.data.data.token);
          // 获取用户信息
          getUserInfo().then(res => {
            userInfo.value = res as any;
          });
        }
        else {
          uni.removeStorageSync('token');
          loginStatus.value = 0;
        }
      },
      fail: (fail) => {
        loginStatus.value = 0;
        // 清除token
        uni.removeStorageSync('token');
      },
    });
  }
  else {
    uni.removeStorageSync('token');
    loginStatus.value = 0;
  }

});
const onClickLoginHandler = () => {
  uni.navigateTo({
    url: '/pages/tab/user/login',
    events: {
      // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
      acceptDataFromOpenedPage: function (data) {
        if (data == 'success') {
          loginStatus.value = 1;
          getUserInfo().then(res => {
            userInfo.value = res as any;
          });
        }
      },
    }
  });
}
const getUserInfo = async () => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: 'http://localhost:3000/userInfo',
      method: 'POST',
      header: {
        'token': uni.getStorageSync('token') //自定义请求头信息
      },
      success: (res) => {
        console.log(res.data);
        resolve(res.data.data);
      },
      fail: (fail) => {
        reject(fail);
      },
    });
  });
}


const birthday = computed(() => {
  const birthDate = new Date(userInfo.value.birthday);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age + "岁";
})


const onClickRegisterHandler = () => {
  uni.navigateTo({
    url: '/pages/tab/user/register'
  });
}


const clickMyCollectionHandler = (e: any) => {
  console.log(e);
  uni.navigateTo({
    url: '/pages/tab/user/collection'
  });
}
const clickEditHandler = (e: any) => {
  console.log(e);
  uni.navigateTo({
    url: '/pages/tab/user/edit'
  });
}
</script>
<style scoped lang="scss">
.user-container {
  width: 100%;
  height: 100%;

  .has-user-info {
    button {
      box-shadow: 0 .3rem .8rem rgba(255, 111, 111, .4);
      background-color: #fff;
      background: -webkit-linear-gradient(315deg, rgba(255, 111, 111, .6) 0%, #FF6F6F 100%);
      width: 80%;
      border-radius: 10rem;
      height: 3rem;
      line-height: 3rem;
      padding: 0 2.5rem;
      font-size: 1.8rem;
      vertical-align: middle;
      margin: 1rem auto;
      opacity: 0.3;
    }

    .user-info-header {
      position: relative;
      width: 100%;
      text-align: left;
      padding: 1rem 1rem;

      image {
        width: 6rem;
        height: 6rem;
        border-radius: 50%;
        display: block;
        object-fit: cover;
        border: white .4rem solid;
        box-shadow: .3rem .5rem 1rem rgba(0, 0, 0, .06);
      }

      .right {
        width: 60%;
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .card {
      margin: 0 0.5rem 1rem 0.5rem;
      padding: 0.5rem;
      background-color: white;
      border-radius: 0.5rem;
      box-shadow: 0 0.1rem 0.1rem rgba(0, 0, 0, 0.1);

      .one-line {
        display: flex;
        justify-content: space-between;
        height: 2rem;
        line-height: 3rem;
        border-bottom: 0.1rem solid #f2f2f2;
        align-items: center;

        &:last-child {
          border-bottom: none;
        }
      }

    }
  }

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
