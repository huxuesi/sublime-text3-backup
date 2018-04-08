<style lang="stylus" scoped>
topheight = 1.14rem
bottomheight = 0.96rem
.messagewrap
    position: absolute
    top: 0
    left: 0
    bottom: 0
    right: 0
    overflow: hidden
    background: #efeff4
    .listwrap
        position: absolute
        top: topheight
        left: 0
        bottom: bottomheight
        right: 0
        overflow-y: scroll
        .mint-loadmore
            min-height: 100%
        .tips
            color: #bbb
            margin: 0.2rem 0 0.25rem 0
            text-align: center
        .listul
            .messagetime
                text-align: center
            .mes
                margin: 0 0 0.55rem
                .messagep
                    position: relative
                    display: inline-block
                    padding: 0.19rem 0.26rem
                    max-width: 4.3rem
                    border-radius: 3px
                    word-break: break-all
                    word-wrap: break-word
                    color: #333
                    box-shadow: 0 1px 15px #d8d8d8
                    &:after
                        content: ''
                        width: 0.17rem
                        height: 0.17rem
                        display: inline-block
                        position: absolute
                        top: 0.05rem
                        -webkit-transform: rotate(45deg)
                        transform: rotate(45deg)
                    .messageimg
                        max-width: 100%
                        max-height: 2.7rem
                        display: block
                        cursor: pointer
                    .otherfilewrap
                        height: 0.52rem
                        line-height: 0.52rem
                        .imgicon
                            float: left
                            width: 0.52rem
                            height: 0.52rem
                        .otherfilename
                            color: #4c8ba9
                            display: block
                            margin: 0 0.65rem
                        .downotherfile
                            color: #4c8ba9
                            float: right
                            &:hover
                                text-decoration: underline
                .isread, .noread
                    vertical-align: bottom
                    line-height: normal
                .isread
                    color: #999
                .noread
                    color: #3dc1ff
                .meshead
                    float: none
                    display: inline-block
                    vertical-align: top
            .messagemyself
                float: right
                .messagep
                    background: #d5f1ff
                    margin-right: 0.26rem
                    &:after
                        right: -0.06rem
                        background: #d5f1ff
                .isread, .noread
                    margin-right: 4px
            .messagefrom
                .messagep
                    background: #fff
                    margin-left: 0.26rem
                    &:after
                        background: #fff
                        left: -0.06rem
                .isread, .noread
                    margin-left: 4px
    .messubmitwrap
        position: absolute
        left: 0
        bottom: 0
        right: 0
        height: bottomheight
        box-sizing: border-box
        background: #fff
        box-shadow: 0 -1px 15px #d8d8d8
        .fileupicon
            width: 1rem
            float: left
            height: bottomheight
            line-height: bottomheight
            text-align: center
            img
                width: 0.45rem
                vertical-align: middle
        .submitbtn
            float: right
            width: 1.3rem
            margin: 0.13rem 0.13rem 0 0
        .submitipt
            margin: 0.13rem 1.65rem 0 1.1rem
            .messageipt
                width: 100%
                height: 0.7rem
                padding: 0 0.24rem
                border-radius: 3px
                border: 1px solid #b4c6d1
                box-sizing: border-box
.list-enter-active
  transition: all .3s
.list-enter
  opacity: 0
  transform: translateX(20px)
</style>

