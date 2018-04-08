<style lang="stylus">
@import '../../common/stylus/mixin.styl'
.case_read
    .case_info
        height 52px
        line-height 52px
        padding-left 45px
        background-color #fff
        .case_name
            bgImg(100%,52px,'/static/icon/0039.png')
            background-position left center
            text-indent 30px
        .state_time
            color #9e9e9e
    .entrust_content
        margin-top 10px
        .flow_main_tit
            padding 0 20px
            height 48px
            line-height 48px
            background-color #b4c6d1
            color #fff
            .creator
                float right
                font-size 14px
    .read_record_content
        position relative
        margin-top 10px
        border 1px solid #dedede
        .flow_main_tit
            padding 0 20px
            height 48px
            line-height 48px
            background-color #b4c6d1
            color #fff
            .creator
                float right
                font-size 14px
        .catalog_index
            position absolute
            top 14px
            left 20px
            z-index 1
        .catalog_time
            position absolute
            top 14px
            right 20px
            z-index 1
            font-size 12px
            color #7a7a7a
        .content_wrap
            padding 25px 30px
            background-color #fff
            .show_tit
                color #333333
            .show_content
                word-break: break-word
                height 225px
                overflow-y auto
                line-height 1.75
                font-size 14px
                color #323232
            .up_file_wrap
                margin-top 30px
                padding-top 8px
                border-top 1px solid #e9e9e9
                font-size 12px
                .upload_wrap_flow
                    float left
                .upload_wrap_keep
                    float left
                    margin-top 4px
                    margin-right 10px
                    position relative
                    .ivu-icon
                        font-size 24px
                .file_wrap
                    float left
                    margin-left 15px
                    width 940px
                    &.file_wrap2
                        width 760px
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
                        margin-top 3px
                        position relative
                        .more
                            display block
                            font-weight bold
                            font-size 14px
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
        .ivu-tabs
            .ivu-tabs-bar
                margin-bottom 0
                padding-left 48px
                background linear-gradient(to top, #e0e0e0, #fff)
                border-bottom: none
                .ivu-tabs-tab
                    height 48px
                    line-height 32px
                    color #323232
                .ivu-tabs-tab-active
                    color #3dc1ff
</style>

<template>
    <div class="case_read" v-if="case_info">
        <!-- 案件基本信息 -->
        <Row v-if="!isFromCaseEdit" class="case_info">
            <Col span="8"><div class="case_name single_ellipsis">案件名称： {{case_info.casename}}</div></Col>
            <Col span="7" offset="1">办理律师：
                <a href="javascript:;" @click="case_info.belong? $router.push({name: 'personalCenter' ,params:{id: case_info.belong.id}}):$router.push({name: 'personalCenter' ,params:{id: $store.state.mineInfo.id}})">
                    {{case_info.belong? case_info.belong.name: $store.state.mineInfo.name}}
                </a>
            </Col>
            <Col span="7" offset="1">处理状态：{{case_info.status? (case_info.status == 1?'结案': '未处理'): '处理中'}}<span class="state_time">（已完成{{case_info.used_time | time_format}}）</span></Col>
        </Row>

        <!-- 委托内容 -->
        <div v-if="firstFlowIsEntrust && !isFromCaseEdit" class="entrust_content read_record_content">
            <div class="flow_main_tit">
                <span class="name">委托内容</span>
                <span class="creator">发布者：{{entrust.creator_user.name}}　　{{entrust.created_at}}</span>
            </div>
            <div class="content_wrap">
                <!-- 内容展示 -->
                <div class="show_tit">{{entrust.name}}</div>
                <div class="show_content" style="margin-top: 10px" v-html="entrust.content || '还没有编辑委托内容'"></div>
                <!-- 文件list -->
                <div class="up_file_wrap clearfix">
                    <Upload
                        v-if="iscontact"
                        class="upload_wrap_flow"
                        :action="imgUrl + '/file/upload'"
                        :with-credentials="true"
                        :data="up_param"
                        :show-upload-list="false"
                        :on-success="up_success"
                        :on-error="up_error"
                        ref="up_load_ref"
                        name="upload">
                        <Button class="up_btn" type="info">上传附件+</Button>
                    </Upload>

                    <div class="file_wrap clearfix">
                        <div
                            class="file_wrap_icon"
                            v-show="entrust.filesjson && entrust.filesjson.length"
                            :class="{active: !show_entrust_files}"
                            @click="show_entrust_files = !show_entrust_files">
                        </div>
                        <div
                            v-if="entrust.filesjson && entrust.filesjson.length && index < showFilsNum"
                            v-show="show_entrust_files"
                            class="file_item"
                            v-for="(file,index) in entrust.filesjson"
                            :key="index">
                            <fileRead :file="file" @del-file="del_entrust_file(file,index)" :needDel="iscontact"></fileRead>
                            <div class="line">|</div>
                        </div>
                        <Poptip
                            v-if="entrust.filesjson.length > showFilsNum"
                            v-show="show_entrust_files"
                            class="filesjson_panel_pop"
                            placement="bottom-end"
                            width="325"
                            trigger="hover"
                            :transfer="false">
                            <span class="more">. . .</span>
                            <div slot="content">
                                <div class="file_item" v-if="index > showFilsNum-1" v-for="(file,index) in entrust.filesjson" :key="index">
                                    <fileRead :file="file" @del-file="del_entrust_file(file,index)" :needDel="iscontact"></fileRead>
                                </div>
                            </div>
                        </Poptip>
                    </div>
                    <div class="comment_icon" @click="show_entrust_comment = !show_entrust_comment;">{{entrust.total}}</div>
                    <div v-if="show_entrust_comment" class="comment_wrap">
                        <comment :id="entrust.casefid" type="flow" @changeCommentLength="changeEntrustCommentLength"></comment>
                    </div>
                </div>
            </div>
        </div>

        <!-- 流程 -->
        <div
            v-if="(f_index != 0 || !firstFlowIsEntrust) && flow.show_flow_card"
            class="read_record_content"
            v-for="(flow,f_index) in flows"
            :key="f_index"
            style="margin-top: 20px">
            <div class="catalog_index">{{firstFlowIsEntrust?f_index: (f_index + 1)}}</div>
            <div class="catalog_time">
                创建者：<a href="javascript:;" class="creator" @click="$router.push({name: 'personalCenter', params: {id: flow.currentId}})">{{flow.currentName}}</a>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="create_time">创建时间：{{flow.currentTime}}</span>
            </div>
            <Tabs @on-click="clickTabs($event,flow)" :animated="false" style="overflow: initial">
                <!-- 一级流程的案件进展 -->
                <TabPane class="content_wrap" v-if="flow.keeps.length" :label="flow.name" :name="'fatherFlow'+f_index">
                    <div class="show_content" v-html="flow.case_progress.content || ''"></div>

                    <div class="up_file_wrap clearfix">
                        <Poptip
                            v-if="flow.case_progress.flow_files && canEditOwnCreated(flow.locked, flow.creator_user.id)"
                            v-model="flow.case_progress.files_pop"
                            class="upload_wrap_keep"
                            placement="bottom-start"
                            width="250"
                            trigger="hover"
                            :transfer="false">
                            <Icon type="link" style="cursor: pointer"></Icon>
                            <div slot="content">
                                <CheckboxGroup class="case_progress_checkboxs" v-if="flow.case_progress.flow_files.length" v-model="flow.case_progress.record_files_hash">
                                    <Checkbox :label="file.hash" v-for="(file,index) in flow.case_progress.flow_files" :key="index">
                                        <fileRead style="display: inline-block; vertical-align: middle" :file="file" :needDown="false" :needDel="false"></fileRead>
                                    </Checkbox>
                                </CheckboxGroup>
                                <div v-else>暂无可推送的附件！</div>
                                <Button type="info" size="small" style="float: right" @click="submit_keep_files(flow)">确 定</Button>
                            </div>
                        </Poptip>

                        <div class="file_wrap clearfix" :class="{file_wrap2: isFromCaseEdit}">
                            <div
                                class="file_wrap_icon"
                                :class="{active: !flow.case_progress.show_files}"
                                v-show="flow.case_progress.filesjson && flow.case_progress.filesjson.length"
                                @click="flow.case_progress.show_files = !flow.case_progress.show_files">
                            </div>
                            <div
                                v-if="flow.case_progress.filesjson && flow.case_progress.filesjson.length && index < showFilsNum"
                                v-show="flow.case_progress.show_files"
                                class="file_item"
                                v-for="(file,index) in flow.case_progress.filesjson"
                                :key="index">
                                <fileRead :file="file" @del-file="del_file(file,index,flow)" :needDel="!iscontact"></fileRead>
                                <div class="line">|</div>
                            </div>
                            <Poptip
                                v-if="flow.case_progress.filesjson && flow.case_progress.filesjson.length > showFilsNum"
                                v-show="flow.case_progress.show_files"
                                class="filesjson_panel_pop"
                                placement="bottom-end"
                                width="325"
                                trigger="hover"
                                :transfer="false">
                                <span class="more">. . .</span>
                                <div slot="content">
                                    <div class="file_item" v-if="index > showFilsNum-1" v-for="(file,index) in flow.case_progress.filesjson" :key="index">
                                        <fileRead :file="file" @del-file="del_file(file,index,flow)" :needDel="!iscontact"></fileRead>
                                    </div>
                                </div>
                            </Poptip>
                        </div>
                        <div class="comment_icon" @click="flow.case_progress.show_comment = !flow.case_progress.show_comment;">{{flow.case_progress.total}}</div>
                        <div v-if="flow.case_progress.show_comment" class="comment_wrap">
                            <comment :id="flow.case_progress.casekid" type="keep" @changeCommentLength="changeCommentLength($event,flow.case_progress)"></comment>
                        </div>
                    </div>
                </TabPane>

                <!-- 子流程的案件进展 -->
                <TabPane
                    class="content_wrap"
                    v-if="subFlow.keeps.length"
                    :label="subFlow.name"
                    :name="'' + subFlow.casefid"
                    v-for="(subFlow, sub_index) in flow.sub_fids"
                    :key="sub_index">
                    <div class="show_content" v-html="subFlow.case_progress.content || ''"></div>

                    <div class="up_file_wrap clearfix">
                        <Poptip
                            v-if="subFlow.case_progress.flow_files && canEditOwnCreated(flow.locked, subFlow.creator)"
                            v-model="subFlow.case_progress.files_pop"
                            class="upload_wrap_keep"
                            placement="bottom-start"
                            width="250"
                            trigger="hover"
                            :transfer="false">
                            <Icon type="link" style="cursor: pointer"></Icon>
                            <div slot="content">
                                <CheckboxGroup
                                    class="case_progress_checkboxs"
                                    v-if="subFlow.case_progress.flow_files.length"
                                    v-model="subFlow.case_progress.record_files_hash">
                                    <Checkbox :label="file.hash" v-for="(file,index) in subFlow.case_progress.flow_files" :key="index">
                                        <fileRead style="display: inline-block; vertical-align: middle" :file="file" :needDown="false" :needDel="false"></fileRead>
                                    </Checkbox>
                                </CheckboxGroup>
                                <div v-else>暂无可推送的附件！</div>
                                <Button type="info" size="small" style="float: right" @click="submit_keep_files(subFlow)">确 定</Button>
                            </div>
                        </Poptip>

                        <div class="file_wrap clearfix" :class="{file_wrap2: isFromCaseEdit}">
                            <div
                                class="file_wrap_icon"
                                :class="{active: !subFlow.case_progress.show_files}"
                                v-show="subFlow.case_progress.filesjson && subFlow.case_progress.filesjson.length"
                                @click="subFlow.case_progress.show_files = !subFlow.case_progress.show_files">
                            </div>
                            <div
                                v-if="subFlow.case_progress.filesjson && subFlow.case_progress.filesjson.length && index < showFilsNum"
                                v-show="subFlow.case_progress.show_files"
                                class="file_item"
                                v-for="(file,index) in subFlow.case_progress.filesjson"
                                :key="index">
                                <fileRead :file="file" @del-file="del_file(file,index,subFlow)"></fileRead>
                                <div class="line">|</div>
                            </div>
                            <Poptip
                                v-if="subFlow.case_progress.filesjson && subFlow.case_progress.filesjson.length > showFilsNum"
                                v-show="subFlow.case_progress.show_files"
                                class="filesjson_panel_pop"
                                placement="bottom-end"
                                width="325"
                                trigger="hover"
                                :transfer="false">
                                <span class="more">. . .</span>
                                <div slot="content">
                                    <div class="file_item" v-if="index > showFilsNum-1" v-for="(file,index) in subFlow.case_progress.filesjson" :key="index">
                                        <fileRead :file="file" @del-file="del_file(file,index,subFlow)"></fileRead>
                                    </div>
                                </div>
                            </Poptip>
                        </div>
                        <div class="comment_icon" @click="subFlow.case_progress.show_comment = !subFlow.case_progress.show_comment;">{{subFlow.case_progress.total}}</div>
                        <div v-if="subFlow.case_progress.show_comment" class="comment_wrap">
                            <comment :id="subFlow.case_progress.casekid" type="keep" @changeCommentLength="changeCommentLength($event,subFlow.case_progress)"></comment>
                        </div>
                    </div>
                </TabPane>
            </Tabs>
        </div>

        <div v-if="noKeep && !firstFlowIsEntrust && isFromCaseEdit" class="nodatalist" style="padding: 31px 0 0 0;">没有案件进展！</div>
    </div>
</template>

<script>
import fileRead from '@/components/common/fileRead';
import comment from '@/components/common/z-comment';
export default {
    name: 'caseRead',
    components: {fileRead,comment},
    props: {
        isFromCaseEdit: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            imgUrl,
            case_id: '',
            role: '',
            case_info: null,
            flows: [],
            show_entrust_files: true,
            show_entrust_comment: false,
            noKeep: true,
        }
    },
    computed: {
        up_param() {
            return {
                about_id: this.flows[0] && this.flows[0].casefid,
                about_type: 'biz_case_node_flows'
            }
        },
        iscontact() {
            return this.role == 'contact'? true: false;
        },
        firstFlowIsEntrust() {
           return this.flows[0] && !this.$authCodeT(this.flows[0].creator_user.vip).isLawyer;
        },
        entrust() {
            return this.flows[0] || {};
        },
        showFilsNum() {
            return this.isFromCaseEdit? 3: 4;
        }
    },
    created() {
        this.case_id = Number(this.$route.params.caseid);
        this.get_case_info();
    },
    methods: {
        canEditOwnCreated(isLocked,createrid) {
            return this.case_info && !this.case_info.status && !isLocked && (this.role == 'owner' || ((this.role == 'team' || this.role == 'coactor' ) && (createrid == this.$store.state.mineInfo.id)));
        },
        setEntrustFiles(jsonString,type,index) {
            /*上传流程文件（追加式的）*/
            let URL = `/biz/flow/${this.entrust.caseid}/store/${this.entrust.casefid}`;
            let param = {filesjson: jsonString};
            if( type == 'del' ) {
                param.delfilesjson = 1;
            }
            this.$http.post(URL,param).then((response) => {
                // 请求成功回调
                let data = response.data;
                if (data.retcode === RETCODE_OK) {
                    if (type == 'add') {
                        this.flows[0].filesjson.push(...JSON.parse(jsonString));
                        this.$Message.success('文件上传成功！');
                    } else {
                        // type == 'del'
                        this.flows[0].filesjson.splice(index,1);
                        this.$Message.success('文件删除成功！');
                    }
                }else{
                    this.$Message.error(response.data.errmsg);
                }
            }).catch(err => {
                console.log(err);
            });
        },
        up_success(response, file, fileList) {
            if (response.retcode == RETCODE_OK) {
                this.$refs.up_load_ref.clearFiles();
                let newFileObj = {
                    hash: response.hash,
                    name: file.name
                }
                let jsonString = JSON.stringify([newFileObj]);
                this.setEntrustFiles(jsonString,'add');
            }
        },
        up_error() {
            this.$Message.error('文件上传失败，请重试！');
        },
        del_entrust_file(file, index) {
            this.$Modal.confirm({
                title: '确认对话框',
                content: '确定删除吗？',
                onOk: () => {
                    let filesjson_obj = this.entrust.filesjson.concat();
                    let jsonString = JSON.stringify(filesjson_obj.splice(index,1));
                    // let jsonString = JSON.stringify(filesjson_obj);
                    this.setEntrustFiles(jsonString,'del', index);
                }
            });
        },
        /* 获取案件基本信息 */
        get_case_info() {
            let URL = `/biz/case/info/${this.case_id}`;
            this.$http.get(URL).then(response => {
                let data = response.data;
                if( data.retcode == RETCODE_OK ){
                    this.case_info = data.data;
                    this.role = data.data.role;

                    this.get_flow_list();
                }else{
                    this.$Message.error(response.data.errmsg);
                }
            }).catch(err => {
                console.log(err);
            });
        },
        /* 获取流程列表 */
        get_flow_list() {
            let URL = `/biz/flow/${this.case_id}/list`;
            this.$http.get(URL).then(response => {
                let data = response.data;
                if( data.retcode == RETCODE_OK ){
                    /* 初始化 */
                    data.data.forEach((val) => {
                        val.filesjson =  val.filesjson? JSON.parse(val.filesjson): [];
                        val.case_progress = {};
                        val.show_flow_card = false;

                        let subFlowHaveKeeps = false;
                        val.sub_fids.forEach((sub_flow) => {
                            if (sub_flow.keeps.length) {
                                subFlowHaveKeeps = true;
                                sub_flow.case_progress = {};
                            }
                        })
                        if (val.keeps.length || subFlowHaveKeeps) {
                            val.show_flow_card = true;
                            this.noKeep = false;
                        }
                    });

                    this.flows = data.data;

                    data.data.forEach((flow) => {
                        if(flow.keeps.length) {
                            this.getCaseProgress(flow,false,null);
                        } else if(flow.sub_fids.length){
                            this.getCaseProgress(flow,true,flow.sub_fids.filter(item => item.keeps.length)[0].casefid);
                        }
                    });
                }else{
                    this.$Message.error(response.data.errmsg);
                }
            }).catch(err => {
                console.log(err);
            });
        },
        syncNameAndTime(flow,progress) {
            this.$set(flow,'currentName',progress.creator.name);
            this.$set(flow,'currentId',progress.creator.id);
            this.$set(flow,'currentTime',progress.created_at);
        },
        getCaseProgress(flow,isSubFlow,subFlowId) {
            let currentFlow = null;
            if (isSubFlow) {
                flow.sub_fids.forEach((val) => {
                    if (val.casefid == subFlowId) {
                        currentFlow = val;
                    }
                });
            } else {
                currentFlow = flow;
            }

            if (currentFlow.case_progress.casekid) {
                this.syncNameAndTime(flow,currentFlow.case_progress);
                return;
            }

            let URL = `/biz/keep/${currentFlow.casefid}/list`;
            this.$http.get(URL).then(response => {
                let data = response.data;
                if( data.retcode == RETCODE_OK ){
                    data.data[0].filesjson =  data.data[0].filesjson? JSON.parse(data.data[0].filesjson): [];
                    data.data[0].show_files = true;
                    data.data[0].show_comment = false;
                    data.data[0].files_pop = false;

                    data.data[0].record_files_hash = [];
                    data.data[0].filesjson.forEach((val) => {
                        data.data[0].record_files_hash.push(val.hash);
                    });
                    data.data[0].flow_files = []; // 所在流程的文件

                    currentFlow.case_progress = data.data[0];

                    this.syncNameAndTime(flow,currentFlow.case_progress);

                    if(!this.iscontact) {
                        this.get_flow_files(currentFlow);
                    }
                }else{
                    this.$Message.error(response.data.errmsg);
                }
            }).catch(err => {
                console.log(err);
            });
        },
        get_flow_files(flow) {
            let URL = `/biz/flow/getaffix/${flow.casefid}`;
            this.$http.get(URL).then(response => {
                let data = response.data;
                if( data.retcode == RETCODE_OK ){
                    flow.case_progress.flow_files = data.data.filesjson? JSON.parse(data.data.filesjson): [];
                }else{
                    this.$Message.error(response.data.errmsg);
                }
            }).catch(err => {
                console.log(err);
            });
        },
        del_file(file,index,flow) {
            this.$Modal.confirm({
                title: '确认对话框',
                content: '确定删除吗？',
                onOk: () => {
                    flow.case_progress.record_files_hash.splice(index,1);
                    this.submit_keep_files(flow);
                },
                onCancel: () => {}
            });
        },
        checked_files_str(flow) {
            let arr = [];
            flow.case_progress.record_files_hash.forEach((val) => {
                flow.case_progress.flow_files.forEach((element) => {
                    if(val == element.hash) {
                        arr.push({
                            hash: val,
                            name: element.name,
                        });
                    }
                });
            });
            return JSON.stringify(arr);
        },
        submit_keep_files(flow) {
            let URL = `/biz/keep/${flow.casefid}/store/${flow.case_progress.casekid}`;
            let param = {
                filesjson: this.checked_files_str(flow),
            };
            this.$http.post(URL,param).then(response => {
                let data = response.data;
                if( data.retcode == RETCODE_OK ){
                    flow.case_progress.filesjson = JSON.parse(data.filesjson);
                    flow.case_progress.files_pop = false;
                }else{
                    this.$Message.error(response.data.errmsg);
                }
            }).catch(err => {
                console.log(err);
            });
        },
        changeCommentLength(obj,caseProgress) {
            caseProgress.total = obj.total;
        },
        changeEntrustCommentLength(obj) {
            this.flows[0].total = obj.total;
        },
        clickTabs(name,flow) {
            /* 关闭评论 */
            flow.case_progress.show_comment = false;
            flow.sub_fids.forEach((val) => {
                if (val.case_progress && val.case_progress.casekid) {
                    val.case_progress.show_comment = false;
                }
            });

            let isFatherFlow = name.indexOf('fatherFlow') == -1? false: true;
            if (!isFatherFlow) {
                this.getCaseProgress(flow,true,name);
            }
        }
    },
    filters: {
        time_format(s) {
            if (!s) {
                s = 0;
            }
            let hours = Math.floor(s / 3600);
            let minutes = Math.floor((s % 3600)/60);
            let seconds = s % 60;
            hours =  hours < 10? '0'+hours: ''+hours;
            minutes =  minutes < 10? '0'+minutes: ''+minutes;
            seconds =  seconds < 10? '0'+seconds: ''+seconds;
            return hours + '时' + minutes + '分' + seconds + '秒';
        }
    }
}
</script>