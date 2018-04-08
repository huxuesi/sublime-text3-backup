<style lang="stylus" scoped>
.bindAccount
    .title
        font-size: 0.32rem
        color: #333
        text-align: center
    .bindAccountone
        width: 4rem
        margin: 0 auto
        padding: 1.5rem 0 0
        .commonbtnclass
            margin-top: 0.4rem
        .tips
            color: #5ebfb7
            margin-top: 0.3rem
            span
                color: #7373d6
    .bindAccounttwo
        .title
            padding: 0.25rem 0
            margin-bottom: 1.4rem
            border-bottom: 1px solid #e5e5e5
</style>

<template>
    <div class="bindAccount">
        <div v-if="step == 'one'" class="bindAccountone">
            <div class="title">绑定已有账号？</div>
            <button @click="step = 'two'" class="commonbtnclass">确 定</button>
            <button @click="$router.push({ name: 'recommend'})" class="commonbtnclass gray_btn">取 消</button>
            <div class="tips">
                1、确定：可继承被绑定账号的PC端（<span>www.honsenflag.com</span>）上的所有数据；
                <br>
                <br>
                2、取消：云平台将生成微信端新帐号，可在PC端扫码登录；
            </div>
        </div>
        <div v-if="step == 'two'" class="bindAccounttwo">
            <div class="title">绑定账号</div>
            <div class="login">
                <div class="form-group">
                    <input v-model.trim="bindform.username" class="accountipt" type="text" placeholder="已有手机 / 邮箱账号">
                </div>
                <div class="form-group">
                    <input v-model.trim="bindform.password" class="accountipt" type="password" placeholder="密码">
                </div>
                <div class="form-group error">
                    {{this.errMsg}}
                </div>
                <div class="form-group">
                    <button @click="bindfn" class="accountbtn">绑　　定</button>
                </div>
                <div class="form-group">
                    <p class="toregister"><a @click.stop="$router.push({ name: 'passwordReset' })" href="javascript:;">忘记密码？</a></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
import sockets from '../../vueSocket.js'

export default {
    name: 'bindAccount',
    data () {
        return {
            step: 'one',
            bindform: {
                username: '',
                password: ''
            },
            errMsg: ''
        }
    },
    beforeMount() {
        let t = this.$route.query.type
        if( t == 'one' ){
            this.step = 'one'
        }
        if( t == 'two' ){
            this.step = 'two'
        }
    },
    methods: {
        bindfn() {
            this.errMsg = '';
            if( this.bindform.username == '' ){
                this.errMsg = '账号不能为空！';
                return false
            }
            if( this.bindform.password == '' ){
                this.errMsg = '密码不能为空！';
                return false
            }
            let type
            if( /^1[0-9]{10}$/.test(this.bindform.username) ){
                type = 'phone'
            }else if( /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.bindform.username) ){
                type = 'email'
            }else{
                this.errmsg = '请输入正确的手机号/邮箱'
                return false
            }

            let param = { password: this.bindform.password, logintype: 'weixinweb', type: type};
            param[type] = this.bindform.username;
            this.$http.post('/useraccount/attachexistaccount', param).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    Toast('绑定成功！')
                    this.$store.commit('addUserInfo', response.data.data)
                    if(window.socket){
                        window.socket.close();
                    }
                    sockets(response.data.data.id)
                    this.$router.push({ name: 'recommend'})
                }else{
                    Toast(response.data.errmsg)
                    this.errMsg = response.data.errmsg;
                }
            }).catch(err => {
                if( err.response ) {
                    switch( err.response.status ) {
                        case 422:
                            this.errMsg = '账号与密码不符或不存在此账号!';
                    }
                }
            });
        }
    },
    computed: {

    }
}
</script>
