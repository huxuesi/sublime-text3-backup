<style lang="stylus">
bgColor = #65778b
.customerdetails
    padding: 20px 0 0
    .ivu-card-body
        padding: 0
        .head
            height: 40px
            line-height: 40px
            background: bgColor
            padding: 0 10px
            // color: #fff
            border-radius: 3px 3px 0 0
            .ivu-icon
                color: #fff
                font-size: 24px
                vertical-align: text-top
                margin: 0 9px 0 0
            a.navitem
                color: #fff
                display: inline-block
                margin: 0 30px 0 0
                height: 100%
                &.active
                    color: #fff
                    // border-bottom: 2px solid #fff
            .rightedit
                float: right
                button
                    vertical-align: initial
                    position: relative
                    top: -1px
                .edit
                    background: #00aeff
                .del
                    background: #b4c6d1
                    border-color: #b4c6d1
                    margin: 0 0 0 9px
            .bigtit
                color: #fff
    .customerinfo
        .center
            font-size: 14px
            padding: 0 50px 0
            color: #4b4b4b
            .customerinfolist
                border-bottom: 1px solid #e8e8e8
                &:last-child
                    border-bottom: none
                .itemlist
                    padding: 20px 0 10px
                    border-bottom: 1px dashed #e8e8e8
                    &:last-child
                        border-bottom: none
                    .item
                        margin: 0 0 10px
                .title
                    color: #2c2c2c
                    font-size: 16px
                    padding: 14px 0 0
            .ctmimg
                height: 46px
                width: 46px
                border-radius: 50%
                border: 1px solid #dedede
                margin: 0 16px 15px 0
                float: left
                cursor: pointer
                img
                    width: 100%
                    height: 100%
                    border-radius: 50%
            .khinfolist
                margin: 0 -16px 0 0
                padding: 0 0 8px 0
    .caseinfowrap
        margin: 38px 0 0
        .center
            padding: 28px 50px
            color: #686868
            font-size: 12px
            .content
                padding: 0 0 0 26px
                height: 38px
                line-height: 38px
                border-bottom: 1px solid #ebebeb
                a.name
                    color: #686868
                    display: block
                    max-width: 360px
                    float: left
            .headtitle
                .content
                    background: #f0f0f0
                    font-size: 14px
            .businesslistpage
                text-align: center
                margin: 20px 0 0
            .posirelative
                height: 152px
    .userestimate
        .center
            font-size: 14px
            .ivu-form-item
                margin: 0
            .nodatalist
                padding: 50px 0
            .addusertolltype
                font-size: 26px
                color: #3dc1ff
                margin: 0 0 0 12px
                line-height: 30px
                cursor: pointer
            .usertolltypelistwrap
                margin: 22px 0 0
                .usertolltypelist
                    margin: 0 0 8px
                    .ivu-col
                        padding: 0 40px 0 18px
                        height: 43px
                        line-height: 43px
                        border: 1px solid #dcdcdc
                        border-left: 1px solid #dcdcdc
                        border-right: none
                        &:last-child
                            border: none
                            border-left: 1px solid #dcdcdc
                            padding-right: 0
                        .ivu-input
                            border: none
                            box-shadow: none
                            height: 41px
                        .money
                            .ivu-input
                                text-align: right
                        .iconedit
                            display: inline-block
                            width: 43px
                            text-align: center
                            font-size: 22px
                            cursor: pointer
                            color: #b4c6d1
                            &:hover
                                color: #3dc1ff
                        .ivu-date-picker
                            vertical-align: top
                            .ivu-input-icon
                                height: 41px
                                line-height: 41px
                            .ivu-select-dropdown
                                font-size: 12px
                            & ~ .ivu-form-item-error-tip
                                right: 21px
                    &:hover
                        .ivu-col
                            border: 1px solid #3dc1ff
                            border-left: 1px solid #dcdcdc
                            border-right: none
                            &:first-child
                                border-left: 1px solid #3dc1ff
                            &:last-child
                                border: none
                                border-left: 1px solid #3dc1ff
                    .ivu-form-item
                        display: inline-block
                        .ivu-form-item-error-tip
                            height: 32px
                            line-height: 32px
    .bslcaselist
        .nodatalist
            padding: 65px 0
    .customerkeepwrap
        margin-top: 25px
        .head
            padding: 0 0 0 10px
            .rightedit
                .create_btn_wrap
                    float right
                    position relative
                    height 100%
                    .createflow
                        height: 40px
                        vertical-align: top
                        top: 0
                        font-size: 16px
                        padding: 0 6px 0 18px
                        .ivu-icon
                            vertical-align: bottom
                    .ivu-poptip-popper
                        top 42px !important
                        z-index 1101
                    .ivu-poptip-body
                        padding 30px !important
                    .create_flow_panel_tit
                        margin-bottom 15px
                        font-size 14px
                        color #7a7a7a
                    .create_flow_panel_btn_wrap
                        margin-top 20px
                        text-align center
        .customerkeepcenter
            min-height: 322px
