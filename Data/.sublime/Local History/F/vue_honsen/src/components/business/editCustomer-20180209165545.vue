<style lang="stylus">
.editCustomerwrap
    //
.infoEditModal
    .ivu-modal
        width: 1100px !important
        .ivu-modal-body
            padding-bottom: 0
            .customereditinfo
                position: relative
                max-height: 639px
                overflow-y: auto
                padding: 16px 76px 0
                .ivu-form-item
                        margin-bottom: 15px
                .customereditinfotop
                    padding: 0 0 14px
                    border-bottom: 1px solid #ebebeb
                .customereditinfotitle
                    font-size: 16px
                    padding: 12px 0 5px
                    .ivu-icon
                        font-size: 21px
                        margin: 0 0 0 15px
                        color: #3dc1ff
                        vertical-align: text-bottom
                        cursor: pointer
                .customereditinfobottom
                    margin: 0 -16px 0 0
                    padding: 11px 0 0
                    .ctmimg
                        height: 46px
                        width: 46px
                        border-radius: 50%
                        border: 1px solid #dedede
                        margin: 0 16px 15px 0
                        float: left
                        position: relative
                        cursor: pointer
                        img,.hoverdeldiv
                            width: 100%
                            height: 100%
                            border-radius: 50%
                        &:hover
                            .hoverdeldiv
                                display: block
                .itemlist
                    border-bottom: 1px dashed #e8e8e8
                    padding: 15px 0 0
                    &:last-child
                        border-bottom: none
</style>

<template>
    <div class="editCustomerwrap">
        <Modal
            v-model="infoEditModal"
            :closable="false"
            :mask-closable="false"
            width="545"
            class-name="groupmodal infoEditModal">
            <div class="modal_tit tag_tit">客户基本信息</div>
            <div class="customereditinfo">
                <div class="customereditinfotop">
                    <Form ref="customereditinfo" :model="customereditinfo" :rules="ruleValidate" :label-width="96">
                        <Row :gutter="60">
                            <Col span="12">
                                <FormItem prop="name" label="客户名称：">
                                    <Input v-model.trim="customereditinfo.name" placeholder="请输入客户名称"></Input>
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem label="法人代表：">
                                    <Input v-model.trim="customereditinfo.legalname" placeholder="请输入法人代表"></Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row :gutter="60">
                            <Col span="12">
                                <FormItem prop="url" label="网　　址：">
                                    <Input v-model.trim="customereditinfo.url" placeholder="请输入网址"></Input>
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem label="地　　址：">
                                    <Input v-model.trim="customereditinfo.address" placeholder="请输入地址"></Input>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <p v-if="0" class="customereditinfotitle">添加关联企业<span @click="addNewassoc"><Icon type="android-add-circle"></Icon></span></p>
                <div v-if="0" class="customereditinfotop">
                    <transition-group tag="div" name="grouplist">
                        <Form v-for="(list, index) in customereditassoc" :ref="'customereditassoc' + index" :model="list" :rules="ruleValidate" :label-width="96" :key="list.random" class="itemlist">
                            <Row :gutter="60">
                                <Col span="10">
                                    <FormItem prop="name" label="企业名称：">
                                        <Input v-model.trim="list.name" placeholder="请输入企业名称"></Input>
                                    </FormItem>
                                </Col>
                                <Col span="10">
                                    <FormItem label="法人代表：">
                                        <Input v-model.trim="list.legalname" placeholder="请输入法人代表"></Input>
                                    </FormItem>
                                </Col>
                                <Col span="4">
                                    <Button @click="delassoc(index)" type="ghost" long>删除此企业</Button>
                                </Col>
                            </Row>
                            <Row :gutter="60">
                                <Col span="10">
                                    <FormItem prop="url" label="网　　址：">
                                        <Input v-model.trim="list.url" placeholder="请输入网址"></Input>
                                    </FormItem>
                                </Col>
                                <Col span="10">
                                    <FormItem label="地　　址：">
                                        <Input v-model.trim="list.address" placeholder="请输入地址"></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                    </transition-group>
                </div>
                <p class="customereditinfotitle">添加联系人<span @click="show_addMember_modal = true"><Icon type="android-add-circle"></Icon></span></p>
                <div class="customereditinfobottom">
                    <div v-if="customereditcontact.length" class="clearfix">
                        <transition-group tag="div" name="grouplist">
                            <div @click="delcontact(index)" v-for="(list, index) in customereditcontact" class="ctmimg" :key="list.id">
                                <img :src="`${imgUrl}/uploads/avatar/${list.id}.jpg`">
                                <div class="hoverdeldiv">
                                    <Icon type="minus-round"></Icon>
                                </div>
                            </div>
                        </transition-group>
                    </div>
                </div>
                <Spin size="large" fix v-if="loading">
                    <Icon type="load-c" size="18" class="spin-icon-load"></Icon>
                    <div>加载中...</div>
                </Spin>
            </div>
            <div slot="footer">
                <Button @click="infoEditOK(1)" type="info">确 定</Button>
                <Button @click="infoEditOK(0)" type="info" class="gray_btn">取 消</Button>
            </div>
        </Modal>
        <addMember
            v-if="show_addMember_modal"
            title="添加联系人"
            :initSelectedUserIds="customereditcontact"
            :noLawyer="true"
            @close="close_addMember_modal"
            @selected-users="get_addMember_users">
        </addMember>
    </div>
