<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'
.lawyerlistdiv
    .lawyerlist
        padding-top: 0.35rem
        .item
            margin-bottom: 0.64rem
            .itemleft
                width: 1.81rem
                height: 1.89rem
                float: left
                position: relative
                .img
                    width: 100%
                    height: 100%
                    border-radius: 3px
                .icon
                    width: 0.32rem
                    position: absolute
                    bottom: 0.05rem
                    right: 0.05rem
            .itemright
                margin-left: 2.01rem
                color: #909090
                .name
                    font-size: 0.28rem
                    a
                        color: #555
                .des
                    margin: 0.16rem 0 0.2rem
                    font-size: 0.22rem
                    ellipsis(2, 0.308rem)
                    word-break: break-all
                    img
                        width: 0.35rem
                        margin-right: 0.04rem
                        position: relative
                        top: 0.03rem
</style>

<template>
    <div class="lawyerlistdiv">
        <ul class="lawyerlist">
            <li v-for="(n, index) in userlist" class="item clearboth">
                <div @click="$router.push({ name: 'personal', params: { id: n.fid }})" class="itemleft">
                    <img class="img" :src="$avatarT(n.fid)">
                    <img v-if="n.isVip" class="icon" src="/static/icon/vip.png">
                </div>
                <div class="itemright">
                    <p class="name"><a @click="$router.push({ name: 'personal', params: { id: n.fid }})" href="javascript:;">{{n.name}}<small v-if="needrole">&nbsp;&nbsp;{{$authCodeT(n.vip).isLawyer ? $authCodeT(n.vip).role : n.job}}</small></a></p>
                    <p v-if="needdes" class="des">{{n.profile || ''}}</p>
                    <p v-else class="des"><img v-if="$authCodeT(n.vip).isLawyer" src="/static/icon/followtag_icon.png">{{$authCodeT(n.vip).isLawyer ? n.speciality || '未填写专业' : '' }}</p>
                    <div v-if="n.fid != $store.state.userInfo.id">
                        <!-- 需要发布按钮 -->
                        <div v-if="needsend" class="followbtnwrap">
                            <a v-if="n.follow == 1" @click="$router.push({ name: 'sendBiz'})" class="followbtn" href="javascript:;">发布 &gt;</a>
                            <a v-else @click="follow(n)" class="followbtn" href="javascript:;">关 注</a>
                            <a @click="addcontacts(n)" class="chatbtn" href="javascript:;">咨 询</a>
                        </div>
                        <!-- 不需要发布按钮 -->
                        <div v-else class="followbtnwrap">
                            <div v-if="$authCodeT($store.state.userInfo.auth_code).isLawyer">
                                <a v-if="n.follow == 1 && n.fid != HONSEN_id" @click="unfollow(userlist, index)" class="nofollowbtn" href="javascript:;">取消关注</a>
                                <a v-if="n.follow != 1 && n.fid != HONSEN_id" @click="follow(n)" class="followbtn" href="javascript:;">关 注</a>
                                <a @click="addcontacts(n)" class="chatbtn" href="javascript:;">私 信</a>
                            </div>
                            <div v-else>
                                <a v-if="n.follow == 1 && n.fid != HONSEN_id" @click="unfollow(userlist, index)" class="nofollowbtn" href="javascript:;">取消关注</a>
                                <a v-if="n.follow != 1 && n.fid != HONSEN_id" @click="follow(n)" class="followbtn" href="javascript:;">关 注</a>
                                <a v-if="$authCodeT(n.vip).isLawyer" @click="addcontacts(n)" class="chatbtn" href="javascript:;">咨 询</a>
                                <a v-else @click="addcontacts(n)" class="chatbtn" href="javascript:;">私 信</a>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
import moment from 'moment'

export default {
    name: 'lawyerlistdiv',
    data () {
        return {
            apiurl,
            HONSEN_id
        }
    },
    props: {
        type: {
            type: String
        },
        needdes: {
            type: Boolean,
            default: true
        },
        needsend: {
            type: Boolean,
            default: false
        },
        needrole: {
            type: Boolean,
            default: false
        },
        list: {
            type: Array,
            default: function(){
                return []
            }
        }
    },
    computed: {
        contactslist(){
            return this.$store.state.contactslist
        },
        userlist() {
            if( this.type == 'search' ){
                this.list.forEach(e => {
                    e.fid = e.user_id
                    e.name = e.user_name
                    e.speciality = typeof e.speciality == 'string' ? e.speciality : e.speciality.join(',')
                })
            }
            return this.list
        }
    },
    mounted() {

    },
    methods: {
        unfollow(val, index){
            this.$http.post(`/user/unfollow/${val[index].fid}`).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    Toast('已取消关注')
                    val[index].follow = 0
                    this.$emit("unfollow", val, index)
                }else{
                    Toast( response.data.errmsg )
                }
            }).catch(err => {})
        },
        follow(val){
            this.$http.post(`/user/follow/${val.fid}`).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    Toast('关注成功')
                    val.follow = 1
                }else{
                    Toast( response.data.errmsg )
                }
            }).catch(err => {})
        },
        addcontacts(n){
            // 先看在不在列表中
            let flag = false
            this.contactslist.forEach(val => {
                if( val.uid == n.fid ){
                    flag = true
                }
            })
            if( !flag ){    //不在列表中
                let addobj = {
                    uid: n.fid,
                    name: n.name,
                    recent_content: '',
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
            this.$store.commit("changeCurcontactid", n.fid)
            this.$router.push({name: "chatInfo", params: { id: n.fid}})
        }
    }
}
</script>
