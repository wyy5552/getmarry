<template>
    <view class="register-container">
        <uni-forms ref="formRef" :modelValue="baseFormData">
            <uni-forms-item label="姓名" required>
                <uni-easyinput v-model="baseFormData.name" placeholder="请输入姓名" />
            </uni-forms-item>
            <uni-forms-item label="昵称" required>
                <uni-easyinput v-model="baseFormData.nickname" placeholder="请输入姓名" />
            </uni-forms-item>
            <uni-forms-item label="自我介绍" required>
                <uni-easyinput v-model="baseFormData.introduction" placeholder="请输入姓名" />
            </uni-forms-item>
            <uni-forms-item label="生日" required>
                <uni-datetime-picker type="date" :clear-icon="false" v-model="baseFormData.birthday" />
            </uni-forms-item>
            <uni-forms-item label="性别" required>
                <uni-data-checkbox v-model="baseFormData.gender" :localdata="sex" />
            </uni-forms-item>
            <uni-forms-item label="身高" required>
                <uni-easyinput type="number" v-model="baseFormData.height" placeholder="请输入身高" />
            </uni-forms-item>
            <uni-forms-item label="体重">
                <uni-easyinput type="number" v-model="baseFormData.weight" />
            </uni-forms-item>
            <uni-forms-item label="月收入">
                <uni-easyinput type="number" v-model="baseFormData.monthlyIncome" />
            </uni-forms-item>
            <uni-forms-item label="住房">
                <uni-easyinput type="text" v-model="baseFormData.housing" />
            </uni-forms-item>
            <uni-forms-item label="购车情况">
                <uni-easyinput type="text" v-model="baseFormData.carOwnership" />
            </uni-forms-item>
            <!-- // //户籍地区 -->
            <uni-forms-item label="户籍地区">
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
        <button type="primary" @click="submit()">提交</button>
    </view>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { UserInfoType, sex, educationConfig, getUserInfo, maritalStatusConfig } from '../../../api/mock';

const baseFormData = ref<UserInfoType>(getUserInfo());
const formRef = ref();
const submit = () => {
    formRef.value.validate().then(res => {
        console.log('success', res);
        uni.showToast({
            title: `校验通过`
        })
    }).catch(err => {
        console.log('err', err);
    })
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