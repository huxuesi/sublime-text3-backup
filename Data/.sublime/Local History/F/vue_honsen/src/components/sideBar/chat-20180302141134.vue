<style lang="stylus">
.chat
    .chatnavwrap
        .chatnavwrapul
            margin: 10px 0 0
            li
                text-align: center
                height: 50px
                line-height: 50px
                cursor: pointer
                img
                    vertical-align: middle
                .clk
                    display: none
                &.active
                    .def
                        display: none
                    .clk
                        display: inline-block
    .chatcontactwrap
        & > .head
            height: 60px
            border-top: 1px solid #dcdcdc
            border-bottom: 1px solid #dcdcdc
        .searchcontact
            width: 205px
            margin: 12px auto 0 auto
            display: block
            &.nosearch
                .ivu-input
                    background: #e5e3e2
    .chattitle
        font-size: 16px
        line-height: 53px
        border-bottom: 1px solid #dcdcdc
        padding-left: 18px
    .messagewrap
        font-size: 12px
        .messageul
            height: 333px
            color: #a3a3a3
            padding: 0 24px 0 17px
            overflow-y: auto
            .messagetoptip
                color: #a3a3a3
                text-align: center
                padding: 12px 0
                position: relative
                margin-top: 1px
                height: 42px
            .seemoremessage
                color: #3030d2
                text-decoration: underline
                cursor: pointer
            .messagetime
                text-align: center
            .mes
                margin: 0 0 19px
                .messagep
                    position: relative
                    display: inline-block
                    padding: 10px 12px
                    max-width: 290px
                    border-radius: 3px
                    word-break: break-word
                    word-wrap: break-word
                    color: #676767
                    min-height: 38px
                    &:after
                        content: ''
                        width: 10px
                        height: 10px
                        display: inline-block
                        position: absolute
                        top: 15px
                        -webkit-transform: rotate(45deg)
                        transform: rotate(45deg)
                    .messageimg
                        max-width: 100%
                        max-height: 153px
                        display: block
                        cursor: pointer
                    .otherfilewrap
                        height: 25px
                        line-height: 25px
                        .imgicon
                            float: left
                            width: 25px
                            height: 25px
                            margin-right: 8px
                        .otherfilename, .downotherfile
                            color: #4c8ba9
                            display: inline-block
                            max-width: 202px
                        .downotherfile
                            color: #4c8ba9
                            vertical-align: top
                            &:hover
                                text-decoration: underline
                .isread, .noread
                    vertical-align: bottom
                    line-height: normal
                .isread
                    color: #d3d3d3
                .noread
                    color: #3dc1ff
                .meshead
                    height: 38px
                    width: 38px
                    vertical-align: top
            .messagemyself
                float: right
                .messagep
                    background: #dff5ff
                    margin-right: 14px
                    &:after
                        right: -5px
                        background: #dff5ff
                .isread, .noread
                    margin-right: 4px
            .messagefrom
                .messagep
                    background: #f5f5f5
                    margin-left: 14px
                    &:after
                        background: #f5f5f5
                        left: -5px
                .isread, .noread
                    margin-left: 4px
    .messagetool
        height: 35px
        line-height: 35px
        border-top: 1px solid #ececec
        border-bottom: 1px solid #ececec
        padding: 0 0 0 10px
        & > a
            display: inline-block
            width: 36px
            height: 100%
            text-align: center
            .iconimg
                vertical-align: text-top
        .addemojiicon
            position: relative
    .textareawrap
        position: relative
        .inputsay
            width: 390px
            height: 92px
            padding: 5px 10px
            white-space: pre-wrap
            word-break: break-word
            word-wrap: break-word
            resize: none
            outline: none
            border: 0
        .btnsubmitwrap
            position: absolute
            bottom: 10px
            right: 12px
        .btnsubmit
            padding: 5px 15px
        .btnsubmiticon
            padding: 5px 10px
        .submitsetpanel
            position: absolute
            left: 53%
            bottom: 13px
            background: #fff
            padding: 0px 7px
    .noselectbg
        text-align: center
        padding: 172px 0 0
    .chatcontactlistul
        position: relative
        height: 460px
        overflow-y: auto
        .chatcontactlistli
            padding: 10px 10px 9px 9px
            cursor: pointer
            border-bottom: 1px solid #e6e6e6
            &.active
                background: #fff
            .lihead
                width: 50px
                height: 50px
                float: left
                position: relative
                .liheadimg
                    width: 100%
                    height: 100%
                    border-radius: 3px
                /*&.reddot:after
                    content: ''
                    position: absolute
                    top: -5px
                    right: -5px
                    height: 10px
                    width: 10px
                    background: #f00
                    border-radius: 50%*/
            .licontent
                margin-left: 60px
                .licontenthead
                    padding-top: 2px
                    .name
                        display: inline-block
                        max-width: 90px
                    .time
                        float: right
                        color: #afafaf
                        font-size: 12px
                .lastreply
                    font-size: 12px
    .selectpersonalwrap
        position: relative
        height: 467px
        .selectpersonalinfo
            padding: 23px 60px 0
            .head
                padding: 0 0 17px
                border-bottom: 1px solid #e5e5e5
                .lefthead
                    width: 70px
                    height: 70px
                    float: left
                    img
                        width: 100%
                        height: 100%
                        display: block
                .rightinfo
                    margin-left: 91px
                    .name
                        font-size: 16px
                        color: #6f6f6f
                        .icon
                            width: 17px
                            height: 17px
                            margin: 0 0 0 8px
                            vertical-align: sub
                        .zhiwei
                            font-size: 12px
                            color: #585858
                            margin: 0 0 0 8px
                    .info
                        font-size: 12px
                        color: #585858
                        height: 36px
                        margin-top: 5px
            .infoitem
                padding: 15px 4px 18px
                border-bottom: 1px solid #e5e5e5
                & > p
                    font-size: 12px
                    color: #4d4d4d
                    margin: 6px 0
                    span
                        color: #919191
            .bottomcaozuo
                text-align: center
                padding: 32px 0 0
