<template>
    <view class="register-container">
        <uni-forms ref="formRef" :modelValue="baseFormData" :rules="rules">
            <!-- 微信 -->
            <uni-forms-item required label="微信" name="wechat">
                <uni-easyinput v-model="baseFormData.wechat" placeholder="请输入微信" />
            </uni-forms-item>
            <!-- 用户性别 -->
            <uni-forms-item required label="性别" name="gender">
                <uni-data-checkbox v-model="baseFormData.gender" :localdata="sexOptions" />
            </uni-forms-item>

            <!-- 用户昵称 -->
            <uni-forms-item required label="昵称" name="nickname">
                <uni-easyinput v-model="baseFormData.nickname" placeholder="请输入昵称" />
            </uni-forms-item>

            <!-- 用户姓名 -->
            <uni-forms-item required label="姓名" name="name">
                <uni-easyinput v-model="baseFormData.name" placeholder="请输入姓名" />
            </uni-forms-item>

            <!-- 用户身高 (cm) -->
            <uni-forms-item required label="身高 (cm)" name="height">
                <uni-easyinput v-model="baseFormData.height" placeholder="请输入身高" type="number" />
            </uni-forms-item>

            <!-- 用户体重 (kg) -->
            <uni-forms-item required label="体重 (kg)" name="weight">
                <uni-easyinput v-model="baseFormData.weight" placeholder="请输入体重" type="number" />
            </uni-forms-item>

            <!-- 用户介绍 -->
            <uni-forms-item required label="介绍" name="introduction">
                <uni-easyinput v-model="baseFormData.introduction" placeholder="请输入自我介绍" />
            </uni-forms-item>

            <!-- 用户生日 -->
            <uni-forms-item required label="生日" name="birthday">
                <uni-datetime-picker type="date" :clear-icon="false" v-model="baseFormData.birthday" />
            </uni-forms-item>

            <!-- 婚姻状况 -->
            <uni-forms-item label="婚姻" name="maritalStatus">
                <uni-data-select v-model="baseFormData.maritalStatus" :localdata="maritalStatusOptions" />
            </uni-forms-item>
            <!-- 子女情况 -->
            <uni-forms-item label="子女情况" name="children">
                <uni-easyinput v-model="baseFormData.children" placeholder="请输入子女情况" />
            </uni-forms-item>
            <!-- 教育程度 -->
            <uni-forms-item label="教育" name="education">
                <uni-data-select v-model="baseFormData.education" :localdata="educationOptions" />
            </uni-forms-item>

            <!-- 行业 -->
            <uni-forms-item label="行业" name="profession">
                <uni-data-select v-model="baseFormData.profession" :localdata="professionOptions" />
            </uni-forms-item>

            <!-- 预期结婚时间 -->
            <uni-forms-item label="结婚时间" name="expectedMarriageTime">
                <uni-data-checkbox v-model="baseFormData.expectedMarriageTime" :localdata="marriageTimeOptions" />
            </uni-forms-item>

            <!-- 住房情况 -->
            <uni-forms-item label="住房情况" name="housing">
                <uni-data-select v-model="baseFormData.housing" :localdata="housingOptions" />
            </uni-forms-item>

            <!-- 汽车所有权 -->
            <uni-forms-item label="汽车所有权" name="carOwnership">
                <uni-data-checkbox v-model="baseFormData.carOwnership" :localdata="carOwnershipOptions" />
            </uni-forms-item>

            <!-- 月收入 (万) -->
            <uni-forms-item label="月收入 (万)" name="monthlyIncome">
                <uni-easyinput v-model="baseFormData.monthlyIncome" placeholder="请输入月收入" type="number" />
            </uni-forms-item>

            <!-- 是否为个人填写 -->
            <uni-forms-item label="是否为个人填写" name="isPersonalInfo">
                <uni-data-checkbox v-model="baseFormData.isPersonalInfo" :localdata="personalInfoOptions" />
            </uni-forms-item>

            <!-- 工作区域 -->
            <uni-forms-item label="工作区域" name="workArea">
                <uni-easyinput v-model="baseFormData.workArea" placeholder="请输入工作区域" />
            </uni-forms-item>

            <!-- 家乡区域 -->
            <uni-forms-item label="家乡区域" name="registeredArea">
                <uni-easyinput v-model="baseFormData.registeredArea" placeholder="请输入家乡区域" />
            </uni-forms-item>

            <!-- 财产位置 -->
            <uni-forms-item label="财产位置" name="propertyLocation">
                <uni-easyinput v-model="baseFormData.propertyLocation" placeholder="请输入财产位置" />
            </uni-forms-item>

            <!-- 兄弟姐妹情况 -->
            <uni-forms-item label="兄弟姐妹情况" name="siblings">
                <uni-easyinput v-model="baseFormData.siblings" placeholder="请输入兄弟姐妹情况" />
            </uni-forms-item>

            <!-- 爱好 -->
            <uni-forms-item label="爱好" name="hobbies">
                <uni-easyinput v-model="baseFormData.hobbies" placeholder="请输入爱好" />
            </uni-forms-item>

            <!-- 职业 -->
            <uni-forms-item label="职业" name="industry">
                <uni-easyinput v-model="baseFormData.industry" placeholder="请输入职业" />
            </uni-forms-item>

            <!-- 单位类型 -->
            <uni-forms-item label="单位类型" name="companyType">
                <uni-easyinput v-model="baseFormData.companyType" placeholder="请输入单位类型" />
            </uni-forms-item>
            <!-- 其他信息 -->
            <uni-forms-item label="其他信息" name="otherInfo">
                <uni-easyinput v-model="baseFormData.otherInfo" placeholder="请输入其他信息" />
            </uni-forms-item>
        </uni-forms>
        <view class="h-1.2rem"></view>
    </view>
    <view class="submit-bottom">
        <button type="primary" @click="submit()">提交</button>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { UserInfoType } from '@/api/mock';
