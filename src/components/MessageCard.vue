<template>
    <div :class="colorList[cardInfo.color]"
        class="w-60 h-60 p-4 bg-opacity-20  hover:bg-opacity-40 hover:-mt-2 transition-all duration-500 ease-in-out z-20 sticky">
        <div class="flex justify-between text-xs text-gray-400">
            <div>{{ formatTime(cardInfo.createTime) }}</div>
            <div class="flex">
                <div>{{ typeList[cardInfo.type].text }}</div>
                <div v-if="appStore.userInfo.id === cardInfo.user.id" class="ml-2 cursor-pointer hover:text-red-400"
                    @click.stop="delMessage">删除</div>
            </div>
        </div>
        <div style="font-family: serif;" class="mt-2 h-47 text-sm dark:text-gray-400 text-gray-800 cursor-pointer">
            {{ cardInfo?.message }}
        </div>
        <div class="flex justify-between items-center dark:text-gray-400 text-gray-800">
            <div class="flex items-center">
                <div :class="false ? [' text-blue-600', ' dark:text-blue-400'] : ['text-gray-400']"
                    class="i-ic:sharp-thumb-up-off-alt cursor-pointer text-base" @click.stop="clickUp" />
                <div class="ml-1 text-sm">{{ 0 }}</div>
                <div class="i-ic:baseline-mode-comment  text-base  text-gray-400 ml-2" />
                <div class="ml-1 text-sm">{{ cardInfo.commentCount }}</div>
            </div>
            <div class="text-base font-light">{{ cardInfo?.user?.userName }}</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import messageApi from '@/api/message';
import { useAppStore } from '@/store/index';
import { formatTime } from '@/utils';
import { useDialog, useMessage } from 'naive-ui';
import { getCurrentInstance } from 'vue';

const colorList = [
    'bg-red-300',
    'bg-yellow-300',
    'bg-green-300',
    'bg-blue-300',
    'bg-indigo-300',
    'bg-purple-300',
    'bg-pink-300'
]
const typeList = [
    { id: 0, text: '留言' },
    { id: 1, text: '目标' },
    { id: 2, text: '理想' },
    { id: 3, text: '过去' },
    { id: 4, text: '将来' },
    { id: 5, text: '爱情' },
    { id: 6, text: '亲情' },
    { id: 7, text: '友情' },
    { id: 8, text: '秘密' },
    { id: 9, text: '信条' },
    { id: 10, text: '无题' }]
interface CardInfo {
    color: number
    createTime: string
    id: number
    message: string
    type: number
    updateTime: string
    user: any
    commentCount: number
}
const instance = getCurrentInstance()
const appStore = useAppStore()
const dialog = useDialog()
const message = useMessage()

const props = defineProps<{
    cardInfo: CardInfo
}>()

const clickUp = () => {
    message.warning('正在开发～')
}

const delMessage = async () => {
    const d = dialog.warning({
        title: '删除！',
        content: '确定删除？',
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: async () => {
            d.loading = true
            const res = await messageApi.delMessage(props.cardInfo.id)
            if (res.code === 200) {
                message.success(res.message)
                instance?.proxy?.$Bus.emit('query-message-list')
            }
        },
    })
}
</script>