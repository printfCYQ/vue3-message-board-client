<template>
  <n-config-provider :theme="appStore.theme ? {} : darkTheme">
    <n-message-provider>
      <n-dialog-provider>
        <Layout />
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>
<script setup lang="ts">
import Layout from '@/pages/Layout.vue'
import { useAppStore } from '@/store/index';
import { darkTheme } from 'naive-ui';
const appStore = useAppStore()
</script>