/* 抖动效果 */
.animated {
    -webkit-animation-duration: .6s
    animation-duration: .6s
    -webkit-animation-fill-mode: both
    animation-fill-mode: both
}

@-webkit-keyframes chatshake {
    0%,100% {
        -webkit-transform: translate3d(0,0,0)
        transform: translate3d(0,0,0)
    }

    10%,30%,50%,70%,90% {
        -webkit-transform: translate3d(-4px,4px,0)
        transform: translate3d(-4px,4px,0)
    }

    40%,40%,60%,80% {
        -webkit-transform: translate3d(4px,-4px,0)
        transform: translate3d(4px,-4px,0)
    }
}

@keyframes chatshake {
    0%,100% {
        -webkit-transform: translate3d(0,0,0)
        -ms-transform: translate3d(0,0,0)
        transform: translate3d(0,0,0)
    }

    10%,30%,50%,70%,90% {
        -webkit-transform: translate3d(-4px,4px,0)
        -ms-transform: translate3d(-4px,4px,0)
        transform: translate3d(-4px,4px,0)
    }

    20%,40%,60%,80% {
        -webkit-transform: translate3d(4px,-4px,0)
        -ms-transform: translate3d(4px,-4px,0)
        transform: translate3d(4px,-4px,0)
    }
}

.chatshake {
    -webkit-animation-name: chatshake
    animation-name: chatshake
}
</style>

