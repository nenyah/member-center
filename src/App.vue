<!--
 * @Description: 
 * @Author: Steven
 * @Date: 2020-11-06 12:11:16
 * @LastEditors: Steven
 * @LastEditTime: 2020-11-06 16:39:19
-->
<script lang="ts">
import Vue from 'vue';
import {UserStoreModule} from '@/store/modules/user'

export default Vue.extend({
	mpType: 'app',
	onLaunch() {
		console.log('App Launch');
	},
	onShow() {
		console.log('App Show');
        UserStoreModule.getUserinfo()
	},
	onHide() {
		console.log('App Hide');
	}
});
</script>

<style lang="scss">
/*每个页面公共css */
@import "uview-ui/index.scss";
$theme-color: #be3136;
.bg-theme {
	background-color: $theme-color;
}

.text-theme {
	color: $theme-color;
}
.text-emphasize {
	color: #ed7d31;
}
.text-pink-100 {
    color: #ee8d60;
}
</style>
