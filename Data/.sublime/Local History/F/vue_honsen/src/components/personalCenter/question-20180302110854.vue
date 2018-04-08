<style lang="stylus" scoped>
.icon
    float left
    width 24px
    height 26px
    line-height 26px
    text-align center
    font-weight bold
    font-size 15px
    color #fff
    border-radius 2px
    &.q_icon
        background-color #65778b
    &.a_icon
        background-color #31b6f4
.gray_btn
    margin-left 44px
    margin-right 5px
.form
    padding 15px
    .ivu-form-item
        margin-bottom 10px
    .input
        display block
        margin-left 44px
        width auto
.item
    padding 15px
    &:nth-child(odd)
        background-color #f3fbfe
    .text
        display block
        margin-left 44px
        .ivu-input
            width 95%
    .a_text
        margin-top 22px
        color #838383
        white-space pre-wrap
        word-break: break-word
    .q_text
        color #2a2a2a
    .toggle
        margin-top 5px
        font-size 12px
        color #ff8b23
        cursor pointer
        .ivu-icon
            vertical-align middle
    .btn_wrap
        margin-top 10px
.page
    margin 20px 0
    text-align center

</style>

<template>
    <div class="content">
        <Form v-if="addLawyerQuestion" class="form" :model="lawyerQuestionForm" ref="lawyerQuestionForm" :rules="lawyerQuestionFormRules">
            <FormItem prop="question">
                <div class="q_icon icon">Q</div>
                <Input class="input" v-model="lawyerQuestionForm.question" placeholder="请输入问题"></Input>
            </FormItem>
            <FormItem prop="answer">
                <div class="a_icon icon">A</div>
                <Input class="input" v-model="lawyerQuestionForm.answer" type="textarea" :rows="3" placeholder="请输入答案"></Input>
            </FormItem>
            <FormItem>
                <Button class="gray_btn" type="primary" @click="cancelLawyerQuestCreate">取消</Button>
                <Button type="primary" @click="createLawyerQuest('lawyerQuestionForm')">提交</Button>
            </FormItem>
        </Form>

        <div
            class="item"
            v-for="(item, index) in lawyerQuestions"
            :key="index"
            @contextmenu.prevent="toHandleQuestion($event,item)">
            <div class="question">
                <div class="q_icon icon">Q</div>
                <Input v-if="item.isEdit" class="text" v-model="item.editQuestion"></Input>
                <div v-else class="q_text text single_ellipsis" :title="isMe? '右键操作': ''">{{item.question}}</div>

            </div>
            <div class="answer">
                <div class="a_icon icon">A</div>
                <Input v-if="item.isEdit" class="a_text text" v-model="item.editAnswer" type="textarea" :rows="3"></Input>
                <div v-else class="a_text text" :title="isMe? '右键操作': ''">{{item.answer}}</div>
            </div>

            <div v-if="item.isEdit" class="btn_wrap">
                <Button class="gray_btn" type="primary" @click="cancelLawyerQuestUpdate(item)">取消</Button>
                <Button class="submit_btn" type="primary" @click="updateLawyerQuest(item)">提交</Button>
            </div>
        </div>

        <Page v-if="questionSum > questionPerpage" class="page" :current="questionPage" :total="questionSum" :page-size="questionPerpage" @on-change="changeQuestionPage($event)"></Page>

        <div v-if="!lawyerQuestions.length" class="no_content">暂无常见问题...</div>

        <contextMenu ref="contextmenu">
            <div class="contextMenu_item" @click.stop="toEditQuestion">编辑</div>
            <div class="contextMenu_item" @click.stop="delQuestion">删除</div>
        </contextMenu>
    </div>

</template>

<script>
import contextMenu from '@/components/common/contextMenu';

export default {
    name: 'question',
    components: {contextMenu},
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
            lawyerQuestions: [],
            questionSum: 0,
            questionPerpage: 4,
            questionPage: 1,
            curQuestion: null,
            lawyerQuestionForm: {
                question: '',
                answer: ''
            },
            lawyerQuestionFormRules: {
                question: [{required: true, message: '请输入问题', trigger: 'change'}],
                answer: [{required: true, message: '请输入答案', trigger: 'change'}],
            },
            addLawyerQuestion: false,
        }
    },
    mounted() {
        this.getLawyerQuestions();
    },
    methods: {
        getLawyerQuestions() {
            let param = {
                uid: this.uid,
                perpage: this.questionPerpage,
                page: this.questionPage
            };

            this.$ajax('get', '/commonquestion/list', param, (data) => {
                this.lawyerQuestions = data.data.data.map(val => {
                    val.isEdit = false;
                    val.editQuestion = val.question;
                    val.editAnswer = val.answer;
                    return val;
                });

                this.questionSum = data.data.total;

            });
        },
        changeQuestionPage(page) {
            this.questionPage = page;
            this.getLawyerQuestions();
        },
        createLawyerQuest(name) {
            this.$refs[name].validate((valid) => {
                if (!valid) {
                    return;
                }

                let param = {
                    question: this.lawyerQuestionForm.question,
                    answer: this.lawyerQuestionForm.answer
                };
                this.$ajax('post', '/commonquestion/create', param, (data) => {
                    if (this.lawyerQuestions.length == this.questionPerpage) {
                        this.lawyerQuestions.pop();
                    }

                    this.lawyerQuestions.unshift({
                        id: data.id,
                        question: param.question,
                        answer: param.answer,
                        isEdit: false,
                        editQuestion: param.question,
                        editAnswer: param.answer,
                    });

                    this.questionSum++;

                    this.cancelLawyerQuestCreate();

                    this.$Message.success('创建成功！');
                });
            });
        },
        cancelLawyerQuestCreate() {
            this.lawyerQuestionForm.question = '';
            this.lawyerQuestionForm.answer = '';
            this.addLawyerQuestion = false;
        },
        updateLawyerQuest(item) {
            if (!item.editQuestion || !item.editAnswer) {
                this.$Message.warning('问和答都不能为空！');
                return;
            }

            let param = {
                id: item.id,
                question: item.editQuestion,
                answer: item.editAnswer
            };
            this.$ajax('post', '/commonquestion/edit', param, (data) => {
                item.question = item.editQuestion;
                item.answer = item.editAnswer;
                item.isEdit = false;

                this.$Message.success('编辑成功！');
            });
        },
        cancelLawyerQuestUpdate(item) {
            item.editQuestion = item.question;
            item.editAnswer = item.answer;
            item.isEdit = false;
        },
        toHandleQuestion(e, question) {
            if (this.isMe) {
                this.curQuestion = question;
                this.$refs.contextmenu.show(e);
            }
        },
        toEditQuestion() {
            this.$refs.contextmenu.hide();
            this.curQuestion.isEdit = true;
        },
        delQuestion() {
            this.$refs.contextmenu.hide();
            this.$Modal.confirm({
                title: '确认框',
                content: '确定删除吗？',
                onOk: () => {
                    this.$ajax('get', '/commonquestion/delete', {id: this.curQuestion.id}, (data) => {
                        let lastPage = Math.ceil(this.questionSum / this.questionPerpage);
                        if (this.questionPage == lastPage) { // 最后一页

                            if (this.lawyerQuestions.length == 1 &&　this.questionPage > 1) { // 只有一条
                                this.questionPage--;
                                this.getLawyerQuestions();
                            } else {
                                this.lawyerQuestions = this.lawyerQuestions.filter(val => val.id != this.curQuestion.id);
                                this.questionSum--;
                            }

                        } else {
                            this.getLawyerQuestions();
                        }

                        this.$Message.success('删除成功！');
                    });
                }
            });
        },
    },
}
</script>