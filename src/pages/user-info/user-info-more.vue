<template>
    <view class="user-info">
        <view class="card">
            <view class="item">
                <view>昵称</view>
                <view>{{ optUserInfo.nickname }}</view>
            </view>
            <view class="item">
                <view>性别</view>
                <view>{{ temp.gender }}</view>
            </view>
            <view class="item">
                <view>身高</view>
                <view>{{ optUserInfo.height }}</view>
            </view>
            <view class="item">
                <view>体重</view>
                <view>{{ optUserInfo.weight }}</view>
            </view>
            <view class="item">
                <view>年龄</view>
                <view>{{ temp.age }}</view>
            </view>
            <view class="item">
                <view>房子</view>
                <view>{{ temp.housing }}</view>
            </view>
            <view class="item">
                <view>车子</view>
                <view>{{ temp.carOwnership }}</view>
            </view>
            <view class="item">
                <view>婚姻状况</view>
                <view>{{ temp.maritalStatus }}</view>
            </view>
            <view class="item">
                <view>子女情况</view>
                <view>{{ optUserInfo.children }}</view>
            </view>
            <view class="item">
                <view>月收入</view>
                <view>{{ optUserInfo.monthlyIncome }}</view>
            </view>
            <view class="item">
                <view>学历</view>
                <view>{{ temp.education }}</view>
            </view>
        </view>
        <view class="card">
            <view class="item">
                <view>其他</view>
                <view>{{ optUserInfo.otherInfo }}</view>
            </view>
            <view class="item">
                <view>是否是个人填写信息</view>
                <view>{{ temp.isPersonalInfo }}</view>
            </view>
            <view class="item">
                <view>工作地区</view>
                <view>{{ optUserInfo.workArea }}</view>
            </view>
            <view class="item">
                <view>户籍地区</view>
                <view>{{ optUserInfo.registeredArea }}</view>
            </view>
            <view class="item">
                <view>职业</view>
                <view>{{ temp.profession }}</view>
            </view>
            <view class="item">
                <view>房产位置</view>
                <view>{{ optUserInfo.propertyLocation }}</view>
            </view>
            <view class="item">
                <view>期望结婚时间</view>
                <view>{{ temp.expectedMarriageTime }}</view>
            </view>
            <view class="item">
                <view>兄弟姐妹</view>
                <view>{{ optUserInfo.siblings }}</view>
            </view>
            <view class="item">
                <view>兴趣爱好</view>
                <view>{{ optUserInfo.hobbies }}</view>
            </view>
            <view class="item">
                <view>工作行业</view>
                <view>{{ optUserInfo.industry }}</view>
            </view>
            <view class="item">
                <view>单位类型</view>
                <view>{{ optUserInfo.companyType }}</view>
            </view>
            <view class="item">
                <view>红娘点评</view>
                <view>{{ optUserInfo.matchmakerComment }}</view>
            </view>
        </view>
        <view class="h-24rpx"></view>
    </view>
</template>
<script setup lang="ts">
import userUserStore from '@/store/modules/user/useUserStore';
import optUserInfoOptions from '@/utils/userInfoOptions';

const userStore = userUserStore();

const { optUserInfo } = storeToRefs(userStore);

const {
    getGenderLabel,
    getMaritalStatusLabel,
    getEducationLabel,
    getProfessionLabel,
    getMarriageTimeLabel,
    getHousingLabel,
    getCarOwnershipLabel,
    getPersonalInfoLabel,
    getAgeLabel
} = optUserInfoOptions;
const temp = computed(() => {
    return {
        gender: getGenderLabel(optUserInfo.value.gender),
        maritalStatus: getMaritalStatusLabel(optUserInfo.value.maritalStatus),
        education: getEducationLabel(optUserInfo.value.education),
        profession: getProfessionLabel(optUserInfo.value.profession),
        expectedMarriageTime: getMarriageTimeLabel(optUserInfo.value.expectedMarriageTime),
        housing: getHousingLabel(optUserInfo.value.housing),
        carOwnership: getCarOwnershipLabel(optUserInfo.value.carOwnership),
        age: getAgeLabel(optUserInfo.value.birthday),
        isPersonalInfo: getPersonalInfoLabel(optUserInfo.value.isPersonalInfo)
    }
})


</script>

<style scoped lang="scss">
.user-info {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .card {
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

}
</style>