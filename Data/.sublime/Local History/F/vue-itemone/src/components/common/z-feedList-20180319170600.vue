<style lang="stylus">
@import '../../common/stylus/mixin.styl'
.z-feedList
    .item
        display: block
        padding: 0.27rem 0
        border-bottom: 1px solid #e5e5e5
        .name
            font-size: 0.27rem
            .date
                margin-left: 0.29rem
        &.itemone
            .head
                .headinfo
                    margin-left: 0.89rem
                    .name
                        font-size: 0.28rem
                        color: #444
                    .time
                        font-size: 0.24rem
                        color: #bbb
                        margin-top: 0.03rem
                .singleheadinfo
                    margin-left: 0.96rem
                    line-height: 0.75rem
                    .name
                        font-size: 0.3rem
                        color: #444
                        display: inline-block
                        vertical-align: middle
                        width: 2.7rem
                    .time
                        font-size: 0.24rem
                        color: #bbb
                        display: inline-block
                        float: right
            .headbottom
                padding: 0.24rem 0 0
                .title
                    font-size: 0.3rem
                    color: #666666
                    margin: 0 0 0.24rem
                .describe2
                    ellipsis(2, 0.364rem)
                    word-break: break-all
                &.haveimg
                    .desimg
                        width: 2.8rem
                        height: 1.76rem
                        overflow: hidden
                        float: left
                        background-size: cover, 100%
                        background-position: center
                        background-repeat: no-repeat
                    .desinfo
                        margin-left: 3rem
                        .title
                            padding: 0.09rem 0 0
                            margin: 0 0 0.15rem
                        .describe3
                            ellipsis(3, 0.364rem)
                            word-break: break-all
            .headbottoma
                display: block
    em
        font-style: normal
        color: #f00
</style>

<template>
    <div v-infinite-scroll="loadMore"
        infinite-scroll-disabled="isend"
        infinite-scroll-distance="30"
        infinite-scroll-immediate-check="false"
        class="z-feedList">
        <z_searchBox v-if="search" type="post"></z_searchBox>
        <div v-if="type != 'bizreq'" class="appsmallwrap">
            <div v-for="list in feedlist" class="item itemone clearboth">
                <div v-if="!list.nohead" @click="$router.push({name: 'personal', params: { id: list.id }})" class="head clearboth">
                    <z_headimg :id="list.id" :vip="!!list.isVip"></z_headimg>
                    <div class="headinfo">
                        <p class="name">{{list.name}}</p>
                        <p class="time">{{list.updated_at}}</p>
                    </div>
                </div>
                <div v-if="!isIOS" @click="$router.push({name: 'knowDetails', params: { id: list.pid }})" :class="{ haveimg: list.thumb}" class="headbottom">
                    <div v-if="list.thumb" class="desimg" :style="{'backgroundImage': `url('${list.thumb.substr(0,4) == 'http'?list.thumb: imgUrl + list.thumb}'`}">
                        <img :src="`${list.thumb.substr(0,4) == 'http'?list.thumb: imgUrl + list.thumb}`" style="max-width: 100%">
                    </div>
                    <div class="desinfo">
                        <div class="title singleellipsis" v-html="list.title"></div>
                        <div :class="{ describe3: list.thumb, describe2: !list.thumb}" v-html="trimspace(list.summary)"></div>
                    </div>
                </div>
                <a v-else :href="'/feed/knowDetails/' + list.pid" :class="{ haveimg: list.thumb}" class="headbottom headbottoma">
                    <div v-if="list.thumb" class="desimg" :style="{'backgroundImage': `url('${list.thumb.substr(0,4) == 'http'?list.thumb: imgUrl + list.thumb}'`}">
                        <img :src="`${list.thumb.substr(0,4) == 'http'?list.thumb: imgUrl + list.thumb}`" style="max-width: 100%">
                    </div>
                    <div class="desinfo">
                        <div class="title singleellipsis" v-html="list.title"></div>
                        <div :class="{ describe3: list.thumb, describe2: !list.thumb}" v-html="trimspace(list.summary)"></div>
                    </div>
                </a>
            </div>
        </div>
        <div v-else class="appsmallwrap">
            <div v-for="list in feedlist" class="item itemone clearboth">
                <div v-if="!list.nohead" @click="$router.push({name: 'personal', params: { id: list.promulgator }})" class="head clearboth">
                    <z_headimg :id="list.promulgator" :dot="!list.unread" :vip="!!list.isVip"></z_headimg>
                    <div class="singleheadinfo">
                        <p class="name singleellipsis">{{list.promulgatorName}}</p>
                        <p class="time">{{list.created_at}}</p>
                    </div>
                </div>
                <div @click="$router.push({name: 'bizreqDetails', params: { id: list.caseid, name: list.promulgatorName }})" class="headbottom">
                    <div class="desinfo">
                        <div class="title singleellipsis">{{list.name}}</div>
                        <div class="describe2">{{list.content}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="nodatalist">
            <mt-spinner v-if="loading" class="lodingdataicon"></mt-spinner>
            <span v-if="isend && !loading">没有更多了！</span>
        </div>
    </div>
</template>

<script>
import z_searchBox from '@/components/common/z-searchBox'
import z_headimg from '@/components/common/z-headimg'
export default {
    name: 'z-feedList',
    data () {
        return {
            apiurl,
            isIOS: false,
        }
    },
    props: {
        list: {
            type: Array
        },
        isend: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: 'feed'
        },
        search: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        feedlist() {
            if( this.type == 'search' ){
                this.list.forEach(e => {
                    e.id = e.creator_id
                    e.name = e.creator_name
                    e.updated_at = e.update_time
                    e.pid = e.post_id
                    e.title = e.post_title
                    e.summary = e.description
                })
            }
            return this.list
        }
    },
    beforeMount() {
        var u = navigator.userAgent
        if( !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ){
            // ios
            this.isIOS = true
        }
    },
    mounted() {

    },
    methods: {
        loadMore() {
            this.$emit('loadmore')
        },
        trimspace(v) {
            v = v.replace(/<img(.*?)>/gi, '').replace(/<table(.*?)>[^]*<\/table>/gi, '').replace(/<a[^>]+?class=["']?ueditor_file["']?[^>]*>([^<]+)<\/a>/gi, '').replace(/^<p>(&nbsp;|\s)*/i, '<p>').replace(/^(<p>(&nbsp;|\s)*(<br\/?>)*<\/p>)+/i, '');
            return v;
        }
    },
    filters: {

    },
    components: {
        z_searchBox,
        z_headimg
    }
}
</script>
