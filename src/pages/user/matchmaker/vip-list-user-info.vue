<template>
    <view class="bg-white min-h-100vh">
        <image class="img" :src="otherUserInfo.userpic" mode="aspectFill" />
        <view class="user-card">
            <view>
                <view class="font-bold text-1rem">{{ otherUserInfo.name + " " }}<text class="text-#f29f9c"
                        v-if="otherUserInfo.gender == 0">♀</text><text class="text-#007aff" v-else>♂</text></view>
                <view class="mt-0.5rem opacity-90">{{ otherUserInfo.registeredArea + " · " +
            getEducationLabel(otherUserInfo.education) }}</view>
                <view class="flex gap-1rem mt-0.5rem opacity-90">
                    <uni-tag type="warning" :text="getAgeLabel(otherUserInfo.birthday) + ''"></uni-tag>
                    <uni-tag type="warning" :text="otherUserInfo.height + 'cm'"></uni-tag>
                    <uni-tag type="warning" :text="otherUserInfo.industry"></uni-tag>
                    <uni-tag type="warning" :text="otherUserInfo.monthlyIncome + '万'"></uni-tag>
                </view>
            </view>
            <view>
                <button @click="onPassHandler" class="mb-0.5rem" type="warn" plain="true">VIP申请通过</button>
                <button @click="onRejectHandler" type="default" plain="true">拒绝</button>
            </view>
        </view>
        <view class="card">
            <view class="title">基本资料</view>
            <view class="content">
                <uni-tag :text="getGenderLabel(otherUserInfo.gender)" inverted></uni-tag>
                <uni-tag :text="otherUserInfo.weight + 'kg'" inverted></uni-tag>
                <uni-tag :text="getHousingLabel(otherUserInfo.housing)" inverted></uni-tag>
                <uni-tag :text="getCarOwnershipLabel(otherUserInfo.carOwnership)" inverted></uni-tag>
                <uni-tag :text="getEducationLabel(otherUserInfo.education)" inverted></uni-tag>
                <uni-tag :text="otherUserInfo.registeredArea" inverted></uni-tag>
                <uni-tag :text="getMarriageTimeLabel(otherUserInfo.expectedMarriageTime)" inverted></uni-tag>
                <view class="border-red border opacity-80 text-red-5" @click="onShowMoreHandler">查看更多></view>
            </view>
        </view>
        <view class="card">
            <view class="title">择偶要求</view>

            <view class="content">
                <uni-tag type="warning" :text="otherUserInfo.maritalStatusRequirement ?? '未婚'" inverted></uni-tag>
                <uni-tag type="warning" :text="otherUserInfo.ageRequirement ?? '上下三岁'" inverted></uni-tag>
                <uni-tag type="warning" :text="otherUserInfo.heightRequirement ?? '无身高要求'" inverted></uni-tag>
                <uni-tag type="warning" :text="otherUserInfo.incomeRequirement ?? '无收入要求'" inverted></uni-tag>
                <uni-tag type="warning" :text="otherUserInfo.areaRequirement ?? '地区不限'" inverted></uni-tag>
                <uni-tag type="warning" :text="otherUserInfo.otherRequirement ?? '看眼缘'" inverted></uni-tag>
            </view>
        </view>
        <view class="card">
            <view class="title">自我介绍</view>
            <view class="content"> {{ otherUserInfo.introduction }}</view>
        </view>
        <view class="card">
            <view class="title">红娘点评</view>
            <view class="content"> {{ otherUserInfo.matchmakerComment }}</view>
        </view>
    </view>
</template>
<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import request from '@/api/request';
import userUserStore from '@/store/modules/user/useUserStore';
import userInfoOptions from '@/utils/userInfoOptions';
import type { UserInfoType } from '@/store/modules/user/types';

const userStore = userUserStore();

const { getEducationLabel, getGenderLabel, getHousingLabel, getAgeLabel, getMarriageTimeLabel, getCarOwnershipLabel } = userInfoOptions;

const otherUserInfo = ref<UserInfoType>({} as unknown as UserInfoType);
onLoad((options: any) => {
    otherUserInfo.value = JSON.parse(decodeURIComponent(options.item));;
});


/** 展示更多个人信息 */
const onShowMoreHandler = () => {
    uni.navigateTo({
        url: '/pages/user-info/user-info-more?item=' + encodeURIComponent(JSON.stringify(otherUserInfo.value))
    });
}
const onPassHandler = () => {
    request.post('matchmaker/passVip', { userId: otherUserInfo.value.id }).then(res => {
        uni.showToast({
            title: '操作成功',
            icon: 'success',
            duration: 2000
        });
        uni.navigateBack();
    });
}

const onRejectHandler = () => {
    request.post('matchmaker/rejectVip', { userId: otherUserInfo.value.id }).then(res => {
        uni.showToast({
            title: '操作成功',
            icon: 'success',
            duration: 2000
        });
        uni.navigateBack();
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