</template>

<script>
import addMember from '@/components/common/addMember';

export default {
    name: 'editCustomerwrap',
    data () {
        const validateUrl = (rule, value, callback) => {
            if (value != '' && value !== null) {
                if (/(https?:\/\/)?[\w-]+(\.[\w-]+)+(:[0-9]{2,4})?(\/[\w\?\+\.#=@&%-]+)*(\/)?/i.test(value)) {
                    callback();
                } else {
                    callback(new Error('网址格式错误！'));
                }
            } else {
                callback();
            }
        };
        return {
            imgUrl,
            customereditinfo_normal: {},
            customereditinfo: {},
            customereditcontact: [],
            customereditcontact_normal: [],
            customereditassoc: [],
            customerdelassoc: [],
            ruleValidate: {
                name: [
                    { required: true, message: '客户名称不能为空', trigger: 'change' }
                ],
                url: [
                    { validator: validateUrl, trigger: 'change' }
                ],
                usertolltype: [
                    { required: true, type: 'number', message: '收费类别不能为空', trigger: 'change' }
                ],
                timerange: [
                    { required: true, type: 'array', message: '日期范围不能为空', trigger: 'change' }
                ],
                money: [
                    { required: true, message: '费用不能为空', trigger: 'change' }
                ]
            },
            show_addMember_modal: false,
            loading: false
        }
    },
    props: {
        ctmid: {
            type: Number
        },
        display: {
            type: Boolean
        }
    },
    computed: {
        infoEditModal() {
            return this.display
        }
    },
    beforeMount() {
        if( this.ctmid ){
            this.getCtmInfo();
            this.getCTMContact();
            // this.getCTMCompany();
        }else{
            this.$Message.error('客户id错误');
        }
    },
    mounted() {

    },
    methods: {
        getCtmInfo() {
            this.$ajax('get', `/biz/customer/info/${this.ctmid}`, (data) => {
                this.customereditinfo = data.data[0];
                this.customereditinfo_normal = JSON.parse(JSON.stringify(data.data[0]));
            });
        },
        getCTMContact() {
            this.$ajax('get', `/biz/customer/${this.ctmid}/contact/list`, { detail: 0}, (data) => {
                this.customereditcontact = data.data;
                this.customereditcontact_normal = JSON.parse(JSON.stringify(data.data));
            });
        },
        getCTMCompany() {
            this.$ajax('get', `/biz/customer/${this.ctmid}/assoc/list`, { detail: 1}, (data) => {
                let v = data.data;
                v.forEach(e => {
                    e.random = Math.random().toString();
                });
                this.customereditassoc = v;
            });
        },
        changeCtmInfo() {
            if( this.customereditinfo_normal.name == this.customereditinfo.name && this.customereditinfo_normal.legalname == this.customereditinfo.legalname && this.customereditinfo_normal.address == this.customereditinfo.address && this.customereditinfo_normal.url == this.customereditinfo.url ){
                return false;
            }
            let params;
            params = { name: this.customereditinfo.name, legalname: this.customereditinfo.legalname || '', address: this.customereditinfo.address || '', url: this.customereditinfo.url || ''};

            return this.$http.post(`/biz/customer/store/${this.ctmid}`, params).then(response => {

            });
        },
        changeCTMCompany(e) {
            let url;
            if( e.ctmaid ){
                url = `/biz/customer/${this.ctmid}/assoc/store/${e.ctmaid}`;
            }else{
                url = `/biz/customer/${this.ctmid}/assoc/store`;
            }

            return this.$http.post(url, { name: e.name, legalname: e.legalname || '', address: e.address || '', url: e.url || ''}).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    e.ctmaid = response.data.ctmaid;
                }
            });
        },
        delCTMCompany(ctmaid) {
            return this.$http.post(`/biz/customer/${this.ctmid}/assoc/del/${ctmaid}`).then(response => {

            });
        },
        changeCTMContact() {
            let ctmeditctc = this.customereditcontact;
            if( ctmeditctc.map((val) => { return val.id}).sort().toString() == this.customereditcontact_normal.map((val) => { return val.id}).sort().toString() ){
                return false;
            }

            return this.$http.post(`/biz/customer/${this.ctmid}/contact/import`, { uids: ctmeditctc.map((val) => { return val.id}), cover: 1}).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    let v = response.data.data;
                    let narr = ctmeditctc;
                    if( v ){
                        this.customereditcontact.push(v);
                        this.$Message.error( v.name + '是此业务发布者，无法删除！' );
                    }
                    this.contactlist = narr;
                }
            });
        },
        infoEditOK(t) {
            if( t ){
                let pass = false;
                this.$refs.customereditinfo.validate((valid) => {
                    if( valid ) {
                        pass = true;
                    }else{
                        pass = false;
                        this.$Message.error('表单未填写正确！');
                    }
                });

                if( !pass ){
                    return false;
                }

                if( this.customereditassoc.length ){
                    for( let i in this.customereditassoc ){
                        this.$refs['customereditassoc' + i][0].validate((valid) => {
                            if( valid ) {
                                pass = true;
                            }else{
                                pass = false;
                                this.$Message.error('表单未填写正确！!');
                            }
                        })
                        if( !pass ){
                            return false;
                        }
                    }
                }

                if( !pass ){
                    return false;
                }
                this.loading = true;
                // this.changeCtmInfo();
                let delarr = [];
                this.customerdelassoc.forEach(e => {
                    delarr.push(this.delCTMCompany(e));
                });
                let changearr = [];
                this.customereditassoc.forEach(e => {
                    changearr.push(this.changeCTMCompany(e));
                });
                // this.changeCTMContact();
                let _this = this;
                this.$http.all([this.changeCtmInfo(), ...delarr, ...changearr, this.changeCTMContact()]).then(this.$http.spread(function (acct, perms) {
                    // 请求都执行完成
                    // 抛出新数据
                    _this.loading = false;
                    _this.$emit('getUserInfo', _this.customereditinfo);
                    //_this.$emit('getCompany', _this.customereditassoc);
                    //_this.$emit('getContact', _this.customereditcontact);
                    _this.$emit('update:display', false);
                    _this.$Message.success('更改客户信息成功！');
                }));
            }else{
                this.$refs.customereditinfo.resetFields();
                if( this.customereditassoc.length ){
                    for( let i in this.customereditassoc ){
                        this.$refs['customereditassoc' + i][0].resetFields();
                    }
                }
                this.$emit('update:display', false);
            }
        },
        close_addMember_modal() {
            this.show_addMember_modal = false;
        },
        get_addMember_users(users, ids, isNoChange) {
            this.show_addMember_modal = false;
            this.customereditcontact = users;
        },
        addNewassoc() {
            this.customereditassoc.push({ name: '', legalname: '', address: '', url: '', random: Math.random().toString()});
        },
        delassoc(i) {
            let confirmfn = () => {
                this.$Modal.confirm({
                    title: '确认对话框',
                    content: '确定删除吗？',
                    onOk: () => {
                        let arr = this.customereditassoc.splice(i, 1);
                        this.customerdelassoc.push(arr[0].ctmaid);
                    },
                    onCancel: () => {
                        //this.$Message.info('点击了取消');
                    }
                });
            };
            if( this.customereditassoc[i].ctmaid ){
                confirmfn();
            }else{
                if( this.customereditassoc[i].name != '' ){
                    confirmfn();
                }else{
                    this.customereditassoc.splice(i, 1);
                }
            }
        },
        delcontact(i) {
            this.$Modal.confirm({
                title: '确认对话框',
                content: '确定删除吗？',
                onOk: () => {
                    this.customereditcontact.splice(i, 1);
                },
                onCancel: () => {
                    //this.$Message.info('点击了取消');
                }
            });
        }
    },
    components: {
        addMember
    }
}
</script>
