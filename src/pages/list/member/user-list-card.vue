<template>
    <view class="user-info-more-header card">
        <view class="img-container">
            <image :src="item.userpic">
            </image>
        </view>

        <view class="user-info-base">
            <view class="user-info">
                <view class="user-info-name">{{ item.nickname }}</view>
                <view>{{ getAgeLabel(item.birthday) + " · " + item.height + "cm · " +
                getEducationLabel(item.education) }}</view>
            </view>
            <view class="user-intro">
                {{ item.introduction }}
            </view>
            <view class="user-info-req">
                <view class="tag-name">寻觅</view>
                <view class="tag-info">既要，又要，还要</view>
            </view>
        </view>
    </view>

</template>

<script setup lang="ts">
import optUserInfoOptions from '@/utils/userInfoOptions';
import { UserInfoType } from '@/store/modules/user/types'

const {
    getEducationLabel,
    getAgeLabel
} = optUserInfoOptions;
defineProps<{
    item: UserInfoType,
}>()


</script>

<style scoped lang="scss">
.user-info-more-header {
    display: flex;

    .img-container {
        width: 120rpx;
        height: 120rpx;
        border-radius: 50%;
        overflow: hidden;

        // flex布局中，自身宽高不变化
        image {
            width: 120rpx;
            height: 120rpx;
        }
    }

    .user-info-base {
        margin-left: $margin-x;
        text-align: left;
        border-top: 0;
        font-size: 0.8rem;

        .user-info {
            width: 100%;
            text-overflow: ellipsis;
            display: flex;
            align-items: center;

            &-name {
                font-weight: bold;
                color: $color-text-1;
                margin-right: 30rpx;
                font-size: 1.2rem;
                width: 150rpx;
                // 不换行
                white-space: nowrap;
                // 超出部分省略号
                text-overflow: ellipsis;
            }
        }

        .user-intro {
            color: $color-text-2;
        }

        .user-info-req {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .tag-name {
                background-color: $color-yellow;
                color: #fff;
                border-radius: 14rpx;
                width: 100rpx;
                margin-right: $margin-x;
                display: flex;
                justify-content: center;
            }

            .tag-info {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                color: $color-text-2;
            }
        }
    }
}
</style>