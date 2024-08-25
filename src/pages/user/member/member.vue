<template>
    <view class="has-user-info">
        <view class="user-info-header">
            <view class="flex">
                <image :src="userInfo.userpic" mode="scaleToFill" @click="onClickPhotoHandler" />
                <view class="h-full my-auto ml-1rem">
                    <view class="font-bold text-1rem">{{ userInfo.nickname + " " }}<text class="text-#f29f9c"
                            v-if="userInfo.gender == 0">♀</text><text class="text-#007aff" v-else>♂</text></view>
                    <view class="mt-0.5rem opacity-90">{{
                    getAgeLabel(userInfo.birthday)
                    + " · " + userInfo.height + "cm· " +
                    getEducationLabel(userInfo.education) }}
                    </view>
                </view>
            </view>
        </view>
        <view class="card">
            <view class="one-line" @tap="clickMyCollectionHandler">
                <view>我的收藏</view>
                <view>></view>
            </view>
            <view class="one-line" @tap="onAddPicHandler">
                <view>我的相册</view>
                <view>></view>
            </view>
            <view class="one-line" @tap="clickEditHandler">
                <view>个人信息登记</view>
                <view>></view>
            </view>
        </view>
        <view class="card card2">
            <view class="one-line" @click="onClickShowToOtherHandler">
                <view>是否展示给异性</view>
                <uni-popup ref="popupRef" type="dialog">
                    <uni-popup-dialog title="  " :content="popupMst" :duration="2000" :before-close="false"
                        @confirm="onConfirmHandler"></uni-popup-dialog>
                </uni-popup>
                <view class="pr-0.5rem">
                    <text class="text-0.6rem opacity-50">(点击进行操作)</text>
                    <text v-if="userInfo.isShow == 1">是</text>
                    <text v-else>否</text>
                </view>
            </view>
        </view>
        <view class="card card3">
            <view class="one-line">
                <view>认证</view>
                <view class="pr-0.5rem">
                    <text v-if="userInfo.isAuth">是</text>
                    <text v-else>否</text>
                </view>
            </view>
        </view>
        <view class="card">
            <view class="hn">我的红娘</view>
            <view class="one-line">
                <view @click="callHandler(matchmakerInfo.phone)">
                    手机号：{{ matchmakerInfo.phone }}
                </view>
                <view @click="copyStrHandler(matchmakerInfo.phone + '')">
                    <image class="img" :src="`${baseUrl}/public/copy.png`" />
                </view>
            </view>
            <view class="one-line">
                <view>
                    微信：{{ matchmakerInfo.wechat }}</view>
                <view @click="copyStrHandler(matchmakerInfo.wechat)">
                    <image class="img" :src="`${baseUrl}/public/copy.png`" />
                </view>
            </view>

        </view>
        <button type="primary" @click="onLogoutHandler">退出登录</button>
        <button type="primary" @click="onApplyDeleteHandler">注销账号</button>
    </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import request from "@/api/request";
import useUserStore from '@/store/modules/user/useUserStore';
import { UserInfoType } from '@/store/modules/user/types';

import userInfoOptions from '@/utils/userInfoOptions';
import envConfig from '@/api/envConfig';

const baseUrl = envConfig.baseUrl;



const { getEducationLabel, getAgeLabel } = userInfoOptions;
const userStore = useUserStore();
const { userInfo, matchmakerInfo } = storeToRefs(userStore);

const popupRef = ref();
const popupMst = ref("");
const msgObj = {
    confirm: "是否展示给别人？",
    cancel: "取消展示给别人？"
}
const clickMyCollectionHandler = (e: any) => {
    console.log(e);
    uni.navigateTo({
        url: '/pages/user/member/collection'
    });
}
const clickEditHandler = (e: any) => {
    console.log(e);
    uni.navigateTo({
        url: '/pages/user/member/edit',
    });
}

const onAddPicHandler = (e: any) => {
    console.log(e);
    uni.navigateTo({
        url: '/pages/user/member/pic',
    });
}
onMounted(async () => {
    // 获取我的红娘
    const organizationId = userInfo.value.organizationId;
    // 根据id获取红娘信息
    const res = await request.post<UserInfoType>('member/getMatchmakerInfo', { organizationId });
    matchmakerInfo.value = res.data;
})
const onLogoutHandler = () => {
    userStore.logout();
}

const onApplyDeleteHandler = () => {
    userStore.deleteUser();
}
const onConfirmHandler = async () => {
    const isHide = userInfo.value.isShow == 1 ? 0 : 1;
    await request.post('member/showToOther', { showToOther: isHide });
    await userStore.getUserInfo();
    popupRef.value?.close();
}
const onClickShowToOtherHandler = () => {
    if (userInfo.value.isShow == 1) {
        popupMst.value = msgObj.cancel;
    } else {
        popupMst.value = msgObj.confirm;
    }
    popupRef.value?.open();
}

const onClickPhotoHandler = () => {
    uni.chooseImage({
        success: (chooseImageRes) => {
            const tempFilePaths = chooseImageRes.tempFilePaths;
            console.log(tempFilePaths);
            uni.uploadFile({
                header: {
                    token: userStore.token
                },
                url: baseUrl + '/img/uploadHeadPic', //仅为示例，非真实的接口地址
                filePath: tempFilePaths[0],
                name: 'file',
                success: (uploadFileRes) => {
                    userInfo.value.userpic = uploadFileRes.data;
                    console.log(uploadFileRes.data);
                    userStore.getUserInfo();
                }
            });
        }
    });
}
const copyStrHandler = (str: string) => {
    uni.setClipboardData({
        data: str,
        success: function () {
            console.log('拷贝成功');
        }
    });
}

const callHandler = (phone) => {
    uni.showModal({
        content: '是否拨打红娘电话？',
        success: function (res) {
            if (res.confirm) {
                uni.makePhoneCall({
                    phoneNumber: phone
                });
            } else if (res.cancel) {
                console.log('用户点击取消');
            }
        }
    });


}
</script>
<style lang="scss" scoped>
.has-user-info {
    display: flex;
    flex-direction: column;
    align-items: center;

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
        width: $container-width;
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
        border-radius: 30rpx;

        .one-line {
            display: flex;
            justify-content: space-between;
            height: 70rpx;
            border-bottom: 2rpx solid #f2f2f2;
            align-items: center;

            &:last-child {
                border-bottom: none;
            }

            .img {
                width: 44rpx;
                height: 44rpx;
            }
        }

    }

    .card1 {
        // 背景渐变 从 #FF92B9 到 透明
        background: -webkit-linear-gradient(315deg, rgba(255, 146, 185, 1) 0%, rgba(255, 146, 185, 0) 100%);
        color: $color-text-1;
    }

    .card2 {
        // 背景渐变 从 #A3E0EE 到 透明
        background: -webkit-linear-gradient(315deg, rgba(163, 224, 238, 1) 0%, rgba(163, 224, 238, 0) 100%);
    }

    .card3 {
        // 背景渐变 从 #F3CB3D 到 透明
        background: -webkit-linear-gradient(315deg, rgba(243, 203, 61, 1) 0%, rgba(243, 203, 61, 0) 100%);
    }

    .card4 {
        // 背景渐变 从 #BB99FF 到 透明
        background: -webkit-linear-gradient(315deg, rgba(187, 153, 255, 1) 0%, rgba(187, 153, 255, 0) 100%);
    }

    .hn {
        font-size: 1.2rem;
        font-weight: bold;
    }
}
</style>