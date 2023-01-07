import http from '@/api/request'
import type * as T from './types'

const userApi: T.IUserApi = {
    me() {
        return http.get('/user/current')
    },
    login(params) {
        return http.post('/user/login', params)
    },
    logout(){
        return http.get('/user/logout')
    },
    register(params) {
        return http.post('/user/register', params)
    }
}
export default userApi