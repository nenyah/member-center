<template>
    <view class="">
        <u-form :model="form" ref="uForm">
            <u-form-item label="姓名" prop="name">
                <u-input v-model="form.name"/>
            </u-form-item>
            <u-form-item label="简介" prop="intro">
                <u-input v-model="form.intro"/>
            </u-form-item>
            <u-form-item label="性别">
                <u-input v-model="form.sex" type="select" @click="show = true"/>
                <u-action-sheet :list="actionSheetList" v-model="show" @click="actionSheetCallback"></u-action-sheet>
            </u-form-item>
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
        // 点击actionSheet回调
        actionSheetCallback(index) {
            this.form.name = this.actionSheetList[index].text;
        }
    },
    // 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
    onReady() {
        this.$refs.uForm.setRules(this.rules)
    }
}
</script>

<style scoped>
.bg-img {
    background-image: url('http://192.168.0.175:8500/shanjian-app/address_modal_bg.png');
    background-size: 100%;
}
</style>