<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'
borderColor = #e8e8e8
active = #3dc1ff
bgColor = #65778b
.personalcenter
    position: relative
    min-height: 100%
    background: #ecf9ff
    padding-top: 17px
    .header
        height: 414px
        border-radius: 3px
        background: url('/static/img/personalcenter_bg.png') no-repeat
        position: relative
        .set_theme
            position: absolute
            bottom: 0
            height: 44px
            line-height: 44px
            padding: 0 20px
            color: #fff
            font-size: 12px
            .ivu-icon
                vertical-align: text-bottom
                font-size: 20px
                position: relative
                top: 2px
        .user_info
            position relative
            width: 348px
            height: 100%
            float: right
            background: rgba(0,0,0,0.25)
            .editicon
                position absolute
                top 0px
                right 0px
                width: 42px
                height: 38px
                text-align: center
                cursor: pointer
                background: url('/static/icon/personalcenter_edit.png') no-repeat center
            .headimg
                width: 118px
                height: 118px
                margin: 38px auto 0
                border: 3px solid #fff
                border-radius: 50%
                box-shadow: 0 1px 9px #545252
                position: relative
                .icon
                    right: 7px
            p
                margin: 16px 0 0
                color: #fff
                text-align: center
                padding: 0 20px
            .name
                font-size: 16px
                font-weight: bold
                small
                    margin: 0 0 0 18px
                    font-weight: normal
            .company,.speciality
                margin: 9px 0 0
            .des
                margin: 12px 0 0
                font-size: 12px
            .follow
                margin: 0 26px 0 0
            .xisin
                background: #fff
                border-color: #fff
                color: #3dc1ff
            .iphone_address
                margin: 18px 0 0
                font-size: 12px
                .address
                    margin-left: 30px
                i
                    font-size: 16px
                    position: relative
                    top: 1px
    .panel
        background #fff
        border 1px solid borderColor
        border-radius 3px
        .page
            margin 20px 0
            text-align center
    .nav
        margin-top 23px
        margin-bottom 14px
        width 1200px
        height 46px
        line-height 46px
        color #4a4a4a
        font-size 16px
        &.fixed
            position fixed
            top 37px
            z-index 1
        .item
            float left
            margin-left 37px
            padding 0 5px
            line-height 44px
            cursor pointer
            &.active, &:hover
                color active
                border-bottom 2px solid active
            &.active
                font-weight bold
        .module_set
            float right
            margin-right 32px
            color #65778b
            font-size 14px
            cursor pointer
            .ivu-icon
                margin-right 5px
                vertical-align text-bottom
                font-size 20px
    .send_biz
        .tit
            height 46px
            line-height 46px
            color #282828
            font-size 16px
            text-indent 64px
            bgImg(100%, 46px, '/static/icon/personalcenter_write.png')
            background-position 37px center
            border-bottom 1px solid borderColor
        .content
            margin-top 20px
    .firm_biz, .private_biz
        margin-top 20px
        padding-bottom 14px
        .head
            margin-bottom 14px
            height 46px
            line-height 46px
            text-indent 37px
            color #fff
            font-size 16px
            background-color bgColor
        .content
            padding 0 37px
    .firm_biz
        .left
            border-right: 1px solid #ebebeb
            .img
                border-radius: 3px
                width: 68px
                height: 68px
                float: left
                margin: 0 17px 0 0
                cursor: pointer
            .name_wrap
                .name
                    display inline-block
                    vertical-align bottom
                    max-width 70px
                    font-size: 16px
                    color: #585858
                    margin: 0 16px 0 0
                .icon
                    width: 16px
                    height: 16px
                    vertical-align: text-bottom
                    margin: 0 0 0 6px
            .company
                color: #3c3c3c
                font-size: 14px
                margin: 5px 0 0
        .right
            margin-left: -1px
            padding-left: 15px
            border-left: 1px solid #ebebeb
            .list
                margin: 0 0 8px
                height: 34px
                line-height: 34px
                &:hover
                    background: #f6fcff
            .case_name
                float: left
                margin-left: 37px
                max-width: 80%
                color: #585858
    .private_biz
        .ivu-row
            height 34px
            line-height 34px
        .case_name
            max-width: 80%
            a
                color: #585858
            i
                margin-right 10px
                color: #fe6872
                &.green
                    color: #74c074
        .lawyer_name
            color: #7c7c7c
    .honsen_panel
        margin-top -14px
        padding 20px 86px 60px
        border-top none
    .honsen_question
        .img
            margin-bottom 25px
            cursor pointer
    .guide_panel
        .left_side
            float left
            width 796px
            .tit
                padding 0 28px
                height 38px
                line-height 38px
                color #fff
                background #65778b
                font-size 15px
                .time
                    float right
                    margin-right 50px
            .no_post_img
                width 100%
                position absolute
                left 0px
                top 100px
                text-align center
            .list
                min-height 300px
            .item
                padding 3px 28px
                height 44px
                line-height 38px
                border-bottom 1px solid #ebebeb
                &:not(.tit):hover
                    background #eef9fe
                .post_tit
                    float left
                    max-width 600px
                    font-size 15px
                    color #1e96cf
                    &:hover
                        color #2c2c2c !important
                .post_time
                    float right
                    font-size 13px
                    color #4b4b4b
        .right_side
            float right
            width 214px
            background #fff
            border 1px solid #dedede
            cursor pointer
            .title
                padding 0 20px
                height 53px
                line-height 53px
                font-size 15px
                color #3a3a3a
                font-weight bold
                background linear-gradient(to top, #e0e0e0, #fff)
                .icon
                    float right
                    padding 0 10px
            .list
                max-height 333px
                overflow auto
                transition: all .7s ease
            .item
                position relative
                padding 3px 20px 3px 45px
                height 37px
                line-height 31px
                font-size 14px
                color #2e2e2e
                &:not(:last-child)
                    border-bottom 1px solid #ebebeb
                &:hover
                    background #eef9fe
                &.active
                    color active
                .triangle
                    position absolute
                    top 14px
                    left 27px
                    transform rotate(-90deg)
                .num
                    float right
                    font-size 12px
                    color #b1b1b1
    .lawyer_panel
        position relative
        margin-top 14px
        padding 24px 86px 30px
        .head
            position relative
            font-size 15px
            color #323232
            font-weight bold
            .icon
                position absolute
                top -3px
                left -50px
                width 30px
                height 30px
                background-repeat no-repeat
                background-position center center
        .content
            margin-top 25px
    .lawyer_post
        min-height 360px
        .head
            .icon
                background-image url('/static/icon/0055.png')
                &.active
                    background-image url('/static/icon/0055_.png')
        .tit
            background-color bgColor
            color #fff
            font-size 15px
            .time
                float right
        .item
            position relative
            padding 3px 28px
            height 44px
            line-height 38px
            &:not(:last-child)
                border-bottom 1px solid #ebebeb
            &:not(.tit):hover
                background #eef9fe
            .post_tit
                float left
                display block
                max-width 600px
                font-size 15px
                color #1e96cf
                &:hover
                    color #2c2c2c !important
            .post_time
                float right
                font-size 13px
                color #4b4b4b
    .lawyer_question
        .head
            .icon
                background-image url('/static/icon/0054.png')
                &.active
                    background-image url('/static/icon/0054_.png')
            .bi_icon
                position absolute
                top 5px
                left 80px
                bgImg(13px, 13px, '/static/icon/0048.png')
                cursor pointer
            .sixin_btn
                position absolute
                top -3px
                left 80px
                .sixin_icon
                    margin-right 5px
                    display inline-block
                    vertical-align middle
                    bgImg(17px, 15px, '/static/icon/0056.png')
    .evaluate
        .head
            .icon
                background-image url('/static/icon/0053.png')
                &.active
                    background-image url('/static/icon/0053_.png')
.module_set_modal
    .item
        margin 0 70px
        padding 24px 0
        &:not(:last-child)
            border-bottom 1px solid borderColor
        .img
            float left
        .name
            float left
            margin-left 30px
            margin-top 16px
            color #353535
            font-size 15px
            font-weight bold
        .radio_group
            float right
            margin-top 16px
            color #3d3d3d
    .submit_btn
        margin 0 70px
</style>

<template>
    <div v-if="userinfo" class="personalcenter appwrap">
        <div class="header">
            <!-- <a v-if="isMe" @click="$Message.error('此功能暂未开放！');" class="set_theme" href="javascript:;">
                <Icon type="ios-gear"></Icon>&nbsp;主题设置
            </a> -->

            <div class="user_info">
                <div v-if="isMe" class="editicon" @click="$router.push({ name: 'accountSet'})"></div>

                <div class="headimg">
                    <img class="img" :src="$avatarHash(userinfo.id)">
                    <img v-if="userinfo.isVip" class="icon" src="/static/icon/vip.png">
                </div>

                <p class="name single_ellipsis">
                    {{userinfo.name}}
                    <small v-if="$authCodeT(userinfo.vip).isLawyer || userinfo.job">{{$authCodeT(userinfo.vip).isLawyer ? $authCodeT(userinfo.vip).role : userinfo.job}}</small>
                </p>

                <p v-if="isLawyer" class="company">{{userinfo.company || '未填写执业机构'}}</p>

                <p v-if="isLawyer" class="speciality">{{userinfo.speciality || '未填写专业领域'}}</p>

                <p v-if="userinfo.profile" :title="userinfo.profile" class="des ellipsis2">{{userinfo.profile}}</p>

                <p v-if="!isMe">
                    <Button v-if="userinfo.fofa == 1 || userinfo.fofa == 3" class="follow gray_btn" @click="toggleFollow('unfollow')" type="info" shape="circle">
                        取消关注+
                    </Button>
                    <Button v-else class="follow" @click="toggleFollow('follow')" type="info" shape="circle">关注+</Button>
                    <Button class="xisin" @click="startChat(userinfo)" type="info" shape="circle">&nbsp;私信&nbsp;</Button>
                </p>

                <p class="iphone_address">
                    <span v-if="userinfo.phone" class="iphone">
                        <Icon type="ios-telephone"></Icon>&nbsp;&nbsp;{{userinfo.phone || '未填写手机号'}}
                    </span>
                    <span v-if="userinfo.haveAddress && isLawyer" :class="{address: userinfo.phone}">
                        <Icon type="ios-location"></Icon>
                        &nbsp;&nbsp;{{ userinfo.province + ' ' + (userinfo.city == userinfo.province ? '': (userinfo.city + ' ')) + userinfo.area}}
                    </span>
                </p>
            </div>

        </div>

        <!-- 弘商管家 -->
        <template v-if="role == 'honsen'">
            <nav class="nav panel clearfix">
                <div class="item" :class="{active: curNav == 'guide'}" @click="curNav = 'guide'">用户指引</div>
                <div class="item" :class="{active: curNav == 'honsenQuestion'}" @click="curNav = 'honsenQuestion'">常见问题</div>
                <div class="item" :class="{active: curNav == 'leaveWords'}" @click="curNav = 'leaveWords'">用户留言</div>
                <div class="item" :class="{active: curNav == 'bestPost'}" @click="curNav = 'bestPost'">精品知识</div>
            </nav>

            <div v-show="curNav == 'guide'" class="panel honsen_panel guide_panel clearfix">
                <!-- 左侧 -->
                <div class="left_side">
                    <div class="item tit">
                        <span class="name">知识名称</span>
                        <span class="time">编辑时间</span>
                    </div>
                    <div v-if="guides.length" class="list">
                        <div class="item" v-for="(post, index) in guides" :key="index">
                            <a
                                class="post_tit single_ellipsis"
                                @click.prevent="$router.push({name: 'postRead', params: {read_pid: post.pid}})">
                                {{post.title}}
                            </a>
                            <div class="post_time">{{post.time}}</div>
                        </div>
                    </div>

                    <Page v-if="guidesSum > guidePerpage" class="page" :current="guidePage" :total="guidesSum" :page-size="guidePerpage" @on-change="changeGuidePage($event)"></Page>

                    <div v-if="!guides.length && !guidesLoading" class="no_content" style="text-align: center; margin-top: 10px">
                        <!-- <img src="/static/img/nolistcontent.png"> -->
                        暂无用户指引
                    </div>
                </div>

                <!-- 右侧 -->
                <div class="right_side">
                    <div class="title" @click="clickCategory(null)">
                        所有指引
                        <div class="icon" @click.stop="toggleCidList = !toggleCidList">
                            <Icon type="chevron-down"></Icon>
                        </div>
                    </div>

                    <ul v-if="aCategorys.length" v-show="toggleCidList" class="list">
                        <li
                            v-for="(category, index) in aCategorys"
                            :key="category.cid"
                            v-if="category.cid"
                            class="item"
                            :class="{active: curCid == category.cid}"
                            @click="clickCategory(category.cid)">

                            <div v-show="curCid == category.cid" class="triangle active"></div>

                            <span class="name">{{category.name}}</span>

                            <span class="num">{{category.num}}</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div v-show="curNav == 'honsenQuestion'" class="panel honsen_panel honsen_question">
                <img v-if="isMe" class="img" @click="$refs.honsenQuestion.addLawyerQuestion = true" src="/static/icon/0050.png" />

                <keep-alive>
                    <question v-if="curNav == 'honsenQuestion'" ref="honsenQuestion" :uid="userinfo.id" :isMe="isMe"></question>
                </keep-alive>
            </div>

            <div v-show="curNav == 'leaveWords'" class="panel honsen_panel">
                <keep-alive>
                    <leaveWords v-if="curNav == 'leaveWords'" :uid="userinfo.id" :isMe="isMe"></leaveWords>
                </keep-alive>
            </div>

            <div v-show="curNav == 'bestPost'" class="panel honsen_panel">
                <keep-alive>
                    <z_feedList v-if="curNav == 'bestPost'" type="bestPost" :initid="honsenId" :dishover="false" :mark="0" key="bestPost"></z_feedList>
                </keep-alive>
            </div>

        </template>

        <!-- 普通用户 -->
        <template v-if="role == 'user'">
            <nav class="nav panel clearfix">
                <div v-if="isMe" class="item" :class="{active: curNav == 'myBiz'}" @click="curNav = 'myBiz'">我的业务</div>
                <div class="item" :class="{active: curNav == 'publicPost'}" @click="curNav = 'publicPost'">公开知识</div>
            </nav>

            <template v-if="curNav == 'myBiz'">
                <div class="send_biz panel">
                    <div class="tit">发布业务</div>
                    <z_sendBiz class="content" @sendOK="sendBizOK"></z_sendBiz>
                </div>

                <div v-if="allCaseList.firm && allCaseList.firm.length" class="firm_biz panel" v-for="(list, index) in allCaseList.firm" :key="index">
                    <div class="head">{{list.customerName}}</div>
                    <Row class="content">
                        <Col span="6" class="left">
                            <img class="img" @click="$router.push({ name: 'personalCenter', params: { id: list.lawyer.id}})" :src="$avatarHash(list.lawyer.id)">
                            <div>
                                <p class="name_wrap">
                                    <a class="name single_ellipsis" @click="$router.push({ name: 'personalCenter', params: { id: list.lawyer.id}})" href="javascript:;">
                                        {{list.lawyer.name}}
                                    </a>
                                    {{$authCodeT(list.lawyer.vip).role}}
                                    <img v-if="list.lawyer.isVip" class="icon" src="/static/icon/vip.png">
                                </p>
                                <p class="company single_ellipsis">{{list.lawyer.company}}</p>
                                <p class="speciality single_ellipsis">{{list.lawyer.speciality.join('、')}}</p>
                            </div>
                        </Col>
                        <Col span="18" class="right">
                            <Row v-for="li in list.cases.data" :key="li.caseid" class="list">
                                <Col span="16">
                                    <a class="case_name single_ellipsis" @click="$router.push({ name: 'caseRead', params: { caseid: li.caseid}})" href="javascript:;">
                                        {{li.casename}}
                                    </a>
                                </Col>
                                <Col span="4">{{li.status == 0? '处理中': (li.status == 1? '已结案': '未处理')}}</Col>
                                <Col span="4">{{li.time | timeFormat}}</Col>
                            </Row>
                        </Col>
                    </Row>
                </div>

                <div v-if='allCaseList.person && allCaseList.person.data.length' class="private_biz panel">
                    <div class="head">我的业务</div>
                    <Row class="content" v-for="(list, index) in allCaseList.person.data" :key="index">
                        <Col span="14">
                            <p class="case_name single_ellipsis">
                                <Icon :class="{green: list.lawyer}" type="record"></Icon>
                                <a @click="goToCaseInfo(list)" href="javascript:;">{{list.casename}}</a>
                            </p>
                        </Col>
                        <Col span="7">
                            办理律师：
                            <a v-if="list.lawyer" class="lawyer_name" @click="$router.push({ name: 'personalCenter', params: { id: list.creator}})" href="javascript:;">
                                {{list.lawyer}}
                            </a>
                            <span v-else>未选定</span>
                        </Col>
                        <Col span="3">{{list.time | timeFormat}}</Col>
                    </Row>
                </div>
            </template>

        </template>

        <!-- 律师用户 -->
        <template v-if="role == 'lawyer'">
            <div class="nav" v-show="lawyerNavFixed"></div>
            <nav class="nav panel clearfix" :class="{fixed: lawyerNavFixed}">
                <div
                    class="item"
                    v-for="(nav, key) in modules"
                    :key="key"
                    v-if="nav.isShow"
                    :class="{active: curNav == nav.navName}"
                    @click="toggleNav(nav.navName)">
                    {{nav.name}}
                </div>

                <div v-if="isMe" class="module_set" @click="moduleSetModal = true">
                    <Icon type="ios-gear"></Icon>模块设置
                </div>
            </nav>

            <div v-if="modules.open_post.isShow" class="panel lawyer_panel lawyer_post" id="lawyerPost">
                <h3 class="head">
                    公开知识
                    <div class="icon" :class="{active: curNav == 'lawyerPost'}"></div>
                </h3>
                <div class="content">
                    <div v-if="lawyerPosts.length" class="item tit">
                        <span class="name">知识名称</span>
                        <span class="time">编辑时间</span>
                    </div>
                    <div class="item" v-for="(post, index) in lawyerPosts" :key="index">
                        <a
                            class="post_tit single_ellipsis"
                            @click.prevent="$router.push({name: 'postRead', params: {read_pid: post.pid}})">
                            {{post.title}}
                        </a>
                        <div class="post_time">{{post.updated_at}}</div>
                    </div>

                    <Page v-if="postSum > postPerpage" class="page" :current="postPage" :total="postSum" :page-size="postPerpage" @on-change="changePostPage($event)"></Page>

                    <div v-if="!lawyerPosts.length && !lawyerPostLoading" class="no_content">暂无公开知识...</div>
                </div>

            </div>

            <div v-if="modules.common_question.isShow" class="panel lawyer_panel lawyer_question" id="lawyerQuestion">
                <h3 class="head">
                    <div class="icon" :class="{active: curNav == 'lawyerQuestion'}"></div>
                    常见问题
                    <div v-if="isMe" class="bi_icon" @click="$refs.lawyerQuestion.addLawyerQuestion = true"></div>
                    <Button v-else class="sixin_btn" @click="startChat(userinfo)" type="info" shape="circle">
                        <div class="sixin_icon"></div>我要咨询
                    </Button>
                </h3>

                <question ref="lawyerQuestion" :uid="userinfo.id" :isMe="isMe"></question>
            </div>

            <div v-if="modules.clientele_evaluate.isShow" class="panel lawyer_panel evaluate" id="evaluate">
                <h3 class="head">
                    <div class="icon" :class="{active: curNav == 'evaluate'}"></div>
                    客户评价
                </h3>
                <evaluate :uid="userinfo.id" :isMe="isMe"></evaluate>
            </div>
        </template>

        <!-- 公用模块 -->
        <z_feedList v-if="curNav == 'publicPost'" :initid="userinfo.id" :mark="0" key="publicPost"></z_feedList>

        <Modal
            v-model="moduleSetModal"
            :closable="false"
            :mask-closable="false"
            width="787"
            class-name="module_set_modal">
            <div class="modal_tit">
                模块设置
                <i class="ivu-icon ivu-icon-ios-close-empty" @click="closeModuleSetModal"></i>
            </div>

            <div class="item clearfix" v-for="(value, key) in modules" :key="key">
                <img class="img" :src="value.isSetShow? value.src1: value.src2" width="53" height="53">
                <div class="name">{{value.name}}</div>
                <RadioGroup class="radio_group" v-model="value.isSetShow">
                    <Radio class="radio" :label="1">展示</Radio>
                    <Radio class="radio" :label="0">隐藏</Radio>
                </RadioGroup>
            </div>

            <div slot="footer" class="submit_btn">
                <Button type="info" long @click="setModuleInfo">提交</Button>
            </div>
        </Modal>

    </div>
</template>

<script>
import moment from 'moment';
import z_feedList from '@/components/common/z-feedList';
import z_sendBiz from '@/components/common/z-sendBiz';
import {toTop} from '@/common/js/toTop.js';
import question from './question';
import evaluate from './evaluate';
import leaveWords from './leaveWords';

export default {
    name: 'personalCenter',
    components: {z_feedList, z_sendBiz, question, evaluate, leaveWords},
    data () {
        return {
            honsenId,
            userinfo: null,
            role: '',
            isMe: false,
            curNav: '',

            allCaseList: {},

            lawyerNavFixed: false,
            moduleSetModal: false,
            modules: {
                open_post: {
                    navName: 'lawyerPost',
                    name: '公开知识',
                    src1: '/static/icon/0057_.png',
                    src2: '/static/icon/0057.png',
                    isShow: 0,
                    isSetShow: 0,
                    isGettedData: false,
                },
                common_question: {
                    navName: 'lawyerQuestion',
                    name: '常见问题',
                    src1: '/static/icon/0059_.png',
                    src2: '/static/icon/0059.png',
                    isShow: 0,
                    isSetShow: 0,
                    isGettedData: false,
                },
                clientele_evaluate: {
                    navName: 'evaluate',
                    name: '客户评价',
                    src1: '/static/icon/0060_.png',
                    src2: '/static/icon/0060.png',
                    isShow: 0,
                    isSetShow: 0,
                    isGettedData: false,
                },
            },

            aCategorys: [],
            toggleCidList: true,
            curCid: null,
            guidePage: 1,
            guidePerpage: 10,
            guidesLoading: false,
            guides: [],
            guidesSum: 0,

            lawyerPosts: [],
            postSum: 0,
            postPerpage: 8,
            postPage: 1,
            lawyerPostLoading: false,

        }
    },
    computed: {
        isshowchatpanel() {
            return this.$store.state.currentSide == 'chat';
        },
        isLawyer() {
            return this.userinfo && this.$authCodeT(this.userinfo.vip).isLawyer;
        },

    },
    beforeMount() {
        let id = this.$route.params.id;

        if(this.$store.state.loginStatus && (id == this.$store.state.mineInfo.id || id == 'me')){
            this.isMe = true;
            id = this.$store.state.mineInfo.id
            if( this.$store.getters.auth_code_123 <= 410 ){
                this.getAllCaseList();
            }
        }

        if( !this.$store.state.loginStatus &&  id == 'me'){
            this.$goto({name: 'login'});
        }

        this.getDetail(id);
    },
    mounted() {
        document.addEventListener('scroll', this.scrollHandle);
    },
    beforeDestroy() {
        document.removeEventListener('scroll', this.scrollHandle);
    },
    methods: {
        scrollHandle(e) {
            let top = document.documentElement.scrollTop || document.body.scrollTop;

            this.lawyerNavFixed = top > 454;
        },
        getDetail(id) {
            this.$ajax('get', `/userinfo/detail/${id}`, (data) => {

                data.data.province = data.data.province || '';
                data.data.city = data.data.city || '';
                data.data.area = data.data.area || '';

                data.data.haveAddress = data.data.province + data.data.city + data.data.area;

                data.data.speciality = data.data.speciality ? data.data.speciality.map(val => val.name).join('　') : '';
                this.userinfo = data.data;

                // 初始化
                if (id == honsenId) {
                    this.role = 'honsen';
                    this.curNav = 'guide';

                    this.getHonsenPostCategory();
                } else {
                    if (data.data.vip > 410) {
                        this.role = 'lawyer';

                        // 获取模块的数据（根据显示情况）
                        this.getModuleInfo();
                    } else {
                        this.role = 'user';
                        this.curNav = this.isMe? 'myBiz': 'publicPost';
                    }
                }

            });
        },


        toggleFollow(type) {
            if( this.$store.state.mineInfo && this.$store.state.mineInfo.id ){
                this.$ajax('post', `/user/${type}/${this.userinfo.id}`, (data) => {
                    this.userinfo.fofa = type == 'unfollow'? 0: 1;

                    this.$Message.success(type == 'unfollow'? '已取消关注！': '关注成功！');
                });
            }else{
                this.$Message.error('未登录，请先登录后再关注该用户！');
            }
        },
        getAllCaseList() {
            this.$ajax('get', 'biz/case/mycaselist', (data) => {
                this.allCaseList = data.data;
            });
        },
        sendBizOK(obj) {
            if( obj.ctmid == -1 ){
                this.$router.push({ name: 'selectLawyer', params: { id: obj.caseid}});
            }else{
                this.getAllCaseList();
            }
        },
        goToCaseInfo(list) {
            if( list.lawyer ){
                this.$router.push({ name: 'caseRead', params: { caseid: list.caseid}});
            }else{
                this.$router.push({ name: 'selectLawyer', params: { id: list.caseid}});
            }
        },
        startChat(user) {
            if(this.$store.state.mineInfo && this.$store.state.mineInfo.id){
                this.$store.commit("changeCurcontactInfo", { id: user.id, name: user.name});

                if(!this.isshowchatpanel){
                    this.$store.commit('setSide', 'chat');
                }
            }else{
                this.$Message.error('未登录，请先登录后再发起私信！');
            }
        },


        // 初始化选中模块
        initModuleActive(obj) {
            if (obj.open_post) {
                this.curNav = this.modules.open_post.navName;
            } else if (obj.common_question) {
                this.curNav = this.modules.common_question.navName;
            } else {
                this.curNav = this.modules.clientele_evaluate.navName;
            }
        },
        getModuleInfo() {
            this.$ajax('get', '/user/homepage/moduledetails', {uid: this.userinfo.id}, (data) => {

                let _data = data.data[0];

                this.initModuleActive(_data);

                for (const key in this.modules) {
                    this.modules[key].isShow = _data[key];
                    this.modules[key].isSetShow = _data[key];
                }

                if (_data.open_post) {
                    this.getLawyerPosts();
                }
            });
        },
        setModuleInfo() {
            let param = {};

            for (const key in this.modules) {
                param[key] = this.modules[key].isSetShow;
            }

            let isAllClose = true;
            for (const key in param) {
                if (param[key]) {
                    isAllClose = false;
                    break;
                }
            }
            if (isAllClose) {
                this.$Message.warning('请至少展示一项！');
                return;
            }

            this.$ajax('post', '/user/homepage/moduleset', param, data => {

                if (this.modules.open_post.isSetShow && !this.modules.open_post.isGettedData) {
                    this.getLawyerPost();
                }

                for (const key in this.modules) {
                    this.modules[key].isShow = this.modules[key].isSetShow;
                }

                this.initModuleActive(param);

                this.moduleSetModal = false;

                this.$Message.success('设置成功！');

            }, err => {
                for (const key in this.modules) {
                    this.modules[key].isSetShow = this.modules[key].isShow;
                }
                this.moduleSetModal = false;
            });
        },
        closeModuleSetModal() {
            for (const key in this.modules) {
                this.modules[key].isSetShow = this.modules[key].isShow;
            }

            this.moduleSetModal = false;
        },
        toggleNav(name) {
            this.curNav = name;
            toTop(name, 60);
        },


        getHonsenPostCategory() {
            this.$ajax('get', '/postcategory/list', {type: 'menu', id: honsenId}, (data) => {
                this.aCategorys = data.data;

                if (data.data.length) {
                    this.curCid = data.data[0].cid;
                    this.getGuides(this.curCid);
                }

            });
        },
        clickCategory(cid) {
            this.curCid = cid;
            this.guidePage = 1;
            this.getGuides(cid);
        },
        getGuides(cid) {
            let param = {
                type: 'menu',
                page: this.guidePage,
                perpage: this.guidePerpage,
                userid: honsenId,
            };

            if (cid || cid == 0) {
                // 不传cid取全部的知识 cid=0表示未分类的知识
                param.cid = cid;
            }

            if( !this.isMe ){
                param.jurisdiction = 'open';
            }

            this.$ajax('get', '/post/list', param, 'guidesLoading', (data) => {
                this.guides = data.data;
                this.guidesSum = data.total;
            });
        },
        changeGuidePage(page) {
            this.guidePage = page;
            this.getGuides(this.curCid);
        },


        getLawyerPosts() {
            let param = {
                uid: this.userinfo.id,
                page: this.postPage,
                perpage: this.postPerpage
            };

            this.$ajax('get', '/post/openpostlist', param, 'lawyerPostLoading', (data) => {
                this.lawyerPosts = data.data.data;
                this.postSum = data.data.total;

                this.modules.open_post.isGettedData = true;
            });
        },
        changePostPage(page) {
            this.postPage = page;
            this.getLawyerPosts();
        },


    },
    filters: {
        timeFormat(date) {
            return moment(date).format('YY-MM-DD HH:mm');
        },
    },
}
</script>
