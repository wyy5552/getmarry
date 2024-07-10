<template>
    <view class="card">
        <view class="header">
            <view class="img-container">
                <image :src="item.userpic">
                </image>
            </view>

            <view class="user-info-base">
                <view class="user-info">
                    <view class="user-info-name">{{ item.nickname }}</view>
                    <view>{{ birthday + " · " + item.height + "cm · " + getEducationText(item.education) }}</view>
                </view>
                <view class="user-intro">
                    {{ item.introduction }}
                </view>
            </view>
        </view>
        <view class="user-info-req">
            <view class="tag-name">寻觅</view>
            <view class="tag-info">既要：，又要：，还要</view>
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

// 根据education返回对应的文本
const getEducationText = (education: number) => {
    switch (education) {
        case 0:
            return "初中";
        case 1:
            return "高中";
        case 2:
            return "大专";
        case 3:
            return "本科";
        case 4:
            return "硕士";
        case 5:
            return "博士";
        default:
            return "未知";
    }
}

</script>

<style scoped lang="scss">
.card {
    .header {
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
            margin-left: 1rem;
            text-align: left;
            border-top: 0;
            line-height: 2rem;
            width: 200px;

            .user-info {
                width: 100%;
                text-overflow: ellipsis;
                display: flex;

                &-name {
                    font-size: 1.2rem;
                    font-weight: bold;
                    color: #333;
                    margin-right: 30rpx;
                }
            }
        }
    }

    .user-intro {
        color: #666;
    }

    .user-info-req {
        display: flex;
        align-items: center;

        .tag-name {
            background-color: #FF5D97;
            color: #fff;
            border-radius: 14rpx;
            width: 80rpx;
            margin-right: 30rpx;
            display: flex;
            justify-content: center;
        }

        .tag-info {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #666;
            opacity: 0.8;
        }
    }
}
</style>