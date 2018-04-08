<style lang="stylus">
.caseReadKHwrap
    .caseReadKHinfohead
        padding: 0.28rem 0 0.48rem
        border-bottom: 1px solid #e5e5e5
        .makelawyer, .resquesttime
            font-size: 0.3rem
            color: #535353
            margin-top: 0.2rem


@import '../../common/stylus/mixin.styl'
.flowkeepcommonwrap
    padding: 0.55rem 0 0 0.29rem
    .flowkeeplist
        padding: 0 0 0.5rem 0.59rem
        border-left: 1px solid #3dc1ff
        position: relative
        .beforenum
            position: absolute
            top: -0.15rem
            left: -0.295rem
            display: block
            width: 0.59rem
            height: 0.59rem
            line-height: 0.59rem
            background: #3dc1ff
            border-radius: 50%
            font-size: 0.28rem
            text-align: center
            color: #fff
        .flowkeeplistcontent
            background: #f4fbff
            position: relative
            padding: 0.2rem 0
            &:before
                content: ''
                display: block
                position: absolute
                top: 0
                left: -0.2rem
                leftarrow( 0.2rem, #f4fbff)
            .flowkeeplistcenter
                padding: 0 0.17rem
            .title
                font-size: 0.3rem
                color: #535353
                margin: 0 0 0.15rem
                .casename
                    display: inline-block
                    width: 3.6rem
                .time
                    float: right
                    font-size: 0.24rem
                    color: #999
                    margin-top: 0.05rem
            .article
                font-size: 0.28rem
                color: #666
                padding-bottom: 0.2rem
                word-break: break-all
                word-wrap: break-word
            .flowkeeplistbottom
                padding: 0.18rem 0.17rem 0
                border-top: 1px solid #e5e5e5
</style>

<template>
    <div class="caseReadKHwrap" v-if="caseInfo.caseid">
        <div class="accountheadtit">{{caseInfo.casename}}</div>
        <div class="appsmallwrap">
            <div v-if="caseInfo.belong" class="caseReadKHinfohead">
                <p class="makelawyer">办理律师：{{caseInfo.belong.name}}</p>
                <p class="resquesttime">请求时间：{{caseInfo.time}}</p>
                <p class="resquesttime">处理状态：{{caseInfo.status ? '已结案': '处理中'}}</p>
            </div>
            <div v-else class="caseReadKHinfohead">
                <p class="makelawyer">办理律师：{{$store.state.userInfo.name}}</p>
                <p class="resquesttime">请求时间：{{caseInfo.time}}</p>
                <p class="resquesttime">处理状态：{{caseInfo.status ? '已结案': '处理中'}}</p>
            </div>
            <div style="border-bottom: 1px solid #e5e5e5">
                <commissioned v-if="caseInfo.caseid" :ispersonal="!caseInfo.ispersonal && !$authCodeT($store.state.userInfo.auth_code).isLawyer" :caseid="caseInfo.caseid" @getflows="getflows"></commissioned>
            </div>
            <div v-if="!$authCodeT($store.state.userInfo.auth_code).isLawyer" class="flowkeepcommonwrap">
                <div v-for="list in allkeeps" class="flowkeeplist">
                    <span class="beforenum">{{list.index}}</span>
                    <div class="flowkeeplistcontent">
                        <div class="flowkeeplistcenter">
                            <p class="title"><span class="casename singleellipsis">{{list.flowname}} > 案件进展</span><span class="time">{{list.updated_at | timeconvert}}</span></p>
                            <div class="article" v-html="list.content || '未填写跟进记录内容'"></div>
                            <p v-for="li in list.filesjson" class="fileblockwrap clearboth">
                                <span class="filetypeicon"><img src="/static/icon/filetype_icon.png"></span>
                                <!-- <span @click="delfilesjson(index)" class="delicon"><img src="/static/icon/delete_icon.png"></span> -->
                                <a class="singleellipsis" :href="`${apiurl}/file/download/${li.hash}`" target="_blank">{{li.name}}</a>
                            </p>
                        </div>
                        <div class="flowkeeplistbottom">
                            <button @click="list.showcomment = !list.showcomment" class="commenthidebtn"><img src="/static/icon/pencil_icon.png">评论</button>
                            <bizcomment v-if="list.showcomment" type="keep" :id="list.casekid" :nomargin="true"></bizcomment>
                        </div>
                    </div>
                </div>
                <div class="nodatalist">
                    <mt-spinner v-if="loading" class="lodingdataicon"></mt-spinner>
                    <span v-if="!allkeeps.length && !loading">还没有跟进记录！</span>
                </div>
            </div>
            <div v-else class="flowkeepcommonwrap">
                <div v-for="list in allflows" class="flowkeeplist">
                    <span class="beforenum">{{list.flow.index}}</span>
                    <div class="flowkeeplistcontent">
                        <div class="flowkeeplistcenter">
                            <p class="title"><span class="casename singleellipsis">{{list.flow.fflowname ? list.flow.fflowname + ' > ' : ''}}{{list.flow.name}}</span><span class="time">{{list.flow.updated_at | timeconvert}}</span></p>
                            <div class="article" v-html="list.flow.content || '此流程未填写内容'"></div>
                            <p v-for="li in list.flow.filesjson" class="fileblockwrap clearboth">
                                <span class="filetypeicon"><img src="/static/icon/filetype_icon.png"></span>
                                <!-- <span @click="delfilesjson(index)" class="delicon"><img src="/static/icon/delete_icon.png"></span> -->
                                <a class="delicon" :href="`${apiurl}/file/download/${li.hash}`" target="_blank"><img src="/static/icon/download_icon.png"></a>
                                <a class="singleellipsis" :href="`${apiurl}/file/download/${li.hash}`" target="_blank">{{li.name}}</a>
                            </p>
                        </div>
                        <div class="flowkeeplistbottom">
                            <button @click="$set(list.flow, 'showcomment', !list.flow.showcomment)" class="commenthidebtn"><img src="/static/icon/pencil_icon.png">评论</button>
                            <bizcomment v-if="list.flow.showcomment" type="flow" :id="list.flow.casefid" :nomargin="true"></bizcomment>
                        </div>
                    </div>
                    <div v-if="list.keep" class="flowkeeplistcontent">
                        <div class="flowkeeplistcenter">
                            <!-- <p class="title"><span class="casename singleellipsis">{{list.keep.name}} > 案件进展</span><span class="time">{{list.keep.updated_at | timeconvert}}</span></p> -->
                            <div class="article" v-html="list.keep.content ? '案件进展：' + list.keep.content : '未填写跟进记录内容'"></div>
                            <p v-for="li in list.keep.filesjson" class="fileblockwrap clearboth">
                                <span class="filetypeicon"><img src="/static/icon/filetype_icon.png"></span>
                                <!-- <span @click="delfilesjson(index)" class="delicon"><img src="/static/icon/delete_icon.png"></span> -->
                                <a class="delicon" :href="`${apiurl}/file/download/${li.hash}`" target="_blank"><img src="/static/icon/download_icon.png"></a>
                                <a class="singleellipsis" :href="`${apiurl}/file/download/${li.hash}`" target="_blank">{{li.name}}</a>
                            </p>
                        </div>
                        <div class="flowkeeplistbottom">
                            <button @click="$set(list.keep, 'showcomment', !list.keep.showcomment)" class="commenthidebtn"><img src="/static/icon/pencil_icon.png">评论</button>
                            <bizcomment v-if="list.keep.showcomment" type="keep" :id="list.keep.casekid" :nomargin="true"></bizcomment>
                        </div>
                    </div>
                </div>
                <div class="nodatalist">
                    <mt-spinner v-if="loading" class="lodingdataicon"></mt-spinner>
                    <span v-if="!allflows.length && !loading">还未创建流程！</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import { MessageBox, Indicator, Toast } from 'mint-ui'
import commissioned from "@/components/common/z-commissioned"
import bizcomment from "@/components/feed/bizcomment"

export default {
    name: 'caseReadKHwrap',
    data () {
        return {
            apiurl,
            id: '',
            flow: [],
            caseInfo: {},
            loading: false
        }
    },
    computed: {
        // 取所有的案件进展 倒序
        allkeeps() {
            let arr = []
            this.flow.forEach(e => {
                if( e.casekeep ){
                    e.casekeep.index = arr.length + 1
                    arr.push(e.casekeep)
                }
                if( e.sub_fids.length ){
                    e.sub_fids.forEach(f => {
                        if( f.casekeep ){
                            f.casekeep.index = arr.length + 1
                            arr.push(f.casekeep)
                        }
                    })
                }
            })
            return arr.reverse()
        },
        // 取所有的流程<->案件进展 倒序
        allflows() {
            let arr = []
            this.flow.forEach(e => {
                let obj = {}
                obj.flow = e
                obj.flow.index = arr.length + 1
                if( e.casekeep ){
                    obj.keep = e.casekeep
                }
                arr.push(obj)
                if( e.sub_fids.length ){
                    e.sub_fids.forEach(f => {
                        let chobj = {}
                        chobj.flow = f
                        chobj.flow.index = arr.length + 1
                        chobj.flow.fflowname = e.name
                        if( f.casekeep ){
                            chobj.keep = f.casekeep
                        }
                        arr.push(chobj)
                    })
                }
            })
            return arr.reverse()
        }
    },
    beforeMount() {
        this.id = this.$route.params.id
        this.loading = true
        this.getCaseInfo()
    },
    mounted() {

    },
    methods: {
        getCaseInfo() {
            this.$http.get(`/biz/case/info/${this.id}`).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    let v = response.data.data;
                    // 未选择律师的案件
                    if( !this.$authCodeT(this.$store.state.userInfo.auth_code).isLawyer && v.belong.id == this.$store.state.userInfo.id ){
                        this.$router.push({ name: 'selectLawyer', params: { id: v.caseid}})
                    }else{
                        this.caseInfo = v;
                    }
                }else{
                    Toast( response.data.errmsg );
                    this.$router.go(-1)
                }
            }).catch(err => {

            });
        },
        getflows(v) {
            v.forEach(e => {
                e.showcomment = false;
                if( e.sub_fids.length ){
                    e.sub_fids.forEach(f => {
                        if( f.keeps.length ) {
                            this.getKeep(f);
                        }
                        this.getflowinfo(f, e.casefid);
                    })
                }
                if( e.keeps.length ) {
                    this.getKeep(e);
                }
            });
            this.flow = v
            this.loading = false
        },
        getKeep(e) {
            this.loading = true
            this.$http.get(`/biz/keep/${e.casefid}/list`).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    let v = response.data.data;
                    v.forEach((val) => {
                        val.filesjson =  val.filesjson ? JSON.parse(val.filesjson) : [];
                        val.showcomment = false
                    })
                    this.$set(e, 'casekeep', v[0])
                }else{
                    console.log( response.data.errmsg );
                }
                this.loading = false
            }).catch(err => {
                this.loading = false
            });
        },
        getflowinfo(e, pfid) {
            this.loading = true
            this.$http.get(`/biz/flow/${this.id}/list/${e.casefid}/${pfid}`).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    let v = response.data.data;
                    v.forEach((val) => {
                        val.filesjson =  val.filesjson ? JSON.parse(val.filesjson) : [];
                        val.showcomment = false
                    })
                    this.$set(e, 'content', v[0].content)
                }else{
                    console.log( response.data.errmsg );
                }
                this.loading = false
            }).catch(err => {
                this.loading = false
            });
        }
    },
    filters: {
        timeconvert(date) {
            return moment(date).format('MM/DD HH:mm');
        }
    },
    components: {
        commissioned,
        bizcomment
    }
}
</script>
