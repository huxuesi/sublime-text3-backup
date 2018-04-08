<style lang="stylus">
@import '../../common/stylus/mixin.styl'
.sideBar
    position: fixed
    top: 0
    right: 0
    z-index: 1010
    padding-left 15px
    width 56px
    height 100%
    background-color #fff
    box-shadow -1px 0 10px rgba(0,0,0,0.2)
    .icon_list
        // padding-top 160px
        padding-top: 194px
        .qrcode_item
            .ivu-tooltip-arrow
                border-left-color: #fff
            .ivu-tooltip-inner
                background-color #fff
                .qr_code
                    padding 0 0 5px
                    text-align center
                    .min_text
                        margin-top 5px
                        color: #838383
                        font-size: 12px
                    .max_text
                        margin-top 5px
                        color: #535353
                        font-size 14px
        .icon_item
            margin-top 35px
            .icon_img
                text-align center
                cursor pointer
            &:nth-child(1)
                .icon_img
                    bgImg(27px,27px,'/static/icon/0042_.png')
                    &.active, &:hover
                        background-image url('/static/icon/0042.png')
            &:nth-child(2)
                .icon_img
                    bgImg(27px,27px,'/static/icon/0016_.png')
                    &.active, &:hover
                        background-image url('/static/icon/0016.png')
            &:nth-child(3)
                .icon_img
                    bgImg(27px,27px,'/static/icon/0014_.png')
                    &.active, &:hover
                        background-image url('/static/icon/0014.png')
            &:nth-child(4)
                .icon_img
                    bgImg(27px,27px,'/static/icon/0015_.png')
                    &.active, &:hover
                        background-image url('/static/icon/0015.png')
            &:nth-child(5)
                .icon_img
                    bgImg(27px,27px,'/static/icon/0013_.png')
                    &.active, &:hover
                        background-image url('/static/icon/0013.png')
            &:nth-child(6)
                .icon_img
                    bgImg(30px,27px,'/static/icon/0011_.png')
                    &.active, &:hover
                        background-image url('/static/icon/0011.png')
            &:nth-child(7)
                .icon_img
                    bgImg(27px,27px,'/static/icon/0012_.png')
                    &.active, &:hover
                        background-image url('/static/icon/0012.png')
            &:nth-child(8)
                .icon_img
                    bgImg(27px,27px,'/static/icon/0045_.png')
                    &.active, &:hover
                        background-image url('/static/icon/0045.png')
            &:nth-child(9)
                .icon_img
                    bgImg(27px,27px,'/static/icon/0017_.png')
                    &.active, &:hover
                        background-image url('/static/icon/0017.png')
        .icon_item_fixstyle
            .ivu-tooltip-arrow
                display: none
            .ivu-tooltip-inner
                background: #fff
                border: 1px solid #7d7d7d
                box-shadow: none
                color: #000
                padding: 2px 6px
                min-height: 22px
                border-radius: 0
    .ivu-back-top
        position: static

</style>

<template>
    <div class="sideBar animated">
        <div class="icon_list">
            <Tooltip class="icon_item qrcode_item" :content="'二维码'" placement="left">
                <div class="icon_img"></div>
                <div class="qr_code" slot="content">
                    <img src="/static/img/qrcode.jpg" alt="公司二维码" width="138" height="138">
                    <p class="min_text">微信 扫一扫</p>
                    <p class="max_text">弘商法律云平台公众号</p>
                </div>
            </Tooltip>
            <Tooltip v-show="!icon.noshow" v-for="(icon,key,index) in icon_list" :key="index" class="icon_item icon_item_fixstyle" :content="icon.tip" placement="left">
                <Badge v-if="icon.name == icon_list.chat.name" :count="chatUnreadNum" overflow-count="99">
                    <div class="icon_img" :class="{active: $store.state.currentSide == icon.name}" @click="changeSide(icon.name)"></div>
                </Badge>
                <Badge v-else-if="icon.name == icon_list.feedback.name" :dot="feedBackStatus">
                    <div class="icon_img" :class="{active: $store.state.currentSide == icon.name}" @click="changeSide(icon.name)"></div>
                </Badge>
                <div v-else class="icon_img" :class="{active: $store.state.currentSide == icon.name}" @click="changeSide(icon.name)"></div>
            </Tooltip>
            <BackTop class="icon_item" :height="200">
                <Tooltip content="回到顶部" placement="left">
                    <div class="icon_img"></div>
                </Tooltip>
            </BackTop>
        </div>

        <!-- 组件内容 -->
        <keep-alive exclude="feedback,collect">
            <shortNote v-if="$store.state.currentSide == icon_list.note.name"></shortNote>
            <fullcalendar v-if="$store.state.currentSide == icon_list.schedule.name"></fullcalendar>
            <calculation v-if="$store.state.currentSide == icon_list.aide.name"></calculation>
            <feedback v-if="$store.state.currentSide == icon_list.feedback.name" @read="feedBackStatus = false"></feedback>
            <chat v-if="$store.state.currentSide == icon_list.chat.name"></chat>
            <collect v-if="$store.state.currentSide == icon_list.collect.name"></collect>
            <records v-if="$store.state.currentSide == icon_list.record.name"></records>
        </keep-alive>

        <!-- 日程提醒 -->
        <calendarTip></calendarTip>
    </div>
