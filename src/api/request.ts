// import { useAppStore } from '@/store';
import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import NProgress from 'nprogress';

// 设置请求头和请求路径
axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_URL
axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.interceptors.request.use(
    (config): AxiosRequestConfig<any> => {
        // const appStore = useAppStore()
        // if (appStore.token && config.headers) {
        //     config.headers["Authorization"] = "Bearer " + appStore.token;
        // }
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
    return error
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
                    console.log('err', err);
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
