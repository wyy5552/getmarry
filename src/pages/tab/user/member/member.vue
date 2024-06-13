<template>
    <view class="has-user-info">
        <view class="user-info-header">
            <view class="flex">
                <image src="https://www.8520y.cn/up/p/m/2024/05/101034_1715327064586_m.jpg" mode="scaleToFill" />
                <view class="h-full my-auto ml-1rem">
                    <view class="font-bold text-1rem">{{ memberInfo.nickname + " " }}<text class="text-#f29f9c"
                            v-if="memberInfo.gender == 0">♀</text><text class="text-#007aff" v-else>♂</text></view>
                    <view class="mt-0.5rem font-bold text-1rem">{{ memberInfo.nickname + " " }}</view>
                    <view class="mt-0.5rem opacity-90">{{ birthday + " · " + memberInfo.height + "cm · " +
                        getEducationText(memberInfo.education) }}
                    </view>
                </view>
            </view>
        </view>
        <view class="card">
            <view class="one-line" @tap="clickMyCollectionHandler">
                <view>我的收藏</view>
                <view>></view>
            </view>
            <view class="one-line">
                <view>我的相册</view>
                <view>></view>
            </view>
            <view class="one-line" @tap="clickEditHandler">
                <view>个人信息登记</view>
                <view>></view>
            </view>
        </view>
        <view class="card">
            <view class="one-line" @click="onClickShowToOtherHandler">
                <view>是否展示给异性</view>
                <uni-popup ref="popupRef" type="dialog">
                    <uni-popup-dialog title="  " :content="popupMst" :duration="2000" :before-close="false"
                        @confirm="onConfirmHandler"></uni-popup-dialog>
                </uni-popup>
                <view class="pr-0.5rem">
                    <text class="text-0.6rem opacity-50">(点击进行操作)</text>
                    <text v-if="onSwitchChecked">是</text>
                    <text v-else>否</text>
                </view>
            </view>
            <view class="one-line">
                <view>是否红娘认证</view>
                <view class="pr-0.5rem">
                    <text v-if="memberInfo.isAuth">是</text>
                    <text v-else>否</text>

                </view>
            </view>
        </view>
        <view class="card">
            <view class="one-line">我的红娘</view>
            <view class="one-line">手机号：1333333</view>
            <view class="one-line">微信：</view>
        </view>
        <button type="primary" @click="onLogoutHandler">退出登录</button>
        <button type="primary" @click="onLogoutHandler">注销账号</button>
    </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { UserInfoType } from '@/api/mock';
import request from "@/api/request";

const memberInfo = ref<UserInfoType>({} as UserInfoType);

const educationOptions = [
    { text: '初中', value: 0 },
    { text: '高中', value: 1 },
    { text: '大专', value: 2 },
    { text: '本科', value: 3 },
    { text: '研究生', value: 4 },
    { text: '博士', value: 5 },
    { text: '博士后', value: 6 }
];
// 根据value获取对应的学历
const getEducationText = (value: number) => {
    return educationOptions.find(item => item.value === value)?.text;
}

const onSwitchChecked = computed({
    get: () => {
        return memberInfo.value.isShow;
    },
    set: (value) => {
        memberInfo.value.isShow = value;
    }
});
const popupRef = ref();
const popupMst = ref("");
const msgObj = {
    confirm: "是否展示给别人？",
    cancel: "取消展示给别人？"
}
const clickMyCollectionHandler = (e: any) => {
    console.log(e);
    uni.navigateTo({
        url: '/pages/tab/user/member/collection'
    });
}
const clickEditHandler = (e: any) => {
    console.log(e);
    uni.navigateTo({
        url: '/pages/tab/user/member/edit',
        events: {
            // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
            acceptDataFromOpenedPage: function (data) {
                if (data == 'success') {
                    memberInfo.value = JSON.parse(uni.getStorageSync('userInfo'));
                }
            },
        }
    });
}
onMounted(async () => {
    memberInfo.value = JSON.parse(uni.getStorageSync('userInfo'));
})
const onLogoutHandler = () => {
    uni.removeStorageSync('token');
    request.post('user/logout', null).then((res) => {
        console.log(res);
    });
}
const onConfirmHandler = async () => {
    request.post('user/showToOther', { showToOther: onSwitchChecked.value }).then((res) => {
        console.log(res);
        if (onSwitchChecked.value) {
            onSwitchChecked.value = 0;
        } else {
            onSwitchChecked.value = 1;
        }
    });
    popupRef.value?.close();
}
const onClickShowToOtherHandler = () => {
    if (onSwitchChecked.value) {
        popupMst.value = msgObj.cancel;
    } else {
        popupMst.value = msgObj.confirm;
    }
    popupRef.value?.open();
}

const birthday = computed(() => {
    const birthDate = new Date(memberInfo.value.birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age + "岁";
})
</script>
<style lang="scss" scoped>
.has-user-info {
    button {
        box-shadow: 0 .3rem .8rem rgba(255, 111, 111, .4);
        background-color: #fff;
        background: -webkit-linear-gradient(315deg, rgba(255, 111, 111, .6) 0%, #FF6F6F 100%);
        width: 80%;
        border-radius: 10rem;
        height: 3rem;
        line-height: 3rem;
        padding: 0 2.5rem;
        font-size: 1.8rem;
        vertical-align: middle;
        margin: 1rem auto;
        opacity: 0.3;
    }

    .user-info-header {
        position: relative;
        width: 100%;
        text-align: left;
        padding: 1rem 1rem;

        image {
            width: 6rem;
            height: 6rem;
            border-radius: 50%;
            display: block;
            object-fit: cover;
            border: white .4rem solid;
            box-shadow: .3rem .5rem 1rem rgba(0, 0, 0, .06);
        }

        .right {
            width: 60%;
            display: inline-block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }

    .card {
        margin: 0 0.5rem 1rem 0.5rem;
        padding: 0.5rem;
        background-color: white;
        border-radius: 0.5rem;
        box-shadow: 0 0.1rem 0.1rem rgba(0, 0, 0, 0.1);

        .one-line {
            display: flex;
            justify-content: space-between;
            height: 2rem;
            line-height: 3rem;
            border-bottom: 0.1rem solid #f2f2f2;
            align-items: center;

            &:last-child {
                border-bottom: none;
            }
        }

    }
}
</style>