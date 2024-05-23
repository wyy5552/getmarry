<template>
    <view>
        <uni-forms ref="loginRef" :modelValue="loginForm">
            <uni-forms-item label="姓名" required>
                <uni-easyinput v-model="loginForm.phone" placeholder="账号" />
            </uni-forms-item>
            <uni-forms-item label="密码" required>
                <uni-easyinput v-model="loginForm.password" placeholder="密码" />
            </uni-forms-item>
        </uni-forms>
        <button type="primary" @click="onLoginHandler">登陆</button>
    </view>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const loginForm = ref<{
    phone: string;
    password: string;
    password2: string;
}>({
    phone: '',
    password: '',
    password2: ''
});
const loginRef = ref();
const onLoginHandler = () => {
    loginRef.value.validate().then(res => {
        console.log('success', res);
        uni.showToast({
            title: `校验通过`
        })
    }).catch(err => {
        console.log('err', err);
    })
}
</script>