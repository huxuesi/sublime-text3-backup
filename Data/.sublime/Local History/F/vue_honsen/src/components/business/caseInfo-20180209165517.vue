<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'
bgColor = #65778b
.case_info
    background-color #fff
    .title
        position relative
        padding 0 15px
        height 43px
        line-height 43px
        background-color bgColor
        .text
            width 150px
            color #fff
            font-size 16px
            bgImg(150px,43px,'/static/icon/0028.png')
            background-position left center
            text-indent 30px
        .dropdown
            position absolute
            top -2px
            right 15px
    .body
        color #6d6d6d
        font-size 14px
        padding 20px 60px
        .name
            margin-bottom 15px
        .time
            margin-bottom 9px
        .state_time
            color #9e9e9e
        .customer_avatar_wrap
            display inline-block
            vertical-align middle
        .customer_avatar_item
            position relative
            margin-right 8px
            display inline-block
            width 32px
            height 32px
            &:hover
                .add_modal, .del_modal
                    display inline-block
        .avatar_modal
            position absolute
            top 0px
            left 0px
            display inline-block
            width 32px
            height 32px
            border-radius 50%
            background-color rgba(0,0,0,0.5)
            color #fff
            font-weight bold
            text-align center
            cursor pointer
            &.add_modal
                display none
                line-height 26px
                font-size 26px
            &.del_modal
                display none
                line-height 25px
                font-size 38px
        .disable:before
            position absolute
            top 15px
            left 0px
            content ''
            display block
            width 32px
            border-top 2px solid #3dc1ff
        .contact_panel_pop
            .more
                cursor pointer
            &>.ivu-poptip-popper
                left -90px !important
                top 62px !important
            .customer_avatar_item
                float left
                margin 4px
        .add_icon
            margin-left: 7px
            display: inline-block
            vertical-align: top
            addIcon(#3dc1ff)
            &.have_contact
                margin-top 6px
                margin-left 0
.case_edit_form
    padding: 25px 34px 0 0
</style>

<template>
    <div class="case_info">
        <div class="title">
            <div class="text">案件基本信息</div>
            <Dropdown v-if="oRole.ownerAndTeam" class="dropdown" @on-click="caseInfoEdit" >
                <Button　@click="caseEditModal = true" long>编　　辑 <Icon type="arrow-down-b"></Icon></Button>
                <DropdownMenu slot="list">
                    <DropdownItem name="del">删除案件</DropdownItem>
                    <DropdownItem name="coactor">协作权限</DropdownItem>
                    <DropdownItem name="visitor">外访权限</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>

        <Row class="body">
            <Col span="8">
                <div class="name single_ellipsis">案件名称： {{caseInfo.casename}}</div>
                <div>客户归属：
                    <a @click.prevent="caseInfo.belong? $router.push({ name: 'personalCenter', params: { id: caseInfo.belong.id}}):$router.push({ name: 'personalCenter', params: { id: $store.state.mineInfo.id}})">
                        <!-- belong为null表示归属者为自己 -->
                        {{caseInfo.belong? caseInfo.belong.name: $store.state.mineInfo.name}}
                    </a>
                </div>
            </Col>

            <Col span="7" offset="1">
                <div class="name single_ellipsis">客户名称：
                    <a  @click.prevent="gotoCustomerDetails(caseInfo.ctmid)">
                        {{caseInfo.ctmname + (caseInfo.assoc && caseInfo.assoc.ctmaid? `--${caseInfo.assoc.name}`: '')}}
                    </a>
                </div>
                <div>处理状态：{{caseInfo.status? '结案': '处理中'}}<span class="state_time">（已完成{{caseInfo.used_time | timeFormat}}）</span></div>
            </Col>

            <Col span="6" offset="2">
                <div class="time">请求时间：{{caseInfo.time}}</div>
                <div>
                    联 系 人 ：
                    <div class="customer_avatar_wrap">
                        <div class="customer_avatar_item" v-if="index < 3" v-for="(contact,index) in allContacts" :key="index">
                            <Avatar :src="$avatarHash(contact.id)" />
                            <span v-if="contact.isCustomerContacts && !contact.isAuth" class="avatar_modal disable"></span>
                            <span
                                v-if="oRole.ownerAndTeam && contact.isCustomerContacts && !contact.isAuth"
                                class="avatar_modal add_modal"
                                @click="addCustomer(contact)">
                                +
                            </span>
                            <span v-if="oRole.ownerAndTeam && contact.isAuth" @click="removeCustomer(contact.id)" class="avatar_modal del_modal">-</span>
                        </div>
                    </div>

                    <Poptip
                        v-if="allContacts.length > 3"
                        class="contact_panel_pop"
                        placement="bottom-end"
                        width="320"
                        trigger="hover"
                        :transfer="false">
                        <span class="more">. . .</span>
                        <div slot="content">
                            <div class="customer_avatar_item" v-if="index > 2" v-for="(contact,index) in allContacts" :key="index">
                                <Avatar :src="$avatarHash(contact.id)" />
                                <span v-if="contact.isCustomerContacts && !contact.isAuth" class="avatar_modal disable"></span>
                                <span
                                    v-if="oRole.ownerAndTeam && contact.isCustomerContacts && !contact.isAuth"
                                    @click="addCustomer(contact)"
                                    class="avatar_modal add_modal">+</span>
                                <span v-if="oRole.ownerAndTeam && contact.isAuth" @click="removeCustomer(contact.id)" class="avatar_modal del_modal">-</span>
                            </div>
                        </div>
                    </Poptip>

                    <div v-if="oRole.ownerAndTeam" class="add_icon" :class="{have_contact: allContacts.length}" @click="toAddContact">+</div>
                </div>
            </Col>
        </Row>

        <addMember
            v-if="addMemberModal"
            title="添加成员"
            :onlyLawyer="onlyLawyer"
            :noLawyer="noLawyer"
            :initSelectedUserIds="initUsers"
            @close="addMemberModal = false"
            @selected-users="toSubmitAuth">
        </addMember>

        <Modal
            v-model="caseEditModal"
            :closable="false"
            :mask-closable="false"
            width="545"
            class-name="groupmodal">
            <div class="modal_tit tag_tit">案件基本信息</div>
            <Form class="case_edit_form" ref="case_edit_form" :model="caseInfoModal" :rules="ruleValidate" :label-width="120">
                <FormItem prop="name" label="案件名称：">
                    <Input v-model.trim="caseInfoModal.name" placeholder="请输入案件名称"></Input>
                </FormItem>
                <FormItem label="处理状态：">
                    <Select class="selectselectwrap" v-model.trim="caseInfoModal.status" :disabled="!oRole.isOwner && !oRole.isTeam">
                        <Option :value="0">处理中</Option>
                        <Option :value="1">结案</Option>
                    </Select>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="submitCaseInfo('case_edit_form')" type="info">确 定</Button>
                <Button class="gray_btn" @click="cancelCaseInfo" type="info">取 消</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import addMember from '@/components/common/addMember';

export default {
    name: 'caseInfo',
    components: {addMember},
    props: {
        caseInfo: [Object],
        oRole: [Object],
    },
    data() {
        return {
            addMemberModal: false,
            initUsers: [],
            onlyLawyer: false,
            noLawyer: false,

            caseEditModal: false,
            caseInfoModal: { // 编辑案件modal
                name: '',
                status: '',
            },
            ruleValidate: {
                name: [
                    { required: true, message: '案件名不能为空', trigger: 'change' }
                ]
            },

            customerContacts: [], // 所有的来自客户详情的客户联系人
            relateCustomers: [],
        }
    },
    computed: {
        // 客户联系人(包含 客户详情的客户联系人+ 从这之外加的)
        contacts() {
            return this.relateCustomers.filter(val => val.type == 'contact');
        },
        allContacts() {
            let arr = [];
            this.customerContacts.forEach((val) => {
                val.isCustomerContacts = true;
                val.isAuth = false;
                arr.push(val);
            });

            // 确定customerContacts中哪些有权限
            arr.forEach((val) => {
                let is_exit_in_arr = false;
                this.contacts.forEach((val2) => {
                    if (val.id == val2.id) {
                        is_exit_in_arr = true;
                    }
                });
                if(is_exit_in_arr) {
                    val.isAuth = true;
                }
            });

            // 添加不是从customerContacts中选来的
            this.contacts.forEach((val) => {
                let is_exit_in_arr = false;
                this.customerContacts.forEach((val2) => {
                    if (val.id == val2.id) {
                        is_exit_in_arr = true;
                    }
                });
                if(!is_exit_in_arr) {
                    val.isCustomerContacts = false;
                    val.isAuth = true;
                    arr.push(val);
                }
            });

            return arr;
        },
        coactors() {
            return this.relateCustomers.filter(val => val.type == 'coactor');
        },
        visitors() {
            return this.relateCustomers.filter(val => val.type == 'visitor');
        },
    },
    created() {
        this.caseInfoModal.name = this.caseInfo.casename;
        this.caseInfoModal.status = this.caseInfo.status;

        this.getCustomerContacts();
        this.getRelateCustomers();
    },
    methods: {
        gotoCustomerDetails(ctmid) {
            this.$ajax('get', `/biz/customer/info/${ctmid}`, data => {
                this.$router.push({ name: 'customerDetails', params: {ctmid}});
            }, err => {
                this.$Modal.warning({
                    title: '查看提示',
                    content: data.errmsg || '您无发查看客户信息'
                });
            });
        },
        getCustomerContacts() {
            this.$ajax('get', `/biz/customer/${this.caseInfo.ctmid}/contact/list?detail=0`, data => {
                this.customerContacts = data.data;
            });
        },
        getRelateCustomers() {
            this.$ajax('get', `/biz/case/${this.caseInfo.ctmid}/assoc/${this.caseInfo.caseid}`, data => {
                this.relateCustomers = data.data;
            });
        },
        submitCaseInfo(name) {
            this.$refs[name].validate((valid) => {
                if (!valid) {
                    return;
                }

                let param = {
                    name: this.caseInfoModal.name,
                    status: this.caseInfoModal.status,
                    possessor: this.caseInfo.belong? this.caseInfo.belong.id: this.$store.state.mineInfo.id
                };
                this.$ajax('post', `/biz/case/${this.caseInfo.ctmid}/store/${this.caseInfo.caseid}`, param, data => {
                    this.caseInfo.casename = this.caseInfoModal.name;
                    this.caseInfo.status = this.caseInfoModal.status;
                    this.caseEditModal = false;
                });
            });
        },
        cancelCaseInfo() {
            this.caseEditModal = false;
            this.caseInfoModal.name = this.caseInfo.casename;
            this.caseInfoModal.status = this.caseInfo.status;
        },
        /* 案件编辑 */
        caseInfoEdit(name) {
            switch( name ) {
                case 'del':
                    this.$Modal.confirm({
                        title: '确认对话框',
                        content: '确定删除吗？',
                        onOk: () => {
                            this.delCase();
                        }
                    });
                    break;
                case 'coactor':
                    this.onlyLawyer = true;
                    this.noLawyer = false;
                    this.addMemberType = 'coactor';
                    this.initUsers = this.coactors;
                    this.addMemberModal = true;
                    break;
                case 'visitor':
                    this.onlyLawyer = true;
                    this.noLawyer = false;
                    this.addMemberType = 'visitor';
                    this.initUsers = this.visitors;
                    this.addMemberModal = true;
                    break
            }
        },
        toAddContact() {
            this.onlyLawyer = false;
            this.noLawyer = true;
            this.addMemberType = 'contact';
            this.initUsers = this.contacts;
            this.addMemberModal = true;
        },
        toSubmitAuth(users,ids,isNoChange) {
            this.addMemberModal = false;
            
            if (isNoChange) {
                return;
            }

            let URL = `/biz/case/${this.caseInfo.ctmid}/assoc/${this.caseInfo.caseid}`;
            let param = {
                uids: ids,
                type: this.addMemberType
            };
            
            this.$http.post(URL,param).then(response => {
                let data = response.data;
                if( data.retcode == RETCODE_OK ){
                    if (param.type == 'contact' && data.data && data.data.name) {
                        this.$Message.error( `${data.data.name}为案件发布者，不能删除` );
                        return false;
                    }

                    this.relateCustomers = this.relateCustomers.filter((val) => {
                        return val.type != this.addMemberType;
                    });
                    users.forEach((val) => {
                        this.relateCustomers.push({
                            id: val.id,
                            type: this.addMemberType,
                            name: val.name
                        });
                    });

                    this.$Message.success('权限设置成功！');
                }else{
                    let text = data.errmsg.user.join() + '是' + data.errmsg.errmsg;
                    this.$Message.error( text );
                }
            });
        },
        addCustomer(contact){
            let uids = [contact.id];
            this.contacts.forEach((item) => {
                uids.push(item.id);
            });
            let param = {
                uids: uids,
                type: 'contact'
            };
            let URL = `/biz/case/${this.caseInfo.ctmid}/assoc/${this.caseInfo.caseid}`;

            this.$http.post(URL,param).then(response => {
                let data = response.data;
                if( data.retcode == RETCODE_OK ){
                    this.relateCustomers.push({
                        id: contact.id,
                        type: 'contact',
                        name: contact.name
                    });

                    this.$Message.success('联系人添加成功！');
                }else if(data.retcode == 1){
                    this.$Message.error(data.errmsg.user[0] + data.errmsg.errmsg);
                } else {
                    this.$Message.error(data.errmsg);
                }
            });
        },
        removeCustomer(uid) {
            let param = {
                uid: uid,
                type: 'contact'
            };

            this.$ajax('post', `/biz/case/${this.caseInfo.ctmid}/assoc/${this.caseInfo.caseid}/del`, param, data => {
                if (data.data && data.data.name) {
                    this.$Message.error( `${data.data.name}为案件发布者，不能删除` );
                    return false;
                }

                this.relateCustomers = this.relateCustomers.filter(val => !(val.id == uid && val.type == param.type));

                this.$Message.success('联系人移除成功！');
            });
        },
        delCase(){
            this.$ajax('post', `/biz/case/${this.caseInfo.ctmid}/del/${this.caseInfo.caseid}`, data => {
                this.$router.push({name: 'businessList'});
            });
        },
    },
    filters: {
        timeFormat(s) {
            if (!s) {
                s = 0;
            }
            let hours = Math.floor(s / 3600);
            let minutes = Math.floor((s % 3600)/60);
            let seconds = s % 60;
            hours =  hours < 10? '0'+hours: ''+hours;
            minutes =  minutes < 10? '0'+minutes: ''+minutes;
            seconds =  seconds < 10? '0'+seconds: ''+seconds;
            return hours + '时' + minutes + '分' + seconds + '秒';
        }
    }
}
</script>