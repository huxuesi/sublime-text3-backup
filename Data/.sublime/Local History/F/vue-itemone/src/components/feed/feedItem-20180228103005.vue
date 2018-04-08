<style lang="stylus">
@import '../../common/stylus/mixin.styl'
.feeditemwrap
    height: 100%
    .mint-loadmore
        height: 100%
        overflow-x: hidden
        overflow-y: auto
</style>

<template>
    <div class="feeditemwrap">
        <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" ref="feedrefresh">
            <div slot="top" class="mint-loadmore-top">
                <span v-show="topStatus != 'loading'" :class="{ 'is-rotate': topStatus == 'drop' }">↓</span>
                <mt-spinner v-show="topStatus == 'loading'"></mt-spinner>
            </div>
            <z_feedList :list="feedlist" :isend="isend" :loading="bottomloading" @loadmore="loadMore"></z_feedList>
        </mt-loadmore>
    </div>
</template>

<script>
import z_feedList from '@/components/common/z-feedList'

export default {
    name: 'feedItem',
    data() {
        return {
            topStatus: '',
            bottomloading: false,
            isend: false,
            feedlist: [],
            addparams: {}
        }
    },
    props: {
        type: {
            type: String,
            default: 'posts'
        },
        uid: {
            type: Number,
            default: 0
        },
        mark: {
            type: Number,
            default: null
        },
        num: {
            type: Number,
            default: 8
        }
    },
    computed: {

    },
    beforeMount() {
        this.getfeed()
    },
    methods: {
        getfeed() {
            let params = {
                start: this.feedlist.length + 1,
                num: this.num,
                comments: 0,
                type: this.type,
                mark: this.mark
            }
            params = {
                params: Object.assign(params, this.addparams)
            }
            this.$http.get('/feed', params).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    let v;
                    let l;
                    if( this.type == 'bizs' ){
                        v = response.data.data.data;
                    }else{
                        v = response.data.data;
                    }
                    this.feedlist = this.feedlist.concat(v);
                    l = v.length;
                    if( l < this.num ){
                        this.isend = true
                    }
                }else{
                    console.log( response.data.errmsg )
                }
                this.$refs.feedrefresh.onTopLoaded()
                this.bottomloading = false
            }).catch(err => {
                this.bottomloading = false
            })
        },
        loadTop() {
            this.isend = false
            this.feedlist = []
            this.getfeed()
        },
        handleTopChange(status) {
            this.topStatus = status
        },
        loadMore() {
            if( !this.bottomloading ){
                this.bottomloading = true
                this.getfeed()
            }
        }
    },
    components: {
        z_feedList
    },
    watch: {

    }
}
</script>
