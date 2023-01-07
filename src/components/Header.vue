<template>
    <div
        class="h-13 px-6 border-b-1 border-gray-300 dark:border-gray-900 border-opacity-50 flex justify-between items-center bg-white dark:bg-gray-700 transition duration-500 ease-in-out fixed top-0 left-0 w-screen box-border z-50">
        <div class="flex items-center">
            <div class="i-ic:round-message cursor-pointer text-4xl text-blue-600 dark:text-white" />
            <div class="ml-2 font-semibold text-lg text-gray-900 dark:text-white">CYQ时光</div>
        </div>
        <div class="flex" style="transform: translateX(-18px);">
            <div :class="route.path === '/' ? ['bg-blue-600', 'text-white', 'font-normal'] : ['font-medium']"
                class="mr-3 py-2 px-5 rounded-full cursor-pointer dark:text-white text-sm" @click="Navto('/')">
                留言墙
            </div>
            <div :class="route.path === '/photo' ? ['bg-blue-600', 'text-white', 'font-normal'] : ['font-medium']"
                class="ml-3 py-2 px-5 rounded-full cursor-pointer dark:text-white text-sm" @click="Navto('/photo')">
                照片墙
            </div>
        </div>
        <div class="flex items-center">
            <img class="w-6 h-6 cursor-pointer" src="../assets/github.svg"
                @click="openUrl('https://github.com/printfCYQ/vue3-message-board-client.git')" />
            <div :class="appStore.theme ? 'i-ic:round-dark-mode' : 'i-ic:baseline-wb-sunny'"
                class=" text-2xl text-yellow-400 cursor-pointer ml-5" @click="appStore.toggleTheme" />

            <n-button class="ml-5" icon-placement="right" secondary strong @click="loginOrLogout">
                <template #icon>
                    <div :class="appStore.userInfo.token === '' ? 'i-ic:baseline-login' : 'i-ic:round-power-settings-new'"
                        class="text-3xl  text-blue-600 dark:text-white cursor-pointer">
                    </div>
                </template>
                {{ appStore.userInfo.token === '' ? '登录' : `退出(${appStore?.userInfo?.userName})` }}
            </n-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/index';
import { useMessage, useDialog } from 'naive-ui';
import { getCurrentInstance } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const instance = getCurrentInstance()
const appStore = useAppStore()
const router = useRouter()
const route = useRoute()
const message = useMessage()
const dialog = useDialog()
const Navto = (path: string) => {
    router.replace(path)
}

const openUrl = (url: string) => {
    window.open(url)
}
const loginOrLogout = async () => {
    // message.warning('正在开发～')
    console.log(appStore.userInfo.token);
    if (appStore.userInfo.token === '') {
        instance?.proxy?.$Bus.emit('show-login-form')
    } else {
        const d = dialog.warning({
            title: '退出不能留言了a～！',
            content: '确定退出？',
            positiveText: '确定',
            negativeText: '取消',
            onPositiveClick: async () => {
                d.loading = true
                const res = await appStore.logoutAction()
                if (res.code === 200) {
                    message.success(res.message)
                }
            },
        })

    }
}

</script>