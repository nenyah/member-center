import {Action, getModule, Module, Mutation, VuexModule,} from 'vuex-module-decorators'
import store from '@/store'
import api from '@/api'
import {Prepay} from '@/common/interface'

@Module({
    name: 'payment', dynamic: true, namespaced: true, store,
})
export default class PaymentStore extends VuexModule {
    public prepayInfo: Prepay = {
        timeStamp: '',
        nonceStr: '',
        signType: '',
        paySign: '',
        mch_order_num: '',
        package: ''
    }

    @Mutation
    PREPAYINFO(prepay: Prepay): void {
        console.log(prepay)
        this.prepayInfo = prepay
    }

    @Action({commit: 'PREPAYINFO'})
    async getPrepayInfo(): Promise<Prepay> {
        const res: Prepay = await api.payment.prepay().catch((err: any) => {
            uni.showModal({
                content: `生成预付单失败` + JSON.stringify(err),
                showCancel: false
            })
            return
        })
        console.log('getPrepayInfo:::', res)
        return res
    }
}
// 使用getModule: 对类型安全的访问
export const PrepayStoreModule = getModule(PaymentStore)