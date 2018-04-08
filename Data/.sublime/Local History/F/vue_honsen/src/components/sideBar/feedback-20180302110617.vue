<style lang="stylus">
@import '../../common/stylus/mixin.styl'
borderColor = #d2d2d2
.feedback
    .content_wrap
        margin 0 24px
    .blod
        color #535353
        font-weight bold
    .maintit_text
        line-height 53px
        text-indent 24px
        font-size 18px
    .feedback_main_form
        .ivu-form-item-error-tip
            right auto !important
    .reply_tit
        padding-bottom 10px
        font-size 14px
        border-bottom 1px solid borderColor
    .admin_type_wrap
        padding-bottom 17px
        border-bottom 1px solid borderColor
    .reply_list
        margin-top 10px
        height 130px
        overflow auto
        color #595959
        .reply_item
            padding 15px 0
            border-bottom 1px solid borderColor
            font-size 13px
            &:last-child
                border-bottom none
            .ask
                padding-right 30px
                word-break break-all
                .name
                    float left
                .content
                    white-space: pre-wrap
                    word-break: break-word
            .name
                color #fe5f5f
            .time
                margin-top 2px
                font-size 12px
                color #a4a4a4
            .answer
                margin 8px 30px 0 25px
                word-break break-all
            .answer_time
                margin-left 25px
    .admin_list
        margin-top 10px
        height 390px
        .ask
            position relative
            &:hover
                .reply_icon
                    display block
            .reply_icon
                display none
                position absolute
                top 0px
                right 15px
                bgImg(13px, 17px, '/static/icon/0048.png')
                cursor pointer
        .input
            margin-top 10px
            margin-right: 10px
            width: 340px
        .ivu-btn
            margin-top 9px
            padding: 6px 20px
</style>

<template>
    <div class="feedback">
        <sideBase :haveSide="false" :initDragState="true">
            <div slot="mainTit">
                <div class="maintit_text blod">欢迎反馈问题！</div>
            </div>

            <div slot="main" class="content_wrap">

                <div v-if="isAdmin" class="admin_type_wrap">
                    <Select v-model="type" placeholder="选择问题分类" style="width:200px" @on-change="infiniteReset">
                        <Option value="1">功能问题</Option>
                        <Option value="2">页面效果</Option>
                        <Option value="3">提点建议</Option>
                        <Option value="0">其他问题</Option>
                    </Select>
                </div>

                <Form v-if="!isAdmin" :model="form_info" ref="form_info" :rules="form_info_rules" label-position="left" class="feedback_main_form">
                    <FormItem style="margin-bottom: 15px" prop="content">
                        <Input v-model="form_info.content" type="textarea" :rows="8"></Input>
                    </FormItem>
                    <FormItem prop="type" class="feedback_error">
                        <Select v-model="form_info.type" placeholder="选择问题分类" style="width:200px">
                            <Option value="1">功能问题</Option>
                            <Option value="2">页面效果</Option>
                            <Option value="3">提点建议</Option>
                            <Option value="0">其他问题</Option>
                        </Select>

                        <Button type="primary" @click="submit_info('form_info')" style="float: right">发 送</Button>
                    </FormItem>
                </Form>

                <div v-if="!isAdmin" class="reply_tit blod">反馈回复</div>

                <ul class="reply_list" :class="{admin_list: isAdmin}">
                    <li v-if="aDatas.length" class="reply_item" v-for="(data,index) in aDatas" :key="index">
                        <div class="ask">
                            <div class="name" :ref="'askName'+data.id">{{data.username}}：</div>
                            <div class="content" :style="{'marginLeft': data.askNameW + 'px'}">{{data.content}}</div>
                            <div v-if="isAdmin && !data.reply && data.userid" class="reply_icon" @click.stop="data.showInput = true"></div>
                        </div>
                        <div class="time">{{data.createdtime}}</div>
                        <div v-if="data.reply" class="answer">
                            <span class="name">{{data.replyname}}：</span>
                            <span class="content">{{data.reply}}</span>
                        </div>
                        <div v-if="data.reply" class="time answer_time">{{data.updated_at}}</div>

                        <!-- 回复框 -->
                        <template v-if="data.showInput">
                            <Input v-model="data.text" class="input" placeholder="回复："></Input>
                            <Button class="btn" type="info" @click="submitReply(data)">提交</Button>
                        </template>
                    </li>
                    <infinite-loading @infinite="onInfinite" ref="infiniteLoading">
                        <span class="no_more" slot="no-more">没有更多了！</span>
                        <span class="no_more" slot="no-results">{{aDatas.length? '': '暂无反馈！'}}</span>
                    </infinite-loading>
                </ul>
            </div>
        </sideBase>
    </div>
</template>

<script>
import moment from 'moment';
import sideBase from './sideBase';
import InfiniteLoading from 'vue-infinite-loading';
export default {
    name: 'feedback',
    components: {sideBase, InfiniteLoading},
    data() {
        return {
            form_info: {
                content: '',
                type: '',
            },
            form_info_rules: {
                content: [
                    { required: true, message: '请输入反馈内容！' , trigger: 'change' },
                ],
                type: [
                    { required: true, message: '请选择问题类型！' , trigger: 'change' },
                ],
            },

            /* 弘商管理 */
            type: '',
            aDatas: [],
            page: 1,
            perpage: 10,
        }
    },
    computed: {
        isAdmin() {
            return this.$store.state.mineInfo.id == honsenId;
        }
    },
    mounted() {

    },
    methods: {
        submit_info(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let param = {
                        creator: this.$store.state.mineInfo? this.$store.state.mineInfo.id: '',
                        content: this.form_info.content,
                        type: Number(this.form_info.type)
                    };

                    this.$ajax('post', '/feedback/create', param, (data) => {
                        this.form_info = {
                            content: '',
                            type: '',
                        };

                        this.$store.commit('setSide', '');
                        this.$Message.success('问题反馈成功！');
                    });
                }
            });
        },
        infiniteReset(type) {
            this.type = type;
            this.aDatas = [];
            this.page = 1;
            this.$nextTick(() => {
                this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
            });
        },
        onInfinite($state){
            let param = {page: this.page, perpage: this.perpage};
            if (this.type) {
                param.type = parseInt(this.type);
            }

            this.$ajax('post', '/feedback/feedbacklist', param, (data) => {

                this.$emit('read');

                let _aDatas = data.data.data.map(val => {
                    val.showInput = false;
                    val.text = '';
                    val.askNameW = 0;
                    return val;
                });
                this.aDatas.push(..._aDatas);

                this.$nextTick(() => {
                    this.aDatas.forEach(item => {
                        if (this.$refs[`askName${item.id}`][0]) {
                            item.askNameW = this.$refs[`askName${item.id}`][0].offsetWidth;
                        }
                    });
                });

                if (_aDatas.length < this.perpage) {
                    $state.complete();
                } else {
                    this.page += 1;
                    $state.loaded();
                }
            });

        },
        submitReply(oData) {
            this.$ajax('post', '/feedback/reply', {id: oData.id, reply: oData.text}, (data) => {
                oData.reply = oData.text;
                oData.replyname = '弘商管家';
                oData.replyid = honsenId;
                oData.updated_at = moment().format('YYYY-MM-DD HH:mm:ss');
                oData.showInput = false;
            });
        }
    },
}
</script>