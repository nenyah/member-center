<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-11-06 12:11:16
 * @LastEditors: Steven
 * @LastEditTime: 2020-11-06 14:21:25
-->
<template>
	<view class="content">
        <image class="logo" src="../../static/logo.png"></image>
		<view>
            <text class="title">{{title}}</text>
        </view>
	</view>
</template>

<script lang="ts">
    import Vue from 'vue';
	export default Vue.extend({
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	});
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 2rem;
		width: 2rem;
		margin: 2rem auto 1rem auto;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 0.5rem;
		color: #8f8f94;
	}
</style>
