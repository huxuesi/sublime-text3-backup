<style lang="stylus">
.orderManagement
    .wrap
        padding 50px 0
        .tit
            a
                color: #4d4d4d
                &.active
                    color: #24b4f8
                    font-weight: bold
        .main
            padding: 36px 0 0
        .invoicemain
            margin: 14px 0 0
            padding: 32px 0 0
            border-top: 1px solid #dcdcdc
            .invoicetips
                font-size: 12px
                margin: 0 0 40px
                p
                    margin: 3px 0
                .tit
                    font-size: 13px
                    color: #4c4c4c
                    font-weight: bold
            .invoiceselecttitle
                margin-bottom: 17px
                .invoiceselectmoney
                    float: left
                    span
                        color: #f00
                .invoiceselectedit
                    float: right
                    button:last-child
                        margin-left: 10px
                        background-color: #65778b;
                        border-color: #65778b;
    .ivu-table
        .custom-table-row
            font-size 12px
    td.red-column
        color: #f00
.getinvoicewrap_modal
    .getinvoicewrap
        padding: 30px 45px 0
        .giiw_tips
            color: #434343
            font-size: 12px
            font-weight: bold
            margin-bottom: 21px
            .red
                color: #ff0606
            .nobold
                font-weight: normal
        .ivu-form
            .ivu-col
                & > .ivu-form-item
                    margin-bottom: 7px
        .line
            margin: 17px 0 24px
            border-bottom: 1px solid #dcdcdc
.getinvoicehistorywrap_modal
    .getinvoicehistorywrap
        padding: 24px 45px 0
        max-height: 460px
        overflow-y: auto
    .ivu-table
        .custom-table-row
            font-size 12px
    td.red-column
        color: #f00
</style>

