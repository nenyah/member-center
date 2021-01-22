<template>
    <view>
        <image :src="privacyImg" style="width:100%" mode="widthFix"></image>
    </view>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {appConfig} from '@/common/config'

@Component({})
export default class Privacy extends Vue {
    private privacyImg = appConfig.privacyImg
}
</script>

<style scoped>

</style>