<style lang="stylus">
#app
    height: 100%
    overflow-y: auto
.toogle-enter-active/*, .toogle-leave-active*/
    transition: transform .3s ease
.toogle-enter/*, .toogle-leave-to*/
    transform: translateX(100%)
::-webkit-input-placeholder
    color: #d2d2d2
:-moz-placeholder
    color: #d2d2d2
::-moz-placeholder
    color: #d2d2d2
:-ms-input-placeholder
    color: #d2d2d2
.chatwrap
    position: fixed
    bottom: 65px
    right: 5px
    height: 1.36rem
    width: 1.36rem
    box-shadow: 0 0 16px hsla(0,0%,51%,.4)
    border-radius: 50%
    background: #fff url(/static/icon/chat_icon.png) no-repeat center
    background-size: 0.55rem auto
    z-index: 1002
    &.hasNewMes:after
        content: ''
        display: block
        position: absolute
        top: 0.05rem
        left: 0.05rem
        width: 0.22rem
        height: 0.22rem
        background: #f00
        border-radius: 50%
</style>

<template>
    <div class="appwrap" id="app" :style="{ paddingBottom: $store.state.userInfo.openid ? '' : '0px'}">
        <transition name="toogle">
            <!-- <div>
                <keep-alive>
                    <router-view v-if="$route.meta.keepAlive"></router-view>
                </keep-alive>
                <router-view v-if="!$route.meta.keepAlive"></router-view>
            </div> -->
            <router-view></router-view>
        </transition>
        <vue-loginTips v-if="gotologinpanel"></vue-loginTips>
        <vue-footer v-if="footshow"></vue-footer>
        <div v-show="chatShow" @click.stop="$router.push({ name: 'chat'})" :class="{ hasNewMes: hasNewMes}" ref="floatchat" class="chatwrap"></div>
    </div>
</template>

<script>
import { messageConvert } from '@/common/js/tools'
import loginTips from '@/components/account/loginTips'
import footer from '@/components/footer/footer'
import moment from 'moment'

