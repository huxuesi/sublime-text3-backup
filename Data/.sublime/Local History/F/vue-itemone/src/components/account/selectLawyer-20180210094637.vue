<style lang="stylus">
.selectLawyerwrap
    padding-bottom: 0.2rem
    .headtit
        height: 0.84rem
        line-height: 0.84rem
        color: #333
        padding: 0 0.45rem
        font-size: 0.32rem
        text-align: center
        border-bottom: 1px solid #e5e5e5
        .edit
            float: right
            font-size: 0.3rem
            color: #3dc1ff
    .selectLawyertime
        text-align: right
        height: 0.66rem
        line-height: 0.66rem
        font-size: 0.24rem
        color: #999
    .selectLawyercontent
        font-size: 0.3rem
        color: #535353
        .title
            font-size: 0.28rem
            color: #666
            margin: 0 0 0.35rem
        .content
            margin: 0 0 0.4rem
    .selectLawytitle
        height: 1.06rem
        margin: 0.37rem 0 0
        line-height: 1.06rem
        font-size: 0.32rem
        color: #444
        border-top: 1px solid #e5e5e5
    .selectLawylvshi
        li
            width: 33.33%
            float: left
            text-align: center
            img
                width: 1.13rem
                height: 1.13rem
                border-radius: 50%
            button
                height: 0.53rem
                padding: 0 0.25rem
                background: #00aeff
                color: #fff
                border-radius: 3px
                margin: 0.15rem 0 0.3rem
                &.dis
                    color: #bbbec4
                    background-color: #f7f7f7
                    border-color: #d2d2d2
</style>

<template>
    <div class="selectLawyerwrap">
        <div class="headtit">{{$store.state.userInfo.name}} <span @click="$router.push({ name: 'sendBiz', query: { id: id}})" class="edit">编辑</span></div>
        <div class="appsmallwrap">
            <div class="selectLawyertime">{{info.time}}</div>
            <div class="selectLawyercontent">
                <div class="title">{{info.casename}}</div>
                <div class="content">{{info.content}}.</div>
            </div>
            <p v-for="list in info.filesjson" class="fileblockwrap">
                <span class="filetypeicon"><img src="/static/icon/filetype_icon.png"></span>
                <!-- <span @click="" class="delicon"><img src="/static/icon/delete_icon.png"></span> -->
                <a class="singleellipsis" :href="`${apiurl}/file/download/${list.hash}`">{{list.name}}</a>
            </p>
            <div class="selectLawytitle">
                接收者
            </div>
            <div class="selectLawylvshi">
                <ul class="clearboth">
                    <li v-for="list in sendLawyers"><img :src="`${apiurl}/uploads/avatar/${list.id}.jpg`"><button @click="selectLawyer(list, !cannotSelected(list.id))" :class="{ dis: cannotSelected(list.id)}">选定律师</button></li>
                    <li @click="openaddlawyerpanel"><img src="/static/icon/selectLawyer_addicon.png"></li>
                </ul>
            </div>
            <div class="selectLawytitle">
                律师回复
            </div>
            <bizcomment v-if="info.casefid" type="flow" :id="info.casefid" :noBigBtn="true"  @bigUsers="getbigUser"></bizcomment>
        </div>
        <mt-popup
            v-model="addlawyerpanel"
            position="bottom"
            class="v2bottomselectwrap">
            <div class="localtoolbar clearboth">
                <span @click="addlawyerpanel = false" class="quxiao">取消</span>
                <span @click="sendaddlawyer" class="queding">确定</span>
            </div>
            <mt-picker :slots="slots" @change="onValuesChange" valueKey="name"></mt-picker>
        </mt-popup>
    </div>
</template>

<script>
import bizcomment from "@/components/feed/bizcomment"
import { MessageBox, Indicator, Toast } from 'mint-ui'

