<template>
    <view class="bg-gray-200" v-if="paymentStatus==='prepay'">
        <!-- 收货人-->
        <view class="px-5 py-2 my-1 bg-white">
            <!-- 标题 -->
            <view class="font-bold">
                收货信息:
            </view>
            <!-- 详情信息 -->
            <view>
                {{ reciver.province + reciver.city + reciver.detailPlace }}
                {{ reciver.username + '收 ' + reciver.mobile }}
            </view>
        </view>
        <!-- 产品 -->
        <view class="flex px-5 py-2 mt-1 mb-10 bg-white">
            <!-- 产品图片 -->
            <view class="flex justify-center items-center">
                <image :src="product.imgUrl" mode="widthFix" class="w-10 h-10"></image>
            </view>
            <!-- 产品信息 -->
            <view class="ml-5">
                <view class="font-bold">{{ product.name }} ({{ product.spec }}) ￥ 0 元</view>
                <view>邮费: {{ orderPrice|money }} 元</view>
                <view>合计: {{ orderPrice|money }} 元</view>
            </view>
        </view>

        <u-button @click="genOrder" type="success" :custom-style="shareStyle" hover-class="">提交订单</u-button>
    </view>
    <view class="bg-gray-200" v-else-if="paymentStatus==='paying'">
        <!-- 倒计时 -->
        <view class="flex flex-col items-center bg-white py-2">
            <view class="text-gray-500 text-sm">支付剩余时间</view>
            <!-- 一般用法 -->
            <uni-countdown color="#FFFFFF" background-color="#be3136" border-color="#be3136" :day="0" :hour="0"
                           :minute="5" :second="0" :showDay="false"></uni-countdown>
        </view>
        <!-- 订单信息-->
        <view class="mt-1 mb-1 bg-white">
            <!-- 标题 -->
            <view class="py-2 font-bold text-center">
                <view class="text-sm">膳见纤玺{{ orderNum }}号订单</view>
                <view class="text-2xl">{{ orderPrice|money }}</view>
            </view>
            <!-- 收款方 -->
            <view
                class="px-5 py-2 flex justify-between my-2 border-t-2 border-b-2 border-l-0 border-r-0 border-solid border-gray-300">
                <view class="text-gray-500">收款方</view>
                <view>华瑞（贵安新区）航天医学配方食品有限公司</view>
            </view>
        </view>

        <u-button @click="payOrder" type="success" :custom-style="shareStyle" hover-class="">
            确认支付 {{ orderPrice|money }}
        </u-button>
    </view>
    <view v-else-if="paymentStatus==='success'" class="h-full success-bg pt-40">
        <view class="text-center ">
            <view class="text-lg text-white">
                恭喜您！
                <text>\n</text>
                已完成邮费支付
            </view>
        </view>
        <view class="text-center mt-40 mb-5 text-base text-theme">
            <view class="text-sm">
                膳见纤玺
                <text>\n</text>
                将在7个工作日内为您寄出代餐食品
            </view>
        </view>
        <view class="px-20">
            <u-button
                type="primary"
                shape="circle"
                :custom-style="shareStyle"
                :ripple="true"
                @click="sharePoster"
            >
                分享给好友
            </u-button>
        </view>
        <u-modal
            v-model="show"
            :show-title="false"
            :mask-close-able="true"
            confirm-text="保存图片"
            confirm-color="#be3136"
            @confirm="confirm"
        >
            <view class="slot-content">
                <image :src="pimg" mode="widthFix"
                       class="w-full"></image>
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
import {PaymentStoreModule} from '@/store/modules/payment'
import api from '@/api'
import {appConfig} from '@/common/config'
import {Goods} from '@/common/interface'

type PaymentStatus = 'prepay' | 'paying' | 'success' | 'fail'
@Component({
    components: {
        uniCountdown
    },
    filters: {
        money: (value: string) => {
            return '￥ ' + (Number.parseInt(value) / 100).toFixed(2)
        }
    }
})
export default class Payment extends Vue {
    private product: Goods = {} as Goods
    private pimg = appConfig.postImg
    private orderPrice = appConfig.orderPrice
    private paymentStatus: PaymentStatus = 'prepay'
    private orderNum = '00000000000000'
    private shareStyle = {
        marginTop: '20px',
        background: '#be3136',
    }
    private backStyle = {
        marginTop: '20px',
        background: '#9e9e9e',
    }
    private show = false

