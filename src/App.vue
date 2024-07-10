<script setup lang="ts">
import { mpUpdate } from '@/utils/index';

onLaunch(() => {
  console.log('App Launch');
  uni.hideTabBar();
  // #ifdef MP
  mpUpdate();
  // #endif
});
onShow(() => {
  console.log('App Show');
});
onHide(() => {
  console.log('App Hide');
});
</script>

<style lang="scss">
page {
  background-color: #f9f9f9;
}

@import '@/uni.scss';
/* 每个页面公共css */
@import '@/static/styles/common.scss';

// 卡片容器
.card-cont {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  // 渐变色，方向从上到下
  // background: linear-gradient(180deg, #A3E0EE 0%, #A3E0EE00 100%);

}

// 内容卡
.card {
  padding: 24rpx 28rpx;
  background-color: #fff;
  width: 638rpx;
  margin-top: 24rpx;
  border-radius: 60rpx;
}

// 上下间距
.top-margin {
  margin-top: 24rpx;
}

// tabbar高度+底部间距
.bottom-height {
  height: 198rpx;
}

.bottom-tab {
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 174rpx;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 60rpx 60rpx 0 0;
}
</style>
