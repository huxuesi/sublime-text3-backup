<style lang="stylus">
.identitySet
    .wrap
        padding 50px 0
        .tit
            color #1c1c1c
            font-size 16px
        .ivu-cascader-menu
            min-width 180px
        .main
            .selected_major
                position absolute
                top 0
                left 8px
                z-index 4
            .major_input
                .ivu-input
                    color transparent
                    cursor pointer
                &.major_input_disabled
                    .ivu-input
                        cursor not-allowed
            .ivu-form
                .ivu-form-item
                    margin-bottom 18px
.tag_modal
    .ivu-modal-body
        .creat_tag
            margin 15px 0 0 20px
            width 70px
            font-size 14px
            color #3dc1ff
            cursor pointer
            .ivu-input
                border-radius 16px
        .theme
            margin-top 5px
            width: 100%
            .item
                float: left
                margin: 10px 18px
                width 85px
                height 30px
                line-height 30px
                text-align center
                border: 1px solid #CCCCCC
                border-radius: 17px
                background-color: #fff
                cursor: pointer
                &.is_child
                    background-color: #e1eaef
                &.isSelected
                    background-color: #3dc1ff
                    color: #fff
                    border: 1px solid transparent
                .tag_pop
                    .ivu-poptip-content
                        width: 80px
            .tagsList-enter-active,.tagsList-leave-active
                transition: all .5s
            .tagsList-enter,.tagsList-leave-active
                opacity: 0
                transform: translateX(-60px)
</style>

