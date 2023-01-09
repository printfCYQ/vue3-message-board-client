import http from '@/api/request'
import type * as T from './types'

const userApi: T.IMessageApi = {
    addMessage(params) {
        return http.post('/message/add', params)
    },
    getMessage(params) {
        return http.get('/message/list', params)
    },
    delMessage(id) {
        return http.post(`/message/del?id=${id}`)
    }
}
export default userApi