<template>
    <div class="orderManagement">
        <Row class="wrap">
            <Col span="24" class="tit">
                <a @click="curbignav = 'payment'" :class="{ active: curbignav == 'payment'}" href="javascript:;">续费管理</a>
                &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                <a @click="curbignav = 'records'" :class="{ active: curbignav == 'records'}" href="javascript:;">订单记录</a>
                &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                <a @click="curbignav = 'invoice'" :class="{ active: curbignav == 'invoice'}" href="javascript:;">发票申请</a>
            </Col>

            <Col v-if="curbignav == 'payment'" span="24" class="main paymentmain">
                <Table
                    :loading="tableLoading"
                    :columns="paymentColumns"
                    :data="paymentData"
                    :row-class-name="rowClassName"
                    no-data-text="暂无待续费的订单">
                </Table>
            </Col>
            <Col v-if="curbignav == 'records'" span="24" class="main recordsmain">
                <Table
                    :loading="tableLoading"
                    :columns="recordsColumns"
                    :data="recordsData"
                    :row-class-name="rowClassName"
                    no-data-text="暂无已支付订单">
                </Table>
            </Col>
            <Col v-if="curbignav == 'invoice'" span="24" class="main invoicemain">
                <div class="invoicetips">
                    <p class="tit">[开票须知]</p>
                    <p>* 发票基于订单开具（单个订单不可拆分开票）。</p>
                    <p>* 申请普通发票需填写税号信息，否则将无法应税使用，请及时维护您的税号信息。</p>
                    <p>* 提供电子发票，电子发票与传统纸质发票具有同等法律效力，可作单位报销凭证。</p>
                    <p>* 发票一经开具，非我司原因将无法重开，请务必仔细核对开票信息。</p>
                </div>
                <div class="invoiceselecttitle clearfix">
                    <p class="invoiceselectmoney">已选金额：<span>￥{{selectallmoneny}}</span></p>
                    <p class="invoiceselectedit">
                        <Button @click="getInvoice" type="info">索要发票</Button>
                        <Button @click="getInvoiceHistory" class="listbtn" type="info">发票列表</Button>
                    </p>
                </div>
                <Table
                    :loading="tableLoading"
                    :columns="invoiceColumns"
                    :data="invoiceData"
                    :row-class-name="rowClassName"
                    @on-selection-change="selectionChange"
                    no-data-text="暂无需要开发票的订单">
                </Table>
            </Col>
        </Row>
        <pay v-if="show_pay_modal" @close="close_pay"></pay>
        <Modal
            v-model="getinvoicepanel"
            :closable="false"
            :mask-closable="false"
            width="787"
            class-name="getinvoicewrap_modal">
            <div class="modal_tit">填写信息<i class="ivu-icon ivu-icon-ios-close-empty" @click="getinvoicepanel = false"></i></div>
            <div class="getinvoicewrap">
                <p class="giiw_tips">您选取了 <span class="red">{{selectallList.length}}</span> 条订单开具发票 <span class="nobold">(若选中多条订单，订单金额将合并开具一张票据中)</span></p>
                <Form :model="getinvoiceform" :rules="ruleValidate" ref="getinvoiceform" label-position="left" :label-width="100">
                    <Row>
                        <Col span="12">
                            <FormItem label="发票抬头：" prop="header">
                                <Input v-model.trim="getinvoiceform.header"></Input>
                            </FormItem>
                            <FormItem label="税号：" prop="revenuenumber">
                                <Input v-model.trim="getinvoiceform.revenuenumber"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="9">
                            <FormItem label="开具类型：">
                                <Select v-model.trim="getinvoiceform.type" class="selectselectwrap">
                                    <Option :value="0" :key="0">企业</Option>
                                    <Option :value="1" :key="1">个人</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="发票类型：">
                                <Select v-model.trim="getinvoiceform.invoicetype" class="selectselectwrap">
                                    <Option :value="0" :key="0">增值税普通发票</Option>
                                    <Option :value="1" :key="1">增值税专用发票</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <div class="line"></div>
                    <Row>
                        <Col span="12">
                            <FormItem label="邮寄地址：" prop="address">
                                <Input v-model.trim="getinvoiceform.address"></Input>
                            </FormItem>
                            <FormItem label="收件人：" prop="name">
                                <Input v-model.trim="getinvoiceform.name"></Input>
                            </FormItem>
                            <FormItem label="电话号码：" prop="phone">
                                <Input v-model.trim="getinvoiceform.phone"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
            <div slot="footer">
                <Button @click="sendInvoiceInfo()" type="info">提 交</Button>
                <Button @click="getinvoicepanel = false" type="info" class="gray_btn">取 消</Button>
            </div>
        </Modal>
        <Modal
            v-model="getinvoicehistory"
            :closable="false"
            :mask-closable="false"
            width="900"
            class-name="getinvoicehistorywrap_modal">
            <div class="modal_tit">已开发票<i class="ivu-icon ivu-icon-ios-close-empty" @click="getinvoicehistory = false"></i></div>
            <div class="getinvoicehistorywrap">
                <Table
                    :loading="tableLoading"
                    :columns="getinvoicehistoryColumns"
                    :data="getinvoicehistoryData"
                    :row-class-name="rowClassName"
                    no-data-text="暂无发票记录">
                </Table>
            </div>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
import moment from 'moment';
import pay from './pay';

