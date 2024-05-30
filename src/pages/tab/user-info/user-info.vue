<template>
    <view class="bg-white">
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
                <view>收藏</view>
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
                <view>查看更多</view>
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
        <view class="goods-carts">
            <uni-goods-nav :fill="true" :options="options" :button-group="customButtonGroup" @click="buttonClick"
                @buttonClick="buttonClick" />
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
const options = [{
    icon: 'chat',
    text: '客服'
}, {
    icon: 'shop',
    text: '店铺',
    info: 2,
    infoBackgroundColor: '#007aff',
    infoColor: "#f5f5f5"
}, {
    icon: 'cart',
    text: '购物车',
    info: 2
}];
const buttonClick = (e) => {
    console.log(e)
};
const customButtonGroup = [{
    text: '加入购物车',
    backgroundColor: 'linear-gradient(90deg, #1E83FF, #0053B8)',
    color: '#fff'
},
{
    text: '立即购买',
    backgroundColor: 'linear-gradient(90deg, #60F3FF, #088FEB)',
    color: '#fff'
}
]
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

.goods-carts {
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: column;
    position: fixed;
    left: 0;
    right: 0;
    /* #ifdef H5 */
    left: var(--window-left);
    right: var(--window-right);
    /* #endif */
    bottom: 0;
}
</style>