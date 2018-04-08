<style lang="stylus">
.jobauth
    padding-top: 0.53rem
    .jobauthform
        .commit
            .commonbtnclass
                width: 3.07rem
                &:last-child
                    float: right
    .authsuccesswrap
        width: 5.24rem
        margin: 0 auto
        padding-top: 0.47rem
        text-align: center
        .imgicon
            height: 1.8rem
            width: 1.8rem
        p
            color: #333
            font-size: 0.3rem
            margin: 0.35rem 0
</style>

<template>
    <div class="jobauth">
        <div v-if="!is_confirm_ok">
            <div v-if="canshowform" class="jobauthform appsmallwrap">
                <div class="commonformitem">
                    <input v-model.trim="jobauthform.name" type="text" :disabled="is_info_auditing" placeholder="真实姓名" class="commomiptclass">
                </div>
                <div class="commonformitem">
                    <select v-model="jobauthform.lawyer_position" :disabled="is_info_auditing" class="commomiptclass">
                        <option value="" selected="selected" disabled="disabled">请选择用户类别</option>
                        <option :value="40">律师</option>
                        <option :value="30" :disabled="origina_lawyer_position > 30">实习律师</option>
                        <option :value="20" :disabled="origina_lawyer_position > 20">律师助理</option>
                    </select>
                </div>
                <div class="commonformitem">
                    <input v-model.trim="jobauthform.phone" type="number" :disabled="is_info_auditing" placeholder="手机号码" class="commomiptclass">
                </div>
                <div v-if="jobauthform.lawyer_position == 40 || jobauthform.lawyer_position == 30" class="commonformitem">
                    <input v-model.trim="jobauthform.lawyer_number" type="number" :disabled="is_info_auditing" :placeholder="jobauthform.lawyer_position == 40 ? '执业证号' : '实习证号'" class="commomiptclass">
                </div>
                <div v-if="jobauthform.lawyer_position == 20" class="commonformitem">
                    <input v-model.trim="jobauthform.id_number" type="text" :disabled="is_info_auditing" placeholder="身份证号" class="commomiptclass">
                </div>
                <div class="commonformitem">
                    <input v-model.trim="jobauthform.company" type="text" :disabled="is_info_auditing" placeholder="执业机构" class="commomiptclass">
                </div>
                <div v-if="jobauthform.lawyer_position > 10" class="commonformitem">
                    <input :value="selecttagslist.map(e => e.name).join('，')" :disabled="is_info_auditing" @click="opentagpanel" type="text" readonly="readonly" placeholder="专业领域" class="commomiptclass">
                    <div v-if='tagpanel' class="commonselectpanel commomiptclass">
                        <ul class="clearboth">
                            <li v-for="(list, index) in tags.list">
                                <label @click.self="gettags(list.tid, index, list)">
                                    <input type="checkbox" v-model="selecttagslist" :value="list"> {{list.name}}
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="commonformitem">
                    <input :value="jobauthform.site.join('/')" @click="locationpanel = true" type="text" :disabled="is_info_auditing" readonly="readonly" placeholder="所在地区" class="commomiptclass">
                </div>
                <div v-if="!is_info_auditing" class="commonformitem commit">
                    <button @click="commitinfo" :disabled="!info_is_change && $store.getters.auth_code_3 > 0" :class="{ gray_btn: !info_is_change && $store.getters.auth_code_3 > 0}" class="commonbtnclass">提交</button>
                    <button @click="$router.push({ name: 'personalsetNav'})" class="commonbtnclass gray_btn">取消</button>
                </div>
                <div v-else class="commonformitem">
                    <button class="commonbtnclass gray_btn">信息正在审核中...</button>
                </div>
            </div>
            <mt-popup
                v-model="locationpanel"
                position="bottom"
                class='v2bottomselectwrap'>
                <div class="localtoolbar clearboth">
                    <span @click="locationpanel = false" class="quxiao">取消</span>
                    <span @click="changeselelocal" class="queding">确定</span>
                </div>
                <mt-picker :slots="slots" @change="onValuesChange" ref="pickerlocal"></mt-picker>
            </mt-popup>
        </div>
        <div v-else class="authsuccesswrap">
            <img src="/static/icon/bindsuccess_icon.png" class="imgicon">
            <p>提交成功！祝您使用愉快！</p>
            <div><button @click="$router.push({ name: 'recommend'})" class="commonbtnclass" style="width: 2.15rem; background: #7ecef4">确 定</button><!-- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button @click="$router.push({ name: 'paymentInfo', params: { type: 'renewfee'}})" class="commonbtnclass" style="width: 2.15rem">立即付费</button> --></div>
        </div>
    </div>
</template>