export default {
    name: 'orderManagement',
    components: {pay},
    data () {
        const validatephone = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('手机号不能为空'));
            } else if( /^1[0-9]{10}$/.test(value) ){
                callback();
            } else {
                callback(new Error('请输入正确的手机号'));
            }
        };
        const validatereverue = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('税号不能为空'));
            } else if( /^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/.test(value) ){
                callback();
            } else {
                callback(new Error('请输入正确的税号'));
            }
        };
        return {
            curbignav: 'payment',
            show_pay_modal: false,
            tableLoading: false,
            paymentColumns: [
                {
                    title: '认证角色',
                    key: 'role'
                },
                {
                    title: '收费项目',
                    key: 'projectname'
                },
                {
                    title: '到期天数',
                    key: 'end_time',
                    className: 'red-column'
                },
                {
                    title: '操作',
                    key: 'price',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'info'
                                },
                                on: {
                                    click: () => {
                                        this.toPay();
                                    }
                                }
                            }, '续费')
                        ]);
                    }
                }
            ],
            paymentData: [],
            recordsColumns: [
                {
                    title: '订单号',
                    key: 'ordernumber',
                    width: 240
                },
                {
                    title: '认证角色',
                    key: 'role'
                },
                {
                    title: '收费项目',
                    key: 'projectname'
                },
                {
                    title: '开始时间',
                    key: 'start_time'
                },
                {
                    title: '到期时间',
                    key: 'end_time'
                },
                {
                    title: '原价',
                    key: 'originalprice'
                },
                {
                    title: '实付金额',
                    key: 'actualprice',
                    className: 'red-column'
                }
            ],
            recordsData: [],
            invoiceColumns: [
                {
                    type: 'selection',
                    width: 60
                },
                {
                    title: '订单号',
                    key: 'ordernumber',
                    width: 240
                },
                {
                    title: '认证角色',
                    key: 'role'
                },
                {
                    title: '收费项目',
                    key: 'projectname'
                },
                {
                    title: '开始时间',
                    key: 'start_time'
                },
                {
                    title: '到期时间',
                    key: 'end_time'
                },
                {
                    title: '原价',
                    key: 'originalpricedis'
                },
                {
                    title: '实付金额',
                    key: 'actualpricedis',
                    className: 'red-column'
                }
            ],
            invoiceData: [],
            selectallList: [],
            selectallmoneny: 0,
            getinvoicepanel: false,
            getinvoiceform: {
                header: '',
                revenuenumber: '',
                type: 0,
                invoicetype: 0,
                address: '',
                name: '',
                phone: '',
                ordernumber: []
            },
            ruleValidate: {
                header: [
                      { required: true, message: '发票抬头不能为空', trigger: 'blur' }
                ],
                revenuenumber: [
                    { required: true, validator: validatereverue, trigger: 'blur' }
                ],
                address: [
                    { required: true, message: '邮寄地址不能为空', trigger: 'blur' }
                ],
                name: [
                      { required: true, message: '收件人不能为空', trigger: 'blur' }
                ],
                phone: [
                    { required: true, validator: validatephone, trigger: 'blur' }
                ]
            },
            getinvoicehistory: false,
            getinvoicehistoryColumns: [
                {
                    title: '发票金额',
                    key: 'price',
                    className: 'red-column'
                },
                {
                    title: '发生时间',
                    key: 'created_at',
                    width: 160
                },
                {
                    title: '发票抬头',
                    key: 'header',
                    width: 200
                },
                {
                    title: '发票性质',
                    key: 'invoiceNature'
                },
                {
                    title: '收取方式',
                    key: 'access'
                },
                {
                    title: '状态',
                    key: 'state'
                }
            ],
            getinvoicehistoryData: [],
        }
    },
    activated() {
        this.get_paymentList();
    },
    methods: {
        rowClassName(row,index) {
            return 'custom-table-row';
        },
        toPay() {
            this.show_pay_modal = true;
        },
        close_pay(oOrder) {
            this.show_pay_modal = false;

            if (oOrder) {
                this.$nextTick(() => {
                    this.get_paymentList();
                });
            }
        },
        get_paymentList() {
            this.tableLoading = true;
            this.$http.get('/runtab/renewmanage').then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    let v = response.data.data;
                    this.paymentData = v;
                }else{
                    this.$Message.error(response.data.errmsg);
                }
                this.tableLoading = false;
            }).catch(err => {
                this.tableLoading = false;
            });
        },
        get_recordsList() {
            this.tableLoading = true;
            this.$http.get('/runtab/getruntabs', { params: { perpage : 10}}).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    let v = response.data.data.data;
                    v.forEach(val => {
                        val.start_time = moment(val.start_time).format('YYYY-MM-DD');
                        val.end_time = moment(val.end_time).format('YYYY-MM-DD');
                        val.originalprice = this.priceTransformation(val.originalprice);
                        val.actualprice = this.priceTransformation(val.actualprice);
                    });

                    this.recordsData = v;
                }else{
                    this.$Message.error(response.data.errmsg);
                }
                this.tableLoading = false;
            }).catch(err => {
                this.tableLoading = false;
            });
        },
        get_invoiceList() {
            // 获取前重置已选择订单
            this.selectallmoneny = 0;
            this.selectallList = [];
            this.tableLoading = true;
            this.$http.get('/invoice/runtablist', { params: { perpage : 10}}).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    let v = response.data.data;
                    v.forEach(val => {
                        val.start_time = moment(val.start_time).format('YYYY-MM-DD');
                        val.end_time = moment(val.end_time).format('YYYY-MM-DD');
                        val.originalpricedis = this.priceTransformation(val.originalprice);
                        val.actualpricedis = this.priceTransformation(val.actualprice);
                    });

                    this.invoiceData = v;
                }else{
                    this.$Message.error(response.data.errmsg);
                }
                this.tableLoading = false;
            }).catch(err => {
                this.tableLoading = false;
            });
        },
        selectionChange(selection) {
            this.selectallList = selection;
            let num = 0;
            selection.forEach(e => num = this.accAdd(num, e.actualprice));
            this.selectallmoneny = num;
        },
        priceTransformation(price) {
            return (!price || price == '' || price == '0') ? '免费':  '￥' + price;
        },
        accAdd(a, b) {
            let c, d, e;
            try {
                c = a.toString().split(".")[1].length;
            } catch (f) {
                c = 0;
            }
            try {
                d = b.toString().split(".")[1].length;
            } catch (f) {
                d = 0;
            }
            return e = Math.pow(10, Math.max(c, d)), (this.accMul(a, e) + this.accMul(b, e)) / e;
        },
        accMul(a, b) {
            let c = 0,
                d = a.toString(),
                e = b.toString();
            try {
                c += d.split(".")[1].length;
            } catch (f) {}
            try {
                c += e.split(".")[1].length;
            } catch (f) {}
            return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
        },
        getInvoice() {
            if( !this.selectallList.length ){
                this.$Message.error('请选择需要开发票的订单！');
                return false;
            }
            if( this.selectallmoneny == '0' ){
                this.$Message.error('订单金额为 0，无法开具发票！');
                return false;
            }
            this.getInvoiceInfo();
            this.getinvoicepanel = true;
        },
        getInvoiceInfo() {
            this.$http.get('/invoice/historymessage').then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    let v = response.data.data;
                    if( v.length ){
                        v.forEach(e => {
                            e.revenuenumber = e.revenue_number;
                            e.phone = e.phone || '';
                        });
                        console.log(v)
                        this.getinvoiceform = Object.assign({}, this.getinvoiceform, v[0]);
                    }
                }else{
                    this.$Message.error(response.data.errmsg);
                }
            })
        },
        sendInvoiceInfo() {
            this.$refs.getinvoiceform.validate((valid) => {
                if (valid) {
                    this.getinvoiceform.ordernumber = this.selectallList.map(e => e.ordernumber);
                    this.$http.post('/invoice/demandinvoice', this.getinvoiceform).then(response => {
                        if( response.data.retcode == RETCODE_OK ){
                            this.getinvoicepanel = false;
                            this.get_invoiceList();
                            this.$Message.success('发票信息提交成功！');
                        }else{
                            this.$Message.error(response.data.errmsg);
                        }
                    });
                }
            });
        },
        getInvoiceHistory() {
            this.getInvoiceHistoryList();
            this.getinvoicehistory = true;
        },
        getInvoiceHistoryList() {
            this.$http.get('/invoice/invoiceslist').then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    let v = response.data.data;
                    v.forEach(val => {
                        val.price = this.priceTransformation(val.price);
                    });
                    this.getinvoicehistoryData = v;
                }else{
                    this.$Message.error(response.data.errmsg);
                }
            })
        }
    },
    watch: {
        curbignav(v, ov){
            if( v == 'payment' ){
                this.get_paymentList();
            }else if( v == 'records' ){
                this.get_recordsList();
            }else if( v == 'invoice' ){
                this.get_invoiceList();
            }
        }
    }
}
</script>
