<!-- pages/index/index.vue -->
<template>
    <view class="container">
        <view class="title">Uniapp Vue3 生命周期示例</view>
        <button @click="navigateToDetail">跳转到详情页</button>
    </view>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { onLoad, onShow, onHide, onUnload, onPullDownRefresh, onReachBottom, onPageScroll, onResize, onTabItemTap, onBackPress, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app';

const title = ref('Uniapp Vue3 生命周期示例');

const navigateToDetail = () => {
    uni.navigateTo({
        url: '/pages/tab/test/detail'
    });
};

// 页面加载
onLoad(() => {
    console.log('页面加载');
});

// 页面显示
onShow(() => {
    console.log('页面显示');
});

// 页面隐藏
onHide(() => {
    console.log('页面隐藏');
});

// 页面卸载
onUnload(() => {
    console.log('页面卸载');
});

// 下拉刷新
onPullDownRefresh(() => {
    console.log('页面下拉刷新');
    uni.stopPullDownRefresh();
});

// 页面触底
onReachBottom(() => {
    console.log('页面触底');
});

// 页面滚动
onPageScroll((event) => {
    console.log('页面滚动', event.scrollTop);
});

// 屏幕尺寸变化
onResize((res) => {
    console.log('屏幕尺寸变化', res.size);
});

// Tab 项点击
onTabItemTap((item) => {
    console.log('点击 Tab 项', item.index);
});

// 安卓返回键
onBackPress(() => {
    console.log('安卓设备返回键被按下');
    return false; // 返回 false 表示拦截默认的返回行为
});

// 用户点击分享
onShareAppMessage(() => {
    console.log('用户点击分享');
    return {
        title: '自定义分享标题',
        path: '/pages/index/index'
    };
});

// 用户点击分享到朋友圈
onShareTimeline(() => {
    console.log('用户点击分享到朋友圈');
    return {
        title: '自定义分享标题',
        path: '/pages/index/index'
    };
});

onMounted(() => {
    console.log('组件挂载');
});

onUnmounted(() => {
    console.log('组件卸载');
});
</script>

<style scoped>
.container {
    padding: 16px;
}

.title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
}

button {
    padding: 10px;
    background-color: #007aff;
    color: #fff;
    border: none;
    border-radius: 5px;
}
</style>