<template>
  <view class="flex flex-col ">
    <!--广告栏-->
    <up-swiper :list="swiperList" @click="clickSwiper"></up-swiper>
    <swiper class="swiper" circular :indicator-dots="true" :autoplay="true" :interval="2000" :duration="500">
      <swiper-item v-for="(item, index) in swiperList" :key="index">
        <image style="width: 100%; height: 200px; background-color: #eeeeee;" mode="scaleToFill" :src="item"></image>
      </swiper-item>
    </swiper>
    <!--上榜人员-->
    <view>
      <view class="flex justify-between">
        <text>置顶嘉宾</text>
        <view @click="clickAddVip" class="flex items-center">我要上榜<up-icon name="plus-circle"></up-icon></view>
      </view>
      <uni-grid :showBorder="false" :square="false" :column="3">
        <uni-grid-item @tap="clickGridHandler(item)" :key="index" v-for="(item, index) in vipUserList">
          <user-card :item="item">
          </user-card>
        </uni-grid-item>
      </uni-grid>
    </view>
    <!--推荐异性-->
    <view>
      <view class="flex justify-between">
        <text>推荐异性</text>
        <view flex items-center>刷新<up-icon name="reload"></up-icon></view>
      </view>
      <uni-grid :showBorder="false" :square="false" :column="3">
        <uni-grid-item @tap="clickGridHandler(item)" v-for="(item, baseListIndex) in girlList"
          :key="baseListIndex">
          <user-card :item="item">
          </user-card>
        </uni-grid-item>
      </uni-grid>
    </view>
    <uni-popup ref="uToastRef" type="message">
      <uni-popup-message type="success" message="成功消息" :duration="2000"></uni-popup-message>
    </uni-popup>
  </view>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { ref } from 'vue';
import { getVipList } from '@/api/mock';

// 使用 reactive 创建响应式数组  
const swiperList = reactive([
  'https://cdn.uviewui.com/uview/swiper/swiper1.png',
  'https://cdn.uviewui.com/uview/swiper/swiper2.png',
  'https://cdn.uviewui.com/uview/swiper/swiper3.png',
]);

const clickSwiper = (e: any) => {
  console.log(e);
}

//==================vip==================================

const clickAddVip = (e: any) => {
  console.log(e);
}
const vipUserList = ref(getVipList().slice(0, 2));


// 创建对子组件的引用  
const uToastRef = ref(null);
//==================异性==================================
const clickGridHandler = (e: any) => {
  console.log(e);
  uni.navigateTo({
    url: '/pages/tab/user-info/user-info?item=' + encodeURIComponent(JSON.stringify(e)),
  });
}
const girlList = ref(getVipList());

const title = ref<string>();
title.value = import.meta.env.VITE_APP_TITLE;

const showAgreePrivacy = ref(false);
// 同意隐私协议
function handleAgree() {
  console.log('同意隐私政策');
}
</script>