export default {
    name: 'app',
    data() {
        return {
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
                pentatime: '',     //每五分钟显示一次时间
            },
        }
    },
    computed: {
        gotologinpanel(){
            return this.$store.state.gotoLoginPanel
        },
        curcontactid(){
            return this.$store.state.curcontactid
        },
        singlechat(){
            return this.$store.state.singlechat
        },
        hasNewMes(){
            let num = 0
            this.$store.state.contactslist.forEach(e => { num += e.unread_num})
            return num
        },
        contactslist(){
            return this.$store.state.contactslist
        },
        chatread() {
            return this.$store.state.chatread;
        },
        loginstatus(){
            return this.$store.state.userInfo.id
        },
        currentNotif() {
            return this.$store.state.notifData;
        },
        chatShow() {
            return ( this.$route.name == 'feed' || this.$route.name == 'recommend' || this.$route.name == 'notice' || this.$route.name == 'personal' ) && this.$store.state.userInfo.openid
        },
        footshow() {
            return this.$route.name != 'chatInfo' && this.$store.state.userInfo.openid
        }
    },
    created(){
        this.$root.Bus.$on('pentaFun', value => {
            this.pentaFun(value)
        })
    },
    beforeMount() {
        if( this.loginstatus ){
            this.getcontacts()
            this.getUnreadNum()
        }
        if( this.$route.name == 'chatInfo' ){
            this.$router.push({ name: 'chat'})
        }
    },
    mounted() {
        // 获取节点
        var block = this.$refs.floatchat;
        var oW,oH;
        // 绑定touchstart事件
        block.addEventListener("touchstart", function(e) {
            var touches = e.touches[0];
            oW = touches.clientX - block.offsetLeft;
            oH = touches.clientY - block.offsetTop;
            //阻止页面的滑动默认事件
            document.addEventListener("touchmove",defaultEvent,false);
        },false)

        block.addEventListener("touchmove", function(e) {
            var touches = e.touches[0];
            var oLeft = touches.clientX - oW;
            var oTop = touches.clientY - oH;
            if(oLeft < 0) {
                oLeft = 0;
            }else if(oLeft > (document.documentElement.clientWidth - block.offsetWidth) + 30) {
                oLeft = (document.documentElement.clientWidth - block.offsetWidth) + 30;
            }
            if(oTop < 0) {
                oTop = 0;
            }else if(oTop > (document.documentElement.clientHeight - block.offsetHeight) - 55) {
                oTop = (document.documentElement.clientHeight - block.offsetHeight) - 55;
            }
            block.style.left = oLeft + "px";
            block.style.top = oTop + "px";
        },false);

        block.addEventListener("touchend",function() {
            document.removeEventListener("touchmove",defaultEvent,false);
        },false);

        function defaultEvent(e) {
            e.preventDefault();
        }
    },
    methods: {
        getcontacts(){
            this.$http.get('/chat/contacts').then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    let v = response.data.data
                    // 装填基本信息
                    v.forEach((val, index) => {
                        val.unread_num = parseInt(val.unread_num)
                        let o = JSON.parse(JSON.stringify(val));
                        val = Object.assign(val, this.initContacts, o);
                    })
                    this.$store.commit( "changeContactslist", v)
                }else{
                    console.log( response.data.errmsg )
                }
            }).catch(err => {

            })
        },
        pentaFun(id){
            this.contactslist.forEach(val => {
                if( val.uid == id ){
                    if( !val.pentatime || (moment().unix() - val.pentatime >= 300) ){
                        let obj = {
                            content: moment().format("HH:mm:ss"),
                            target: "time",
                            time: moment().format("YYYY-MM-DD HH:mm:ss")
                        }
                        this.$store.commit("changeMessage", { id: id, item: "message", list: obj, type: "push"})
                        this.$store.commit("changeMessage", { id: id, item: "pentatime", list: moment().unix()})
                    }
                }
            })
        },
        getUnreadNum() {
            this.$http.get('/notification/unreadnum').then(response => {
                if (response.data.retcode === RETCODE_OK) {
                    this.$store.commit('changeUnReadNotif', response.data.num)
                }else {
                    console.log( response.data.errmsg );
                }
            }).catch(err => {

            });
        }
    },
    watch: {
        loginstatus(v, ov){
            if( v ){
                this.getcontacts()
                this.getUnreadNum()
            }
        },
        singlechat: {   // 获取到的一条信息
            deep: true,
            handler: function(v, ov){
                // 先看在不在列表中
                let flag = false
                this.contactslist.forEach((val, index) => {
                    if( val.uid == v.from ){
                        flag = true
                        this.$store.commit("addfirstContactslist", index)
                    }
                })
                if( !flag ){    //不在列表中
                    let addobj = {
                        uid: v.from,
                        name: v.name,
                        recent_content: v.content,
                        remark: '',
                        time: moment().format("YYYY-MM-DD HH:mm:ss"),
                        unread_num: 0,
                        message: [],       //消息列表
                        isfirst: true,     //是否第一次加载
                        isend: false,      //是否没数据
                        cursay: '',        //输入内容
                        pentatime: '',     //每五分钟显示一次时间
                    }
                    this.$store.commit("addContactslist", addobj)
                }
                // end
                // 第一次发送或者接受信息、或者超过5分钟显示时间
                this.pentaFun(v.from)
                if( v.type == "text" ){
                    //不管在哪个页面都要添加消息 改变最后一条
                    let obj = {
                        content: v.content,
                        target: "in",
                        time: v.time
                    }
                    obj = messageConvert(obj)
                    this.$store.commit("changeMessage", { id: v.from, item: "message", list: obj, type: "push"})
                    this.$store.commit("changeMessage", { id: v.from, item: "recent_content", list: v.content})
                    this.$store.commit("changeMessage", { id: v.from, item: "time", list: moment().format("YYYY-MM-DD HH:mm:ss")})

                    //是否在message页面处理方法
                    if( this.$route.name == "chatInfo" ){
                        if( v.from == this.curcontactid ){
                            //当前消息
                            this.$root.Bus.$emit('scrollbottom')
                            this.$root.Bus.$emit('setread')
                        }else{
                            //不是当前消息未读数目 +1
                            this.$store.commit("changeMessage", { id: v.from, item: "unread_num", type: "addone"})
                        }
                    }else{
                        //不在message页面 消息未读数目 +1
                        this.$store.commit("changeMessage", { id: v.from, item: "unread_num", type: "addone"})
                    }
                }
            }
        },
        chatread: {   // 已读
            deep: true,
            handler: function(v, ov){
                this.$store.commit("changeMessage", { id: v.from, item: "message", type: "isread"})
            }
        },
        currentNotif: {
            deep: true,
            handler: function(newval ,oldval){
                let val = JSON.parse(JSON.stringify(newval));
                // 反馈 或 退出登录
                if (val.type == 'user_feedback' || val.type == 'steward_feedbackReply' || val.type == 'logout') {
                    return false;
                }

                if( this.$route.name != 'notice' ){
                    this.$store.commit('changeUnReadNotif', 'addone')
                }

                /* 认证审核结果通知 */
                if(val.type == 'admin_auth'){
                    /* 改变状态码 */
                    let auth_code_str = this.$store.state.userInfo.auth_code.toString();
                    /* 审核通过状态码第四位变为1,审核失败状态码第四位变为2 */
                    let _num = val.detail.result? '1': '2';
                    let auth_code_value = auth_code_str.substring(0,3) + _num + auth_code_str.substring(4);
                    this.$store.commit('changeUserInfo',{key:'auth_code',value:Number(auth_code_value)});
                }
            }
        }
    },
    components: {
        'vue-footer': footer,
        'vue-loginTips': loginTips
    }
}
</script>
