<style lang="stylus">
.case_infov2
    position: relative
    .caseinfoformwrap
        padding: 17px 0 0 68px
        color: #333
        display: flex
        // align-items: center
        // justify-content: space-between
        flex-wrap: wrap
        .formitem1, .formitem2
            span.itemtit
                color: #999
        .formitem1
            height: 44px
            line-height: 44px
            width: 550px
        .formitem2
            height: 44px
            line-height: 44px
            width: 470px
    .commontagwrapv2
        padding: 0 20px
        .ivu-tag-text
            float: left
            max-width: 56px
            white-space: nowrap
            overflow: hidden

    .addmembertop93
        .commonselectsomethingwrapv2
            top: 93px
            right: -11px
    .addmembertop137
        .commonselectsomethingwrapv2
            top: 137px
            right: -11px
    .addmembertop178
        .commonselectsomethingwrapv2
            top: 178px
            right: -11px
    .customer_avatar_item
        white-space: normal
        .commontagwrapv2
            margin-bottom: 10px
</style>

<template>
    <div class="case_infov2">
        <div class="commoncaseinfohead caseinfohead">
            <div>
                <span class="tit">案件信息</span>
            </div>
            <div>
                <span class="item author">创建者：哈哈哈</span>
                <span class="edit"><Button type="ghost">编 辑</Button></span>
            </div>
        </div>
        <div class="caseinfoformwrap">
            <div class="formitem1 ctmname"><span class="itemtit">客户名称：</span>{{caseInfo.ctmname + (caseInfo.assoc && caseInfo.assoc.ctmaid? `--${caseInfo.assoc.name}`: '')}}</div>
            <div class="formitem2 contact"><span class="itemtit">联系人：</span>
                <Tag v-if="index < 3" v-for="(cts, index) in contacts" closable @on-close="" :key="cts.ctmctctid"  class="commontagwrapv2">{{cts.name}}</Tag>

                <Poptip
                    v-if="contacts.length > 3"
                    class="contact_panel_pop"
                    placement="bottom-end"
                    width="408"
                    trigger="hover"
                    :transfer="false">
                    <span class="more" style="cursor: -webkit-zoom-in;">. . .</span>
                    <div slot="content">
                        <div class="customer_avatar_item">
                            <Tag v-if="index > 2" v-for="(cts, index) in contacts" closable @on-close="" :key="cts.ctmctctid"  class="commontagwrapv2">{{cts.name}}</Tag>
                        </div>
                    </div>
                </Poptip>

                <Icon @click.native="openAddmember('contact', '联系人', casecontacts, false, true)" type="android-add-circle" :class="{hover: 0}" class="addnewiconv2"></Icon>
            </div>
            <div class="formitem1 casename"><span class="itemtit">案件名称：</span>{{caseInfo.casename}}</div>
            <div class="formitem2 xiezuozhe"><span class="itemtit">协作者：</span>
                <Tag v-if="index < 3" v-for="(cct, index) in coactors" closable @on-close="" :key="cct.cauid"  class="commontagwrapv2">{{cct.name}}</Tag>

                <Poptip
                    v-if="coactors.length > 3"
                    class="contact_panel_pop"
                    placement="bottom-end"
                    width="408"
                    trigger="hover"
                    :transfer="false">
                    <span class="more" style="cursor: -webkit-zoom-in;">. . .</span>
                    <div slot="content">
                        <div class="customer_avatar_item">
                            <Tag v-if="index > 2" v-for="(cts, index) in coactors" closable @on-close="" :key="cts.ctmctctid"  class="commontagwrapv2">{{cts.name}}</Tag>
                        </div>
                    </div>
                </Poptip>

                <Icon @click.native="openAddmember('coactor', '协作者', coactors, true, false)" type="android-add-circle" :class="{hover: 0}" class="addnewiconv2"></Icon>
            </div>
            <div class="formitem1 ctmbelong"><span class="itemtit">客户归属：</span>{{caseInfo.belong? caseInfo.belong.name: $store.state.mineInfo.name}}</div>
            <div class="formitem2 outvisiter"><span class="itemtit">外访者：</span>
                <Tag v-if="index < 3" v-for="(vst, index) in visitors" closable @on-close="" :key="vst.cauid"  class="commontagwrapv2">{{vst.name}}</Tag>

                <Poptip
                    v-if="visitors.length > 3"
                    class="contact_panel_pop"
                    placement="bottom-end"
                    width="408"
                    trigger="hover"
                    :transfer="false">
                    <span class="more" style="cursor: -webkit-zoom-in;">. . .</span>
                    <div slot="content">
                        <div class="customer_avatar_item">
                            <Tag v-if="index > 2" v-for="(cts, index) in visitors" closable @on-close="" :key="cts.ctmctctid"  class="commontagwrapv2">{{cts.name}}</Tag>
                        </div>
                    </div>
                </Poptip>

                <Icon @click.native="openAddmember('visitor', '外访者', visitors, true, false)" type="android-add-circle" :class="{hover: 0}" class="addnewiconv2"></Icon>
            </div>
        </div>

        <!-- 授权面板 -->
        <addMemberv2
            v-if="addMemberModal"
            :onlyLawyer="onlyLawyer"
            :noLawyer="noLawyer"
            :title="'添加' + SettingAuthTitle"
            :initSelectedUserIds="initUsers"
            @close="addMemberModal = false"
            @selected-users="toSubmitAuth"
            :key="SettingAuthType || 'szqx'"
            ref="addMemberv2"
            :class="{addmembertop93: SettingAuthType == 'contact', addmembertop137: SettingAuthType == 'coactor', addmembertop178: SettingAuthType == 'visitor'}">
        </addMemberv2>
    </div>
