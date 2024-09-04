<template>
    <view class="register-container">
        <uni-forms ref="formRef" :modelValue="baseFormData" :rules="rules">
            <uni-forms-item label="小家家号" required name="phone">
                <uni-easyinput v-model="baseFormData.phone" placeholder="请输入小家家号" />
            </uni-forms-item>
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

            <!-- 用户介绍 -->
            <uni-forms-item required label="介绍" name="introduction">
                <uni-easyinput v-model="baseFormData.introduction" placeholder="请输入自我介绍" />
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
import request from "@/api/request";
import userUserStore from '@/store/modules/user/useUserStore';
import userInfoOptions from '@/utils/userInfoOptions';
import type { UserInfoType } from '@/store/modules/user/types';

const { sexOptions } = userInfoOptions;
const userStore = userUserStore();
const { userInfo } = storeToRefs(userStore);

// 获取本地用户信息
const baseFormData = ref<UserInfoType>({} as unknown as UserInfoType);
const formRef = ref();

const rules = {
    phone: {
        rules: [
            {
                required: true,
                errorMessage: '请输入小家家号',
            },
            {
                pattern: /^1[3456789]\d{9}$/,
                errorMessage: '小家家号格式不正确',
            }
        ]
    },
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
            { minLength: 2, errorMessage: '姓名长度必须大于2' }
        ]
    },

    introduction: {
        rules: [
            { required: true, errorMessage: '介绍是必填项' }
        ]
    },
};
onLoad(() => {
});
const submit = async () => {
    try {
        let res = await formRef.value.validate();
        console.log('success', res);
        // 添加小家家的id
        baseFormData.value.organizationId = userInfo.value.code;
        uni.showToast({
            title: '校验通过'
        });
        await request.post<UserInfoType>('matchmaker/addUser', baseFormData.value);
        uni.showToast({
            title: '新增用户成功'
        });

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
