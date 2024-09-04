<template>
    <view class="card-cont">
        <image class="img-card top-margin" :src="optUserInfo.userpic ?? ''" mode="aspectFill" />
        <view class="card ">
            <view class="title flex justify-between ">
                <view>
                    {{ optUserInfo.name + " " }}<text class="text-#f29f9c" v-if="optUserInfo.gender == 0">♀</text><text
                        class="text-#007aff" v-else>♂</text>
                </view>
                <view class="right">
                    <image v-if="isSelect" @click="favClick" class="image" :src="`${iconsUrl}/likes-red.svg`"
                        mode="scaleToFill" />
                    <image v-else @click="favClick" class="image" :src="`${iconsUrl}/likes.svg`"
                        mode="scaleToFill" />
                </view>
            </view>
            <view class="tags-content">
                <uni-tag class="content-tag" type="warning" :text="optUserInfo.registeredArea"></uni-tag>
                <uni-tag class="content-tag" type="warning" :text="getEducationLabel(optUserInfo.education)"></uni-tag>
                <uni-tag class="content-tag" type="warning" :text="getAgeLabel(optUserInfo.birthday) + ''"></uni-tag>
                <uni-tag class="content-tag" type="warning" :text="optUserInfo.height + 'cm'"></uni-tag>
                <uni-tag class="content-tag" type="warning" :text="optUserInfo.industry"></uni-tag>
                <uni-tag class="content-tag" type="warning" :text="optUserInfo.monthlyIncome + '万'"></uni-tag>
            </view>
        </view>
        <view class="card">
            <view class="title">基本资料</view>
            <view class="tags-content">
                <uni-tag class="content-tag" :text="getGenderLabel(optUserInfo.gender)" inverted></uni-tag>
                <uni-tag class="content-tag" :text="optUserInfo.weight + 'kg'" inverted></uni-tag>
                <uni-tag class="content-tag" :text="getHousingLabel(optUserInfo.housing)" inverted></uni-tag>
                <uni-tag class="content-tag" :text="getCarOwnershipLabel(optUserInfo.carOwnership)" inverted></uni-tag>
                <uni-tag class="content-tag" :text="getEducationLabel(optUserInfo.education)" inverted></uni-tag>
                <uni-tag class="content-tag" :text="optUserInfo.registeredArea" inverted></uni-tag>
                <uni-tag class="content-tag" :text="getMarriageTimeLabel(optUserInfo.expectedMarriageTime)"
                    inverted></uni-tag>
                <view class="border-red border opacity-80 text-red-5" @click="onShowMoreHandler">查看更多></view>
            </view>
        </view>
        <view class="card">
            <view class="title">择偶要求</view>
            <view class="tags-content">
                <uni-tag class="content-tag" type="warning" :text="optUserInfo.maritalStatusRequirement ?? '未婚'"
                    inverted></uni-tag>
                <uni-tag class="content-tag" type="warning" :text="optUserInfo.ageRequirement ?? '上下三岁'"
                    inverted></uni-tag>
                <uni-tag class="content-tag" type="warning" :text="optUserInfo.heightRequirement ?? '无身高要求'"
                    inverted></uni-tag>
                <uni-tag class="content-tag" type="warning" :text="optUserInfo.incomeRequirement ?? '无收入要求'"
                    inverted></uni-tag>
                <uni-tag class="content-tag" type="warning" :text="optUserInfo.areaRequirement ?? '地区不限'"
                    inverted></uni-tag>
                <uni-tag class="content-tag" type="warning" :text="optUserInfo.otherRequirement ?? '看眼缘'"
                    inverted></uni-tag>
            </view>
        </view>
        <view class="card">
            <view class="title">自我介绍</view>
            <view class="content"> {{ optUserInfo.introduction }}</view>
        </view>
        <view class="card">
            <view class="title">小家家点评</view>
            <view class="content"> {{ optUserInfo.matchmakerComment }}</view>
        </view>
        <image class="img-card top-margin" v-for="(item) in photoAlbum" :key="item" :src="item" mode="aspectFill" />
        <view class="bottom-height"></view>
        <view class="bottom-tab">
            <view class="item" @click="onClickPhoneHandler">
                <uni-icons type="phone"></uni-icons>
                小家家电话
            </view>
            <uni-popup ref="popupRef" type="dialog">
                <uni-popup-dialog title="  " :duration="2000" :before-close="false" @confirm="onConfirmHandler">
                    是否拨打小家家电话？
                    {{ userStore.matchmakerInfo.phone }}
                </uni-popup-dialog>
            </uni-popup>
            <view class="item" @click="onClickWxHandler">
                <uni-icons type="weixin"></uni-icons>
                小家家微信
            </view>
            <uni-popup ref="popupWxRef" type="dialog">
                <uni-popup-dialog title=" 长按添加微信 " :duration="2000" :before-close="false" @confirm="onConfirmWxHandler">
                    <image src="../../static/images/wechat.png" mode="scaleToFill" />
                </uni-popup-dialog>
            </uni-popup>
        </view>
    </view>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import request from '@/api/request';
