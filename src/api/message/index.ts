import http from '@/api/request'
import type * as T from './types'

const userApi: T.IUserApi = {
    addMessage(params) {
        return http.post('/message/add',params)
    },
    getMessage(params) {
        return http.get('/message/list', params)
    },
    delMessage(id) {
        return http.post('/message/del', id)
    }
}
export default userApi