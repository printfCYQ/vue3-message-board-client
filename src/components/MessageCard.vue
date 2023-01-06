<template>
    <div :class="colorList[randomNum()]"
        class="w-60 h-60 p-4 bg-opacity-20  hover:bg-opacity-40 hover:-mt-2 transition-all duration-500 ease-in-out z-20 sticky">
        <div class="flex justify-between text-xs text-gray-400">
            <div>2022/12/28 18:41</div>
            <div>目标</div>
        </div>
        <div style="font-family: serif;" class="mt-2 h-47 text-sm dark:text-gray-400 text-gray-800 cursor-pointer">
            没人给我留言吗?
        </div>
        <div class="flex justify-between items-center dark:text-gray-400 text-gray-800">
            <div class="flex items-center">
                <div :class="true ? [' text-blue-600', ' dark:text-blue-400'] : ['text-gray-400']"
                    class="i-ic:sharp-thumb-up-off-alt cursor-pointer text-base" @click.stop="clickUp" />
                <div class="ml-1 text-sm">{{ 2}}</div>
                <div class="i-ic:baseline-mode-comment  text-base  text-gray-400 ml-2" />
                <div class="ml-1 text-sm">{{ 2 }}</div>
            </div>
            <div class="text-base font-light">匿名</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
// import { colorList } from '@/config';
import { useMessage } from 'naive-ui';
const colorList = [
    'bg-red-300',
    'bg-yellow-300',
    'bg-green-300',
    'bg-blue-300',
    'bg-indigo-300',
    'bg-purple-300',
    'bg-pink-300'
]

const message = useMessage()
defineProps<{
    cardInfo: {}
}>()

const clickUp = () => {
    message.warning('正在开发～')
}

const randomNum = () => {
    return Math.round(Math.random() * (colorList.length - 1))
}
</script>