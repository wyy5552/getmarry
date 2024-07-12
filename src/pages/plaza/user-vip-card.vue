<template>
    <view class="user-card-vip">
        <image class="img" mode="aspectFill" :src="item.userpic">
        </image>
        <image class="vip-icon" src="@/assets/vip.png" mode="scaleToFill" />
        <view class="user-info">
            {{ item.nickname }}
        </view>
    </view>
</template>

<script setup lang="ts">

defineProps<{
    item: any,
}>()

</script>

<style scoped lang="scss">
.user-card-vip {
    width: 160rpx;
    height: 220rpx;
    text-align: center;
    background-color: #fff;
    position: relative;

    .img {
        border-radius: 50%;
        width: 160rpx;
        height: 160rpx;
    }

    .vip-icon {
        width: 38rpx;
        height: 38rpx;
        position: absolute;
        right: 10rpx;
        top: 130rpx;
    }

    .user-info {
        width: 100%;
        font-size: $font-size;
        font-weight: bold;
        margin-top: 14rpx;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

}
</style>