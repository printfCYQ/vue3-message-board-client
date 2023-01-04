<template>
    <div v-for="item in 30" :key="item" :class="colorList[randomNum()]"
        class="w-60 h-60 p-4 bg-opacity-20 cursor-pointer hover:bg-opacity-40 hover:-mt-2 transition duration-500 ease-in-out">
        <div class="flex justify-between text-xs text-gray-400">
            <div>2022/12/28 18:41</div>
            <div>目标</div>
        </div>
        <div style="font-family: serif;" class="mt-2 h-47 text-sm dark:text-gray-400 text-gray-800">
            没人给我留言吗?
        </div>
        <div class="flex justify-between items-center dark:text-gray-400 text-gray-800">
            <div class="flex items-center">
                <div :class="true ? [' text-blue-600', ' dark:text-blue-400'] : ['text-gray-400']"
                    class="i-ic:sharp-thumb-up-off-alt cursor-pointer text-base  " />
                <div class="ml-1 text-sm">{{ 2}}</div>
                <div class="i-ic:baseline-mode-comment cursor-pointer text-base  text-gray-400 ml-2" />
                <div class="ml-1 text-sm">{{ 2 }}</div>
            </div>
            <div class="text-base font-light">匿名</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    messageList: []
}>()

const colorList = [
    'bg-red-300',
    'bg-yellow-300',
    'bg-green-300',
    'bg-blue-300',
    'bg-indigo-300',
    'bg-purple-300',
    'bg-pink-300',
]

const randomNum = () => {
    return Math.round(Math.random() * (colorList.length - 1))
}
</script>