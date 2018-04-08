<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'
.personalwrap
    background: #efeff4
    height: 100%
    overflow-y: auto
    .personalhead
        padding: 0.33rem 0 0.6rem
        height: 5.39rem
        background: url(/static/img/personal_img_bg.png) no-repeat
        background-size: 100%
        color: #fff
        box-sizing: border-box
        .headimg
            width: 1.63rem
            height: 1.63rem
            margin: 0 auto
            position: relative
            .img
                width: 100%
                height: 100%
                border-radius: 50%
                border: 2px solid #fff
                box-sizing: border-box
            .icon
                position: absolute
                bottom: 0
                right: 0.02rem
        .content
            text-align: center
            font-size: 0.24rem
            p
                margin: 0.17rem 0
                text-shadow: 0 2px 6px #656e7d
            .name
                font-size: 0.32rem
            .company
                font-size: 0.28rem
            .des
                margin-top: 0.2rem
                text-align: center
            .followbtnwrap
                margin-top: 0.2rem
            .iphoneaddress
                margin-top: 0.3rem
                span:first-child
                    margin-left: 0
                img
                    vertical-align: middle
                .iphone
                    img
                        width: 0.35rem
                .address
                    margin-left: 0.6rem
                    img
                        width: 0.3rem
    .wodezhishi, .lvshifengcai
        background: #fff
        .personalnav
            border-bottom: 1px solid #e5e5e5
    .loginoutbtn
        height: 1rem
        line-height: 1rem
        width: 100%
        margin: 1.2rem 0
        background: #fff
        color: #3dc1ff
        font-size: 0.28rem
    .lawyernavitem
        display: inline-block
        margin: 0 0.6rem 0 0
        padding: 0 0.05rem
        &.active
            height: 1.2rem
            color: #3dc1ff
            border-bottom: 0.03rem solid #3dc1ff
</style>

