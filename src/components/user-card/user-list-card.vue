<template>
    <view class="user-card">
        <view class="header">
            <view class="img-container">
                <image mode="aspectFill" src="https://www.8520y.cn/up/p/m/2024/05/101034_1715327064586_m.jpg">
                </image>
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
        <view class="user-intro">
            {{ item.introduction }}
        </view>
        <view class="user-info-req">
            <view>寻觅</view>
            <view>既要：，又要：，还要</view>
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
    width: 92%;
    margin: 1rem auto 1.2rem auto;
    padding: 1rem 0 1rem;
    border-radius: 1.2rem;
    box-sizing: border-box;
    position: relative;
    background-color: #fff;
    min-height: 17rem;

    .header {
        display: flex;

        .img-container {
            width: 9rem;
            height: 9rem;
            border-radius: 1rem;
            overflow: hidden;

            image {
                width: 9rem;
                height: 9rem !important;
            }
        }
    }

    .user-info-base {
        text-align: left;
        border-top: 0;
        line-height: 2rem;
        padding: 0 1rem;

        .user-info {
            width: 100%;
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

    .user-intro {
        padding: 0.5rem;
        font-size: 0.8rem;
        color: #666;
    }

    .user-info-req {
        display: flex;
    }
}
</style>