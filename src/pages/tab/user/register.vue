<template>
    <view class="register-container">
        <uni-forms ref="formRef" :modelValue="baseFormData" :rules="customRules" @validate="onValidateHandler">
            <uni-forms-item label="手机号" required name="phone">
                <uni-easyinput v-model="baseFormData.phone" placeholder="请输入手机号" />
            </uni-forms-item>
            <uni-forms-item label="性别" required name="sex">
                <uni-data-checkbox v-model="baseFormData.gender" :localdata="config.gender" />
            </uni-forms-item>
            <uni-forms-item label="邀请码" required name="name">
                <uni-easyinput v-model="baseFormData.organizationId" placeholder="请输入邀请码" />
            </uni-forms-item>
            <uni-forms-item label="密码" required>
                <uni-easyinput v-model="baseFormData.passwordHash" placeholder="密码" />
            </uni-forms-item>
            <uni-forms-item label="确认密码" required>
                <uni-easyinput v-model="passwordHash" placeholder="请在此确认密码" />
            </uni-forms-item>

        </uni-forms>
        <button type="primary" @click="submitHandler">提交注册</button>
    </view>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import config from '@/store/config';

const baseFormData = ref<{
    phone: string;
    gender: number;
    passwordHash: string;
    organizationId
}>({
    gender: 1,
} as any);
const formRef = ref();
const submitHandler = () => {
    console.log(baseFormData.value);
    formRef.value.validate().then(res => {
        if (passwordHash.value !== baseFormData.value.passwordHash) {
            uni.showToast({
                title: `两次密码输入不一致`
            })
            return;
        }
        console.log('success', res);
        uni.showToast({
            title: `校验通过`
        })
        // 请求注册接口
        uni.request({
            url: 'http://localhost:3000/register', //仅为示例，并非真实接口地址。
            method: 'POST',
            data: {
                ...baseFormData.value
            },
            success: (res) => {
                console.log(res.data);
                uni.showToast({
                    title: `注册成功`
                })
            }
        });

    }).catch(err => {
        console.log('err', err);
    })
}
const customRules = {
    phone: {
        rules: [
            {
                required: true,
                errorMessage: '请输入手机号',
            },
            {
                pattern: /^1[3456789]\d{9}$/,
                errorMessage: '手机号格式不正确',
            }
        ]
    },
}

const passwordHash = ref('');

const onValidateHandler = (e) => {
    console.log('onValidateHandler', e);
}

</script>
<style lang="scss" scoped>
.register-container {
    color: #333333;
    padding: 1rem;

    button {
        width: 100%;
        height: 3rem;
        line-height: 3rem;
        background-color: #FF4D4Fbb;
        color: #fff;
        border-radius: 6rem;
        margin-top: 1rem;
        vertical-align: middle;
    }
}
</style>