    private get reciver() {
        return PaymentStoreModule.reciverInfo
    }

    async onLoad() {
        this.product = await api.goods.info(appConfig.productId).catch((err: any) => {
            uni.showToast({title: `获取产品信息失败` + JSON.stringify(err)})
        })
    }

    async genOrder() {
        /**
         * 1. 生成系统订单
         * 2. 生成预付单
         * @type {Prepay}
         */
        try {
            this.orderNum = await api.payment.createOrder({
                username: this.reciver.username,
                mobile: this.reciver.mobile,
                address: this.reciver.province + this.reciver.city + this.reciver.detailPlace,
                description: this.product.name + this.product.spec,
                amount: appConfig.orderPrice,
            })
            this.paymentStatus = 'paying'
        } catch (e) {
            uni.showModal({content: `生成订单错误` + JSON.stringify(e)})
        }
    }

    onShareAppMessage(res: any) {
        if (res.from === 'button') {// 来自页面内分享按钮
            console.log(res.target)
        }
        return {
            title: '免费试用，我已经参加了，你快来',
            path: '/pages/index/index'
        }
    }

    async genPreOrder() {
        try {
            await PaymentStoreModule.getPrepayInfo(this.orderNum)
        } catch (e) {
            throw new Error('生成预付单失败:::')
        }
    }

    async onUnload() {
        if (this.paymentStatus !== 'success') {
            await this.closeOrder()
        }
    }

    onBackPress(e: any) {
        console.log('返回:::', e)
        if (e.from == 'backbutton') {
            uni.showModal({
                title: '提示',
                content: '是否保存？',
                success: res => {
                    if (res.confirm) {
                        uni.showToast({
                            title: '用户点击确定',
                            duration: 1000
                        })
                    } else if (res.cancel) {
                        uni.showToast({
                            title: '用户点击取消',
                            duration: 1000
                        })
                    }
                    uni.navigateBack({
                        delta: 1
                    })
                }
            })
        }
        return true //阻止默认返回行为
    }

    private async payOrder() {
        await uni.requestSubscribeMessage({
            tmplIds: [
                'fiwe4b07cph5nar6gZ1VWe2WljHMn7mVIaWZfK5oAik',
                'RQIZhmyOuzD5Uwq4sANSIS5MJv1ZXEUCfa3R2NUQGkM'
            ]
        })
        try {
            await this.genPreOrder()
        } catch (e) {
            return
        }
        // #ifdef  MP-WEIXIN
        wx.requestPayment({
            timeStamp: `${PaymentStoreModule.prepayInfo.timeStamp}`,
            nonceStr: `${PaymentStoreModule.prepayInfo.nonceStr}`,
            package: `${PaymentStoreModule.prepayInfo.package}`,
            signType: 'RSA',
            paySign: `${PaymentStoreModule.prepayInfo.paySign}`,
            success: async (res) => {
                console.log('success:' + JSON.stringify(res))
                if (res.errMsg.includes('requestPayment:ok')) {
                    //    支付成功，调用接口查询后台订单状态
                    const res = await api.payment.orderStatus(
                        `${PaymentStoreModule.prepayInfo.mch_order_num}`
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
            }
        })
        // #endif
    }

    private async sharePoster() {
        this.show = true
    }


    private async confirm() {
        uni.downloadFile({
            url: this.pimg,
            success: (res) => {
                console.log(res, 'res')
                let tempFilePath = res.tempFilePath
                uni.saveImageToPhotosAlbum({
                    filePath: tempFilePath,
                    success: (res) => {
                        uni.showToast({title: '图片已保存'})
                    },
                    fail: err => {
                        uni.showToast({title: `保存失败，请重试`, icon: 'none'})
                    }
                })
            },
            fail: () => {
                uni.hideLoading()
            }
        })
    }

    private updated() {
        uni.setNavigationBarTitle({
            title: this.paymentStatus === 'success' ? '支付成功' : this.paymentStatus === 'fail' ? '支付失败' : '订单确认',
        })

    }


    private async closeOrder() {
        try {
            const closeOrderResponse = await api.payment.closeOrder(this.orderNum)
        } catch (e) {
            console.log('关闭订单失败:::', e)
        }
    }
}
</script>

<style lang="scss" scoped>
.success-bg {
    background: url("http://dev.huadongbio.com:8500/shanjian-app/success-bg.png");
    background-size: cover;
}
</style>
