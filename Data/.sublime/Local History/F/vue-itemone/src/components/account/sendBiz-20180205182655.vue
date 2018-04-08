<style lang="stylus">
.sendBizwrap
    padding: 0 0 0.3rem
    // .sendBizcontent
    //     padding: 0.65rem 0 0
</style>

<template>
    <div class="sendBizwrap">
        <z_header :title="title">
            <span slot="back">取消</span>
            <span @click="sendBiz" slot="to">发送 &gt;</span>
        </z_header>
        <div class="sendBizcontent appsmallwrap">
            <div class="commonformitem">
                &nbsp;
                <mt-radio
                    v-if="usercompanylist.length"
                    v-model="selectctmid"
                    :options="usercompanylist">
                </mt-radio>
            </div>
            <div class="commonformitem">
                <input v-model.trim="sendbizeditinfo.name" type="text" placeholder="输入业务标题" class="commomiptclass">
            </div>
            <div class="commonformitem">
                <textarea v-model.trim="sendbizeditinfo.content" class="commomiptclass" rows="10" placeholder="输入业务内容"></textarea>
            </div>
            <div class="commonformitem">
                <input @click="selectlawyerlistpanel = !selectlawyerlistpanel" :value="selectlawyerlist.map(e => e.name).join('，')" type="text" readonly="readonly" placeholder="请选择律师" class="commomiptclass sanjiaoxingbg">
                <div v-show="selectlawyerlistpanel" class="commonselectpanel commomiptclass">
                    <ul class="clearboth">
                        <li v-for="list in userlawyerlist">
                            <label><input type="checkbox" :value="list" v-model="selectlawyerlist" :disabled="templawyers.includes(list.id)"> {{list.name}}</label>
                        </li>
                    </ul>
                    <div class="nodatalist" v-if="!userlawyerlist.length">还没有关注律师</div>
                </div>
            </div>
            <div class="commonformitem">
                <uploadfile
                    :about_id="-1"
                    about_type="biz_case_node_flows"
                    @complete="successfn"
                    @error="errorfn">
                    <div class="commonbtnclass ghostcommonbtnclass">上传附件 +</div>
                </uploadfile>
            </div>
            <div class="commonformitem">
                <p v-for="(list, index) in sendbizeditinfo.filesjson" class="fileblockwrap clearboth">
                    <span class="filetypeicon"><img src="/static/icon/filetype_icon.png"></span>
                    <span @click="delfilesjson(index)" class="delicon"><img src="/static/icon/delete_icon.png"></span>
                    <a class="singleellipsis" :href="`${apiurl}/file/download/${list.hash}`" target="_blank">{{list.name}}</a>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import uploadfile from "@/components/fileup/uploadfile"
import { MessageBox, Indicator, Toast } from 'mint-ui'
import z_header from '@/components/header/z-header'

export default {
    name: 'sendBizwrap',
    data () {
        return {
            apiurl,
            title: '发布业务',
            id: '',
            sendbizeditinfo: {
                name: '',
                content: '',
                lawyers: [],
                filesjson: [],
                ctmid: '',
                personal: true
            },
            selectctmid: '-1',
            usercompanylist: [],
            userlawyerlist: [],
            selectlawyerlist: [],
            templawyers: [],    //不能再选择的律师
            selectlawyerlistpanel: false
        }
    },
    computed: {

    },
    beforeMount() {
        this.id = this.$route.query.id
        if( this.id ){
            this.getCaseInfo();
            this.title = '编辑业务';
        }else{
            this.getUserCompany();
        }
    },
    methods: {
        getUserCompany() {
            this.$http.get('/biz/case/getusercustomer').then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    let v = response.data.data;
                    if( v.length ){
                        v.forEach(e => {
                            e.label = e.name;
                            e.value = `${e.ctmid}`;
                        });
                        v.push({
                            label: '个人',
                            value: '-1'
                        });
                        this.usercompanylist = v;
                        this.selectctmid = `${v[0].ctmid}`;
                    }else{
                        this.getUserFollowLawyers();
                    }
                }else{
                    console.log( response.data.errmsg )
                }
            }).catch(err => {

            });
        },
        getUserFollowLawyers() {
            this.$http.get('biz/case/getuserfollowlawyers').then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    this.userlawyerlist = response.data.data;
                    if( this.id ){
                        this.selectlawyerlist = JSON.parse(JSON.stringify(this.userlawyerlist.filter(e => this.sendbizeditinfo.lawyers.includes(e.id))))
                        this.templawyers = JSON.parse(JSON.stringify(this.sendbizeditinfo.lawyers))
                    }
                }else{
                    console.log( response.data.errmsg )
                }
            }).catch(err => {

            });
        },
        userCompanyChange(v) {
            if( v != '-1' ){
                // 选中了公司业务
                let obj = this.usercompanylist.find(e => e.ctmid == v);
                this.userlawyerlist = [
                    {
                        id: obj.id,
                        name: obj.lawyer
                    }
                ];
                this.selectlawyerlist = this.userlawyerlist
                this.sendbizeditinfo.personal = false;
            }else{
                // 选中了私人业务
                this.selectlawyerlist = []
                this.sendbizeditinfo.personal = true;
                this.getUserFollowLawyers();
            }
        },
        successfn(obj, flag) {
            this.sendbizeditinfo.filesjson.push({
                name: obj.name,
                hash: obj.hash
            })
        },
        errorfn(obj, flag) {
            console.log(obj)
        },
        delfilesjson(i) {
            MessageBox.confirm('确定删除此文件?').then(action => {
                if( action == 'confirm' ){
                    this.sendbizeditinfo.filesjson.splice(i, 1)
                }
            });
        },
        sendBiz() {
            this.sendbizeditinfo.ctmid = this.selectctmid == '-1' ? -1 : parseInt(this.selectctmid);
            this.sendbizeditinfo.lawyers = this.selectlawyerlist.map(e => e.id);
            if( this.sendbizeditinfo.name == '' || this.sendbizeditinfo.content == '' || this.sendbizeditinfo.lawyers.length <= 0 ){
                Toast('请填写完整的业务信息');
                return false;
            }
            Indicator.open({
                text: '发布业务中...',
                spinnerType: 'fading-circle'
            });
            let params = { filesjson: JSON.stringify(this.sendbizeditinfo.filesjson), hash_strs: this.sendbizeditinfo.filesjson.map(e => e.hash)};
            params = Object.assign({}, this.sendbizeditinfo, params);
            if( this.id ){
                params.caseid = this.id;
            }
            this.$http.post('/biz/case/issuecase', params).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    this.$router.push({ name: 'myBiz'})
                    Toast('发布业务成功')
                }else{
                    Toast( response.data.errmsg )
                }
                Indicator.close()
            }).catch(err => {
                Indicator.close()
            });
        },
        getCaseInfo() {
            this.$http.get(`/biz/keep/${this.id}/listall`).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    let v = response.data.data[0];
                    this.sendbizeditinfo = {
                        name: v.casename,
                        content: v.content,
                        lawyers: v.lawyers,
                        filesjson: v.filesjson ? JSON.parse(v.filesjson) : [],
                        ctmid: -1,
                        personal: true
                    };
                    this.getUserFollowLawyers()
                }else{
                    console.log( response.data.errmsg )
                }
            }).catch(err => {

            });
        },
    },
    watch: {
        selectctmid(v, ov) {
            this.userCompanyChange(v)
        }
    },
    filters: {

    },
    components: {
        uploadfile,
        z_header
    }
}
</script>
