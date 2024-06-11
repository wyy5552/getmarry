<template>
  <uni-drawer ref="leftDrawer" mask maskClick mode="left" :width="320">
    <view class="close">
      我爱中国
    </view>
  </uni-drawer>
  <view class="header">
    <view class="header-left">
      <uni-data-select v-model="form.height" placeholder="身高" :localdata="options.height" @change="onClickDropHandler"
        :clear="false"></uni-data-select>
      <uni-data-select v-model="form.age" placeholder="年龄" :localdata="options.age" @change="onClickDropHandler"
        :clear="false"></uni-data-select>
      <uni-data-select v-model="form.housing" placeholder="房子" :localdata="options.housing" @change="onClickDropHandler"
        :clear="false"></uni-data-select>
    </view>

    <!-- <view class="header-right" @click="fabClick">更多</view> -->
  </view>

  <uni-list>
    <uni-list-item @tap="clickGridHandler(item)" v-for="(item, index) in dataList" :key="index">
      <template v-slot:body>
        <user-list-card :item="item" :key="item.id" @tap="clickGridHandler(item)">
        </user-list-card>
      </template>
    </uni-list-item>
    <uni-load-more @clickLoadMore="onClickMoreHandler" :status="loadMoreStatus"></uni-load-more>
  </uni-list>
  <tabbar :is-user="true" :tab-index="1">
  </tabbar>
</template>

<script setup lang="ts">
import { UserInfoType } from '@/api/mock';
import request from '@/api/request';
import tabbar from '@/components/tabbar/tabbar.vue';

const leftDrawer = ref<any>(null);

// const fabClick = () => {
//   leftDrawer.value.open();
//   uni.showToast({
//     title: '点击了悬浮按钮',
//     icon: 'none'
//   });
// };

onTabItemTap((item) => {
  console.log('点击 Tab 项', item.index);
});

const onClickDropHandler = (e: any) => {
  console.log('onClickDropHandler', e);
  form.value.pageNo = 1;
  dataList.value = [];

  loadMore();
};
const onClickMoreHandler = () => {
  if (loadMoreStatus.value === 'noMore') {
    uni.showToast({
      title: '没有更多了',
      icon: 'none'
    });
    return;
  }
  loadMore();
};

// 筛选条件 height:身高 age:年龄 housing:房子
const options = {
  height: [
    { value: 0, text: "不限" },
    { value: 1, text: "150-160" },
    { value: 2, text: "160-170" },
    { value: 3, text: "170-180" },
    { value: 4, text: "180-190" },
    { value: 5, text: "190-200" },
  ],
  age: [
    { value: 0, text: "不限" },
    { value: 1, text: "18-25" },
    { value: 2, text: "25-30" },
    { value: 3, text: "30-35" },
    { value: 4, text: "35-40" },
    { value: 5, text: "40-45" },
  ],
  housing: [
    { value: 0, text: "不限" },
    { value: 1, text: "有房" },
    { value: 2, text: "无房" },
    { value: 3, text: "自建房" },
  ],
};
/** 搜索的筛选条件 */
const form = ref({
  pageNo: 1,
  pageSize: 10,
  height: 0,
  age: 0,
  housing: 0,
});

const dataList = ref<UserInfoType[]>([]);
const loadMoreStatus = ref('more');

onLoad(() => {
  loadMore();
})

const loadMore = () => {
  request.post<UserInfoType[]>('list/getUserListByTag', form.value).then((res) => {
    if (res.data.length > 0) {
      form.value.pageNo++;
      dataList.value = dataList.value.concat(res.data);
      if (res.data.length < form.value.pageSize) {
        loadMoreStatus.value = 'noMore';
      }
    }
  });
};
const clickGridHandler = (e: any) => {
  console.log(e);
  uni.navigateTo({
    url: '/pages/tab/user-info/user-info?item=' + encodeURIComponent(JSON.stringify(e)),
  });
}
</script>
<style scoped lang="scss">
.header {
  position: sticky;
  z-index: 100;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  &-left {
    display: flex;
    width: 100%;
    padding-right: 0.5rem;
    padding-left: 0.5rem;
  }

  &-right {
    background-color: #f29f9c;
    color: white;
    width: 20%;
    text-align: center;
    line-height: 1.8rem;
    border-radius: 0.9rem;
    height: 1.8rem;
    box-shadow: 0 0 0.5rem #f29f9c;

    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
