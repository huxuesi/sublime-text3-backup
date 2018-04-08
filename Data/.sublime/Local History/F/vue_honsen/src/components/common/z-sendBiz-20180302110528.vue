<style lang="stylus">
@import '../../common/stylus/mixin.styl'

.z-sendbiz
    padding: 0 0 20px
    .sendbiz_content
        padding: 0 37px
        .ivu-radio-wrapper
            margin-right 30px
    .file_wrap
        float left
        width 100%
        .file_wrap_icon
            float left
            cursor pointer
            bgImg(35px, 32px, '/static/icon/0037.png')
            &.active
                background-image url('/static/icon/0038.png')
        .file_item
            float left
            position relative
            padding 0 10px
            height 30px
            line-height 30px
            .line
                position absolute
                top 0px
                right 0px
        .filesjson_panel_pop
            margin-left 18px
            position relative
            .more
                display block
                font-weight bold
                cursor pointer
            .ivu-poptip-popper
                // left -293px !important
                // top 25px !important
                .file_item
                    width 100%
                    height 40px
                    line-height 40px
                    &:hover
                        background-color #f1f5f6
    .casetit
        font-size: 16px
        color: #333
    .casecontent
        max-height: 240px
        min-height: 100px
        word-break: break-word
        overflow-y: auto
        padding: 5px
    .readonlybottom
        padding-top: 15px
        border-top: 1px solid #e8e8e8
        .commenticon
            float: right
            cursor: pointer
            font-size: 12px
            margin: 6px 0 0
            img
                vertical-align: text-bottom
                margin: 0 6px 0 0
        .file_wrap_icon
            background-position: left
</style>

