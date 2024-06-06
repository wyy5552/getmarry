<template>
    <view class="user-info">
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
    </view>
</template>
<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import { UserInfoType } from '../../../api/mock';

const userInfo = ref<UserInfoType>({} as UserInfoType);
onLoad((options: any) => {
    console.log('User Info Page Loaded', options);
    userInfo.value = JSON.parse(decodeURIComponent(options.item));;
    console.log('User Info:', userInfo.value);
});


</script>

<style scoped lang="scss">
.user-info {
    width: 100%;
    margin: 1rem 0;
}

.section {
    margin: 0 0.5rem 1rem 0.5rem;
    padding: 0.5rem;
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 0.1rem 0.1rem rgba(0, 0, 0, 0.1);

    .item {
        display: flex;
        justify-content: space-between;
        height: 2rem;
        line-height: 3rem;
        border-bottom: 0.1rem solid #f2f2f2;
        align-items: center;

        &:last-child {
            border-bottom: none;
        }
    }

}
</style>