<template>
    <view class="bg-gray-200" v-if="paymentStatus==='prepay'">
        <!-- 倒计时 -->
        <view class="flex flex-col items-center bg-white py-2">
            <view class="text-gray-500 text-sm">支付剩余时间</view>
            <!-- 一般用法 -->
            <uni-countdown color="#FFFFFF" background-color="#be3136" border-color="#be3136" :day="0" :hour="0"
                           :minute="5" :second="0" :showDay="false"></uni-countdown>
        </view>
        <!-- 产品 -->
        <view class="flex px-5 py-2 mt-1 mb-10 bg-white">
            <!-- 产品图片 -->
            <view class="flex justify-center items-center">
                <image :src="productImg" mode="widthFix" class="w-10 h-10"></image>
            </view>
            <!-- 产品信息 -->
            <view class="ml-5">
                <view class="font-bold">{{ product }} ￥ 0 元</view>
                <view>邮费: ￥ 10.00 元</view>
                <view>合计: ￥ 10.00 元</view>
            </view>
        </view>

        <u-button @click="payOrder" type="success" :custom-style="shareStyle" hover-class="">确认支付 ￥ 10.00</u-button>
    </view>
    <view v-else-if="paymentStatus==='success'" class="h-full flex flex-col justify-center items-center">
        <view class="text-center mb-10">
            <view class="fa fa-check-circle text-theme text-3xl"></view>
            <view class="font-bold text-lg">恭喜下单成功，请耐心等待</view>
        </view>
        <view class="text-center mb-10 text-base">
            <view>订单号：6666666666666666</view>
            <view>金额：￥10.00</view>
            <view class="text-sm">猛戳下方按钮 ↓</view>
        </view>
        <view>
            <u-button type="primary" shape="circle" :custom-style="shareStyle" @click="sharePoster">分享给好友</u-button>
            <u-button type="primary" shape="circle" :custom-style="backStyle" @click="goIndex">返回首页</u-button>
        </view>
        <u-modal
            v-model="show"
            :show-title="false"
            width="80%"
            :mask-close-able="true"
            confirm-text="保存图片"
            confirm-color="#be3136"
            @confirm="confirm"
        >
            <view class="slot-content">
                <image :src="pimg" mode="aspectFill"
                       class=""></image>
            </view>
        </u-modal>
    </view>
    <view v-else class="h-full px-10 flex flex-col justify-center items-center">
        <image src="/static/failed_toast.png" style="width: 5rem;height: 5rem;"></image>
        <view class="my-10 text-center">
            <view class="text-lg">支付失败</view>
            <view class="text-xs text-gray-500" @click="paymentStatus='prepay'">返回查看订单详情</view>
        </view>
        <button @click="payOrder" class="bg-theme w-full text-gray-100 p-2 mt-10">重新支付</button>
    </view>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import uniCountdown from '@/components/uni-countdown/uni-countdown.vue'
import {PrepayStoreModule} from '@/store/modules/payment'
import api from '@/api'
import {appConfig} from '@/common/config'

@Component({
    components: {
        uniCountdown
    }
})
export default class Payment extends Vue {
    private product = appConfig.product
    private pimg = 'http://dev.huadongbio.com:8500/shanjian-app/index-cover.jpg'
    private productImg = appConfig.productImg
    private paymentStatus = 'prepay'
    private shareStyle = {
        marginTop: '20px', // 注意驼峰命名，并且值必须用引号包括，因为这是对象
        background: '#be3136',
    }
    private backStyle = {
        marginTop: '20px',
        background: '#9e9e9e',
    }
    private show = false

    private payOrder() {
        // #ifdef  MP-WEIXIN
        wx.requestPayment({
            timeStamp: `${PrepayStoreModule.prepayInfo.timeStamp}`,
            nonceStr: `${PrepayStoreModule.prepayInfo.nonceStr}`,
            package: `${PrepayStoreModule.prepayInfo.package}`,
            signType: 'RSA',
            paySign: `${PrepayStoreModule.prepayInfo.paySign}`,
            success: async (res) => {
                console.log('success:' + JSON.stringify(res))
                if (res.errMsg.includes('requestPayment:ok')) {
                    //    支付成功，调用接口查询后台订单状态
                    const res = await api.payment.orderStatus(
                        `${PrepayStoreModule.prepayInfo.mch_order_num}`
                    )
                        .catch((err: any) => {
                            this.paymentStatus = 'fail'
                            return
                        })
                    console.log('订单状态:::', res)
                    this.paymentStatus = 'success'
                } else {
                    this.paymentStatus = 'fail'
                }
            },
            fail: (err) => {
                console.log('fail:' + JSON.stringify(err))
                //    支付失败
                this.paymentStatus = 'fail'
            }
        })
        // #endif
    }

    private async sharePoster() {
        const res = await api.share.poster({
            page: `pages/index/index`,
            scene: `index`
        }).catch((err: any) => {
            uni.showModal({
                content: `下载分享海报失败，请重试`,
                showCancel: false
            })
            return
        })
        console.log(res)
        this.pimg = res
        this.show = true
    }

    private goIndex() {
        uni.redirectTo({
            url: `/pages/index/index`
        })
    }

    private async confirm() {
        uni.saveImageToPhotosAlbum({
            filePath: this.pimg,
            success: result => {
                uni.showToast({title: `保存成功`})
            },
            fail: err => {
                uni.showToast({title: `保存失败，请重试`, icon: 'none'})
            }
        })
    }

    private updated() {
        uni.setNavigationBarTitle({
            title: this.paymentStatus === 'success' ? '支付成功' : this.paymentStatus === 'fail' ? '支付失败' : '订单确认',
        })

    }
}
</script>

<style lang="scss" scoped>

</style>
