<template>
    <uni-list>
        <uni-list-item @tap="clickGridHandler(item)" v-for="(item, index) in dataList" :key="index">
            <template v-slot:body>
                <user-list-card :item="item" :key="item.id" @tap="clickGridHandler(item)">
                </user-list-card>
            </template>
        </uni-list-item>
        <uni-load-more @clickLoadMore="onClickMoreHandler" :status="loadMoreStatus"></uni-load-more>
    </uni-list>
</template>

<script setup lang="ts">
import request from '@/api/request';
import UserListCard from '@/pages/list/member/user-list-card.vue';
import { UserInfoType } from '@/store/modules/user/types';
import useUserStore from '@/store/modules/user/useUserStore';

const userStore = useUserStore();


const loadMoreStatus = ref('more');
/** 搜索的筛选条件 */
const form = {
    pageNo: 1,
    pageSize: 10,
};
const dataList = ref([] as UserInfoType[]);

const loadMore = () => {
    request.post<UserInfoType[]>('member/getLikesUserList', form).then((res) => {
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
onShow(() => {
    form.pageNo = 1;
    dataList.value = [];
    loadMore();
});

const clickGridHandler = (e: any) => {
    userStore.optUserInfo = e;
    uni.navigateTo({
        url: '/pages/user-info/user-info',
    });
};
</script>
<style scoped lang="scss">
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