<template>
    <div>
        <div class="flex flex-col items-center transition duration-500 ease-in-out z-20 sticky">
            <div class="mt-12 text-4xl dark:text-white">留言墙</div>
            <div class="mt-5 text-sm text-gray-700 dark:text-gray-500">很多事情值得记录，当然也值得回味。</div>
            <div class="flex flex-wrap">
                <div :class="currentType === item.id ? ['border-1 border-gray-900', 'dark:border-gray-300', 'rounded-full', 'font-semibold'] : ['text-gray-500']"
                    class="mx-2 mt-8 text-sm dark:text-gray-500 cursor-pointer py-1 px-2" v-for="item in typeList"
                    :key="item.id" @click="chooseType(item.id)">
                    {{ item.text }}
                </div>
            </div>
        </div>
        <div class="m-auto mt-10 grid flex-wrap pb-10 gap-5 justify-center"
            style="grid-template-columns: repeat(auto-fill, 272px); ">
            <MessageCard v-for="item in data.messageList" :key="item.id" :cardInfo="item"
                @click="showCardDetail(item)" />
        </div>
        <MessageDetail ref="messageDetail"></MessageDetail>
    </div>
</template>

<script lang="ts" setup>
import messageApi from '@/api/message';
import userApi from '@/api/user';
import { getCurrentInstance } from 'vue';
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
const currentType = ref<number>(0)
const messageDetail = ref()
const currentPage = ref(1)
const instance = getCurrentInstance()
const data = reactive<{
    messageList: any[]
}>({
    messageList: []
})
const chooseType = async (item: number) => {
    currentType.value = item
    data.messageList = []
    query()
}


onMounted(() => {
    query()
})

instance?.proxy?.$Bus.on('query-message-list', () => {
    data.messageList = []
    query()
})

const query = async () => {
    const params = {
        pageSize: 20,
        pageNum: currentPage.value,
        type: currentType.value
    }
    const res: any = await messageApi.getMessage(params)
    if (res?.code === 200) {
        data.messageList.push(...res.data.list)
    }
}
const showCardDetail = (item: any) => {
    messageDetail.value.cardInfo = item
    messageDetail.value.show = true
}
</script>