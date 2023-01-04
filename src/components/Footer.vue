<template>
    <div class="m-h-45  flex justify-center items-start bg-gray-900 px-50 py-10">
        <div class="flex-1 pr-20">
            <div class="flex items-center ">
                <div class="i-ic:round-message  text-4xl text-blue-600" />
                <div class="ml-2 text-lg text-white">CYQ时光</div>
            </div>
            <div class="text-gray-500 text-xs mt-4">CYQ时光是本人独自开发的，为便于与用户交流的留言平台。</div>
            <div class="text-gray-500 text-xs mt-2">用户将留言便签贴在留言墙上，用户可以自定义便签颜色和内容属性，不仅可以用于交流，也是一场记录。</div>
        </div>
        <div class="flex-1 pr-20">
            <div class="text-gray-500 text-lg">链接</div>
            <div class="text-gray-500 text-xs mt-4 cursor-pointer hover:text-white"
                @click="openUrl('https://github.com/printfCYQ')">Github</div>
        </div>
        <div class="flex-1">
            <div class="text-gray-500 text-lg">打赏</div>
            <div class="flex mt-4">
                <div>
                    <img class="w-25 h-25" src="../assets/wx.jpg" alt="">
                    <div class="text-gray-500 text-xs">微信</div>
                </div>
                <div class="ml-4">
                    <img class="w-25 h-25" src="../assets/zfb.jpg" alt="">
                    <div class="text-gray-500 text-xs">支付宝</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const openUrl = (url: string) => {
    window.open(url)
}
</script>