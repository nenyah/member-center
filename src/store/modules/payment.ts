import {Action, getModule, Module, Mutation, VuexModule,} from 'vuex-module-decorators'
import store from '@/store'
import api from '@/api'
import {Prepay} from '@/common/interface'

interface Reciver {
    detailPlace: string;
    province: string;
    city: string;
    mobile: string;
    username: string
}

@Module({
    name: 'payment', dynamic: true, namespaced: true, store,
})
export default class PaymentStore extends VuexModule {
    public prepayInfo: Prepay = {
        timeStamp: '',
        nonceStr: '',
        signType: '',
        paySign: '',
        package: ''
    }
    public reciverInfo: Reciver = {
        username: '谭先生',
        mobile: '13115689743',
        province: '浙江省',
        city: '宁波市',
        detailPlace: '北仑大碶街道庐山西路26号'
    }

    @Mutation
    PREPAYINFO(prepay: Prepay) {
        console.log(prepay)
        this.prepayInfo = prepay
    }

    @Mutation
    RECIEVERINFO(reciver: Reciver) {
        console.log(reciver)
        this.reciverInfo = reciver
    }

    @Action({commit: 'PREPAYINFO'})
    async getPrepayInfo(orderNum: string): Promise<Prepay> {
        const res: Prepay = await api.payment.prepay(orderNum).catch((err: any) => {
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
export const PaymentStoreModule = getModule(PaymentStore)