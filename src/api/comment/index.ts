import http from '@/api/request'
import type * as T from './types'

const userApi: T.ICommentApi = {
    addComment(params) {
        return http.post('/comment/add', params)
    },
    getComment(params) {
        return http.get('/comment/list', params)
    },
    delComment(id) {
        return http.post(`/comment/del?id=${id}`)
    }
}
export default userApi