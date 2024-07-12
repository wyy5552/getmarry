<template>
    <view class="bottom-tab">
        <view v-for="(tab) in curTabConfig" :key="tab.value" class="tab-item"
            :class="{ 'active': tabValue === tab.value }" @tap="switchTab(tab.value)">
            <image v-if="tabValue === tab.value" :src="`${baseUrl}/public/tabbar-${tab.icon}-red.svg`" />
            <image v-else :src="`${baseUrl}/public/tabbar-${tab.icon}.svg`" />
            <text>{{ tab.title }}</text>
        </view>
    </view>
</template>

<script setup lang="ts">

import userUserStore from '@/store/modules/user/useUserStore';
const userStore = userUserStore();
const { role } = storeToRefs(userStore);
const baseUrl = import.meta.env.VITE_APP_BASE_API;

defineProps<{
    tabValue: string,
}>();

const defaultTabs = [
    { title: "列表", value: 'list', icon: "list", pagePath: "/pages/list/index" },
    { title: "我的", value: 'person', icon: "person", pagePath: "/pages/user/index" }
]

const tabs = [
    { title: "广场", value: 'pyq', icon: "pyq", pagePath: "/pages/plaza/index" },
    { title: "列表", value: 'list', icon: "list", pagePath: "/pages/list/member/index" },
    { title: "我的", value: 'person', icon: "person", pagePath: "/pages/user/index" }
];
const matchmakerTabs = [
    { title: "广场", value: 'pyq', icon: "pyq", pagePath: "/pages/plaza/index" },
    { title: "ALL", value: 'list', icon: "list", pagePath: "/pages/list/matchmaker/index" },
    { title: "互生爱慕", value: 'likes-list', icon: "list", pagePath: "/pages/likes-list/index" },
    { title: "我的", value: 'person', icon: "person", pagePath: "/pages/user/index" }
];

const curTabConfig = ref<any[]>(defaultTabs);
watch(role, (newVal) => {
    switch (role.value) {
        case 0:
            curTabConfig.value = tabs;
            break;
        case 1:
            curTabConfig.value = matchmakerTabs;
            break;
        default:
            curTabConfig.value = defaultTabs;
    }
}, {
    immediate: true
})


const switchTab = (value: string) => {
    // 在这里可以根据需要执行其他操作，比如切换页面等
    const item = curTabConfig.value.find(item => item.value === value);
    if (item.value == 'person') {
        uni.switchTab({
            url: item.pagePath
        });
    } else {
        uni.redirectTo({
            url: item.pagePath
        });
    }

};
</script>

<style scoped lang="scss">
.bottom-tab {
    .active {
        color: #ff5d97;
    }
}

.tab-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;

    image {
        width: 54rpx;
        height: 54rpx;
    }
}
</style>