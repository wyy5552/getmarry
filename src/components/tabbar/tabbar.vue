<template>
    <view class="custom-tab-bar">
        <view v-for="(tab) in curTabConfig" :key="tab.value" class="tab-item"
            :class="{ 'active': tabValue === tab.value }" @tap="switchTab(tab.value)">
            <uni-icons class="icon" :type="tab.icon" size="30"
                :class="{ 'active': tabValue === tab.value }"></uni-icons>
            <text>{{ tab.title }}</text>
        </view>
    </view>
</template>

<script setup lang="ts">

import userUserStore from '@/store/modules/user/useUserStore';
const userStore = userUserStore();
const { role } = storeToRefs(userStore);

defineProps<{
    tabValue: string,
}>();

const defaultTabs = [
    { title: "列表", value: 'list', icon: "list", pagePath: "/pages/tab/list/index" },
    { title: "我的", value: 'person', icon: "person", pagePath: "/pages/tab/user/index" }
]

const tabs = [
    { title: "广场", value: 'pyq', icon: "pyq", pagePath: "/pages/tab/plaza/index" },
    { title: "列表", value: 'list', icon: "list", pagePath: "/pages/tab/list/index" },
    { title: "我的", value: 'person', icon: "person", pagePath: "/pages/tab/user/index" }
];
const matchmakerTabs = [
    { title: "广场", value: 'pyq', icon: "pyq", pagePath: "/pages/tab/plaza/index" },
    { title: "列表", value: 'list', icon: "list", pagePath: "/pages/tab/list/index" },
    { title: "互生爱慕", value: 'likes-list', icon: "list", pagePath: "/pages/tab/likes-list/index" },
    { title: "我的", value: 'person', icon: "person", pagePath: "/pages/tab/user/index" }
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
    uni.switchTab({
        url: item.pagePath
    });
};
</script>

<style scoped>
.custom-tab-bar {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 100px;
    /* 根据实际情况调整高度 */
    background-color: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-top: 1px solid #ccc;
    /* 可选：添加上边框 */
}

.tab-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.icon {
    width: 35px;
    /* 根据实际情况调整图标大小 */
    height: 35px;
    /* 根据实际情况调整图标大小 */
}

.active {
    color: #007bff !important;
    /* 根据实际情况调整选中态样式 */
}
</style>