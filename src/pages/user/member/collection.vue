<template>
    <uni-list>
        <uni-list-item v-for="(item, index) in dataList" :key="index">
            <template v-slot:body>
                <member-collection-item :item="item" @tap="clickGridHandler(item)">
                </member-collection-item>
            </template>
        </uni-list-item>
        <uni-load-more @clickLoadMore="onClickMoreHandler" :status="loadMoreStatus"></uni-load-more>
    </uni-list>
</template>

<script setup lang="ts">
import request from '@/api/request';
import MemberCollectionItem from '@/pages/user/member/member-collection-item.vue';
import { UserInfoType } from '@/store/modules/user/types';

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
    loadMore();
})
const clickGridHandler = (e: any) => {
    uni.navigateTo({
        url: '/pages/user-info/user-info?item=' + encodeURIComponent(JSON.stringify(e)),
    });
}
</script>