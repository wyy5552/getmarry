<template>
  <view class="plaza-home">
    <!--广告栏-->
    <swiper class="swiper" circular :indicator-dots="true" :autoplay="true" :interval="2000" :duration="500">
      <swiper-item v-for="(item, index) in swiperList" :key="index">
        <image style="width: 100%; height: 200px; background-color: #eeeeee;" mode="scaleToFill" :src="item"></image>
      </swiper-item>
    </swiper>
    <view class="plaza-content">
      <!--上榜人员-->
      <view class="card">
        <view class="title">
          <view class="left">置顶嘉宾</view>
          <view v-if="role == 0 || vipStatus == -1">
            <view v-if="vipStatus == 0" class="right" @click="clickAddVip">
              我要上榜<uni-icons type="plusempty" size="30" color="white"></uni-icons></view>
            <view v-else-if="vipStatus == 1" class="right2 ">
              VIP申请中</view>
            <view v-else-if="vipStatus == 2" class="right3" @click="clickCancelVip">
              下榜</view>
          </view>

        </view>
        <view class="flex items-center justify-between px-1.5rem">
          <user-vip-card @tap="clickGridHandler(item)" v-for="item in vipUserList" :item="item" :key="item.id">
          </user-vip-card>
        </view>
      </view>
      <!--推荐异性-->
      <view class="card">
        <view class="title">
          <view class="left">推荐异性</view>
          <view class="right" @click="onGetRecommendListHandler">刷新<uni-icons type="refreshempty" size="30"
              color="white"></uni-icons>
          </view>
        </view>
        <view class="girl-list-2 ">
          <user-card @tap="clickGridHandler(item)" v-for="item in girlList" :item="item" :key="item.id">
          </user-card>
        </view>
      </view>
    </view>

    <uni-popup ref="uToastRef" type="message">
      <uni-popup-message type="success" message="成功消息" :duration="2000"></uni-popup-message>
    </uni-popup>
  </view>
  <view class="bottom-height"></view>
  <tabbar tab-value="pyq">
  </tabbar>
</template>

<script setup lang="ts">
import type { UserInfoType } from '@/store/modules/user/types';
import request from "@/api/request";
import { reactive, ref } from "vue";
import tabbar from '@/components/tabbar/tabbar.vue';
import userUserStore from '@/store/modules/user/useUserStore';
import UserCard from './user-card-plaza.vue';
import UserVipCard from './user-vip-card.vue';

const userStore = userUserStore();
// 解构
const { role, userInfo } = storeToRefs(userStore);
// 0 普通 1 申请中 2 vip -1 用户未登录
const vipStatus = computed(() => {
  console.log(userInfo.value.isVip);

  return userInfo.value.isVip ?? 0;
});

// 使用 reactive 创建响应式数组  
const swiperList = reactive([
  'https://cdn.uviewui.com/uview/swiper/swiper1.png',
  'https://cdn.uviewui.com/uview/swiper/swiper2.png',
  'https://cdn.uviewui.com/uview/swiper/swiper3.png',
]);

//==================vip==================================

const clickAddVip = (e: any) => {
  console.log(e);
  request.post<any>('plaza/applyVip', null).then((res) => {
    if (res.code === 200) {
      uni.showToast({
        title: '申请成功',
        icon: 'success'
      });
      userStore.getUserInfo();
    }
  }).then(res => {
    console.log(res);
  });
}
const clickCancelVip = (e: any) => {
  console.log(e);
  request.post<any>('plaza/cancelVip', null).then((res) => {
    if (res.code === 200) {
      uni.showToast({
        title: '取消成功',
        icon: 'success'
      });
      onGetRecommendListHandler();
      userStore.getUserInfo();
    }
  }).then(res => {
    console.log(res);
  });
}
const vipUserList = ref<UserInfoType[]>([]);

// 创建对子组件的引用  
const uToastRef = ref(null);
//==================异性==================================
const onGetRecommendListHandler = () => {
  request.post<any>('plaza/getRecommendList', null).then((res) => {
    if (res.code === 200) {
      girlList.value = res.data;
    }
  }).then(res => {
    console.log(res);
  })
}
const clickGridHandler = (e: any) => {
  userStore.optUserInfo = e;
  uni.navigateTo({
    url: '/pages/user-info/user-info'
  });
}
const girlList = ref<UserInfoType[]>([]);

onShow(() => {
  request.get<any>('plaza/getVipList', null).then((res) => {
    if (res.code === 200) {
      vipUserList.value = res.data;
    }
  }).then(res => {
    console.log(res);
  });
  onGetRecommendListHandler();
  userStore.getUserInfo();


}
);
</script>
<style scoped lang="scss">
.plaza-home {
  width: 100%;
}

.plaza-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.card {
  margin-top: $margin-y;

  .title {
    display: flex;
    justify-content: space-between;

    .right {
      background-color: $color-red-1;
      border-radius: $radius;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16rpx;
      font-size: $font-size;
      height: 60rpx;
      width: 200rpx;
    }

    .right2 {
      background-color: $color-blue;
      border-radius: $radius;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16rpx;
      font-size: $font-size;
      height: 60rpx;
      width: 150rpx;
    }

    .right3 {
      background-color: $color-yellow;
      border-radius: $radius;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16rpx;
      font-size: $font-size;
      height: 60rpx;
      width: 70rpx;
    }

    .left {
      font-weight: bold;
      align-items: center;
      font-size: $font-big;
      color: $color-text-1;
    }
  }

  .girl-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .girl-list-2 {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    margin-top: $margin-y;
    gap: 10rpx;
  }
}
</style>
