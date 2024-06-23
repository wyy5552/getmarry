<template>
    <view class="user-card">
        <view class="img">
            <image mode="aspectFill" :src="item.userpic">
            </image>
            <view class="user-name">{{ item.nickname }}</view>
        </view>

        <view class="user-info-base">
            <view class="user-info">
                <view>{{ birthday + " · " + item.height + "cm · " + getEducationText(item.education) }}</view>
            </view>
            <view class="user-tags">
                <view class="item">{{ item.workArea }}</view>
                <view class="item">{{ getProfessionText(item.profession) }}</view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import type { UserInfoType } from "@/api/mock"
const props = defineProps<{
    item: UserInfoType,
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

// 根据profession返回对应的文本
const getProfessionText = (profession: number) => {
    switch (profession) {
        case 0:
            return "计算机/互联网/通信";
        case 1:
            return "生产/工艺/制造";
        case 2:
            return "商业/服务业/个体经营";
        case 3:
            return "金融/银行/投资/保险";
        case 4:
            return "文化/广告/传媒";
        case 5:
            return "娱乐/艺术/表演";
        case 6:
            return "医疗/护理/制药";
        case 7:
            return "律师/法务";
        case 8:
            return "教育/科研/培训";
        case 9:
            return "公务员/事业单位";
        case 10:
            return "模特";
        case 11:
            return "空姐";
        case 12:
            return "学生";
        case 13:
            return "其他";
        default:
            return "未知";
    }
}
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
                line-height: 1.2rem;
                height: 1.2rem;
                padding: 0 .8rem;
                font-size: 0.8rem;
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