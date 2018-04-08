<style lang="stylus">
.z-lawyersList
    margin: 0 0 31px
    .lhead
        float: left
        width: 98px
        height: 98px
        .userimg
            width: 100%
            height: 100%
            border-radius: 3px
            display: block
    .rinfo
        margin: 0 0 0 118px
        .usertop
            .name
                font-weight: bold
                color: #585858
                display: inline-block
                max-width: 100px
                float: left
            .attest
                border-radius: 3px
                font-size: 12px
                color: #585858
                margin: 0 0 0 8px
                img
                    width: 17px
                    height: 17px
                    margin: 0 0 0 8px
                    vertical-align: sub
        .followstate
            button
                height: 24px
                line-height: normal
                padding: 0 14px
                float: right
        .usermiddle
            margin: 3px 0 0
            i
                color: #3dc1ff
                margin: 0 8px 0 0
                vertical-align: middle
            .taglist
                color: #585858
                font-size: 12px
        .userbottom
            font-size: 12px
            color: #585858
            margin: 7px 0 0
            height: 36px
.z-lawyersListsmall
    margin-top: 21px
    .leftheadimg
        float: left
        width: 46px
        height: 46px
        margin-right: 13px
        .userimg
            width: 100%
            height: 100%
            display: block
            border-radius: 3px
    .rightinfo
        float: left
        width: 80px
        .usertop
            line-height: 1.2
            a
                color: #494949
                font-size: 14px
        .userbottom
            margin-top: 1px
            button
                height: 24px
                padding: 0 10px
</style>

<template>
    <li v-if="mode == 'small'" class="clearfix z-lawyersListsmall">
        <div class="leftheadimg">
            <a @click="$router.push({ name: 'personalCenter', params: { id: list.id}})" href="javascript:;"><img class="userimg" :src="$avatarHash(list.id)"></a>
        </div>
        <div class="rightinfo">
            <p class="usertop single_ellipsis">
                <a @click="$router.push({ name: 'personalCenter', params: { id: list.id}})" :title="list.name" href="javascript:;" class="name">{{list.name}}</a>
            </p>
            <p class="userbottom">
                <span v-if="$store.state.mineInfo && list.id != $store.state.mineInfo.id" class="followstate">
                    <Button v-if="list.follow" @click="follow(list, 'unfollow', 0)" shape="circle" class="nofollow gray_btn" type="info">取消关注</Button>
                    <Button v-else @click="follow(list, 'follow', 1)" shape="circle" class="isfollow" type="ghost">关注+</Button>
                </span>
            </p>
        </div>
    </li>
    <li v-else class="clearfix z-lawyersList">
        <div class="lhead">
            <a @click="$router.push({ name: 'personalCenter', params: { id: list.id}})" href="javascript:;"><img class="userimg" :src="$avatarHash(list.id)"></a>
        </div>
        <div class="rinfo">
            <p class="usertop">
                <a @click="$router.push({ name: 'personalCenter', params: { id: list.id}})" :title="list.name" href="javascript:;" class="name single_ellipsis">{{list.name}}</a>
                <span class="attest">{{$authCodeT(list.vip).isLawyer ? $authCodeT(list.vip).role : list.job}}<img v-if="list.isVip" src="/static/icon/vip.png"></span>
                <span v-if="mode != 'loginpage' && $store.state.mineInfo && list.id != $store.state.mineInfo.id" class="followstate">
                    <Button v-if="list.follow" @click="follow(list, 'unfollow', 0)" shape="circle" class="nofollow gray_btn" type="info">取消关注</Button>
                    <Button v-else @click="follow(list, 'follow', 1)" shape="circle" class="isfollow" type="ghost">关注+</Button>
                </span>
            </p>
            <p class="usermiddle" v-if="$authCodeT(list.vip).isLawyer">
                <Icon type="pricetag"></Icon><span class="taglist">{{list.speciality || '未填写'}}</span>
            </p>
            <p class="userbottom ellipsis2">{{list.profile || ' '}}</p>
        </div>
    </li>
</template>

<script>
export default {
    name: 'z-lawyersList',
    data () {
        return {
            imgUrl
        }
    },
    props: {
        list: {
            type: Object,
            default: function () {
                return {
                    follow: 0,
                    id: 0,
                    name: "",
                    profile: "",
                    speciality: [],
                    vip: 0
                }
            }
        },
        mode: {
            type: String
        }
    },
    computed: {

    },
    beforeMount() {

    },
    mounted() {

    },
    methods: {
        follow(v, t, n) {
            this.$http.post(`/user/${t}/${v.id}`).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    v.follow = n;
                    if( t == 'unfollow' ){
                        this.$Message.success( '已取消关注！' );
                    }
                    if( t == 'follow' ){
                        this.$Message.success( '关注成功！' );
                    }
                }else{
                    this.$Message.error( response.data.errmsg );
                }
            });
        },
    },
    components: {

    }
}
</script>
