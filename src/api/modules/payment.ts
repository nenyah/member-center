import http from '@/utils/request'
import {Prepay} from '@/common/interface'

type StatusResponse = {
    code: string
    message: string
}
type OrderData = {
    username: string
    mobile: string
    address: string
    description: string
    amount: number
    remark?: string
}

export default {
    prepay: (orderNum: string): Promise<Prepay> => {
        return http.post(`wechat/order/prepay`, orderNum)
    },
    orderStatus: (orderNum: string): Promise<StatusResponse> => {
        return http.post(`order/status`, {orderNum})
    },
    createOrder: (orderData: OrderData): Promise<string> => {
        return http.post(`order`, orderData)
    },
    closeOrder: (orderNum: string): Promise<string> => {
        return http.delete(`order/close?orderNum=${orderNum}`, {})
    },
    closeWechatOrder: (orderNum: string): Promise<string> => {
        return http.delete(`wechat/order/close?orderNum=${orderNum}`, {})
    },
}
