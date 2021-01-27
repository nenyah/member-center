<template>
    <view class="bg-theme p-5 flex flex-col items-center text-base">
        <form @submit="formSubmit" class="bg-white shadow rounded p-5">
            <view class="text-center font-bold my-1">膳见纤玺减脂调研问卷</view>
            <view class="my-1 text-sm">{{ question.formDeclare }}</view>
            <view
                v-for="(item,index) in question.formData"
                :key="index"
            >
                <view v-if="index<7" class="flex">
                    <view class="flex-none">
                        {{ item.label }}
                    </view>
                    <view v-if="item.key!=='gender'" class="flex">
                        <view class="border border-r-0 border-t-0 border-l-0 border-solid border-gray-300">
                            <input :type="item.key!=='username'?'number':'text'"
                                   :placeholder="item.value"
                                   :name="item.key"
                                   :value="item.value"
                            >
                        </view>
                        <view>{{ item.key|appendix }}</view>
                    </view>
                    <view v-else>
                        <!-- 性别-->
                        <radio-group @change="radioChange" :name="item.key" class="flex">
                            <label v-for="(value,index) in item.value"
                                   :key="index"
                                   class="flex mx-5"
                            >
                                <radio :value="value.value" :checked="value.checked" color="red"
                                       style="transform:scale(0.7)"/>
                                {{ value.label }}
                            </label>
                        </radio-group>
                    </view>
                </view>
                <view v-else>
                    <view v-if="item.type==='radio'" class="my-5">
                        <view>
                            {{ index - 6 }}. {{ item.label }}
                        </view>
                        <radio-group @change="radioChange" :name="item.key">
                            <label v-for="(value,index) in item.value"
                                   :key="index"
                                   class="flex"
                            >
                                <view>
                                    <radio :value="value.value" :checked="value.checked" color="red"
                                           style="transform:scale(0.7)"/>
                                </view>
                                <view>{{ value.label }}</view>
                            </label>
                        </radio-group>
                    </view>
                    <view v-else-if="item.type==='checkbox'" class="my-5">
                        <view>{{ index - 6 }}. {{ item.label }}</view>
                        <checkbox-group
                            @change="checkboxChange"
                            class="flex flex-col"
                            :name="item.key"
                        >
                            <label v-for="(value,index) in item.value"
                                   :key="index"
                            >
                                <checkbox :value="value.value" :checked="value.checked" color="red"
                                          style="transform:scale(0.7)"/>
                                {{ value.label }}
                            </label>
                        </checkbox-group>
                    </view>
                </view>
            </view>
            <button
                class="bg-theme p-2 text-gray-100 text-center rounded my-2"
                formType="submit"
            >
                确认提交
            </button>
        </form>
    </view>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import api from '@/api'

@Component({
    filters: {
        appendix: (value: string) => {
            return value.endsWith('eight')
                   ? 'kg'
                   : value === 'age'
                     ? '岁'
                     : value === 'stature' || value === 'waistline'
                       ? 'cm'
                       : ''
        }
    }
})
export default class Poll extends Vue {
    private question = {
        formDeclare: '本次问卷不涉及您的个人隐私，仅作为您使用产品前后的数据对比参照，请您如实填写。',
        formData: [
            {
                'key': 'username',
                'type': 'input',
                'label': '姓名：',
                'value': ''
            },
            {
                'key': 'gender',
                'type': 'radio',
                'label': '性别：',
                'value': [
                    {
                        'label': '男',
                        'value': '1'
                    },
                    {
                        'label': '女',
                        'value': '2'
                    }]
            },
            {
                'key': 'age',
                'type': 'input',
                'label': '年龄：',
                'value': ''
            },
            {
                'key': 'stature',
                'type': 'input',
                'label': '身高：',
                'value': ''
            },
            {
                'key': 'weight',
                'type': 'input',
                'label': '体重：',
                'value': ''
            },
            {
                'key': 'waistline',
                'type': 'input',
                'label': '腰围：',
                'value': ''
            },
            {
                'key': 'targetWeight',
                'type': 'input',
                'label': '目标体重：',
                'value': ''
            },
            {
                'key': 'homeFat',
                'type': 'radio',
                'label': '您家人当中有肥胖吗？',
                'value': [
                    {
                        'label': '全家都胖',
                        'value': '1'
                    },
                    {
                        'label': '有一两个胖',
                        'value': '2'
                    },
                    {
                        'label': '没有',
                        'value': '3'
                    }
                ]
            },
            {
                'key': 'fatTime',
                'type': 'radio',
                'label': '您是从小到大都胖，还是近几年才胖？',
                'value': [
                    {
                        'label': '从小就胖',
                        'value': '1'
                    },
                    {
                        'label': '长大后发胖',
                        'value': '2'
                    },
                    {
                        'label': '近一两年才胖',
                        'value': '3'
                    },
                    {
                        'label': '产后肥胖',
                        'value': '4'
                    }
                ]
            },
            {
                'key': 'losingWeightWays',
                'type': 'checkbox',
                'label': '请问您曾经使用过以下哪些减肥方法？【多选题】',
                'value': [
                    {
                        'label': '节食',
                        'value': '1'
                    },
                    {
                        'label': '减肥茶等腹泻法',
                        'value': '2'
                    },
                    {
                        'label': '蛋白质减肥法',
                        'value': '3'
                    },
                    {
                        'label': '按摩埋线',
                        'value': '4'
                    },
                    {
                        'label': '口服或打针等药物疗法',
                        'value': '5'
                    },
                    {
                        'label': '仪器物理法',
                        'value': '6'
                    },
                    {
                        'label': '运动法',
                        'value': '7'
                    },
                    {
                        'label': '吸脂等手术疗法',
                        'value': '8'
                    },
                    {
                        'label': '无',
                        'value': '9'
                    }
                ]
            },
            {
                'key': 'loseWeightInHalfYear',
                'type': 'radio',
                'label': '最近半年有减过肥吗？',
                'value': [
                    {
                        'label': '有，在不停的减肥',
                        'value': '1'
                    },
                    {
                        'label': '有一次',
                        'value': '2'
                    },
                    {
                        'label': '没有',
                        'value': '3'
                    }
                ]
            },
            {
                'key': 'eatRegularly',
                'type': 'checkbox',
                'label': '平时三餐有按时吃吗？【多选题】',
                'value': [
                    {
                        'label': '经常不按时',
                        'value': '1'
                    },
                    {
                        'label': '偶尔不按时',
                        'value': '2'
                    },
                    {
                        'label': '都按时吃',
                        'value': '2'
                    },
                    {
                        'label': '经常不吃早餐',
                        'value': '3'
                    },
                    {
                        'label': '经常不吃午餐',
                        'value': '4'
                    },
                    {
                        'label': '经常不吃晚餐',
                        'value': '5'
                    }
                ]
            }
        ]
    }
    private errors: string[] = []
    private hasErr = false

