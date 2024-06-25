<template>
    <uni-list>
        <uni-list-item v-for="(item, index) in dataList" :key="index">
            <template v-slot:body>
                <member-collection-item :item="item" @tap="clickGridHandler(item)">
                </member-collection-item>
            </template>
        </uni-list-item>
        <button class="w-100%" @click="onClickMoreHandler">
            刷新
        </button>
    </uni-list>
</template>

<script setup lang="ts">
import request from '@/api/request';
import MemberCollectionItem from '@/pages/tab/user/member/member-collection-item.vue';
import { UserInfoType } from '@/store/modules/user/types';

const dataList = ref([] as UserInfoType[]);

const loadMore = () => {
    request.post<UserInfoType[]>('matchmaker/getRecommendList', null).then((res) => {
        dataList.value = res.data;
    });
};
const onClickMoreHandler = () => {
    loadMore();
};
onShow(() => {
    loadMore();
})
const clickGridHandler = (e: any) => {
    uni.navigateTo({
        url: '/pages/tab/user/matchmaker/vip-list-user-info?item=' + encodeURIComponent(JSON.stringify(e)),
    });
}
</script>