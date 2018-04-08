<style lang="stylus">
.z-searchBox
    line-height: normal
    position: absolute
    top: 50%
    margin-top: -15.5px
    width: 100%
    .ivu-input-wrapper
        .ivu-input,.ivu-input-icon
            height: 31px
            line-height: 31px
        .ivu-input
            font-size: 12px
            border-radius: 17px
            border-color: #d2d2d2
            background: #fff
            padding-right: 32px
            padding-left: 19px
            &:hover,&:focus
                border-color: #64cdff
        .ivu-input-icon
            font-size: 0
            color: transparent
            width: 47px
            cursor: pointer
            background: url('/static/icon/header_search_icon.png') center no-repeat
    .searchfloatpanel
        position: absolute
        top: 44px
        width: 394px
        font-size: 12px
        .title
            height: 36px
            line-height: 36px
            color: #90a8b7
            font-size: 14px
            border-bottom: 1px solid #90a8b7
            margin: 0 20px
            padding: 0 0 0 14px
            a
                float: right
                font-size: 12px
                color: #8899b9
        .postsul, .usersul
            min-height: 50px
            position: relative
        .postsul
            margin: 12px 0 3px
            li
                padding: 0 30px 0 34px
                height: 32px
                line-height: 32px
                cursor: pointer
                &:hover
                    background: #f0f7fb
                .postname
                    color: #454545
                    display: inline-block
                    width: 182px
                .username,.time
                    display: inline-block
                    color: #92a8b5
                    width: 62px
                    vertical-align: top
                .username
                    text-align: right
                    margin: 0 8px
                .time
                    width: 58px
        .usersul
            margin: 15px 0 15px
            li
                padding: 0 0 0 34px
                margin: 0 0 18px
                .head
                    width: 44px
                    height: 44px
                    float: left
                    img
                        width: 100%
                        height: 100%
                        border-radius: 3px
                .des
                    margin: 0 0 0 60px
                    .name
                        padding: 2px 0 0
                        a
                            color: #454545
                    .zhiye
                        margin: 7px 0 0
                        .icon
                            width: 15px
                            vertical-align: top
                            margin: 0 0 0 6px
        .allresult
            font-size: 14px
            color: #787878
            height: 42px
            line-height: 42px
            text-align: center
            background: #f5f8f9
            cursor: pointer
            &:hover
                color: #3dc1ff
    .searchboxwrap1
        text-align: right
    .searchboxwrap1icon
        display: inline-block
        font-size: 0
        color: transparent
        width: 33px
        height: 33px
        cursor: pointer
        background: url('/static/icon/header_search_icon.png') center no-repeat
    em
        font-style: normal
        color: #f00
</style>

