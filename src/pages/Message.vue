<template>
    <div class="flex flex-col items-center transition duration-500 ease-in-out">
        <div class="mt-12 text-4xl dark:text-white">留言墙</div>
        <div class="mt-5 text-sm text-gray-700 dark:text-gray-500">很多事情值得记录，当然也值得回味。</div>
        <div class="flex flex-wrap">
            <div :class="current === item ? ['border-1 border-gray-900', 'dark:border-gray-300', 'rounded-full', 'font-semibold'] : ['text-gray-500']"
                class="mx-2 mt-8 text-sm dark:text-gray-500 cursor-pointer py-1 px-2" v-for="item in 10" :key="item"
                @click="chooseItem(item)">
                标签{{ item }}
            </div>
        </div>
    </div>
    <div class="mt-10 grid flex-wrap pb-10 px-50 gap-5" style="grid-template-columns: repeat(auto-fill, 272px);">
        <MessageCard :messageList="[]" />
    </div>
</template>

<script lang="ts" setup>
const current = ref<number>(1)
const chooseItem = (item: number) => {
    current.value = item
}
</script>