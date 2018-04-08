<style lang="stylus" scoped>
.item
    padding 24px 0
    min-height 135px
    &:nth-child(odd)
        background-color #f3fbfe
    &:not(:first-child)
        border-top 1px solid borderColor
.user
    float left
    width: 80px
    text-align center
    .img
        width 56px
        height 56px
        border-radius 50%
    .name
        margin-top 2px
        color #2a2a2a
.info
    margin-left 106px
    .rate
        color #ff8b23
        .ivu-rate
            vertical-align inherit
    .text
        margin-top 5px
        color #2a2a2a
        word-break break-all
        white-space pre-wrap
    .time
        position relative
        margin-top 8px
        font-size 12px
        color #717171
        .ivu-icon
            position absolute
            top -4px
            left 63px
            font-size 26px
            cursor pointer
            &:hover
                color #f5a623
    .reply
        float right
        letter-spacing 1px
        color #717171
    .comment_wrap
        margin 30px 70px 0 0
        padding 10px 20px
        background #f3fbfe
        font-size 12px
        .tit
            margin-bottom 10px
            .ivu-input-wrapper
                width 90% !important
            .ivu-btn
                float right
        .text_wrap
            .name
                float left
                color #fe5f5f
            .text
                margin-left 60px
                color #838383
        .desc
            margin-top 5px
.form
    padding 25px 83px 25px 37px
    background-color #f3fbfe
    .ivu-form-item
        margin-bottom 10px
.no_content
    margin-bottom 30px
.page
    margin 20px 0
    text-align center
</style>

<template>
    <div class="content">
        <div class="item" v-for="(evaluate, index) in evaluates" :key="index">
            <div class="user">
                <img class="img" :src="evaluate.anonymity?'/static/icon/anonymity.png': $avatarHash(evaluate.creator)">
                <div class="name single_ellipsis">{{evaluate.anonymity? '匿名用户': evaluate.creatorName}}</div>
            </div>
            <div class="info">
                <div class="rate">
                    总体评价：<Rate disabled :value="evaluate.star"></Rate>
                </div>
                <div class="text">{{evaluate.content}}</div>
                <div class="time">
                    {{evaluate.updated_at | evaluateFormat}}
                    <a
                        v-if="$store.state.mineInfo && $store.state.mineInfo.id == evaluate.creator"
                        class="reply"
                        @click="delEvaluate(evaluate)"
                        href="javascript:;">
                        删除
                    </a>
                </div>
            </div>
        </div>

        <Page v-if="evaluateSum > evaluatePerpage" class="page" :current="evaluatePage" :total="evaluateSum" :page-size="evaluatePerpage" @on-change="changeEvaluatePage($event)"></Page>

        <div v-if="!evaluates.length" class="no_content">暂无客户评价...</div>

        <Form v-if="showForm" class="form" :model="evaluateForm" ref="evaluateForm" :rules="evaluateFormRules" label-position="left" :label-width="70">
            <FormItem label="评分：" prop="rate">
                <Rate class="input" v-model="evaluateForm.rate" ></Rate>
            </FormItem>
            <FormItem label="评价：" prop="evaluate">
                <Input class="input" v-model="evaluateForm.evaluate" type="textarea" :rows="3" placeholder="写下您对该律师的评价吧，内容在15-300个字之内，用户评价仅用于客户对律师的评价，同行暂不允许进行评价，请谅解！"></Input>
            </FormItem>
            <FormItem>
                <Checkbox v-model="evaluateForm.anonymity">匿名</Checkbox>
                <Button type="primary" @click="submitEvaluate('evaluateForm')">提交</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
import moment from 'moment';
export default {
    name: 'evaluate',
    props: {
        uid: {
            type: Number
        },
        isMe: {
            type: Boolean
        }
    },
    data() {
        return {
            evaluates: [],
            evaluateSum: 0,
            evaluatePerpage: 5,
            evaluatePage: 1,
            evaluateForm: {
                rate: 0,
                evaluate: '',
                anonymity: false
            },
            evaluateFormRules: {
                rate: [{required: true, type: 'number', min: 1, message: '请打分', trigger: 'aaa'}],
                evaluate: [
                    {required: true, message: '请输入评价内容', trigger: 'aaa'},
                    {
                        validator : (rule, value, callback) => {
                            if (value.length >= 15 && value.length <= 300) {
                                callback();
                            }else{
                                callback(new Error('内容在15-300个字之间'));
                            }
                        },
                        trigger: 'aaa'
                    }
                ],
            },
            commentInput: false,
        }
    },
    computed: {
        showForm() {
            return !this.isMe && this.$store.state.mineInfo && !this.$authCodeT(this.$store.state.mineInfo.vip).isLawyer
        },
    },
    mounted() {
        this.getEvaluates();
    },
    methods: {
        getEvaluates() {
            let param = {
                uid: this.uid,
                perpage: this.evaluatePerpage,
                page: this.evaluatePage
            };

            this.$ajax('get', '/clienteleevaluate/list', param, (data) => {
                data.data.data.map(val => {
                    val.replyText = '';
                    return val;
                });

                this.evaluates = data.data.data;
                this.evaluateSum = data.data.total;
            });
        },
        changeEvaluatePage(page) {
            this.evaluatePage = page;
            this.getEvaluates();
        },
        submitEvaluate(name) {
            this.$refs[name].validate(valid => {
                if (!valid) {
                    return;
                }

                let param = {
                    uid: this.uid,
                    star: this.evaluateForm.rate,
                    content: this.evaluateForm.evaluate,
                    anonymity: this.evaluateForm.anonymity? 1: 0
                };
                this.$ajax('post', '/clienteleevaluate/create', param, (data) => {

                    this.getEvaluates();

                    this.evaluateForm.rate = 0;
                    this.evaluateForm.evaluate = '';
                    this.evaluateForm.anonymity = false;

                    this.$Message.success('提交成功！');
                })

            });
        },
        delEvaluate(item) {
            this.$Modal.confirm({
                title: '确认框',
                content: '确定删除吗？',
                onOk: () => {
                    this.$ajax('get', '/clienteleevaluate/delete', {id: item.id}, (data) => {

                        let lastPage = Math.ceil(this.evaluateSum / this.evaluatePerpage);
                        if (this.evaluatePage == lastPage) { // 最后一页

                            if (this.evaluates.length == 1 &&　this.evaluatePage > 1) { // 只有一条
                                this.evaluatePage--;
                                this.getEvaluates();
                            } else {
                                this.evaluates = this.evaluates.filter(val => val.id != item.id);
                                this.evaluateSum--;
                            }

                        } else {
                            this.getEvaluates()
                        }

                        this.$Message.success('删除成功！');
                    });
                }
            });
        }
    },
    filters: {
        evaluateFormat(date) {
            return moment(date).format('YY-MM-DD');
        },
    }
}
</script>