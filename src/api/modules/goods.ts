import http from '@/utils/request'
import { Goods } from '@/common/interface'


export default {
    info: (id: string): Promise<Goods> => {
        return http.get(`goods/${id}`, null)
    },
}
