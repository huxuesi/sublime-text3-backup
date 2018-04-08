<style lang="stylus">
@import '../../common/stylus/mixin.styl'
.shortnote
    //
</style>

<template>
    <div v-infinite-scroll="getschedule"
        infinite-scroll-disabled="isend"
        infinite-scroll-distance="30"
        infinite-scroll-immediate-check="false"
        class="schedule">
        <z_header title="日程" bgcolor="#3dc1ff" color="#fff" bottomcolor="#fff"></z_header>
        <div v-for="list in schedulelist" class="schedulelist appsmallwrap">
            1
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
        // this.getschedule()
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
