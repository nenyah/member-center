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
                @click="showRule"
            >
                活动规则
            </view>
        </view>
        <!--        询问按钮-->
        <button
            type="primary"
            class="fixed left-0 bottom-0 w-full p-1 box-border"
            @click="applyGift"
        >
            立即免费申请
        </button>
        <view v-if="showModal">
            <view
                class="fixed top-0 left-0 right-0 bottom-0 modal-backdrop flex flex-col justify-center items-center z-30"
                @click="hide"
            >
                <form @submit="formSubmit">
                    <view style="background-color: #fea591; width: 80vw;height: 60vh;"
                          class="mx-2 my-2 flex flex-col items-center text-gray-100">
                        <view class="fa fa-window-close fa-inverse self-end"></view>
                        <view>免费领取地址信息</view>

                        <view class="bg-white flex items-center my-2">
                            <view class="fa fa-user-circle-o" style="color:#fea591;"></view>
                            <view class="text-gray-500">姓名</view>
                            <input type="text">
                        </view>
                        <view class="bg-white flex items-center my-2">
                            <view class="fa fa-globe" style="color:#fea591;"></view>
                            <view class="text-gray-500">省份</view>
                            <input type="text">
                        </view>
                        <view class="bg-white flex items-center my-2">
                            <view class="fa fa-user-circle-o" style="color:#fea591;"></view>
                            <view class="text-gray-500">城市</view>
                            <input type="text">
                        </view>
                        <view class="bg-white flex items-center my-2">
                            <view class="fa fa-user-circle-o" style="color:#fea591;"></view>
                            <view class="text-gray-500">地址</view>
                            <input type="text">
                        </view>
                        <view class="bg-white flex items-center my-2">
                            <view class="fa fa-user-circle-o" style="color:#fea591;"></view>
                            <view class="text-gray-500">电话</view>
                            <input type="text">
                        </view>
                        <view class="text-xs px-10">
                            <label
                                class="radio"
                                @click="toggleMark"
                            >
                                <radio value="r1" :checked="checked"/>
                                我已阅读并了解膳见纤玺的
                                <text
                                    @click.stop="showPrivatePolicy"
                                    class="underline"
                                >
                                    【隐私政策】
                                </text>
                                ，并且同意接受其中所有的条款。</label>
                        </view>

                    </view>
                    <button
                        class="w-40 mx-auto text-gray-100 p-1"
                        style="background-color:#e48e75;"
                        @click.stop="submit"
                    >
                        确认提交
                    </button>
                </form>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator"

@Component
export default class Index extends Vue {
    private img = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604913779885&di=6fc8fc8315301e8d478b268435b00636&imgtype=0&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D352414749%2C2700279027%26fm%3D214%26gp%3D0.jpg"
    private showModal = true
    private checked = false

    private showRule() {
        uni.showToast({title: "显示规则"})
    }

    private applyGift() {
        uni.showToast({title: "显示弹窗"})
    }

    private showPrivatePolicy() {
        uni.showToast({title: "显示隐私政策"})
    }
    private toggleMark(){
        this.checked = !this.checked
    }
}
</script>

<style lang="scss">
.topright {
    right: 1rem;
    top: 1rem;
}

.modal-backdrop {
    background-color: rgba(0, 0, 0, 0.3);
}
</style>