export default {
    name: 'selectLawyerwrap',
    data () {
        return {
            apiurl,
            id: '',
            info: {},
            lawyer: [],
            havereplayids: [],
            addlawyerpanel: false,
            slots: [
                {
                  flex: 1,
                  values: [],
                  className: 'slot1',
                  textAlign: 'center'
                }
            ],
            addselectLawyer: ''
        }
    },
    computed: {
        sendLawyers() {
            let arr = [];
            if (this.info.lawyers &&　this.lawyer.length) {
                arr = this.lawyer.filter(val => this.info.lawyers.includes(val.id));
            }
            return arr;
        }
    },
    beforeMount() {
        this.id = this.$route.params.id
        this.getCaseInfo()
    },
    mounted() {

    },
    methods: {
        getbigUser(usersIds) {
            this.havereplayids = usersIds;
        },
        cannotSelected(id) {
            return this.havereplayids.includes(id)? false: true;
        },
        getCaseInfo() {
            this.$http.get(`/biz/keep/${this.id}/listall`).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    if( !response.data.data[0] ){
                        Toast('此业务已经选定律师')
                        this.$router.go(-1)
                        return false
                    }
                    let v = response.data.data[0]
                    v.filesjson = v.filesjson ? JSON.parse(v.filesjson) : []
                    this.info = v
                    this.getUserFollowLawyers()
                }else{
                    console.log( response.data.errmsg );
                }
            }).catch(err => {

            });
        },
        getUserFollowLawyers() {
            this.$http.get('biz/case/getuserfollowlawyers').then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    this.lawyer = response.data.data;
                    this.slots[0].values = this.lawyer.filter(val => !this.info.lawyers.includes(val.id));
                }else{
                    console.log( response.data.errmsg );
                }
            }).catch(err => {});
        },
        onValuesChange(picker, values) {
            if( values[0] ){
                this.addselectLawyer = values[0];
            }
        },
        selectLawyer(list, t) {
            if( t ){
                MessageBox.confirm('确定选择 ' + list.name + ' 为办理律师?').then(action => {
                    if( action == 'confirm' ){
                        Indicator.open({
                            text: '加载中...',
                            spinnerType: 'fading-circle'
                        })
                        this.$http.get(`biz/case/issuecase/designatelawyer/${this.id}/${list.id}`).then(response => {
                            if( response.data.retcode == RETCODE_OK ){
                                this.$router.push({name: 'myBiz'});
                            }else{
                                console.log( response.data.errmsg );
                            }
                            Indicator.close()
                        }).catch(err => {
                            Indicator.close()
                        });
                    }
                });
            }else{
                Toast('不能选择未回复此业务的律师')
            }
        },
        sendaddlawyer() {
            this.addlawyerpanel = false;
            if( this.addselectLawyer.id && this.info.caseid ){
                Indicator.open({
                    text: '加载中...',
                    spinnerType: 'fading-circle'
                })
                this.info.lawyers.push(this.addselectLawyer.id);
                this.slots[0].values = this.lawyer.filter(val => !this.info.lawyers.includes(val.id));
                let params = {
                    name: this.info.casename,
                    content: this.info.content,
                    lawyers: this.info.lawyers,
                    filesjson: JSON.stringify(this.info.filesjson),
                    ctmid: -1,
                    personal: true,
                    caseid: this.info.caseid
                }
                this.$http.post('biz/case/issuecase', params).then(response => {
                    if( response.data.retcode == RETCODE_OK ){
                        Toast('成功添加接收者')
                    }else{
                        Toast( response.data.errmsg )
                    }
                    this.addselectLawyer = ''
                    Indicator.close()
                }).catch(err => {
                    Indicator.close()
                });
            }
        },
        openaddlawyerpanel() {
            if( this.slots[0].values.length ){
                this.addlawyerpanel = true
                this.addselectLawyer = this.slots[0].values[0]
            }else{
                Toast('暂无能接收此案件的已关注律师，快去关注更多的律师吧！')
            }
        }
    },
    filters: {

    },
    components: {
        bizcomment
    }
}
</script>
