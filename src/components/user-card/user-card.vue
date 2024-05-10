<template>
    <div class="user-card" @click="clickUser">
        <up-image :show-loading="true" :src="item.photoAlbum[0]" width="80px" height="80px"></up-image>
        <div class="user-info">
            <h2 class="user-name">{{ item.nickname }}</h2>
            <ul class="user-infos">
                <li v-for="(info, index) in [item.birthday, item.carOwnership, item.height, item.maritalStatus]"
                    :key="index">{{ info }}</li>
            </ul>
            <div class="user-tags">
                <span v-for="(tag, index) in [item.industry, item.companyType, item.carOwnership]" :key="index"
                    class="tag">{{ tag }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getUserInfo } from '@/api/mock';
import { route } from 'uview-plus';

const ItemTemp = getUserInfo();
type UserCardProps = typeof ItemTemp;

const props = defineProps<{
    item: UserCardProps,
}>()

const clickUser = () => {
    console.log(props.item)
    route(`/pages/common/user-info/user-info?item=${encodeURIComponent(JSON.stringify(props.item))}`);
};


</script>

<style scoped>
.user-card {
    display: flex;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 10px;
}

.user-image {
    width: 120px;
    height: 120px;
    border-radius: 10px;
}

.user-info {
    margin-left: 10px;
}

.user-name {
    font-size: 20px;
    font-weight: bold;
}

.user-infos {
    list-style-type: none;
    padding: 0;
}

.user-tags {
    margin-top: 10px;
}

.tag {
    display: inline-block;
    background-color: #eee;
    padding: 2px 5px;
    margin-right: 5px;
    border-radius: 5px;
}
</style>