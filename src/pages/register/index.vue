<template>
    <view>
        <uv-form labelPosition="left" :model="userInfo" ref="form">
            <wd-cell-group custom-class="group" title="基础信息" border>
                <wd-input label-width="100px" clearable label="昵称" v-model="userInfo.nickname" border="none"></wd-input>
                <wd-input label-width="100px" clearable label="性别" prop="gender" v-model="userInfo.birthday"
                    border="none"></wd-input>
                <wd-input label-width="100px" clearable label="性别" prop="gender" v-model="userInfo.gender"
                    border="none"></wd-input>
                <wd-input label-width="100px" clearable label="身高" prop="height" v-model="userInfo.height"
                    border="none"></wd-input>
                <wd-input label-width="100px" clearable label="体重" prop="weight" v-model="userInfo.weight"
                    border="none"></wd-input>
                <wd-input label-width="100px" clearable label="月收入" prop="monthlyIncome"
                    v-model="userInfo.monthlyIncome" border="none"></wd-input>
                <wd-input label-width="100px" clearable label="住房" prop="housing" v-model="userInfo.housing"
                    border="none"></wd-input>
                <wd-input label-width="100px" clearable label="购车情况" prop="carOwnership" v-model="userInfo.carOwnership"
                    border="none"></wd-input>
                <wd-input label-width="100px" clearable label="工作地区" prop="workArea" v-model="userInfo.workArea"
                    border="none"></wd-input>
                <wd-input label-width="100px" clearable label="户籍地区" prop="registeredArea"
                    v-model="userInfo.registeredArea" border="none"></wd-input>
                <wd-input label-width="100px" clearable label="学历" prop="education" v-model="userInfo.education"
                    border="none"></wd-input>
            </wd-cell-group>
            <wd-cell-group custom-class="group" title="相册" border>
                <uv-form-item label="相册" prop="photoAlbum" borderBottom>
                    <uv-upload v-model="userInfo.photoAlbum"
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"></uv-upload>
                </uv-form-item>
            </wd-cell-group>
            <wd-cell-group custom-class="group" title="基础信息" border>
                <uv-form-item label="职业" prop="profession" borderBottom>
                    <wd-input label-width="100px" clearable label="昵称" v-model="userInfo.profession"
                        border="none"></wd-input>
                </uv-form-item>
                <uv-form-item label="婚姻状况" prop="maritalStatus" borderBottom>
                    <wd-input label-width="100px" clearable label="昵称" v-model="userInfo.maritalStatus"
                        border="none"></wd-input>
                </uv-form-item>
                <uv-form-item label="子女情况" prop="children" borderBottom>
                    <wd-input label-width="100px" clearable label="昵称" v-model="userInfo.children"
                        border="none"></wd-input>
                </uv-form-item>
                <uv-form-item label="房产位置" prop="propertyLocation" borderBottom>
                    <wd-input label-width="100px" clearable label="昵称" v-model="userInfo.propertyLocation"
                        border="none"></wd-input>
                </uv-form-item>
                <uv-form-item label="期望结婚时间" prop="expectedMarriageTime" borderBottom>
                    <wd-input label-width="100px" clearable label="昵称" v-model="userInfo.expectedMarriageTime"
                        border="none"></wd-input>
                </uv-form-item>
                <uv-form-item label="兄弟姐妹" prop="siblings" borderBottom>
                    <wd-input label-width="100px" clearable label="昵称" v-model="userInfo.siblings"
                        border="none"></wd-input>
                </uv-form-item>
                <uv-form-item label="兴趣爱好" prop="hobbies" borderBottom>
                    <wd-input label-width="100px" clearable label="昵称" v-model="userInfo.hobbies"
                        border="none"></wd-input>
                </uv-form-item>
                <uv-form-item label="工作行业" prop="industry" borderBottom>
                    <wd-input label-width="100px" clearable label="昵称" v-model="userInfo.industry"
                        border="none"></wd-input>
                </uv-form-item>
                <uv-form-item label="单位类型" prop="companyType" borderBottom>
                    <wd-input label-width="100px" clearable label="昵称" v-model="userInfo.companyType"
                        border="none"></wd-input>
                </uv-form-item>
                <view class="footer">
                    <wd-button type="primary" size="large" @click="handleSubmit" block>提交</wd-button>
                </view>
            </wd-cell-group>
        </uv-form>

    </view>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { getUserInfo } from '@/api/mock';

const userInfo = ref(getUserInfo());

const handleSubmit = () => {
    // Handle form submission.
    // You might want to validate the form before submitting it.
    // You might also want to handle the response from the server.
};
</script>
<style lang="scss">
.inline-txt {
    display: inline-block;
    font-size: 14px;
    margin: 0 8px;
    color: rgba(0, 0, 0, 0.45);
    vertical-align: middle;
}

:deep(.group) {
    margin-top: 12px;
}

.tip {
    margin: 10px 15px 21px;
    color: #999;
    font-size: 12px;
}

.footer {
    padding: 0 25px 21px;
}

:deep(.label-class) {
    color: #999 !important;
    font-size: 12px !important;
}
</style>
