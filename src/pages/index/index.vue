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
        <view class="mb-20 w-full" v-if="!showModal">
            <official-account></official-account>
        </view>
        <!--        询问按钮-->
        <view
            class="fixed left-0 bottom-0 w-full py-5 box-border text-white text-center text-lg"
            style="background-color:#ad3d3b;"
            @click="applyGift"
        >
            立即免费申请
        </view>
        <address-info :showModal="showModal" @hide="hide"></address-info>
        <rule-info :showRule="showRule" @hide="hide"></rule-info>
    </view>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

import AddressInfo from './components/address-info.vue'
import RuleInfo from './components/rule-info.vue'
import {appConfig} from '@/common/config'
import {UserStoreModule} from '@/store/modules/user'

@Component({
    components: {
        AddressInfo,
        RuleInfo,
    }
})
export default class Index extends Vue {
    private img = appConfig.indexImg
    private showModal = false
    private showRule = false

    /**
     * 显示规则
     * @private
     */
    private toggleRule() {
        this.showRule = true
    }

    /**
     * 申请礼品
     * @private
     */
    private applyGift() {
        /**
         * 1. 验证登录
         * 2. 验证是否关注公众号
         * 3. 是否已经申请过
         * 4. 弹窗填写信息
         */
        // UserStoreModule.getUserinfo()
        if (!this.isLogin()) {
            console.log(`没有登录`)
            return
        }
        if (!this.isFollower()) {
            uni.showModal({content: `请先关注公众号`})
            return
        }
        if (this.wasBuy()) {
            uni.showModal({content: `已经申请过了`})
            return
        }
        this.showModal = true
    }

    /**
     * 隐藏弹窗
     * @return {void}
     * @private
     * @param val string
     */
    private hide(val: string) {
        if (val === 'rule') {
            this.showRule = false
        } else {
            this.showModal = false
        }
    }

    /**
     * 是否登录
     * @return {boolean}
     * @private
     */
    private isLogin() {
        return !!UserStoreModule.loginInfo.openId
    }

    /**
     * 是否关注公众号
     * @return {boolean}
     * @private
     */
    private isFollower() {
        return !!UserStoreModule.loginInfo.unionId
    }

    /**
     * 是否已经申请过
     * @return {boolean}
     * @private
     */
    private wasBuy() {
        return UserStoreModule.loginInfo.wasBuy
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

</style>
