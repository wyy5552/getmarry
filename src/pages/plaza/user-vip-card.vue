<template>
    <div class="user-card">
        <image class="img" mode="aspectFill" :src="item.userpic">
        </image>
        <div class="user-info">
            <view class="name">
                {{ item.nickname }}
            </view>
            <view class="desc">
                {{ birthday + "/" + item.registeredArea }}
            </view>
        </div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps<{
    item: any,
}>()

const birthday = computed(() => {
    const birthDate = new Date(props.item.birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age + "岁";
})



</script>

<style scoped lang="scss">
.user-card {
    width: 31vw;
    text-align: center;
    display: block;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 1rem;
    padding: 1rem;
    box-shadow: 0 0.2rem 1rem rgb(0 0 0 / 4%);

    .img {
        border-radius: 50%;
        width: 5rem;
        height: 5rem;
        display: inline-block;
    }

    .user-info {
        width: 100%;
        font-size: 1rem;

        .name {
            width: 90%;
            display: inline-block;
            vertical-align: middle;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #333;
        }

        .desc {
            display: block;
            margin-top: .5rem;
            color: #999;
            font-size: 0.8rem;
        }
    }

}
</style>