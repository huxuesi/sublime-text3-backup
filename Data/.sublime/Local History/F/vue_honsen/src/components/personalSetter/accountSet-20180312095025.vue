<style lang="stylus">
.accountSet
    .wrap
        padding 50px 0
        border-bottom 1px solid #e7e7e7
        &.infowrap
            padding-bottom 16px
            .wordNum
                position absolute
                right 10px
                top 20px
                z-index 3
                color #b4c6d1
                font-size 12px
        &.bindwrap
            border-bottom none
            .bind
                margin-top: 30px
                .wxbind
                    // padding-bottom: 8px
                    // border-bottom: 1px solid #e7e7e7
                .bindicon
                    vertical-align:middle
        .tit
            color #1c1c1c
            font-size 16px
    .form_bind_account_icon
        span
            margin: 0 5px
        img
            vertical-align: middle
.set_pw_modal
    .set_pw_main
        margin 15px auto 0
        width 275px
</style>

<template>
    <div class="accountSet">
        <Row class="wrap">
            <Col span="4" class="tit">头像设置</Col>
            <Col span="16" class="main">
                <imgUpload field="avatar"
                    @upload-success="imguploadsuccess"
                    :width="150"
                    :height="150"
                    :showAvatarUrl="avatarImg"
                    :url="'/userinfo/setavatar'"
                    img-format="png">
                </imgUpload>
            </Col>
        </Row>
        <Row class="wrap infowrap">
            <Col span="4" class="tit">个人信息</Col>
            <Col span="16" class="main">
                <Form :model="form_info" ref="form_info" :rules="form_info_rules" label-position="left" :label-width="95">
                    <FormItem v-if="$authCodeT($store.getters.auth_code_123).isLawyer" label="真实姓名：" style="margin-bottom: 19px">
                        <Input v-model.trim="form_info.nickname" :disabled="true" :maxlength="5"></Input>
                    </FormItem>
                    <FormItem v-else label="昵　 称：" style="margin-bottom: 19px" prop="nickname">
                        <Input v-model.trim="form_info.nickname" :maxlength="5"></Input>
                    </FormItem>
                    <FormItem label="手机号码：" style="margin-bottom: 19px" prop="mobile">
                        <!--  :disabled="$authCodeT($store.getters.auth_code_123).isLawyer" -->
                        <Input v-model.trim="form_info.mobile" v-onlyNum></Input>
                    </FormItem>
                    <FormItem v-if="!$authCodeT($store.getters.auth_code_123).isLawyer" label="公司名称：" style="margin-bottom: 19px">
                        <Input v-model.trim="form_info.company" :maxlength="30"></Input>
                    </FormItem>
                    <FormItem v-if="!$authCodeT($store.getters.auth_code_123).isLawyer" label="职　　位：" style="margin-bottom: 19px">
                        <Input v-model.trim="form_info.job" :maxlength="5"></Input>
                    </FormItem>
                    <FormItem label="自我描述：" style="margin-bottom: 12px">
                        <!-- style="width: 534px" -->
                        <Input v-model.trim="form_info.profile" type="textarea" :maxlength="30"></Input>
                        <span class="wordNum">{{wordNum}}</span>
                    </FormItem>
                    <FormItem style="text-align: center">
                        <Button type="primary" @click="submit_info('form_info')" style="margin-right: 15px">保 存</Button>
                    </FormItem>
                </Form>
            </Col>
        </Row>
        <Row class="wrap bindwrap">
            <Col span="4" class="tit">绑定设置</Col>
            <Col span="16" class="main">
                <Form :model="form_bind" ref="form_bind" :rules="rule_form_bind" label-position="left" :label-width="85">
                    <!-- 绑定输入账号的显示 -->
                    <FormItem label="账　　号：" style="margin-bottom: 10px" v-if="show_bind_input">
                        <Row>
                            <Col span="4">
                                <div class="form_bind_account_icon">
                                    <img src="/static/icon/accountset_dianhua_icon.png"> <span>|</span> <img src="/static/icon/accountset_youxiang_icon.png">
                                </div>
                            </Col>
                            <Col span="11">
                                <FormItem prop="bund_number">
                                    <Input v-model.trim="form_bind.bund_number" placeholder="请输入手机号/邮箱" ref="bund_number"></Input>
                                </FormItem>
                            </Col>
                            <Col span="9">&nbsp;&nbsp;&nbsp;
                                <Button type="primary" @click="send_code('form_bind')" :disabled="send_code_btn_disabled">{{send_code_btn}}</Button>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem v-if="show_bind_input && show_code_input">
                        <Row>
                            <Col span="4">&nbsp;</Col>
                            <Col span="11">
                                <FormItem prop="code">
                                    <Input v-model.trim="form_bind.code" placeholder="请输入验证码"></Input>
                                </FormItem>
                            </Col>
                            <Col span="9">&nbsp;&nbsp;&nbsp;
                                <Button type="primary" @click="bind_account('form_bind')">绑定账号</Button>
                            </Col>
                        </Row>
                    </FormItem>
                    <!-- 已绑定账号的显示 -->
                    <FormItem label="账　　号：" style="margin-bottom: 10px" v-if="!show_bind_input">
                        <Row>
                            <Col span="4">
                                <div class="form_bind_account_icon">
                                    <img src="/static/icon/accountset_dianhua_icon.png"> <span>|</span> <img src="/static/icon/accountset_youxiang_icon.png">
                                </div>
                            </Col>
                            <Col span="11">
                                <Input v-model.trim="form_bind.bund_number" readonly></Input>
                            </Col>
                            <Col span="9">&nbsp;&nbsp;
                                <Button type="ghost" @click="unbindaccount">解 绑</Button>&nbsp;&nbsp;<Button type="ghost" @click="to_change_pw">更改密码</Button>
                            </Col>
                        </Row>
                    </FormItem>
                    <!-- <FormItem v-if="!show_bind_input">
                        <Row :gutter="16">
                            <Col span="12">
                                <Button long type="primary" @click="verify_pw_Modal = true">更改账号</Button>
                            </Col>
                            <Col span="12">
                                <Button class="gray_btn" long type="primary" @click="to_change_pw">更改密码</Button>
                            </Col>
                        </Row>
                    </FormItem> -->
                    <!-- 绑定qq、微信 -->
                    <FormItem class="bind">
                        <Row class="wxbind">
                            <Col span="2">
                                <img class="bindicon" src="/static/icon/0003.png" width="26" height="21">
                            </Col>
                            <Col span="2" v-if="bindstatus._weixin">
                                <Avatar :src="bindstatus.wexin_avatar" />
                            </Col>
                            <Col span="20">
                                <!-- v-if="bindstatus._weixin && (bindstatus._qq || bindstatus._bund)" -->
                                <Button type="ghost" v-if="bindstatus._weixin" @click="unbindQQandWX('weixinweb')">
                                    更 换
                                </Button>
                                <Button type="primary" v-else @click="bindQQandWX('weixinweb')">绑定微信</Button>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem class="bind">
                        <Row class="qqbind">
                            <Col span="2">
                                <img class="bindicon" src="/static/icon/0004.png" width="23" height="23">
                            </Col>
                            <Col span="2" v-if="bindstatus._qq">
                                <Avatar :src="bindstatus.qq_avatar" />
                            </Col>
                            <Col span="20">
                                <Button type="ghost" v-if="bindstatus._qq && (bindstatus._weixin || bindstatus._bund)" @click="unbindQQandWX('qq')">解 绑</Button>
                                <Button type="primary" v-if="!bindstatus._qq" @click="bindQQandWX('qq')">绑定 QQ</Button>
                            </Col>
                        </Row>
                    </FormItem>
                </Form>
            </Col>
        </Row>
        <!-- 设置密码modal -->
         <Modal
            v-model="set_pw_Modal"
            :closable="false"
            :mask-closable="false"
            width="425"
            class-name="set_pw_modal">
            <div class="modal_tit">{{set_pw_text}}</div>
            <div class="set_pw_main">
                 <Form v-if="set_pw_Modal" :model="form_set_pw" ref="form_set_pw" :rules="rule_form_set_pw">
                    <!-- 绑定输入账号的显示 -->
                    <FormItem style="margin-bottom: 10px" prop="pw00" v-if="is_change_pw">
                        <Input v-model.trim="form_set_pw.pw00" type="password" placeholder="原密码"></Input>
                    </FormItem>
                    <FormItem style="margin-bottom: 10px" prop="pw01">
                        <Input v-model.trim="form_set_pw.pw01" type="password" placeholder="新密码"></Input>
                    </FormItem>
                    <FormItem style="margin-bottom: 10px" prop="pw02">
                        <Input v-model.trim="form_set_pw.pw02" type="password" placeholder="确认密码"></Input>
                    </FormItem>
                    <FormItem style="margin-bottom: 10px">
                        <Row :gutter="16">
                            <Col span="12">
                                <Button long type="primary" @click="submit_pw('form_set_pw')">确 定</Button>
                            </Col>
                            <Col span="12">
                                <Button class="gray_btn" long type="primary" @click="give_up_pw">放 弃</Button>
                            </Col>
                        </Row>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer"></div>
        </Modal>

        <!-- 验证密码modal -->
        <Modal
            v-model="verify_pw_Modal"
            :closable="false"
            :mask-closable="false"
            width="425"
            class-name="set_pw_modal">
            <div class="modal_tit">输入密码</div>
            <div class="set_pw_main">
                 <Form v-if="verify_pw_Modal" :model="form_verify_pw" ref="form_verify_pw" :rules="rule_form_verify_pw">
                    <FormItem style="margin-bottom: 10px" prop="pw">
                        <Input v-model.trim="form_verify_pw.pw" type="password" placeholder="输入密码" @on-keydown.enter.prevent="verify_pw('form_verify_pw')"></Input>
                    </FormItem>
                    <FormItem style="margin-bottom: 10px">
                        <Row :gutter="16">
                            <Col span="12">
                                <Button long type="primary" @click="verify_pw('form_verify_pw')">确 定</Button>
                            </Col>
                            <Col span="12">
                                <Button class="gray_btn" long type="primary" @click="give_up_verify_pw">放 弃</Button>
                            </Col>
                        </Row>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer"></div>
        </Modal>
        <wechatTips type="changewx" :display.sync="changewxpanel"></wechatTips>
    </div>
