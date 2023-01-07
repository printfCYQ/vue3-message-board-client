<template>
    <n-drawer v-model:show="show" :width="400" :theme="appStore.theme ? {} : darkTheme">
        <n-drawer-content class="drawer-content" title="详情" closable :native-scrollbar="false">
            <span class="mt-5 cursor-pointer hover:text-blue-500" @click="report">举报</span>
            <div :class="colorList[cardInfo.color]" class=" p-6 mt-3 bg-opacity-20 cursor-pointer box-border">
                <div class="flex justify-between text-xs text-gray-400">
                    <div> {{ formatTime(cardInfo.createTime) }}</div>
                    <div>{{ typeList[cardInfo.type].text }}</div>
                </div>
                <div style="font-family: serif;" class="mt-2 h-56 text-sm dark:text-gray-400 text-gray-800">
                    {{ cardInfo.message }}
                </div>
                <div class="flex justify-between items-center dark:text-gray-400 text-gray-800">
                    <div class="flex items-center">
                        <div :class="true ? [' text-blue-600', ' dark:text-blue-400'] : ['text-gray-400']"
                            class="i-ic:sharp-thumb-up-off-alt cursor-pointer text-base  " />
                        <div class="ml-1 text-sm">{{ 2}}</div>
                        <div class="i-ic:baseline-mode-comment cursor-pointer text-base  text-gray-400 ml-2" />
                        <div class="ml-1 text-sm">{{ 2 }}</div>
                    </div>
                    <div class="text-base font-light">{{ cardInfo.user.userName }}</div>
                </div>
            </div>
            <div class="mt-5">
                <n-input v-model:value="reMessage" :autosize="{ minRows: 3, maxRows: 3 }" type="textarea"
                    placeholder="基本的 Textarea" />
            </div>
            <div class="mt-3">
                <n-button class="w-full" type="info" @click="submit">
                    评论
                </n-button>
            </div>
            <div class="mt-5">
                <div class="pt-5">评论（10）</div>
                <div class="flex mt-2 border-b-1 border-gray-200 dark:border-gray-600 py-2" v-for="item in 5"
                    :key="item">
                    <div>
                        <img class="w-7 h-7 rounded-full" src="../assets/zfb.jpg" alt="">
                    </div>
                    <div class="ml-2">
                        <div class="flex items-center">
                            <div class="text-sm">USERNAME</div>
                            <div class="text-xs ml-2 text-gray-500">2023/01/05 15:25</div>
                        </div>
                        <div class="mt-1 text-sm">
                            我是评论
                        </div>
                    </div>
                </div>
            </div>
        </n-drawer-content>
    </n-drawer>
</template>

<script setup lang="ts">
import { typeList } from '@/config';
import { useAppStore } from '@/store/index';
import { formatTime } from '@/utils';
import { darkTheme, useMessage } from 'naive-ui';
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
const appStore = useAppStore()
const show = ref<boolean>(false)
const cardInfo = ref<any>({})
const reMessage = ref('评论～')
const report = () => {
    message.warning('正在开发～')
}

const submit = () => {
    message.warning('正在开发～')
}

defineExpose({
    cardInfo,
    show
})
</script>