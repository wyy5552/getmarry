<template>
  <uni-fab ref="fab" :pattern="pattern" :horizontal="horizontal" :vertical="vertical" :popMenu="false"
    @trigger="trigger" @fabClick="fabClick" />
  <up-popup mode="right" :show="show" @close="close" @open="open">
    <view>
      <text>出淤泥而不染，濯清涟而不妖</text>
    </view>
  </up-popup>
  <view class="flex items-center">
    <u-dropdown @open="onClickDropHandler">
      <u-dropdown-item v-model="value1" title="排序" :options="options1"></u-dropdown-item>
      <u-dropdown-item v-model="value2" title="年龄" :options="options2"></u-dropdown-item>
      <u-dropdown-item v-model="value3" title="身高" :options="options3"></u-dropdown-item>
    </u-dropdown>
    <text @click="onClickDropHandler">更多</text>
  </view>

  <up-list @scrolltolower="scrolltolower" :lowerThreshold="100" :preLoadScreen="1.5">
    <up-list-item v-for="(item, index) in dataList" :key="index">
      <user-card :item="item">
      </user-card>
    </up-list-item>
  </up-list>
</template>

<script setup lang="ts">
import { getUserInfoListByTag } from '@/api/mock';

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
  uni.showToast({
    title: '点击了悬浮按钮',
    icon: 'none'
  });
};


const onClickDropHandler = (e: any) => {
  console.log('onClickDropHandler', e);
  show.value = true;
};

// 创建响应式数据
const show = ref(false);

// 定义方法
function open() {
  // 打开逻辑，比如设置 show 为 true
  show.value = true;
  // console.log('open');
}

function close() {
  // 关闭逻辑，设置 show 为 false
  show.value = false;
  // console.log('close');
}

const value1 = ref('1');
const value2 = ref('1');
const value3 = ref('1');

const options1 = ref([
  { label: '登陆日期', value: '1' },
  { label: '房车', value: '2' },
  { label: '是否离异', value: '3' },
]);
const options2 = ref([
  { label: '20-25', value: '1' },
  { label: '25-35', value: '2' },
  { label: '35-45', value: '3' },
]);
const options3 = ref([
  { label: '140-150', value: '1' },
  { label: '150-155', value: '2' },
  { label: '155-160', value: '3' },
  { label: '160-170', value: '4' },
  { label: '170-175', value: '5' },
]);
let pageNo = 1;
const pageSize = 10;
const dataList = ref(getUserInfoListByTag(pageNo, pageSize));

onLoad(() => {
  loadmore();
})

const scrolltolower = (e: any) => {
  console.log('scrolltolower', e);
  loadmore();
};

const loadmore = () => {
  pageNo++;
  dataList.value = dataList.value.concat(getUserInfoListByTag(pageNo, pageSize));
};
</script>
