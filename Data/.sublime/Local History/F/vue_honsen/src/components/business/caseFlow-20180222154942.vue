<style lang="stylus">
@import '../../common/stylus/mixin.styl'
activeColor = #3dc1ff
.case_flow
    .tab
        height 44px
        line-height 42px
        background linear-gradient(to top, #e0e0e0, #fff)
        .item
            float left
            margin 0 15px
            padding 0 5px
            font-weight bold
            font-size 16px
            color #323232
            border-bottom 2px solid transparent
            cursor pointer
            &.active
                color activeColor
                border-color activeColor
    .flow_main_tit
        margin 0 28px
        height 54px
        line-height 53px
        font-size 12px
        border-bottom 1px solid #dedede
        .name
            display inline-block
            vertical-align middle
            width 360px
            color #666
            font-size 15px
        .catalog_index
            margin-top 10px
            margin-right 5px
        .create_time
            margin-left 15px
        .right_wrap
            float right
            min-width 195px
            .timer
                float right
                margin-top 12px
                width 65px
                height 30px
                line-height 30px
                text-align center
                border-radius 2px
                background-color #fff
                color #3dc1ff
            .edit_icon
                float right
                margin 0 15px
                bgImg(17px,53px,'/static/icon/0035.png')
                cursor pointer
            .del_icon
                float right
                bgImg(17px,53px,'/static/icon/0034.png')
                cursor pointer
            .clock_icon
                position relative
                float right
                margin-right 10px
                padding-right 55px
                bgImg(18px,53px,'/static/icon/0040.png')
                cursor pointer
                .triangle
                    position absolute
                    top 24px
                    right 0px
            .clock_panel
                .clock_panel_tit
                    color #3dc1ff
                    font-size 16px
                    text-align center
                    padding 10px 0 20px
                    border-bottom 1px solid #eeeeee
                .clock_content
                    margin-top 15px
                    padding 0 40px
                    text-align center
                    .clock_content_item
                        .ivu-input-number
                            width 60px
                            height 50px
                            line-height 50px
                            background-color #ebebeb
                            border-radius 10px
                            .ivu-input-number-handler-wrap
                                .ivu-input-number-handler
                                    height 25px
                            .ivu-input-number-input-wrap
                                height 50px
                                .ivu-input-number-input
                                    background-color #ebebeb
                                    text-align center
                        .text
                            margin-top 10px
                            color #9a9a9a
                    .clock_content_item_split
                        margin-top 10px
                        font-size 18px
                        font-weight bold
                .clock_btn
                    margin 20px 0
                    text-align center
    .content_wrap
        padding 20px 40px 25px
        background-color #fff
        .show_content
            height 235px
            overflow-y auto
            color #323232
        .editor_wrapper
            height 235px
            .submit_btn
                float right
                margin-top 5px
        .up_file_wrap
            margin-top 30px
            padding-top 8px
            border-top 1px solid #e9e9e9
            .upload_wrap_flow
                float left
            .upload_wrap_keep
                float left
                margin-top 4px
                margin-right 10px
                position relative
                .ivu-icon
                    font-size 24px
                .ivu-poptip-popper
                    left -12px !important
                    top 20px !important
                .ivu-checkbox-group
                    max-height 200px
                    overflow auto
                .ivu-checkbox-group-item
                    display block
                    overflow: hidden
                    text-overflow: ellipsis
                    white-space: nowrap
                .ivu-checkbox
                    vertical-align baseline
            .file_wrap
                float left
                margin-left 15px
                width 650px
                .file_wrap_icon
                    float left
                    cursor pointer
                    bgImg(18px,30px,'/static/icon/0037.png')
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
                        left -293px !important
                        top 25px !important
                        .file_item
                            width 100%
                            height 40px
                            line-height 40px
                            &:hover
                                background-color #f1f5f6
            .comment_icon
                float right
                bgImg(80px,30px,'/static/icon/0036.png')
                line-height 30px
                text-align right
                cursor pointer
                color #818181
                font-size 12px
            .comment_wrap
                margin-top 30px
    .flow_form
        .form_content
            margin 30px 40px
            height 279px
            overflow-y auto
            border-bottom 1px solid #dedede
        .flow_main_tit
            position relative
            .right_wrap
                float right
                margin-right 100px
                .create_time
                    margin-left 20px
            .edit_icon
                position absolute
                top 0px
                right 0px
                bgImg(17px,53px,'/static/icon/0035.png')
                cursor pointer
    .flow_form_table
        margin-top 10px
        width 100%
        border-collapse collapse
        tr
            border-collapse collapse
        td
            box-sizing border-box
            padding 5px
            min-width 100px
            height 40px
            border 1px solid #ccc
            text-align center
            word-break break-all
            word-wrap break-word
        .th
            height 38px
            background #edf1f3
            font-weight bold
.flow_form_preview
    .ivu-modal-body
        padding 0
        .tit
            position relative
            height 46px
            line-height 46px
            text-align center
            background-color #f8f8f8
            color #323232
            font-size 16px
            font-weight bold
            .tit_text
                position absolute
                top 0px
                left 23px
            .edit_icon
                position absolute
                top 0px
                right 60px
                bgImg(17px,46px,'/static/icon/0035.png')
                cursor pointer
            .icon-dacha
                position absolute
                top 3px
                right 15px
                cursor pointer
                .ivu-icon
                    font-size 26px
                    color #b4c6d1
        .table_wrap
            padding 50px 60px
            overflow auto
    .ivu-modal-footer
        padding 0
</style>

<template>
    <div class="case_flow">
        <nav class="tab clearfix">
            <div class="item" :class="{active: curParentFlow.curTab == 'content'}" @click="curParentFlow.curTab = 'content'">流程内容</div>
            <div class="item" :class="{active: curParentFlow.curTab == 'progress'}" v-if="curFlow.keeps.length" @click="curParentFlow.curTab = 'progress'">{{flowType}}</div>
            <div class="item" :class="{active: curParentFlow.curTab == 'form'}" v-if="curFlow.sheet" @click="curParentFlow.curTab = 'form'">表单</div>
        </nav>

        <div v-if="curParentFlow.curTab == 'content' && flowContent" class="case_content">
            <div class="flow_main_tit">
                <span class="name single_ellipsis">{{curFlow.name}}---流程内容</span>
                创建者：<a href="javascript:;" class="creator" @click="$router.push({ name: 'personalCenter', params: { id: flowContent.creator_user.id}})">{{flowContent.creator_user.name}}</a>
                <span class="create_time">创建时间：{{flowContent.created_at}}</span>
                <div v-if="canEdit && !isEntrust" class="right_wrap clearfix">
                    <div class="del_icon" @click="delFlow"></div>
                    <div class="edit_icon" @click="toEditFlow"></div>
                    <div class="timer">{{flowContent.used_time | timeFormat}}</div>

                    <Poptip v-if="is_editing" v-model="show_clock_panel" class="clock_panel_wrap" placement="bottom" width="300" trigger="click" :transfer="false">
                        <div class="clock_icon"><div class="triangle" :class="{active: show_clock_panel}"></div></div>
                        <div class="clock_panel" slot="content">
                            <div class="clock_panel_tit">设置提醒</div>
                            <Row class="clock_content">
                                <Col span="10" class="clock_content_item">
                                    <InputNumber :min="0" v-model="clock_hour"></InputNumber>
                                    <div class="text">时</div>
                                </Col>
                                <Col span="4" class="clock_content_item_split">：</Col>
                                <Col span="10" class="clock_content_item">
                                    <InputNumber :max="60" :min="0" :step="5" v-model="clock_minute"></InputNumber>
                                    <div class="text">分</div>
                                </Col>
                            </Row>
                            <div class="clock_btn"><Button type="primary" @click="confirmClock">确 定</Button></div>
                        </div>
                    </Poptip>

                </div>
            </div>

            <div class="content_wrap">
                <div v-if="!is_editing" class="show_content text-content" v-html="flowContent.content || '还没有编辑流程内容'"></div>

                <div v-else class="editor_wrapper">
                    <editor :content="flowContent.content || ''" ref="flow_ueditor" :aboutType="'biz_case_node_flows'" :aboutId="flowContent.casefid" :flag="'flowContent'+flowContent.casefid"></editor>
                    <Button class="submit_btn" type="info" @click="submitFlowContent">提 交</Button>
                </div>

                <div class="up_file_wrap clearfix">
                    <Upload
                        v-if="canEdit && !isEntrust"
                        class="upload_wrap_flow"
                        :action="imgUrl + '/file/upload'"
                        :with-credentials="true"
                        :data="flowUpParam"
                        :show-upload-list="false"
                        :on-success="flowUpSuccess"
                        :on-error="flowUpError"
                        ref="up_load_ref"
                        name="upload">
                        <Button class="up_btn" type="info">上传附件+</Button>
                    </Upload>

                    <div class="file_wrap clearfix">
                        <div class="file_wrap_icon" v-show="flowContent.filesjson && flowContent.filesjson.length" :class="{active: !show_files}" @click="show_files = !show_files"></div>
                        <div
                            v-if="flowContent.filesjson && flowContent.filesjson.length && index < 3"
                            v-show="show_files"
                            class="file_item"
                            v-for="(file,index) in flowContent.filesjson"
                            :key="index">
                            <fileRead :file="file" @del-file="delFlowFile(file,index)" :needDel="canEdit && !isEntrust"></fileRead>
                            <div class="line">|</div>
                        </div>
                        <Poptip
                            v-if="flowContent.filesjson.length > 3"
                            v-show="show_files"
                            class="filesjson_panel_pop"
                            placement="bottom-end"
                            width="325"
                            trigger="hover"
                            :transfer="false">
                            <span class="more">. . .</span>
                            <div slot="content">
                                <div class="file_item" v-if="index > 2" v-for="(file,index) in flowContent.filesjson" :key="index">
                                    <fileRead :file="file" @del-file="delFlowFile(file,index)" :needDel="canEdit && !isEntrust"></fileRead>
                                </div>
                            </div>
                        </Poptip>
                    </div>
                    <div class="comment_icon" @click="show_comment = !show_comment;">{{flowContent.total}}</div>
                    <div v-if="show_comment" class="comment_wrap">
                        <comment :id="flowContent.casefid" type="flow" @changeCommentLength="changeCommentLength"></comment>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="curParentFlow.curTab == 'progress' && flowProgress" class="flow_progress">
            <div class="flow_main_tit">
                <span class="name single_ellipsis">{{curFlow.name}}---{{flowType}}</span>
                <div class="right_wrap clearfix">
                    创建者：<a class="creator" @click.prevent="$router.push({name: 'personalCenter', params: {id: flowProgress.creator.id}})">{{flowProgress.creator.name}}</a>
                    <span class="create_time">创建时间：{{flowProgress.created_at}}</span>
                </div>
            </div>

            <div class="content_wrap">
                <div v-if="!progressEditing" class="show_content text-content" v-html="flowProgress.content || `还没有编辑${flowType}`"></div>
                <div v-else class="editor_wrapper">
                    <editor
                        :content="flowProgress.content || ''"
                        ref="progress_ueditor"
                        @contentChange="progressContentChange"
                        :aboutType="'biz_case_node_flow_keeps'"
                        :aboutId="flowProgress.casekid"
                        :flag="'flowProgress'+flowProgress.casekid">
                    </editor>
                    <Button class="submit_btn" type="info" :disabled="!canSubmitProgress" @click="submitProgressContent">提 交</Button>
                </div>

                <div class="up_file_wrap clearfix">
                    <Poptip
                        v-if="!progressEditing && canEdit"
                        v-model="progressFilesPop"
                        class="upload_wrap_keep"
                        placement="bottom-start"
                        width="250"
                        trigger="hover"
                        :transfer="false">
                        <Icon type="link" style="cursor: pointer"></Icon>
                        <div slot="content">
                            <CheckboxGroup v-if="flowFiles.length" v-model="recordFilesHash">
                                <Checkbox :label="file.hash" v-for="(file,index) in flowFiles" :key="index">
                                    <fileRead style="display: inline-block; vertical-align: middle" :file="file" :needDown="false" :needDel="false"></fileRead>
                                </Checkbox>
                            </CheckboxGroup>
                            <div v-else>暂无可推送的附件！</div>
                            <Button type="info" size="small" style="float: right" @click="submitProgressFiles">确 定</Button>
                        </div>
                    </Poptip>

                    <div v-if="!progressEditing" class="file_wrap clearfix">
                        <div
                            class="file_wrap_icon"
                            v-show="flowProgress.filesjson && flowProgress.filesjson.length"
                            :class="{active: !progressShowFiles}"
                            @click="progressShowFiles = !progressShowFiles">
                        </div>
                        <div
                            v-if="flowProgress.filesjson && flowProgress.filesjson.length && index < 3"
                            v-show="progressShowFiles"
                            class="file_item"
                            v-for="(file,index) in flowProgress.filesjson"
                            :key="index">
                            <fileRead :file="file" @del-file="delProgressFile(file,index)" :needDel="canEdit"></fileRead>
                            <div class="line">|</div>
                        </div>
                        <Poptip
                            v-if="flowProgress.filesjson.length > 3"
                            v-show="progressShowFiles"
                            class="filesjson_panel_pop"
                            placement="bottom-end"
                            width="325"
                            trigger="hover"
                            :transfer="false">
                            <span class="more">. . .</span>
                            <div slot="content">
                                <div class="file_item" v-if="index > 2" v-for="(file,index) in flowProgress.filesjson" :key="index">
                                    <fileRead :file="file" @del-file="delProgressFile(file,index)" :needDel="canEdit"></fileRead>
                                </div>
                            </div>
                        </Poptip>
                    </div>
                    <div v-if="!progressEditing" class="comment_icon" @click="progressComment = !progressComment;">{{flowProgress.total}}</div>
                    <div v-if="progressComment" class="comment_wrap">
                        <comment :id="flowProgress.casekid" type="keep" @changeCommentLength="changeProgressCommentLength($event)"></comment>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="curParentFlow.curTab == 'form' && flowForm" class="flow_form">
            <div class="flow_main_tit">
                <span class="name single_ellipsis">{{curFlow.name}}---表单</span>
                <div class="right_wrap clearfix">
                    创建者：
                    <a class="creator" @click.prevent="$router.push({name: 'personalCenter', params: {id: flowForm.userid}})">
                        {{flowForm.userName}}
                    </a>
                    <span class="create_time">创建时间：{{flowForm.updated_at}}</span>
                </div>
                <div v-if="canEdit" class="edit_icon" @click="flowFormEdit = true"></div>
            </div>
            <div class="form_content">
                <table v-if="flowForm.sheet.length" class="flow_form_table" @dblclick="flowFormPreview = true">
                    <tr v-for="(tr,index) in flowForm.sheet" :key="index">
                        <td
                            v-for="(td, i) in tr"
                            :key="index + i"
                            :class="{th: index == 0}"
                            :style="{width: td.width || 'auto'}"
                            v-html="td.title">
                        </td>
                    </tr>

                    <tr v-if="flowForm.sheet.length == 1">
                        <td id="noData" :colspan="flowForm.sheet[0].length">暂无数据</td>
                    </tr>
                </table>
            </div>
        </div>

        <Modal
            v-if="flowFormPreview"
            v-model="flowFormPreview"
            :closable="false"
            :mask-closable="false"
            width="1148"
            :data-transfer="false"
            class-name="flow_form_preview">
            <div class="tit">
                <div class="tit_text">{{curFlow.name}} > 表单</div>
                预 览
                <div v-if="canEdit" class="edit_icon" @click="toEditFlowForm"></div>
                <div class="icon-dacha" @click.stop="flowFormPreview = false">
                    <Icon type="android-close"></Icon>
                </div>
            </div>
            <div class="table_wrap" :style="{maxHeight: maxH+'px'}">
                <table v-if="flowForm.sheet.length" class="flow_form_table">
                    <tr v-for="(tr,index) in flowForm.sheet" :key="index">
                        <td
                            v-for="(td, i) in tr"
                            :key="index + i"
                            :class="{th: index == 0}"
                            :style="{width: td.width || 'auto'}"
                            v-html="td.title">
                        </td>
                    </tr>

                    <tr v-if="flowForm.sheet.length == 1">
                        <td id="noData" :colspan="flowForm.sheet[0].length">暂无数据</td>
                    </tr>
                </table>
            </div>
            <div slot="footer"></div>
        </Modal>

        <flowForm v-if="flowFormEdit" :id="curFlow.casefid" :editable="true" @close="closeEditFlowForm"></flowForm>
    </div>
</template>

<script>
import moment from 'moment';
import editor from '@/components/common/editor';
import fileRead from '@/components/common/fileRead';
import comment from '@/components/common/z-comment';
import flowForm from './flowForm';

export default {
    name: 'caseFlow',
    components: {editor,fileRead,comment,flowForm},
    props: {
        curParentFlow: [Object],
        curFlow: [Object],
        canEdit: [Boolean],
        flowType: {
            type: String,
            default: '案件进展'
        }
    },
    data() {
        return {
            maxH: 0,
            flowContent: null,
            imgUrl,
            is_editing: false,
            show_files: true,
            show_comment: false,
            show_clock_panel: false,
            clockTimer: -1,
            clock_hour: 0,
            clock_minute: 0,

            flowProgress: null,
            progressFilesPop: false,
            progressShowFiles: true,
            flowFiles: [],
            recordFilesHash: [],
            progressComment: false,
            canSubmitProgress: false,
            isFirstChange: true,

            flowForm: null,
            flowFormPreview: false,
            flowFormEdit: false,
        }

    },
    computed: {
        flowUpParam() {
            return {
                about_id: this.flowContent.casefid,
                about_type: 'biz_case_node_flows'
            }
        },
        isEntrust() {
           return this.flowContent.creator_user && !this.$authCodeT(this.flowContent.creator_user.vip).isLawyer;
        },
        caseId() {
            return this.curParentFlow.caseid;
        },
        progressEditing() {
            return this.flowProgress && this.flowProgress.casekid? false: true;
        },
        checked_files_str() {
            let arr = [];
            this.recordFilesHash.forEach((val) => {
                this.flowFiles.forEach((element) => {
                    if(val == element.hash) {
                        arr.push({
                            hash: val,
                            name: element.name,
                        });
                    }
                });
            });
            return JSON.stringify(arr);
        }
    },
    created() {
        let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        this.maxH = clientHeight - 150;

        switch (this.curParentFlow.curTab) {
            case 'content':
                this.getFlowContent();
                break;
            case 'progress':
                this.getFlowProgress(this.initFlowProgress);
                break;
            case 'form':
                this.initFlowForm();
                break;
            default:
                break;
        }
    },
    beforeDestroy() {
        clearTimeout(this.curFlow.noticeEditingTimer);

        this.toFlowQuit();
    },
    methods: {
        getFlowContent(callback) {
            if (this.curParentFlow.casefid == this.curFlow.casefid) {
                // 当前显示的是父流程
                this.flowContent = Object.assign({}, this.curParentFlow);
                callback && callback();
            } else {
                this.$ajax('get', `/biz/flow/${this.caseId}/list/${this.curFlow.casefid}/${this.curParentFlow.casefid}`, data => {
                    data.data[0].filesjson = data.data[0].filesjson? JSON.parse(data.data[0].filesjson): [];

                    this.flowContent = data.data[0];

                    callback && callback();
                });
            }
        },
        delFlow() {
            this.$Modal.confirm({
                title: '确认对话框',
                content: '确定删除吗？',
                onOk: () => {
                    this.$ajax('post', `/biz/flow/${this.flowContent.caseid}/del/${this.flowContent.casefid}`, data => {
                        this.$emit('delFlow');
                    });
                }
            });
        },
        toEditFlow() {
            if (this.is_editing) {
                return;
            }

            this.$ajax('get', `/biz/flow/editstatus/${this.curFlow.casefid}`, data => {
                if (data.is_editing) {
                    this.$Message.warning('该流程正在编辑中...');
                } else {
                    this.is_editing = true;

                    this.noticeFlowEditing();

                    // 计时
                    clearInterval(this.curParentFlow.timer);

                    this.curParentFlow.timer = setInterval(() => {
                        this.flowContent.used_time ++;
                        this.curParentFlow.record_time ++;
                    },1000);
                }
            });
        },
        noticeFlowEditing() {
            // 通知服务器知识正在编辑中
            this.$ajax('get', `/biz/flow/canedit/${this.curFlow.casefid}`, (data) => {
                console.log('通知服务器流程正在编辑中的请求成功！');
            });

            // 轮询
            this.curFlow.noticeEditingTimer = setTimeout(() => {
                this.noticeFlowEditing();
            },175000);
        },
        toFlowQuit() {
            if (this.is_editing) {
                this.$ajax('get', `/biz/flow/quitedit/${this.curFlow.casefid}`, (data) => {
                    console.log('流程编辑已退出');
                });
            }
        },
        submitFlowContent() {
            let param = {
                content: this.$refs.flow_ueditor.get_content(),
                used_time: this.flowContent.used_time
            };

            this.$ajax('post', `/biz/flow/${this.flowContent.caseid}/store/${this.flowContent.casefid}`, param, data => {
                this.flowContent.content = param.content;

                if (this.curParentFlow.casefid == this.curFlow.casefid) {
                    // 当前显示的是父流程
                    this.curParentFlow.content = param.content;
                }

                this.is_editing = false;

                clearInterval(this.curParentFlow.timer);
                this.$emit('add-case-time',this.curParentFlow.record_time);
                this.curParentFlow.record_time = 0;

                clearTimeout(this.curFlow.noticeEditingTimer);
            });
        },
        flowUpSuccess(response, file, fileList) {
            if (response.retcode == RETCODE_OK) {

                this.$refs.up_load_ref.clearFiles();

                // 将上传的文件信息发给后端（追加式的）
                let newFileObj = {
                    hash: response.hash,
                    name: file.name
                };
                // let jsonString = JSON.stringify(this.flowContent.filesjson.concat(newFileObj));

                let jsonString = JSON.stringify([newFileObj]);

                this.$ajax('post', `/biz/flow/${this.flowContent.caseid}/store/${this.flowContent.casefid}`, {filesjson: jsonString}, data => {
                    this.flowContent.filesjson.push(newFileObj);

                    this.$Message.success('文件上传成功！');
                });
            }
        },
        flowUpError() {
            this.$Message.error('文件上传失败，请重试！');
        },
        delFlowFile(file,index) {
            this.$Modal.confirm({
                title: '确认对话框',
                content: '确定删除吗？',
                onOk: () => {
                    // 将上传的文件信息发给后端（追加式的)
                    let filesjson_obj = this.flowContent.filesjson.concat();
                    let obj = JSON.stringify(filesjson_obj.splice(index,1));

                    this.$ajax('post', `/biz/flow/${this.flowContent.caseid}/store/${this.flowContent.casefid}`, {filesjson: obj, delfilesjson: 1}, data => {
                        this.flowContent.filesjson.splice(index,1);
                        this.$Message.success('文件删除成功！');
                    });
                }
            });
        },
        changeCommentLength(obj) {
            this.flowContent.total = obj.total;
            if (this.curParentFlow.casefid == this.curFlow.casefid) {
                this.curParentFlow.total = obj.total;
            }
        },
        confirmClock() {
            this.show_clock_panel = false;

            let record_minutes = 0;
            let set_minutes = Number(this.clock_hour) * 60 + Number(this.clock_minute);

            clearInterval(this.clockTimer);
            this.clockTimer = setInterval(() => {
                if (record_minutes < set_minutes) {
                    record_minutes += 1;
                } else {
                    clearInterval(this.clockTimer);

                    this.clock_hour = 0;
                    this.clock_minute = 0;

                    this.$Modal.warning({
                        title: '计时提醒',
                        content: '您设置的计时时间到了！',
                        onOk: () => {},
                    });
                }
            },60000)
        },


        getFlowProgress(callback) {
            if (this.curFlow.keeps.length) {
                this.$ajax('get', `/biz/keep/${this.curFlow.casefid}/list`, data => {
                    data.data[0].filesjson =  data.data[0].filesjson? JSON.parse(data.data[0].filesjson): [];
                    this.flowProgress = data.data[0];
                    callback();
                });
            } else {
                this.getFlowContent(() => {
                    this.flowProgress = {
                        content: this.flowContent.content || '',
                        created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                        filesjson: [],
                        creator: {
                            id: this.$store.state.mineInfo.id,
                            name: this.$store.state.mineInfo.name,
                        },
                        total: 0
                    };
                    callback()
                });
            }
        },
        initFlowProgress() {
            this.recordFilesHash = this.flowProgress.filesjson.map(item => item.hash);

            // 获取流程文件
            this.$ajax('get', `/biz/flow/getaffix/${this.curFlow.casefid}`, data => {
                this.flowFiles = data.data.filesjson? JSON.parse(data.data.filesjson): [];
            });
        },
        progressContentChange() {
            if (!this.isFirstChange) {
                this.canSubmitProgress = true;
            }

            this.isFirstChange = false;
        },
        submitProgressContent() {
            let param = {
                content: this.$refs.progress_ueditor.get_content(),
                creator: Number(this.$store.state.mineInfo.id),
            };

            if( param.content == '' || param.content === null ){
                this.$Message.error('不能提交空内容！');
                return false;
            }

            this.$ajax('post', `/biz/keep/${this.curFlow.casefid}/store`, param, data => {
                this.$set(this.flowProgress, 'casekid', data.casekid);
                this.$set(this.flowProgress, 'content', param.content);
                this.$set(this.flowProgress, 'filesjson', []);
                this.$set(this.flowProgress, 'created_at', moment().format('YYYY-MM-DD HH:mm:ss'));

                this.curFlow.keeps.push(data.casekid);
            });
        },
        submitProgressFiles() {
            this.$ajax('post', `/biz/keep/${this.curFlow.casefid}/store/${this.flowProgress.casekid}`, {filesjson: this.checked_files_str}, data => {
                this.flowProgress.filesjson = JSON.parse(data.filesjson);
                this.progressFilesPop = false;
            });

        },
        delProgressFile(file,index) {
            this.$Modal.confirm({
                title: '确认对话框',
                content: '确定删除吗？',
                onOk: () => {
                    this.recordFilesHash.splice(index,1);
                    this.submitProgressFiles();
                }
            });
        },
        changeProgressCommentLength(obj) {
            this.flowProgress.total = obj.total;
        },

        initFlowForm() {
            if (this.curFlow.sheet) {
                this.getFlowForm();
            } else {
                this.flowFormEdit = true;
            }
        },
        getFlowForm() {
            this.$ajax('get', `biz/flowsheet/${this.curFlow.casefid}`, data => {
                if (!this.curFlow.sheet) {
                    this.curFlow.sheet = data.data[0].sheet;
                }

                data.data[0].sheet = data.data[0].sheet? JSON.parse(data.data[0].sheet): [];
                this.flowForm = data.data[0];
            });
        },
        toEditFlowForm() {
            this.flowFormPreview = false;
            this.$nextTick(() => {
                this.flowFormEdit = true;
            });
        },
        closeEditFlowForm(obj) {
            if (obj.isSave) {
                if (!this.flowForm) {
                    this.getFlowForm();
                } else {
                    this.flowForm.sheet = JSON.parse(obj.data);
                }
            } else {
                if (!this.flowForm) {
                    this.curParentFlow.curTab = 'content';
                }
            }

            this.flowFormEdit = false;
        }
    },
    filters: {
        timeFormat(s) {
            if (!s) {
                s = 0;
            }
            let hours = Math.floor(s / 3600);
            let minutes = Math.floor((s % 3600)/60);
            let seconds = s % 60;
            hours =  hours < 10? '0'+hours: ''+hours;
            minutes =  minutes < 10? '0'+minutes: ''+minutes;
            seconds =  seconds < 10? '0'+seconds: ''+seconds;
            return hours + ':' + minutes + ':' + seconds;
        }
    }
}
</script>