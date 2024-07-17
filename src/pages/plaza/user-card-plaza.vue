<template>
    <view class="user-card" :style="style">
        <div class="img"></div>
        <view class="user-info-base">
            <view class="user-name">{{ item.nickname }}</view>
            <view class="user-info">
                <view>{{ getAgeLabel(item.birthday) + " · " + getEducationLabel(item.education)
                    }}·{{ item.workArea }}</view>

            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { UserInfoType } from '@/store/modules/user/types';
import userInfoOptions from '@/utils/userInfoOptions';

const props = defineProps<{
    item: UserInfoType,
}>();
const { getEducationLabel, getAgeLabel } = userInfoOptions;
const style = {
    '--bg-img': `url(${props.item.userpic})`
}
</script>

<style scoped lang="scss">
.user-card {
    width: 314rpx;
    height: 456rpx;
    border-radius: $radius;
    overflow: hidden;
    background-image: var(--bg-img);
    background-size: cover;
    margin-bottom: $margin-y;

    .img {
        width: 100%;
        height: 344rpx;
        overflow: hidden;
        filter: contrast(90%) brightness(90%);
    }

    .user-info-base {
        width: 100%;
        height: 120rpx;
        padding: 12rpx $margin-x;
        background-color: rgba($color: $color-red-2, $alpha: 0.7);
        background-color: $color-yellow;
        .user-name {
            font-size: $font-size;
            font-weight: bold;
        }

        .user-info {
            width: 100%;
            display: block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: white;
        }
    }
}
</style>