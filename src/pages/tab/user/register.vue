<template>
    <view>
        <uni-file-picker limit="9" title="最多选择9张图片" v-model="photoAlbum" fileMediatype="image" mode="grid"
            @select="selectImg" @progress="progressImg" @success="successImg" @fail="failImg" />
        <view>
            <uni-forms ref="formRef" :modelValue="baseFormData" :rules="customRules" @validate="onValidateHandler">
                <uni-forms-item label="姓名" required name="name">
                    <uni-easyinput v-model="baseFormData.name" placeholder="请输入姓名" />
                </uni-forms-item>
                <uni-forms-item label="手机号" required name="phone">
                    <uni-easyinput v-model="baseFormData.phone" placeholder="请输入手机号" />
                </uni-forms-item>
                <uni-forms-item label="昵称" required name="nickname">
                    <uni-easyinput v-model="baseFormData.nickname" placeholder="请输入昵称哦" />
                </uni-forms-item>
                <uni-forms-item label="密码" required>
                    <uni-easyinput v-model="baseFormData.passwordHash" placeholder="密码" />
                </uni-forms-item>
                <uni-forms-item label="确认密码" required>
                    <uni-easyinput v-model="passwordHash" placeholder="请在此确认密码" />
                </uni-forms-item>
                <uni-forms-item label="自我介绍" required name="introduction">
                    <uni-easyinput v-model="baseFormData.introduction" placeholder="请输入自我介绍" />
                </uni-forms-item>
                <uni-forms-item label="生日" required name="birthday">
                    <uni-datetime-picker type="date" :clear-icon="false" v-model="baseFormData.birthday" />
                </uni-forms-item>
                <uni-forms-item label="性别" required name="sex">
                    <uni-data-checkbox v-model="baseFormData.gender" :localdata="sex" />
                </uni-forms-item>
                <uni-forms-item label="身高" required name="height">
                    <uni-easyinput type="number" v-model="baseFormData.height" placeholder="请输入身高" />
                </uni-forms-item>
                <uni-forms-item label="体重" name="weight">
                    <uni-easyinput type="number" v-model="baseFormData.weight" />
                </uni-forms-item>
                <uni-forms-item label="月收入" name="monthlyIncome">
                    <uni-easyinput type="number" v-model="baseFormData.monthlyIncome" />
                </uni-forms-item>
                <uni-forms-item label="住房" name="housing">
                    <uni-easyinput type="text" v-model="baseFormData.housing" />
                </uni-forms-item>
                <uni-forms-item label="购车情况" name="carOwnership">
                    <uni-easyinput type="text" v-model="baseFormData.carOwnership" />
                </uni-forms-item>
                <!-- // //户籍地区 -->
                <uni-forms-item label="户籍地区" name="registeredArea">
                    <uni-easyinput v-model="baseFormData.registeredArea" />
                </uni-forms-item>
                <!-- ////学历 -->
                <uni-forms-item label="学历">
                    <uni-data-select v-model="baseFormData.education" :localdata="educationConfig"></uni-data-select>
                </uni-forms-item>
                <!-- //职业 -->
                <uni-forms-item label="职业">
                    <uni-easyinput v-model="baseFormData.profession" />
                </uni-forms-item>
                <!-- //婚姻状况 -->
                <uni-forms-item label="婚姻状况">
                    <uni-data-checkbox v-model="baseFormData.maritalStatus"
                        :localdata="maritalStatusConfig"></uni-data-checkbox>
                </uni-forms-item>
                <!-- //子女情况 -->
                <uni-forms-item label="子女情况">
                    <uni-easyinput v-model="baseFormData.children" placeholder="请输入子女情况" />
                </uni-forms-item>
                <!-- //房产位置 -->
                <uni-forms-item label="房产位置">
                    <uni-easyinput v-model="baseFormData.propertyLocation" placeholder="请输入房产位置" />
                </uni-forms-item>
                <!-- //工作地区 -->
                <uni-forms-item label="工作地区">
                    <uni-easyinput v-model="baseFormData.workArea" placeholder="请输入工作地区" />
                </uni-forms-item>
                <!-- //期望结婚时间 -->
                <uni-forms-item label="期望结婚时间">
                    <uni-easyinput v-model="baseFormData.expectedMarriageTime" placeholder="请输入期望结婚时间" />
                </uni-forms-item>
                <!-- //兄弟姐妹 -->
                <uni-forms-item label="兄弟姐妹">
                    <uni-easyinput v-model="baseFormData.siblings" placeholder="请输入兄弟姐妹" />
                </uni-forms-item>
                <!-- //兴趣爱好 -->
                <uni-forms-item label="兴趣爱好">
                    <uni-easyinput v-model="baseFormData.hobbies" placeholder="请输入兴趣爱好" />
                </uni-forms-item>
                <!-- //工作行业 -->
                <uni-forms-item label="工作行业">
                    <uni-easyinput v-model="baseFormData.industry" placeholder="请输入工作行业" />
                </uni-forms-item>
                <!-- //单位类型 -->
                <uni-forms-item label="单位类型">
                    <uni-easyinput v-model="baseFormData.companyType" placeholder="请输入单位类型" />
                </uni-forms-item>
            </uni-forms>
        </view>
        <button type="primary" @click="submitHandler">提交</button>
    </view>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { UserInfoType, sex, educationConfig, getUserInfo, maritalStatusConfig } from '../../../api/mock';

const photoAlbum = ref<string[]>([]);
// 获取上传状态
const selectImg = (e) => {
    console.log('选择文件：', e)
};
// 获取上传进度
const progressImg = (e) => {
    console.log('上传进度：', e)
};

// 上传成功
const successImg = (e) => {
    console.log('上传成功')
};

// 上传失败
const failImg = (e) => {
    console.log('上传失败：', e)
};

const baseFormData = ref<UserInfoType>(getUserInfo());
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
    name: {
        rules: [
            {
                required: true,
                errorMessage: '请输入姓名',
            },
            {
                minLength: 3,
                maxLength: 5,
                errorMessage: '姓名长度在 {minLength} 到 {maxLength} 个字符',
            }
        ]
    },
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
            { required: true, errorMessage: '请输入昵称' }
        ]
    },
    introduction: {
        rules: [
            { required: true, errorMessage: '请输入自我介绍' }
        ]
    },
    birthday: {
        rules: [
            { required: true, errorMessage: '请输入生日' }
        ]
    },
    height: {
        rules: [
            { required: true, errorMessage: '请输入身高' }
        ]
    },
    weight: {
        rules: [
            { required: true, errorMessage: '请输入体重' }
        ]
    },
    monthlyIncome: {
        rules: [
            { required: true, errorMessage: '请输入月收入' }
        ]
    },
    housing: {
        rules: [
            { required: true, errorMessage: '请输入住房' }
        ]
    },
    carOwnership: {
        rules: [
            { required: true, errorMessage: '请输入购车情况' }
        ]
    },
    registeredArea: {
        rules: [
            { required: true, errorMessage: '请输入户籍地区' }
        ]
    },
}

const passwordHash = ref('');

const onValidateHandler = (e) => {
    console.log('onValidateHandler', e);
}

</script>