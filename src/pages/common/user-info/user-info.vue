<template>
    <view class="user-info-panel">
        <view class="section">
            <text class="section-title">相册列表</text>
            <view class="photo-album">
                <up-album :urls="userInfo.photoAlbum" multipleSize="68"></up-album>
            </view>
        </view>
        <view class="section">
            <text class="section-title">用户信息</text>
            <text class="section-content">昵称: {{ userInfo.nickname }}</text>
            <text class="section-content">性别: {{ userInfo.gender }}</text>
            <text class="section-content">生日: {{ userInfo.birthday }}</text>
            <text class="section-content">婚姻状况: {{ userInfo.maritalStatus }}</text>
            <text class="section-content">子女情况: {{ userInfo.children }}</text>
            <text class="section-content">身高: {{ userInfo.height }}</text>
            <text class="section-content">体重: {{ userInfo.weight }}</text>
        </view>
        <view class="section">
            <text class="section-title">基本资料</text>
            <text class="section-content">学历: {{ userInfo.education }}</text>
            <text class="section-content">月收入: {{ userInfo.monthlyIncome }}</text>
            <text class="section-content">职业: {{ userInfo.profession }}</text>
            <text class="section-content">住房: {{ userInfo.housing }}</text>
            <text class="section-content">房产位置: {{ userInfo.propertyLocation }}</text>
            <text class="section-content">购车情况: {{ userInfo.carOwnership }}</text>
            <text class="section-content">工作地区: {{ userInfo.workArea }}</text>
            <text class="section-content">户籍地区: {{ userInfo.registeredArea }}</text>
        </view>
        <view class="section">
            <text class="section-title">择偶要求</text>
            <text class="section-content">期望结婚时间: {{ userInfo.expectedMarriageTime }}</text>
        </view>
        <view class="section">
            <text class="section-title">自我介绍</text>
            <text class="section-content">兴趣爱好: {{ userInfo.hobbies }}</text>
            <text class="section-content">工作行业: {{ userInfo.industry }}</text>
            <text class="section-content">单位类型: {{ userInfo.companyType }}</text>
        </view>
        <view class="section">
            <text class="section-title">红娘点评</text>
            <!-- Add matchmaker comments here -->
        </view>
    </view>
</template>
<script setup lang="ts">
import { getUserInfo } from '@/api/mock';
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';

const userInfo = ref(getUserInfo());
onLoad((options: any) => {
    console.log('User Info Page Loaded', options);
    userInfo.value = JSON.parse(decodeURIComponent(options.item));;
    console.log('User Info:', userInfo.value);
});


</script>

<style scoped>
.user-info-panel {
    padding: 20rpx;
    background-color: #f8f8f8;
}

.section {
    margin-bottom: 20rpx;
    padding: 20rpx;
    background-color: #ffffff;
    border-radius: 10rpx;
}

.section-title {
    font-size: 32rpx;
    color: #333333;
    margin-bottom: 10rpx;
}

.section-content {
    font-size: 28rpx;
    color: #666666;
}

.photo-album u-image {
    width: 100rpx;
    height: 100rpx;
    margin-right: 10rpx;
}
</style>