<template>
    <div v-if="curcontact" class="messagewrap">
        <z_header :title="curcontact.name">
            <span slot="back">&lt; 返回</span>
        </z_header>
        <div class="listwrap" ref="messwrap">
            <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" ref="messagerefresh">
                <div slot="top" class="mint-loadmore-top">
                    <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
                    <mt-spinner v-show="topStatus === 'loading'"></mt-spinner>
                </div>
                <p v-show="nodata" class="tips">没有更早的历史消息了</p>
                <ul class="listul appmiddlewrap">
                    <transition-group name="list" tag="div">
                        <li v-for="list in curcontact.message" :key="list.time" class="mes clearboth">
                            <!-- 对话 -->
                            <div v-if="list.target == 'out' || list.target == 'in'" :class="{ messagemyself: list.target == 'out', messagefrom: list.target == 'in'}">
                                <!-- 对方头像 -->
                                <z_headimg v-if="list.target == 'in'" class="meshead" :id="curcontact.uid" :gotopersonal="false"></z_headimg>
                                <!-- 对方是否读了消息 -->
                                <span v-if="list.target == 'out' && list.is_readed" class="isread">已读</span>
                                <span v-if="list.target == 'out' && !list.is_readed" class="noread">未读</span>
                                <!-- 信息内容共用 -->
                                <div class="messagep">
                                    <!-- 正常的消息 -->
                                    <div v-if="!list.filetype" v-html="list.content"></div>
                                    <!-- 文件 -->
                                    <div v-else>
                                        <!-- 图片 -->
                                        <div v-if="list.filetype == 'img'" v-viewer="{ 'navbar': false, 'toolbar': false, 'rotatable': false, 'scalable': false, 'keyboard': true}">
                                            <img :title="list.filename" :src="`${apiurl}/file/preview/${list.filesrc}/img`" :height="list.imgheight" :width="list.imgwidth" class="messageimg">
                                        </div>
                                        <!-- 其他文件 -->
                                        <div v-else class="otherfilewrap">
                                            <img :src="`/static/img/${list.filetype}.png`" class="imgicon">
                                            <a target="_blank" :href="`${apiurl}/file/download/${list.filesrc}`" class="downotherfile">下载</a>
                                            <a target="_blank" :href="`${apiurl}/file/download/${list.filesrc}`" class="otherfilename singleellipsis">{{list.filename}}</a>
                                        </div>
                                    </div>
                                </div>
                                <!-- 我的头像 -->
                                <z_headimg v-if="list.target == 'out'" class="meshead" :id="$store.state.userInfo.id" :gotopersonal="false"></z_headimg>
                            </div>
                            <!-- 显示时间 -->
                            <div v-if="list.target == 'time'" class="messagetime">
                                {{list.content}}
                            </div>
                        </li>
                    </transition-group>
                </ul>
            </mt-loadmore>
        </div>
        <div class="messubmitwrap clearboth">
            <div class="fileupicon">
                <uploadfile
                    :about_id="curcontactid"
                    about_type="chats"
                    flag="chatupfile"
                    @complete="successfn"
                    @error="errorfn">
                    <img src="/static/icon/chatInfo_icon1.png">
                </uploadfile>
            </div>
            <div class="submitbtn">
                <button @click="submitmes(false)" class="commonbtnclass">发送</button>
            </div>
            <div class="submitipt">
                <input @keyup.enter="submitmes(false)" v-model.trim="cursay" class="messageipt" ref="textarea" type="text">
            </div>
        </div>
    </div>
</template>

<script>
import { messageConvert } from '@/common/js/tools'
import moment from 'moment'
import { Toast } from 'mint-ui'
import uploadfile from "@/components/fileup/uploadfile"
import z_header from '@/components/header/z-header'
import z_headimg from '@/components/common/z-headimg'

