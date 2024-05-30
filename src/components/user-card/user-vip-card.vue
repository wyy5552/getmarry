<template>
    <div class="user-card">
        <image class="img" mode="aspectFill" src="https://www.8520y.cn/up/p/m/2024/05/101034_1715327064586_m.jpg">
        </image>
        <div class="user-info">
            <view class="name">
                {{ item.name }}
            </view>
            <view class="desc">
                {{ birthday + "/" + item.housing }}
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
    padding: 1rem 1.5rem;
    box-shadow: 0 0.2rem 1rem rgb(0 0 0 / 4%);

    .img {
        border-radius: 50%;
        width: 5rem;
        height: 5rem;
        display: inline-block;
    }

    .user-info {
        width: 100%;
        font-size: 1.5rem;

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
            font-size: 1.2rem;
        }
    }

}
</style>