import http from '@/utils/request'
import {Prepay} from '@/common/interface'

type StatusResponse = {
    code: string
    message: string
}

export default {
    prepay: (): Promise<Prepay> => {
        return http.post(`order/prepay`, {})
    },
    orderStatus: (orderNum: string): Promise<StatusResponse> => {
        return http.post(`order/status`, {orderNum})
    }
}
