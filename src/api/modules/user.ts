import http from '@/utils/request'
import {User} from '@/common/interface'

type Code = string

export default {
    wxMaLogin: (code: Code): Promise<User> => {
        return http.get(`auth/login`, {code})
    },
}
