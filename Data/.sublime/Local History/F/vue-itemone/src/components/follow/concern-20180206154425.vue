<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'
.concernwrap
    .concerntopbg
        background: #efeff4
        padding-bottom: 0.3rem
    .lawyerlistwraptwo
        padding: 0.2rem 0.17rem 0
        .lawyeritem
            .head
                color: #333
                height: 1.2rem
                line-height: 1.2rem
                border-bottom: 1px solid #e5e5e5
                font-size: 0.3rem
                .tit
                    float: left
                    max-width: 4.5rem
                    margin-right: 0.3rem
                .num
                    font-size: 0.24rem
                    color: #999
                .icon
                    display: inline-block
                    width: 0.88rem
                    height: 100%
                    float: right
                    background: url(/static/icon/followlist_icon.png) no-repeat center
                    background-size: 0.14rem
                &.active
                    border-bottom: none
                    .icon
                        background: url(/static/icon/followlist_icon_.png) no-repeat center
                        background-size: 0.20rem
            .listwrap
                padding: 0 0.22rem 1px
</style>

<template>
    <div class="concernwrap">
        <div class="concerntopbg"></div>
        <!-- <z_searchBox type="user"></z_searchBox> -->
        <div class="lawyerlistwraptwo">
            <div v-for="list in classify" class="lawyeritem appsmallwrap">
                <div @click="changehide(list)" :class="{ active: list.hide}" class="head">
                    <span class="tit singleellipsis">{{list.name}}</span>
                    <span class="num">( {{list.isfirstclick ? list.num : list.manlist.length}} )</span>
                    <span class="icon"></span>
                </div>
                <div v-if="list.hide && list.manlist.length" class="listwrap">
                    <lawyerList :list="list.manlist" @unfollow="unfollow"></lawyerList>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import lawyerList from "@/components/common/z-lawyerList"
import z_searchBox from '@/components/common/z-searchBox'

export default {
    name: 'concernwrap',
    data () {
        return {
            nologin: false,
            classify: [],
            searchword: '',
            searchstate: false,
            searchlist: [],
            searchpage: 1,
            searchperpage: 6,
            searchloading: false,
            searchisend: false
        }
    },
    beforeMount() {
        if( this.$store.state.userInfo.id ){
            this.getclassify()
        }else{
            this.nologin = true
        }
    },
    mounted() {

    },
    methods: {
        getclassify(){
            this.$http.get('/user/followclassify').then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    this.classify = response.data.data
                    this.classify.forEach((val, index) => {
                        this.$set(val, 'manlist', [])
                        this.$set(val, 'isfirstclick', true)
                        this.$set(val, 'hide', false)
                        if( !index ){
                            this.$set(val, 'hide', true)
                        }
                        this.getuser(val)
                    })
                }else{
                    console.log( response.data.errmsg )
                }
            }).catch(err => {
                console.log(err)
            })
        },
        changehide(list){
            if( list.hide ){
                this.$set(list, 'hide', false)
            }else{
                this.$set(list, 'hide', true)
            }
            /*if( list.isfirstclick ){
                this.getuser(list)
            }*/
        },
        getuser(val){
            val.tid = val.tid || ''
            this.$http.get(`/user/usersinfollowclassify/${val.tid}`, { params: { page: 1, perpage: null}}).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    this.$set(val, 'manlist', response.data.data)
                    this.$set(val, 'isfirstclick', false)
                    val.manlist.forEach((val, index) => {
                        val.follow = 1
                        if( val.speciality ){
                            let arr = []
                            val.speciality.forEach(val => {
                                arr.push(val.name)
                            })
                            val.speciality = arr.join("、")
                        }
                    })
                }else{
                    console.log( response.data.errmsg )
                }
            }).catch(err => {
                console.log(err)
            })
        },
        unfollow(val, index){
            this.$delete(val, index)
        },
        /*search(ismore, val){
            if( this.nologin ){ //没登录去登录
                this.$store.commit('changeGotoLogin', true)
                return false
            }
            this.searchword = val || this.searchword
            if( this.searchword == '' ){
                return false
            }
            if( ismore ){
                if( this.searchisend ){
                    return false
                }
                this.searchpage++
            }else{
                this.searchlist = []
                this.searchisend = false
                this.searchpage = 1
            }
            this.searchloading = true
            let numlength = 0
            this.$http.get(`/search/myfollowusers/${this.searchword}`, { params: { page: this.searchpage, perpage: this.searchperpage}}).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    numlength = response.data.data.length
                    if( response.data.data.length > 0 ){
                        if( ismore ){
                            for( let n in response.data.data ){
                                this.searchlist.push(response.data.data[n])
                            }
                        }else{
                            this.searchlist = response.data.data
                        }
                    }
                    this.searchstate = true
                }else{
                    console.log( response.data.errmsg )
                }
                this.searchisend = numlength < this.searchperpage ? true : false
                this.searchloading = false
            }).catch(err => {
                console.log(err)
            })
        },*/
        loadingfn(){
            this.search(true)
        }
    },
    watch: {
        /*searchword(v, o){
            if( this.searchword == '' ){
                this.searchstate = false
            }
        }*/
    },
    components:{
        lawyerList,
        z_searchBox
    }
}
</script>