</template>

<script>
import addMemberv2 from '@/components/common/addMemberv2';

export default {
    name: 'caseInfo',
    components: {addMemberv2},
    props: {
        caseInfo: [Object],
        // oRole: [Object],
        contacts: [Array],
        coactors: [Array],
        visitors: [Array],
        casecontacts: [Array],
        casename: '',
    },
    data() {
        return {
            addMemberModal: false,
            initUsers: [],
            onlyLawyer: false,
            noLawyer: false,
            SettingAuthTitle: '',
            SettingAuthType: '',
            // caseEditModal: false,
            // caseInfoModal: { // 编辑案件modal
            //     name: '',
            //     status: '',
            // },
            // ruleValidate: {
            //     name: [
            //         { required: true, message: '案件名不能为空', trigger: 'change' }
            //     ]
            // },

            // customerContacts: [], // 所有的来自客户详情的客户联系人
            // relateCustomers: [],
        }
    },
    computed: {
        // 客户联系人(包含 客户详情的客户联系人+ 从这之外加的)
        // contacts() {
        //     return this.relateCustomers.filter(val => val.type == 'contact');
        // },
        // allContacts() {
        //     let arr = [];
        //     this.customerContacts.forEach((val) => {
        //         val.isCustomerContacts = true;
        //         val.isAuth = false;
        //         arr.push(val);
        //     });

        //     // 确定customerContacts中哪些有权限
        //     arr.forEach((val) => {
        //         let is_exit_in_arr = false;
        //         this.contacts.forEach((val2) => {
        //             if (val.id == val2.id) {
        //                 is_exit_in_arr = true;
        //             }
        //         });
        //         if(is_exit_in_arr) {
        //             val.isAuth = true;
        //         }
        //     });

        //     // 添加不是从customerContacts中选来的
        //     this.contacts.forEach((val) => {
        //         let is_exit_in_arr = false;
        //         this.customerContacts.forEach((val2) => {
        //             if (val.id == val2.id) {
        //                 is_exit_in_arr = true;
        //             }
        //         });
        //         if(!is_exit_in_arr) {
        //             val.isCustomerContacts = false;
        //             val.isAuth = true;
        //             arr.push(val);
        //         }
        //     });

        //     return arr;
        // },
        // coactors() {
        //     return this.relateCustomers.filter(val => val.type == 'coactor');
        // },
        // visitors() {
        //     return this.relateCustomers.filter(val => val.type == 'visitor');
        // },
    },
    created() {
        // this.caseInfoModal.name = this.caseInfo.casename;
        // this.caseInfoModal.status = this.caseInfo.status;

        // this.getCustomerContacts();
        // this.getRelateCustomers();
    },
    methods: {
        // gotoCustomerDetails(ctmid) {
        //     this.$ajax('get', `/biz/customer/info/${ctmid}`, data => {
        //         this.$router.push({ name: 'customerDetails', params: {ctmid}});
        //     }, err => {
        //         this.$Modal.warning({
        //             title: '查看提示',
        //             content: data.errmsg || '您无发查看客户信息'
        //         });
        //     });
        // },
        // getCustomerContacts() {
        //     this.$ajax('get', `/biz/customer/${this.caseInfo.ctmid}/contact/list?detail=0`, data => {
        //         this.customerContacts = data.data;
        //     });
        // },
        // getRelateCustomers() {
        //     this.$ajax('get', `/biz/case/${this.caseInfo.ctmid}/assoc/${this.caseInfo.caseid}`, data => {
        //         this.relateCustomers = data.data;
        //     });
        // },
        // submitCaseInfo(name) {
        //     this.$refs[name].validate((valid) => {
        //         if (!valid) {
        //             return;
        //         }

        //         let param = {
        //             name: this.caseInfoModal.name,
        //             status: this.caseInfoModal.status,
        //             possessor: this.caseInfo.belong? this.caseInfo.belong.id: this.$store.state.mineInfo.id
        //         };
        //         this.$ajax('post', `/biz/case/${this.caseInfo.ctmid}/store/${this.caseInfo.caseid}`, param, data => {
        //             this.caseInfo.casename = this.caseInfoModal.name;
        //             this.caseInfo.status = this.caseInfoModal.status;
        //             this.caseEditModal = false;
        //         });
        //     });
        // },
        // cancelCaseInfo() {
        //     this.caseEditModal = false;
        //     this.caseInfoModal.name = this.caseInfo.casename;
        //     this.caseInfoModal.status = this.caseInfo.status;
        // },
        // /* 案件编辑 */
        // caseInfoEdit(name) {
        //     switch( name ) {
        //         case 'del':
        //             this.$Modal.confirm({
        //                 title: '确认对话框',
        //                 content: '确定删除吗？',
        //                 onOk: () => {
        //                     this.delCase();
        //                 }
        //             });
        //             break;
        //         case 'coactor':
        //             this.onlyLawyer = true;
        //             this.noLawyer = false;
        //             this.addMemberType = 'coactor';
        //             this.initUsers = this.coactors;
        //             this.addMemberModal = true;
        //             break;
        //         case 'visitor':
        //             this.onlyLawyer = true;
        //             this.noLawyer = false;
        //             this.addMemberType = 'visitor';
        //             this.initUsers = this.visitors;
        //             this.addMemberModal = true;
        //             break
        //     }
        // },
        // toAddContact() {
        //     this.onlyLawyer = false;
        //     this.noLawyer = true;
        //     this.addMemberType = 'contact';
        //     this.initUsers = this.contacts;
        //     this.addMemberModal = true;
        // },
        toSubmitAuth(users,ids,isNoChange) {
            if (isNoChange) {
                return;
            }

            let type = this.SettingAuthType;
            this.$http.post(this.$apiConfig.bizGroup.setCaseAuth.replace(/\{ctmid\}/, this.caseInfo.ctmid).replace(/\{caseid\}/, this.caseInfo.caseid), {uids: ids, type: type}).then(response => {
                let data = response.data;
                if( data.retcode == RETCODE_OK ){
                    if (type == 'contact' && data.data && data.data.name) {
                        this.$Message.error( `${data.data.name}为案件发布者，不能删除` );
                        return false;
                    }

                    this.$emit('changeRelateUser', users, type);
                }else{
                    let text;
                    if( typeof data.errmsg == 'string'){
                        text = data.errmsg;
                    }else{
                        text = data.errmsg.user.join('、') /*+ ' 是'*/ + data.errmsg.errmsg;
                        this.$refs.addMemberv2.removeLeftUsers(data.errmsg.user);
                    }
                    this.$Message.error( text );
                }
            });
        },
        // addCustomer(contact){
        //     let uids = [contact.id];
        //     this.contacts.forEach((item) => {
        //         uids.push(item.id);
        //     });
        //     let param = {
        //         uids: uids,
        //         type: 'contact'
        //     };
        //     let URL = `/biz/case/${this.caseInfo.ctmid}/assoc/${this.caseInfo.caseid}`;

        //     this.$http.post(URL,param).then(response => {
        //         let data = response.data;
        //         if( data.retcode == RETCODE_OK ){
        //             this.relateCustomers.push({
        //                 id: contact.id,
        //                 type: 'contact',
        //                 name: contact.name
        //             });

        //             this.$Message.success('联系人添加成功！');
        //         }else if(data.retcode == 1){
        //             this.$Message.error(data.errmsg.user[0] + data.errmsg.errmsg);
        //         } else {
        //             this.$Message.error(data.errmsg);
        //         }
        //     });
        // },
        // removeCustomer(uid) {
        //     let param = {
        //         uid: uid,
        //         type: 'contact'
        //     };

        //     this.$ajax('post', `/biz/case/${this.caseInfo.ctmid}/assoc/${this.caseInfo.caseid}/del`, param, data => {
        //         if (data.data && data.data.name) {
        //             this.$Message.error( `${data.data.name}为案件发布者，不能删除` );
        //             return false;
        //         }

        //         this.relateCustomers = this.relateCustomers.filter(val => !(val.id == uid && val.type == param.type));

        //         this.$Message.success('联系人移除成功！');
        //     });
        // },
        // delCase(){
        //     this.$ajax('post', `/biz/case/${this.caseInfo.ctmid}/del/${this.caseInfo.caseid}`, data => {
        //         this.$router.push({name: 'businessList'});
        //     });
        // },
        openAddmember(name, type, users, onlyLawyer, noLawyer) {
            this.initUsers = users;
            this.onlyLawyer = onlyLawyer;
            this.noLawyer = noLawyer;
            this.SettingAuthTitle = type;
            this.SettingAuthType = name;
            this.addMemberModal = true;
        }
    },
    filters: {
        // timeFormat(s) {
        //     if (!s) {
        //         s = 0;
        //     }
        //     let hours = Math.floor(s / 3600);
        //     let minutes = Math.floor((s % 3600)/60);
        //     let seconds = s % 60;
        //     hours =  hours < 10? '0'+hours: ''+hours;
        //     minutes =  minutes < 10? '0'+minutes: ''+minutes;
        //     seconds =  seconds < 10? '0'+seconds: ''+seconds;
        //     return hours + '时' + minutes + '分' + seconds + '秒';
        // }
    }
}
</script>