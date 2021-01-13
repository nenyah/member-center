<template>
	<view class="bg-gray-200">
		<!-- 倒计时 -->
		<view class="flex flex-col items-center bg-white py-2">
			<view class="text-gray-500 text-sm">支付剩余时间</view>
			<!-- 一般用法 -->
			<uni-countdown color="#FFFFFF" background-color="#be3136" border-color="#be3136" :day="0" :hour="0" :minute="1" :second="00" :showDay="false"></uni-countdown>
		</view>
		<!-- 产品 -->
		<view class="flex px-5 py-2 my-1 bg-white">
			<!-- 产品图片 -->
			<view class="flex justify-center items-center"><image src="../../static/province.png" mode="widthFix" class="w-10 h-10"></image></view>
			<!-- 产品信息 -->
			<view class="ml-5">
				<view class="font-bold">{{ product }} ￥ 0 元</view>
				<view>邮费: ￥ 10.00 元</view>
				<view>合计: ￥ 10.00 元</view>
			</view>
		</view>

		<button @click="payOrder" class="bg-theme text-gray-100 p-2 mt-10">确认支付 ￥ 10.00</button>
	</view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import uniCountdown from '@/components/uni-countdown/uni-countdown.vue';
@Component({
	components: {
		uniCountdown
	}
})
export default class Payment extends Vue {
	private product = '膳见纤玺 高纤多维复合蛋白固体饮料（20g*10 包）';
	private pimg = '';
	private currentTime = new Date();

	private payOrder() {
		uni.requestPayment({
			provider: 'wxpay',
			timeStamp: String(Date.now()),
			nonceStr: 'A1B2C3D4E5',
			package: 'prepay_id=wx20180101abcdefg',
			signType: 'MD5',
			paySign: '',
			success: res => {
				console.log('success:' + JSON.stringify(res));
			},
			fail: err => {
				console.log('fail:' + JSON.stringify(err));
			}
		});
	}
}
</script>

<style lang="scss" scoped></style>
