import http from '@/utils/request'

type ShareParams = {
    page: string
    scene: string
}
export default {
    poster: (shareParams: ShareParams): Promise<String> => {
        return http.get(`wechat/wxacode`, shareParams)
    },
}