<template>
    <div class="z-sendbiz">
        <div v-if="typeof sendbizeditinfo.name !== 'undefined'" class="sendbiz_content">
            <div class="commonform">
                <Form ref="sendbizeditinfo" :model="sendbizeditinfo" :rules="ruleValidate">
                    <FormItem v-if="!readOnly" prop="ctmid">
                        <RadioGroup v-model.trim="sendbizeditinfo.ctmid" @on-change="userCompanyChange">
                            <Radio v-for="list in usercompanylist" :label="list.ctmid" :key="list.ctmid">{{list.name}}</Radio>
                            <Radio :label="-1" :key="-1">私人业务</Radio>
                        </RadioGroup>
                    </FormItem>

                    <FormItem>
                        <FormItem>
                            <Row>
                                <Col span="24">
                                    <FormItem prop="name">
                                        <div v-if="readOnly" class="casetit">{{sendbizeditinfo.name}}</div>
                                        <Input v-else v-model.trim="sendbizeditinfo.name" placeholder="输入业务标题"></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                        </FormItem>
                        <FormItem>
                            <Row>
                                <Col span="24">
                                    <FormItem prop="content">
                                        <div v-if="readOnly" class="casecontent">{{sendbizeditinfo.content}}</div>
                                        <Input v-else v-model.trim="sendbizeditinfo.content" type="textarea" :rows="7" placeholder="输入业务内容" class="mt-1"></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                        </FormItem>
                        <FormItem class="mt-13">
                            <Row v-if="!readOnly" :gutter="12">
                                <Col span="2">
                                    <z_fileUpload
                                        :filelist="sendbizeditinfo.filesjson"
                                        :params="fileup_param"
                                        @fileUpSuccess="fileUpSuccess"
                                        @fileUpError="fileUpError">
                                        <Button type="info" slot="icon">上传附件+</Button>
                                    </z_fileUpload>
                                </Col>
                                <Col span="10">
                                    <div class="file_wrap clearfix">&nbsp;
                                        <div
                                            class="file_wrap_icon"
                                            v-show="sendbizeditinfo.filesjson && sendbizeditinfo.filesjson.length"
                                            :class="{active: !show_files}"
                                            @click="show_files = !show_files">
                                        </div>
                                        <div
                                            v-if="sendbizeditinfo.filesjson && sendbizeditinfo.filesjson.length && index < 2"
                                            v-show="show_files"
                                            class="file_item"
                                            v-for="(file, index) in sendbizeditinfo.filesjson"
                                            :key="index">
                                            <fileRead :file="file" @del-file="del_file(index)" :needDel="true"></fileRead>
                                            <div class="line">|</div>
                                        </div>
                                        <Poptip
                                            v-if="sendbizeditinfo.filesjson.length > 2"
                                            v-show="show_files"
                                            class="filesjson_panel_pop"
                                            placement="bottom-end"
                                            width="325"
                                            trigger="hover"
                                            :transfer="false">
                                            <span class="more">. . .</span>
                                            <div slot="content">
                                                <div class="file_item" v-if="index > 1" v-for="(file, index) in sendbizeditinfo.filesjson" :key="index">
                                                    <fileRead :file="file" @del-file="del_file(index)" :needDel="true"></fileRead>
                                                </div>
                                            </div>
                                        </Poptip>
                                    </div>
                                </Col>

                                <Col :span="id ? 7 : 5" offset="5">
                                    <FormItem prop="lawyers">
                                        <Select v-model="sendbizeditinfo.lawyers" :class="{ nodelselectselectwrap: this.id}" class="selectselectwrap" placeholder="请选择发送对象" multiple>
                                            <Option v-for="list in userlawyerlist" :disabled="templawyers.includes(list.id)" :value="list.id" :key="list.id">{{list.name}}</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col v-if="!id" span="2">
                                    <Button @click="sendBiz" type="info" long>发送</Button>
                                </Col>
                            </Row>
                        </FormItem>
                    </FormItem>
                </Form>
            </div>
            <Row v-if="readOnly" class="readonlybottom">
                <Col span="21">
                    <div class="file_wrap clearfix">&nbsp;
                        <div
                            class="file_wrap_icon"
                            v-show="sendbizeditinfo.filesjson && sendbizeditinfo.filesjson.length"
                            :class="{active: !show_files}"
                            @click="show_files = !show_files">
                        </div>
                        <div
                            v-if="sendbizeditinfo.filesjson && sendbizeditinfo.filesjson.length && index < 4"
                            v-show="show_files"
                            class="file_item"
                            v-for="(file, index) in sendbizeditinfo.filesjson"
                            :key="index">
                            <fileRead :file="file" @del-file="del_file(index)" :needDel="false"></fileRead>
                            <div class="line">|</div>
                        </div>
                        <Poptip
                            v-if="sendbizeditinfo.filesjson.length > 4"
                            v-show="show_files"
                            class="filesjson_panel_pop"
                            placement="bottom-end"
                            width="325"
                            trigger="hover"
                            :transfer="false">
                            <span class="more">. . .</span>
                            <div slot="content">
                                <div class="file_item" v-if="index > 3" v-for="(file, index) in sendbizeditinfo.filesjson" :key="index">
                                    <fileRead :file="file" @del-file="del_file(index)" :needDel="false"></fileRead>
                                </div>
                            </div>
                        </Poptip>
                    </div>
                </Col>
                <Col span="3">
                    <span @click="displaycomment = !displaycomment" class="commenticon">
                        <img v-show="displaycomment" src="/static/icon/feed_comment_.png">
                        <img v-show="!displaycomment" src="/static/icon/feed_comment.png">{{sendbizeditinfo.commentTotal}}
                    </span>
                </Col>
                <Col v-if="displaycomment" span="24">
                    <z_comment :id="sendbizeditinfo.casefid" type="flow" @changeCommentLength="changeCommentNum"></z_comment>
                </Col>
            </Row>
        </div>
        <div v-else style="position: relative; padding-top: 100px; margin-top: 36px;">
            <Spin size="large" fix>
                <Icon type="load-c" class="spin-icon-load"></Icon>
                <div>加载中...</div>
            </Spin>
        </div>
    </div>
</template>

<script>
import z_fileUpload from '@/components/common/z-fileUpload';
import fileRead from '@/components/common/fileRead';
import z_comment from '@/components/common/z-comment';

