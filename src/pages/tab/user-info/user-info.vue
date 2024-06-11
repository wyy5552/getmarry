<template>
    <view class="bg-white min-h-100vh">
        <image class="img" src="https://www.8520y.cn/up/p/m/2024/05/101034_1715327064586_m.jpg" mode="aspectFill" />
        <view class="user-card">
            <view>
                <view class="font-bold text-1rem">{{ userInfo.name + " " }}<text class="text-#f29f9c"
                        v-if="userInfo.gender == 0">♀</text><text class="text-#007aff" v-else>♂</text></view>
                <view class="mt-0.5rem opacity-90">{{ userInfo.registeredArea + " · " +
                    getEducationLabel(userInfo.education) }}</view>
                <view class="flex gap-1rem mt-0.5rem opacity-90">
                    <uni-tag type="warning" :text="getAge(userInfo.birthday) + ''"></uni-tag>
                    <uni-tag type="warning" :text="userInfo.height + 'cm'"></uni-tag>
                    <uni-tag type="warning" :text="userInfo.industry"></uni-tag>
                    <uni-tag type="warning" :text="userInfo.monthlyIncome + '万'"></uni-tag>
                </view>
            </view>
            <view>
                <uni-fav :contentText="{ contentDefault: '喜欢', contentFav: '已收藏' }" :checked="isSelect" :circle="true"
                    bg-color="#dd524d" bg-color-checked="#999" fg-color="#ffffff" fg-color-checked="#ffffff"
                    @click="favClick" />
            </view>
        </view>
        <view class="card">
            <view class="title">基本资料</view>
            <view class="content">
                <uni-tag :text="getGenderLabel(userInfo.gender)" inverted></uni-tag>
                <uni-tag :text="userInfo.weight + 'kg'" inverted></uni-tag>
                <uni-tag :text="getHousingLabel(userInfo.housing)" inverted></uni-tag>
                <uni-tag :text="getCarOwnershipLabel(userInfo.carOwnership)" inverted></uni-tag>
                <uni-tag :text="getEducationLabel(userInfo.education)" inverted></uni-tag>
                <uni-tag :text="userInfo.registeredArea" inverted></uni-tag>
                <uni-tag :text="getMarriageTimeLabel(userInfo.expectedMarriageTime)" inverted></uni-tag>
                <view class="border-red border opacity-80 text-red-5" @click="onShowMoreHandler">查看更多></view>
            </view>
        </view>
        <view class="card">
            <view class="title">择偶要求</view>

            <view class="content">
                <uni-tag type="warning" :text="userInfo.maritalStatusRequirement ?? '未婚'" inverted></uni-tag>
                <uni-tag type="warning" :text="userInfo.ageRequirement ?? '上下三岁'" inverted></uni-tag>
                <uni-tag type="warning" :text="userInfo.heightRequirement ?? '无身高要求'" inverted></uni-tag>
                <uni-tag type="warning" :text="userInfo.incomeRequirement ?? '无收入要求'" inverted></uni-tag>
                <uni-tag type="warning" :text="userInfo.areaRequirement ?? '地区不限'" inverted></uni-tag>
                <uni-tag type="warning" :text="userInfo.otherRequirement ?? '看眼缘'" inverted></uni-tag>
            </view>
        </view>
        <view class="card">
            <view class="title">自我介绍</view>
            <view class="content"> {{ userInfo.introduction }}</view>
        </view>
        <view class="card">
            <view class="title">红娘点评</view>
            <view class="content"> {{ userInfo.matchmakerComment }}</view>
        </view>
        <view class="contact">
            <view class="item">
                <uni-icons type="phone" size="30"></uni-icons>
                红娘电话
            </view>
            <view class="item">
                <uni-icons type="weixin" size="30"></uni-icons>
                红娘微信
            </view>
        </view>

    </view>
</template>
<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import { UserInfoType } from '../../../api/mock';
import userInfoOptions from '@/utils/userInfoOptions';

import { getGenderLabel } from '@/utils/userInfoOptions';
import { getHousingLabel } from '@/utils/userInfoOptions';
import { getCarOwnershipLabel } from '@/utils/userInfoOptions';
import { getMarriageTimeLabel } from '@/utils/userInfoOptions';
import request from '@/api/request';

const { getEducationLabel, getAge } = userInfoOptions;

const userInfo = ref<UserInfoType>({} as unknown as UserInfoType);
onLoad((options: any) => {
    userInfo.value = JSON.parse(decodeURIComponent(options.item));;
    checkHasLiked();
});

const isSelect = ref(false);

const checkHasLiked = () => {
    // 从本地获取个人信息
    const selfInfo = JSON.parse(uni.getStorageSync('userInfo')) as UserInfoType;
    // 获取喜欢列表
    const likeList = selfInfo.likes?.split(',') ?? [];
    // 判断是否已经收藏
    isSelect.value = likeList.includes(userInfo.value.id + "");
}

// 获取个人信息
const getUserInfo = async () => {
    let res2 = await request.post<UserInfoType>('user/userInfo', null);
    uni.setStorageSync('userInfo', JSON.stringify(res2.data));
}
const favClick = async () => {
    try {
        await request.post<any>('list/likeUser', { userId: userInfo.value.id, isLike: !isSelect.value });
        isSelect.value = !isSelect.value;
        uni.showToast({
            title: isSelect.value ? "收藏成功！" : "取消收藏！",
            icon: 'none'
        });
        await getUserInfo();
    } catch {
        uni.showToast({
            title: "操作失败！",
            icon: 'none'
        });
    }
}

const onShowMoreHandler = () => {
    uni.navigateTo({
        url: '/pages/tab/user-info/user-info-more?item=' + encodeURIComponent(JSON.stringify(userInfo.value))
    });
}
</script>

<style scoped lang="scss">
.img {
    width: 100%;
    height: 300px;
}

.user-card {
    position: relative;
    height: 5rem;
    display: flex;
    justify-content: space-between;
    margin: 0.5rem;
    background-color: white;
}

.card {
    margin: 0 0.5rem;
    margin-bottom: 1rem;

    .title {
        font-size: 1rem;
        font-weight: bold;
        line-height: 1.5;
        margin-bottom: 0.5rem;

    }

    .content {
        border-left: rgba(255, 111, 111, .1) 1px solid;
        display: flex;
        flex-wrap: wrap;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        gap: 0.3rem;
    }
}

.contact {
    display: flex;
    justify-content: space-around;
    position: fixed;
    /* #ifdef H5 */
    left: var(--window-left);
    right: var(--window-right);
    /* #endif */
    bottom: 0;

    .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0.5rem;
        background-color: white;
        border-top: 1px solid #f29f9c;
        width: 50%;
    }

}
</style>