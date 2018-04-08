
<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'
.news
    .new_card
        padding: 25px 60px
        .title
            height: 40px
            line-height: 38px
            color: #90a8b7
            font-size: 14px
            border-bottom: 1px solid #c2d2dc
            .title_text
                float left
                width 70px
                border-bottom: 2px solid #3dc1ff
                text-align center
            .select_all, .select_no, .del
                float left
                margin-left 15px
        .newsList-wrapper
            .newsList
                border-radius: 3px
                font-size: 14px
                .newsItem
                    display block
                    box-sizing: border-box
                    position: relative
                    height 65px
                    line-height 65px
                    border-bottom: 1px solid #ebebeb
                    color: #5a5a5a
                    &:last-child
                        border: none
                    .time
                        float: right
                        color: #92a8b5
                        font-size 12px
                    a
                        color: #5a5a5a
                    .text
                        a
                            display inline-block
                            max-width 570px
                            overflow: hidden
                            text-overflow: ellipsis
                            white-space: nowrap
                            vertical-align top
                            color: #00aeff
                    .ivu-badge
                        margin 0 20px 0 10px
                        .ivu-avatar
                            background-color transparent
            .no_data
                margin-left: 40px
</style>

<template>
<div class="news appwrap topMargin">
    <Card class="new_card" :padding="0" :bordered="false">
        <div class="title clearfix">
            <div class="title_text">所有消息</div>
            <div class="select_all"><Button size="small" type="ghost" @click="selectAll">全选</Button></div>
            <div class="select_no"><Button size="small" type="ghost" @click="selectNo">取消选择</Button></div>
            <div class="del"><Button size="small" type="ghost" :disabled="!selectedNids.length" @click="del">删除</Button></div>
        </div>
        <div class="newsList-wrapper">
            <ul class="newsList">
                <li class="newsItem" v-for="(notif,index) in notifs" :key="index">
                    <span class="time">{{notif.time}}</span>

                    <Checkbox v-model="notif.isSelected"></Checkbox>
                    <Badge v-if="notif.type === nType.admin_auth" :dot="!notif.is_readed && !isReadNotifs">
                        <Avatar src="/static/icon/brand.png" shape="square" />
                    </Badge>
                    <Badge v-else :dot="!notif.is_readed && !isReadNotifs">
                        <span @click="toPersonalCenter(notif.detail.f)" style="cursor: pointer">
                            <Avatar :src="$avatarHash(notif.detail.f)" shape="square" />
                        </span>
                    </Badge>

                    <span v-if="notif.detail.f_n" class="name"><a href="javascript:;" @click="toPersonalCenter(notif.detail.f)">{{notif.detail.f_n}}</a></span>
                    <!--消息类型-->
                    <span class="text" v-if="notif.type === nType.auth_edit">授予你在<a href="javascript:;" @click="toPostDetail(notif.detail.a)">《{{notif.detail.a_n}}》</a>中的编辑权限</span>

                    <span class="text" v-if="notif.type === nType.auth_view">授予你在<a href="javascript:;" @click="toPostDetail(notif.detail.a)">《{{notif.detail.a_n}}》</a>中的阅读权限</span>

                    <span class="text" v-if="notif.type === nType.user_follow">关注了你</span>

                    <span class="text" v-if="notif.type === nType.post_comment">评论了你的知识<a href="javascript:;" @click="toPostDetail(notif.detail.a)">《{{notif.detail.a_n}}》</a></span>

                    <span class="text" v-if="notif.type === nType.comment_comment">回复了你在<a href="javascript:;" @click="toPostDetail(notif.detail.a)">《{{notif.detail.a_n}}》</a>中的评论</span>

                    <span class="text" v-if="notif.type === nType.post_upvote">点赞了你的知识<a href="javascript:;" @click="toPostDetail(notif.detail.a)">《{{notif.detail.a_n}}》</a></span>

                    <span class="text" v-if="notif.type === nType.keep_comment">回复了你的案件<a href="javascript:;" @click="toCaseEdit(notif.detail.a)">《{{notif.detail.a_n.case}}》</a>：{{notif.detail.a_n.flow}}&gt;案件进展</span>

                    <span class="text" v-if="notif.type === nType.case_create">创建了团队案件<a class="content_link" href="javascript:;" @click="toCaseEdit(notif.detail.a)">《{{notif.detail.a_n}}》</a></span>

                    <span class="text" v-if="notif.type === nType.keep_add">在你的案件<a href="javascript:;" @click="toCaseEdit(notif.detail.a)">《{{notif.detail.a_n.case}}》</a>：{{notif.detail.a_n.flow}} 中新增了案件进展</span>

                    <span class="text" v-if="notif.type === nType.keep_update">在你的案件<a href="javascript:;" @click="toCaseEdit(notif.detail.a)">《{{notif.detail.a_n.case}}》</a>：{{notif.detail.a_n.flow}}&gt;案件进展 中更新了附件</span>

                    <span class="text" v-if="notif.type === nType.flow_comment">评论了你的案件<a href="javascript:;" @click="toCaseEdit(notif.detail.a)">《{{notif.detail.a_n.case}}》</a>：{{notif.detail.a_n.flow}}</span>

                    <span class="text" v-if="isLawyer && notif.type === nType.case_comment">回复了你对业务<a class="content_link" href="javascript:;" @click="toBusinessList(notif.detail.a)">《{{notif.detail.a_n.case}}》</a>的评论</span>

                    <span class="text" v-if="!isLawyer && notif.type === nType.case_comment">回复了你发布的业务<a class="content_link" href="javascript:;" @click="toSelectLawyer(notif.detail.a)">《{{notif.detail.a_n.case}}》</a></span>

                    <span class="text" v-if="notif.type === nType.coactor">授予你成为案件<a href="javascript:;" @click="toCaseEdit(notif.detail.a)">《{{notif.detail.a_n}}》</a>的协作者</span>

                    <span class="text" v-if="notif.type === nType.visitor">授予你案件<a href="javascript:;" @click="toCaseEdit(notif.detail.a)">《{{notif.detail.a_n}}》</a>的查看权限</span>

                    <span class="text" v-if="notif.type === nType.contact">授予你成为案件<a href="javascript:;" @click="toCaseEdit(notif.detail.a)">《{{notif.detail.a_n}}》</a>的联系人</span>

                    <span class="text" v-if="notif.type === nType.lawyer_designate">选择你成为案件<a href="javascript:;" @click="toCaseEdit(notif.detail.a)">《{{notif.detail.a_n}}》</a>的办理律师</span>

                    <span class="text" v-if="notif.type === nType.join_team">已将你添加为团队成员</span>

                    <!-- 审核的消息 -->
                    <span class="text" v-if="notif.type === nType.admin_auth && notif.detail.result">{{notif.detail.reason}}</span>
                    <span class="text" v-if="notif.type === nType.admin_auth && !notif.detail.result">{{notif.detail.reason}}。请重新去 <a href="javascript:;" @click="$router.push({name: 'identitySet'})">认证</a> ！</span>
                    <!-- 日程添加 -->
                    <span class="text" v-if="notif.type === nType.schedure_add">将你添加为日程<a href="javascript:;" @click="$store.commit('showSchPanel')">《{{notif.detail.a_n}}》</a>的成员，日程的开始时间为{{notif.detail.s_t | getDate}}</span>

                    <span class="text" v-if="notif.type === nType.expire_remind">您的账号 {{notif.detail.a_n}}，请及时<a href="javascript:;" @click="$router.push({name: 'orderManagement'})">续费</a></span>

                    <span class="text" v-if="notif.type === nType.expire_remind">您的账号 {{notif.detail.a_n}}，请及时续费</span>
                </li >
                <infinite-loading @infinite="onInfinite" ref="infiniteLoading">
                    <span slot="no-more">没有更多消息了！</span>
                    <span slot="no-results">没有消息！</span>
                </infinite-loading>
            </ul>
        </div>
    </Card>
