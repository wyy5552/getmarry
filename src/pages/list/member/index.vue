<template>
  <view class="page1">
    <view class="header">
      <uni-data-select v-model="form.height" placeholder="身高" :localdata="options.filterOptions.height"
        @change="onClickDropHandler" :clear="false"></uni-data-select>
      <uni-data-select v-model="form.age" placeholder="年龄" :localdata="options.filterOptions.age"
        @change="onClickDropHandler" :clear="false"></uni-data-select>
      <uni-data-select v-model="form.housing" placeholder="房子" :localdata="options.filterOptions.housing"
        @change="onClickDropHandler" :clear="false"></uni-data-select>
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
    <view class="bottom-height"></view>
    <tabbar tab-value="list">
    </tabbar>
  </view>

</template>

<script setup lang="ts">
import options from "@/utils/userInfoOptions"
import request from '@/api/request';
import tabbar from '@/components/tabbar/tabbar.vue';
import UserListCard from './user-list-card.vue';
import useUserStore from '@/store/modules/user/useUserStore';
import { UserInfoType } from '@/store/modules/user/types'

const userStore = useUserStore();


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
  request.post<{
    list: UserInfoType[], pageNo,
    pageSize,
    height,
    age,
    housing,
    total,
  }>('list/getUserListByTag', form.value).then((res) => {
    if (res.data.list.length > 0) {
      form.value.pageNo++;
      dataList.value = dataList.value.concat(res.data.list);
      if (res.data.total < form.value.pageSize) {
        loadMoreStatus.value = 'noMore';
      }
    }
  });
};
const clickGridHandler = (e: any) => {
  userStore.optUserInfo = e;
  uni.navigateTo({
    url: '/pages/user-info/user-info',
  });
}
</script>
<style scoped lang="scss">
.header {
  position: sticky;
  z-index: 100;
  top: 30rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30rpx;
}



:deep(.uni-stat__select) {
  margin-top: 24rpx;

  .uni-stat-box {
    width: 200rpx;
    flex: none;
  }

  width: 200rpx;
  flex: none;

  .uniui-bottom:before {
    color: white;
  }
}

:deep(.uni-select) {
  border: none !important;
  background-color: #FF92B9;
  border-radius: 100rpx;

  //加粗
  font-weight: bold;

  .uni-select__input-text {
    color: white !important;
  }


}

:deep(.uni-list) {
  .uni-list--border-top {
    display: none;
  }

  background-color: rgba(255, 111, 111, 0);
  display:flex;
  flex-direction: column;
  align-items: center;


  .uni-list-item {
    padding: 0;

    .uni-list--border {
      display: none;
    }

    .uni-list-item__container {
      padding: 0;
    }

    .card {
      margin-top: 0;
    }

    background-color: #fff;
    width: $container-width;
    margin-top: 24rpx;
    border-radius: 60rpx;
  }
}
</style>