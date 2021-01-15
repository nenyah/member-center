<template>
    <view
        class="fixed top-0 left-0 right-0 bottom-0 modal-backdrop flex flex-col justify-center items-center z-30"
    >
        <view
            style="width: 80vw;height: 85vh;"
            class="mx-2 my-2 flex flex-col items-center text-gray-900 bg-white"
            enable-flex
        >
            <view class="fa fa-window-close self-end text-theme" @click="hide"></view>
            <view class="text-theme text-2xl">活动规则</view>
            <view class="p-2 text-xs">
                <view class="my-1">
                    <view class="fa fa-dot-circle-o text-theme mr-1"></view>
                    用户关注膳见纤玺微信公众号，可通过活动页面申请 10 元付邮试用，领取高纤多维复
                    合蛋白固体饮料 1 盒 (20g*10包)。
                </view>
                <view class="my-1">
                    <view class="fa fa-dot-circle-o text-theme mr-1"></view>
                    参与活动的用户需完成个人信息及调查问卷填写。
                </view>
                <view class="my-1">
                    <view class="fa fa-dot-circle-o text-theme mr-1"></view>
                    每个用户 ID 及手机号码限购一单，重复下单无法发货。
                </view>
                <view class="my-1">
                    <view class="fa fa-dot-circle-o text-theme mr-1"></view>
                    本活动付邮试用由合作快递发出，邮费 10 元，仅限在线支付，且不支持退货退款服务，
                    请谨慎下单。
                </view>
                <view class="my-1">
                    <view class="fa fa-dot-circle-o text-theme mr-1"></view>
                    订单下单后不支持修改地址，请下单时再次确认收货地址。
                </view>
                <view class="my-1">
                    <view class="fa fa-dot-circle-o text-theme mr-1"></view>
                    用户申领成功后，将在 7 个工作日内为您寄出试用产品。
                </view>
                <view class="my-1">
                    <view class="fa fa-dot-circle-o text-theme mr-1"></view>
                    试用产品以仓库实际库存为准，数量有限，赠完即止。
                </view>
                <view class="my-1">
                    <view class="fa fa-dot-circle-o text-theme mr-1"></view>
                    膳见纤玺保留本次活动最终解释权，如有任何疑问，请咨询客服 4008-1600-99。
                </view>
            </view>

        </view>
    </view>
</template>

<script lang="ts">
import {Component, Emit, Vue} from 'vue-property-decorator'

@Component
export default class RuleInfo extends Vue {
    @Emit('hide')
    private hide() {
        return 'rule'
    }
}
</script>

<style scoped>

</style>