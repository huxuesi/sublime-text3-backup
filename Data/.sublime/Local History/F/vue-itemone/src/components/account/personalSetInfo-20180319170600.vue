<style lang="stylus">
.personalSetInfo
    .title
        font-size: 0.32rem
        color: #333
        text-align: center
        padding: 0.25rem 0
        border-bottom: 1px solid #e5e5e5
        margin-bottom: 0.5rem
    .personalinfoform
        .commit
            .commonbtnclass
                width: 3.07rem
                &:last-child
                    float: right
</style>

<template>
    <div class="personalSetInfo">
        <div class="title">个人信息</div>
        <div class="personalinfoform appsmallwrap">
            <div class="commonformitem">
                <input :disabled="$authCodeT($store.getters.auth_code_123).isLawyer" v-model.trim="personalInfo.nickname" type="text" placeholder="昵称" class="commomiptclass" maxlength="5">
            </div>
            <div class="commonformitem">
                <input :disabled="is_info_auditing" v-model.trim="personalInfo.mobile" type="number" placeholder="手机号" class="commomiptclass">
            </div>
            <div class="commonformitem">
                <input v-if="!$authCodeT($store.getters.auth_code_123).isLawyer" v-model.trim="personalInfo.company" type="text" placeholder="公司名称" class="commomiptclass" maxlength="30">
            </div>
            <div class="commonformitem">
                <input v-if="!$authCodeT($store.getters.auth_code_123).isLawyer" v-model.trim="personalInfo.job" type="text" placeholder="职位" class="commomiptclass" maxlength="30">
            </div>
            <div class="commonformitem">
                <textarea v-model.trim="personalInfo.profile" @keydown.enter.prevent="" class="commomiptclass" rows="3" maxlength="30" placeholder="自我描述（最多30个字）"></textarea>
            </div>
            <div class="commonformitem commit">
                <button @click="commitinfo" class="commonbtnclass">提交</button>
                <button @click="$router.push({ name: 'personalsetNav'})" class="commonbtnclass gray_btn">取消</button>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'

export default {
    name: 'personalSetInfo',
    data () {
        return {
            personalInfo: {
                nickname: '',
                mobile: '',
                profile: ''
            }
        }
    },
    computed: {
        is_info_auditing() { // 是否审核中
            return !!(this.$store.getters.auth_code_1 == 4 && this.$store.getters.auth_code_3 == 0);
        }
    },
    beforeMount() {
        this.getUserInfo();
    },
    mounted() {

    },
    methods: {
        getUserInfo() {
            this.$http.get('/userinfo/getuserinfo').then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    let v = response.data.data
                    this.personalInfo = v
                }else{
                    console.log( response.data.errmsg )
                }
            }).catch(err => {})
        },
        commitinfo() {
            if( this.personalInfo.nickname == '' && this.personalInfo.nickname === null ){
                Toast('昵称不能为空！')
                return false
            }
            if( this.$authCodeT(this.$store.getters.auth_code_123).isLawyer &&! this.personalInfo.mobile ){
                Toast('律师必须填写手机号！')
                return false
            }
            if( this.personalInfo.mobile != '' && !(/^1[0-9]{10}$/.test(this.personalInfo.mobile)) ){
                Toast('手机号错误！')
                return false
            }
            this.$http.post('/userinfo/setuserinfo', this.personalInfo).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    this.$router.push({ name: 'personalsetNav'})
                    Toast('个人信息设置成功！')
                }else{
                    Toast( response.data.errmsg )
                }
            }).catch(err => {})
        }
    },
    filters: {

    },
    components: {

    }
}
</script>
