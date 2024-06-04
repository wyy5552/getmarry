<template>
    <view class="login-container">
        <view class="font-bold text-1.4rem mt-10% mb-20% text-#333333 flex justify-center">登陆</view>
        <uni-forms ref="loginRef" :modelValue="loginForm">
            <uni-forms-item label="姓名">
                <uni-easyinput v-model="loginForm.phone" placeholder="账号" />
            </uni-forms-item>
            <uni-forms-item label="密码">
                <uni-easyinput v-model="loginForm.passwordHash" placeholder="密码" />
            </uni-forms-item>
        </uni-forms>
        <button type="primary" @click="onLoginHandler">登陆</button>
    </view>
</template>
<script setup lang="ts">
import request from '@/api/request';
import { ref } from 'vue';

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
    uni.hideTabBar();
});
onBackPress((options: any) => {
    console.log('from:' + options.from)
    uni.showTabBar();
})
const loginRef = ref();
const onLoginHandler = async () => {
    try {
        await loginRef.value.validate();
        uni.showToast({
            title: `校验通过`
        })
        // 登陆
        const res = await request.post<any>('user/login', {
            phone: loginForm.value.phone,
            passwordHash: loginForm.value.passwordHash
        });
        uni.setStorageSync('token', res.data.token);
        const eventChannel = instance.getOpenerEventChannel();
        eventChannel.emit('acceptDataFromOpenedPage', "success");
        uni.navigateBack();
    } catch (err) {
        console.log(err);
    }

}
</script>
<style lang="scss" scoped>
.login-container {
    color: #333333;
    padding: 1rem 2rem;

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