<template>
    <div class="z-searchBox" v-clickoutside="closePanel">
        <div v-if="!startsearchstate" class="searchboxwrap1">
            <span @click="changesearchstate" class="searchboxwrap1icon"></span>
        </div>
        <div v-else class="searchboxwrap2">
            <Input v-model.trim="keyword" @on-enter="goToSearch(false)" @on-click="goToSearch(false)" @on-change="wordChange" @on-focus="openPanel" icon="android-search" :placeholder="placeholder" ref="searchinput"></Input>
            <div v-if="searchPanel && searchPanelState" class="searchfloatpanel floatpanel">
                <div class="title">知识 <a @click="goToSearch('post')" href="javascript:;">更多知识&gt;</a></div>
                <ul class="postsul">
                    <li v-for="list in posts.list" @click="searchPanel = false, $router.push({ name: 'postRead', params: { read_pid: list.post_id}})">
                        <a class="postname single_ellipsis" href="javascript:;" v-html="list.post_title"></a>
                        <span class="username single_ellipsis">{{list.creator_name}}</span>
                        <span class="time">{{list.update_time | timeconvert}}</span>
                    </li>
                    <div v-if="!posts.list.length && !posts.isloading" class="nodatalist">无搜索结果</div>
                    <Spin size="large" fix v-if="posts.isloading">
                        <Icon type="load-c" class="spin-icon-load"></Icon>
                        <div>加载中...</div>
                    </Spin>
                </ul>
                <div class="title">用户 <a @click="goToSearch('user')" href="javascript:;">更多用户&gt;</a></div>
                <ul class="usersul">
                    <li v-for="list in users.list" class="clearfix">
                        <div class="head"><a @click="searchPanel = false, $router.push({ name: 'personalCenter', params: { id: list.user_id}})" href="javascript:;"><img :src="$avatarHash(list.user_id)"></a></div>
                        <div class="des">
                            <p class="name"><a @click="searchPanel = false, $router.push({ name: 'personalCenter', params: { id: list.user_id}})" href="javascript:;">{{list.user_name}}</a></p>
                            <p class="zhiye">{{$authCodeT(list.vip).role}}<img v-if="list.isVip" class="icon" src="/static/icon/vip.png"></p>
                        </div>
                    </li>
                    <div v-if="!users.list.length && !users.isloading" class="nodatalist">无搜索结果</div>
                    <Spin size="large" fix v-if="posts.isloading">
                        <Icon type="load-c" class="spin-icon-load"></Icon>
                        <div>加载中...</div>
                    </Spin>
                </ul>
                <div @click="goToSearch(false)" class="allresult">查看全部搜索结果</div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import clickoutside from '@/common/directives/clickOutSide';

var timer = 0
export default {
    name: 'z-searchBox',
    data () {
        return {
            imgUrl,
            searchPanel: false,
            keyword: '',
            posts: {
                list: [],
                perpage: 3,
                isloading: false
            },
            users: {
                list: [],
                perpage: 2,
                isloading: false
            }
        }
    },
    props: {
        placeholder: {
            type: String,
            default: '输入关键词搜索'
        },
        presearch: {
            type: Boolean,
            default: true
        },
        searchtype: {
            type: String
        },
        startsearchstate: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        searchPanelState() {
            let s;
            if( this.keyword != '' ){
                s = true;
            }else{
                s = false;
            }
            return s;
        }
    },
    beforeMount() {

    },
    mounted() {

    },
    methods: {
        goToSearch(type) {
            if( this.searchtype ){
                type = this.searchtype;
            }
            if( this.keyword == '' ){
                return false;
            }
            let query = { keyword: this.keyword};
            if( type ){
                query.type = type;
            }
            this.$router.push({ name: 'search', query: query});
            this.searchPanel = false;
        },
        wordChange() {
            if( !this.presearch ){
                return false;
            }
            if( this.keyword == '' ){
                return false;
            }
            this.searchPanel = true;
            this.posts.list = [];
            this.users.list = [];
            this.posts.isloading = true;
            this.users.isloading = true;
            window.clearTimeout(timer);
            timer = setTimeout(() => {
                this.getData('posts', this.posts);
                this.getData('user', this.users);
            }, 500);
        },
        openPanel() {
            if( !this.presearch ){
                return false;
            }
            this.searchPanel = true;
        },
        closePanel() {
            this.searchPanel = false;
        },
        getData(type, obj) {
            this.$http.get(`/search/${type}/${this.keyword}`, { params: { page: obj.list.length / obj.perpage + 1, perpage: obj.perpage}}).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    obj.list = response.data.data;
                }else{
                    this.$Message.error( response.data.errmsg );
                }
                obj.isloading = false;
            }).catch(err => {
                obj.isloading = false;
            });
        },
        changesearchstate() {
            this.$emit('update:startsearchstate', true);
            this.$nextTick(() => {
                this.$refs.searchinput.focus();
            });
        }
    },
    filters: {
        timeconvert(date) {
            return moment(date).format('YY/MM/DD');
        }
    },
    directives: {
        clickoutside
    },
    components: {

    }
}
</script>