import userUserStore from '@/store/modules/user/useUserStore';
import userInfoOptions from '@/utils/userInfoOptions';
import envConfig from '@/api/envConfig';

const iconsUrl = envConfig.iconsUrl;
const userStore = userUserStore();

const { getEducationLabel, getGenderLabel, getHousingLabel, getAgeLabel, getMarriageTimeLabel, getCarOwnershipLabel } = userInfoOptions;
const { optUserInfo } = storeToRefs(userStore);


onLoad((options: any) => {
    checkHasLiked();
});
const photoAlbum = computed(() => {
    let photoAlbum = optUserInfo.value.photoAlbum as string;
    const arr = (photoAlbum && photoAlbum.split(',')) ?? [];
    return arr;
})

const isSelect = ref(false);
const popupRef = ref();

const popupWxRef = ref();

const checkHasLiked = () => {
    // 从本地获取个人信息
    const selfInfo = userStore.userInfo;
    // 获取喜欢列表
    const likeList = selfInfo.likes?.split(',') ?? [];
    // 判断是否已经收藏
    isSelect.value = likeList.includes(optUserInfo.value.id + "");
}

/** 喜欢 */
const favClick = async () => {
    try {
        const res = await request.post<any>('list/likeUser', { userId: optUserInfo.value.id, isLike: !isSelect.value });
        if (res.code == 500) {
            uni.showToast({
                title: res.message,
                icon: 'none'
            });
            return;
        }
        isSelect.value = !isSelect.value;
        uni.showToast({
            title: isSelect.value ? "收藏成功！" : "取消收藏！",
            icon: 'none'
        });
        await userStore.getUserInfo();
    } catch {
        uni.showToast({
            title: "操作失败！",
            icon: 'none'
        });
    }
}
/** 展示更多个人信息 */
const onShowMoreHandler = () => {
    uni.navigateTo({
        url: '/pages/user-info/user-info-more'
    });
}

const onClickWxHandler = () => {
    popupWxRef.value?.open();
}

const onConfirmWxHandler = async () => {
    uni.setClipboardData({
        data: userStore.matchmakerInfo.wechat + "",
        success: function () {
            uni.showToast({
                title: '微信号已复制',
                icon: 'none'
            });
            console.log('success');
        }
    });
    popupRef.value?.close();
}

const onClickPhoneHandler = () => {
    popupRef.value?.open();
}

const onConfirmHandler = async () => {
    uni.makePhoneCall({
        phoneNumber: userStore.matchmakerInfo.phone + ""
    });
    popupRef.value?.close();
}
</script>

<style scoped lang="scss">
.card-cont {
    background-color: $color-blue;

    .img-card {
        width: 690rpx;
        height: 690rpx;
        border-radius: 60rpx;
    }

    .card {
        .title {
            height: 45rpx;
            font-weight: bold;
            margin-top: 10rpx;
            margin-bottom: 10rpx;

            .right {
                width: 100rpx;

                .image {
                    width: 80rpx;
                    height: 80rpx;
                }
            }
        }

        .top-content {
            display: flex;
            justify-content: space-between;
        }
    }
}

.tags-content {
    display: flex;
    flex-wrap: wrap;
    gap: 10rpx;

    .content-tag {
        margin-right: 10rpx;
        margin-bottom: 20rpx;
    }
}




.bottom-tab {
    .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0.5rem;
        background-color: white;
        width: 200rpx;
    }

}
</style>