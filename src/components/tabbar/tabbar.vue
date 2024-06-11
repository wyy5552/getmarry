<template>
    <view class="custom-tab-bar">
        <view v-if="isUser" v-for="(tab, index) in tabs" :key="index" class="tab-item"
            :class="{ 'active': tabIndex === index }" @tap="switchTab(index)">
            <uni-icons class="icon" :type="tab.icon" size="30" :class="{ 'active': tabIndex === index }"></uni-icons>
            <text>{{ tab.title }}</text>
        </view>
        <view v-else v-for=" (tab, index) in matchmakerTabs " :key="tab.title" class="tab-item"
            :class="{ 'active': tabIndex === index }" @tap="switchTab(index)">
            <uni-icons class="icon" :type="tab.icon" size="30" :class="{ 'active': tabIndex === index }"></uni-icons>
            <text>{{ tab.title }}</text>
        </view>
    </view>
</template>

<script setup lang="ts">

defineProps<{
    tabIndex: number,
    isUser: boolean
}>();

const tabs = [
    { title: "广场", icon: "pyq", pagePath: "/pages/tab/plaza/index" },
    { title: "列表", icon: "list", pagePath: "/pages/tab/list/index" },
    { title: "我的", icon: "person", pagePath: "/pages/tab/user/index" }
];

const matchmakerTabs = [
    { title: "首页", icon: "/static/tab_home.png" },
    { title: "消息", icon: "/static/tab_message.png" },
    { title: "我的", icon: "/static/tab_me.png" }
];

const switchTab = (index: number) => {
    // 在这里可以根据需要执行其他操作，比如切换页面等
    uni.switchTab({
        url: tabs[index].pagePath
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