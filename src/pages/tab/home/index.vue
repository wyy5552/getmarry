<template>
  <view class="flex flex-col ">
    <!--广告栏-->
    <up-swiper :list="swiperList" @click="clickSwiper"></up-swiper>
    <!--上榜人员-->
    <view>
      <view class="flex justify-between">
        <text>置顶嘉宾</text>
        <view @click="clickAddVip" class="flex items-center">我要上榜<up-icon name="plus-circle"></up-icon></view>
      </view>
      <up-grid :border="false" col="2">
        <up-grid-item :key="index" v-for="(item, index) in vipUserList">
          <user-card :item="item">
          </user-card>
        </up-grid-item>
      </up-grid>
    </view>
    <!--推荐异性-->
    <view>
      <view class="flex justify-between">
        <text>推荐异性</text>
        <view flex items-center>刷新<up-icon name="reload"></up-icon></view>
      </view>
      <up-grid :border="false" @click="clickGirlTabs" col="2">
        <up-grid-item v-for="(item, baseListIndex) in girlList" :key="baseListIndex">
          <user-card :item="item">
          </user-card>
        </up-grid-item>
      </up-grid>
      <up-toast ref="uToastRef" />
    </view>
    <!-- #ifdef MP-WEIXIN -->
    <!-- 隐私协议组件 -->
    <agree-privacy v-model="showAgreePrivacy" :disable-check-privacy="false" @agree="handleAgree" />
    <!-- #endif -->
    <up-toast ref="uToastRef" />
  </view>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store';
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
const clickGirlTabs = (e: any) => {
  console.log(e);
}
const girlList = ref(getVipList());

const title = ref<string>();
title.value = import.meta.env.VITE_APP_TITLE;

const store = useUserStore();
console.log('store.user_name', store.user_name);

const showAgreePrivacy = ref(false);
// 同意隐私协议
function handleAgree() {
  console.log('同意隐私政策');
}
</script>
