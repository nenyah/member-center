export interface User {
    token: string
    openId: string
    unionId: string
    wasBuy: boolean
}

export interface Prepay {
    timeStamp: string
    nonceStr: string
    signType: string
    paySign: string
    mch_order_num: string
    package: string
}
