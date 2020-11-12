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
        <address-info v-if="showModal" @hide="hide"></address-info>
        <rule-info v-if="showRule" @hide="hide"></rule-info>
    </view>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator"

import AddressInfo from "./components/address-info.vue"
import RuleInfo from "./components/rule-info.vue"

@Component({
    components: {
        AddressInfo,
        RuleInfo,
    }
})
export default class Index extends Vue {
    private img = "https://tp.huadongbio.com:9000/weixinapp-shanjian/index-cover.jpg"
    private showModal = false
    private showRule = false


    private toggleRule() {
        this.showRule = true
    }

    private applyGift() {
        /** todo
         * 1. 验证登录
         * 2. 验证是否关注公众号
         * 3. 弹窗填写信息
         */
        this.showModal = true
    }


    private hide(val: string) {
        console.log("parent get:::", val)
        if (val === "rule") {
            this.showRule = false
        } else {
            this.showModal = false
        }
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

.bg-img {
    background-image: url('https://tp.huadongbio.com:9000/weixinapp-shanjian/address_modal_bg.png');
    background-size: 100%;
}
</style>