<template>
    <div class="identitySet">
        <Row class="wrap" v-if="!is_confirm_ok">
            <Col span="4" class="tit">认证信息</Col>
            <Col v-if="get_ID_info_ok" span="16" class="main">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="left" :label-width="80">
                    <FormItem label="真实姓名" prop="name">
                        <Input v-model="formValidate.name" :disabled="is_info_auditing" placeholder="输入您的真实姓名"></Input>
                    </FormItem>
                    <FormItem label="用户类别" prop="lawyer_position">
                        <Select v-model="formValidate.lawyer_position" :disabled="is_info_auditing" placeholder="请选择认证的用户类别">
                            <Option value="40">律师</Option>
                            <Option value="30" :disabled="origina_lawyer_position > 30">实习律师</Option>
                            <Option value="20" :disabled="origina_lawyer_position > 20">律师助理</Option>
                            <!-- <Option value="10" :disabled="origina_lawyer_position > 10">高级用户</Option> -->
                        </Select>
                    </FormItem>
                    <FormItem label="手机号码" prop="phone">
                        <Input v-model="formValidate.phone":disabled="is_info_auditing" placeholder="请输入手机号码"></Input>
                    </FormItem>
                    <FormItem
                        :label="formValidate.lawyer_position == '40'?'执业证号': '实习证号'"
                        prop="lawyer_number"
                        v-if="formValidate.lawyer_position == '40' || formValidate.lawyer_position == '30'">
                        <Input
                            v-model="formValidate.lawyer_number"
                            :disabled="is_info_auditing"
                            :placeholder="formValidate.lawyer_position == '40'?'请输入执业证号': '请输入实习证号'">
                        </Input>
                    </FormItem>
                    <FormItem label="身份证号" prop="id_number" v-if="formValidate.lawyer_position == '20' || formValidate.lawyer_position == '10'">
                        <Input v-model="formValidate.id_number":disabled="is_info_auditing" placeholder="请输入身份证号"></Input>
                    </FormItem>
                    <FormItem :label="formValidate.lawyer_position == '10'?'工作单位': '执业机构'" prop="company">
                        <Input
                            v-model="formValidate.company"
                            :disabled="is_info_auditing"
                            :placeholder="formValidate.lawyer_position == '10'?'请输入工作单位': '请输入执业机构'">
                        </Input>
                    </FormItem>
                    <FormItem label="职　　务" prop="job" v-if="formValidate.lawyer_position == '10'">
                        <Input v-model="formValidate.job" :disabled="is_info_auditing" placeholder="请输入您的职务"></Input>
                    </FormItem>

                    <FormItem v-if="formValidate.lawyer_position > 10" label="专业领域" prop="hobbys">
                        <Input class="major_input"
                            :class="{major_input_disabled: is_info_auditing}"
                            v-model="hobbysPH"
                            readonly
                            :disabled="is_info_auditing"
                            placeholder="请选择专业领域"
                            @on-focus="open_tag_modal">
                        </Input>
                        <Modal
                            v-model="tagModal"
                            :closable="false"
                            :mask-closable="false"
                            width="545"
                            class-name="tag_modal">

                            <div class="modal_tit tag_tit">添加领域</div>

                            <div class="creat_tag" v-if="show_creat_tag_text" @click.stop="to_creat_tag_input">创建标签+</div>
                            <Input class="creat_tag" ref="creat_tag_input" v-else v-model="creat_tag_model" @on-blur="creat_tag"></Input>

                            <div v-if="tags.length>0" class="theme">
                                <transition-group name="tagsList" tag="ul" class="list clearfix" style="overflow-y: auto; max-height: 404px">
                                    <li @click="change_majorList(tag)" class="item" v-for="(tag,index) in tags" :key="index" :class="{is_child: tag.is_child, isSelected: tag.isSelected}">
                                        <Poptip class="tag_pop" v-if="tag.is_self" v-model="tag.visible" placement="bottom-start" trigger="hover">
                                            <div>{{tag.name}}</div>
                                            <div slot="content">
                                                <a @click.stop="del_self_tag(tag.tid,index)">删除</a>
                                            </div>
                                        </Poptip>
                                        <div v-else>{{tag.name}}</div>
                                    </li>
                                </transition-group>
                            </div>

                            <div slot="footer">
                                <Button type="primary" @click="modal_ok">确 定</Button>
                                <Button class="gray_btn" type="primary" @click="modal_cancel">取 消</Button>
                            </div>
                        </Modal>
                        <div class="selected_major" v-if="formValidate.hobbys.length">
                            <Tag v-for="(tag,index) in formValidate.hobbys" :key="index" :closable="!is_info_auditing" @on-close="removeMajorTag(index,tag.tid)">{{tag.name}}</Tag>
                        </div>
                    </FormItem>

                    <FormItem label="所在地区" prop="site" style="margin-bottom: 34px">
                        <Cascader :disabled="is_info_auditing" :data="siteJson" v-model="formValidate.site" change-on-select placeholder="请选择所在地"></Cascader>
                    </FormItem>
                    <FormItem>
                        <Button :disabled="!info_is_change && $store.getters.auth_code_3 > 0" long type="primary" @click="submit_ID_info('formValidate')">{{submit_btn}}</Button>
                    </FormItem>
                </Form>
            </Col>
        </Row>
        <confirmOk v-else></confirmOk>
    </div>
</template>

