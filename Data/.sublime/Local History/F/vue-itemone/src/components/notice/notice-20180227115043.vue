<style lang="stylus">
.noticewrap
    color: #666
    font-size: 0.28rem
    padding: 0.2rem 0 0
    li
        padding: 0.25rem 0
        border-bottom: 1px solid #e5e5e5
        word-wrap: break-word
        word-break: break-all
        a
            color: #666
        .noti_content
            margin-left: 1.03rem
</style>

<template>
    <div class="noticewrap">
        <ul v-infinite-scroll="loadMore"
            infinite-scroll-disabled="isend"
            infinite-scroll-distance="30"
            infinite-scroll-immediate-check="false"
            class="appmiddlewrap">
            <li @click="gotoPage(nType[notif.type], notif.detail.a, notif)" class="clearboth" v-for="notif in notifs">
                <z_headimg :id="notif.detail.f" :vip="$authCodeT(notif.detail.vip).isV" :dot="!notif.is_readed"></z_headimg>
                <!--消息类型-->
                <div class="noti_content">
                    <a v-if="notif.detail.f_n" href="javascript:;">
                        {{notif.detail.f_n}}&nbsp;
                    </a>
                    <!--消息类型-->
                    <span class="text" v-if="notif.type === nType.user_follow.type">
                        关注了你
                    </span>
                    <span class="text" v-if="notif.type === nType.join_team.type">
                        已将你添加为团队成员
                    </span>
                    <!-- 知识 -->
                    <span class="text" v-if="notif.type === nType.auth_edit.type">
                        授予你在&nbsp;《{{notif.detail.a_n}}》&nbsp;中的编辑权限
                    </span>
                    <span class="text" v-if="notif.type === nType.auth_view.type">
                        授予你在&nbsp;《{{notif.detail.a_n}}》&nbsp;中的阅读权限
                    </span>
                    <span class="text" v-if="notif.type === nType.post_comment.type">
                        评论了你的知识&nbsp;《{{notif.detail.a_n}}》&nbsp;
                    </span>
                    <span class="text" v-if="notif.type === nType.comment_comment.type">
                        回复了你在&nbsp;《{{notif.detail.a_n}}》&nbsp;中的评论
                    </span>
                    <span class="text" v-if="notif.type === nType.post_upvote.type">
                        点赞了你的知识&nbsp;《{{notif.detail.a_n}}》&nbsp;
                    </span>
                    <!-- end -->
                    <!-- 案件 -->
                    <span class="text" v-if="notif.type === nType.keep_comment.type">
                        回复了你的案件&nbsp;《{{notif.detail.a_n.case}}》&nbsp;：&nbsp;{{notif.detail.a_n.flow}} &gt; 案件进展
                    </span>
                    <span class="text" v-if="notif.type === nType.keep_add.type">
                        在你的案件&nbsp;《{{notif.detail.a_n.case}}》&nbsp;：&nbsp;{{notif.detail.a_n.flow}} 中新增了案件进展
                    </span>
                    <span class="text" v-if="notif.type === nType.keep_update.type">
                        在你的案件&nbsp;《{{notif.detail.a_n.case}}》&nbsp;：&nbsp;{{notif.detail.a_n.flow}} &gt; 案件进展 中更新了附件
                    </span>
                    <span class="text" v-if="notif.type === nType.flow_comment.type">
                        评论了你的案件&nbsp;《{{notif.detail.a_n.case}}》&nbsp;：&nbsp;{{notif.detail.a_n.flow}}
                    </span>
                    <span class="text" v-if="notif.type === nType.coactor.type">
                        授予你成为案件&nbsp;《{{notif.detail.a_n}}》&nbsp;的协作者
                    </span>
                    <span class="text" v-if="notif.type === nType.visitor.type">
                        授予你案件&nbsp;《{{notif.detail.a_n}}》&nbsp;的查看权限
                    </span>
                    <span class="text" v-if="notif.type === nType.contact.type">
                        授予你成为案件&nbsp;《{{notif.detail.a_n}}》&nbsp;的联系人
                    </span>
                    <span class="text" v-if="notif.type === nType.lawyer_designate.type">
                        选择你成为案件&nbsp;《{{notif.detail.a_n}}》&nbsp;的办理律师
                    </span>
                    <span class="text" v-if="isLawyer && notif.type === nType.case_comment.type">
                        回复了你对业务&nbsp;《{{notif.detail.a_n.case}}》&nbsp;的评论
                    </span>
                    <span class="text" v-if="!isLawyer && notif.type === nType.case_comment.type">
                        回复了你发布的业务&nbsp;《{{notif.detail.a_n.case}}》&nbsp;
                    </span>
                    <!-- end -->
                    <!-- 审核的消息 -->
                    <span class="text" v-if="notif.type === nType.admin_auth.type && notif.detail.result">
                        你的认证审核通过了!
                    </span>
                    <span class="text" v-if="notif.type === nType.admin_auth.type && !notif.detail.result">
                        你的认证审核没有通过，原因：{{notif.detail.reason}}。请重新去认证！
                    </span>
                    <!-- 日程添加 -->
                    <span class="text" v-if="notif.type === nType.schedure_add.type">
                        将你添加为日程&nbsp;《{{notif.detail.a_n}}》&nbsp;的成员，日程的开始时间为{{notif.detail.s_t | getDate}}
                    </span>
                </div>
            </li>
        </ul>
        <div class="nodatalist">
            <mt-spinner v-if="loading" class="lodingdataicon"></mt-spinner>
            <span v-if="isend && !loading">没有更多通知了！</span>
        </div>
    </div>