</div>
</template>

<script>
import moment from 'moment';
import InfiniteLoading from 'vue-infinite-loading';
export default {
    name: 'news',
    components: {InfiniteLoading},
    data() {
        return {
            notifs: [],
            take: 15, // 一次加载数
             /*消息类型(与后端字段一致)*/
            nType: {
                auth_edit: 'auth_edit',
                auth_view: 'auth_view',
                user_follow: 'user_follow',
                post_comment: 'post_comment',
                comment_comment: 'comment_comment',
                post_upvote: 'post_upvote',
                keep_comment: 'keep_comment',
                keep_add: 'keep_add',
                keep_update: 'keep_update',
                flow_comment: 'flow_comment',
                coactor: 'coactor',
                visitor: 'visitor',
                contact: 'contact',
                admin_auth: 'admin_auth',
                schedure_add: 'schedure_add',
                lawyer_designate: 'lawyer_designate',
                join_team: 'join_team',
                case_comment: 'case_comment',  // 没接收的业务案件
                case_create: 'case_create',
                expire_remind: 'expire_remind'
            },
        }
    },
    computed: {
        isLawyer() {
            return this.$store.getters.auth_code_2 > 10? true: false;
        },
        isReadNotifs() {
            return this.$store.state.readNotifs;
        },
        currentNotif() {
            return this.$store.state.notifData;
        },
        selectedNids() {
            return this.notifs.filter(val => val.isSelected).map(item => item.nid) || [];
        }
    },
    watch: {
        currentNotif: function(newval,oldval){
            let val = window.JSON.parse(window.JSON.stringify(newval));

            // 反馈
            if (val.type == 'user_feedback' || val.type == 'steward_feedbackReply' || val.type != 'logout') {
                return;
            }

            val.is_readed = 0;
            val.time = moment().format('YYYY-MM-DD HH:mm:ss');
            val.isSelected = false;
            this.notifs.unshift(val);
        }
    },
    methods: {
        selectAll() {
            this.notifs.map(val => {
                val.isSelected = true;
                return val;
            });
        },
        selectNo() {
            this.notifs.map(val => {
                val.isSelected = false;
                return val;
            });
        },
        del() {
            this.$Modal.confirm({
                title: '确认框',
                content: '确定删除吗？',
                onOk: () => {
                    let URL = `/notification/delnotification`;
                    this.$http.post(URL, {nids: this.selectedNids}).then(response => {
                        let data = response.data;
                        if (data.retcode === RETCODE_OK) {
                            this.notifs = this.notifs.filter(val => !this.selectedNids.includes(val.nid));
                            this.$Message.success('删除成功！');

                            if (this.notifs.length < this.take) {
                                this.$nextTick(() => {
                                    this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
                                });
                            }

                        }else {
                            this.$Message.error(data.errmsg);
                        }
                    }).catch(err => {});
                },
            })
        },
        toCaseEdit(id) {
            if (this.isLawyer) {
                this.$ajax('get', `/biz/case/info/${id}`, (data) => {
                    this.$router.push({name: 'caseEdit', params: {caseid: id}});
                });
            } else {
                this.$router.push({name: 'caseRead', params: {caseid: id}});
            }
        },
        toPersonalCenter(id) {
            this.$router.push({name: 'personalCenter', params: {id: id}});
        },
        toBusinessList(id) {
            this.$router.push({ name: 'businessList', query: { personalcaseid: id}});
        },
        toSelectLawyer(id) {
            this.$router.push({ name: 'selectLawyer', params: { id: id}});
        },
        toPostDetail(id) {
            this.$router.push({name: 'postRead', params: {read_pid: id}});
        },
        onInfinite($state){
            let URL = `/notification/notification?skip=${this.notifs.length}&take=${this.take}`;
            this.$http.get(URL).then((response) => {
                // 请求成功回调
                let data = response.data;
                if (data.retcode === RETCODE_OK) {

                    data.data.forEach(val => {
                        val.isSelected = false;
                    });

                    // 去掉反馈的通知
                    let arr = data.data.filter(val => val.type != 'user_feedback' && val.type != 'steward_feedbackReply' && val.type != 'logout');

                    this.notifs.push(...arr);

                    if (data.data.length < this.take) {
                        $state.complete();
                    } else {
                        $state.loaded();
                    }
                }else {
                    this.$Message.error(data.errmsg);
                }
            }).catch(err => {})
        },
    },
    filters: {
        getDate(time) {
            return moment(time).format('YYYY/MM/DD');
        }
    }
}
</script>
