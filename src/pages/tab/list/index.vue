<template>
  <uni-fab ref="fab" :pattern="pattern" :horizontal="horizontal" :vertical="vertical" :popMenu="false"
    @trigger="trigger" @fabClick="fabClick" />
  <uni-drawer ref="leftDrawer" mask maskClick mode="left" :width="320">
    <view class="close">
      我爱中国
    </view>
  </uni-drawer>
  <view class="sticky z-100 top-0 bg-white flex items-center justify-between w-full">
    <uni-data-select v-model="value1" placeholder="排序" :localdata="options1" @change="onClickDropHandler"
      :clear="false"></uni-data-select>
    <uni-data-select v-model="value2" placeholder="年龄" :localdata="options2" @change="onClickDropHandler"
      :clear="false"></uni-data-select>
    <uni-data-select v-model="value3" placeholder="身高" :localdata="options3" @change="onClickDropHandler"
      :clear="false"></uni-data-select>
    <text @click="onClickDropHandler">更多</text>
  </view>

  <uni-list>
    <uni-list-item @tap="clickGridHandler(item)" v-for="(item, index) in dataList" :key="index">
      <template v-slot:body>
        <user-card :item="item">
        </user-card>
      </template>
    </uni-list-item>
    <uni-load-more @clickLoadMore="loadMore" :status="loadMoreStatus"></uni-load-more>
  </uni-list>
</template>

<script setup lang="ts">
import { getUserInfoListByTag } from '@/api/mock';

const leftDrawer = ref<any>(null);
const horizontal = ref('right');
const vertical = ref('top');
const pattern = reactive({
  color: '#7A7E83',
  backgroundColor: '#fff',
  selectedColor: '#007AFF',
  buttonColor: '#007AFF',
  iconColor: '#fff'
});

const trigger = (e: any) => {
  console.log(e);
  uni.showModal({
    title: '提示',
    content: `aaa${e.index}`,
    success: function (res) {
      if (res.confirm) {
        console.log('用户点击确定');
      } else if (res.cancel) {
        console.log('用户点击取消');
      }
    }
  });
};

const fabClick = () => {
  leftDrawer.value.open();
  uni.showToast({
    title: '点击了悬浮按钮',
    icon: 'none'
  });
};


const onClickDropHandler = (e: any) => {
  console.log('onClickDropHandler', e);
};


const value1 = ref('1');
const value2 = ref('1');
const value3 = ref('1');

const options1 = ref([
  { text: '登陆日期', value: '1' },
  { text: '房车', value: '2' },
  { text: '是否离异', value: '3' },
]);
const options2 = ref([
  { text: '20-25', value: '1' },
  { text: '25-35', value: '2' },
  { text: '35-45', value: '3' },
]);
const options3 = ref([
  { text: '140-150', value: '1' },
  { text: '150-155', value: '2' },
  { text: '155-160', value: '3' },
  { text: '160-170', value: '4' },
  { text: '170-175', value: '5' },
]);
let pageNo = 1;
const pageSize = 10;
const dataList = ref(getUserInfoListByTag(pageNo, pageSize));
const loadMoreStatus = ref('more');

onLoad(() => {
  loadMore();
})

const loadMore = () => {
  pageNo++;
  dataList.value = dataList.value.concat(getUserInfoListByTag(pageNo, pageSize));
};
const clickGridHandler = (e: any) => {
  console.log(e);
  uni.navigateTo({
    url: '/pages/tab/user-info/user-info?item=' + encodeURIComponent(JSON.stringify(e)),
  });
}
</script>
