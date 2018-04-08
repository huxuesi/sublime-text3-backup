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
    .searchbizwrap
        border-bottom: 1px solid #ebebeb
        padding: 0.15rem
        .frspan
            float: right
        .item
            margin: 0.15rem
        .case
            .casename
                display: inline-block
                max-width: 5rem
        .head
            .name
                display: inline-block
                max-width: 3.6rem
                font-weight: bold
                color: #333
        em
            color: #f00
            font-style: normal
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
                class="searchrescontentwrap"
                v-infinite-scroll="bizLoadMore"
                infinite-scroll-disabled="biz.isend"
                infinite-scroll-distance="30"
                infinite-scroll-immediate-check="false">
                <div @click="gotocase(list.case_id)" v-for="list in biz.list" class="searchbizwrap">
                    <div class="item head"><span v-html="list.customer_name" class="name singleellipsis"></span><span class="frspan">{{list.time}}</span></div>
                    <div class="item user">客户归属：{{list.user_name}}</div>
                    <div v-if="list.case_id" class="item case"><span v-html="'案件名称：' + list.case_name" class="casename singleellipsis"></span><span class="frspan">{{list.case_status == 2 ? '未处理' : list.case_status == 1 ? '已结案' : '处理中'}}</span></div>
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
import { Toast } from 'mint-ui'

export default {
    name: 'searchresult',
    data () {
        return {
            curnav: 'post',
            post: {
                list: [],
                perpage: 12,
                url: 'posts',
                isend: false,
                loading: false
            },
            user: {
                list: [],
                perpage: 12,
                url: 'user',
                isend: false,
                loading: false
            },
            biz: {
                list: [],
                perpage: 12,
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
        bizLoadMore() {
            if( !this.biz.loading ){
                this.getData(this.biz)
            }
        },
        postNavClick(o) {
            this.curnav = o
            this.post.isend = false
            this.user.isend = false
            this.post.list = []
            this.user.list = []
            this.getData(this[o])
        },
        gotocase(id) {
            if( id ) {
                this.$router.push({ name: 'caseReadKH', params: { id: id}})
            }else{
                Toast( '此客户没有案件！' );
            }
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