</template>

<script>
import {messageConvert} from '@/common/js/messageConvert';
import {h5webNotification} from '@/common/js/h5webNotification';
import shortNote from './shortNote';
import fullcalendar from './fullcalendar';
import calendarTip from './calendarTip';
import calculation from './calculation';
import feedback from './feedback';
import chat from './chat';
import collect from './collect';
import records from './records';
export default {
    name: 'sideBar',
    components: {shortNote,fullcalendar,calendarTip,calculation,feedback,chat,collect,records},
    data() {
        return {
            icon_list: {
                chat: { tip: '　私信　', name: 'chat', isFirst: true},
                schedule: { tip: '　日程　', name: 'schedule'},
                note: { tip: '　便签　', name: 'note'},
                collect: { tip: '　收藏　', name: 'collect'},
                record: { tip: '跟进记录', name: 'record'},
                aide: { tip: '律师助手', name: 'aide', noshow: false},
                feedback: { tip: '　反馈　', name: 'feedback'}
            },
            chatUnreadNum: 0,
            feedBackStatus: false,
        }
    },
    computed: {
        isshowchatpanel() {
            return this.$store.state.currentSide == 'chat';
        },
        singlechat() {
            return this.$store.state.singlechat;
        },
        currentNotif() {
            return this.$store.state.notifData;
        },
    },
    beforeMount() {
        this.getChatUnreadNum();
        this.getFeedbackStatus();
    },
    methods: {
        changeSide(name) {
            this.$store.commit('setSide', name);
            // 如果打开的是私信
            if( name == this.icon_list.chat.name ){
                this.chatUnreadNum = 0;
                if ( window.Notification && Notification.permission == "granted" ) {

                } else if ( window.Notification ) {
                    if ( Notification.permission != "denied" ) {
                        Notification.requestPermission( function ( permission ) {} )
                    } else if ( Notification.permission == "denied" ){
                        console.log('桌面通知被禁用')
                    }
                } else {
                    console.log('浏览器不支持Notification')
                }
            }
        },
        getChatUnreadNum() {
            this.$ajax('get', '/chat/unreadnum', (data) => {
                this.chatUnreadNum = data.unread_num;
            });
        },
        startChat(user) {
            this.$store.commit("changeCurcontactInfo", { id: user.id, name: user.name});
            if( !this.isshowchatpanel ){
                this.$store.commit('setSide', 'chat');
            }
        },
        getFeedbackStatus() {
            this.$ajax('get', '/feedback/feedbackstatus', (data) => {
                // 1已读 0未读
                this.feedBackStatus = !data.data;
            });
        }
    },
    watch: {
        singlechat: {   // 获取到的一条信息
            deep: true,
            handler: function(v, ov){
                if( v.type == 'text' ){
                    if( !this.isshowchatpanel ){
                        this.chatUnreadNum += 1;
                    }

                    // 只要窗口是关闭的就启用桌面通知
                    if( !this.isshowchatpanel ){
                        let fromobj = { id: v.from, name: v.name, value: messageConvert(v.content, 'lastmsg')};
                        h5webNotification(fromobj, e => {
                            this.startChat(fromobj);
                            e.close();
                        });
                    }
                }else if( v.type == 'shake' ){
                    // 没打开过聊天收到震动
                    if( !this.icon_list.chat.isFirst ){
                        return false;
                    }
                    this.$store.commit("changeCurcontactInfo", { id: v.from, name: v.name, shake: true});
                    // 打开面板
                    this.$store.commit('setSide', 'chat');
                }
            }
        },
        isshowchatpanel() {
            if( this.icon_list.chat.isFirst ){
                this.icon_list.chat.isFirst = false
            }
        },
        currentNotif: function(newval,oldval){
            let val = window.JSON.parse(window.JSON.stringify(newval));

            // 反馈
            if (val.type == 'user_feedback' || val.type == 'steward_feedbackReply') {
                this.feedBackStatus = true;
            }
        },
    }
}
</script>