<template>
    <div class="personalwrap">
        <div class="personalhead">
            <div v-if="userinfo.id" style="padding: 0 0.3rem">
                <p class="topedit"><span v-if="isme" @click="$router.push({ name: 'accountSet'})" class="editicon"></span></p>
                <div class="headimg">
                    <img class="img" :src="$avatarT(userinfo.id)">
                    <img v-if="userinfo.isVip" class="icon" src="/static/icon/vip.png">
                </div>
                <div class="content">
                    <p class="name">{{userinfo.name}}
                        <small v-if="$authCodeT(userinfo.vip).isLawyer || userinfo.job">　{{$authCodeT(userinfo.vip).isLawyer ? $authCodeT(userinfo.vip).role : userinfo.job}}</small>
                    </p>
                    <p v-if="$authCodeT(userinfo.vip).isLawyer" class="company">{{userinfo.company || '未填写公司名'}}</p>
                    <!-- <p v-if="$authCodeT(userinfo.vip).isLawyer" class="speciality">{{userinfo.speciality || '未填写专业领域'}}</p> -->
                    <p v-if="userinfo.profile" @click="popupVisible = true" class="des singleellipsis">{{userinfo.profile}}</p>
                    <p v-if="!isme && $store.state.userInfo.openid" class="followbtnwrap">
                        <a v-if="(userinfo.fofa == 1 || userinfo.fofa == 3) && userinfo.id != HONSEN_id" @click="unfollow(userinfo.id)" class="nofollowbtn" href="javascript:;">取消关注</a>
                        <a v-if="userinfo.fofa != 1 && userinfo.fofa != 3 && userinfo.id != HONSEN_id" @click="follow(userinfo.id)" class="followbtn" href="javascript:;">关注+</a>
                        <a v-if="!$authCodeT($store.state.userInfo.auth_code).isLawyer && $authCodeT(userinfo.vip).isLawyer" @click="addcontacts(userinfo)" class="chatbtn" href="javascript:;">咨询</a>
                        <a v-else @click="addcontacts(userinfo)" class="chatbtn" href="javascript:;">私信</a>
                    </p>
                    <p class="iphoneaddress">
                        <span v-if="userinfo.phone" class="iphone"><img src="/static/icon/iphone_icon.png">&nbsp;&nbsp;{{userinfo.phone || '未填写手机号'}}</span>
                        <span v-if="userinfo.haveaddress && $authCodeT(userinfo.vip).isLawyer" class="address"><img src="/static/icon/address_icon.png">&nbsp;&nbsp;{{ userinfo.province + ' ' + (userinfo.city == userinfo.province ? '': (userinfo.city + ' ')) + userinfo.area}}</span>
                    </p>
                </div>
            </div>
        </div>
        <!-- <div class="personalnav">
            <div v-if="list.auth.includes(pagetype)" v-for="list in nav" @click="goToNav(list)" class="personalnavlist appsmallwrap">
                <span class="name">{{list.name}}</span>
                <i class="icon"></i>
            </div>
        </div> -->
        <div v-if="pagetype == 4" class="wodezhishi">
            <div class="personalnav">
                <div class="personalnavlist appsmallwrap" style="border-bottom: 0; overflow-x: auto; white-space: nowrap;">
                    <a class="lawyernavitem active" href="javascript:;">公开知识</a>
                </div>
            </div>
            <z_feedList :list="feedlist" :isend="feedend" :loading="feedloading" @loadmore="feedLoadMore" :search="false"></z_feedList>
        </div>
        <div v-if="pagetype == 6" class="wodezhishi">
            <div class="personalnav">
                <div class="personalnavlist appsmallwrap" style="border-bottom: 0; overflow-x: auto; white-space: nowrap;">
                    <a v-if="lawyerDisplayItem.open_post" @click="lawyerVisNav = 'open_post'" :class="{ active: lawyerVisNav == 'open_post'}" class="lawyernavitem" href="javascript:;">公开知识</a>
                    <a v-if="lawyerDisplayItem.common_question" @click="lawyerVisNav = 'common_question'" :class="{ active: lawyerVisNav == 'common_question'}" class="lawyernavitem" href="javascript:;">常见问题</a>
                    <a v-if="lawyerDisplayItem.clientele_evaluate" @click="lawyerVisNav = 'clientele_evaluate'" :class="{ active: lawyerVisNav == 'clientele_evaluate'}" class="lawyernavitem" href="javascript:;">客户评价</a>
                </div>
            </div>
            <div v-if="lawyerVisNav == 'open_post'">
                <z_feedList :list="feedlist" :isend="feedend" :loading="feedloading" @loadmore="feedLoadMore" :search="false"></z_feedList>
            </div>
            <div v-if="lawyerVisNav == 'common_question'">
                <div class="appsmallwrap" style="margin-top: 0.35rem; margin-bottom: 0.45rem;">
                    <button @click="addcontacts(userinfo)" class="commenthidebtn"><img src="/static/icon/pencil_icon.png">我要咨询</button>
                </div>
                <problem :uid="userinfo.id"></problem>
            </div>
            <div v-if="lawyerVisNav == 'clientele_evaluate'">
                <cusComment :uid="userinfo.id"></cusComment>
            </div>
        </div>
        <div v-if="pagetype == 7" class="wodezhishi">
            <div class="personalnav">
                <div class="personalnavlist appsmallwrap" style="border-bottom: 0; overflow-x: auto; white-space: nowrap;">
                    <a class="lawyernavitem active" href="javascript:;">精品知识</a>
                </div>
            </div>
            <z_feedList :list="feedlist" :isend="feedend" :loading="feedloading" @loadmore="HQpostsLoadMore" :search="false"></z_feedList>
        </div>
        <div v-if="pagetype == 1 || pagetype == 3" class="v2personalnav">
            <div class="v2personalnavgroup">
                <div @click="$router.push({ name: 'personalbizNav'})" class="v2personalnavitem">
                    <div class="v2personalnavitemcontent">
                        <span class="v2personalnavitemtit"><img src="/static/icon/personal_biz_icon.png">业务</span>
                        <span class="iconright"><i></i></span>
                    </div>
                </div>
                <div @click="$router.push({ name: 'personalpostNav'})" class="v2personalnavitem">
                    <div class="v2personalnavitemcontent">
                        <span class="v2personalnavitemtit"><img src="/static/icon/personal_know_icon.png">知识</span>
                        <span class="iconright"><i></i></span>
                    </div>
                </div>
                <div @click="$router.push({ name: 'toolnav'})" class="v2personalnavitem">
                    <div class="v2personalnavitemcontent">
                        <span class="v2personalnavitemtit"><img src="/static/icon/personal_tool_icon.png">工具</span>
                        <span class="iconright"><i></i></span>
                    </div>
                </div>
                <div v-if="$authCodeT($store.state.userInfo.auth_code).isLawyer && lawyerDisplayItem.common_question" @click="$router.push({ name: 'problem', params: { id: userinfo.id}})" class="v2personalnavitem">
                    <div class="v2personalnavitemcontent">
                        <span class="v2personalnavitemtit"><img src="/static/icon/common_question_icon.png">常见问题</span>
                        <span class="iconright"><i></i></span>
                    </div>
                </div>
                <div v-if="$authCodeT($store.state.userInfo.auth_code).isLawyer && lawyerDisplayItem.clientele_evaluate" @click="$router.push({ name: 'cusComment', params: { id: userinfo.id}})" class="v2personalnavitem">
                    <div class="v2personalnavitemcontent">
                        <span class="v2personalnavitemtit"><img src="/static/icon/cuscomment_icon.png">客户评价</span>
                        <span class="iconright"><i></i></span>
                    </div>
                </div>
            </div>
            <div class="v2personalnavitem">
                <div @click="$router.push({ name: 'personalsetNav'})" class="v2personalnavitemcontent">
                    <span class="v2personalnavitemtit"><img src="/static/icon/personal_set_icon.png">个人设置</span>
                    <span class="iconright"><i></i></span>
                </div>
            </div>
        </div>
        <mt-popup v-model="popupVisible" popup-transition="popup-fade">
            <div class="popuptitle">个人简介：</div>
            <p class="filesitem clearboth">
                {{userinfo.profile}}
            </p>
        </mt-popup>
    </div>