    async onLoad() {
        const formData = await api.poll.info().catch((err: any) => {
            uni.showModal({content: `获取表单数据失败` + JSON.stringify(err)})
        })
        console.log('formData:::', formData)
        this.question = formData
    }

    private radioChange(e: any) {
        let formdata = this.question.formData,
            values = e.detail.value
        for (let i = 0, lenI = formdata.length; i < lenI; ++i) {
            const item = formdata[i]
            if (values.includes(item.value)) {
                this.$set(item, 'checked', true)
            } else {
                this.$set(item, 'checked', false)
            }
        }
    }

    private async formSubmit(e: any) {
        /**
         * 1. 校验数据
         * 2. 上传数据
         * 3. 预付接口
         * 4. 跳转页面
         */
        console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
        const formdata = e.detail.value
        if (!this.isValidate(formdata)) {
            return
        }
        try {
            const res = await api.poll.uploadAnswer({
                ...formdata,
                losingWeightWays: formdata.losingWeightWays.toString(),
                eatRegularly: formdata.eatRegularly.toString()

            })
            console.log('上传成功返回:::', res)
        } catch (err) {
            uni.showModal({content: `数据上传错误` + JSON.stringify(err)})
            return
        }
        uni.navigateTo({url: `/pages/payment/payment`})
    }

    private checkboxChange(e: any) {
        let formdata = this.question.formData,
            values = e.detail.value
        for (let i = 0, lenI = formdata.length; i < lenI; ++i) {
            const item = formdata[i]
            if (values.includes(item.value)) {
                this.$set(item, 'checked', true)
            } else {
                this.$set(item, 'checked', false)
            }
        }
    }

    private valid(type: string, event: any) {
        this.errors = []
        const value = event.detail.value
        switch (type) {
            case 'username':
                const name = value
                if (!name.length) {
                    this.errors.push('姓名不能为空！')
                }
                break
            case 'age':
                const age = value
                this.validRule(age, 'age')
                break
            case 'stature':
                const height = value
                this.validRule(height, 'stature', 230, 120)
                break
            case 'weight':
                const weight = value
                this.validRule(weight, 'weight', 200, 30)
                break
            case 'waistline':
                const waistline = value
                this.validRule(waistline, 'waistline', 100, 50)
                break
            case 'targetWeight':
                const targetWeight = value
                this.validRule(targetWeight, 'targetWeight', 100, 30)
                break
        }
    }

    private validRule(value: string, elem: string, maxValue = 150, minValue = 15) {
        const obj: { [key: string]: string; } = {
            username: '姓名',
            age: '年龄',
            stature: '身高',
            weight: '体重',
            waistline: '腰围',
            targetWeight: '目标体重'
        }
        if (!value.length) {
            this.errors.push(`${obj[elem]}不能为空！`)
            return

        }
        if (!this.validNumber(value)) {
            this.errors.push(`${obj[elem]}不为数字！`)
            return

        }
        if (parseInt(value) < minValue || parseInt(value) > maxValue) {
            this.errors.push(`${obj[elem]}不在合法范围！`)
            return
        }
    }

    private validNumber(num: string) {
        const re = /\d+/
        return re.test(num)

    }

    private isValidate(formdata: any) {
        for (const key of Object.keys(formdata)) {
            if (formdata.hasOwnProperty(key)) {
                if (formdata[key].length === 0) {
                    console.log(`${key} is empty`)
                    uni.showModal({content: `没有填写完整`, showCancel: false})
                    return false
                }
            }
        }
        return true
    }
}
</script>

<style scoped>

</style>