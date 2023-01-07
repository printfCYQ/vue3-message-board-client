import userApi from '@/api/user';
import { LoginForm } from '@/api/user/types';
import { defineStore } from 'pinia';

interface UserInfo {
    userName: string
    token: string
}
interface AppStateType {
    count: number,
    theme: boolean
    userInfo: UserInfo
}
export const useAppStore = defineStore('app', {
    state: (): AppStateType => {
        return {
            count: 0,
            theme: true, // true:'light', false:'dark'
            userInfo: {
                userName: '',
                token: ''
            }
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
        },
        async loginAction(params: LoginForm) {
            const res = await userApi.login(params)
            if (res?.code == 200) {
                console.log(res);
                this.userInfo.token = res?.data?.token
                const userInfo = await userApi.me()
                this.userInfo.userName = userInfo.userName
            }
            return res
        },
        async logoutAction() {
            const res = await userApi.logout()
            if (res?.code == 200) {
                console.log(res);
                this.userInfo.token = ''
                this.userInfo.userName = ''
            }
            return res
        }
    }
})
