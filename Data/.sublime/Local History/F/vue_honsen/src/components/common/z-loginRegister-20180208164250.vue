<style lang="stylus">
.z-loginwrap
    width: 335px
    .ivu-card-body
        padding: 0
        .ivu-tabs.ivu-tabs-card
            .ivu-tabs-bar
                margin-bottom: 12px
                .ivu-tabs-nav-container
                    height: auto
                    .ivu-tabs-nav
                        width: 100%
                        .ivu-tabs-tab
                            border-color: transparent
                            margin-right: 0
                            width: 50%
                            height: 52px
                            line-height: 52px
                            background: #3dc1ff
                            color: #fff
                            text-align: center
                            padding: 0
                            &:nth-child(2)
                                border-top-right-radius: 0
                            &:nth-child(3)
                                border-top-left-radius: 0
                        .ivu-tabs-tab-active
                            background: #fff
                            color: #444
            .ivu-tabs-content
                .ivu-tabs-tabpane
                    padding: 0 32px
        .ivu-form
            .ivu-form-item
                .ivu-form-item-content
                    .ivu-checkbox-wrapper
                        color: #a0a0a0
                        font-size: 12px
                        white-space: nowrap
                    .resetpassword
                        text-align: right
                    .otherlogin
                        .threetitle
                            color: #b6b6b6
                            position: relative
                            text-align: center
                            margin-top: 5px
                            div
                                position: absolute
                                top: 50%
                                left: 0
                                right: 0
                                height: 1px
                                background: #b6b6b6
                                margin-top: -1px
                            span
                                position: relative
                                padding: 0 10px
                                background: #fff
                        .threewrap
                            text-align: center
                            padding: 15px 0 0
                            span
                                display: inline-block
                                width: 39px
                                height: 39px
                                cursor: pointer
                            .qq
                                margin-left: 27px
                                background: url(/static/icon/qq_icon.png) no-repeat
                                &:hover
                                    background: url(/static/icon/qq_icon_hover.png) no-repeat
                            .weixin
                                background: url(/static/icon/weixin_icon.png) no-repeat
                                &:hover
                                    background: url(/static/icon/weixin_icon_hover.png) no-repeat
                    .verifycodeimgwrap
                        display: block
                        width: 100%
                        height: 40px
                        cursor: pointer
                        img
                            width: 100%
                            height: 100%
                            display: block
            &.loginform
                padding: 18px 0 0
                &.threeerror
                    padding: 0
                    &>.ivu-form-item
                        margin-bottom: 4px
                        .threewrap
                            padding: 4px 0 0
            &.registerform
                &>.ivu-form-item
                    margin-bottom: 5px
</style>

