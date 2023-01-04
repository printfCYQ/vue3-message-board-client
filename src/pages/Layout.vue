<template>
    <div>
        <Header></Header>
        <div class="mt-13 z-40" style="min-height:calc(100vh - 298px)">
            <video v-if="appStore.theme" style="height:880px" autoplay loop muted src="../assets/bg-light.mp4">
            </video>
            <video v-else style="height:1000px" autoplay loop muted src="../assets/bg-dark.mp4">
            </video>
            <transition name="fade" mode="out-in" appear>
                <router-view></router-view>
            </transition>
        </div>
        <Footer></Footer>
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
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

video {
    position: fixed;
    z-index: -1;
    top: 0;
    left: 0;
}
</style>