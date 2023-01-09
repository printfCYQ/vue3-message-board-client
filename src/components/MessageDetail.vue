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
                        <div :class="false ? [' text-blue-600', ' dark:text-blue-400'] : ['text-gray-400']"
                            class="i-ic:sharp-thumb-up-off-alt cursor-pointer text-base  " @click.stop="clickUp" />
                        <div class="ml-1 text-sm">{{ 0 }}</div>
                        <div class="i-ic:baseline-mode-comment cursor-pointer text-base  text-gray-400 ml-2" />
                        <div class="ml-1 text-sm">{{ commentCount }}</div>
                    </div>
                    <div class="text-base font-light">{{ cardInfo.user.userName }}</div>
                </div>
            </div>
            <div class="mt-5">
                <n-input v-model:value="comment" :autosize="{ minRows: 3, maxRows: 3 }" type="textarea"
                    placeholder="评论～" />
            </div>
            <div class="mt-3">
                <n-button class="w-full" type="info" @click="submit" :loading="loading">
                    评论
                </n-button>
            </div>
            <div class="mt-5">
                <div class="pt-5">评论（{{ commentCount }}）</div>
                <div class="flex mt-2 border-b-1 border-gray-200 dark:border-gray-600 py-2"
                    v-for="item in data.commentList" :key="item.id">
                    <div>
                        <!-- <img class="w-7 h-7 rounded-full" src="../assets/zfb.jpg" alt=""> -->
                        <div :class="colorList[randomNum()]" class="w-7 h-7 rounded-full"></div>
                    </div>
                    <div class="ml-2 flex-1">
                        <div class="flex items-center">
                            <div class="text-sm">{{ item?.user?.userName || '' }}</div>
                            <div class="text-xs ml-2 text-gray-500">{{ formatTime(item.createTime) }}</div>
                        </div>
                        <div class="mt-1 text-sm">
                            {{ item.comment }}
                        </div>
                        <div v-if="appStore.userInfo.id === item?.user?.id" class=" text-right">
                            <span class="cursor-pointer text-red-500 hover:text-red-600"
                                @click="delComment(item.id)">删除</span>
                        </div>
                    </div>
                </div>
            </div>
        </n-drawer-content>
    </n-drawer>
</template>

<script setup lang="ts">
import commentApi from '@/api/comment';
import { typeList } from '@/config';
import { useAppStore } from '@/store/index';
import { formatTime } from '@/utils';
import { darkTheme, useMessage, useDialog } from 'naive-ui';
const colorList = [
    'bg-red-300',
    'bg-yellow-300',
    'bg-green-300',
    'bg-blue-300',
    'bg-indigo-300',
    'bg-purple-300',
    'bg-pink-300'
]
const dialog = useDialog()
const message = useMessage()
const appStore = useAppStore()
const show = ref<boolean>(false)
const cardInfo = ref<any>({})
const comment = ref<string>('')
const loading = ref<boolean>(false)
const commentCount = ref<number>(0)
const data = reactive<{
    commentList: any
}>({
    commentList: []
})
watch(() => show.value, (newValue, oldValue) => {
    // 开
    if (newValue) {
        queryCommentList()
    }
    // 关
    else {
        data.commentList = []
    }
})
const report = () => {
    message.warning('正在开发～')
}
const clickUp = () => {
    message.warning('正在开发～')
}

const submit = async () => {
    if (comment.value === '') {
        message.warning('请输入～')
        return
    }
    loading.value = true
    try {
        const res = await commentApi.addComment({ message: cardInfo.value.id, comment: comment.value })
        if (res.code === 200) {
            message.success(res.message)
            comment.value = ''
            data.commentList = []
            queryCommentList()
        } else {
            message.warning(res.message)
        }
        loading.value = false
    } catch (error) {
        loading.value = false
    }
}

const queryCommentList = async () => {
    const params = {
        messageId: cardInfo.value.id
    }
    const res = await commentApi.getComment(params)
    if (res.code === 200) {
        data.commentList.push(...res.data.list)
        commentCount.value = res.data.commentCount
    }
}

const delComment = async (id: number) => {
    const d = dialog.warning({
        title: '删除！',
        content: '确定删除？',
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: async () => {
            d.loading = true
            const res = await commentApi.delComment(id)
            if (res.code === 200) {
                message.success(res.message)
                data.commentList = []
                queryCommentList()
            }
        },
    })
}

const randomNum = () => {
    return Math.round(Math.random() * (colorList.length - 1))
}
defineExpose({
    cardInfo,
    show
})
</script>