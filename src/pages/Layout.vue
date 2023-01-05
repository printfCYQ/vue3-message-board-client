<template>
    <div :style="{
        backgroundColor: appStore.theme ? '#fff' : '#071123'
    }">
        <Header></Header>
        <div class="mt-13 z-40" style="min-height:calc(100vh - 312px)">
            <video v-if="appStore.theme" style="height:880px" autoplay loop muted src="../assets/bg-light.mp4">
            </video>
            <video v-else style="height:1000px" autoplay loop muted src="../assets/bg-dark.mp4">
            </video>
            <router-view></router-view>
            <!-- <router-view>
                <template #default="{ Component, route }">
                    <transition name="zoom-out" mode="out-in" appear>
                        <component :is="Component" :key="route.path" />
                    </transition>
                </template>
            </router-view> -->

        </div>
        <Footer></Footer>
        <AddMessageBtn></AddMessageBtn>
        <AddMessageForm></AddMessageForm>
    </div>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/index';
const appStore = useAppStore()

onMounted(() => {
    appStore.theme ? document.documentElement.classList.remove('dark') : document.documentElement.classList.add('dark')
})
</script>
<style>
video {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
}
</style>