<script>
import siteJson from '../../../static/json/siteJson.json';
import confirmOk from './confirmOk';
import {checkIdentity, checkLawyerNum_sx, checkLawyerNum, checkPhone} from '@/common/js/check';
export default {
    name: 'identitySet',
    components: {confirmOk},
    data () {
        return {
            is_confirm_ok: false, // 认证成功的页面
            origina_lawyer_position: 0, // 原本的用户类别
            /* 地点 */
            siteJson,
            get_ID_info_ok: false,
            /* 表单 */
            formValidate_original: JSON.stringify({
                name: '',
                lawyer_position: '',
                lawyer_number: '',
                id_number: '',
                company: '',
                job: '',
                hobbys: [],
                site: [], // '河北省','秦皇岛市','北戴河区'
                phone: ''
            }),
            formValidate: {
                name: '',
                lawyer_position: '',
                lawyer_number: '',
                id_number: '',
                company: '',
                job: '',
                hobbys: [],
                site: [],
                phone: ''
            },
            /* 表单验证 */
            ruleValidate: {
                name: [
                    { required: true, message: '请输入您的真实姓名', trigger: 'change' }
                ],
                lawyer_position: [
                    { required: true, message: '请选择认证的用户类别', trigger: 'change' }
                ],
                lawyer_number: [
                    { required: true, validator : (rule, value, callback) => {
                        if (this.formValidate.lawyer_position == '40') {
                            if (checkLawyerNum(value)) {
                                callback();
                            } else {
                                callback(new Error('请输入正确的执业证号'));
                            }
                        } else {
                            if (checkLawyerNum_sx(value)) {
                                callback();
                            } else {
                                callback(new Error('请输入正确的实习证号'));
                            }
                        }
                    }, trigger: 'change'},
                ],
                id_number: [
                    { required: true, validator : (rule, value, callback) => {
                        if (checkIdentity(value)) {
                            callback();
                        } else {
                            callback(new Error('身份证号不正确'));
                        }
                    }, trigger: 'change' }
                ],
                company: [
                    { required: true, message: '请输入所在单位', trigger: 'change' },
                ],
                job: [
                    { required: true, message: '请输入您的职务', trigger: 'change' },
                ],
                hobbys: [
                    { required: true, type: 'array', min: 1, max: 3, message: '至少选择一个专业领域', trigger: 'change' }
                ],
                site: [
                    { required: true, type: 'array', min: 3, max: 3, message: '请选择城市', trigger: 'change' }
                ],
                phone: [
                    {
                        required: true,
                        validator : (rule, value, callback) => {
                            if (!value) {
                                callback(new Error('请输入手机号'));
                            }else{
                                // 手机号
                                if (checkPhone(value)) {
                                    callback();
                                } else {
                                    callback(new Error('手机号不正确'));
                                }
                            }
                        },
                        trigger: 'change'
                    }
                ],
            },
            hobbys_modal: [], // modal里面选中的标签
            is_frist_open_tag_modal: true,
            tagModal: false,
            tags:[], // 主题数据
            tids: [], // 请求过的tid
            creat_tag_model: '',
            show_creat_tag_text: true,
        }
    },
    computed: {
        hobbysPH() {
            return this.formValidate.hobbys.length || '';
        },
        is_info_auditing() { // 是否审核中
            return !!(this.$store.getters.auth_code_1 == 4 && this.$store.getters.auth_code_3 == 0);
        },
        submit_btn() {
            return this.is_info_auditing? '信息正在审核中...': '提 交 认 证';
        },
        info_is_change() {
            return JSON.stringify(this.formValidate) != this.formValidate_original;
        }
    },
    mounted() {
        this.get_ID_info();
    },
    activated() {
        this.is_confirm_ok = false;
    },
    methods: {
        to_creat_tag_input() {
            this.show_creat_tag_text = false;
            this.$nextTick(() => {
                this.$refs.creat_tag_input.focus();
            });
        },
        /* 从选中的tags中移除 */
        removeMajorTag(index,tid) {
            this.formValidate.hobbys.splice(index,1);
            this.hobbys_modal.splice(index,1);
            this.tags.map((val) => {
                if(val.tid == tid) {
                    val.isSelected = false;
                }
                return val;
            })
        },
        /* modal确定跟取消 */
        modal_ok() {
            this.formValidate.hobbys = this.hobbys_modal.concat();
            this.tagModal = false;
        },
        modal_cancel() {
            this.hobbys_modal = this.formValidate.hobbys.concat();
            let majorList_modal_tids = [];
            this.hobbys_modal.forEach((val) => {
                majorList_modal_tids.push(val.tid);
            })
            /* 改变标签的isSelected状态 */
            this.tags.map((val) => {
                if(majorList_modal_tids.indexOf(val.tid) > -1) {
                    val.isSelected = true;
                }else {
                    val.isSelected = false;
                }
                return val;
            });
            this.tagModal = false;
        },
        init_isSelected(val) {
            val.isSelected = false;
            this.hobbys_modal.forEach((value) => {
                if(value.tid == val.tid) {
                    val.isSelected = true;
                }
            });
        },
        change_majorList(tag) {
            /* 改变选中状态 */
            if (!tag.isSelected) {
                if (this.hobbys_modal.length === 3) {
                    this.$Message.warning('专业领域最多只能设置3项！');
                }else {
                    tag.isSelected = true;
                }
            }else {
                tag.isSelected = false;
            }
            /* 根据选中状态改变majorList */
            if (tag.isSelected) {
                this.hobbys_modal.push(tag);
            }else{
                this.hobbys_modal.forEach((val,index,arr) => {
                    if (val.tid == tag.tid) {
                        arr.splice(index,1);
                    }
                });
            }
        },
        getTags(tag, i) {
            /* 改变选择项 */
            /*if(tag){
                this.change_majorList(tag);
            }*/

            let id = tag && tag.tid;
            /* 过滤子标签、自创建标签和请求过的一级标签 */
            if(id && (this.tids.indexOf(id) > -1 || tag.is_child || tag.is_self)) {
                return;
            }
            let url = id? `/posttag/get/${id}`: '/posttag/get?is_owner=true';
            this.$http.get(url).then(response => {
                let data = response.data;
                if( data.retcode == RETCODE_OK ){
                    if( id ){
                        /* 记录请求过的tid */
                        this.tids.push(id);

                        /* 获取子tag */
                        if (data.data.length) {
                            data.data.map((val) => {
                                this.init_isSelected(val);
                                return val;
                            });
                            let idx = this.tags.findIndex(e => e.tid == id);
                            this.tags.splice( idx + 1, 0, ...data.data);
                        }
                    }else{
                        if (data.data.length) {
                            data.data.map((val, i) => {
                                val.visible = false; // Poptip的显示
                                this.init_isSelected(val);
                                this.getTags(val, i);
                                return val;
                            });
                        }
                        this.tags = data.data;
                    }

                    if (this.is_frist_open_tag_modal) {
                        this.is_frist_open_tag_modal = false;
                        this.tagModal = true;
                    }
                }else{
                    this.$Message.error(data.errmsg);
                }
            }).catch(err => {});
        },
        open_tag_modal() {
            if (this.is_frist_open_tag_modal) {
                this.getTags();
            }else {
                this.tagModal = true;
            }
        },
        del_self_tag(tid,index) {
            let url = '/posttag/delete';
            this.$http.post(url,{tid: tid}).then(response => {
                let data = response.data;
                if( data.retcode == RETCODE_OK ){
                    this.formValidate.hobbys = this.formValidate.hobbys.filter(item => item != tid);
                    this.hobbys_modal = this.hobbys_modal.filter(item => item.tid != tid);
                    this.tags.splice(index,1);

                    this.$Message.success('删除标签成功');
                }else{
                    this.$Message.error(data.errmsg);
                }
            }).catch(err => {});
        },
        creat_tag() {
            if (!this.creat_tag_model) {
                this.show_creat_tag_text = true;
            } else {
                let url = '/posttag/add';
                this.$http.post(url,{name: this.creat_tag_model}).then(response => {
                    let data = response.data;
                    if( data.retcode == RETCODE_OK ){
                        this.tags.push({
                            is_child: false,
                            isSelected: false,
                            is_self: true,
                            visible: false,
                            tid: data.tid,
                            name: this.creat_tag_model
                        });
                        this.$Message.success('标签创建成功！');
                        this.creat_tag_model = '';
                    }else{
                        this.$Message.error(data.errmsg);
                    }
                }).catch(error => {
                    console.log(error);
                });
                this.show_creat_tag_text = true;
            }
        },
        get_ID_info() {
            let url = '/userinfo/getauthinfo';
            this.$http.get(url).then(response => {
                let data = response.data;
                if( data.retcode == RETCODE_OK ){

                    this.get_ID_info_ok = true;

                    this.origina_lawyer_position = data.data.lawyer_position && parseInt(data.data.lawyer_position);
                    data.data.hobbys = data.data.hobbys?data.data.hobbys.concat(): []
                    this.hobbys_modal = data.data.hobbys;

                    data.data.name = data.data.name || '';
                    data.data.company = data.data.company || '';
                    data.data.job = data.data.job || '';
                    data.data.id_number = data.data.id_number || '';
                    data.data.lawyer_number = data.data.lawyer_number || '';
                    data.data.phone = data.data.phone || '';

                    data.data.site = [];
                    if (data.data.province) {
                        data.data.site.push(data.data.province);
                    }
                    if (data.data.city) {
                        data.data.site.push(data.data.city);
                    }
                    if (data.data.area) {
                        data.data.site.push(data.data.area);
                    }

                    data.data.lawyer_position = data.data.lawyer_position == '00'? '': data.data.lawyer_position; // 值为'00'则转换为空

                    this.formValidate_original = JSON.stringify(Object.assign({},this.formValidate,data.data));
                    this.formValidate = Object.assign({},this.formValidate,data.data);
                }else{
                    this.$Message.error(data.errmsg);
                }
            }).catch(err => {});
        },
        filter_hobby_ids(hobbys) {
            let hobby_ids = [];
            hobbys.forEach((val) => {
                hobby_ids.push(val.tid);
            });
            return hobby_ids.join();
        },
        submit_ID_info(name) {
            if( this.is_info_auditing ){
                return false;
            }
            this.formValidate.name = this.formValidate.name.replace( /(\(|（)?律师(\)|）)?$/, '');
            this.$refs[name].validate((valid) => {
                if (valid) {
                    if( this.formValidate.lawyer_position != '10' ){
                        let str = '执业机构 ';
                        let bestr = this.formValidate.company;
                        /*if( /\d/.test(bestr) ){
                            this.$Message.error(str + '不能含有数字！');
                            return;
                        }
                        let banword = bestr.match(/(省|自治区|市|县|中国|中华|全国|国际|中心|涉外|经济|金融|房地产)/g);
                        if( banword ){
                            this.$Message.error(str + '含有敏感词：' + banword.join('、'));
                            return;
                        }*/
                        if( !/\S+律师事务所$/.test(bestr) ){
                            this.$Message.error(str + '格式不符合！例：XX律师事务所');
                            return;
                        }
                    }
                    let url = '/userinfo/setauthinfo';
                    let param = {
                        name: this.formValidate.name,
                        province: this.formValidate.site[0],
                        city: this.formValidate.site[1],
                        area: this.formValidate.site[2],
                        company: this.formValidate.company,
                        job: this.formValidate.job,
                        lawyer_position: this.formValidate.lawyer_position,
                        id_number: this.formValidate.id_number,
                        lawyer_number: this.formValidate.lawyer_number,
                        hobby_ids: this.filter_hobby_ids(this.formValidate.hobbys),
                        phone: this.formValidate.phone
                    };
                    this.$http.post(url,param).then(response => {
                        let data = response.data;
                        if( data.retcode == RETCODE_OK ){
                            this.$Message.success('提交成功!');

                            // 上一次是否有过认证
                            let hadConfirm = this.$store.getters.auth_code_3 == 0? false: true;

                            /* 修改状态码(第一位为4，第二、三位为选择的lawyer_position,四位变为0) */
                            let auth_code_str = this.$store.state.mineInfo.auth_code.toString();
                            let auth_code_value = '4' + this.formValidate.lawyer_position + '0' + auth_code_str.substring(4);
                            this.$store.commit('changeMineInfo',{key:'auth_code',value:Number(auth_code_value)});
                            this.$store.commit('changeMineInfo',{key:'name',value:this.formValidate.name});

                            hadConfirm? this.$router.push({name: 'feed'}): this.is_confirm_ok = true;

                        }else{
                            this.$Message.error(data.errmsg);
                        }
                    }).catch(err => {});
                }
            })
        },
    }
}
</script>