</template>

<script>
import z_headimg from '@/components/common/z-headimg'
import moment from 'moment'

export default {
    name: 'noticewrap',
    data () {
        return {
            notifs: [],
            take: 15, // 一次加载数
            isend: false,
            loading: false,
             /*消息类型(与后端字段一致)*/
            nType: {
                // 知识
                auth_edit: { type: 'auth_edit', url: 'knowDetails'},
                auth_view: { type: 'auth_view', url: 'knowDetails'},
                post_comment: { type: 'post_comment', url: 'knowDetails'},
                comment_comment: { type: 'comment_comment', url: 'knowDetails'},
                post_upvote: { type: 'post_upvote', url: 'knowDetails'},
                // end
                // 案件
                keep_comment: { type: 'keep_comment', url: 'caseReadKH'},
                keep_add: { type: 'keep_add', url: 'caseReadKH'},
                keep_update: { type: 'keep_update', url: 'caseReadKH'},
                flow_comment: { type: 'flow_comment', url: 'caseReadKH'},
                coactor: { type: 'coactor', url: 'caseReadKH'},
                visitor: { type: 'visitor', url: 'caseReadKH'},
                contact: { type: 'contact', url: 'caseReadKH'},
                lawyer_designate: { type: 'lawyer_designate', url: 'caseReadKH'},
                case_comment: { type: 'case_comment', url: ''},
                // end
                user_follow: { type: 'user_follow', url: ''},
                join_team:  { type: 'join_team', url:''},
                admin_auth: { type: 'admin_auth', url:''},
                schedure_add: { type: 'schedure_add', url:''},
            },
        }
    },
    computed: {
        isLawyer() {
            return this.$store.getters.auth_code_2 > 10? true: false;
        },
        currentNotif() {
            return this.$store.state.notifData;
        }
    },
    beforeMount() {
        this.getALLNotifs()
        this.readAll()
    },
    mounted() {

    },
    methods: {
        gotoPage(t, id, list) {
            if( t.type == 'case_comment' ){
                if( this.isLawyer ){
                    this.$router.push({ name: 'caseReadKH', params: { id: id}})
                }else{
                    this.$router.push({ name: 'selectLawyer', params: { id: id}})
                }
            }else if( t.type == 'admin_auth' && !list.detail.result ){
                this.$router.push({ name: 'jobauth'})
            }else if( t.url ){
                this.$router.push({ name: t.url, params: { id: id}})
            }else{
                list.is_readed = 1
            }
        },
        readAll() {
            this.$http.post('/notification/read').then(response => {
                if (response.data.retcode === RETCODE_OK) {

                }else {
                    Toast( response.data.errmsg );
                }
            }).catch(err => {});
        },
        getALLNotifs() {
            this.loading = true
            this.$http.get('/notification/notification', { params: { skip: this.notifs.length, take: this.take}}).then(response => {
                if (response.data.retcode === RETCODE_OK) {
                    let v = response.data.data
                    this.notifs = this.notifs.concat(v.filter(val => val.type != 'user_feedback' && val.type != 'steward_feedbackReply' && val.type != 'logout'))
                    this.$store.commit('changeUnReadNotif', 0)
                    if( v.length < this.take ){
                        this.isend = true
                    }
                }else {
                    console.log( response.data.errmsg );
                }
                this.loading = false
            }).catch(err => {
                this.loading = false
            });
        },
        loadMore() {
            if( !this.loading ){
                this.getALLNotifs()
            }
        }
    },
    filters: {
        getDate(time) {
            return moment(time).format("YYYY-MM-DD HH:mm:ss");
        }
    },
    watch: {
        currentNotif: {
            deep: true,
            handler: function(newval ,oldval){
                let val = JSON.parse(JSON.stringify(newval))
                // 反馈 或 退出登录
                if (val.type == 'user_feedback' || val.type == 'steward_feedbackReply' || val.type == 'logout') {
                    return false
                }
                val.is_readed = 0
                this.notifs.unshift(val)
                this.readAll()
            }
        }
    },
    components: {
        z_headimg
    }
}
</script>
