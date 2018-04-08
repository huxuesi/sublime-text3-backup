<style lang="stylus">
@import '../../common/stylus/mixin.styl'
active = #3dc1ff
.layout_header
    position: fixed
    z-index: 1011
    top: 0
    width 100%
    background-color #fff
    border-bottom 1px solid #dedede
    .ivu-menu-light:after
        height 0
    .menu
        margin 0 auto
        max-width 1200px
        min-width 920px
        a
            color #7c7c7c
        .f_right
            float right
            &.ivu-menu-item-active
                border-bottom-color transparent
        .logo
            float: left
            position: relative
            top: 18px
            left: 0px
            width 195px
            height 26px
            background #fff url('/static/img/honsenlogo.png') 0 0 no-repeat
            cursor: pointer
        .header_search
            position: relative
            width 289px
            height: 100%
        /*.ivu-menu-item-active, .ivu-menu-item-selected
            a
                color #3dc1ff*/
        .headerbignav
            margin-right 5px
            font-size: 17px
            a
                color: #2e2e2e
            &:hover, &.ivu-menu-item-active
                a
                    color: active
                    &:hover
                        color: active !important
        .header_feed
            margin-left: 80px
        .sub_menu
            padding 0
            margin-left: 14px
            border-bottom-color transparent
            .ivu-menu-submenu-title
                padding-top: 6px
                & > span
                    display: block
                    height: 100%
                    line-height: normal
                    position: relative
                    &:after
                        content: ' '
                        display: block
                        position: absolute
                        bottom: -8px
                        left: 50%
                        margin-left: -5px
                        downArrow(5px, #ccc)
            .ivu-avatar
                border 1px solid transparent
            .ivu-menu-submenu-title-icon
                display none
            .ivu-select-dropdown
                top: 60px !important
                padding: 0
                .ivu-menu-item
                    font-size 12px !important
                    padding: 10px 16px 11px
                    .ivu-icon
                        vertical-align: sub
                        font-size 20px
            &.ivu-menu-item-active, &.ivu-menu-opened
                .ivu-menu-submenu-title
                    & > span
                        &:after
                            border-top-color: #3dc1ff
                .ivu-avatar
                    border 1px solid #3dc1ff
        .ivu-menu-submenu:hover
            border-bottom-color transparent !important
        .noti_wrap
            position relative
            margin-right -15px
            padding 0 20px
            .new_icon
                width 20px
                height 22px
                bgImg(20px, 22px,'/static/icon/0010.png')
            .popup
                display none
                position absolute
                z-index 4
                top: 56px
                left: -335px
                padding 0 20px
                width: 395px
                color: #717171
                text-align: left
                font-size: 12px
                border-radius: 3px
                background-color: #fff
                box-shadow 0 0 10px rgba(0,0,0,0.2)
                .extend_popup
                    position absolute
                    right 0px
                    top -40px
                    height 40px
                    width 150px
                    background transparent
                .popup_title
                    height: 40px
                    line-height: 40px
                    cursor default
                    border-bottom: 1px solid #c2d2dc
                    font-size 14px
                    color #90a8b7
                .read_more
                    margin-left -20px
                    width 395px
                    height 44px
                    line-height 44px
                    text-align center
                    background-color #f5f8f9
                    a
                        color: #787878
                ul
                    max-height: 280px
                    overflow: auto
                    line-height: 0
                    cursor default
                    li
                        box-sizing: border-box
                        padding: 15px 0
                        line-height: 0
                        border-bottom: 1px solid #f5f8f9
                        &:last-child
                            border:none
                        .img
                            position: relative
                            float: left
                        .noti_content
                            margin: -2px 0 0 50px
                            line-height: 14px
                            word-break: break-word
                            word-wrap: break-word
                            a
                                color: #717171
                            .content_link
                                color: #3dc1ff
                            .text
                                word-break: break-word
                                word-wrap: break-word
                                a
                                    line-height: 18px
            &:hover
                .new_icon
                    background-image url('/static/icon/0010.png')
                .popup
                    display block
    .ivu-menu-horizontal.ivu-menu-light:after
        background: none
    .header_loginregister
        font-size: 14px
        a
            color: #585858
</style>

<template>
    <div class="layout_header">
        <Menu v-if="$store.state.loginStatus" mode="horizontal" :theme="'light'" :active-name="init_name" @on-select="navClick" class="menu" :key="headMenuKey">
            <li>
                <div class="logo" @click="gotoRecommend"></div>
            </li>
            <MenuItem name="feed" class="header_feed headerbignav">
                <a href="/feed" @click.prevent>动态</a>
            </MenuItem>
            <MenuItem name="post" v-if="$store.getters.auth_code_1 >= 3" class="headerbignav">
                <a href="/post" @click.prevent>知识</a>
            </MenuItem>
            <MenuItem name="business" v-if="$authCodeT($store.getters.auth_code_123).isLawyer" class="headerbignav">
                <a href="/business" @click.prevent>业务</a>
            </MenuItem>
            <Submenu name="sub_menu" class="f_right sub_menu">
                <span slot="title" @click="$router.push({ name: 'personalCenter', params: { id: $store.state.mineInfo.id}})">
                    <Avatar size="large" :src="$avatarHash($store.state.mineInfo.id)" />
                </span>
                <MenuItem name="personalSetter"><Icon type="ios-gear" />个人设置</MenuItem>
                <MenuItem name="logout"><Icon type="android-exit" />退出登录</MenuItem>
            </Submenu>

            <li class="f_right noti_wrap" @mouseenter="enterNews" @mouseleave="readAll">
                <Badge :count="unReadNum" overflow-count="99">
                    <div class="new_icon"></div>
                </Badge>
                <div class="popup">
                    <div class="extend_popup"></div>
                    <div class="popup_title">{{unReadNum}} 条未读消息</div>
                    <ul v-if="recentNotifs.length" v-scrollUnique>
                        <li class="clearfix" v-for="notif in recentNotifs">
                            <div class="img">
                                <Badge v-if="notif.type === nType.admin_auth || notif.type === nType.expire_remind" :dot="!notif.is_readed">
                                    <Avatar size="large" src="/static/icon/brand.png" shape="square" />
                                </Badge>
                                <Badge v-else :dot="!notif.is_readed">
                                    <span @click="toPersonalCenter(notif.detail.f)" style="cursor: pointer">
                                        <Avatar size="large" :src="$avatarHash(notif.detail.f)" shape="square" />
                                    </span>
                                </Badge>
                            </div>

                            <!--消息类型-->
                            <div class="noti_content">
                                <a v-if="notif.detail.f_n" href="javascript:;" @click="toPersonalCenter(notif.detail.f)">{{notif.detail.f_n}}&nbsp;&nbsp;</a>
                                <!--消息类型-->
                                <span class="text" v-if="notif.type === nType.auth_edit">授予你在<a class="content_link" href="javascript:;" @click="toPostDetail(notif.detail.a)">《{{notif.detail.a_n}}》</a>中的编辑权限</span>

                                <span class="text" v-if="notif.type === nType.auth_view">授予你在<a class="content_link" href="javascript:;" @click="toPostDetail(notif.detail.a)">《{{notif.detail.a_n}}》</a>中的阅读权限</span>

                                <span class="text" v-if="notif.type === nType.user_follow">关注了你</span>

                                <span class="text" v-if="notif.type === nType.post_comment">评论了你的知识<a class="content_link" href="javascript:;" @click="toPostDetail(notif.detail.a)">《{{notif.detail.a_n}}》</a></span>

                                <span class="text" v-if="notif.type === nType.comment_comment">回复了你在<a class="content_link" href="javascript:;" @click="toPostDetail(notif.detail.a)">《{{notif.detail.a_n}}》</a>中的评论</span>

                                <span class="text" v-if="notif.type === nType.post_upvote">点赞了你的知识<a class="content_link" href="javascript:;" @click="toPostDetail(notif.detail.a)">《{{notif.detail.a_n}}》</a></span>

                                <span class="text" v-if="notif.type === nType.keep_comment">回复了你的案件<a class="content_link" href="javascript:;" @click="toCaseEdit(notif.detail.a, notif.detail.a_f)">《{{notif.detail.a_n.case}}》</a>：{{notif.detail.a_n.flow}} &gt; 案件进展</span>

                                <span class="text" v-if="notif.type === nType.case_create">创建了团队案件<a class="content_link" href="javascript:;" @click="toCaseEdit(notif.detail.a)">《{{notif.detail.a_n}}》</a></span>

                                <span class="text" v-if="notif.type === nType.keep_add">在你的案件<a class="content_link" href="javascript:;" @click="toCaseEdit(notif.detail.a, notif.detail.a_f)">《{{notif.detail.a_n.case}}》</a>：{{notif.detail.a_n.flow}} 中新增了案件进展</span>

                                <span class="text" v-if="notif.type === nType.keep_update">在你的案件<a class="content_link" href="javascript:;" @click="toCaseEdit(notif.detail.a, notif.detail.a_f)">《{{notif.detail.a_n.case}}》</a>：{{notif.detail.a_n.flow}} &gt; 案件进展 中更新了附件</span>

                                <span class="text" v-if="notif.type === nType.flow_comment">评论了你的案件<a class="content_link" href="javascript:;" @click="toCaseEdit(notif.detail.a, notif.detail.a_f)">《{{notif.detail.a_n.case}}》</a>：{{notif.detail.a_n.flow}}</span>

                                <span class="text" v-if="isLawyer && notif.type === nType.case_comment">回复了你对业务<a class="content_link" href="javascript:;" @click="toBusinessList(notif.detail.a)">《{{notif.detail.a_n.case}}》</a>的评论</span>

                                <span class="text" v-if="!isLawyer && notif.type === nType.case_comment">回复了你发布的业务<a class="content_link" href="javascript:;" @click="toSelectLawyer(notif.detail.a)">《{{notif.detail.a_n.case}}》</a></span>

                                <span class="text" v-if="notif.type === nType.coactor">授予你成为案件<a class="content_link" href="javascript:;" @click="toCaseEdit(notif.detail.a, notif.detail.a_f)">《{{notif.detail.a_n}}》</a>的协作者</span>

                                <span class="text" v-if="notif.type === nType.visitor">授予你案件<a class="content_link" href="javascript:;" @click="toCaseEdit(notif.detail.a, notif.detail.a_f)">《{{notif.detail.a_n}}》</a>的查看权限</span>

                                <span class="text" v-if="notif.type === nType.contact">授予你成为案件<a class="content_link" href="javascript:;" @click="toCaseEdit(notif.detail.a, notif.detail.a_f)">《{{notif.detail.a_n}}》</a>的联系人</span>

                                <span class="text" v-if="notif.type === nType.lawyer_designate">选择你成为案件<a class="content_link" href="javascript:;" @click="toCaseEdit(notif.detail.a, notif.detail.a_f)">《{{notif.detail.a_n}}》</a>的办理律师</span>

                                <span class="text" v-if="notif.type === nType.join_team">已将你添加为团队成员</span>

                                <!-- 审核的消息 -->
                                <span class="text" v-if="notif.type === nType.admin_auth && notif.detail.result">{{notif.detail.reason}}</span>
                                <span class="text" v-if="notif.type === nType.admin_auth && !notif.detail.result">{{notif.detail.reason}}。请重新去 <a class="content_link" href="javascript:;" @click="toConfirm">认证</a> ！</span>
                                <!-- 日程添加 -->
                                <span class="text" v-if="notif.type === nType.schedure_add">将你添加为日程<a class="content_link" href="javascript:;" @click="$store.commit('showSchPanel')">《{{notif.detail.a_n}}》</a>的成员，日程的开始时间为{{notif.detail.s_t | getDate}}</span>

                                <span class="text" v-if="notif.type === nType.expire_remind">您的账号 {{notif.detail.a_n}}，请及时<a href="javascript:;" @click="$router.push({name: 'orderManagement'})" class="content_link">续费</a></span>

                                <span class="text" v-if="notif.type === nType.user_evaluate">评价了您，可去<a href="javascript:;" @click="$router.push({name: 'personalCenter', params: { id: $store.state.mineInfo.id}})" class="content_link"> 个人中心 </a>进行查看</span>
                            </div>
                        </li>
                    </ul>
                    <div class="read_more">
                        <a href="javascript:;" @click="$router.push({name: 'news'})">查看全部消息</a>
                    </div>
                </div>
            </li>
            <li class="f_right header_search">
                <z_searchBox></z_searchBox>
            </li>
        </Menu>

        <Menu v-if="!$store.state.loginStatus && $route.name && $route.name != 'login'" mode="horizontal" :theme="'light'" class="menu">
            <li><div @click="$router.push({ name: 'login', query: { into: 'login'}})" class="logo"></div></li>
            <li class="f_right header_loginregister">
                <a @click="$router.push({ name: 'login', query: { into: 'login'}})" href="javascript:;">登录</a>　|　<a @click="$router.push({ name: 'login', query: { into: 'register'}})" href="javascript:;">注册</a>
            </li>
        </Menu>
    </div>
</template>

<script>
import moment from 'moment';
import z_searchBox from '@/components/common/z-searchBox';
import {createRandom} from '@/common/js/createRandom';

export default {
    name: 'Header',
    components: {z_searchBox},
    data () {
        return {
            /* 消息 */
            timerId: -1,
            time: 500,
            isFrist: true,
            showNews: false,
            unReadNum: 0,
            recentNotifs: [],
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
                expire_remind: 'expire_remind',
                user_evaluate: 'user_evaluate'
            },
        }
    },
    computed: {
        isLawyer() {
            return this.$store.getters.auth_code_2 > 10? true: false;
        },
        init_name() {
            let path = this.$route.fullPath.split('/')[1];
            if( path.includes('?') ){
                path = path.split('?')[0];
            }
            return path;
        },
        currentNotif() {
            return this.$store.state.notifData;
        },
        mineInfo() {
            return this.$store.state.mineInfo || {};
        },
        loginStatus() {
            return this.$store.state.loginStatus;
        },
        headMenuKey() {
            return this.$store.state.headMenuKey;
        }
    },
    mounted() {
        /*默认为登录状态时*/
        if(this.loginStatus){
            this.getUnreadNum();
        }
    },
    watch: {
        currentNotif: function(newval,oldval){
            let val = window.JSON.parse(window.JSON.stringify(newval));

            if( val.type == 'logout' ){
                window.location.href = '/login';
                return false;
            }

            // 反馈 或 退出登录
            if (val.type == 'user_feedback' || val.type == 'steward_feedbackReply' || val.type == 'logout') {
                return false;
            }

            val.is_readed = 0;
            this.recentNotifs.unshift(val);
            this.unReadNum += 1;

            /* 认证审核结果通知 */
            if(val.type == 'admin_auth'){

                if (val.detail.result) {
                    this.$Modal.success({
                        title: '认证审核',
                        content: val.detail.reason
                    });
                } else {
                    this.$Modal.confirm({
                        title: '认证审核',
                        content: `${val.detail.reason}，现在去重新认证？`,
                        onOk: () => {
                            this.$router.push({name: 'identitySet'});
                        }
                    });
                }

                /* 改变状态码 */
                let auth_code_str = this.$store.state.mineInfo.auth_code.toString();
                /* 审核通过状态码第四位变为1,审核失败状态码第四位变为2 */
                let _num = val.detail.result? '1': '2';
                let auth_code_value = auth_code_str.substring(0,3) + _num + auth_code_str.substring(4);
                this.$store.commit('changeMineInfo',{key:'auth_code',value:Number(auth_code_value)});
            }
        },
        /*默认没登录状态时*/
        loginStatus: function(newval,oldval){
            if(newval){
                this.isFrist = true;
                this.getUnreadNum();
            }
        }
    },
    methods: {
        navClick(name) {
            switch (name) {
                case 'feed':
                    this.$router.push({name: 'feed'});
                    break;
                case 'personalSetter':
                    this.$router.push({name: 'accountSet'});
                    break;
                case 'business':
                    this.$goto({name: 'businessList'});
                    break;
                case 'post':
                    this.$goto({name: 'postList'});
                    break;
                case 'logout':
                    this.logout();
                    break;
                default:
                    break;
            }
        },
        toConfirm() {
            if(this.$store.getters.auth_code_3 == 1){
                this.$Message.success('你的账号已经认证!')
            }else{
                this.$router.push({name: 'identitySet'});
            }
        },
        enterNews() {
            if(this.isFrist){
                this.getRecentNotifs();
            }
        },
        toPersonalCenter(id) {
            this.$router.push({name: 'personalCenter', params: {id: id}});
        },
        toPostDetail(id) {
            this.$router.push({name: 'postRead', params: {read_pid: id}});
        },
        toBusinessList(id) {
            this.$goto({ name: 'businessList', query: { personalcaseid: id}});
        },
        toSelectLawyer(id) {
            this.$router.push({ name: 'selectLawyer', params: { id: id}});
        },
        toCaseEdit(id, flowid) {
            if (this.isLawyer) {
                this.$ajax('get', `/biz/case/info/${id}`, (data) => {
                    // 成功再跳转(在该案件页面下时，url不变时加随机数强制改变url)
                    if (flowid) {
                        this.$router.push({name: 'caseEdit', params: {caseid: id}, query: {from: flowid + '_' +createRandom()}});
                    }else {
                        this.$router.push({name: 'caseEdit', params: {caseid: id}});
                    }
                });
            } else {
                this.$router.push({name: 'caseRead', params: {caseid: id}});
            }
        },
        readAll() {
            if(!this.unReadNum){
                return;
            }

            this.$ajax('post', '/notification/read', (data) => {
                this.unReadNum = 0;

                this.recentNotifs.forEach((val) => {
                    val.is_readed = 1;
                });

                this.$store.commit('readAllNotifs');
            });
        },
        getUnreadNum() {
            this.$ajax('get', '/notification/unreadnum', (data) => {
                this.unReadNum = data.num;
            });
        },
        getRecentNotifs() {
            let num =  (this.unReadNum > 8? this.unReadNum: 8);

            this.$ajax('get', `/notification/recent?take=${num}`, (data) => {
                // 去掉反馈的通知
                let arr = data.data.filter(val => val.type != 'user_feedback' && val.type != 'steward_feedbackReply' && val.type != 'logout');

                this.recentNotifs = arr;
                this.isFrist = false;
            });
        },
        logout() {
            // 先关闭socket
            if(window.socket){
                window.socket.close();
            }
            this.$ajax('post', '/logout', (data) => {
                // 重置状态
                this.$store.commit('rewriteMineInfo', null);
                this.$store.commit('changeloginStatus', false);

                this.$Message.success('退出登录成功！');
                this.$router.push({name: 'login'});
            });
        },
        gotoRecommend() {
            /*if( this.$route.name == 'recommend' ){

            }*/
            this.$store.commit('changeRecommendKey');
            this.$router.push({name: 'recommend'});
        }
    },
    filters: {
        getDate(time) {
            return moment(time).format('YYYY/MM/DD');
        }
    }
}
</script>