</style>

<template>
    <div class="customerdetails">
        <Card class="customerinfo" dis-hover>
            <div class="head">
                <Icon type="social-buffer"></Icon><span class="bigtit">客户基本信息</span>
                <div class="rightedit">
                    <Button @click="openCTMEdit" class="edit" type="info">编辑</Button><Button @click="delCTM" class="del" type="info">删除</Button>
                </div>
            </div>
            <div class="center">
                <div class="customerinfolist">
                    <Row class="itemlist" :gutter="16">
                        <Col class="item" span="8">
                            <table>
                                <tr>
                                    <td style=" white-space: nowrap; vertical-align: top;">客户名称：</td>
                                    <td><strong>{{userinfo.name}}</strong></td>
                                </tr>
                            </table>
                        </Col>
                        <Col class="item" span="8">
                            <table>
                                <tr>
                                    <td>法人代表：</td>
                                    <td>{{userinfo.legalname}}</td>
                                </tr>
                            </table>
                        </Col>
                        <Col class="item" span="8">
                            <table>
                                <tr>
                                    <td style=" white-space: nowrap; vertical-align: top;">网　　址：</td>
                                    <td>{{userinfo.url}}</td>
                                </tr>
                            </table>
                        </Col>
                        <Col class="item" span="24">
                            <table>
                                <tr>
                                    <td style=" white-space: nowrap; vertical-align: top;">地　　址：</td>
                                    <td>{{userinfo.address}}</td>
                                </tr>
                            </table>
                        </Col>
                    </Row>
                </div>
                <div v-if="0" class="customerinfolist">
                    <p class="title">关联企业</p>
                    <Row v-for="list in companylist" class="itemlist" :gutter="16" :key="list.ctmaid">
                        <Col class="item" span="8">
                            <table>
                                <tr>
                                    <td style=" white-space: nowrap; vertical-align: top;">客户名称：</td>
                                    <td><strong>{{list.name}}</strong></td>
                                </tr>
                            </table>
                        </Col>
                        <Col class="item" span="8">
                            <table>
                                <tr>
                                    <td style=" white-space: nowrap; vertical-align: top;">法人代表：</td>
                                    <td>{{list.legalname}}</td>
                                </tr>
                            </table>
                        </Col>
                        <Col class="item" span="8">
                            <table>
                                <tr>
                                    <td style=" white-space: nowrap; vertical-align: top;">网　　址：</td>
                                    <td>{{list.url}}</td>
                                </tr>
                            </table>
                        </Col>
                        <Col class="item" span="24">
                            <table>
                                <tr>
                                    <td style=" white-space: nowrap; vertical-align: top;">地　　址：</td>
                                    <td>{{list.address}}</td>
                                </tr>
                            </table>
                        </Col>
                    </Row>
                </div>
                <div v-if="contactlist.length" class="customerinfolist khinfolist clearfix">
                    <p class="title"><strong>客户</strong></p>
                    <div class="itemlist">
                        <transition-group tag="div" name="grouplist">
                            <div v-for="list in contactlist" @click="$router.push({ name: 'personalCenter', params: { id: list.id}})" :title="list.name" class="ctmimg" :key="list.id">
                                <img :src="`${imgUrl}/uploads/avatar/${list.id}.jpg`">
                            </div>
                        </transition-group>
                    </div>
                </div>
            </div>
        </Card>
        <Card class="caseinfowrap bslcaselist" dis-hover>
            <div class="head">
                <Icon type="ios-paper"></Icon><span class="bigtit">案件</span>
            </div>
            <div class="center">
                <Row class="headtitle">
                    <Col span="9"><div class="content">案件名称</div></Col>
                    <Col span="5"><div class="content">处理进度</div></Col>
                    <Col span="4"><div class="content">案件归属人</div></Col>
                    <Col span="6"><div class="content">创建时间</div></Col>
                </Row>
                <div class="posirelative">
                    <Row v-for="list in bsllist" :key="list.caseid" class="contentwrap">
                        <Col span="9"><div class="content"><a @click.prevent="$router.push({ name: 'caseEdit', params: { caseid: list.caseid}})" class="name single_ellipsis" :href="`/business/caseEdit/${list.caseid}`">{{list.casename}}</a></div></Col>
                        <Col v-if="list.status" span="5"><div class="content">已完成</div></Col>
                        <Col v-else span="5"><div class="content">已处理 {{list.created_at | timeconvert2}}</div></Col>
                        <Col span="4"><div class="content">{{list.belongname}}</div></Col>
                        <Col span="6"><div class="content">{{list.created_at | timeconvert}}</div></Col>
                    </Row>
                    <div v-if="!bslloading && !bsllist.length" class="nodatalist">
                        无相关的案件列表！
                    </div>
                    <Spin size="large" fix v-if="bslloading">
                        <Icon type="load-c" class="spin-icon-load"></Icon>
                        <div>加载中...</div>
                    </Spin>
                </div>
                <div class="businesslistpage">
                    <Page v-if="bsltotal > bslperpage" :total="bsltotal" :page-size="bslperpage" @on-change="bslChangPage"></Page>
                </div>
            </div>
        </Card>
        <Card v-if="0" class="caseinfowrap userestimate" dis-hover>
            <div class="head">
                <Icon type="ios-compose"></Icon><a @click="distype = 'estimate'" :class="{ active: distype == 'estimate'}" class="navitem" href="javascript:;">客户评估</a><!-- <a @click="distype = 'usertoll'" :class="{ active: distype == 'usertoll'}" class="navitem" href="javascript:;">客户收费</a> -->
                <div v-if="distype == 'estimate'" class="rightedit">
                    <Button v-if='!estimateEditing' @click="estimateEditing = true, estimateipt = userinfo.estimate" class="edit" type="info">编辑</Button>
                    <Button v-if="estimateEditing" @click="estimateOK" class="edit" type="info">提交</Button>
                    <Button v-if="estimateEditing" @click="estimatecancel" class="del" type="info">取消</Button>
                </div>
            </div>
            <div class="center">
                <div class="disestimate" v-if="distype == 'estimate'">
                    <div v-if="!estimateEditing">
                        <div class="text-content" v-if="userinfo.estimate" v-html="userinfo.estimate"></div>
                        <div v-else class="nodatalist">
                            未编辑任何内容！
                        </div>
                    </div>
                    <div v-else>
                        <editor :content="estimateipt || ''" ref="ctmueditor" aboutType="biz_customers" :aboutId="userinfo.ctmid" :flag="'obj' + userinfo.ctmid"></editor>
                    </div>
                </div>
                <div v-if="distype == 'usertoll'">
                    <Row>
                        <Col span="10">
                            <Form ref="usertolltypeform" :model="usertolltypeform" :rules="ruleValidate">
                                <FormItem prop="usertolltype">
                                    <Select v-model.trim="usertolltypeform.usertolltype" class="selectselectwrap" placeholder="--- 请选择收费类别 ---">
                                        <Option v-for="(list, index) in usertolltypeform.arr" :value="index" :key="index">{{list}}</Option>
                                    </Select>
                                </FormItem>
                            </Form>
                        </Col>
                        <Col span="14">
                            <span @click="addusertollarr"><Icon class="addusertolltype" type="android-add-circle"></Icon></span>
                        </Col>
                    </Row>
                    <div class="usertolltypelistwrap">
                        <div v-for="(list, index) in usertollarrform.arr" class="usertolltypelist">
                            <Form :ref="'usertollarrform' + index" :model="list" :rules="ruleValidate" :key="index">
                                <Row>
                                    <Col span="7">{{usertolltypeform.arr[list.type]}}</Col>
                                    <Col span="8">
                                        <FormItem prop="timerange">
                                            <DatePicker :value="list.timerange" @on-change="changeTimeRange($event, list)" type="daterange" :options="daterangeOptions" format="yyyy/MM/dd" placeholder="请选择日期范围" style="width: 211px"></DatePicker>
                                        </FormItem>
                                    </Col>
                                    <Col span="6">
                                        <FormItem prop="money">
                                            <Input @on-change="changeMoney($event, list)" v-model.trim="list.money" class="money"></Input>
                                        </FormItem> 元
                                    </Col>
                                    <Col span="3">
                                        <span v-if="list.issend" @click="finishUserTollArr(list, index)" class="iconedit" title="提交"><Icon type="checkmark-round"></Icon></span><span @click="delUserTollArr(index)" class="iconedit" title="删除"><Icon type="trash-a"></Icon></span>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
        <!-- 客户跟进 -->
        <Card class="customerkeepwrap" :bordered="false" dis-hover style="background: transparent">
            <div class="head">
                <Icon type="ios-compose"></Icon><span class="bigtit">客户跟进</span>
                <div class="rightedit">
                    <Poptip
                        v-model="showCreateFlowPanel"
                        class="create_btn_wrap"
                        placement="bottom-end"
                        width="320"
                        trigger="click"
                        :transfer="false">
                        <Button type="info" class="createflow">
                            创建流程 <Icon type="android-add-circle"></Icon>
                        </Button>
                        <div class="create_flow_panel" slot="content">
                            <div class="create_flow_panel_tit">创建流程</div>
                            <Input v-model.trim="flowName" ref="create_flow_input" @on-keyup.enter="createParentFlow" placeholder="输入流程名称"></Input>
                            <div class="create_flow_panel_btn_wrap">
                                <Button type="primary" style="margin-right: 10px" @click="createParentFlow">提 交</Button>
                                <Button type="primary" class="gray_btn" @click="showCreateFlowPanel = false">取 消</Button>
                            </div>
                        </div>
                    </Poptip>
                </div>
            </div>
            <div v-if="userinfo.followupcaseid" class="customerkeepcenter">
                <z_caseFlowWrap :id="userinfo.followupcaseid" type="customer" typeInfo="跟进进展" @createFlow="showCreateFlowPanelFn" ref="customerFlow"></z_caseFlowWrap>
            </div>
        </Card>
        <!-- end -->
        <editCustomer v-if="userinfo.ctmid && infoEditModal" @getUserInfo="getUserInfoEdit" :ctmid="userinfo.ctmid" :display.sync="infoEditModal"></editCustomer>
    </div>
