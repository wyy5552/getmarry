<template>
    <uni-list>
        <uni-list-item @tap="clickGridHandler(item)" v-for="(item, index) in dataList" :key="index">
            <template v-slot:body>
                <user-card :item="item">
                </user-card>
            </template>
        </uni-list-item>
        <uni-load-more @clickLoadMore="onClickMoreHandler" :status="loadMoreStatus"></uni-load-more>
    </uni-list>
</template>

<script setup lang="ts">
import { UserInfoType } from '@/api/mock';
import request from '@/api/request';

const loadMoreStatus = ref('more');
/** 搜索的筛选条件 */
const form = {
    pageNo: 1,
    pageSize: 10,
};
const dataList = ref([] as UserInfoType[]);

const loadMore = () => {
    request.post<UserInfoType[]>('user/getLikesUserList', form).then((res) => {
        if (res.data.length > 0) {
            form.pageNo++;
            dataList.value = dataList.value.concat(res.data);
            if (res.data.length < form.pageSize) {
                loadMoreStatus.value = 'noMore';
            }
        }
    });
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
onLoad(() => {
    loadMore();
})
const clickGridHandler = (e: any) => {
    console.log(e);
    uni.navigateTo({
        url: '/pages/tab/user-info/user-info?item=' + encodeURIComponent(JSON.stringify(e)),
    });
}
</script>