export default {
    name: 'z-sendbiz',
    data () {
        return {
            imgUrl,
            sendbizeditinfo: {},
            templawyers: [],
            usercompanylist: [],
            userlawyerlist: [],
            ruleValidate: {
                name: [
                    { required: true, message: '客户名称不能为空', trigger: 'change' }
                ],
                content: [
                    { required: true, message: '业务内容不能为空', trigger: 'change' }
                ],
                lawyers: [
                    { required: true, type: 'array', message: '发送对象不能为空', trigger: 'change' }
                ],
                ctmid: [
                    { required: true, type: 'number', message: '业务类型不能为空', trigger: 'change' }
                ]
            },
            fileup_param: {
                'about_type': 'biz_case_node_flows',
                'about_id': -1
            },
            show_files: true,
            displaycomment: false
        }
    },
    props: {
        id: [Number, String],
        readOnly: {
            type: Boolean,
            default: false
        },
        hideshow: {
            type: Boolean
        }
    },
    computed: {

    },
    beforeMount() {
        if( this.id ){
            this.getCaseInfo();
            if( !this.readOnly ){
                this.getUserFollowLawyers();
            }
        }else{
            this.sendbizeditinfo = {
                name: '',
                content: '',
                lawyers: [],
                filesjson: [],
                ctmid: '',
                personal: false
            };
            this.getUserCompany();
        }
    },
    mounted() {

    },
    methods: {
        sendBiz() {
            this.$refs.sendbizeditinfo.validate((valid) => {
                if( valid ){
                    let sendObj = Object.assign({}, this.sendbizeditinfo);
                    let params = { filesjson: JSON.stringify(sendObj.filesjson), hash_strs: sendObj.filesjson.map(e => e.hash)};
                    params = Object.assign({}, sendObj, params);
                    if( this.id ){
                        params.caseid = this.id;
                    }
                    this.$ajax('post', 'biz/case/issuecase', params, (data) => {
                        this.$Message.success( '业务发布成功！' );
                        this.$refs.sendbizeditinfo.resetFields();
                        this.sendbizeditinfo.filesjson = [];
                        this.userlawyerlist = [];
                        sendObj.caseid = data.data.caseid;
                        this.$emit('sendOK', sendObj);
                    });
                }else{

                }
            });
        },
        getUserCompany() {
            this.$http.get('/biz/case/getusercustomer').then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    this.usercompanylist = response.data.data;
                }else{
                    this.$Message.error( response.data.errmsg );
                }
            }).catch(err => {

            });
        },
        userCompanyChange(v) {
            if( v > 0 ){
                // 选中了公司业务
                let obj = this.usercompanylist.find(e => e.ctmid == v);
                this.userlawyerlist = [
                    {
                        id: obj.id,
                        name: obj.lawyer
                    }
                ];
                this.sendbizeditinfo.lawyers = [obj.id];
                this.sendbizeditinfo.personal = false;
            }

            if( v == -1 ){
                // 选中了私人业务
                if( this.sendbizeditinfo.lawyers.length ){
                    this.sendbizeditinfo.lawyers = [];
                }
                this.sendbizeditinfo.personal = true;
                this.getUserFollowLawyers();
            }
        },
        getUserFollowLawyers() {
            this.$http.get('biz/case/getuserfollowlawyers').then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    this.userlawyerlist = response.data.data;
                }else{
                    this.$Message.error( response.data.errmsg );
                }
            }).catch(err => {});
        },
        fileUpSuccess(response, file, fileList) {
            //console.log(response, file, fileList);
        },
        fileUpError(error, file, fileList) {
            console.log(error, file, fileList);
        },
        del_file(idx) {
            this.$Modal.confirm({
                title: '确认对话框',
                content: '确定删除吗？',
                onOk: () => {
                    this.sendbizeditinfo.filesjson.splice(idx, 1);
                }
            });
        },
        getCaseInfo() {
            this.$http.get(`/biz/keep/${this.id}/listall`).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    if( !response.data.data[0] ){
                        this.$Message.error('此业务已经选定律师');
                        this.$emit("update:hideshow", false);
                        return false;
                    }
                    let v = response.data.data[0];
                    this.sendbizeditinfo = {
                        name: v.casename,
                        content: v.content,
                        lawyers: v.lawyers,
                        filesjson: v.filesjson ? JSON.parse(v.filesjson) : [],
                        ctmid: -1,
                        personal: true
                    };
                    this.templawyers = JSON.parse(JSON.stringify(v.lawyers));
                    if( this.readOnly ){
                        this.$set(this.sendbizeditinfo, 'casefid', v.casefid);
                        this.$set(this.sendbizeditinfo, 'commentTotal', v.commentTotal);
                    }
                }else{
                    this.$Message.error( response.data.errmsg );
                }
            }).catch(err => {});
        },
        changeCommentNum(obj) {
            this.sendbizeditinfo.commentTotal = obj.total;
        }
    },
    filters: {

    },
    directives: {

    },
    components: {
        z_fileUpload,
        fileRead,
        z_comment
    }
}
</script>
