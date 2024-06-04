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
import { UserInfoType } from '../../../api/mock';

// 定义枚举数据
const sexOptions = [
    { text: '女', value: 0 },
    { text: '男', value: 1 }
];

const maritalStatusOptions = [
    { text: '未婚', value: 0 },
    { text: '离异无娃', value: 1 },
    { text: '离异带男娃', value: 2 },
    { text: '离异带女娃', value: 3 }
];

const educationOptions = [
    { text: '初中', value: 0 },
    { text: '高中', value: 1 },
    { text: '大专', value: 2 },
    { text: '本科', value: 3 },
    { text: '研究生', value: 4 },
    { text: '博士', value: 5 },
    { text: '博士后', value: 6 }
];

const industryOptions = [
    { text: '公务员', value: 0 },
    { text: '教师', value: 1 },
    { text: '医生', value: 2 },
    { text: '央国企', value: 3 },
    { text: '其他', value: 4 }
];

const professionOptions = [
    { text: '计算机/互联网/通信', value: 0 },
    { text: '生产/工艺/制造', value: 1 },
    { text: '商业/服务业/个体经营', value: 2 },
    { text: '金融/银行/投资/保险', value: 3 },
    { text: '文化/广告/传媒', value: 4 },
    { text: '娱乐/艺术/表演', value: 5 },
    { text: '医疗/护理/制药', value: 6 },
    { text: '律师/法务', value: 7 },
    { text: '教育/科研/培训', value: 8 },
    { text: '公务员/事业单位', value: 9 },
    { text: '模特', value: 10 },
    { text: '空姐', value: 11 },
    { text: '学生', value: 12 },
    { text: '其他', value: 13 }
];

const marriageTimeOptions = [
    { text: '半年内', value: 0 },
    { text: '一年内', value: 1 }
];

const housingOptions = [
    { text: '无', value: 0 },
    { text: '有', value: 1 },
    { text: '自建', value: 2 }
];

const carOwnershipOptions = [
    { text: '无', value: 0 },
    { text: '有', value: 1 }
];

const personalInfoOptions = [
    { text: '否', value: 0 },
    { text: '是', value: 1 }
];
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
let instance;
onLoad(() => {
    instance = getCurrentInstance()?.proxy;
});
const submit = () => {
    formRef.value.validate().then(res => {
        console.log('success', res);
        uni.showToast({
            title: '校验通过'
        });
        uni.request({
            url: 'http://localhost:3000/updateUserInfo',
            method: 'POST',
            header: {
                token: uni.getStorageSync('token')
            },
            data: baseFormData.value,
            success: async (res) => {
                console.log('res', res);
                uni.showToast({
                    title: '更新成功'
                });
                // 更新本地用户信息
                await getUserInfo();
                const eventChannel = instance.getOpenerEventChannel();
                eventChannel.emit('acceptDataFromOpenedPage', "success");
                // uni.navigateBack();
            },
            fail: (err) => {
                console.log('err', err);
                uni.showToast({
                    title: '更新失败',
                    icon: 'error'
                });
            }

        })
    }).catch(err => {
        console.log('err', err);
        uni.showToast({
            title: '校验失败',
            icon: 'error'
        });
    });
}
const getUserInfo = async () => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: 'http://localhost:3000/userInfo',
            method: 'POST',
            header: {
                'token': uni.getStorageSync('token') //自定义请求头信息
            },
            success: (res) => {
                console.log(res.data);
                // 将个人信息存在本地
                uni.setStorageSync('userInfo', JSON.stringify(res.data.data));
                resolve(res.data.data);
            },
            fail: (fail) => {
                reject(fail);
            },
        });
    });
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
