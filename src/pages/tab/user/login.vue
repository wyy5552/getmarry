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
const onLoginHandler = () => {
    loginRef.value.validate().then(res => {
        console.log('success', res);
        uni.showToast({
            title: `校验通过`
        })
        // 登陆
        return uni.request({
            url: 'http://localhost:3000/login',
            method: 'POST',
            data: {
                phone: loginForm.value.phone,
                passwordHash: loginForm.value.passwordHash
            }
        })
    }).then(res => {
        console.log('res', res);
        if (res.data.code === 200) {
            uni.showToast({
                title: `登陆成功`
            })
            uni.setStorageSync('token', res.data.data.token);
            const eventChannel = instance.getOpenerEventChannel();
            eventChannel.emit('acceptDataFromOpenedPage', "success");
            uni.navigateBack();
        } else {
            if (res.statusCode === 400) {
                uni.showToast({
                    title: `账号不存在`
                })
                setTimeout(() => {
                    uni.navigateBack();
                }, 1000);
            } else {
                uni.showToast({
                    title: `登陆失败`
                })
            }
        }
    }).catch(err => {
        console.log('err', err);
    })
}
</script>
<style lang="scss" scoped>
.login-container{
    color:#333333;
    padding: 1rem 2rem;
    button{
        width: 100%;
        height: 3rem;
        line-height: 3rem;
        background-color: #FF4D4Fbb;
        color: #fff;
        border-radius:6rem;
        margin-top: 1rem;
        vertical-align: middle;
    }
}
</style>