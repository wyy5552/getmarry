<template>
    <view class="has-user-info">
        <view class="user-info-header">
            <view class="flex">
                <image :src="userInfo.userpic" mode="scaleToFill" @click="onClickPhotoHandler" />
                <view class="h-full my-auto ml-1rem">
                    <view class="font-bold text-1rem">{{ userInfo.nickname + " · " + userInfo.name }}<text
                            class="text-#f29f9c" v-if="userInfo.gender == 0">♀</text><text class="text-#007aff"
                            v-else>♂</text></view>
                    <view class="mt-0.5rem opacity-90">{{
                    userInfo.introduction
                }}
                    </view>
                    <view class="mt-0.5rem opacity-90">{{
                        getAgeLabel(userInfo.birthday)
                    }}
                    </view>
                </view>
            </view>
        </view>
        <view class="card">
            <view class="one-line" @tap="onAddPicHandler">
                <view>我的相册</view>
                <view>></view>
            </view>
            <view class="one-line" @tap="clickMyInfoEditHandler">
                <view>我的个人信息</view>
                <view>></view>
            </view>
            <view class="one-line">
                <view>我的组织id</view>
                <view class="pr-0.5rem">
                    <text>{{ userInfo.organizationId }}</text>
                </view>
            </view>
        </view>
        <view class="card">
            <view class="one-line" @tap="clickMyCollectionHandler">
                <view>VIP列表</view>
                <view>></view>
            </view>
            <view class="one-line" @tap="clickRecommendHandler">
                <view>推荐列表</view>
                <view>></view>
            </view>
            <view class="one-line" @tap="clickAuthHandler">
                <view>待认证列表</view>
                <view>></view>
            </view>
            <view class="one-line" @tap="clickDeleteHandler">
                <view>待注销列表</view>
                <view>></view>
            </view>
        </view>
        <view class="card">
            <view class="one-line" @click="() => console.log('我的邀请码')">
                <view>我的邀请码</view>
                <text>{{ userInfo.code }}</text>
            </view>
            <view class="one-line" @tap="clickAddMemberHandler">
                <view>新增会员</view>
                <view>+</view>
            </view>
        </view>
        <button type="primary" @click="onLogoutHandler">退出登录</button>
        <button type="primary" @click="onLogoutHandler">注销账号</button>
    </view>
</template>

<script lang="ts" setup>
import userUserStore from '@/store/modules/user/useUserStore';
import userInfoOptions from '@/utils/userInfoOptions';

const baseUrl = import.meta.env.VITE_APP_BASE_API;

const userStore = userUserStore();
const { userInfo } = storeToRefs(userStore);
const { getAgeLabel } = userInfoOptions;

const clickMyCollectionHandler = (e: any) => {
    console.log(e);
    uni.navigateTo({
        url: '/pages/user/matchmaker/vip-list'
    });
}
const clickRecommendHandler = (e: any) => {
    console.log(e);
    uni.navigateTo({
        url: '/pages/user/matchmaker/recommend-list'
    });
}

const clickAuthHandler = (e: any) => {
    console.log(e);
    uni.navigateTo({
        url: '/pages/user/matchmaker/auth-list'
    });
}
const clickMyInfoEditHandler = (e: any) => {
    console.log(e);
    uni.navigateTo({
        url: '/pages/user/matchmaker/matchmaker-edit',
    });
}
const clickAddMemberHandler = (e: any) => {
    console.log(e);
    uni.navigateTo({
        url: '/pages/user/matchmaker/matchmaker-add-member',
    });
}
const clickDeleteHandler = (e: any) => {
    console.log(e);
    uni.navigateTo({
        url: '/pages/user/matchmaker/delete-list',
    });
}

const onLogoutHandler = () => {
    userStore.logout();
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
const onAddPicHandler = (e: any) => {
    console.log(e);
    uni.navigateTo({
        url: '/pages/user/member/pic',
    });
}
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