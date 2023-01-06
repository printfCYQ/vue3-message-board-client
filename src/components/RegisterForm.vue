<template>
    <n-modal v-model:show="showModal" class="custom-card" preset="card" :style="bodyStyle" title="Register" size="huge"
        :bordered="false" :segmented="segmented" :theme="appStore.theme ? '' : darkTheme">
        <n-form ref="formRef" label-placement="left" label-align="left" :label-width="70" :model="loginForm"
            :rules="rules" :show-require-mark="false">
            <n-form-item label="邮箱" path="email">
                <n-input v-model:value="loginForm.email" placeholder="请输入邮箱" />
            </n-form-item>
            <n-form-item label="密码" path="password">
                <n-input type="password" show-password-on="mousedown" placeholder="请输入密码"
                    v-model:value="loginForm.password" />
            </n-form-item>
            <n-form-item label="确认密码" path="rePassword">
                <n-input type="password" show-password-on="mousedown" placeholder="请输入密码"
                    v-model:value="loginForm.rePassword" />
            </n-form-item>
            <n-form-item label="验证码" path="code">
                <div class="w-full flex justify-between">
                    <n-input class="flex-1" v-model:value="loginForm.code" placeholder="请输入验证码" />
                    <img class="h-8 ml-2 cursor-pointer" style="" src="../assets/code.svg" alt="">
                </div>
            </n-form-item>
        </n-form>
        <template #footer>
            <n-button class="w-full" attr-type="button" type="primary" :loading="loading" @click="registerSubmit">
                注册
            </n-button>
        </template>
    </n-modal>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue';
import type { FormInst } from 'naive-ui';
import { useAppStore } from '@/store/index';
import { darkTheme, useMessage } from 'naive-ui';
const message = useMessage()
const appStore = useAppStore()
const instance = getCurrentInstance()
const bodyStyle = {
    width: '600px'
}
const segmented = {
    content: 'soft',
    footer: 'soft'
}

// 表单校验规则
const rules = {
    email: {
        required: true,
        message: '请输入邮箱',
        trigger: 'blur'
    },
    password: {
        required: true,
        message: '请输入密码',
        trigger: ['input', 'blur']
    },
    rePassword: {
        required: true,
        message: '请输入密码',
        trigger: ['input', 'blur']
    },
    code: {
        required: true,
        message: '请输入验证码',
        trigger: ['input']
    }
}

const formRef = ref<FormInst | null>(null)
let loading = ref<boolean>(false) // 按钮loading

// 登陆表达form
const loginForm = ref<any>({
    email: 'admin@qq.com',
    password: 'admin',
    rePassword: 'admin',
    code: '1234'
})

const showModal = ref(false)

// 注册按钮
const registerSubmit = (e: MouseEvent) => {
    e.preventDefault()
    formRef.value?.validate(async (errors) => {
        if (!errors) {
            loading.value = true
        }
    })
    loading.value = false
}

instance?.proxy?.$Bus.on('show-register-form', () => {
    showModal.value = true
})
</script>