// import { useAppStore } from '@/store';
import { useAppStore } from '@/store';
import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { createDiscreteApi } from 'naive-ui';
import NProgress from 'nprogress';

const { message } = createDiscreteApi(
    ['message'],
)
// 设置请求头和请求路径
axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_URL
axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.interceptors.request.use(
    (config): AxiosRequestConfig<any> => {
        const appStore = useAppStore()
        if (appStore.userInfo.token && config.headers) {
            config.headers["Authorization"] = "Bearer " + appStore.userInfo.token;
        }
        return config
    },
    (error) => {
        return error
    }
)
// 响应拦截
axios.interceptors.response.use(async (res) => {
    return res
}, async (error) => {
    if (error?.response?.status === 401) {
        const appStore = useAppStore()
        message.warning('登陆凭证过期，请重新登陆')
        appStore.resetUserInfo()
        return 
    } else {
        return error.response
    }
})

export interface ResType<T> {
    code: number
    data?: T
    message: string
}
interface Http {
    get<T>(url: string, params?: unknown): Promise<ResType<T>>
    post<T>(url: string, params?: unknown): Promise<ResType<T>>
    upload<T>(url: string, params: unknown): Promise<ResType<T>>
    download(url: string): void
}

const http: Http = {
    get(url, params) {
        return new Promise((resolve, reject) => {
            NProgress.start()
            axios
                .get(url, { params })
                .then((res) => {
                    NProgress.done()
                    resolve(res.data)
                })
                .catch(async (err) => {
                    NProgress.done()
                    reject(err)
                })
        })
    },
    post(url, params) {
        return new Promise((resolve, reject) => {
            NProgress.start()
            axios
                .post(url, JSON.stringify(params))
                .then((res) => {
                    NProgress.done()
                    resolve(res.data)
                })
                .catch((err) => {
                    NProgress.done()
                    reject(err)
                })
        })
    },
    upload(url, file) {
        return new Promise((resolve, reject) => {
            NProgress.start()
            axios
                .post(url, file, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                })
                .then((res) => {
                    NProgress.done()
                    resolve(res.data)
                })
                .catch((err) => {
                    NProgress.done()
                    reject(err)
                })
        })
    },
    download(url) {
        const iframe = document.createElement('iframe')
        iframe.style.display = 'none'
        iframe.src = url
        iframe.onload = function () {
            document.body.removeChild(iframe)
        }
        document.body.appendChild(iframe)
    },
}
export default http
