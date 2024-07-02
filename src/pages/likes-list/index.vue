<template>
    <uni-list>
        <uni-list-item @tap="clickGridHandler(item)" v-for="(item, index) in dataList" :key="index">
            <template v-slot:body>
                <match-user-list-card :item="item" :key="item.id" @tap="clickGridHandler(item)">
                </match-user-list-card>
            </template>
        </uni-list-item>
        <uni-load-more @clickLoadMore="onClickMoreHandler" :status="loadMoreStatus"></uni-load-more>
    </uni-list>
    <tabbar tab-value="likes-list">
    </tabbar>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { UserInfoType } from '@/store/modules/user/types';
import matchUserListCard from '../list/matchmaker/match-user-list-card.vue';
import request from '@/api/request';

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
});

const dataList = ref<UserInfoType[]>([]);
const loadMoreStatus = ref('more');

onLoad(() => {
    loadMore();
})

const loadMore = () => {
    request.post<UserInfoType[]>('matchmaker/getLoveList', form.value).then((res) => {
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
        url: '/pages/user-info/user-info?item=' + encodeURIComponent(JSON.stringify(e)),
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