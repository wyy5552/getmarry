<template>
    <view class="login-container card-cont">
        <uni-forms ref="loginRef" :modelValue="loginForm">
            <uni-forms-item>
                <uni-easyinput v-model="loginForm.phone" placeholder="请输入手机号码" />
            </uni-forms-item>
            <uni-forms-item>
                <uni-easyinput v-model="loginForm.passwordHash" placeholder="请输入密码" />
            </uni-forms-item>
        </uni-forms>
        <button type="primary" @click="onLoginHandler">登陆</button>
    </view>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import userUserStore from '@/store/modules/user/useUserStore';
const userStore = userUserStore();

const loginForm = ref<{
    phone: string;
    passwordHash: string;
}>({
    phone: '',
    passwordHash: '',
});
let instance;
onLoad(() => {
    instance = getCurrentInstance()?.proxy;
    console.log('instance', instance);
});
onBackPress((options: any) => {
    console.log('from:' + options.from)
})
const loginRef = ref();
const onLoginHandler = async () => {
    try {
        await loginRef.value.validate();
        uni.showToast({
            title: `校验通过`
        })
        userStore.login(loginForm.value.phone, loginForm.value.passwordHash).then(() => {
            uni.showToast({
                title: `登陆成功`
            })
            uni.navigateBack();
        }).catch(() => {
            uni.showToast({
                title: `登陆失败`
            })
        });
    } catch (err) {
        console.log(err);
    }

}
</script>
<style lang="scss" scoped>
.login-container {
    background-color: white;
    padding-top: 210rpx;

    :deep(.uni-easyinput__content) {
        background-color: #F8F9FA !important;
        width: 666rpx;
        height: 112rpx;
        border-radius: 100rpx;
        border: none;

    }

    button {
        margin-top: 158rpx;
        background-color: #FF5D97;
        width: 666rpx;
        height: 92rpx;
        border-radius: 100rpx;
        border: none;
    }
}
</style>