<template>
    <div class="chat clearfix">
        <sideBase :class="{ chatshake: isjitter}" :haveSideNav="true" class="animated">
            <div slot="sideNav">
                <div class="chatnavwrap">
                    <ul class="chatnavwrapul">
                        <li @click="chatBigNav = 'chat', scrollToBottom()" :class="{ active: chatBigNav == 'chat'}"><img class="def" src="/static/icon/0016_.png"><img class="clk" src="/static/icon/0016.png"></li>
                        <li @click="chatBigNav = 'personal'" :class="{ active: chatBigNav == 'personal'}"><img class="def" src="/static/icon/chat_icon_personal.png"><img class="clk" src="/static/icon/chat_icon_personal_.png"></li>
                    </ul>
                </div>
            </div>

            <div slot="side">
                <div class="chatcontactwrap">
                    <div class="head">
                        <Input
                            v-model.trim="queryword"
                            @on-change="queryWordChange"
                            @on-focus="startQuery"
                            @on-click="togglequerypanel"
                            placeholder="搜索已关注用户"
                            :icon="chatBigNav == 'personal' ? 'close-circled' : 'android-search'"
                            ref="searchcontact"
                            :class="{ nosearch: chatBigNav == 'chat'}"
                            class="searchcontact">
                        </Input>
                    </div>
                    <div v-if="chatBigNav == 'chat'" class="chatcontactlist">
                        <ul class="chatcontactlistul" v-scrollUnique>
                            <li
                                v-for="list in contactslist"
                                @click="changeContactInfo(list)"
                                @contextmenu.prevent="toHandleContextMenu($event,list)"
                                :class="{ active: list.uid == curcontactinfo.id}"
                                class="chatcontactlistli clearfix">
                                <!-- :class="{ reddot: list.unread_num}" -->
                                <div class="lihead">
                                    <Badge :count="list.unread_num" overflow-count="99">
                                        <img :src="$avatarHash(list.uid)" class="liheadimg">
                                    </Badge>
                                </div>
                                <div class="licontent">
                                    <div class="licontenthead"><span class="name single_ellipsis">{{list.name}}</span> <span class="time">{{list.time | timeconvert}}</span></div>
                                    <div class="lastreply single_ellipsis" v-html="messageConvert(list.recent_content, 'lastmsg')"></div>
                                </div>
                            </li>
                            <div v-if="!contactslist.length && !contactlistLoading" class="nodatalist">
                                暂无最近联系人！
                            </div>
                            <Spin size="large" fix v-if="contactlistLoading">
                                <Icon type="load-c" class="spin-icon-load"></Icon>
                                <div>加载中...</div>
                            </Spin>
                        </ul>
                    </div>
                    <div v-if="chatBigNav == 'personal'">
                        <ul class="chatcontactlistul" v-scrollUnique>
                            <li v-for="list in searchcontactfilter" @click="changeSelectPersonal(list.fid)" :class="{ active: list.fid == selectpersonalid}" class="chatcontactlistli clearfix">
                                <div class="lihead">
                                    <img :src="$avatarHash(list.fid)" class="liheadimg">
                                </div>
                                <div class="licontent">
                                    <div class="licontenthead"><span class="name single_ellipsis">{{list.name}}</span> <span class="time"></span></div>
                                    <div class="lastreply single_ellipsis">{{list.profile}}</div>
                                </div>
                            </li>
                            <div v-if="!myfollowlist.length && !myfollowlistLoading" class="nodatalist">
                                暂未关注任何人！
                            </div>
                            <Spin size="large" fix v-if="myfollowlistLoading">
                                <Icon type="load-c" class="spin-icon-load"></Icon>
                                <div>加载中...</div>
                            </Spin>
                        </ul>
                    </div>
                </div>
            </div>

            <div slot="mainTit">
                <div v-if="curcontact && chatBigNav == 'chat'" class="chattitle">{{curcontact.name}}</div>
            </div>

            <div slot="main">
                <div v-if="chatBigNav == 'chat'">
                    <div v-if="curcontact" class="havemessage">
                        <div class="messagewrap" v-if="chatBigNav == 'chat'">
                            <ul ref="messageul" v-scrollUnique class="messageul">
                                <li class="messagetoptip">
                                    <Spin v-if="messageloading" fix>
                                        <Icon type="load-c" size="18" class="spin-icon-load"></Icon>
                                    </Spin>
                                    <div v-else>
                                        <div v-if="!curcontact.isend" @click="loadMoreMessage" class="seemoremessage">
                                            查看历史消息
                                        </div>
                                        <div v-else class="nomoremessage">
                                            没有更早的历史消息了
                                        </div>
                                    </div>
                                </li>
                                <transition-group name="grouplist2" tag="div">
                                    <li v-for="(list, index) in curcontact.message" :key="list.time + '-' + index" class="mes clearfix">
                                        <!-- 对话 -->
                                        <div v-if="list.target == 'out' || list.target == 'in'" :class="{ messagemyself: list.target == 'out', messagefrom: list.target == 'in'}">
                                            <!-- 对方头像 -->
                                            <img v-if="list.target == 'in'" class="meshead" :src="$avatarHash(curcontact.uid)">
                                            <!-- 对方是否读了消息 -->
                                            <span v-if="list.target == 'out' && list.is_readed" class="isread">已读</span>
                                            <span v-if="list.target == 'out' && !list.is_readed" class="noread">未读</span>
                                            <!-- 信息内容共用 -->
                                            <div class="messagep">
                                                <!-- 正常的消息 -->
                                                <div v-if="!list.filetype" v-html="list.content" style="white-space: pre-line; word-break: break-word; word-wrap: break-word"></div>
                                                <!-- 文件 -->
                                                <div v-else>
                                                    <!-- 图片 -->
                                                    <div v-if="list.filetype == 'img'" v-viewer="{ 'navbar': false, 'toolbar': false, 'rotatable': false, 'scalable': false, 'keyboard': true}">
                                                        <img :title="list.filename" :src="`${imgUrl}/file/preview/${list.filesrc}/img`" :height="list.imgheight" :width="list.imgwidth" class="messageimg">
                                                    </div>
                                                    <!-- 其他文件 -->
                                                    <div v-else class="otherfilewrap">
                                                        <img :src="`/static/img/${list.filetype}.png`" class="imgicon">
                                                        <a target="_blank" title="点击预览文件" :href="`${imgUrl}/file/preview/${list.filesrc}`" class="otherfilename single_ellipsis">{{list.filename}}</a>
                                                        <a target="_blank" title="下载此文件" :href="`${imgUrl}/file/download/${list.filesrc}`" class="downotherfile">下载</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- 我的头像 -->
                                            <img v-if="list.target == 'out'" class="meshead" :src="$avatarHash($store.state.mineInfo.id)">
                                        </div>
                                        <!-- 显示时间 -->
                                        <div v-if="list.target == 'time'" class="messagetime">
                                            {{list.content}}
                                        </div>
                                    </li>
                                </transition-group>
                            </ul>
                        </div>
                        <div class="messagetool">
                            <a @click.self="isshowEmoji = !isshowEmoji" title="发送表情" href="javascript:;" class="addemojiicon">
                                <img @click.self="isshowEmoji = !isshowEmoji" class="iconimg" src="/static/icon/chat_icon1.png">
                                <z_emoji
                                    ref="emojiwrap"
                                    v-show="isshowEmoji"
                                    @toggleshowEmoji="isshowEmoji = !isshowEmoji"
                                    :currentSay="curcontact.cursay"
                                    @changecurrentSay="changeCurrentSayEmoji">
                                </z_emoji>
                            </a>
                            <a title="发送文件" href="javascript:;">
                                <z_fileUpload
                                    :params="fileup_param"
                                    @fileUpSuccess="fileUpSuccess"
                                    @fileUpError="fileUpError"
                                    ref="messagefileup">
                                    <img class="iconimg" slot="icon" src="/static/icon/chat_icon2.png">
                                </z_fileUpload>
                            </a>
                            <a @click="jitter" title="窗口抖动" href="javascript:;"><img class="iconimg" src="/static/icon/chat_icon3.png"></a>
                        </div>
                        <div class="textareawrap">
                            <!-- 聊天输入框 -->
                            <textarea v-model.trim="curcontact.cursay" @keydown.enter="chatEnterKey" @keydown.ctrl.enter="chatCtrlEnterKey($event, curcontact)" @paste="textareapaste" ref="textarea" class="inputsay" placeholder="说点什么吧！"></textarea>
                            <ButtonGroup class="btnsubmitwrap" v-clickoutside="closeSubmitSetPanel">
                                <Button
                                    @click="submitSetPanel = false; submitMes()"
                                    :title="submitBtnSet == 'ctrlenter' ? '按Ctrl+Enter键发送消息，按Enter键换行': '按Enter键发送消息，按Ctrl+Enter键换行'"
                                    type="info"
                                    class="btnsubmit">
                                    发 送
                                </Button>
                                <Button @click.native="submitSetPanel = !submitSetPanel" type="primary" class="btnsubmiticon"><Icon type="arrow-down-b"></Icon></Button>
                                <div v-if="submitSetPanel" class="submitsetpanel floatpanel">
                                    <RadioGroup v-model="submitBtnSet" vertical>
                                        <Radio @click.native="submitSetPanel = false" label="enter">
                                            <span>按Enter键发送消息</span>
                                        </Radio>
                                        <Radio @click.native="submitSetPanel = false" label="ctrlenter">
                                            <span>按Ctrl+Enter键发送消息</span>
                                        </Radio>
                                    </RadioGroup>
                                </div>
                            </ButtonGroup>
                        </div>
                    </div>
                    <div v-else class="noselectbg">
                        <img src="/static/icon/chat_icon_bgicon.png">
                    </div>
                </div>
                <div v-if="chatBigNav == 'personal'">
                    <div v-if="selectpersonalid && selectpersonalinfo.id" class="selectpersonalwrap">
                        <div class="selectpersonalinfo">
                            <div class="head clearfix">
                                <div class="lefthead">
                                    <img :src="$avatarHash(selectpersonalinfo.id)">
                                </div>
                                <div class="rightinfo">
                                    <p class="name">
                                        <span>{{selectpersonalinfo.name}}</span>
                                        <span class="zhiwei">{{$authCodeT(selectpersonalinfo.vip).role}}</span>
                                        <img v-if="selectpersonalinfo.isVip" class="icon" src="/static/icon/vip.png">
                                    </p>
                                    <p class="info ellipsis2">{{selectpersonalinfo.profile}}</p>
                                </div>
                            </div>
                            <div v-if="selectpersonalinfo.speciality || selectpersonalinfo.company || selectpersonalinfo.phone || selectpersonalinfo.haveaddress" class="infoitem">
                                <p v-if="selectpersonalinfo.speciality">专业领域：<span>{{selectpersonalinfo.speciality}}</span></p>
                                <p v-if="selectpersonalinfo.company">{{$authCodeT(selectpersonalinfo.vip).isLawyer? '执业机构': '工作单位'}}：<span>{{selectpersonalinfo.company}}</span></p>
                                <p v-if="selectpersonalinfo.phone">联系电话：<span>{{selectpersonalinfo.phone}}</span></p>
                                <p v-if="selectpersonalinfo.haveaddress">所在地区：<span>{{ selectpersonalinfo.province + ' ' + (selectpersonalinfo.city == selectpersonalinfo.province ? '': (selectpersonalinfo.city + ' ')) + selectpersonalinfo.area}}</span></p>
                            </div>
                            <div class="bottomcaozuo">
                                <Button @click="startChat(selectpersonalinfo)" type="info">私信</Button>
                            </div>
                        </div>
                        <Spin size="large" fix v-if="selectpersonalinfoLoading">
                            <Icon type="load-c" class="spin-icon-load"></Icon>
                            <div>加载中...</div>
                        </Spin>
                    </div>
                    <div v-else class="noselectbg">
                        <img src="/static/icon/chat_icon_bgicon.png">
                    </div>
                </div>
            </div>
        </sideBase>

        <contextMenu ref="chatPerson_contextmenu">
            <div class="contextMenu_item" @click.stop="delChatPerson">删除</div>
        </contextMenu>
    </div>
