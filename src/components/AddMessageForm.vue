<template>
    <n-drawer v-model:show="show" :width="400" :theme="appStore.theme ? {} : darkTheme">
        <n-drawer-content class="drawer-content" title="留言" closable :native-scrollbar="false" :body-content-style="{
            padding: 0
        }">
            <div class="p-5">
                <div class="flex">
                    <div v-for="(item, index) in colorList" :key="index"
                        :class="[item, activeColor === index ? ['scale-120'] : '']"
                        class="w-5 h-5 mr-2  border-blue-800 dark:border-white cursor-pointer transition duration-500 ease-in-out"
                        @click="chooseColor(index)">
                    </div>
                </div>
                <div class="mt-5 p-3 bg-none box-border" :class="colorList[activeColor]">
                    <textarea :class="colorList[activeColor]"
                        class="w-full resize-none border-none outline-none p-3 box-border" cols="30" rows="15"
                        placeholder="留言..." v-model="messageContent"></textarea>
                </div>
                <div class="mt-5">
                    <div class="text-gray-900 dark:text-white  pb-2">选择标签</div>
                    <div class="flex flex-wrap">
                        <div :class="currentType === item.id ? ['bg-gray-900', 'dark:bg-white', 'rounded-full', 'font-semibold', 'text-white'] : ['text-gray-500']"
                            class="mx-1 mt-1 text-sm dark:text-gray-500 cursor-pointer py-1 px-2 transition duration-500 ease-out"
                            v-for="item in typeList" :key="item.id" @click="chooseItem(item.id)">
                            {{ item.text }}
                        </div>
                    </div>
                </div>
                <div class="mt-5 pb-25">
                    <div class="text-gray-900 dark:text-white  pb-2">免责声明</div>
                    <div class="text-xs leading-5 text-gray-600 dark:text-gray-500">
                        <p>一刻时光是本人独自开发的，为便于与用户交流的留言平台。请不要利用此平台服务制作、上传、下载、复制、发布、传播或者转载如下内容：</p>
                        <p> 1、反对宪法所确定的基本原则的；</p>
                        <p> 2、危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家 统一的；</p>
                        <p> 3、损害国家荣誉和利益的；</p>
                        <p> 4、煽动民族仇恨、民族歧视，破坏民族团结的；</p>
                        <p> 5、破坏国家宗教政策，宣扬邪教和封建迷信的；</p>
                        <p> 6、散布谣言，扰乱社会秩序，破坏社会稳定的；</p>
                        <p> 7、散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；</p>
                        <p> 8、侮辱或者诽谤他人，侵害他人合法权益的；</p>
                        <p> 9、含有法律、行政法规禁止的其他内容的信息。</p>
                    </div>
                </div>
            </div>
            <div style="width:400px"
                class="fixed bottom-0 flex h-20 bg-gray-200 dark:bg-gray-800 w-full border-t-1 dark:border-gray-700 border-gray-100 py-3 px-8 box-border">
                <div class="w-25 flex items-center justify-center border-gray-900 border-2 rounded-full bg-gray-100  cursor-pointer dark:text-gray-800 dark:border-gray-100 dark:bg-gray-900 dark:text-white"
                    @click="cancel">
                    放弃</div>
                <div class="flex-1 ml-10 flex items-center justify-center border-2 border-gray-100 rounded-full bg-gray-900 text-white cursor-pointer dark:bg-gray-100 dark:text-gray-900"
                    @click="sure">
                    确定</div>
            </div>
        </n-drawer-content>
    </n-drawer>
</template>

<script setup lang="ts">
// import { colorList, typeList } from '@/config';
import messageApi from '@/api/message';
import { useAppStore } from '@/store/index';
import { darkTheme, useMessage } from 'naive-ui';
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
const appStore = useAppStore()
const instance = getCurrentInstance()
const message = useMessage()

const show = ref<boolean>(false)
const activeColor = ref<number>(0)
const messageContent = ref<string>('')
const currentType = ref<number>(0)

instance?.proxy?.$Bus.on('show-add-message-form', () => {
    show.value = true
})
const chooseItem = (item: number) => {
    currentType.value = item
}
const chooseColor = (index: number) => {
    activeColor.value = index
}

const cancel = () => {
    show.value = false
    messageContent.value = ''
    activeColor.value = 0
    currentType.value = 0
}
const sure = async () => {
    if (messageContent.value === '') {
        message.warning('请输入～')
        return
    }
    const params = {
        color: activeColor.value,
        type: currentType.value,
        message: messageContent.value
    }
    const res = await messageApi.addMessage(params)
    console.log(res)
    if (res?.code === 200) {
        message.success(res.message)
        show.value = false
        instance?.proxy?.$Bus.emit('query-message-list')

    } else {
        message.warning(res.message)
    }
}
</script>