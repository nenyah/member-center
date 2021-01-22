<template>
    <view class="bg-theme py-10 px-5 flex flex-col items-center text-base">
        <u-form :model="form" ref="uForm" class="bg-white py-10 px-5 rounded"
                label-width="150"
        >
            <view class="text-center font-bold my-1">膳见纤玺减脂调研问卷</view>
            <view class="my-1 text-sm">{{ question.formDeclare }}</view>
            <view
                v-for="(item,index) in question.formData"
                :key="index"
            >
                <view v-if="index<7">
                    <view v-if="item.key!=='gender'">
                        <u-form-item :label="item.label" :prop="item.key">
                            <u-input v-model="form[item.key]"/>
                        </u-form-item>
                    </view>
                    <view v-else>
                        <u-form-item :label="item.label">
                            <u-radio-group v-model="radio"
                                           @change="radioGroupChange">
                                <u-radio
                                    @change="radioChange"
                                    v-for="(val, idx) in item.value"
                                    :key="idx"
                                    :name="val.label"
                                    active-color="red">
                                    {{ val.label }}
                                </u-radio>
                            </u-radio-group>
                        </u-form-item>
                    </view>
                </view>
            </view>
        </u-form>
        <u-button @click="submit">提交</u-button>
    </view>
</template>

<script>
export default {
    data() {
        return {
            form: {
                name: '',
                intro: '',
                sex: ''
            },
            show: false,
            actionSheetList: [
                {
                    text: '男'
                },
                {
                    text: '女'
                },
                {
                    text: '保密'
                }
            ],
            question: {
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
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: '请输入姓名',
                        // 可以单个或者同时写两个触发验证方式
                        trigger: ['change', 'blur'],
                    },
                    // 正则判断为字母或数字
                    {
                        pattern: /^[\u4e00-\u9fa5]{2,6}$/,
                        // 正则检验前先将值转为字符串
                        transform(value) {
                            return String(value)
                        },
                        message: '只能为中文2-6个字'
                    },
                ],
                intro: [
                    {
                        min: 5,
                        message: '简介不能少于5个字',
                        trigger: 'change'
                    }
                ]
            }
        }
    },
    methods: {
        submit() {
            this.$refs.uForm.validate(valid => {
                if (valid) {
                    console.log('验证通过')
                } else {
                    console.log('验证失败')
                }
            })
        },
        // 选中某个单选框时，由radio时触发
        radioChange(e) {
            console.log(e)
        },
        // 选中任一radio时，由radio-group触发
        radioGroupChange(e) {
            console.log(e)
        }
    },
    // 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
    onReady() {
        // this.$refs.uForm.setRules(this.rules)
    }
}
</script>

<style scoped>
.bg-img {
    background-image: url('http://192.168.0.175:8500/shanjian-app/address_modal_bg.png');
    background-size: 100%;
}
</style>