<template>
    <div class="z-loginregister">
        <Card :bordered="false" class="z-loginwrap commonform" dis-hover>
            <Tabs v-model="type" type="card">
                <TabPane label="登　录" name="登录">
                    <Form ref="loginform" :class="{threeerror: loginnumber >= 3}" :model="loginform" :rules="ruleValidate" class="loginform">
                        <FormItem>
                            <FormItem prop="account">
                                <Input v-model.trim="loginform.account" @on-enter="loginSubmit" class="ipt username" placeholder="手机号/邮箱" @focus=""></Input>
                            </FormItem>
                            <FormItem prop="password" class="mt-1">
                                <Input v-model.trim="loginform.password" @on-enter="loginSubmit" type="password" class="ipt password" placeholder="密码"></Input>
                            </FormItem>
                            <FormItem v-if="loginnumber >= 3" class="mtb-6">
                                <Row>
                                    <Col span="14">
                                        <FormItem prop="verifycode">
                                            <Input v-model.trim="loginform.verifycode" @on-enter="loginSubmit" class="ipt verifycode" placeholder="输入验证码"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="9" offset="1">
                                        <span @click="reloadCodeImg" :style="{backgroundImage: `url(${imgUrl}/imgverifycode?${imgCacheText})`}" title="重新获取验证码" class="verifycodeimgwrap"></span>
                                    </Col>
                                </Row>
                            </FormItem>
                            <FormItem class="mtb-8">
                                <Button @click="loginSubmit" type="info" class="btn submit" long>登　录</Button>
                            </FormItem>
                            <FormItem>
                                <Row>
                                    <Col span="12">
                                        <Checkbox v-model.trim="loginform.remember">记住我</Checkbox>
                                    </Col>
                                    <Col span="12"><p class="resetpassword"><a @click="$router.push({name: 'passwordReset'})" href="javascript:;">忘记密码？</a></p></Col>
                                </Row>
                            </FormItem>
                            <div class="otherlogin">
                                <div class="threetitle">
                                    <div></div>
                                    <span>使用第三方登录</span>
                                </div>
                                <div class="threewrap">
                                    <span @click="qqandwxLogin('wx')" class="weixin"></span>
                                    <span @click="qqandwxLogin('qq')" class="qq"></span>
                                </div>
                            </div>
                        </FormItem>
                    </Form>
                </TabPane>
                <TabPane label="注　册" name="注册">
                    <Form ref="registerform" :model="registerform" :rules="ruleValidate" class="registerform">
                        <FormItem>
                            <FormItem prop="username">
                                <Input v-model.trim="registerform.username" class="ipt username" placeholder="用户名"></Input>
                            </FormItem>
                            <FormItem prop="account" class="mt-1">
                                <Input v-model.trim="registerform.account" class="ipt password" placeholder="手机号/邮箱"></Input>
                            </FormItem>
                            <FormItem class="mtb-6">
                                <Row>
                                    <Col span="14">
                                        <FormItem prop="verifycode">
                                            <Input v-model.trim="registerform.verifycode" class="ipt verifycode" placeholder="输入验证码"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="9" offset="1">
                                        <Button v-if="!this.registerform.starttime" @click.stop="getcode" type="info" class="verifycodebtn" long>获取验证码</Button>
                                        <Button v-else type="info" class="verifycodebtn" long disabled>{{registerform.runtime}}秒后重发</Button>
                                    </Col>
                                </Row>
                            </FormItem>
                            <FormItem prop="password">
                                <Input v-model.trim="registerform.password" type="password" class="ipt username" placeholder="密码"></Input>
                            </FormItem>
                            <FormItem prop="repassword" class="mt-1">
                                <Input v-model.trim="registerform.repassword" type="password" class="ipt password" placeholder="确认密码"></Input>
                            </FormItem>
                            <FormItem>
                                <Row>
                                    <Col span="24">
                                        <Checkbox v-model="registerform.read">已阅读并同意平台<a target="_blank" href="/agreement/userAgreement">《用户协议》</a>、<a target="_blank" href="/agreement/payAgreement">《支付协议》</a></Checkbox>
                                    </Col>
                                </Row>
                            </FormItem>
                            <FormItem class="mtb-8">
                                <Button @click="registerfn" type="info" class="btn" long>注　册</Button>
                            </FormItem>
                        </FormItem>
                    </Form>
                </TabPane>
            </Tabs>
        </Card>
    </div>
</template>

<script>
import {createRandom} from '@/common/js/createRandom';
import sockets from '../../vueSocket';

