<style lang="stylus">
.myBizwrap
    .myBizcontent
        margin-top: 0.55rem
        border-top: 1px solid #e5e5e5
        border-bottom: 1px solid #e5e5e5
        .myBizcontentlist
            .mybiztitle
                font-size: 0.32rem
                color: #444
                border-bottom: 1px solid #e5e5e5
                height: 1rem
                line-height: 1rem
                .tit
                    display: inline-block
                    width: 6.18rem
                .icon
                    float: right
                    display: inline-block
                    width: 0.22rem
                    height: 100%
                    background: url(/static/icon/followlist_icon_.png) no-repeat center
                    background-size: 100% auto
    .mybizcaselist
        padding: 0.18rem 0.1rem
        background: #f4fbff
        margin: 0.4rem 0
        li
            line-height: 0.7rem
            font-size: 0.28rem
        .mybizcaselistname
            display: inline-block
            width: 3.58rem
            float: left
            i
                width: 0.11rem
                height: 0.11rem
                display: inline-block
                background: #22ac38
                border-radius: 50%
                margin: 0 0.1rem
                position: relative
                top: -0.04rem
                &.red
                    background: #e60012
        .mybizcaseliststate
            display: inline-block
            width: 1.56rem
            float: left
        .mybizcaselisttime
            display: inline-block
            float: left
            font-size: 0.26rem
    .mybizpersonal
        margin: 0.37rem auto
        .itemleft
            width: 1.5rem
            height: 1.6rem
            position: relative
            float: left
            .img
                width: 100%
                height: 100%
            .icon
                position: absolute
                right: 0.04rem
                bottom: 0.02rem
                width: 0.32rem
                height: 0.32rem
        .itemright
            margin-left: 1.78rem
            .name
                font-size: 0.3rem
                color: #535353
            .company
                font-size: 0.28rem
                color: #666
                margin: 0.2rem 0
            .des
                font-size: 0.24rem
                color: #999
                img
                    width: 0.34rem
                    margin: 0 0.06rem 0 0
                    vertical-align: middle
</style>

<template>
    <div class="myBizwrap">
        <z_header title="我的业务"></z_header>
        <div class="myBizcontent">
            <div v-for="list in allCaseList.firm" v-if="allCaseList.firm.length" class="myBizcontentlist appmiddlewrap">
                <div class="mybiztitle"><span class="tit singleellipsis">{{list.customerName}}</span> <span class="icon"></span></div>
                <div class="mybizpersonal appsmallwrap clearboth">
                    <div @click="$router.push({ name: 'personal', params: { id: list.lawyer.id }})" class="itemleft">
                        <img class="img" :src="`${apiurl}/uploads/avatar/${list.lawyer.id}.jpg`">
                        <img v-if="$authCodeT(list.lawyer.vip).isV" class="icon" src="/static/icon/vip.png">
                    </div>
                    <div class="itemright">
                        <p class="name"><a @click="$router.push({ name: 'personal', params: { id: list.lawyer.id }})" href="javascript:;">{{list.lawyer.name}}</a></p>
                        <p class="company singleellipsis">{{list.lawyer.company}}</p>
                        <p class="des"><img src="/static/icon/followtag_icon.png">{{list.lawyer.speciality.join('、') || '未填写专业'}}</p>
                    </div>
                </div>
                <div class="mybizcaselist">
                    <ul>
                        <li v-for="(li, index) in list.cases.data" @click="$router.push({ name: 'caseReadKH', params: { id: li.caseid}})" class="clearboth">
                            <span class="mybizcaselistname singleellipsis"><i :class="{ red: li.status == 2}"></i>{{li.casename}}</span>
                            <span v-if="li.status == 0" class="mybizcaseliststate singleellipsis">处理中</span>
                            <span v-if="li.status == 1" class="mybizcaseliststate singleellipsis">已结案</span>
                            <span v-if="li.status == 2" class="mybizcaseliststate singleellipsis">未处理</span>
                            <span class="mybizcaselisttime">{{li.time | timeconvert}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div v-if='allCaseList.person' class="myBizcontentlist appmiddlewrap">
                <div v-if="allCaseList.person.data.length">
                    <div class="mybiztitle"><span class="tit singleellipsis">私人业务</span> <span class="icon"></span></div>
                    <div class="mybizcaselist">
                        <ul>
                            <li v-for="(list, index) in allCaseList.person.data" @click="goToCaseInfo(list)" class="clearboth"><span class="mybizcaselistname singleellipsis"><i :class="{ red: !list.lawyer}"></i>{{list.casename}}</span><span class="mybizcaseliststate singleellipsis">{{list.lawyer || '请求中'}}</span><span class="mybizcaselisttime">{{list.time | timeconvert}}</span></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="nodatalist">
                <mt-spinner v-if="loading" class="lodingdataicon"></mt-spinner>
                <span v-if="!loading && !allCaseList.firm.length && !allCaseList.person.data.length">还没有发布业务！</span>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import z_header from '@/components/header/z-header'

export default {
    name: 'myBizwrap',
    data () {
        return {
            apiurl,
            allCaseList: {},
            loading: false
        }
    },
    computed: {

    },
    beforeMount() {
        this.getAllCaseList()
    },
    methods: {
        getAllCaseList() {
            this.loading = true
            this.$http.get('biz/case/mycaselist'/*, { params: { page: 1, perpage: 6}}*/).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    this.allCaseList = response.data.data;
                }else{
                    console.log( response.data.errmsg );
                }
                this.loading = false
            }).catch(err => {
                this.loading = false
            });
        },
        goToCaseInfo(list) {
            if( list.lawyer ){
                this.$router.push({ name: 'caseReadKH', params: { id: list.caseid}});
            }else{
                this.$router.push({ name: 'selectLawyer', params: { id: list.caseid}});
            }
        },
    },
    watch: {

    },
    filters: {
        timeconvert(date) {
            return moment(date).format('YY-MM-DD');
        }
    },
    components: {
        z_header
    }
}
</script>
