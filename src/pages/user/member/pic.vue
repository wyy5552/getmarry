<template>
    <button class="upload-image" @click="onClickPhotoHandler">
        上传图片
    </button>
    <view>
        <view class="img-container" v-for="(item, index) in picArr" :key="index">
            <image :src="item.localUrl == '' ? item.serverUrl : item.localUrl" @click="replaceImage(index)"></image>
            <button @click="onClickItemBtnHandler(item, index)" type="primary" size="mini">{{
        item.status === 'prepare' ? '更新' : '删除'
    }}</button>
        </view>
        <button v-if="picArr.length > 0" @click="uploadImages">更新状态</button>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import useUserStore from '@/store/modules/user/useUserStore';
import request from '@/api/request';
import envConfig from '@/api/envConfig';

const baseUrl = envConfig.assetUrl;

const userStore = useUserStore();
const picArr = ref([] as ImageType[]);
type ImageStatus = 'prepare' | 'uploaded';
type ImageType = {
    localUrl: string;
    serverUrl: string;
    status: ImageStatus;
    key: string;
}
const max = 3;
onMounted(() => {
    const { userInfo } = userStore;
    const albums = userInfo.photoAlbum as string[];
    picArr.value = albums.map((album) => ({
        localUrl: '',
        serverUrl: album,
        status: 'uploaded',
        key: album
    }));
})

/** 点击上传图片 */
const onClickPhotoHandler = () => {
    if (picArr.value.length >= max) {
        uni.showToast({
            title: `最多只能上传${max}张图片`,
            icon: 'none'
        });
        return;
    }
    uni.chooseImage({
        count: max - picArr.value.length, // 限制选择的图片数量
        success: (chooseImageRes) => {
            const tempFilePaths = chooseImageRes.tempFilePaths as string[];
            // 将选择的图片添加到数组中
            picArr.value.push(...tempFilePaths.map((tempFilePath) => ({
                localUrl: tempFilePath,
                serverUrl: '',
                status: 'prepare' as ImageStatus,
                key: ''
            })));
        }
    });
};
/** 点击已经上传过的图片，替换 */
const replaceImage = (index) => {
    uni.chooseImage({
        count: 1, // 仅选择一张图片进行替换
        success: (chooseImageRes) => {
            const tempFilePath = chooseImageRes.tempFilePaths[0];
            // 替换指定索引的图片
            picArr.value.splice(index, 1, {
                localUrl: tempFilePath,
                status: 'prepare',
                serverUrl: '',
                key: ''
            });
        }
    });
};
/** 更新图片 */
const onClickItemBtnHandler = (item: ImageType, index: number) => {
    if (item.status === 'prepare') {
        // 更新图片
        updateImage(item, index);
    }
    else {
        request.post('img/deleteAlbum', { url: item.serverUrl }).then(() => {
            picArr.value = picArr.value.filter((pic) => pic.key !== item.key);
            uni.showToast({
                title: `删除成功`
            });
            userStore.getUserInfo();
            // 删除图片
        });
    }
};

const updateImage = (fileTemp: ImageType, index: number) => {
    if (fileTemp.localUrl === '') {
        return Promise.reject();
    }
    return new Promise((res, rej) => {
        uni.uploadFile({
            header: {
                token: userStore.token
            },
            url: baseUrl + '/img/uploadAlbum', // 示例地址，请替换为实际接口地址
            filePath: fileTemp.localUrl,
            name: 'file',
            success: (uploadFileRes) => {
                console.log(`Image ${index + 1}:`, uploadFileRes.data);
                // 上传成功后更新数组中的图片信息
                picArr.value[index] = {
                    localUrl: '',
                    status: 'uploaded',
                    serverUrl: uploadFileRes.data,
                    key: uploadFileRes.data
                };
                userStore.getUserInfo();
                res(0);
            }
        });
    })

};

const uploadImages = async () => {
    for (let i = 0; i < picArr.value.length; i++) {
        await updateImage(picArr.value[i],i);
    }
};
watch(picArr, (newVal) => {
    console.log('picArr:', picArr.value);
}, {
    deep: true
});
</script>

<style>
.upload-image {
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    display: block;
    object-fit: cover;
    border: white .4rem solid;
    box-shadow: .3rem .5rem 1rem rgba(0, 0, 0, .06);
    margin-bottom: 1rem;
}

.img-container {
    position: relative;
    width: 100%;
    padding: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.image-container button {
    position: absolute;
    right: 0;
    bottom: 0;
    transform: translate(50%, 50%);
}
</style>