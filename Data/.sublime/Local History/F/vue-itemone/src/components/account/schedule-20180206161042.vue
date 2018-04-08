<style lang="stylus">
@import '../../common/stylus/mixin.styl'
.schedule
    .schedulelist
        background: #f4fbff
        .schedulehead
            height: 0.85rem
            line-height: 0.85rem
            padding: 0 0.23rem
            color: #535353
            font-size: 0.28rem
            .name
                display: inline-block
                max-width: 5rem
            .arrow
                display: inline-block
                width: 0.3rem
                height: 100%
                float: right
                background: url(/static/icon/followlist_icon.png) no-repeat center
                background-size: 0.14rem
            &.active
                .arrow
                    background: url(/static/icon/followlist_icon_.png) no-repeat center
                    background-size: 0.20rem
        .schedulebody
            border-top: 1px solid #e5e5e5
            padding: 0 0.23rem
            .memberstr
                margin-top: 5px
                .z-headimg
                    margin: 0 0.1rem 0.1rem 0.1rem
            .scheduletable
                padding: 0.31rem 0 0.3rem
                td
                    padding: 0.1rem 0
</style>

<template>
    <div v-infinite-scroll="getschedule"
        infinite-scroll-disabled="isend"
        infinite-scroll-distance="30"
        infinite-scroll-immediate-check="false"
        class="schedule">
        <z_header title="日程" bgcolor="#3dc1ff" color="#fff" bottomcolor="#fff"></z_header>
        <div v-for="list in schedulelist" class="schedulelist appsmallwrap">
            <div class="schedulehead"><span class="name singleellipsis">{{list.title}}</span> <span class="arrow"></span></div>
            <div class="schedulebody">
                <table cellpadding="0" cellspacing="0" class="scheduletable">
                    <tr>
                        <td style="white-space: nowrap; vertical-align: top">内　　容：</td>
                        <td>{{list.remark}}</td>
                    </tr>
                    <tr>
                        <td style="white-space: nowrap; vertical-align: top">起止时间：</td>
                        <td>{{list.start}}（起）<br>{{list.end}}（止）</td>
                    </tr>
                    <tr>
                        <td style="white-space: nowrap; vertical-align: top">链　　接：</td>
                        <td>{{list.url}}</td>
                    </tr>
                    <tr class="memberstr">
                        <td style="white-space: nowrap; vertical-align: top">成　　员：</td>
                        <td><z_headimg v-for="man in list.members" :id="man.id" :key="man.id"></z_headimg></td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="nodatalist">
            <mt-spinner v-if="loading" class="lodingdataicon"></mt-spinner>
            <span v-if="isend && !loading">没有更多了！</span>
        </div>
    </div>
</template>

<script>
import z_header from '@/components/header/z-header'
import z_headimg from '@/components/common/z-headimg'

export default {
    name: 'schedule',
    data () {
        return {
            id: '',
            schedulelist: [],
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
        this.getschedule()
    },
    mounted() {

    },
    methods: {
        getschedule() {
            if( this.loading ){
                return false
            }
            this.loading = true
            this.$http.get(`/schedure/lists`/*, { params: {page: this.schedulelist.length / this.perpage + 1, perpage: this.perpage}}*/).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    let v = response.data.data
                    this.schedulelist = this.schedulelist.concat(v)
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
        z_header,
        z_headimg
    }
}
</script>
