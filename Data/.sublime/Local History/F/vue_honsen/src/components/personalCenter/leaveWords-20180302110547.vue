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
    .text
        margin-top 5px
        color #2a2a2a
        white-space: pre-wrap
        word-break: break-word
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
        margin-left 10px
        color #999
    .reply_tit
        margin-top 15px
        .ivu-input-wrapper
            width 90% !important
        .ivu-btn
            float right
    .comment_wrap
        margin 30px 70px 0 0
        padding 10px 20px
        background #f3fbfe
        font-size 12px
        .text_wrap
            .name
                float left
                color #fe5f5f
            .text
                margin-left 60px
                color #666
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
        <div class="item" v-for="(leaveWord, index) in leaveWords" :key="index">
            <div class="user">
                <img class="img" :src="$avatarHash(leaveWord.creator)">
                <div class="name single_ellipsis">{{leaveWord.userName}}</div>
            </div>
            <div class="info">
                <div class="text">{{leaveWord.content}}</div>
                <div class="time">
                    {{leaveWord.created_at | leaveWordFormat}}
                    <a v-if="isMe && !leaveWord.reply" class="reply" @click="leaveWord.isReply = !leaveWord.isReply" href="javascript:;">{{leaveWord.isReply? '取消': '回复'}}</a>

                    <a v-if="canDel(leaveWord)" class="reply" @click="delleaveWord(leaveWord)" href="javascript:;">删除</a>
                </div>

                <div v-if="leaveWord.isReply" class="reply_tit">
                    <Input v-model.trim="leaveWord.replyText"></Input>
                    <Button @click="submitReply(leaveWord)" type="info">提交</Button>
                </div>

                <div v-if="leaveWord.reply" class="comment_wrap" :style="{ backgroundColor: (index + 1) % 2 == 0 ? '#fff' : ''}">
                    <div class="text_wrap">
                        <div class="name">弘商管家：</div>
                        <div class="text">{{leaveWord.reply}}</div>
                    </div>
                    <div class="desc">
                        {{leaveWord.updated_at | leaveWordFormat}}
                        <a v-if="isMe && isHonsen" class="reply" @click="delReply(leaveWord)" href="javascript:;">删除</a>
                    </div>
                </div>

            </div>
        </div>

        <Page v-if="leaveWordSum > leaveWordPerpage" class="page" :current="leaveWordPage" :total="leaveWordSum" :page-size="leaveWordPerpage" @on-change="changeleaveWordPage($event)"></Page>

        <div v-if="!leaveWords.length" class="no_content">暂无客户留言...</div>

        <Form v-if="!isMe" class="form" :model="leaveWordForm" ref="leaveWordForm" :rules="leaveWordFormRules" label-position="left" :label-width="70">
            <FormItem label="留言：" prop="leaveWord">
                <Input class="input" v-model="leaveWordForm.leaveWord" type="textarea" :rows="3" placeholder="写下您对弘商管家的留言吧，内容在15-300个字之内！"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="submitleaveWord('leaveWordForm')">提交</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
import moment from 'moment';
export default {
    name: 'leaveWord',
    props: {
        uid: {
            type: Number
        },
        isMe: {
            type: Boolean
        }
    },
    computed: {
        isHonsen() {
            return this.$store.state.mineInfo && this.$store.state.mineInfo.id == honsenId;
        }
    },
    data() {
        return {
            leaveWords: [],
            leaveWordSum: 0,
            leaveWordPerpage: 5,
            leaveWordPage: 1,
            leaveWordForm: {
                leaveWord: '',
            },
            leaveWordFormRules: {
                leaveWord: [
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
        }
    },
    mounted() {
        this.getleaveWords();
    },
    methods: {
        canDel(leaveWord) {
            return this.isHonsen || (this.$store.state.mineInfo && this.$store.state.mineInfo.id == leaveWord.creator);
        },
        getleaveWords() {
            let param = {
                page: this.leaveWordPage,
                perpage: this.leaveWordPerpage
            };

            this.$ajax('get', '/leavemessage/leavemessagelist', param, (data) => {
                data.data.data.map(val => {
                    val.replyText = '';
                    val.isReply = false;
                    return val;
                });

                this.leaveWords = data.data.data;
                this.leaveWordSum = data.data.total;
            });
        },
        changeleaveWordPage(page) {
            this.leaveWordPage = page;
            this.getleaveWords();
        },
        submitleaveWord(name) {
            if (!this.$store.state.loginStatus) {
                this.$Message.warning('请先登录后再进行操作！');
                return false;
            }

            this.$refs[name].validate(valid => {
                if (!valid) {
                    return;
                }

                let param = {
                    content: this.leaveWordForm.leaveWord,
                };
                this.$ajax('post', '/leavemessage/create', param, (data) => {

                    this.getleaveWords();

                    this.leaveWordForm.leaveWord = '';

                    this.$Message.success('提交成功！');
                })

            });
        },
        delleaveWord(item) {
            this.$Modal.confirm({
                title: '确认框',
                content: '确定删除吗？',
                onOk: () => {
                    this.$ajax('get', '/leavemessage/deleteleavemessage', {id: item.id}, (data) => {

                        let lastPage = Math.ceil(this.leaveWordSum / this.leaveWordPerpage);
                        if (this.leaveWordPage == lastPage) { // 最后一页

                            if (this.leaveWords.length == 1 &&　this.leaveWordPage > 1) { // 只有一条
                                this.leaveWordPage--;
                                this.getleaveWords();
                            } else {
                                this.leaveWords = this.leaveWords.filter(val => val.id != item.id);
                                this.leaveWordSum--;
                            }

                        } else {
                            this.getleaveWords()
                        }

                        this.$Message.success('删除成功！');
                    });
                }
            });
        },
        submitReply(item) {
            if (!item.replyText) {
                this.$Message.warning('回复不能为空');
                return;
            }

            let param = {
                id: item.id,
                reply: item.replyText
            };

            this.$ajax('post', '/leavemessage/reply', param, (data) => {
                item.reply = param.reply;
                item.updated_at = moment().format('YYYY-MM-DD HH:mm');
                item.replyText = '';
                item.isReply = false;
                this.$Message.success('回复成功！');
            });
        },
        delReply(item) {
            this.$Modal.confirm({
                title: '确认框',
                content: '确定删除吗？',
                onOk: () => {
                    this.$ajax('get', '/leavemessage/deletereply', {id: item.id}, (data) => {
                        item.reply = '';
                        item.updated_at = '';
                        this.$Message.success('删除成功！');
                    });
                }
            });
        }
    },
    filters: {
        leaveWordFormat(date) {
            return moment(date).format('YYYY-MM-DD');
        },
    }
}
</script>