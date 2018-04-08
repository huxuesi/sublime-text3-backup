<style lang="stylus">
.lawyerBizListChild
    .personalnav
        .personalnavlist
            color: #3dc1ff
            height: 1.08rem
            line-height: 1.08rem
            padding: 0 0 0 0.18rem
            &:last-child
                border-bottom: 1px solid #e5e5e5
</style>

<template>
    <div class="lawyerBizListChild">
        <div class="accountheadtit">{{name}}</div>
        <div class="personalnav">
            <div v-for="list in CaseList" @click="$router.push({ name: 'caseReadKH', params: { id: list.caseid}})" class="personalnavlist appsmallwrap">
                <span class="name"><i v-if="list.status == 2" class="reddot"></i>{{list.casename}}</span>
                <span class="time">{{list.updated_at | timeconvert}}</span>
            </div>
        </div>
        <div v-if="!loading && !CaseList.length" class="nodatalist">此客户还没有案件</div>
    </div>
</template>

<script>
import moment from 'moment'

export default {
    name: 'lawyerBizListChild',
    data () {
        return {
            id: '',
            name: '',
            CaseList: [],
            loading: false
        }
    },
    computed: {

    },
    beforeMount() {
        this.id = this.$route.params.id
        this.name = this.$route.params.name
        this.getCaseList()
    },
    mounted() {

    },
    methods: {
        getCaseList() {
            this.loading = true
            this.$http.get(`/biz/customer/caselist/${this.id}`, { params: { detail: 1}}).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    this.CaseList = response.data.data.data
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
        timeconvert(date) {
            return moment(date).format('YY/MM/DD');
        }
    },
    components: {

    }
}
</script>
