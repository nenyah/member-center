import http from '@/utils/request'

type ReciverRecord = {
    username: string
    mobile: string
    province: string
    city: string
    detailPlace: string
}

export default {
    updateReceiver: (reciverRecord: ReciverRecord): Promise<any> => {
        return http.post(`receiver`, reciverRecord)
    },
}
