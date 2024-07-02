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