export default {
    name: 'z-loginRegister',
    data () {
        const validateAccount = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('手机号/邮箱不能为空'));
            } else if( /^1[0-9]{10}$/.test(value) ){
                if( this.type === '登录' ){
                    this.loginform.accounttype = 'phone';
                }else{
                    this.registerform.accounttype = 'phone';
                }
                callback();
            } else if( /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) ){
                if( this.type === '登录' ){
                    this.loginform.accounttype = 'email';
                }else{
                    this.registerform.accounttype = 'email';
                }
                callback();
            }else{
                if( this.type === '登录' ){
                    this.loginform.accounttype = '';
                }else{
                    this.registerform.accounttype = '';
                }
                callback(new Error('请输入正确的手机号/邮箱'));
            }
        };
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('密码不能为空'));
            } else {
                if( this.type === "注册" ){
                    if (this.registerform.repassword !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.registerform.validateField('repassword');
                    }
                }
                callback();
            }
        };
        const validatePassCheck = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.registerform.password) {
                callback(new Error('两次输入密码不一致'));
            } else {
                callback();
            }
        };
        return {
            imgUrl,
            type: '登录',     //登录 注册
            loginnumber: 0,
            imgCacheText: createRandom(),
            loginning: false,
            loginform: {
                account: '',
                password: '',
                verifycode: '',
                remember: false,
                accounttype: ''
            },
            registerform: {
                username: '',
                account: '',
                verifycode: '',
                password: '',
                repassword: '',
                read: true,
                accounttype: '',
                againtime: 60,
                runtime: 60,
                starttime: false
            },
            ruleValidate: {
                account: [
                    { validator: validateAccount, trigger: 'change' },
                ],
                password: [
                    { validator: validatePass, trigger: 'change' },
                    { required: true, type: 'string', min: 6, message: '请输入不少于6位数密码', trigger: 'change' }
                ],
                username: [
                    { required: true, message: '用户名不能为空', trigger: 'change' }
                ],
                verifycode: [
                    { required: true, type: 'string', min: 4, max: 6, message: '验证码位数错误', trigger: 'change' }
                ],
                repassword: [
                    { validator: validatePassCheck, trigger: 'change' },
                    { required: true, type: 'string', min: 6, message: '请输入不少于6位数密码', trigger: 'change' }
                ]
            }
        }
    },
    beforeMount() {
        if( this.$route.query.into == 'register' ){
            this.type = '注册';
        }
    },
    methods: {
        loginSubmit() {
            if( !this.loginning ){
                this.$refs.loginform.validate((valid) => {
                    if (valid) {
                        this.loginning = true;
                        let param = { password: this.loginform.password, yzm: this.loginform.verifycode, type: this.loginform.accounttype };
                        if( this.loginform.remember ){
                            param.remember = 'on';
                        }
                        param[this.loginform.accounttype] = this.loginform.account;
                        this.$http.post('/login', param).then(response => {
                            if( response.data.retcode == RETCODE_OK ){
                                let v = response.data.data;
                                this.$store.commit('changeloginStatus', true);
                                this.$store.commit('rewriteMineInfo', v);
                                /* socket */
                                if(window.socket){
                                    window.socket.close();
                                }
                                sockets(v.id);
                                this.$router.push({name: 'feed'});
                            }else{
                                this.loginnumber ++;
                                this.$Message.error( response.data.errmsg );
                                this.reloadCodeImg();
                            }
                            this.loginning = false;
                        }).catch(err => {
                            if( err.response ) {
                                switch( err.response.status ) {
                                    case 422:
                                        this.$Message.error( '验证码错误!' );
                                }
                            }
                            this.reloadCodeImg();
                            this.loginning = false;
                        });
                    } else {
                        // this.$Message.error('表单验证失败!');
                    }
                });
            }
        },
        reloadCodeImg() {
            this.imgCacheText = createRandom();
        },
        getcode() {
            let accpet;
            this.$refs.registerform.validateField('account', cb => { accpet = cb });
            if( accpet != "" ){
                return false;
            }
            this.starttime();
            let isemail = this.registerform.accounttype === 'email';
            let url = isemail ? '/register/email' : '/sms/verifycode';
            let param = isemail ? { email: this.registerform.account } : { phone: this.registerform.account, type: 'register' };
            this.$http.post(url, param).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    this.$Message.success( '获取验证码成功，请查收!' );
                }else{
                    this.registerform.runtime = 0;
                    this.$Message.error( response.data.errmsg );
                }
            }).catch(err => {
                if( err.response ) {
                    switch( err.response.status ) {
                        case 429:
                            this.$Message.error( '发送验证码太频繁，请稍后重试！' );
                    }
                }
            });
        },
        setTime() {
            setTimeout(() => {
                if( this.registerform.runtime <= 0 ){
                    this.registerform.starttime = false;
                }else{
                    this.registerform.runtime -= 1;
                    this.setTime();
                }
            }, 1000);
        },
        starttime() {
            this.registerform.starttime = true;
            this.registerform.runtime = this.registerform.againtime;
            this.setTime();
        },
        registerfn() {
            if( !this.registerform.read ){
                this.$Message.error( '未同意平台《用户协议》、《支付协议》，无法注册！' );
                return false;
            }
            this.$refs.registerform.validate((valid) => {
                if (valid) {
                    let param = { name: this.registerform.username, password: this.registerform.password, code: this.registerform.verifycode, type: this.registerform.accounttype };
                    param[this.registerform.accounttype] = this.registerform.account;
                    this.$http.post('/register', param).then(response => {
                        if( response.data.retcode == RETCODE_OK ){
                            let v = response.data.data;
                            this.$store.commit('changeloginStatus', true);
                            this.$store.commit('rewriteMineInfo', v);
                            /* socket */
                            if(window.socket){
                                window.socket.close();
                            }
                            sockets(v.id);
                            // this.$router.push({name: 'recommend'});
                        }else{
                            this.$Message.error( response.data.errmsg );
                        }
                    }).catch(err => {

                    });
                } else {
                    // this.$Message.error('表单验证失败!');
                }
            });
        },
        qqandwxLogin(type) {
            let _type = type === 'qq' ? 'qqlogin' : 'weixinweblogin';
            window.location.href = `${imgUrl}/${_type}`;
        }
    },
}
</script>
