import type { GlobalTheme } from 'naive-ui';
import { defineStore } from 'pinia';
interface AppStateType {
    count: number,
    theme: boolean
}
export const useAppStore = defineStore('app', {
    state: (): AppStateType => {
        return {
            count: 0,
            theme: true, // true:'light', false:'dark'
        }
    },
    persist: true, // 持久化
    actions: {
        addCount() {
            this.count++
        },
        toggleTheme() {
            this.theme ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark')
            this.theme = !this.theme
        }
    }
})