import request from "@/api/request";
import userInfoOptions from '@/utils/userInfoOptions';

const { sexOptions, maritalStatusOptions, educationOptions, professionOptions, marriageTimeOptions, housingOptions, carOwnershipOptions, personalInfoOptions } = userInfoOptions;
// 获取本地用户信息
const userInfo = JSON.parse(uni.getStorageSync('userInfo')) as UserInfoType;
const baseFormData = ref<UserInfoType>(userInfo);
const formRef = ref();

const rules = {
    wechat: {
        rules: [
            { required: true, errorMessage: '微信是必填项' },
            { minLength: 2, errorMessage: '微信长度必须大于1' }
        ]
    },
    gender: {
        rules: [
            { required: true, errorMessage: '性别是必填项' }
        ]
    },
    nickname: {
        rules: [
            { required: true, errorMessage: '昵称是必填项' }
        ]
    },
    name: {
        rules: [
            { required: true, errorMessage: '姓名是必填项' },
            { minLength: 3, errorMessage: '姓名长度必须大于2' }
        ]
    },
    height: {
        rules: [
            { required: true, errorMessage: '身高是必填项' },
            { pattern: /^(1[0-9]{2}|2[0-4][0-9]|250)$/, errorMessage: '请输入100到250之间的身高' }
        ]
    },
    weight: {
        rules: [
            { required: true, errorMessage: '体重是必填项' },
            { minimum: 30, errorMessage: '请输入大于30kg的体重' }
        ]
    },
    introduction: {
        rules: [
            { required: true, errorMessage: '介绍是必填项' }
        ]
    },
    birthday: {
        rules: [
            { required: true, errorMessage: '生日是必填项' }
        ]
    }
};
watch(() => baseFormData.value.birthday, (newVal, oldVal) => {
    console.log(newVal)
})
let instance;
onLoad(() => {
    instance = getCurrentInstance()?.proxy;
});
const submit = async () => {
    try {
        let res = await formRef.value.validate();
        console.log('success', res);
        uni.showToast({
            title: '校验通过'
        });
        let res1 = await request.post<UserInfoType>('user/updateUserInfo', baseFormData.value);
        console.log('res', res1);
        uni.showToast({
            title: '更新成功'
        });
        // 更新本地用户信息
        let res2 = await request.post<UserInfoType>('user/userInfo', null);
        uni.setStorageSync('userInfo', JSON.stringify(res2.data));
        const eventChannel = instance.getOpenerEventChannel();
        eventChannel.emit('acceptDataFromOpenedPage', "success");
    }
    catch (error) {
        uni.showToast({
            title: '请求失败',
            icon: 'error'
        });
    }
}
</script>

<style lang="scss" scoped>
.register-container {
    color: #333333;
    padding: 1rem;


}

.submit-bottom {
    position: fixed;
    bottom: 0;
    width: 100%;

    button {
        height: 3rem;
        line-height: 3rem;
        background-color: #FF4D4F;
        color: #fff;
        border-radius: 6rem;
        margin-top: 1rem;
        vertical-align: middle;
    }
}
</style>
