<style lang="stylus">
.passwordreset
    margin-top: 60px !important
    .ivu-card-head
        padding: 19px 16px
        border-bottom: 1px solid #3dc1ff
        text-align: center
        color: #555
    .content
        min-height: 415px
        padding: 30px 0 0
    .content2
        text-align: center
        padding: 80px 0 0
        .icon
            font-size: 92px
            color: #80c26a
</style>

<template>
    <div class="appwrap passwordreset">
        <Row>
            <Col span="16" offset="4">
                <Card :bordered="false" class="commonform" dis-hover>
                    <div slot="title">安全中心 | 找回密码</div>
                    <div v-if="!finishstate" class="content">
                        <Row>
                            <Col span="8" offset="8">
                                <Form ref="passwordresetform" :model="passwordresetform" :rules="ruleValidate" class="passwordresetform">
                                    <FormItem>
                                        <FormItem prop="account">
                                            <Input v-model.trim="passwordresetform.account" class="ipt password" placeholder="注册手机号/邮箱"></Input>
                                        </FormItem>
                                        <FormItem class="mtb-16">
                                            <Row>
                                                <Col span="14">
                                                    <FormItem prop="verifycode">
                                                        <Input v-model.trim="passwordresetform.verifycode" class="ipt verifycode" placeholder="输入验证码"></Input>
                                                    </FormItem>
                                                </Col>
                                                <Col span="9" offset="1">
                                                    <Button v-if="!this.passwordresetform.starttime" @click.stop="getcode" type="info" class="verifycodebtn" long>获取验证码</Button>
                                                    <Button v-else type="info" class="verifycodebtn" long disabled>{{passwordresetform.runtime}}秒后重发</Button>
                                                </Col>
                                            </Row>
                                        </FormItem>
                                        <FormItem prop="password">
                                            <Input v-model.trim="passwordresetform.password" type="password" class="ipt username" placeholder="新密码"></Input>
                                        </FormItem>
                                        <FormItem prop="repassword" class="mt-1">
                                            <Input v-model.trim="passwordresetform.repassword" type="password" class="ipt password" placeholder="确认新密码"></Input>
                                        </FormItem>
                                        <FormItem v-if="errortxt" class="mtb-6">
                                            <p class="errortxt">{{errortxt}}</p>
                                        </FormItem>
                                        <FormItem :class="{'mt-20': !errortxt}">
                                            <Button @click="resetfn" type="info" class="btn" long>重置密码</Button>
                                        </FormItem>
                                    </FormItem>
                                </Form>
                            </Col>
                        </Row>
                    </div>
                    <div v-else class="content content2">
                        <p class="icon"><Icon type="checkmark-circled"></Icon></p>
                        <p class="txt">密码重置成功!</p>
                    </div>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
    name: 'passwordReset',
    data () {
        const validateAccount = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('手机号/邮箱不能为空'));
            } else if( /^1[0-9]{10}$/.test(value) ){
                this.passwordresetform.accounttype = 'phone';
                callback();
            } else if( /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) ){
                this.passwordresetform.accounttype = 'email';
                callback();
            }else{
                this.passwordresetform.accounttype = '';
                callback(new Error('请输入正确的手机号/邮箱'));
            }
        };
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('密码不能为空'));
            } else {
                if (this.passwordresetform.repassword !== '') {
                    // 对第二个密码框单独验证
                    this.$refs.passwordresetform.validateField('repassword');
                }
                callback();
            }
        };
        const validatePassCheck = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.passwordresetform.password) {
                callback(new Error('两次输入密码不一致'));
            } else {
                callback();
            }
        };
        return {
            finishstate: false,
            errortxt: '',
            passwordresetform: {
                account: '',
                verifycode: '',
                password: '',
                repassword: '',
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
    mounted() {

    },
    methods: {
        getcode() {
            let accpet;
            this.$refs.passwordresetform.validateField('account', cb => { accpet = cb });
            if( accpet != "" ){
                return false;
            }
            this.starttime();
            let param = { type: this.passwordresetform.accounttype};
            param[this.passwordresetform.accounttype] = this.passwordresetform.account;
            this.$http.post('/passwordreset/send', param).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    this.$Message.success( '获取验证码成功，请查收!' );
                }else{
                    this.passwordresetform.runtime = 0;
                    this.$Message.error( response.data.errmsg );
                }
            }).catch(err => {
                if( err.response ) {
                    switch( err.response.status ) {
                        case 429:
                            this.$Message.error( '发送验证码太频繁，请稍后重试！' );
                    }
                }
            })
        },
        setTime() {
            setTimeout(() => {
                if( this.passwordresetform.runtime <= 0 ){
                    this.passwordresetform.starttime = false;
                }else{
                    this.passwordresetform.runtime -= 1;
                    this.setTime();
                }
            }, 1000);
        },
        starttime() {
            this.passwordresetform.starttime = true;
            this.passwordresetform.runtime = this.passwordresetform.againtime;
            this.setTime();
        },
        resetfn() {
            this.errortxt = '';
            this.$refs.passwordresetform.validate((valid) => {
                if (valid) {
                    let param = { password: this.passwordresetform.password, code: this.passwordresetform.verifycode, type: this.passwordresetform.accounttype };
                    param[this.passwordresetform.accounttype] = this.passwordresetform.account;
                    this.$http.post('/passwordreset/reset', param).then(response => {
                        if( response.data.retcode == RETCODE_OK ){
                            this.finishstate = true;
                            setTimeout(() => {
                                this.$router.push({name: 'login'})
                            }, 2000);
                        }else{
                            this.errortxt = response.data.errmsg;
                        }
                    }).catch(err => {

                    });
                } else {
                    // this.$Message.error('表单验证失败!');
                }
            });
        }
    }
}
</script>
