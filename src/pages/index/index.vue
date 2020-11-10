<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-11-06 12:11:16
 * @LastEditors: Steven
 * @LastEditTime: 2020-11-06 14:21:25
-->
<template>
    <view>
        <!--        背景图-->
        <view class="w-full">
            <image style="width: 100vw; background-color: #eeeeee;" mode="widthFix" :src="img"
                   @error="imageError"></image>
            <view
                class="text-gray-500 absolute topright text-xs py-1 border-0 border-b-2 border-gray-500 border-solid"
                @click="toggleRule"
            >
                活动规则
            </view>
        </view>
        <!--        询问按钮-->
        <view
            class="fixed left-0 bottom-0 w-full py-2 box-border text-white text-center"
            style="background-color:#ad3d3b;"
            @click="applyGift"
        >
            立即免费申请
        </view>
        <view v-if="showModal">
            <view
                class="fixed top-0 left-0 right-0 bottom-0 modal-backdrop flex flex-col justify-center items-center z-30"
            >
                <form @submit="formSubmit">
                    <view style="width: 80vw;height: 80vh;"
                          class="mx-2 my-2 flex flex-col items-center text-gray-100 bg-img">
                        <view class="fa fa-window-close fa-inverse self-end" @click="hide"></view>
                        <view class="mt-16">付邮试用领取信息</view>
                        <view class="bg-white flex items-center my-2 w-56 p-1 rounded box-border">
                            <image src="/static/people.png" style="width: 1rem;height: 1rem;"></image>
                            <input type="text" class="w-32 ml-1 text-gray-900" v-model="name" placeholder="姓名"
                                   placeholder-class="text-gray-600">
                        </view>
                        <view class="bg-white flex items-center my-2 w-56 p-1 rounded box-border">
                            <image src="/static/province.png" style="width: 1rem;height: 1rem;"></image>
                            <input type="text" class="w-32 ml-1 text-gray-900" v-model="province" placeholder="省份"
                                   placeholder-class="text-gray-600">
                        </view>
                        <view class="bg-white flex items-center my-2 w-56 p-1 rounded box-border">
                            <image src="/static/city.png" style="width: 1rem;height: 1rem;"></image>
                            <input type="text" class="w-32 ml-1 text-gray-900" v-model="city" placeholder="城市"
                                   placeholder-class="text-gray-600">
                        </view>
                        <view class="bg-white flex items-center my-2 w-56 p-1 rounded box-border">
                            <image src="/static/location.png" style="width: 1rem;height: 1rem;"></image>
                            <input type="text" class="w-32 ml-1 text-gray-900" v-model="address" placeholder="地址"
                                   placeholder-class="text-gray-600">
                        </view>
                        <view class="bg-white flex items-center my-2 w-56 p-1 rounded box-border">
                            <image src="/static/phone.png" style="width: 1rem;height: 1rem;"></image>
                            <input type="text" class="w-32 ml-1 text-gray-900" v-model="phone" placeholder="电话"
                                   placeholder-class="text-gray-600">
                        </view>
                        <view
                            class="text-xs px-10 my-2"
                            @click="toggleMark"
                        >
                            <view v-if="checked" class="fa fa-check-square-o mr-1"></view>
                            <view v-else class="fa fa-square-o mr-1"></view>
                            我已阅读并了解膳见纤玺的
                            <text
                                @click.stop="showPrivatePolicy"
                                class="underline"
                            >
                                【隐私政策】
                            </text>
                            ，并且同意接受其中所有的条款。
                        </view>
                        <button
                            class="w-56 mx-auto text-gray-100 p-1 bg-white"
                            style="color:#ad3d3b;"
                            form-type="submit"
                        >
                            确认提交
                        </button>
                    </view>

                </form>
            </view>
        </view>
        <view v-if="showRule">
            <view
                class="fixed top-0 left-0 right-0 bottom-0 modal-backdrop flex flex-col justify-center items-center z-30"
            >
                <view style="width: 80vw;height: 80vh;"
                      class="mx-2 my-2 flex flex-col items-center text-gray-900 bg-white">
                    <view class="fa fa-window-close self-end text-theme" @click="hideRule"></view>
                    <view class="text-theme text-2xl">活动规则</view>
                    <view class="px-2 text-sm">
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
        </view>
    </view>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator"

@Component
export default class Index extends Vue {
    private img = "https://tp.huadongbio.com:9000/weixinapp-shanjian/index-cover.jpg"
    private showModal = false
    private showRule = false
    private checked = false
    private name = ""
    private province = ""
    private city = ""
    private address = ""
    private phone = ""

    private toggleRule() {
        this.showRule = true
    }

    private hideRule() {
        this.showRule = false
    }

    private applyGift() {
        /**
         * 1. 验证登录
         * 2. 验证是否关注公众号
         * 3. 弹窗填写信息
         */
        // uni.showToast({title: "显示弹窗"})
        this.showModal = true
    }

    private showPrivatePolicy() {
        uni.navigateTo({
            url:"/pages/privacy/privacy"
        })
    }

    private toggleMark() {
        this.checked = !this.checked
    }

    private hide() {
        this.showModal = false
    }

    private formSubmit(e: any) {
        console.log("e:::", e)
    }
}
</script>

<style lang="scss">
.topright {
    right: 1rem;
    top: 1rem;
}

.modal-backdrop {
    background-color: rgba(0, 0, 0, 0.4);
}
.bg-img{
    background-image: url('https://tp.huadongbio.com:9000/weixinapp-shanjian/address_modal_bg.png');
    background-size: 100%;
}
</style>
