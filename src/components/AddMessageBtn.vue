<template>
    <div :class="showFooter ? 'bottom-70' : 'bottom-20'"
        class="fixed right-5  w-10 h-10 p-2  bg-gray-900 dark:bg-white flex items-center justify-center rounded-full z-20 transition-all duration-500 ease-in-out"
        @click="add">
        <div class="i-ic:baseline-add text-4xl text-white dark:text-gray-900 cursor-pointer "></div>
    </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref } from 'vue'
const instance = getCurrentInstance()
let showFooter = ref<boolean>(false)
instance?.proxy?.$Bus.on('show-footer', (isShow: any) => {
    showFooter.value = isShow
})
const add = () => {
    instance?.proxy?.$Bus.emit('show-add-message-form')
}
</script>