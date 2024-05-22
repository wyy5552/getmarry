/** 我的收藏列表 */
<template>
    <uni-list>
        <uni-list-item @tap="clickGridHandler(item)" v-for="(item, index) in dataList" :key="index">
            <template v-slot:body>
                <user-card :item="item">
                </user-card>
            </template>
        </uni-list-item>
        <uni-load-more @clickLoadMore="loadMore" :status="loadMoreStatus"></uni-load-more>
    </uni-list>
</template>
<script setup lang="ts">
import { getUserInfoListByTag } from '@/api/mock';

const loadMoreStatus = ref('more');
let pageNo = 1;
const pageSize = 10;
const dataList = ref(getUserInfoListByTag(pageNo, pageSize));

const loadMore = () => {
    pageNo++;
    dataList.value = dataList.value.concat(getUserInfoListByTag(pageNo, pageSize));
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