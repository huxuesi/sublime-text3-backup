<style lang="stylus">
.lawyerBizList
    .personalnav
        .personalnavlist
            color: #666
            height: 1.08rem
            line-height: 1.08rem
            padding: 0 0.18rem
            &:last-child
                border-bottom: 1px solid #e5e5e5
</style>

<template>
    <div v-infinite-scroll="getCTMList"
        infinite-scroll-disabled="isend"
        infinite-scroll-distance="30"
        infinite-scroll-immediate-check="false"
        class="lawyerBizList">
        <z_header title="客户列表" bgcolor="#3dc1ff" color="#fff" bottomcolor="#fff"></z_header>
        <div>
            <z_searchBox v-if="1" type="biz"></z_searchBox>
        </div>
        <div class="personalnav">
            <div v-for="list in CTMList" @click="$router.push({ name: 'lawyerBizListChild', params: { id: list.ctmid, name: list.ctmname}})" class="personalnavlist appsmallwrap">
                <span class="name"><i v-if="list.casestatus == 2" class="reddot"></i>{{list.ctmname}}</span>
                <i class="icon"></i>
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
import z_searchBox from '@/components/common/z-searchBox'

export default {
    name: 'lawyerBizList',
    data () {
        return {
            CTMList: [],
            loading: false,
            isend: false,
            perpage: 15
        }
    },
    computed: {

    },
    beforeMount() {
        this.getCTMList()
    },
    mounted() {

    },
    methods: {
        getCTMList() {
            if( this.loading ){
                return false
            }
            this.loading = true
            this.$http.get(`/biz/case/list`, { params: { page: this.CTMList.length / this.perpage + 1, perpage: this.perpage}}).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    let v = response.data.data
                    if( v.data ){
                        v = v.data
                    }
                    this.CTMList = this.CTMList.concat(v)
                    if( v.length < this.perpage ){
                        this.isend = true
                    }
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
        z_searchBox
    }
}
</script>