</template>

<script>
import { Toast, MessageBox } from 'mint-ui'
import moment from 'moment'
import z_feedList from '@/components/common/z-feedList'
import problem from '@/components/account/problem'
import cusComment from '@/components/account/cusComment'

export default {
    name: 'personalwrap',
    components: { z_feedList, problem, cusComment},
    data () {
        return {
            apiurl,
            HONSEN_id,
            isme: false,
            userinfo: {},
            pagetype: '',   // 1普通 2高级 3律师 4普通外访 5高级外访 6律师外访 7弘商管家外访
            nav: [
                { name: '发布业务', type: 'sendbiz', auth: [1,2], url: 'sendBiz'},
                { name: '业务请求', type: 'bizreq', auth: [3], url: 'personalNavWrap'},
                { name: '我的业务', type: 'mybiz', auth: [1,2], url: 'myBiz'},
                { name: '我的业务', type: 'lsmybiz', auth: [3], url: 'lawyerBizList'},
                { name: '公开知识', type: 'mypost', auth: [1,2,3], url: 'personalNavWrap'},
                { name: '授权知识', type: 'authpost', auth: [1,2,3], url: 'personalNavWrap'},
                // { name: '小工具', type: 'tools', auth: [1,2,3]},
            ],
            feedlist: [],
            feedend: false,
            feedloading: false,
            popupVisible: false,
            lawyerDisplayItem: {
                open_post: 0,
                common_question: 0,
                clientele_evaluate: 0,
            },
            lawyerVisNav: ''
        }
    },
    computed: {
        contactslist(){
            return this.$store.state.contactslist
        }
    },
    beforeMount() {
        this.init()
    },
    methods: {
        init(){
            let id = this.$route.params.id;
            if( id == "me" || id == this.$store.state.userInfo.id ){
                this.isme = true
                id = this.$store.state.userInfo.id
                if( !id ){
                    this.$store.commit('changeGotoLogin', true)
                }
            }
            this.getUserDetail(id)
        },
        getUserDetail(id) {
            this.$http.get(`/userinfo/detail/${id}`).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    let v = response.data.data;
                    v.province = v.province === null ? '' : v.province;
                    v.city = v.city === null ? '' : v.city;
                    v.area = v.area === null ? '' : v.area;
                    v.haveaddress = v.province + v.city + v.area;
                    v.speciality = v.speciality ? v.speciality.map(e => e.name).join('　') : '';
                    this.userinfo = v;
                    // 判断需要显示的页面
                    if( this.$authCodeT(v.vip).isLawyer ){
                        this.getModuleInfo(v.id);
                        this.pagetype = this.isme ? 3 : 6
                    }else{
                        this.pagetype = this.isme ? 1 : 4
                    }
                    // 弘商管家
                    if( v.id == HONSEN_id ){
                        this.pagetype = 7
                        this.getHQposts()
                    }

                    if( this.pagetype == 4 || this.pagetype == 6 ) {
                        this.getFeed()
                    }
                }else{
                    Toast( response.data.errmsg )
                    this.$router.go(-1)
                }
            }).catch(err => {

            })
        },
        unfollow(id){
            this.$http.post(`/user/unfollow/${id}`).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    this.userinfo.fofa = 0
                    Toast('已取消关注')
                }else{
                    Toast( response.data.errmsg )
                }
            }).catch(err => {})
        },
        follow(id){
            this.$http.post(`/user/follow/${id}`).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    this.userinfo.fofa = 1
                    Toast('关注成功')
                }else{
                    Toast( response.data.errmsg )
                }
            }).catch(err => {})
        },
        loginout(){
            MessageBox.confirm('确定退出吗?').then(action => {
                if( action == 'confirm' ){
                    this.$http.post('/logout').then(response => {
                        if( response.data.retcode == RETCODE_OK ){
                            Toast('退出成功')
                            this.$store.commit('clearalldata')
                            this.$router.push({ name: 'login'})
                            if( window.socket ){
                                window.socket.close()
                            }
                        }else{
                            Toast( response.data.errmsg )
                        }
                    }).catch(err => {

                    })
                }
            });
        },
        changecurnav(str){
            this.curnav = str
        },
        addcontacts(){
            // 先看在不在列表中
            let flag = false
            this.contactslist.forEach(val => {
                if( val.uid == this.userinfo.id ){
                    flag = true
                }
            })
            if( !flag ){    //不在列表中
                let addobj = {
                    uid: this.userinfo.id,
                    name: this.userinfo.name,
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
            this.$store.commit("changeCurcontactid", this.userinfo.id)
            this.$router.push({name: "chatInfo", params: { id: this.userinfo.id}})
        },
        goToNav(list) {
            if( list.type == "tools" ){
                Toast('小工具暂未开放！')
                return false
            }
            if( list.url ){
                this.$router.push({ name: list.url, query: { uid: this.userinfo.id, type: list.type}})
            }
        },
        getFeed() {
            let params = {
                start: this.feedlist.length + 1,
                num: 6,
                comments: 0,
                type: 'posts',
                mark: 0,
                uid: this.userinfo.id
            }
            params = {
                params: params
            }
            this.feedloading = true
            this.$http.get('/feed', params).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    let v = response.data.data
                    this.feedlist = this.feedlist.concat(v)
                    if( v.length < 6 ){
                        this.feedend = true
                    }
                }else{
                    console.log( response.data.errmsg )
                }
                this.feedloading = false
            }).catch(err => {
                this.feedloading = false
            })
        },
        feedLoadMore() {
            if( !this.feedloading ){
                this.getFeed()
            }
        },
        getHQposts() {
            let params = {
                page: this.feedlist.length / 6 + 1,
                perpage: 6,
            }
            params = {
                params: params
            }
            this.feedloading = true
            this.$http.get('/post/highqualityposts', params).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    let v = response.data.data.data
                    v.forEach(e => {
                        e.id = e.userid
                        e.name = e.userName
                        e.updated_at = e.time
                    })
                    this.feedlist = this.feedlist.concat(v)
                    if( v.length < 6 ){
                        this.feedend = true
                    }
                }else{
                    console.log( response.data.errmsg )
                }
                this.feedloading = false
            }).catch(err => {
                this.feedloading = false
            })
        },
        HQpostsLoadMore() {
            if( !this.feedloading ){
                this.getHQposts()
            }
        },
        gotoBind() {
            MessageBox.confirm('绑定成功后将清空当前微信账号在弘商平台的所有数据，请谨慎操作！').then(action => {
                if( action == 'confirm' ){
                    this.$router.push({ name: 'bindAccount', query: { type: 'two'}})
                }
            });
        },
        getModuleInfo(id) {
            this.$http.get('/user/homepage/moduledetails', { params: { uid: id}}).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    let obj = response.data.data[0]
                    if( obj.open_post ){
                        this.lawyerVisNav = 'open_post';
                    }else if( obj.common_question ){
                        this.lawyerVisNav = 'common_question';
                    }else{
                        this.lawyerVisNav = 'clientele_evaluate';
                    }
                    this.lawyerDisplayItem = Object.assign({}, this.lawyerDisplayItem, obj)
                }else{
                    console.log( response.data.errmsg )
                }
            }).catch(err => {})
        }
    },
    watch: {
        /*'$route'(to, from) {
            this.init()
        }*/
    }
}
</script>