export default {
    name: 'message',
    data() {
        return {
            apiurl,
            topStatus: '',
            nodata: false,
            take: 10,
            cursay: ''
        }
    },
    computed: {
        contactslist(){
            return this.$store.state.contactslist
        },
        curcontactid(){
            return this.$store.state.curcontactid
        },
        curcontact(){
            return this.contactslist.find(val => val.uid == this.curcontactid)
        },
        singlechat(){
            return this.$store.state.singlechat
        }
    },
    beforeMount() {
        if( this.curcontact && this.curcontact.message.length <= 0 ){
            this.getmessage()
        }
    },
    mounted() {
        this.setread()
        if( this.curcontact && this.curcontact.message.length > 0 ){
            this.scrollToBottom()
        }
    },
    created(){
        this.$root.Bus.$on('scrollbottom', value => {
            this.scrollToBottom()
        })
        this.$root.Bus.$on('setread', value => {
            this.setread()
        })
    },
    methods: {
        getmessage(ismore){
            let uid = this.curcontact.uid
            let skip = this.getMessageLength()
            this.$http.get('/chat/records', { params: { id: uid, skip: skip, take: this.take}}).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    let datalist = response.data.data.reverse()
                    if( datalist.length ){
                        // 先进行信息替换
                        datalist.forEach(e => {
                            e = messageConvert(e);
                        });
                        // 开头添加时间
                        let obj = {
                            content: this.timeconvert( datalist[0].time ),
                            target: "time",
                            time: this.timeconvert( datalist[0].time )
                        }
                        datalist.unshift(obj)
                        if( ismore ){
                            this.$store.commit("changeMessage", { id: uid, item: "message", list: datalist, type: "loadmore"})
                        }else{
                            this.$store.commit("changeMessage", { id: uid, item: "message", list: datalist})
                        }
                    }
                    if( datalist.length < this.take ){
                        this.nodata = true
                    }
                }else{
                    console.log( response.data.errmsg )
                }
                this.$refs.messagerefresh.onTopLoaded()
                if( !ismore ){
                    this.scrollToBottom()
                }
            }).catch(err => {
                console.log(err)
            })
        },
        submitmes(isupload, message){
            let uid = this.curcontact.uid;
            let say = this.cursay;
            if( isupload ){
                uid = message.touid;
                say = message.content;
            }

            if( say == '' ){
                return false;
            }
            // 插入数据
            let inmessage = { content: say, is_readed: 0, target: 'out', time: moment().format("YYYY-MM-DD HH:mm:ss")};
            if( isupload ){
                inmessage = Object.assign(inmessage, message);
            }else{
                // 普通信息需要转一次
                inmessage = messageConvert(inmessage);
            }

            // 第一次发送或者接受信息、或者超过5分钟显示时间
            this.$root.Bus.$emit('pentaFun', uid)
            this.$store.commit("changeMessage", { id: uid, item: "message", list: inmessage, type: "push"})
            this.$store.commit("changeMessage", { id: uid, item: "recent_content", list: say})
            this.$store.commit("changeMessage", { id: uid, item: "time", list: moment().format("YYYY-MM-DD HH:mm:ss")})

            // 获取焦点，滚动到底部，清空输入框
            this.$refs.textarea.focus();
            this.scrollToBottom();
            if( !isupload ){
                this.cursay = ''
            }
            // 开始请求
            this.$http.post('/chat/add', { to: uid, content: say}).then(response => {
                if( response.data.retcode == RETCODE_OK ){

                }else{
                    Toast( response.data.errmsg )
                    this.$store.commit("changeMessage", { id: uid, item: "message", list: []})
                    this.$router.push({ name: 'chat'})
                }
            }).catch(err => {})
        },
        // 获取当前实际的聊天信息长度
        getMessageLength() {
            return this.curcontact.message.filter(e => { return (e.target == 'out' || e.target == 'in')}).length;
        },
        loadTop() {
            this.getmessage(true)
        },
        handleTopChange(status) {
            this.topStatus = status
        },
        // 发消息或来消息滚动到底部
        scrollToBottom() {
            this.$nextTick(() => {
                this.$refs.messwrap.scrollTop = this.$refs.messwrap.scrollHeight
            })
        },
        timeconvert(val){
            if( moment().isSame(val, 'day') ){
                return moment(val).format('HH:mm:ss')
            }else{
                return moment(val).format('MM-DD HH:mm')
            }
        },
        successfn(obj, flag){
            let mes = messageConvert(obj, "encode")
            this.submitmes(true, mes)
        },
        errorfn(obj, flag){
            Toast('上传失败！')
        },
        setread(){
            this.$http.post('/chat/setread', { id: this.curcontact.uid}).then(response => {
                if( response.data.retcode == RETCODE_OK ){

                }else{
                    Toast( response.data.errmsg )
                }
            }).catch(err => {

            })
        }
    },
    components: {
        uploadfile,
        z_header,
        z_headimg
    },
    watch: {

    },
    beforeDestroy() {
        this.$store.commit( "changeCurcontactid", 0)
        this.$root.Bus.$off('scrollbottom')
    }
}
</script>
