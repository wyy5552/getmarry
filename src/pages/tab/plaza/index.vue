<template>
  <view class="home">
    <!--广告栏-->
    <swiper class="swiper" circular :indicator-dots="true" :autoplay="true" :interval="2000" :duration="500">
      <swiper-item v-for="(item, index) in swiperList" :key="index">
        <image style="width: 100%; height: 200px; background-color: #eeeeee;" mode="scaleToFill" :src="item"></image>
      </swiper-item>
    </swiper>
    <!--上榜人员-->
    <view class="vip-box">
      <view class="title">
        <view class="right">置顶嘉宾</view>
        <view v-if="vipStatus == 4 || vipStatus == 2" class="left flex items-center justify-between"
          @click="clickAddVip">
          我要上榜<uni-icons type="plusempty" size="30" color="white"></uni-icons></view>
        <view v-if="vipStatus == 3" class="left flex items-center justify-between" @click="clickCancelVip">
          下榜</view>
      </view>
      <view class="flex items-center justify-between px-1.5rem">
        <user-vip-card @tap="clickGridHandler(item)" v-for="item in vipUserList" :item="item" :key="item.id">
        </user-vip-card>
      </view>
    </view>
    <!--推荐异性-->
    <view class="vip-box">
      <view class="title">
        <view class="right">推荐异性</view>
        <view class="left flex items-center justify-between" @click="onGetRecommendListHandler">刷新<uni-icons
            type="refreshempty" size="30" color="white"></uni-icons>
        </view>
      </view>
      <view class="girl-list-2 mt-1rem">
        <user-card @tap="clickGridHandler(item)" v-for="item in girlList" :item="item" :key="item.id">
        </user-card>
      </view>
    </view>
    <uni-popup ref="uToastRef" type="message">
      <uni-popup-message type="success" message="成功消息" :duration="2000"></uni-popup-message>
    </uni-popup>
  </view>
  <tabbar tab-value="pyq">
  </tabbar>
</template>

<script setup lang="ts">
import { UserInfoType } from "@/api/mock";
import request from "@/api/request";
import { reactive, ref } from "vue";
import tabbar from '@/components/tabbar/tabbar.vue';
import userUserStore from '@/store/modules/user/useUserStore';
import UserCard from './user-card.vue';
import UserVipCard from './user-vip-card.vue';

const userStore = userUserStore();
// 解构
const { role, userInfo, loginStatus } = storeToRefs(userStore);

const vipStatus = ref(0);
// 如果用户是红娘，则隐藏申请vip按钮
if (role.value === 1) {
  vipStatus.value = 1;
}
// 如果是用户
if (role.value === 0) {
  vipStatus.value = 0;
  // 如果用户未登录
  if (loginStatus.value === 0) {
    vipStatus.value = 2;
  }
  else {
    // 如果用户已经是vip
    if (userInfo.value.isVip == 2 ||  userInfo.value.isVip == 1) {
      // 显示取消vip按钮
      vipStatus.value = 3;
    } else {
      // 显示申请vip按钮
      vipStatus.value = 4;

    }
  }
}

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
  uni.navigateTo({
    url: '/pages/tab/user-info/user-info?item=' + encodeURIComponent(JSON.stringify(e)),
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


}
);
</script>
<style scoped lang="scss">
.vip-box {
  margin-top: 1rem;
  width: 100%;
  overflow: hidden;
  text-align: left;
  border-radius: 1.6rem 1.6rem 0 0;
  background-image: -webkit-linear-gradient(top, #fff, #f2f2f200);

  .title {
    display: flex;
    justify-content: space-between;
    align-items: start;
    position: relative;
    padding: 1rem 1.5rem 0 1.5rem;
    height: 3rem;

    .right {
      display: inline-block;
      font-size: 1.8rem;
      line-height: 2.4rem;
      font-weight: bold;
      color: #333;
      position: relative;

      &::after {
        background: -webkit-linear-gradient(315deg, rgba(255, 111, 111, 1) 0%, rgba(255, 111, 111, .01) 100%);
        content: '';
        position: absolute;
        height: .7rem;
        width: 2rem;
        display: block;
        border-radius: 2rem;
      }
    }

    .left {
      background: -webkit-linear-gradient(315deg, rgba(255, 111, 111, .4) 0%, rgba(255, 111, 111, .8) 100%);
      line-height: 2.4rem;
      padding: 0 .5rem 0 .9rem;
      border-radius: 1.4rem;
      color: #fff;
      font-size: 1.2rem;
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
    gap: 10px;
    width: 100%;
  }
}
</style>
