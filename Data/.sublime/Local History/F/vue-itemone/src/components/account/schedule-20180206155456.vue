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
                <table cellpadding="0" cellspacing="0">
                    <tr>
                        <td>内容：</td>
                        <td>每个星期的工作看进程汇报和下周具 体的工作安排,激励我们的员工更积极 努力的工作。</td>
                    </tr>
                    <tr>
                        <td>内容：</td>
                        <td>每个星期的工作看进程汇报和下周具 体的工作安排,激励我们的员工更积极 努力的工作。</td>
                    </tr>
                    <tr>
                        <td>内容：</td>
                        <td>每个星期的工作看进程汇报和下周具 体的工作安排,激励我们的员工更积极 努力的工作。</td>
                    </tr>
                    <tr>
                        <td>内容：</td>
                        <td>每个星期的工作看进程汇报和下周具 体的工作安排,激励我们的员工更积极 努力的工作。</td>
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
        z_header
    }
}
</script>
