<template>
    <view class="header">
        <view class="header-left">
            <uni-data-select v-model="form.authStatus" placeholder="所有会员" :localdata="options.auth"
                @change="onClickDropHandler" :clear="false"></uni-data-select>
            <uni-data-select v-model="form.vipStatus" placeholder="所有会员" :localdata="options.vip"
                @change="onClickDropHandler" :clear="false"></uni-data-select>
            <uni-data-select v-model="form.recommendStatus" placeholder="所有会员" :localdata="options.recommend"
                @change="onClickDropHandler" :clear="false"></uni-data-select>
        </view>
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
    <tabbar tab-value="list">
    </tabbar>
</template>

<script setup lang="ts">
import { UserInfoType } from '@/api/mock';
import request from '@/api/request';
import tabbar from '@/components/tabbar/tabbar.vue';
import UserListCard from './match-user-list-card.vue';
import useUserStore from '@/store/modules/user/useUserStore';

const userStore = useUserStore();


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

// 筛选条件
const options = {
    auth: [
        { value: 999, text: "所有会员" },
        { value: 0, text: "待认证会员" },
        { value: 1, text: "认证会员" },
    ],
    vip: [
        { value: 999, text: "所有会员" },
        { value: 0, text: "普通会员" },
        { value: 1, text: "vip申请中" },
        { value: 2, text: "vip会员" },
    ],
    recommend: [
        { value: 999, text: "所有会员" },
        { value: 0, text: "未推荐" },
        { value: 1, text: "推荐会员" },
    ],
};
/** 搜索的筛选条件 */
const form = ref({
    pageNo: 1,
    pageSize: 10,
    /** 认证状态 */
    authStatus: 999,
    /** vip状态  */
    vipStatus: 999,
    /** 推荐状态 */
    recommendStatus: 999,
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
    }>('list/getMatchMakerUserListByTag', form.value).then((res) => {
        if (res.data.list.length > 0) {
            form.value.pageNo++;
            dataList.value = dataList.value.concat(res.data.list);
            if (res.data.total <= form.value.pageSize) {
                loadMoreStatus.value = 'noMore';
            }
        }
    });
};
const clickGridHandler = (e: any) => {
    console.log(e);
    userStore.optUserInfo = e;
    uni.navigateTo({
        url: '/pages/list/matchmaker/match-user-info',
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