<template>
    <view>
        <view class="title">相册列表</view>
        <view>
            <image v-for="item in userInfo.photoAlbum" style="width: 100%;  background-color: #eeeeee;" mode="aspectFit"
                :src="item" :key="item"></image>
        </view>
        <view class="title">自我介绍</view>
        <view class="section">
            <view>{{ userInfo.introduction }}</view>
        </view>
        <view class="title">用户基本信息</view>
        <view class="section">
            <view class="item">
                <view>昵称</view>
                <view>{{ userInfo.nickname }}</view>
            </view>
            <view class="item">
                <view>性别</view>
                <view>{{ userInfo.gender }}</view>
            </view>
            <view class="item">
                <view>身高</view>
                <view>{{ userInfo.height }}</view>
            </view>
            <view class="item">
                <view>体重</view>
                <view>{{ userInfo.weight }}</view>
            </view>
            <view class="item">
                <view>生日</view>
                <view>{{ userInfo.birthday }}</view>
            </view>
            <view class="item">
                <view>房子</view>
                <view>{{ userInfo.housing }}</view>
            </view>
            <view class="item">
                <view>车子</view>
                <view>{{ userInfo.carOwnership }}</view>
            </view>
            <view class="item">
                <view>婚姻状况</view>
                <view>{{ userInfo.maritalStatus }}</view>
            </view>
            <view class="item">
                <view>子女情况</view>
                <view>{{ userInfo.children }}</view>
            </view>
            <view class="item">
                <view>月收入</view>
                <view>{{ userInfo.monthlyIncome }}</view>
            </view>
            <view class="item">
                <view>学历</view>
                <view>{{ userInfo.education }}</view>
            </view>
        </view>
        <view class="title">其他信息</view>
        <view class="section">
            <view class="item">
                <view>其他</view>
                <view>{{ userInfo.otherInfo }}</view>
            </view>
            <view class="item">
                <view>是否是个人填写信息</view>
                <view>{{ userInfo.isPersonalInfo }}</view>
            </view>
            <view class="item">
                <view>工作地区</view>
                <view>{{ userInfo.workArea }}</view>
            </view>
            <view class="item">
                <view>户籍地区</view>
                <view>{{ userInfo.registeredArea }}</view>
            </view>
            <view class="item">
                <view>职业</view>
                <view>{{ userInfo.profession }}</view>
            </view>
            <view class="item">
                <view>房产位置</view>
                <view>{{ userInfo.propertyLocation }}</view>
            </view>
            <view class="item">
                <view>期望结婚时间</view>
                <view>{{ userInfo.expectedMarriageTime }}</view>
            </view>
            <view class="item">
                <view>兄弟姐妹</view>
                <view>{{ userInfo.siblings }}</view>
            </view>
            <view class="item">
                <view>兴趣爱好</view>
                <view>{{ userInfo.hobbies }}</view>
            </view>
            <view class="item">
                <view>工作行业</view>
                <view>{{ userInfo.industry }}</view>
            </view>
            <view class="item">
                <view>单位类型</view>
                <view>{{ userInfo.companyType }}</view>
            </view>
            <view class="item">
                <view>红娘点评</view>
                <view>{{ userInfo.matchmakerComment }}</view>
            </view>
        </view>
        <view class="title">红娘点评</view>
        <view class="section">
            <view>{{ userInfo.matchmakerComment }}</view>
        </view>
        <view class="title">联系方式 </view>
        <view class="section">
            <view class="item">
                <view>手机号</view>
                <view>{{ userInfo.phone }}</view>
            </view>
            <view class="item">
                <view>微信号</view>
                <view>{{ userInfo.wechat }}</view>
            </view>
            <view class="item">
                <view>联系红娘</view>
                <view>{{ userInfo.matchmakerPhone }}</view>
            </view>
            <view class="item">
                <view>红娘微信</view>
                <view>{{ userInfo.matchmakerWechat }}</view>
            </view>
            <view class="item">
                <view>机构</view>
                <view>{{ userInfo.organizationId }}</view>
            </view>
        </view>
    </view>
</template>
<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import { UserInfoType, getUserInfo } from '../../../api/mock';

const userInfo = ref<UserInfoType>(getUserInfo() as UserInfoType);
onLoad((options: any) => {
    console.log('User Info Page Loaded', options);
    userInfo.value = JSON.parse(decodeURIComponent(options.item));;
    console.log('User Info:', userInfo.value);
});


</script>

<style scoped>
.section {
    background: #fff;
    border-radius: 10px;
    border: 1px solid #e5e5e5;
    margin: 4px 8px;
}

.title {
    font-size: 16px;
    font-weight: bold;
}

.item {
    display: flex;
    justify-content: space-between;
    margin: 0 4px;
    border-bottom: 1px solid #e5e5e5;
}
</style>