</template>

<script>
import moment from 'moment';
import addMember from '@/components/common/addMember';
import editor from '@/components/common/editor';
import editCustomer from '@/components/business/editCustomer';
import z_caseFlowWrap from '@/components/common/z-caseFlowWrap';

export default {
    name: 'customerDetails',
    data () {
        return {
            imgUrl,
            ctmid: '',
            distype: 'estimate',
            userinfo: {},
            estimateEditing: false,
            estimateipt: '',
            companylist: [],
            contactlist: [],
            infoEditModal: false,
            ruleValidate: {
                name: [
                    { required: true, message: '客户名称不能为空', trigger: 'change' }
                ],
                url: [
                    { type: 'url', message: '网址格式错误', trigger: 'change' }
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
            bsllist: [],
            bslpage: 1,
            bslperpage: 4,
            bsltotal: 0,
            bslloading: false,
            daterangeOptions: {
                shortcuts: [
                    {
                        text: '最近一周',
                        value () {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            return [start, end];
                        }
                    },
                    {
                        text: '最近一个月',
                        value () {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            return [start, end];
                        }
                    },
                    {
                        text: '最近三个月',
                        value () {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            return [start, end];
                        }
                    },
                    {
                        text: '最近一年',
                        value () {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
                            return [start, end];
                        }
                    }
                ]
            },
            usertolltypeform: {
                usertolltype: '',
                arr: ['长期法律顾问费用', '诉讼费用', '咨询费用']
            },
            usertollarrform: {
                arr: [
                    { type: 0, timerange: ['2016-01-01', '2017-02-15'], money: '123456789', issend: false},
                    { type: 1, timerange: ['2016-01-01', '2017-02-15'], money: '123456789', issend: false},
                    { type: 2, timerange: '', money: '123456789', issend: false}
                ]
            },
            showCreateFlowPanel: false,
            flowName: '',
        }
    },
    components: { addMember, editor, editCustomer, z_caseFlowWrap},
    beforeMount() {
        moment.locale('zh-cn');
        this.ctmid = this.$route.params.ctmid;
        if( this.ctmid ){
            this.getCtmInfo();
            this.getBslList();
            this.getCTMContact();
            // this.getCTMCompany();
        }else{
            console.log('客户id错误');
        }
    },
    mounted() {

    },
    methods: {
        getCtmInfo() {
            this.$http.get(`/biz/customer/info/${this.ctmid}`).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    this.userinfo = response.data.data[0];
                }else{
                    this.$Message.error( response.data.errmsg );
                }
            }).catch(err => {

            });
        },
        bslChangPage(page) {
            this.bslpage = page;
            this.getBslList();
        },
        getBslList() {
            this.bslloading = true;
            this.$http.get(`/biz/customer/caselist/${this.ctmid}`, { params: { page: this.bslpage, perpage: this.bslperpage, detail: 1}}).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    let v = response.data.data;
                    this.bsllist = v.data;
                    this.bsltotal = v.total;
                }else{
                    this.$Message.error( response.data.errmsg );
                }
                this.bslloading = false;
            }).catch(err => {
                this.bslloading = false;
            });
        },
        getCTMCompany() {
            this.$http.get(`/biz/customer/${this.ctmid}/assoc/list`, { params: { detail: 1}}).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    let v = response.data.data;
                    v.forEach(e => {
                        e.random = Math.random().toString();
                    });
                    this.companylist = v;
                }else{
                    this.$Message.error( response.data.errmsg );
                }
            }).catch(err => {

            });
        },
        getCTMContact() {
            this.$http.get(`/biz/customer/${this.ctmid}/contact/list`, { params: { detail: 0}}).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    this.contactlist = response.data.data;
                }else{
                    this.$Message.error( response.data.errmsg );
                }
            }).catch(err => {

            });
        },
        openCTMEdit() {
            this.infoEditModal = true;
        },
        // t 为 true 就是修改客户评估
        changeCtmInfo(t) {
            let params;
            if( t ){
                params = { estimate: this.estimateipt};
            }
            this.$http.post(`/biz/customer/store/${this.ctmid}`, params).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    if( t ){
                        this.userinfo.estimate = this.estimateipt;
                    }
                }else{
                    this.$Message.error( response.data.errmsg );
                }
            }).catch(err => {

            });
        },
        delCTM() {
            this.$Modal.confirm({
                title: '确认对话框',
                content: '确认删除此客户吗？（此客户下的所有案件也会被删除）',
                onOk: () => {
                    this.$http.post(`/biz/customer/del/${this.ctmid}`).then(response => {
                        if( response.data.retcode == RETCODE_OK ){
                            this.$router.push({ name: 'businessList'});
                        }else{
                            this.$Message.error('不是自己的客户，无法删除！');
                            // this.$Message.error( response.data.errmsg );
                        }
                    }).catch(err => {

                    });
                },
                onCancel: () => {
                    //this.$Message.info('点击了取消');
                }
            });
        },
        estimateOK() {
            this.estimateipt = this.$refs.ctmueditor.get_content();
            if( this.estimateipt == this.userinfo.estimate ){
                return false;
            }
            this.changeCtmInfo(1);
            this.estimateEditing = false;
        },
        estimatecancel() {
            this.estimateEditing = false;
        },
        addusertollarr() {
            this.$refs.usertolltypeform.validate((valid) => {
                if( valid ){
                    this.usertollarrform.arr.push({ type: this.usertolltypeform.usertolltype, timerange: '', money: '', issend: true});
                }else{

                }
            });
        },
        changeTimeRange(e, t) {
            t.timerange = e;
            t.issend = true;
        },
        changeMoney(e, t) {
            t.issend = true;
        },
        delUserTollArr(i) {
            this.$Modal.confirm({
                title: '确认对话框',
                content: '确定删除吗？',
                onOk: () => {
                    this.usertollarrform.arr.splice(i, 1);
                },
                onCancel: () => {
                    //this.$Message.info('点击了取消');
                }
            });
        },
        finishUserTollArr(e, i) {
            this.$refs['usertollarrform' + i][0].validate((valid) => {
                if( valid ){
                    console.log(e);
                    e.issend = false;
                }else{

                }
            });
        },
        getUserInfoEdit(info) {
            this.getCtmInfo();
            this.getCTMContact();
            // this.getCTMCompany();
        },
        createParentFlow() {
            if(!this.flowName){
                this.showCreateFlowPanel = false;
                return;
            }

            this.$ajax('post', `/biz/flow/${this.userinfo.followupcaseid}/store`, { name: this.flowName}, data => {
                let newFlow = {
                    casefid: data.casefid,
                    caseid: this.userinfo.followupcaseid,
                    content: '',
                    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                    creator: this.$store.state.mineInfo.id,
                    creator_user: {
                        name: this.$store.state.mineInfo.name,
                        id: this.$store.state.mineInfo.id,
                        vip: this.$store.state.mineInfo.auth_code
                    },
                    filesjson: [],
                    keeps: [],
                    name: this.flowName,
                    parent_fid: null,
                    sub_fids: [],
                    used_time: 0,
                    total: 0,
                    locked: 0,

                    timer: -1,
                    record_time: 0,
                    is_editing: false,
                    editname: '',
                    add_subflow_panel: false,
                    show_create_sub_flow: false,
                    create_sub_flow_text: '',

                    curTab: 'content',
                };

                newFlow.curFlow = newFlow;


                this.flowName = '';
                this.showCreateFlowPanel = false;

                this.$refs.customerFlow.pushFlowList(newFlow);
                // this.aFlows.push(newFlow)
                // this.$nextTick(() => {
                //     toTop(`flow${data.casefid}`);
                // });
            });
        },
        showCreateFlowPanelFn() {
            this.showCreateFlowPanel = true;
        }
    },
    watch: {
        showCreateFlowPanel(newVal) {
            if (newVal) {
                this.$nextTick(() => {
                    this.$refs.create_flow_input.focus();
                });
            }
        }
    },
    filters: {
        timeconvert(date) {
            return moment(date).format('YY/MM/DD HH:mm');
        },
        timeconvert2(date) {
            return moment(date).fromNow(true);
        }
    }
}
</script>
