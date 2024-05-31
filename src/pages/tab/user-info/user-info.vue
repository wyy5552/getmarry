<template>
    <view class="bg-white min-h-100vh">
        <image class="img" src="https://www.8520y.cn/up/p/m/2024/05/101034_1715327064586_m.jpg" mode="aspectFill" />
        <view class="user-card">
            <view>
                <view class="text-1.4rem font-bold">{{ userInfo.nickname + ' · ' + userInfo.gender }}</view>
                <view>{{ userInfo.registeredArea + " · " + userInfo.education }}</view>
                <view class="flex gap-1rem">
                    <uni-tag type="warning" :text="birthday"></uni-tag>
                    <uni-tag type="warning" :text="userInfo.height + 'cm'"></uni-tag>
                    <uni-tag type="warning" :text="userInfo.industry"></uni-tag>
                    <uni-tag type="warning" :text="userInfo.monthlyIncome"></uni-tag>
                </view>
            </view>
            <view>
                <uni-fav :checked="isSelect" :circle="true" bg-color="#dd524d" bg-color-checked="#007aff"
                    fg-color="#ffffff" fg-color-checked="#ffffff" @click="favClick" />
            </view>
        </view>
        <view class="text-center m-auto text-[#FF6F6F] text-1.2rem w-full">
            我的资料</view>
        <view class="card">
            <view class="title">基本资料</view>
            <view class="content">
                <uni-tag :text="userInfo.gender" inverted></uni-tag>
                <uni-tag :text="userInfo.height" inverted></uni-tag>
                <uni-tag :text="userInfo.weight" inverted></uni-tag>
                <uni-tag :text="userInfo.birthday" inverted></uni-tag>
                <uni-tag :text="userInfo.housing" inverted></uni-tag>
                <uni-tag :text="userInfo.carOwnership" inverted></uni-tag>
                <uni-tag :text="userInfo.monthlyIncome" inverted></uni-tag>
                <uni-tag :text="userInfo.education" inverted></uni-tag>
                <uni-tag :text="userInfo.registeredArea" inverted></uni-tag>
                <uni-tag :text="userInfo.expectedMarriageTime" inverted></uni-tag>
                <view class="border-red border opacity-80 text-red-5" @click="onShowMoreHandler">查看更多></view>
            </view>
        </view>
        <view class="card">
            <view class="title">择偶要求</view>

            <view class="content">
                <uni-tag :text="userInfo.birthday" inverted></uni-tag>
                <uni-tag :text="userInfo.housing" inverted></uni-tag>
                <uni-tag :text="userInfo.carOwnership" inverted></uni-tag>
                <uni-tag :text="userInfo.monthlyIncome" inverted></uni-tag>
                <uni-tag :text="userInfo.education" inverted></uni-tag>
                <uni-tag :text="userInfo.registeredArea" inverted></uni-tag>
                <uni-tag :text="userInfo.expectedMarriageTime" inverted></uni-tag>

                <uni-tag type="warning" :text="userInfo.maritalStatusRequirement" inverted></uni-tag>
                <uni-tag type="warning" :text="userInfo.ageRequirement" inverted></uni-tag>
                <uni-tag type="warning" :text="userInfo.heightRequirement" inverted></uni-tag>
                <uni-tag type="warning" :text="userInfo.incomeRequirement" inverted></uni-tag>
                <uni-tag type="warning" :text="userInfo.areaRequirement" inverted></uni-tag>
                <uni-tag type="warning" :text="userInfo.otherRequirement" inverted></uni-tag>
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

const userInfo = ref<UserInfoType>({} as unknown as UserInfoType);
onLoad((options: any) => {
    userInfo.value = JSON.parse(decodeURIComponent(options.item));;
});

const birthday = computed(() => {
    const birthDate = new Date(userInfo.value.birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age + "岁";
})
const isSelect = ref(false);
const favClick = () => {
    isSelect.value = !isSelect.value;
    console.log(isSelect.value);
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