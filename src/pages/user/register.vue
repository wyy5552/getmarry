<template>
    <view class="register-container card-cont">
        <uni-forms ref="formRef" :modelValue="baseFormData" :rules="customRules" @validate="onValidateHandler">
            <uni-forms-item label="手机号" required name="phone">
                <uni-easyinput v-model="baseFormData.phone" placeholder="请输入手机号" />
            </uni-forms-item>
            <uni-forms-item label="昵称" required name="nickname">
                <uni-easyinput v-model="baseFormData.nickname" placeholder="请输入昵称" />
            </uni-forms-item>
            <uni-forms-item label="角色" required name="role">
                <uni-data-checkbox v-model="baseFormData.role" :localdata="roleOptions" />
            </uni-forms-item>
            <uni-forms-item label="邀请码" required name="name">
                <uni-easyinput v-model="baseFormData.organizationId" placeholder="请输入邀请码" />
            </uni-forms-item>
            <uni-forms-item label="密码" required name="passwordHash">
                <uni-easyinput v-model="baseFormData.passwordHash" placeholder="密码" />
            </uni-forms-item>
            <uni-forms-item label="确认密码" required name="passwordHashCopy">
                <uni-easyinput v-model="baseFormData.passwordHashCopy" placeholder="请在此确认密码" />
            </uni-forms-item>

        </uni-forms>
        <button type="primary" @click="submitHandler">提交注册</button>
    </view>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import userInfoOptions from '@/utils/userInfoOptions';
import request from '@/api/request';

const { roleOptions } = userInfoOptions;

type FormType = {
    phone: string;
    role: number;
    passwordHash: string;
    organizationId: number,
    nickname: string,
    passwordHashCopy: string
}
const baseFormData = ref<Partial<FormType>>({
    role: 0,
});
const formRef = ref();
const submitHandler = async () => {
    try {
        await formRef.value.validate();
        if (baseFormData.value.passwordHashCopy !== baseFormData.value.passwordHash) {
            uni.showToast({
                title: `两次密码输入不一致`
            })
            return;
        }
        baseFormData.value.organizationId = parseInt(baseFormData.value.organizationId as any);
        console.log(baseFormData.value);
        // 请求注册接口
        await request.post<any>('user/register', baseFormData.value);
        uni.showToast({
            title: `注册成功`
        })
        uni.navigateBack();
    } catch (err: any) {
        if (err.data && err.data.message) {
            uni.showToast({
                title: err.data.message
            })
        }
    }


};
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
    nickname: {
        rules: [
            {
                required: true,
                errorMessage: '请输入昵称',
            }
        ]
    },
    role: {
        rules: [
            {
                required: true,
                errorMessage: '请选择角色',
            }
        ]
    },
    organizationId: {
        rules: [
            {
                required: true,
                errorMessage: '请输入邀请码',
            }
        ]
    },
    passwordHash: {
        rules: [
            {
                required: true,
                errorMessage: '请输入密码',
            }
        ]
    },
    passwordHashCopy: {
        rules: [
            {
                required: true,
                errorMessage: '请再次输入密码',
            }
        ]
    }
}

const onValidateHandler = (e) => {
    console.log('onValidateHandler', e);
}

</script>
<style lang="scss" scoped>
.register-container {
    background-color: white;
    padding-top: 210rpx;

    :deep(.uni-easyinput__content) {
        background-color: #F8F9FA !important;
        width: 550rpx;
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

    :deep(.uni-forms-item) {
        display: flex;
        align-items: center;

        .uni-forms-item__label {
            display: flex;
            align-items: center;
        }

        .uni-data-checklist .checklist-group .checklist-box.is--default.is-checked .radio__inner {
            border-color: $color-blue;

            .radio__inner-icon {
                background-color: $color-blue;
            }
        }

        .uni-data-checklist .checklist-group .checklist-box.is--default.is-checked .checklist-text {
            color: $color-blue;
        }
    }
}
</style>