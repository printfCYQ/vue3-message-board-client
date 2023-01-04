import http from '@/api/request'
import type * as T from './types'

const userApi: T.IUserApi = {
    me() {
        return http.get('/getCurrentUser')
    },
}
export default userApi