<script>
import { Toast, Indicator } from 'mint-ui'
import siteJson from '../../../static/json/siteJson.json'
import {checkIdentity, checkLawyerNum_sx, checkLawyerNum, checkPhone} from '@/common/js/tools'

export default {
    name: 'jobauth',
    data () {
        return {
            siteJson,
            canshowform: false,
            is_confirm_ok: false,
            jobauthform_origin: {},
            jobauthform: {
                /*name: '',
                lawyer_position: '',
                lawyer_number: '',
                id_number: '',
                company: '',
                job: '',
                hobbys: [],
                site: [],*/
            },
            origina_lawyer_position: 0,
            tags: {
                list: [],
                isfirst: true
            },
            tagsed: [],
            selecttagslist: [],
            tagpanel: false,
            slots: [
                {
                  flex: 1,
                  values: siteJson.map(e => e.value),
                  className: 'slot1',
                  textAlign: 'center'
                },
                {
                  divider: true,
                  content: '-',
                  className: 'slot2'
                },
                {
                  flex: 1,
                  values: [],
                  className: 'slot3',
                  textAlign: 'center'
                },
                {
                  divider: true,
                  content: '-',
                  className: 'slot4'
                },
                {
                  flex: 1,
                  values: [],
                  className: 'slot5',
                  textAlign: 'center'
                }
            ],
            locationpanel: false,
            selectlocaltemp: []
        }
    },
    computed: {
        is_info_auditing() { // 是否审核中
            return !!(this.$store.getters.auth_code_1 == 4 && this.$store.getters.auth_code_3 == 0);
        },
        info_is_change() {
            return JSON.stringify(this.jobauthform) != this.jobauthform_origin;
        }
    },
    beforeMount() {
        this.get_auth_info();
    },
    mounted() {
        this.$nextTick(() => {
            setTimeout(() => {
                this.slots[0].defaultIndex = 1;
                this.$refs.pickerlocal.setSlotValue(0, '广东省');
                this.$refs.pickerlocal.setSlotValue(1, '深圳市');
                this.$refs.pickerlocal.setSlotValue(2, '福田区');
            }, 100);
        });
    },
    methods: {
        get_auth_info() {
            this.$http.get('/userinfo/getauthinfo').then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    let v = response.data.data
                    this.origina_lawyer_position = v.lawyer_position && parseInt(v.lawyer_position);
                    v.hobbys = v.hobbys ? v.hobbys.concat() : []
                    this.selecttagslist = v.hobbys

                    v.name = v.name || '';
                    v.company = v.company || '';
                    v.job = v.job || '';
                    v.id_number = v.id_number || '';
                    v.lawyer_number = v.lawyer_number || '';
                    v.phone = v.phone || '';

                    v.site = [];
                    if (v.province) {
                        v.site.push(v.province);
                    }
                    if (v.city) {
                        v.site.push(v.city);
                    }
                    if (v.area) {
                        v.site.push(v.area);
                    }
                    v.lawyer_position = v.lawyer_position == '00' ? '' : v.lawyer_position; // 值为'00'则转换为空
                    this.jobauthform_origin = JSON.stringify(v)
                    this.jobauthform = v

                    this.canshowform = true
                }else{
                    console.log( response.data.errmsg )
                }
            }).catch(err => {})
        },
        gettags(tid, i, list) {
            if( tid ) {
                // 子标签不请求, 请求过的不请求
                if( list.is_child || this.tagsed.includes(tid) ) {
                    return false
                }
                // 没请求的放进已请求数组
                this.tagsed.push(tid)
            }

            let url = tid ? `/posttag/get/${tid}`: '/posttag/get?is_owner=true';
            this.$http.get(url).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    let v = response.data.data
                    if( tid ){
                        let idx = this.tags.list.findIndex(e => e.tid == tid)
                        this.tags.list.splice( idx + 1, 0, ...v)
                    }else{
                        this.tags.list = v
                        v.forEach((e, i) => {
                            this.gettags(e.tid, i, e)
                        })
                    }
                }else{
                    console.log( response.data.errmsg )
                }
            }).catch(err => {})
        },
        opentagpanel() {
            if( !this.is_info_auditing ){
                if( this.tags.isfirst ){
                    this.gettags()
                    this.tags.isfirst = false
                }
                this.tagpanel = !this.tagpanel
            }
        },
        onValuesChange(picker, values) {
            if( values[0] ){
                let sheng = this.siteJson.map(e => e.value)
                let shi = this.siteJson.find(e => e.value == values[0]).children.map(e => e.value)
                picker.setSlotValues(1, shi);
                let xian = []
                if( values[1] && shi.includes(values[1]) ){
                    xian = this.siteJson.find(e => e.value == values[0]).children.find(e => e.value == values[1]).children.map(e => e.value)
                }
                picker.setSlotValues(2, xian);
                this.selectlocaltemp = values;
            }
        },
        changeselelocal() {
            this.jobauthform.site = JSON.parse(JSON.stringify(this.selectlocaltemp))
            this.locationpanel = false
        },
        commitinfo() {
            if( !this.info_is_change && this.$store.getters.auth_code_3 > 0 ){
                return false
            }
            this.jobauthform.name = this.jobauthform.name.replace( /(\(|（)?律师(\)|）)?$/, '')
            if( this.jobauthform.name == '' ){
                Toast('真实姓名不能为空！')
                return false
            }
            if( this.jobauthform.lawyer_position == '' ){
                Toast('请选择用户类别！')
                return false
            }
            if( this.jobauthform.phone == '' ){
                Toast('手机号不能为空！')
                return false
            }
            if( !checkPhone(this.jobauthform.phone) ){
                Toast('手机号错误！')
                return false
            }
            if( this.jobauthform.lawyer_position == 40 && this.jobauthform.lawyer_number == '' ){
                Toast('执业证号不能为空！')
                return false
            }
            if( this.jobauthform.lawyer_position == 40 && this.jobauthform.lawyer_number != '' && !checkLawyerNum(this.jobauthform.lawyer_number) ){
                Toast('执业证号错误！')
                return false
            }
            if( this.jobauthform.lawyer_position == 30 && this.jobauthform.lawyer_number == '' ){
                Toast('实习证号不能为空！')
                return false
            }
            if( this.jobauthform.lawyer_position == 30 && this.jobauthform.lawyer_number != '' && !checkLawyerNum_sx(this.jobauthform.lawyer_number) ){
                Toast('实习证号错误！')
                return false
            }
            if( this.jobauthform.lawyer_position == 20 && this.jobauthform.id_number == '' ){
                Toast('身份证号不能为空！')
                return false
            }
            if( this.jobauthform.lawyer_position == 20 && this.jobauthform.id_number != '' && !checkIdentity(this.jobauthform.id_number) ){
                Toast('身份证号错误！')
                return false
            }
            if( this.jobauthform.company == '' ){
                Toast('执业机构不能为空！')
                return false
            }
            if( this.jobauthform.lawyer_position != 10 ){
                let str = '执业机构 ';
                let bestr = this.jobauthform.company;
                if( /\d/.test(bestr) ){
                    Toast(str + '不能含有数字！');
                    return;
                }
                let banword = bestr.match(/(省|自治区|市|县|中国|中华|全国|国际|中心|涉外|经济|金融|房地产)/g);
                if( banword ){
                    Toast(str + '含有敏感词：' + banword.join('、'));
                    return;
                }
                if( !/\S+律师事务所$/.test(bestr) ){
                    Toast(str + '格式不符合！例：XX律师事务所');
                    return;
                }
            }
            if( !this.selecttagslist.length ){
                Toast('至少选择一个专业领域！')
                return false
            }
            if( !this.jobauthform.site.length ){
                Toast('所在地区不能为空！')
                return false
            }
            this.jobauthform.hobby_ids = this.selecttagslist.map(e => e.tid).join(',')
            this.jobauthform.province  = this.jobauthform.site[0]
            this.jobauthform.city = this.jobauthform.site[1]
            this.jobauthform.area = this.jobauthform.site[2]
            this.$http.post('/userinfo/setauthinfo', this.jobauthform).then(response => {
                if( response.data.retcode == RETCODE_OK ){

                    // 上一次是否有过认证
                    let hadConfirm = this.$store.getters.auth_code_3 == 0 ? false : true;

                    /* 修改状态码(第一位为4，第二、三位为选择的lawyer_position,四位变为0) */
                    let auth_code_str = this.$store.state.userInfo.auth_code.toString();
                    let auth_code_value = '4' + this.jobauthform.lawyer_position + '0' + auth_code_str.substring(4);
                    this.$store.commit('changeUserInfo', { key: 'auth_code', value: Number(auth_code_value)});

                    if( hadConfirm ){
                        Toast('提交认证成功！')
                        this.$router.push({name: 'feed'})
                    }else{
                        this.is_confirm_ok = true
                    }
                }else{
                    Toast( response.data.errmsg )
                }
            }).catch(err => {});
        }
    },
    filters: {

    },
    watch: {
        selecttagslist(v, ov) {
            this.jobauthform.hobbys = JSON.parse(JSON.stringify(v))
            if( v.length > 3 ){
                this.selecttagslist = ov
                Toast('专业领域最多只能选择3项！')
            }
        }
    },
    components: {

    }
}
</script>
