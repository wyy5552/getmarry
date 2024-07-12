<template>
    <view class="bg-white min-h-100vh">
        <image class="img" src="https://www.8520y.cn/up/p/m/2024/05/101034_1715327064586_m.jpg" mode="aspectFill" />
        <view class="user-card">
            <view>
                <view class="font-bold text-1rem">{{ optUserInfo.name + " " }}<text class="text-#f29f9c"
                        v-if="optUserInfo.gender == 0">♀</text><text class="text-#007aff" v-else>♂</text></view>
                <view class="mt-0.5rem opacity-90">{{ optUserInfo.registeredArea + " · " +
                    getEducationLabel(optUserInfo.education) }}</view>
                <view class="flex gap-1rem mt-0.5rem opacity-90">
                    <uni-tag type="warning" :text="getAgeLabel(optUserInfo.birthday) + ''"></uni-tag>
                    <uni-tag type="warning" :text="optUserInfo.height + 'cm'"></uni-tag>
                    <uni-tag type="warning" :text="optUserInfo.industry"></uni-tag>
                    <uni-tag type="warning" :text="optUserInfo.monthlyIncome + '万'"></uni-tag>
                </view>
            </view>
            <view>
                <uni-fav :contentText="{ contentDefault: '推荐', contentFav: '推荐中' }" :checked="isSelect" :circle="true"
                    bg-color="#dd524d" bg-color-checked="#999" fg-color="#ffffff" fg-color-checked="#ffffff"
                    @click="recommendUser" />
            </view>
        </view>
        <view class="card">
            <view class="title">基本资料</view>
            <view class="content">
                <uni-tag :text="getGenderLabel(optUserInfo.gender)" inverted></uni-tag>
                <uni-tag :text="optUserInfo.weight + 'kg'" inverted></uni-tag>
                <uni-tag :text="getHousingLabel(optUserInfo.housing)" inverted></uni-tag>
                <uni-tag :text="getCarOwnershipLabel(optUserInfo.carOwnership)" inverted></uni-tag>
                <uni-tag :text="getEducationLabel(optUserInfo.education)" inverted></uni-tag>
                <uni-tag :text="optUserInfo.registeredArea" inverted></uni-tag>
                <uni-tag :text="getMarriageTimeLabel(optUserInfo.expectedMarriageTime)" inverted></uni-tag>
                <view class="border-red border opacity-80 text-red-5" @click="onShowMoreHandler">查看更多></view>
            </view>
        </view>
        <view class="card">
            <view class="title">择偶要求</view>

            <view class="content">
                <uni-tag type="warning" :text="optUserInfo.maritalStatusRequirement ?? '未婚'" inverted></uni-tag>
                <uni-tag type="warning" :text="optUserInfo.ageRequirement ?? '上下三岁'" inverted></uni-tag>
                <uni-tag type="warning" :text="optUserInfo.heightRequirement ?? '无身高要求'" inverted></uni-tag>
                <uni-tag type="warning" :text="optUserInfo.incomeRequirement ?? '无收入要求'" inverted></uni-tag>
                <uni-tag type="warning" :text="optUserInfo.areaRequirement ?? '地区不限'" inverted></uni-tag>
                <uni-tag type="warning" :text="optUserInfo.otherRequirement ?? '看眼缘'" inverted></uni-tag>
            </view>
        </view>
        <view class="card">
            <view class="title">自我介绍</view>
            <view class="content"> {{ optUserInfo.introduction }}</view>
        </view>
        <view class="card">
            <view class="title">红娘点评</view>
            <view class="content"> {{ optUserInfo.matchmakerComment }}</view>
        </view>
        <view class="contact">
            <view class="item" @click="onClickPhoneHandler">
                <uni-icons type="phone" size="30"></uni-icons>
                红娘电话
            </view>
            <uni-popup ref="popupRef" type="dialog">
                <uni-popup-dialog title="  " :duration="2000" :before-close="false" @confirm="onConfirmHandler">
                    是否拨打红娘电话？
                    {{ userStore.matchmakerInfo.phone }}
                </uni-popup-dialog>
            </uni-popup>
            <view class="item" @click="onClickWxHandler">
                <uni-icons type="weixin" size="30"></uni-icons>
                红娘微信
            </view>
            <uni-popup ref="popupWxRef" type="dialog">
                <uni-popup-dialog title=" 长按添加微信 " :duration="2000" :before-close="false" @confirm="onConfirmWxHandler">
                    <image src="../../../static/images/wechat.png" mode="scaleToFill" />
                </uni-popup-dialog>
            </uni-popup>
        </view>

    </view>
</template>
<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import request from '@/api/request';
import userUserStore from '@/store/modules/user/useUserStore';
import userInfoOptions from '@/utils/userInfoOptions';

const userStore = userUserStore();

const { optUserInfo } = storeToRefs(userStore);

const { getEducationLabel, getGenderLabel, getHousingLabel, getAgeLabel, getMarriageTimeLabel, getCarOwnershipLabel } = userInfoOptions;

onLoad((options: any) => {
    checkHasLiked();
});

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
const recommendUser = async () => {
    try {
        await request.post<any>('matchmaker/recommendUser', { userId: optUserInfo.value.id, isRecommend: !isSelect.value });
        isSelect.value = !isSelect.value;
        optUserInfo.value.isRecommend = isSelect.value;
        uni.showToast({
            title: isSelect.value ? "推荐成功" : "取消成功",
            icon: 'none'
        });
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
        url: '/pages/user-info/user-info-more?item=' + encodeURIComponent(JSON.stringify(optUserInfo.value))
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
.img {
    width: 100%;
    height: 300px;
}

.user-card {
    position: relative;
    height: 5rem;
    display: flex;
    justify-content: space-between;
    margin: 0.5rem;
    background-color: white;
}

.card {
    margin: 0 0.5rem;
    margin-bottom: 1rem;

    .title {
        font-size: 1rem;
        font-weight: bold;
        line-height: 1.5;
        margin-bottom: 0.5rem;

    }

    .content {
        border-left: rgba(255, 111, 111, .1) 1px solid;
        display: flex;
        flex-wrap: wrap;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        gap: 0.3rem;
    }
}

.contact {
    display: flex;
    justify-content: space-around;
    position: fixed;
    /* #ifdef H5 */
    left: var(--window-left);
    right: var(--window-right);
    /* #endif */
    bottom: 0;

    .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0.5rem;
        background-color: white;
        border-top: 1px solid #f29f9c;
        width: 50%;
    }

}
</style>