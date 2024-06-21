<template>
    <uni-file-picker @delete="onDelete" @select="onSelect" limit="9" title="最多选择9张图片"></uni-file-picker>
    <image v-for="item in list" :src="item"></image>
</template>
<script setup lang="ts">
import useUserStore from '@/store/modules/user/useUserStore';
import { computed, onMounted } from 'vue';

const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);
onMounted(() => {
    userInfo.value.photoAlbum;
    console.log('userInfo.value.image', userInfo.value.photoAlbum);
})
const list = computed(() => {
    if (userInfo.value.photoAlbum == null) {
        return []
    }
    return []
})
const onSelect = (e: any) => {
    console.log('onSelect', e);
}

const onDelete = (e: any) => {
    console.log('onDelete', e);
}
</script>