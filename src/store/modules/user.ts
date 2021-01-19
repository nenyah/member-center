import {Action, getModule, Module, Mutation, VuexModule,} from 'vuex-module-decorators'
import store from '@/store'
import api from '@/api'
import {User} from '@/common/interface'
import {token} from '@/utils/token'

@Module({
    name: 'user', dynamic: true, namespaced: true, store,
})
export default class UserStore extends VuexModule {
    public loginInfo: User = {
        token: '', openId: '', unionId: '', wasBuy: false
    }

    @Mutation
    USERINFO(user: User): void {
        console.log(user)
        this.loginInfo = user
    }

    @Action({commit: 'USERINFO'})
    async getUserinfo(): Promise<User> {
        const [err, res]: any = await uni.login({
            provider: 'weixin',
        })
        const {openId, token: token1, unionId, wasBuy} = await api.user.wxMaLogin(res.code)
        token.set(token1)
        return {
            token: token1, openId, unionId, wasBuy
        }
    }
}
// 使用getModule: 对类型安全的访问
export const UserStoreModule = getModule(UserStore)