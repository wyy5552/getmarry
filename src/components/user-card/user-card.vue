<template>
    <view class="user-card">
        <view class="img">
            <image mode="aspectFill" src="https://www.8520y.cn/up/p/m/2024/05/101034_1715327064586_m.jpg">
            </image>
            <view class="user-name">{{ item.nickname }}</view>
        </view>

        <view class="user-info-base">
            <view class="user-info">
                <view>{{ birthday + " · " + item.height + "cm · " + item.education }}</view>
            </view>
            <view class="user-tags">
                <view class="item">{{ item.workArea }}</view>
                <view class="item">{{ item.industry }}</view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">

const props = defineProps<{
    item: any,
}>()
const birthday = computed(() => {
    const birthDate = new Date(props.item.birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age + "岁";
})



</script>

<style scoped lang="scss">
.user-card {
    flex: 1 1 calc(50% - 0.5rem);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 0.5rem;
    margin-bottom: 0.5rem;
    overflow: hidden;

    .img {
        width: 100%;
        position: relative;

        image {
            width: 100%;
        }

        .user-name {
            width: 100%;
            line-height: 6rem;
            height: 5rem;
            position: absolute;
            bottom: 0;
            left: 0;
            color: #fff;
            font-size: 1.4rem;
        }

    }

    .user-info-base {
        width: 100%;
        background-color: #fff;
        text-align: left;
        border-top: 0;
        box-sizing: border-box;
        border: #fff .1rem solid;
        box-shadow: 0 .1rem 1rem rgba(0, 0, 0, .03);
        line-height: 2rem;
        text-align: center;

        .user-info {
            width: 100%;
            display: block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .user-tags {
            width: 100%;
            display: block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

            .item {
                background-color: rgba(255, 111, 111, .1);
                color: #FF6F6F;
                font-weight: normal;
                display: inline-block;
                margin-right: 1rem;
                margin-top: .6rem;
                line-height: 2.2rem;
                height: 2.2rem;
                padding: 0 .8rem;
                font-size: 1.2rem;
                border-radius: .3rem;
                box-sizing: border-box;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                max-width: 50%;
                overflow: hidden;
            }
        }
    }
}
</style>