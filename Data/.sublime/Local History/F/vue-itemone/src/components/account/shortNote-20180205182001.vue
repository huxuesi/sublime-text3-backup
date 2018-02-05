<style lang="stylus">
@import '../../common/stylus/mixin.styl'
.shortnote
    .shortnotelist
        padding: 0.3rem 0
        border-bottom: 1px solid #efefef
        .shortnotetop
            .tit
                font-size: 0.3rem
                color: #666
                display: inline-block
                max-width: 3.7rem
            .time
                float: right
                font-size: 0.24rem
                color: #bbb
                line-height: 0.45rem
        .shortnotebot
            margin-top: 0.1rem
            ellipsis(2, 0.364rem)
            word-break: break-all
</style>

<template>
    <div v-infinite-scroll="getproblem"
        infinite-scroll-disabled="isend"
        infinite-scroll-distance="30"
        infinite-scroll-immediate-check="false"
        class="shortnote">
        <z_header title="便签" bgcolor="#3dc1ff" color="#fff" bottomcolor="#fff"></z_header>
        <div @click="$store.commit('setCurShortNoteInfo', list), $router.push({ name: 'shortNoteInfo'})" v-for="list in shortnotelist" class="shortnotelist appsmallwrap">
            <p class="shortnotetop clearboth"><span class="tit singleellipsis">{{list.title}}</span><span class="time">{{list.updated_at}}</span></p>
            <p class="shortnotebot">{{list.content}}</p>
        </div>
        <div class="nodatalist">
            <mt-spinner v-if="loading" class="lodingdataicon"></mt-spinner>
            <span v-if="isend && !loading">没有更多了！</span>
        </div>
    </div>
</template>

<script>
import z_header from '@/components/header/z-header'

export default {
    name: 'shortnote',
    data () {
        return {
            id: '',
            shortnotelist: [],
            loading: false,
            isend: false,
            perpage: 10
        }
    },
    props: {
        uid: {
            type: Number
        }
    },
    computed: {

    },
    beforeMount() {
        if( this.uid ){
            this.id = this.uid
        }else{
            this.id = this.$route.params.id
        }
        this.getproblem()
    },
    mounted() {

    },
    methods: {
        getproblem() {
            if( this.loading ){
                return false
            }
            this.loading = true
            this.$http.get(`/shortnote`/*, { params: {page: this.shortnotelist.length / this.perpage + 1, perpage: this.perpage}}*/).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    let v = response.data.data
                    this.shortnotelist = this.shortnotelist.concat(v)
                    // if( v.length < this.perpage ){
                        this.isend = true
                    // }
                }else{
                    console.log( response.data.errmsg )
                }
                this.loading = false
            }).catch(err => {
                this.loading = false
            })
        }
    },
    filters: {

    },
    components: {
        z_header
    }
}
</script>