</template>

<script>
import imgUpload from './imgUpload';
import {checkEmail,checkPhone} from '@/common/js/check.js';
import wechatTips from '@/components/login/bindWechatTips';

export default {
    name: 'accountSet',
    components: {
        imgUpload,
        wechatTips
    },
    data() {
        return {
            imgUrl,
            /* 个人信息 */
            form_info: {
                nickname: '',
                mobile: '',
                profile: '',
                company: '',
                job: ''
            },
            form_info_rules: {
                nickname: [
                    { required: true, message: '请输入昵称', trigger: 'change' }
                ],
                mobile: [
                    {
                        required: false,
                        validator: (rule, value, callback) => {
                            if (!value) {
                                callback();
                            }else{
                                // 手机号
                                if (checkPhone(value)) {
                                    callback();
                                } else {
                                    callback(new Error('手机号码不正确'));
                                }
                            }
                        },
                        trigger: 'blur'
                    }
                ],
            },
            num: 30,
            /* 绑定 */
            bindstatus: {},
            form_bind: {
                bund_number: '',
                code: '',
            },
            rule_form_bind: {
                bund_number: [
                    { validator : (rule, value, callback) => {
                        if (!value) {
                            callback(new Error('请输入手机号/邮箱'));
                        }else{
                            // 手机号或邮箱
                            if (checkEmail(value) || checkPhone(value)) {
                                callback();
                            } else {
                                callback(new Error('手机号/邮箱不正确'));
                            }
                        }
                    }, required: false, trigger: 'change'}
                ],
                code: [
                    { required: false, trigger: 'change' },
                    { validator : (rule, value, callback) => {
                        if (!value.length) {
                            callback(new Error('请输入验证码'));
                        }else{
                            callback();
                        }
                    }}
                ],
            },
            show_bind_input: false,  /*1--已绑定账号的显示 2--还没绑定账号，输入账号、验证码的显示*/
            countDown: 0, /* 验证码发送倒计时 */
            is_frist_send_code: true,
            send_code_btn_disabled: false,
            show_code_input: false,
            /* 设置密码 */
            set_pw_Modal: false,
            is_change_pw: false,
            form_set_pw: {
                pw00: '',
                pw01: '',
                pw02: ''
            },
            rule_form_set_pw: {
                pw00: [
                    { validator : (rule, value, callback) => {
                        if (value.length < 6) {
                            callback(new Error('请输入六位以上的密码'));
                        }else{
                            callback();
                        }
                    }, required: false, trigger: 'change'}
                ],
                pw01: [
                    { validator : (rule, value, callback) => {
                        if (value.length < 6) {
                            callback(new Error('请输入六位以上的密码'));
                        }else{
                            callback();
                        }
                    }, required: false, trigger: 'change'}
                ],
                pw02: [
                    { validator : (rule, value, callback) => {
                        if (value.length < 6) {
                            callback(new Error('请输入六位以上的密码'));
                        } else if(value !== this.form_set_pw.pw01) {
                            callback(new Error('两次输入的密码不一致'));
                        }else{
                            callback();
                        }
                    }, required: false, trigger: 'change'}
                ]
            },
            /* 验证密码 */
            verify_pw_Modal: false,
            form_verify_pw: {
                pw: '',
            },
            rule_form_verify_pw: {
                pw: [
                    { validator : (rule, value, callback) => {
                        if (value.length < 6) {
                            callback(new Error('请输入六位以上的密码'));
                        }else{
                            callback();
                        }
                    }, required: false, trigger: 'change'}
                ]
            },
            // 微信换绑面板
            changewxpanel: false
        }
    },
    computed: {
        /*显示的头像*/
        avatarImg() {
            return `${imgUrl}/uploads/avatar/${this.$store.state.mineInfo.id}.jpg?${this.$store.state.mineInfo.avatar_hash}`;
        },
        wordNum() {
            let num = 30 - (this.form_info.profile?this.form_info.profile.length: 0);
            return `还可输入${num}个字`;
        },
        isEmail() {
            return checkEmail(this.form_bind.bund_number);
        },
        send_code_btn() {
            if(this.countDown) {
                /* 倒计时中 */
                return `${this.countDown}s后重发`;
            } else {
                return this.is_frist_send_code? '绑 定': '重新发送'
            }
        },
        set_pw_text() {
            return this.is_change_pw? '更改密码': '设置密码';
        }
    },
    watch: {
        countDown: function(newval,oldval){
            if(newval>0){
                this.send_code_btn_disabled = true;
                window.setTimeout(() => {
                    this.countDown += -1;
                }, 1000);
            }else {
                this.send_code_btn_disabled = false;
            }
        },
        set_pw_Modal: function(newval,oldval) {
            if (!newval) {
                this.form_set_pw = {
                    pw00: '',
                    pw01: '',
                    pw02: ''
                };
            }
        }
    },
    mounted() {
        this.form_info_rules.mobile[0].required = true;

        this.getBindstatus();
        this.get_info();

        /* qq,wx的绑定回调 */
        if (this.$route.query.retcode == 0 || this.$route.query.retcode == 1) {
            window.opener.close();
            if( this.$route.query.retcode == 0 ){
                this.$Message.success(this.$route.query.errmsg);
            }
            if (this.$route.query.retcode == 1) {
                this.$Message.error(this.$route.query.errmsg);
            }
        }
    },
    methods: {
        verify_pw(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let URL = `/useraccount/verifypassword`;
                    this.$http.post(URL,{password: this.form_verify_pw.pw}).then((response) => {
                        let data = response.data;
                        if (data.retcode === RETCODE_OK) {

                            this.verify_pw_Modal = false;
                            this.$Message.success('密码验证通过！');

                            // 去更改账号
                            this.show_bind_input = true;

                            this.$nextTick(() => {
                                this.$refs.bund_number.focus();
                            });

                        }else {
                            this.$Message.error(data.errmsg);
                        }
                    }).catch(error => {});
                }
            });
        },
        unbindaccount() {
            this.$Modal.confirm({
                title: '确认对话框',
                content: '确定要解绑吗？',
                onOk: () => {
                    this.$http.post('/useraccount/Accountoutbind').then((response) => {
                        let data = response.data;
                        if (data.retcode === RETCODE_OK) {
                            this.$Message.success('解绑成功！');
                            // 解绑成功清空账号
                            this.form_bind.bund_number = '';
                            this.bindstatus._pwd_set = false;
                            // 去更改账号
                            this.show_bind_input = true;
                            this.bindstatus._bund = false;

                            this.$nextTick(() => {
                                this.$refs.bund_number.focus();
                            });

                        }else {
                            this.$Message.error(data.errmsg);
                        }
                    }).catch(error => {});
                }
            });
        },
        give_up_verify_pw() {
            this.form_verify_pw.pw = '';
            this.verify_pw_Modal = false;
        },
        imguploadsuccess(data) {
            this.$store.commit('changeMineInfo',{key:'avatar_hash',value:data.avatar_hash});
        },
        get_info() {
            let URL = `/userinfo/getuserinfo`;
            this.$http.get(URL).then((response) => {
                let data = response.data;
                if (data.retcode === RETCODE_OK) {
                    this.form_info = Object.assign({},this.form_info,data.data);
                }else {
                    this.$Message.error(data.errmsg)
                }
            }).catch(error => {});
        },
        submit_info(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let URL = `/userinfo/setuserinfo`;
                    let param = {
                        nickname: this.form_info.nickname,
                        mobile: this.form_info.mobile,
                        profile: this.form_info.profile
                    };
                    if( !this.$authCodeT(this.$store.getters.auth_code_123).isLawyer ){
                        param.company = this.form_info.company;
                        param.job = this.form_info.job;
                    }
                    this.$http.post(URL,param).then((response) => {
                        let data = response.data;
                        if (data.retcode === RETCODE_OK) {
                            this.$Message.success('个人信息设置成功！');
                            this.$store.commit('changeMineInfo',{key:'name',value: this.form_info.nickname});
                            this.$store.commit('changeMineInfo',{key:'profile',value: this.form_info.profile});
                        }else {
                            this.$Message.error(data.errmsg);
                        }
                    }).catch(error => {});
                }
            });
        },
        send_code(name) {
            this.$refs[name].validateField('bund_number',(errmsg) => {
                if (!errmsg) {
                    let URL = this.isEmail? '/useraccount/changeemail': '/sms/verifycode';
                    let param = this.isEmail?{email: this.form_bind.bund_number}: {phone: this.form_bind.bund_number};
                    this.$http.post(URL,param).then((response) => {
                        let data = response.data;
                        if (data.retcode === RETCODE_OK) {
                            this.$Message.success('验证码发送成功!');
                            this.countDown = 60;
                            this.is_frist_send_code = false;

                            this.form_bind.code = '';
                            this.show_code_input = true;
                        }else {
                            this.$Message.error(data.errmsg);
                        }
                    }).catch(error => {});
                }
            });
        },
        bind_account(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let URL = 'userinfo/verifybind';
                    let param = this.isEmail?{
                                                email: this.form_bind.bund_number,
                                                code: this.form_bind.code
                                            }: {
                                                 phone: this.form_bind.bund_number,
                                                 code: this.form_bind.code
                                            };
                    this.$http.post(URL,param).then((response) => {
                        let data = response.data;
                        if (data.retcode === RETCODE_OK) {
                            if(this.bindstatus._pwd_set) {
                                // 设置过密码了
                                this.show_bind_input = false;
                                this.bindstatus._bund = true;
                                this.show_code_input = false;
                                this.$Message.success('账号绑定成功!');
                            }else {
                                // 去设置密码
                                this.is_change_pw = false;
                                this.set_pw_Modal = true;
                                this.$Message.success('账号验证成功，请设置密码!');
                            }
                        }else {
                            this.$Message.error(data.errmsg);
                            this.form_bind.code = '';
                        }
                    }).catch(error => {
                        this.$Message.error('请求有误！')
                    });
                } else {
                    // this.$Message.error('表单验证失败');
                }
            });
        },
        getBindstatus() {
            let URL = `/userinfo/getbind`;
            this.$http.get(URL).then((response) => {
                let data = response.data;
                if (data.retcode === RETCODE_OK) {
                    this.bindstatus = data.data;
                    if(data.data._bund){
                        /* 之前已有绑定 */
                        this.form_bind.bund_number = data.data.bund_number || '';
                        this.show_bind_input = false;
                    }else {
                        this.show_bind_input = true;
                    }
                }else {
                    this.$Message.error(data.errmsg)
                }
            }).catch(error => {
                this.$Message.error('请求有误！')
            });
        },
        to_change_pw() {
            this.is_change_pw = true;
            this.set_pw_Modal = true;
        },
        submit_pw(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {

                    let _this = this;
                    function _submit() {
                        let URL = '';
                        let param = {};
                        /* 更改密码 */
                        if (_this.is_change_pw) {
                            URL = '/useraccount/changepassword';
                            param = {
                                oldpassword: _this.form_set_pw.pw00,
                                password: _this.form_set_pw.pw01
                            };
                        } else {
                            /* 设置密码 */
                            URL = '/userinfo/setbind';
                            param = {
                                password: _this.form_set_pw.pw01
                            };
                        }
                        _this.$http.post(URL,param).then((response) => {
                            let data = response.data;
                            if (data.retcode === RETCODE_OK) {
                                if (_this.is_change_pw) {
                                    _this.$Message.success('密码更改成功!');
                                } else {
                                    _this.bindstatus._pwd_set = true;
                                    _this.bindstatus._bund = true;
                                    _this.show_bind_input = false;
                                    _this.show_code_input = false;
                                    _this.$Message.success('密码设置成功!');
                                }
                                _this.set_pw_Modal = false;
                            }else {
                                _this.$Message.error(data.errmsg);
                            }
                        }).catch(error => {
                            console.log(error);
                        });
                    }

                    if( this.is_change_pw ){
                        this.$Modal.confirm({
                            title: '密码',
                            content: '是否更改密码?',
                            onOk: () => {
                                _submit();
                            },
                            onCancel: () => {}
                        });
                    }else{
                        _submit();
                    }
                } else {
                    // this.$Message.error('表单验证失败!');
                }
            })
        },
        give_up_pw() {
            this.$Modal.confirm({
                title: '密码',
                content: '是否放弃修改密码?',
                onOk: () => {
                    if (!this.bindstatus._pwd_set) {
                        // 第一次绑定还没有设置过密码
                        this.form_bind.bund_number = '';
                        this.form_bind.code = '';

                        this.show_code_input = false;
                    }
                    this.set_pw_Modal = false;
                }
            });
        },
        bindQQandWX(type) {
            window.open(`${imgUrl}/useraccount/oauthbind/${type}`);
        },
        unbindQQandWX(type) {
            if( type == 'weixinweb' ){
                this.changewxpanel = true
            }else{
                this.$Modal.confirm({
                    title: '确认对话框',
                    content: '确定要解绑吗？',
                    onOk: () => {
                        let URL = `/useraccount/oauthoutbind/${type}`;
                        this.$http.post(URL).then((response) => {
                            let data = response.data;
                            if (data.retcode === RETCODE_OK) {
                                if(type === 'qq'){
                                    this.bindstatus._qq = false;
                                    this.$Message.success('解绑QQ成功!');
                                }else if(type === 'weixinweb'){
                                    this.bindstatus._weixin = false;
                                    this.$Message.success('解绑微信成功!');
                                }
                            }else {
                                this.$Message.error(data.errmsg);
                            }
                        }).catch(error => {
                            this.$Message.error('请求服务器失败！');
                        });
                    }
                });
            }
        },
    }
}
</script>