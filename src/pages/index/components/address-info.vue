<template>
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
                    <input type="text" class="w-32 ml-1 text-gray-900" name="name" placeholder="姓名"
                           placeholder-class="text-gray-600">
                </view>
                <view class="bg-white flex items-center my-2 w-56 p-1 rounded box-border">
                    <image src="/static/province.png" style="width: 1rem;height: 1rem;"></image>
                    <picker
                        @change="pickerChange('province',$event)"
                        :value="province[provinceIndex]"
                        :range="province"
                        name="province"
                        class="flex-1">
                        <view class="flex items-center justify-between">
                            <label v-if="provinceIndex===-1" class="text-gray-600 ml-1">省份</label>
                            <view class="text-gray-900 ml-1">{{ province[provinceIndex] }}</view>
                            <view class="fa fa-caret-down text-theme fa-lg"></view>
                        </view>
                    </picker>
                </view>
                <view class="bg-white flex items-center my-2 w-56 p-1 rounded box-border">
                    <image src="/static/city.png" style="width: 1rem;height: 1rem;"></image>
                    <picker
                        @change="pickerChange('city',$event)"
                        :value="city[cityIndex]"
                        :range="city"
                        name="city"
                        class="flex-1">
                        <view class="flex items-center justify-between">
                            <label v-if="cityIndex===-1" class="text-gray-600 ml-1">城市</label>
                            <view class="text-gray-900 ml-1">{{ city[cityIndex] }}</view>
                            <view class="fa fa-caret-down text-theme fa-lg"></view>
                        </view>
                    </picker>
                </view>
                <view class="bg-white flex items-center my-2 w-56 p-1 rounded box-border">
                    <image src="/static/location.png" style="width: 1rem;height: 1rem;"></image>
                    <input type="text" class="ml-1 text-gray-900" name="address" placeholder="地址"
                           placeholder-class="text-gray-600">
                </view>
                <view class="bg-white flex items-center my-2 w-56 p-1 rounded box-border">
                    <image src="/static/phone.png" style="width: 1rem;height: 1rem;"></image>
                    <input type="number" class="ml-1 text-gray-900" name="phone" placeholder="电话"
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
</template>

<script lang="ts">
import {Component, Emit, Vue} from 'vue-property-decorator'
import poi from '@/common/address'

@Component
export default class AddressInfo extends Vue {
    private checked = false
    private provinceIndex = -1
    private cityIndex = -1

    get province() {
        return poi.map(el => el.name)
    }

    get city() {
        const res = poi.find(el => el.name === this.province[this.provinceIndex]) as any
        return res?.children.map((el: any) => el.name)
    }

    @Emit('hideRule')
    private hide() {
        return 'modal'
    }

    private showPrivatePolicy() {
        uni.navigateTo({
            url: '/pages/privacy/privacy'
        })
    }

    private toggleMark() {
        this.checked = !this.checked
    }

    private isValidate(values: { [`string`]: string }) {

    }

    private formSubmit(e: any) {
        console.log('e:::', e)
        /** todo
         * 1. 验证输入内容是否合法
         * 2. 验证是否同意 checked=true
         */
        const value = e.detail.value
        console.log('value:::', value)
        if (!value.name) {
            console.log('名字不能为空')
            return
        }
        // 2. 验证是否同意 checked=true
        if (!this.checked) {
            uni.showModal({
                title: '请确认是否同意隐私政策',
                showCancel: false
            })
            return
        }
        uni.navigateTo({url: '/pages/poll/poll'})
    }

    private pickerChange(type: string, event: any) {
        console.log('picker发送选择改变，携带值为', event.target.value)
        if (type === 'province') {
            this.provinceIndex = event.target.value
        } else {
            this.cityIndex = event.target.value
        }
    }

}
</script>

<style scoped>

</style>