<style lang="stylus">
@import '../../common/stylus/mixin.styl'
bgColor = #65778b
activeColor = #3dc1ff
.caseFlowWrap
    .flow_nav
        margin-top 15px
        height 44px
        background-color #fff
        .flow_nav_item
            float left
            height 100%
            line-height 44px
        .flow_nav_wrap
            color #6f6f6f
            .catalog_tit
                position relative
                padding-left 40px
                bgImg(116px,44px,'/static/icon/0029.png')
                background-position 15px center
                cursor pointer
                .triangle
                    position absolute
                    top 20px
                    right 0
            .catalog_panel
                padding-right 5px
                max-height 390px
                overflow auto
                .ivu-btn
                    position relative
                    font-size 14px
                    .icon
                        position absolute
                        top 0px
                        left 42px
                        bgImg(17px,33px,'/static/icon/0061.png')
            .ivu-poptip-body
                padding 13px 23px
            .catalog_h
                margin-top 20px
                margin-bottom 20px
                height 34px
                line-height 34px
                border-bottom 1px solid #ebebeb
                border-top 1px solid #ebebeb
                font-size 16px
                text-indent 10px
            .catalog_main
                font-size 14px
                font-weight bold
                text-indent 10px
                .item
                    height 32px
                    line-height 32px
                    cursor pointer
                    &:hover
                        background-color #ebebeb
                .catalog_text
                    float left
                    max-width 160px
                .case_progress_icon
                    float right
                    margin-right 5px
                    bgImg(17px,32px,'/static/icon/0032.png')
                .case_form_icon
                    float right
                    margin-right 5px
                    bgImg(19px,32px,'/static/icon/0033.png')
                .sub_catalog_text
                    font-size 12px
                    font-weight normal
                    text-indent 30px
        .flow_sort
            margin-left 20px
            bgImg(110px,44px,'/static/icon/0031.png')
            background-position left center
            text-indent 22px
            color #868686
            font-size 12px
            cursor pointer
            &.inverted
                background-image url('/static/icon/0030.png')
        .create_btn_wrap
            float right
            position relative
            height 100%
            .create_btn
                height 44px
                line-height normal
                margin -18px -20px 0 0
                border-radius 0
            .ivu-poptip-popper
                top 42px !important
                z-index 1101
            .ivu-poptip-body
                padding 30px !important
            .create_flow_panel_tit
                margin-bottom 15px
                font-size 14px
                color #7a7a7a
            .create_flow_panel_btn_wrap
                margin-top 20px
                text-align center
    .flow
        margin-top 15px
        .catalog
            float left
            width 234px
            background #fff
            border 1px solid #dedede
            color #323232
            .catalog_tit
                height 42px
                background linear-gradient(to top, #e0e0e0, #fff)
                .lock, .unlock
                    float left
                    margin-left 20px
                    cursor pointer
                    bgImg(30px,42px,'/static/icon/0047.png')
                .unlock
                    bgImg(30px,42px,'/static/icon/0046.png')
                .lock
                    bgImg(30px,42px,'/static/icon/0047.png')
                .moving_icon
                    float right
                    margin-right 10px
                    cursor pointer
                    &.down
                        margin-top 12px
                    &.up
                        margin-top 10px
                    .ivu-icon
                        font-size 18px
                        color #787878
                .create_btn_wrap
                    float right
                    position relative
                    .add_icon
                        margin: 11px 14px 0 0
                        display: inline-block
                        vertical-align: top
                        addIcon(#787878)
                    &>.ivu-poptip-popper
                        left -40px !important
                        top 34px !important
                        .ivu-poptip-body
                            padding 10px 0 !important
                    .create_sub_flow_panel
                        text-align center
                        color #9e9e9e
                    .item
                        height 30px
                        line-height 30px
                        cursor pointer
                        &:hover
                            background-color #edf1f3
                            .item_flow
                                display block
                    .item_flow
                        display none
                        padding 0 10px
                        position absolute
                        top 48px
                        right -90px
                        width 90px
                        background #edf1f3
                        .item_flow_item
                            height 30px
                            line-height 30px
                            &:hover
                                color #333
                        &.item_form
                            top 78px
            .catalog_main
                background-color #fff
                height: 405px
                overflow: auto
                .item
                    position relative
                    height 42px
                    line-height 42px
                    border-left 3px solid transparent
                    &.active
                        border-color activeColor
                        background-color #dcf4ff
                        color activeColor
                        .catalog_index
                            background-color activeColor
                    &:hover
                        color activeColor
                        .catalog_index
                            background-color activeColor
                        .to_edit_sub_flow_icon
                            display block
                    .catalog_index
                        position absolute
                        top 10px
                        left 32px
                .catalog_text
                    float left
                    position relative
                    margin-left 60px
                    width 100px
                    height 42px
                    cursor pointer
                    .ivu-input
                        float left
                        height 25px
                    &.add_subflow
                        margin-top 10px
                .to_edit_sub_flow_icon
                    display none
                    position absolute
                    right 50px
                    top 0px
                    cursor pointer
                    bgImg(17px,42px,'/static/icon/0035.png')
                .case_progress_icon
                    margin-right 5px
                    float right
                    bgImg(17px,42px,'/static/icon/0032.png')
                    cursor pointer
                .case_form_icon
                    margin-right 5px
                    float right
                    bgImg(19px,42px,'/static/icon/0033.png')
                    cursor pointer
        .flow_main
            float right
            width 942px
            min-height 438px
            background #fff
            border 1px solid #dedede
.all_progress_preview
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
            .icon-dacha
                position absolute
                top 3px
                right 15px
                cursor pointer
                .ivu-icon
                    font-size 26px
                    color #b4c6d1
        .progress_read_wrap
            padding 0 90px
            overflow auto
    .ivu-modal-footer
        padding 0
</style>

<template>
    <div v-if="caseInfo" class="caseFlowWrap">
        <caseInfo v-if="type == 'case'" :caseInfo.sync="caseInfo" :oRole="oRole"></caseInfo>

        <div v-if="type == 'case'" class="flow_nav clearfix">
            <Poptip v-model="showCatalogPanel" class="flow_nav_item flow_nav_wrap" placement="bottom-start" width="275" trigger="click" :transfer="false">
                <div class="catalog_tit">
                    业务流程
                    <div class="triangle" :class="{active: showCatalogPanel}"></div>
                </div>

                <div class="catalog_panel" slot="content">
                    <Button type="primary" long @click="showProgress = true">
                        <div class="icon"></div>
                        案件进展总览
                    </Button>
                    <div class="catalog_h">目录</div>
                    <div class="catalog_main" v-for="(flow,index) in aFlows" :key="index">
                        <div class="item main_flow clearfix" @click.stop="moveing(flow.casefid)">
                            <div class="catalog_text single_ellipsis">{{flow.name}}</div>
                            <div v-if="flow.keeps.length" class="case_progress_icon"></div>
                            <div v-if="flow.sheet" class="case_form_icon"></div>
                        </div>
                        <div
                            v-if="flow.sub_fids.length"
                            class="item z_flow_item clearfix"
                            v-for="(sub_flow,sub_i) in  flow.sub_fids"
                            :key="sub_i"
                            @click.stop="moveing(flow.casefid)">
                            <div class="catalog_text sub_catalog_text single_ellipsis">{{sub_flow.name}}</div>
                            <div v-if="sub_flow.keeps.length" class="case_progress_icon" ></div>
                            <div v-if="sub_flow.sheet" class="case_form_icon"></div>
                        </div>
                    </div>
                </div>
            </Poptip>

            <div class="flow_nav_item flow_sort" :class="{inverted: !isOrder}" @click="changeFlowOrder">流程{{isOrder? '正': '倒'}}序排列</div>

            <Poptip
                v-if="oRole.ownerTeamAndCoactor"
                v-model="showCreateFlowPanel"
                class="create_btn_wrap"
                placement="bottom-end"
                width="320"
                trigger="click"
                :transfer="false">
                <Button type="primary" size="large" class="post_list_creat_btn create_btn">
                    创建流程<span class="add_icon">+</span>
                </Button>
                <div class="create_flow_panel" slot="content">
                    <div class="create_flow_panel_tit">创建流程</div>
                    <Input v-model.trim="flowName" ref="create_flow_input" @on-keyup.enter="createParentFlow" placeholder="输入流程名称"></Input>
                    <div class="create_flow_panel_btn_wrap">
                        <Button type="primary" style="margin-right: 10px" @click="createParentFlow">提 交</Button>
                        <Button type="primary" class="gray_btn" @click="showCreateFlowPanel = false">取 消</Button>
                    </div>
                </div>
            </Poptip>
        </div>

        <div class="flow clearfix" :id="`flow${flow.casefid}`" v-for="(flow,index) in aFlows" :key="index">
            <div class="catalog">
                <div class="catalog_tit">

                    <div class="unlock" :class="{lock: flow.locked}" @click="toggleFlowLocked(flow)"></div>

                    <Poptip
                        v-if="!flow.locked && oRole.ownerTeamAndCoactor && !isEntrust(flow)"
                        v-model="flow.add_subflow_panel"
                        class="create_btn_wrap"
                        placement="bottom"
                        width="100"
                        trigger="click"
                        :transfer="false">
                        <span class="add_icon">+</span>
                        <div class="create_sub_flow_panel" slot="content">
                            <div class="item" @click="toCreateSubFlow(flow)">子流程</div>
                            <div class="item">
                                {{typeInfo}}&gt;
                                <div class="item_flow">
                                    <div
                                        v-if="!flow.keeps.length && (oRole.isOwner || flow.creator_user.id == $store.state.mineInfo.id)"
                                        class="item_flow_item single_ellipsis"
                                        @click="toCreateFlowProgress(flow,flow)">
                                        {{flow.name}}
                                    </div>
                                    <div
                                        v-if="!sub_flow.keeps.length && (oRole.isOwner || sub_flow.creator == $store.state.mineInfo.id)"
                                        class="item_flow_item single_ellipsis"
                                        v-for="(sub_flow,sub_i) in flow.sub_fids"
                                        @click="toCreateFlowProgress(sub_flow,flow)"
                                        :key="sub_i">
                                        {{sub_flow.name}}
                                    </div>
                                </div>
                            </div>
                            <div class="item">
                                添加表单&gt;
                                <div class="item_flow item_form">
                                    <div
                                        v-if="!flow.sheet && (oRole.isOwner || flow.creator_user.id == $store.state.mineInfo.id)"
                                        class="item_flow_item single_ellipsis"
                                        @click="toCreateFlowForm(flow,flow)">
                                        {{flow.name}}
                                    </div>
                                    <div
                                        v-if="!sub_flow.sheet && (oRole.isOwner || sub_flow.creator == $store.state.mineInfo.id)"
                                        class="item_flow_item single_ellipsis"
                                        v-for="(sub_flow,sub_i) in flow.sub_fids"
                                        @click="toCreateFlowForm(sub_flow,flow)"
                                        :key="sub_i">{{sub_flow.name}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Poptip>

                    <span v-if="index != aFlows.length-1" class="moving_icon down" @click="movingParentFlow(flow, index, 'down')">
                        <Icon type="arrow-down-a"></Icon>
                    </span>
                    <span v-if="index" class="moving_icon up" @click="movingParentFlow(flow, index, 'up')"><Icon type="arrow-up-a"></Icon></span>
                </div>

                <div class="catalog_main">
                    <div class="item main_flow clearfix" :class="{active: flow.casefid == flow.curFlow.casefid}">
                        <div class="catalog_index">{{isOrder? (index + 1): (aFlows.length - index)}}</div>
                        <div class="catalog_text" @click.stop="toggleFlow(flow, flow, 'content')">
                            <Input
                                :ref="'item_input_'+flow.casefid"
                                v-if="flow.is_editing"
                                type="text"
                                v-model="flow.editname"
                                @on-keyup.enter="editFlowName(flow)"
                                @on-blur="editFlowName(flow)">
                            </Input>
                            <div class="single_ellipsis" style="float: left;width: 100px" v-else>
                                {{flow.name}}
                            </div>
                        </div>
                        <div
                            v-if="canEditOwnCreated(flow.locked, flow.creator_user.id) && !flow.is_editing" class="to_edit_sub_flow_icon"
                            @click.stop="toEditFlowName(flow)">
                        </div>
                        <div class="case_form_icon" v-if="flow.sheet" @click="toggleFlow(flow,flow,'form')"></div>
                        <div class="case_progress_icon" v-if="flow.keeps.length" @click="toggleFlow(flow,flow,'progress')"></div>
                    </div>

                    <div
                        v-if="flow.sub_fids.length"
                        class="item clearfix"
                        :class="{active: sub_flow.casefid == flow.curFlow.casefid}"
                        v-for="(sub_flow,sub_i) in  flow.sub_fids"
                        :id="`subFlow${sub_flow.casefid}`"
                        :draggable="true"
                        @dragstart="dragstart($event, sub_flow, sub_i, flow)"
                        @dragover.prevent
                        @drop.prevent="drop(sub_flow, sub_i, flow)"
                        :key="sub_i">
                        <div class="catalog_text" style="width: 100px" @click="toggleFlow(sub_flow, flow, 'content')">
                            <Input
                                :ref="'item_input_'+sub_flow.casefid"
                                v-if="sub_flow.is_editing"
                                type="text"
                                v-model="sub_flow.editname"
                                @on-keyup.enter="editFlowName(sub_flow)"
                                @on-blur="editFlowName(sub_flow)"></Input>
                            <div class="single_ellipsis" style="float: left;width: 100px" v-else>
                                {{sub_flow.name}}
                            </div>
                        </div>
                        <div
                            v-if="canEditOwnCreated(flow.locked, sub_flow.creator) && !sub_flow.is_editing" class="to_edit_sub_flow_icon"
                            @click.stop="toEditFlowName(sub_flow)">
                        </div>
                        <div class="case_form_icon" v-if="sub_flow.sheet" @click="toggleFlow(sub_flow,flow,'form')"></div>
                        <div class="case_progress_icon" v-if="sub_flow.keeps.length" @click="toggleFlow(sub_flow,flow,'progress')"></div>
                    </div>

                    <Input
                        class="catalog_text add_subflow"
                        v-if="flow.show_create_sub_flow"
                        v-model="flow.create_sub_flow_text"
                        :ref="'createsubflow_'+flow.casefid"
                        @on-keyup.enter="createSubFlow(flow)"
                        @on-blur="createSubFlow(flow)"
                        placeholder="子流程名称">
                    </Input>
                </div>
            </div>

            <div class="flow_main">
                <caseFlow
                    :curParentFlow.sync="flow"
                    :curFlow.sync="flow.curFlow"
                    :canEdit="canEditOwnCreated(flow.locked, flow.curFlow.creator)"
                    @delFlow="delFlow(flow)"
                    @add-case-time="addCaseTime"
                    :key="flow.curFlow.casefid+flow.curTab"
                    :flowType="typeInfo">
                </caseFlow>
            </div>
        </div>

        <Spin size="large" fix v-if="caseloading">
            <Icon type="load-c" class="spin-icon-load"></Icon>
            <div>加载中...</div>
        </Spin>
        <div class="nodatalist" v-if="!aFlows.length && !caseloading" style="padding: 66px 0;">
            <img @click="showCreateFlowPanel = true, $emit('createFlow')" src="/static/img/nolistcontent.png" style="cursor: pointer;" alt="未创建流程">
        </div>

        <Modal
            v-if="showProgress && type == 'case'"
            v-model="showProgress"
            :closable="false"
            :mask-closable="false"
            width="1148"
            :data-transfer="false"
            class-name="all_progress_preview">
            <div class="tit">
                {{caseInfo.casename}}
                <div class="icon-dacha" @click.stop="showProgress = false">
                    <Icon type="android-close"></Icon>
                </div>
            </div>
            <div class="progress_read_wrap" :style="{maxHeight: maxH+'px'}">
                <progressRead :isFromCaseEdit="true"></progressRead>
            </div>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
import moment from 'moment';
import {toTop} from '@/common/js/toTop.js';

import caseInfo from '@/components/business/caseInfo';
import caseFlow from '@/components/business/caseFlow';
import progressRead from '@/components/business/caseRead';

export default {
    name: 'caseFlowWrap',
    components: {caseInfo,caseFlow,progressRead},
    data() {
        return {
            caseloading: true,
            maxH: 0,
            caseId: null,
            caseInfo: null,
            showProgress: false,

            aFlows: [],
            showCatalogPanel: false,
            showCreateFlowPanel: false,
            flowName: '',
            isOrder: true,

            dragParentFlow: null,
        }
    },
    props: {
        type: {
            type: String,
            default: 'case'
        },
        typeInfo: {
            type: String,
            default: '案件进展'
        },
        id: {
            type: [Number, String]
        }
    },
    computed: {
        oRole() {
            if (this.caseInfo) {
                let obj = {
                    isOwner: this.caseInfo.role == 'owner',
                    isTeam: this.caseInfo.role == 'team',
                    isCoactor: this.caseInfo.role == 'coactor',
                };
                obj.ownerAndTeam = !this.caseInfo.status && (obj.isOwner || obj.isTeam);
                obj.ownerTeamAndCoactor = !this.caseInfo.status && (obj.isOwner || obj.isTeam || obj.isCoactor);

                return obj;
            }
        }
    },
    watch: {
        showCreateFlowPanel(newVal) {
            if (newVal && this.type == 'case') {
                this.$nextTick(() => {
                    this.$refs.create_flow_input.focus();
                });
            }
        }
    },
    created() {
        let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        this.maxH = clientHeight - 150;

        this.caseId = Number(this.id);
        this.getCaseInfo();
    },
    methods: {
        getCaseInfo() {
            this.$ajax('get', `/biz/case/info/${this.caseId}`, 'caseloading', data => {
                if (this.$store.getters.auth_code_5 == 1) {
                    // 账号过期了(设置成没有其他角色的权限， 只能阅读)
                    data.data.role = '';
                }

                this.caseInfo = data.data;

                this.getFlowList();
            });
        },
        addCaseTime(seconds) {
            this.caseInfo.used_time += seconds;
        },
        moveing(id) {
            toTop('flow' + id, 60);
            this.$nextTick(() => {
                this.showCatalogPanel = false;
            });
        },
        changeFlowOrder() {
            this.aFlows.reverse();
            this.isOrder = !this.isOrder;
        },
        createParentFlow() {
            if(!this.flowName){
                this.showCreateFlowPanel = false;
                return;
            }

            this.$ajax('post', `/biz/flow/${this.caseId}/store`, {name: this.flowName}, data => {
                let newFlow = {
                    casefid: data.casefid,
                    caseid: this.caseId,
                    content: '',
                    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                    creator: this.$store.state.mineInfo.id,
                    creator_user: {
                        name: this.$store.state.mineInfo.name,
                        id: this.$store.state.mineInfo.id,
                        vip: this.$store.state.mineInfo.auth_code
                    },
                    filesjson: [],
                    keeps: [],
                    name: this.flowName,
                    parent_fid: null,
                    sub_fids: [],
                    used_time: 0,
                    total: 0,
                    locked: 0,

                    timer: -1,
                    record_time: 0,
                    is_editing: false,
                    editname: '',
                    add_subflow_panel: false,
                    show_create_sub_flow: false,
                    create_sub_flow_text: '',

                    curTab: 'content',
                };

                newFlow.curFlow = newFlow;

                this.isOrder? this.aFlows.push(newFlow) : this.aFlows.unshift(newFlow);

                this.flowName = '';
                this.showCreateFlowPanel = false;

                if(this.isOrder) {
                    this.$nextTick(() => {
                        toTop(`flow${data.casefid}`);
                    });
                }
            });
        },

        getFlowList() {
            this.$ajax('get', `/biz/flow/${this.caseId}/list`, 'caseloading', data => {
                data.data.forEach(val => {
                    val.filesjson =  val.filesjson? JSON.parse(val.filesjson): [];
                    val.is_editing = false;
                    val.editname = '';
                    val.sub_fids.forEach((element) => {
                        element.is_editing = false;
                        element.editname = '';
                    });
                    val.creator_user = val.creator_user ? val.creator_user : {};
                    val.add_subflow_panel = false;
                    val.show_create_sub_flow = false;
                    val.create_sub_flow_text = '';

                    val.timer = -1;
                    val.record_time = 0;

                    val.curTab = 'content';
                    val.curFlow = val;
                });

                this.aFlows = data.data;

                this.$nextTick(() => {
                    let flowid = this.$route.query.from && this.$route.query.from.split('_')[0];
                    if (flowid) {
                        let parentFlowId = null;
                        for (let i = 0; i < this.aFlows.length; i++) {
                            const _flow = this.aFlows[i];
                            if (_flow.casefid == flowid || _flow.sub_fids.filter(sub => sub.casefid == flowid).length) {
                                parentFlowId = _flow.casefid;
                                break;
                            }
                        }

                        if (parentFlowId) {
                            let top = document.querySelector('#flow' + parentFlowId).offsetTop - 60;
                            document.documentElement.scrollTop = top;
                            document.body.scrollTop = top;
                        }

                    }
                });
            });
        },
        pushFlowList(newFlow) {
            this.aFlows.push(newFlow);

            this.$nextTick(() => {
                toTop(`flow${newFlow.casefid}`);
            });
        },
        movingParentFlow(flow, index, type) {
            let num = type == 'down'? 1: -1;
            let param = {
                from: flow.casefid,
                to: this.aFlows[index + num].casefid
            };
            this.$ajax('post', `/biz/flow/${this.caseId}/drag`, param, (data) => {
                let _aFlows = [...this.aFlows];

                _aFlows[index] = this.aFlows[index + num];
                _aFlows[index + num] = this.aFlows[index];

                this.aFlows = _aFlows;

                this.$Message.success('调整顺序成功！');
            });
        },
        dragstart(ev, subFlow, index, parentFlow) {
            ev.dataTransfer.setData('Text', ev.target.id);

            parentFlow.dragSubFlow = JSON.parse(JSON.stringify(subFlow));
            parentFlow.dragIndex = index;

            this.dragParentFlow = parentFlow;
        },
        drop(subFlow, index, parentFlow) {

            if (this.dragParentFlow != parentFlow) {
                this.$Message.warning('只能是同一流程下的子流程之间才可以交换位置');
                return;
            }

            let dropSubFlow = JSON.parse(JSON.stringify(subFlow));

            let param = {
                from: parentFlow.dragSubFlow.casefid,
                to: subFlow.casefid
            };
            this.$ajax('post', `/biz/flow/${this.caseId}/drag`, param, (data) => {
                parentFlow.sub_fids.splice(parentFlow.dragIndex, 1, dropSubFlow);
                parentFlow.sub_fids.splice(index, 1, parentFlow.dragSubFlow);

                this.$Message.success('调整顺序成功！');
            });
        },
        toggleFlowLocked(flow) {
            this.$ajax('post', `/biz/flow/${flow.caseid}/store/${flow.casefid}`, {locked: flow.locked? 0: 1}, data => {
                flow.locked = flow.locked? 0: 1;

                if (flow.locked) {
                    this.$Message.success('流程已锁定');
                } else {
                    this.$Message.success('流程已解锁');
                }
            });
        },
        isEntrust(flow) {
            return flow.creator_user && !this.$authCodeT(flow.creator_user.vip).isLawyer;
        },
        canEditOwnCreated(isLocked,createrid) {
            return !this.caseInfo.status && !isLocked && (this.oRole.isOwner || ((this.oRole.isTeam || this.oRole.isCoactor) && (createrid == this.$store.state.mineInfo.id)));
        },

        toCreateSubFlow(flow){
            flow.show_create_sub_flow = true;
            flow.add_subflow_panel = false;
            this.$nextTick(() => {
                this.$refs['createsubflow_'+flow.casefid][0].focus();
            });
        },
        createSubFlow(flow) {
            if(!flow.create_sub_flow_text){
                flow.show_create_sub_flow = false;
                return false;
            }

            let param = {
                name: flow.create_sub_flow_text,
                parent_fid: flow.casefid
            };

            this.$ajax('post', `/biz/flow/${this.caseId}/store`, param, data => {
                flow.sub_fids.push({
                    casefid: data.casefid,
                    name: flow.create_sub_flow_text,
                    creator: this.$store.state.mineInfo.id,
                    keeps: [],
                    is_editing: false,
                    editname: '',
                });

                flow.create_sub_flow_text = '';
                flow.show_create_sub_flow = false;
            });
        },
        toCreateFlowProgress(flow,parentFlow){
            parentFlow.curFlow = flow;
            parentFlow.curTab = 'progress';

            parentFlow.add_subflow_panel = false;
        },
        toCreateFlowForm(flow,parentFlow){
            parentFlow.curFlow = flow;
            parentFlow.curTab = 'form';

            parentFlow.add_subflow_panel = false;
        },

        toggleFlow(flow, parentFlow, tab) {
            parentFlow.curFlow = flow;
            parentFlow.curTab = tab;
        },
        toEditFlowName(flow) {
            flow.editname = flow.name;
            flow.is_editing = true;
            this.$nextTick(() => {
                this.$refs[`item_input_${flow.casefid}`][0].focus();
            });
        },
        editFlowName(flow){
            if(!flow.editname || flow.editname == flow.name) {
                flow.is_editing = false;
                return;
            }

            this.$ajax('post', `/biz/flow/${this.caseId}/store/${flow.casefid}`, {name: flow.editname}, data => {
                flow.name = flow.editname;
                flow.editname = '';
                flow.is_editing = false;
            });
        },

        delFlow(flow) {
            if (flow.curFlow.casefid == flow.casefid) {
                // 当前为父流程
                this.aFlows = this.aFlows.filter(item => item.casefid != flow.casefid);
            } else {
                flow.sub_fids = flow.sub_fids.filter(item => item.casefid != flow.curFlow.casefid);

                flow.curFlow = flow;
            }

            this.$Message.success('流程已删除');
        },
    },
}
</script>