</template>

<script>
import sideBase from './sideBase';
import moment from 'moment';
import InfiniteLoading from 'vue-infinite-loading';
import z_fileUpload from '@/components/common/z-fileUpload';
import z_emoji from '@/components/common/z-emoji';
import contextMenu from '@/components/common/contextMenu';
import {messageConvert} from '@/common/js/messageConvert';
import clickoutside from '@/common/directives/clickOutSide';

let timer = 0;

export default {
    name: 'chat',
    data () {
        return {
            imgUrl,
            messageConvert,
            chatBigNav: 'chat',     // chat personal
            contactslist: [],
            contactlistLoading: false,
            takenum: 15,   // 每次拿消息的条数
            messageloading: false,
            // 抖动
            isjitter: false,
            initContacts: {
                uid: '',
                name: '',
                recent_content: '',
                remark: '',
                time: '',
                unread_num: 0,
                message: [],       //消息列表
                isfirst: true,     //是否第一次加载
                isend: false,      //是否没数据
                cursay: '',        //输入内容
            },
            isshowEmoji: false,
            queryword: '',
            selectpersonalid: '',
            selectpersonalinfo: {},
            selectpersonalinfoLoading: false,
            myfollowlist: [],
            myfollowlistLoading: false,
            cur_contextMenu_contact: null,
            submitSetPanel: false,
            submitBtnSet: 'enter'
        }
    },
    computed: {
        isshowchatpanel() {
            return this.$store.state.currentSide == 'chat';
        },
        curcontactinfo() {
            return this.$store.state.curcontactinfo;
        },
        curcontact() {
            return this.contactslist.find(val => val.uid == this.$store.state.curcontactinfo.id);
        },
        singlechat() {
            return this.$store.state.singlechat;
        },
        chatread() {
            return this.$store.state.chatread;
        },
        fileup_param() {
            return {
                'about_type': 'chats',
                'about_id': this.curcontactinfo.id
            }
        },
        searchcontactfilter() {
            return this.myfollowlist.filter(e => e.name.includes(this.queryword));
        }
    },
    beforeMount() {
        this.getContacts();
    },
    activated() {
        if( this.curcontact ){
            this.scrollToBottom();
            this.setRead(true);
        }
    },
    methods: {
        toHandleContextMenu(e, contact) {
            this.cur_contextMenu_contact = contact;
            this.$refs.chatPerson_contextmenu.show(e);
        },
        delChatPerson() {
            this.$refs.chatPerson_contextmenu.hide();

            this.$Modal.confirm({
                title: '确认框',
                content: `删除后，将清空与 '${this.cur_contextMenu_contact.name}' 的所有聊天记录`,
                onOk: () => {
                    this.$http.post(`/chat/delcontact`, { id: this.cur_contextMenu_contact.uid}).then(response => {
                        if( response.data.retcode == RETCODE_OK ){
                            this.contactslist = this.contactslist.filter(contact => contact.uid != this.cur_contextMenu_contact.uid);
                            console.log(this.contactslist)
                            this.$nextTick(() => {
                                this.$store.commit("changeCurcontactInfo", {});
                            });
                        }else{
                            this.$Message.error( response.data.errmsg );
                        }
                    }).catch(err => {});
                }
            });
        },
        toggleThis() {
            this.$store.commit('setSide', 'chat');
        },
        chatEnterKey(e) {
            if( !e.ctrlKey ) {
                if( this.submitBtnSet == 'enter' ){
                    window.event ? window.event.returnValue = false : e.preventDefault();
                    // console.log('发送消息');
                    this.submitMes();
                }else{
                    // enter 可直接换行
                    // console.log('换行');
                }
            }

        },
        chatCtrlEnterKey(e, curcontact) {
            if( e.ctrlKey ) {
                let str = '\n';
                let oDom = e.target;

                if( this.submitBtnSet == 'ctrlenter' ){
                    //console.log('发送消息');
                    this.submitMes();
                }else{
                    if (document.selection) {
                        document.selection.createRange().text = str;
                    } else {
                        let start = oDom.selectionStart + 1;
                        oDom.value = oDom.value.substr(0, oDom.selectionStart) + str + oDom.value.substring(oDom.selectionStart, oDom.value.length);
                        oDom.setSelectionRange(start,start);
                        curcontact.cursay = oDom.value;
                    }
                }
            }
        },
        closeSubmitSetPanel() {
            this.submitSetPanel = false;
        },
        // 获取联系人
        getContacts() {
            this.contactlistLoading = true;
            this.$http.get(`/chat/contacts`).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    // 组装基本信息
                    let v = response.data.data;
                    v.forEach(val => {
                        val.unread_num = parseInt(val.unread_num);
                        let o = JSON.parse(JSON.stringify(val));
                        val = Object.assign(val, this.initContacts, o);
                    });
                    this.contactslist = v;
                    // 判断是否点击了和某人私信
                    let user = this.$store.state.curcontactinfo;
                    if( user.id ){
                        if( this.uidGetContact(user.id) ){
                            // 存在列表中
                            this.uidAddToFirst(user.id);
                            this.loadMoreMessage();
                        }else{
                            // 不在列表中    添加到首位
                            let addobj = {
                                uid: user.id,
                                name: user.name,
                                time: moment().format("YYYY-MM-DD HH:mm:ss")
                            };
                            this.addContact(addobj);
                            this.loadMoreMessage();
                        }
                    }
                    // 是否需要抖动
                    if( user.shake ){
                        this.jittering();
                    }
                }else{
                    this.$Message.error( response.data.errmsg );
                }
                this.contactlistLoading = false;
            }).catch(err => {
                this.contactlistLoading = false;
            });
        },
        // 获取消息列表
        loadMoreMessage() {
            let uid = this.curcontact.uid;
            let skip = this.getMessageLength();
            this.messageloading = true;
            this.$http.get('/chat/records', { params: { id: uid, skip: skip, take: this.takenum}}).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    // 倒序
                    let v = response.data.data.reverse();
                    let temparr = [];
                    if( v.length ){
                        let temptime;
                        v.forEach(e => {
                            // 添加聊天时间
                            if( !temptime || (moment(e.time).unix() - moment(temptime).unix() >= 300) ){
                                let obj = {
                                    content: this.timeconvert2(e.time),
                                    target: "time",
                                    time: e.time
                                };
                                temparr.push(obj);
                                temptime = e.time;
                            }
                            // 进行信息替换并插入缓存数组
                            temparr.push(messageConvert(e));
                        });
                    }
                    this.curcontact.message = temparr.concat(this.curcontact.message);
                    if( this.curcontact.isfirst ){
                        this.scrollToBottom();
                        this.setRead();
                        this.curcontact.isfirst = false;    // 修改第一次状态
                    }
                    if( v.length < this.takenum ){  // 没有更多
                        this.curcontact.isend = true;
                    }
                }else{
                    this.$Message.error( response.data.errmsg );
                }
                this.messageloading = false;
            }).catch(err => {
                this.messageloading = false;
            });
        },
        // 获取当前实际的聊天信息长度
        getMessageLength() {
            return this.curcontact.message.filter(e => { return (e.target == 'out' || e.target == 'in')}).length;
        },
        // 发消息或来消息滚动到底部
        scrollToBottom() {
            this.$nextTick(() => {
                if( this.$refs.messageul ){
                    this.$refs.messageul.scrollTop = this.$refs.messageul.scrollHeight;
                }
            });
        },
        // 更改聊天用户
        changeContactInfo(user) {
            this.$store.commit("changeCurcontactInfo", { id: user.uid, name: user.name, isfirst: false});
            if( !this.uidGetContact(user.uid).isfirst ){
                this.setRead();
            }
        },
        // 发送消息
        submitMes(filev, isupload) {
            let uid = this.curcontact.uid;
            let say = this.curcontact.cursay;
            if( isupload ){
                uid = filev.touid;
                say = filev.content;
            }
            if( say == '' ){
                this.$Message.error('私信内容不能为空！');
                return false;
            }
            // 插入数据
            let inmessage = { content: say, is_readed: 0, target: 'out', time: moment().format("YYYY-MM-DD HH:mm:ss")};
            if( isupload ){
                inmessage = Object.assign(inmessage, filev);
            }else{
                // 普通信息需要转一次
                inmessage = messageConvert(inmessage);
            }
            // 插入聊天记录列表
            this.insertMessage(uid, inmessage);
            // 获取焦点，滚动到底部，清空输入框
            this.$refs.textarea.focus();
            this.scrollToBottom();
            if( !isupload ){
                this.uidGetContact(uid).cursay = '';
            }
            // 开始请求
            this.$http.post('/chat/add', { to: uid, content: say}).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    this.commonFn(uid, say);
                }else{
                    // 失败处理
                    /*this.uidGetContact(uid).message.pop();
                    if( !isupload ){
                        this.uidGetContact(uid).cursay = say;
                    }*/
                    this.$Message.error( response.data.errmsg );
                }
            }).catch(err => {

            });
        },
        insertMessage(uid, inmessage) {
            // 显示聊天时间
            let timeobj = {
                content: this.timeconvert2(moment().format("YYYY-MM-DD HH:mm:ss")),
                target: "time",
                time: moment().format("YYYY-MM-DD HH:mm:ss")
            };
            if( this.uidGetContact(uid).message.length ){
                if( moment().unix() - moment(this.uidGetContact(uid).message[this.uidGetContact(uid).message.length - 1].time).unix() >= 300 ){
                    this.uidGetContact(uid).message.push(timeobj);
                }
            }else{
                this.uidGetContact(uid).message.push(timeobj);
            }

            this.uidGetContact(uid).message.push(inmessage);
        },
        // 根据uid获取联系人
        uidGetContact(uid) {
            return this.contactslist.find(val => val.uid == uid);
        },
        // 把指定的uid提到首位
        uidAddToFirst(uid) {
            this.contactslist.forEach((e, i) => {
                if( e.uid == uid ){
                    let tempobj = this.contactslist.splice(i, 1);
                    this.contactslist.unshift(tempobj[0]);
                }
            });
        },
        // 添加用户进联系人列表
        addContact(obj) {
            let tempobj = Object.assign({}, this.initContacts, obj);
            this.contactslist.unshift(tempobj);
        },
        // 收发公共方法
        commonFn(uid, content) {
            // 更新时间
            this.uidGetContact(uid).time = moment().format("YYYY-MM-DD HH:mm:ss");
            // 更新最后一条
            this.uidGetContact(uid).recent_content = content;
        },
        //发送抖屏自己也会抖
        jitter() {
            //当前聊天对象id为默认的0就是无效的
            this.jittering()
            this.$http.post('/chat/shake', { id: this.curcontact.uid}).then(response => {
                if( response.data.retcode == RETCODE_OK ){

                }else{
                    this.$Message.error( response.data.errmsg );
                }
            }).catch(err => {

            });
        },
        //抖动效果
        jittering() {
            this.isjitter = true;
            let settime = setTimeout(() => {
                this.isjitter = false;
            }, 600);
        },
        //设置当前聊天对象信息为已读
        setRead(type) {
            if( this.curcontact.unread_num || type ){
                this.curcontact.unread_num = 0;
                this.$http.post('/chat/setread', { id: this.curcontact.uid}).then(response => {
                    if( response.data.retcode == RETCODE_OK ){

                    }else{
                        this.$Message.error( response.data.errmsg );
                    }
                }).catch(err => {

                });
            }
        },
        fileUpSuccess(response, file, fileList, params) {
            if( !response.hash ){
                this.$Message.error('服务器错误！上传失败！');
                return false;
            }
            file.name = file.name || "image.png";
            let obj = {
                name: file.name,
                hash: response.hash,
                ext: file.name.substr( file.name.lastIndexOf(".")+1 ).toLowerCase(),
                width: params.imgwidth,
                height: params.imgheight,
                touid: params.about_id
            };
            obj = messageConvert(obj, "encode");
            this.submitMes(obj, true);
            // console.log(response, file, fileList, params);
        },
        fileUpError(error, file, fileList, params) {
            console.log(error, file, fileList, params);
        },
        // 粘贴图片上传
        textareapaste(e) {
            var cbd = e.clipboardData;
            var ua = window.navigator.userAgent;

            // 不支持 直接 return
            if( !(cbd && cbd.items) ){
                this.$Message.error('此浏览器不支持粘贴图片，请使用发送文件功能！');
                return false;
            }

            // Mac平台下Chrome49版本以下 解决复制Finder中的文件的Bug
            if( cbd.items && cbd.items.length === 2 && cbd.items[0].kind === "string" && cbd.items[1].kind === "file" &&
                cbd.types && cbd.types.length === 2 && cbd.types[0] === "text/plain" && cbd.types[1] === "Files" &&
                ua.match(/Macintosh/i) && Number(ua.match(/Chrome\/(\d{2})/i)[1]) < 49 ){
                this.$Message.error('此浏览器不支持粘贴图片，请使用发送文件功能！');
                return false;
            }

            for(var i = 0; i < cbd.items.length; i++) {
                var item = cbd.items[i];
                if(item.kind == "file" && cbd.items.length != 4){
                    var f = item.getAsFile();
                    if (f.size === 0) {
                        return false;
                    }
                    // 直接调用iview upload组件上传方法
                    this.$refs.messagefileup.$refs.sendbizfile.handleChange({ target: { files: [f]}});
                }
            }
        },
        changeCurrentSayEmoji(v) {
            this.curcontact.cursay = v;
            this.$refs.textarea.focus();
        },
        queryWordChange() {
            window.clearTimeout(timer);
            timer = setTimeout(() => {
                if( this.queryword == '' ){
                    return false;
                }
                console.log('搜索了' + this.queryword)
            }, 500);
        },
        startQuery() {
            this.chatBigNav = 'personal';
        },
        togglequerypanel() {
            if( this.chatBigNav == 'personal' ){
                this.chatBigNav = 'chat';
                this.scrollToBottom();
            }else{
                this.chatBigNav = 'personal';
            }
        },
        getMyFollow() {
            this.myfollowlistLoading = true;
            this.$http.get('/user/followclassify').then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    let v = response.data.data;
                    v.forEach((e, i) => {
                        if( e.num ){
                            let url;
                            if( e.tid ){
                                url = `/user/usersinfollowclassify/${e.tid}`;
                            }else{
                                url = '/user/usersinfollowclassify';
                            }
                            this.$http.get(url).then(response => {
                                if( response.data.retcode == RETCODE_OK ){
                                    let v = response.data.data;
                                    v.forEach(e => {
                                        let flag = false;
                                        this.myfollowlist.forEach(v => {
                                            if( v.fid == e.fid ){
                                                flag = true;
                                            }
                                        });
                                        if( !flag ){
                                            this.myfollowlist.push(e)
                                        }
                                    });
                                }else{
                                    this.$Message.error( response.data.errmsg );
                                }
                                if( i == v.length - 1 ){
                                    // this.myfollowlistLoading = false;
                                }
                            }).catch(err => {
                                if( i == v.length - 1 ){
                                    // this.myfollowlistLoading = false;
                                }
                            });
                        }
                    });
                }else{
                    // this.myfollowlistLoading = false;
                    this.$Message.error( response.data.errmsg );
                }
                this.myfollowlistLoading = false;
            }).catch(err => {
                this.myfollowlistLoading = false;
            });
        },
        changeSelectPersonal(id) {
            this.selectpersonalid = id;
            this.getSelectPersonalInfo(id);
        },
        getSelectPersonalInfo(id) {
            this.selectpersonalinfoLoading = true;
            this.$http.get(`/userinfo/detail/${id}`).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    let v = response.data.data;
                    v.province = v.province === null ? '' : v.province;
                    v.city = v.city === null ? '' : v.city;
                    v.area = v.area === null ? '' : v.area;
                    v.haveaddress = v.province + v.city + v.area;
                    v.speciality = v.speciality ? v.speciality.map(e => e.name).join('、') : '';
                    this.selectpersonalinfo = v;
                }else{
                    this.$Message.error( response.data.errmsg );
                }
                this.selectpersonalinfoLoading = false;
            }).catch(err => {
                this.selectpersonalinfoLoading = false;
            });
        },
        startChat(user) {
            this.$store.commit("changeCurcontactInfo", { id: user.id, name: user.name});
            if( !this.isshowchatpanel ){
                this.$store.commit('setSide', 'chat');
            }
        },
        timeconvert2(date) {
            if( moment().isSame(date, 'day') ){
                return moment(date).format('HH:mm:ss');
            }else{
                return moment(date).format('YYYY-MM-DD HH:mm:ss');
            }
        }
    },
    filters: {
        timeconvert(date) {
            if( moment().isSame(date, 'day') ){
                return moment(date).format('HH:mm');
            }else{
                return moment(date).format('YY/MM/DD');
            }
        }
    },
    watch: {
        curcontactinfo: {
            deep: true,
            handler: function(v, ov){
                if( v.id ){
                    this.chatBigNav = 'chat';
                    if( this.uidGetContact(v.id) ){
                        // 存在列表中
                        if( this.curcontact.isfirst ){
                            this.loadMoreMessage();
                        }else{
                            this.scrollToBottom();
                        }
                    }else{
                        // 不在列表中    添加
                        let addobj = {
                            uid: v.id,
                            name: v.name,
                            time: moment().format("YYYY-MM-DD HH:mm:ss")
                        };
                        this.addContact(addobj);
                        this.loadMoreMessage();
                    }
                }
            }
        },
        singlechat: {   // 获取到的一条信息
            deep: true,
            handler: function(v, ov){
                if( this.uidGetContact(v.from) ){
                    // 存在列表中
                    this.uidAddToFirst(v.from);
                }else{
                    // 不在列表中    添加
                    let addobj = {
                        uid: v.from,
                        name: v.name,
                        recent_content: v.content,
                        time: moment().format("YYYY-MM-DD HH:mm:ss")
                    };
                    this.addContact(addobj);
                }
                if( v.type == 'text' ){
                    // 正在聊天双方的消息设为已读
                    if( this.isshowchatpanel && (this.curcontactinfo.id == v.from) ){
                        this.setRead(true);
                        this.uidGetContact(v.from).message.forEach(e => {
                            if( e.target == 'out' ){
                                e.is_readed = 1;
                            }
                        })
                    }else if( !this.isshowchatpanel && (this.curcontactinfo.id == v.from) ){

                    }else{  //不是正在聊天的未读条数 +1
                        this.uidGetContact(v.from).unread_num += 1;
                    }

                    let mesobj = {
                        content: v.content,
                        target: "in",
                        time: v.time
                    };
                    mesobj = messageConvert(mesobj);
                    // 获取过消息的用户就插入对话信息
                    if( !this.uidGetContact(v.from).isfirst ){
                        // 插入聊天记录
                        this.insertMessage(v.from, mesobj);
                    }
                    // 收发公共方法
                    this.commonFn(v.from, v.content);
                }else if( v.type == 'shake' ){
                    // 打开面板
                    if( !this.isshowchatpanel ){
                        this.toggleThis();
                    }
                    // 改变当前user
                    this.changeContactInfo({ uid: v.from, name: v.name});
                    // 抖动
                    this.jittering();
                }
                this.scrollToBottom();
            }
        },
        chatread: {   // 已读
            deep: true,
            handler: function(v, ov){
                if( this.uidGetContact(v.from) ){
                    this.uidGetContact(v.from).message.forEach(e => {
                        if( e.target == 'out' ){
                            e.is_readed = 1;
                        }
                    })
                }
            }
        },
        chatBigNav(v, ov) {
            if( v == 'personal' ){
                this.getMyFollow();
                this.$nextTick(() => {
                    this.$refs.searchcontact.focus();
                });
            }else{
                this.queryword = '';
                this.selectpersonalid= '';
                this.selectpersonalinfo = {};
            }
        }
    },
    components: {
        sideBase,
        InfiniteLoading,
        z_fileUpload,
        z_emoji,
        contextMenu
    },
    directives: {
        clickoutside
    }
}
</script>
