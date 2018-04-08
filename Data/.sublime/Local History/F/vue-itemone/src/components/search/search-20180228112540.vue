<style lang="stylus">
.searchresult
    .searchnav
        border-bottom: 1px solid #e5e5e5
        span
            font-size: 0.32rem
            color: #535353
            width: 50%
            float: left
            text-align: center
            border-right: 1px solid #e5e5e5
            box-sizing: border-box
            i
                font-style: normal
                display: inline-block
                padding: 0.3rem 0.4rem
            &.active
                color: #3dc1ff
                i
                    border-bottom: 0.04rem solid #3dc1ff
    .searchrescontent
        .searchrescontentwrap
            padding: 0.35rem 0 0
</style>

<template>
    <div class="searchresult">
        <z_header title="搜索结果"></z_header>
        <!-- <div class="searchnav clearboth">
            <span @click="postNavClick('post')" :class="{ active: curnav == 'post'}" class="postnav"><i>知 识</i></span>
            <span @click="postNavClick('user')" :class="{ active: curnav == 'user'}" class="usernav"><i>用 户</i></span>
        </div> -->
        <div class="searchrescontent">
            <div v-if="type == 'post'" class="searchrescontentwrap">
                <z_feedList :list="post.list" :isend="post.isend" :loading="post.loading" type="search" :search="false" @loadmore="postLoadMore"></z_feedList>
            </div>
            <div
                v-if="type == 'user'"
                style="padding: 0.2rem 0.27rem 0"
                class="searchrescontentwrap appsmallwrap"
                v-infinite-scroll="userLoadMore"
                infinite-scroll-disabled="user.isend"
                infinite-scroll-distance="30"
                infinite-scroll-immediate-check="false">
                <!--  @unfollow="unfollow" -->
                <lawyerList :list="user.list" :needdes="false" :needrole="true" type="search"></lawyerList>
            </div>
            <div
                v-if="type == 'biz'"
                style="padding: 0.2rem 0.27rem 0"
                class="searchrescontentwrap appsmallwrap"
                v-infinite-scroll="userLoadMore"
                infinite-scroll-disabled="biz.isend"
                infinite-scroll-distance="30"
                infinite-scroll-immediate-check="false">
                <div v-for="list in biz.list">
                    <div class="head"><span v-html="list.customer_name"></span><span v-html="list.time"></span></div>
                </div>
            </div>
            <div class="nodatalist">
                <mt-spinner v-if="user.loading" class="lodingdataicon"></mt-spinner>
                <span v-if="user.isend && !user.loading">没有更多了！</span>
            </div>
        </div>
    </div>
</template>

<script>
import z_feedList from '@/components/common/z-feedList'
import lawyerList from "@/components/common/z-lawyerList"
import z_header from '@/components/header/z-header'

export default {
    name: 'searchresult',
    data () {
        return {
            curnav: 'post',
            post: {
                list: [],
                perpage: 6,
                url: 'posts',
                isend: false,
                loading: false
            },
            user: {
                list: [],
                perpage: 6,
                url: 'user',
                isend: false,
                loading: false
            },
            biz: {
                list: [],
                perpage: 6,
                url: 'allcasescustomer',
                isend: false,
                loading: false
            },
            keyword: '',
            type: ''
        }
    },
    computed: {

    },
    beforeMount() {
        this.keyword = this.$route.query.word
        this.type = this.$route.query.type
        if( this.type == 'post' ){
            this.getData(this.post)
        }else if( this.type == "user" ){
            this.getData(this.user)
        }else if( this.type == "biz" ){
            this.getData(this.biz)
        }else{
            this.getData(this.post)
        }
    },
    mounted() {

    },
    methods: {
        getData(list) {
            list.loading = true
            this.$http.get(`/search/${list.url}/${this.keyword}`, { params: { page: list.list.length / list.perpage + 1, perpage: list.perpage}}).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    let v = response.data.data;
                    if( this.type == "biz" ){
                        v = v.data
                    }
                    list.list = list.list.concat(v);
                    if( v.length < list.perpage ){
                        list.isend = true
                    }
                }else{
                    this.$Message.error( response.data.errmsg );
                }
                list.loading = false
            }).catch(err => {
                list.loading = false
            });
        },
        postLoadMore() {
            if( !this.post.loading ){
                this.getData(this.post)
            }
        },
        userLoadMore() {
            if( !this.user.loading ){
                this.getData(this.user)
            }
        },
        postNavClick(o) {
            this.curnav = o
            this.post.isend = false
            this.user.isend = false
            this.post.list = []
            this.user.list = []
            this.getData(this[o])
        }
    },
    filters: {

    },
    components: {
        z_feedList,
        lawyerList,
        z_header
    }
}
</script>
