<style lang="stylus">
.businesslistwrapv2
    padding-top: 8px
    .bizlistheadnav
        .personalcasewrap
            display: inline-block
            position: relative
            .personalcaselist
                position: absolute
                top: 130%
                left: 0
                font-size: 14px
                width: 671px
                max-height: 271px
                color: #3d3d3d
                overflow-y: auto
                z-index: 11
                .sirenyewulisthead
                    padding: 0 15px
                    background: #65778b
                    color: #fff
                    height: 38px
                    line-height: 38px
                .sirenyewulist
                    padding: 0 15px
                    height: 42px
                    line-height: 42px
                    &:hover
                        background: #eefaff
                    a
                        color: #3d3d3d
        .bizlistheadnavright
            float: right
            .createcasebtn
                float: right
                font-size: 14px
                i
                    font-size: 20px
                    vertical-align: text-top
                    margin: 0 0 0 3px
            .bizlistteamlist
                float: right
                position: relative
                .bizlistteamlistbtn
                    background-color: transparent
                    color: #636363
                    font-size: 14px
                    padding: 5px 15px
                    img
                        margin: 0 5px 0 0
                        vertical-align: bottom
                    &.active, &:hover
                        color: #3dc1ff
                .bizlistteamlistpanel
                    position: absolute
                    right: 19px
                    width: 370px
                    top: 119%
                    .bizlistteampanelhead
                        height: 43px
                        line-height: 43px
                        padding: 0 17px
                        border-bottom: 1px solid #efefef
                        span
                            color: #22adee
                            float: right
                            cursor: pointer
                    .bizlistteampanelul
                        padding: 15px 10px 10px
                        max-height: 278px
                        overflow-y: auto
                        li
                            width: 66px
                            float: left
                            text-align: center
                            margin-bottom: 16px
                            .teamulheadimg
                                position: relative
                                width: 44px
                                height: 44px
                                margin: 0 auto
                                cursor: pointer
                                img, .hoverdeldiv
                                    width: 100%
                                    height: 100%
                                    border-radius: 50%
                                .hoverdeldiv
                                    display: none
                                &:hover
                                    .hoverdeldiv
                                        display: block
                            .teamname
                                color: #7a7a7a
                                font-size: 12px
                                margin-top: 6px
                                cursor: pointer
                                &:hover
                                    color: #3dc1ff
            .bizlistserachwrap
                position: relative
                width: 270px
                height: 33px
                float: right
    .bizlistbody
        padding-top: 22px
        .bizlistwrap
            position: relative
            min-height: 692px
        .businesslistpage
            text-align: center
            margin-top: 40px
    .bizlistlist
        border: 1px solid #dedede
        border-radius: 3px
        margin-bottom: 22px
        &:hover
            box-shadow: 0 2px 10px rgba(150, 150, 150, 0.3)
        .bizlistlisthead
            height: 43px
            line-height: 43px
            background: #f1f5f6
            .bizlistlistheadtit
                color: #2e2e2e
                font-weight: bold
                padding: 0 0 0 22px
                float: left
                max-width: 900px
                cursor: pointer
            .bizlistlistheadedit
                float: right
                a
                    padding: 0 30px
                    color: #4a4a4a
                    display: inline-block
                    .editicon
                        font-size: 26px
                        vertical-align: middle
        .bizlistlistbody
            background: #fff
            padding: 4px 0
            border-radius: 3px
            .bizlistitemul
                margin: 0 65px 0 36px
                li
                    border-bottom: 1px solid #e7e7e7
                    height: 44px
                    line-height: 44px
                    &:last-child
                        border-bottom: none
                    p
                        float: left
                        font-size: 13px
                    .casename
                        width: 600px
                        a
                            color: #3a92e2
                            display: inline-block
                            width: 600px
                            &:hover
                                color: #2c2c2c !important
                        .ivu-badge-dot
                            left: -4px
                            right: initial
                    .casetime
                        width: 246px
                    .casestate
                        width: 150px
                    .caseedit
                        width: 75px
                        text-align: center
                        img
                            display: none
                            vertical-align: middle
                            cursor: pointer
                            &:last-child
                                margin: 0 0 0 21px
                    &:hover
                        .caseedit
                            img
                                display: inline-block
                .historylistwrap
                    position: relative
                    min-height: 44px
                &.bizlistitemulopen
                    overflow-y: auto
                    max-height: 220px
            .bizlistitemarrow
                float: right
                display: inline-block
                width: 66px
                text-align: center
                height: 44px
                cursor: pointer
                img
                    margin-top: 16px
    .normalicon
        color: transparent
        margin: 0 5px 0 0
        font-size: 12px
        &.red_icon
            color: #f00
    .bizlistbtncommon
        color: #404040
        font-size: 14px
        min-width: 110px
        background: linear-gradient(to bottom, #fefefe 0%, #f0f0f0 50%, #e0e0e0 100%)
        &.active
            background: #4dbafd
            color: #fff

    $color = #3dc1ff

    // chrome
    ::-webkit-scrollbar
        width: 4px
        height: 4px

    ::-webkit-scrollbar-track-piece
        background-color: #d3e7f1
        -webkit-border-radius: 16px

    ::-webkit-scrollbar-thumb:vertical
        height: 4px
        background-color: $color
        -webkit-border-radius: 16px

    ::-webkit-scrollbar-thumb:horizontal
        width: 4px
        background-color: $color
        -webkit-border-radius: 16px

.personalcaseModel
    align-items: baseline !important
    .ivu-modal-body
        padding: 27px 43px 0
        .btn_wrap
            text-align: center
        .main
            max-height: 630px
            overflow-y: auto
.casecreateform
    padding: 25px 34px 0 0
    .newctmaddwrap
        position: relative
        .newctmaddicon
            font-size: 24px
            color: #3dc1ff
            text-align: right
            i
                cursor: pointer
        .newctmaddpanel
            position: absolute
            right: 0
            top: 113%
            padding: 25px 40px 33px
            width: 320px
            .newctmaddpaneltitle
                margin: 0 0 14px
                font-size: 14px
            .newctmaddpanelbtn
                margin: 21px 0 0
                text-align: center
.casecreateformselecttit
    padding: 0 22px 0 !important
    a
        color: #353535 !important
        display: inline-block
        font-size: 16px
        margin: 0 20px 0 0
        // padding: 0 13px
        height: 46px
        line-height: 37px
        border-bottom: 2px solid transparent
        cursor: default
        /*&.active
            color: #3dc1ff
            border-color: #3dc1ff*/
</style>

<template>
    <!-- <addMember
        v-if="showSettingAuth"
        :onlyLawyer="true"
        :title="'添加' + SettingAuthTitle"
        :initSelectedUserIds="SettingAuthUser"
        @close="showSettingAuth = false"
        @selected-users="getSettingAuthUsers"
        key="szqx">
    </addMember> -->
    <div class="businesslistwrapv2">
        <!-- 头部 -->
        <div class="bizlistheadnav">
            <Dropdown class="dropdown" @on-click="toggleBizList">
                <Button @click="resetGetCasePage('biz')" :class="{ active: curbignav == 'biz' && bizbignav.find((n) => n.key == cursmallnav)}" class="bizlistbtncommon">{{bizbignav.find((n) => n.key == cursmallnav).name}} <Icon type="arrow-down-b"></Icon></Button>
                <DropdownMenu slot="list">
                    <DropdownItem v-if="cursmallnav != list.key" v-for="list in bizbignav" :key="list.key" :name="list.key">{{list.name}}</DropdownItem>
                </DropdownMenu>
            </Dropdown>&nbsp;&nbsp;&nbsp;
            <!-- <Button @click.native="resetGetCasePage('qzkh')" :class="{ active: curbignav == 'qzkh'}" class="bizlistbtncommon">潜在客户</Button>&nbsp;&nbsp;&nbsp; -->
            <div class="personalcasewrap">
                <Badge :dot="!!haveNewPersonalCase">
                    <Button @click.native="openPersonalCasePanel" :class="{ active: personalCasePanel}" class="bizlistbtncommon">业务请求</Button>
                </Badge>
                <div v-if="personalCasePanel" v-scrollUnique class="personalcaselist floatpanel">
                    <Row class="sirenyewulisthead">
                        <Col span="11">　 案件名称</Col>
                        <Col span="5">委托人</Col>
                        <Col span="5">委托时间</Col>
                        <Col span="3">状态</Col>
                    </Row>
                    <div style="position: relative;">
                        <Row v-for="list in personalCaseList" :key="list.caseid" class="sirenyewulist">
                            <Col span="11" class="single_ellipsis">
                                <Icon :class="{ red_icon: !list.unread}" class="normalicon" type="record"></Icon>
                                <a @click="list.unread = 1, openPersonalCaseModel(list.caseid)" href="javascript:;">{{list.name}}</a>
                            </Col>
                            <Col span="5" class="single_ellipsis">
                                <a @click="$router.push({ name: 'personalCenter', params: { id: list.promulgator}})" href="javascript:;">{{list.promulgatorName}}</a>
                            </Col>
                            <Col span="5">{{list.created_at | timeFormat}}</Col>
                            <Col span="3">委托中</Col>
                        </Row>
                        <Spin size="large" fix v-if="personalLoading">
                            <Icon type="load-c" class="spin-icon-load"></Icon>
                        </Spin>
                        <div v-if="!personalLoading && !personalCaseList.length" class="nodatalist">
                            没有待处理的私人业务
                        </div>
                    </div>
                </div>
            </div>
            <div class="bizlistheadnavright clearfix">
                <Button @click.native="openCreatePanel(false)" class="createcasebtn" type="info">新建客户 / 案件 <Icon type="android-add-circle"></Icon></Button>&nbsp;
                <div class="bizlistteamlist">
                    <Button @click.native="openTeamListPanel" :class="{ active: teamListPanel}" class="bizlistteamlistbtn" type="text"><img src="/static/icon/team_icon_v2.png"> 团队成员 <Icon type="arrow-down-b"></Icon></Button>
                    <div v-if="teamListPanel" class="floatpanel bizlistteamlistpanel">
                        <div class="bizlistteampanelhead"><span @click="openAddMemberPanel">添加成员+</span></div>
                        <ul v-scrollUnique class="bizlistteampanelul clearfix">
                            <transition-group tag="div" name="grouplist">
                                <li v-for="(list, index) in teamlist.arr" :key="list.id">
                                    <div @click="toDelTeam(list, index)" class="teamulheadimg">
                                        <img :src="$avatarHash(list.id)">
                                        <div class="hoverdeldiv">
                                            <Icon type="minus-round"></Icon>
                                        </div>
                                    </div>
                                    <p @click="$router.push({ name: 'personalCenter', params: { id: list.id}})" class="teamname single_ellipsis">{{list.name}}</p>
                                </li>
                            </transition-group>
                            <Spin size="large" fix v-if="teamlist.loading">
                                <Icon type="load-c" size="18" class="spin-icon-load"></Icon>
                            </Spin>
                            <div v-if="!teamlist.arr.length && !teamlist.loading" class="nodatalist">未添加团队成员！</div>
                        </ul>
                    </div>
                </div>
                <div class="bizlistserachwrap">
                    <z_searchBox placeholder="输入客户名称、案件名称搜索" :presearch="false" searchtype="biz" :startsearchstate.sync="startsearchstate"></z_searchBox>
                </div>
            </div>
        </div>
        <!-- end -->
        <!-- 主体 -->
        <div class="bizlistbody">
            <div class="bizlistwrap">
                <div v-for="(list, listidx) in caselist.arr" class="bizlistlist">
                    <div class="bizlistlisthead clearfix">
                        <div @click="gotoCTMDetails(list)" class="bizlistlistheadtit single_ellipsis">{{list.ctmname}}</div>
                        <div class="bizlistlistheadedit">
                            <Dropdown @on-click="toggleCTMList($event, list, listidx)" class="dropdown" placement="bottom-end">
                                <a href="javascript:;">
                                    <Icon class="editicon" type="android-more-vertical"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem name="addcase">添加案件</DropdownItem>
                                    <DropdownItem name="editctm">编辑客户</DropdownItem>
                                    <!-- <DropdownItem v-if="curbignav == 'qzkh'" name="changezx">转为正式</DropdownItem> -->
                                    <DropdownItem name="delctm">删除客户</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                    <div class="bizlistlistbody">
                        <span v-if="list.casenum > 1" @click="getHistoryCaseList(list)" class="bizlistitemarrow">
                            <img v-if="!list.historyPanel" title="展开更多案件" src="/static/icon/bizlist_arrowbot_icon.png">
                            <img v-else title="收起更多案件" src="/static/icon/bizlist_arrowtop_icon.png">
                        </span>
                        <span v-if="list.casenum == 1" class="bizlistitemarrow" style="cursor: initial">
                            <img title="没有更多案件" src="/static/icon/bizlist_arrowbot_gray_icon.png">
                        </span>
                        <ul :class="{ bizlistitemulopen: list.historyPanel}" class="bizlistitemul">
                            <li v-if="list.caseid">
                                <p class="casename">
                                    <Badge :dot="list.casestatus == 2">
                                        <a @click.prevent="$router.push({ name: 'caseEdit', params: { caseid: list.caseid}})" :href="`/business/caseEdit/${list.caseid}`" class="single_ellipsis">案件名称：{{list.casename}}</a>
                                    </Badge>
                                </p>
                                <p class="casetime">编辑时间：{{list.casetime}}</p>
                                <p class="casestate">处理状态：{{list.casestatus == 2 ? '未处理' : list.casestatus == 1 ? '已结案' : '处理中'}}</p>
                                <p v-if="$authCodeT($store.getters.auth_code_123).isLawyer && $store.getters.auth_code_5 != 1" class="caseedit"><img v-if="list.casestatus != 1" @click="editCase(list, list.ctmid)" title="编辑案件" src="/static/icon/bizlist_pen_icon.png"><img @click="delCase(listidx, caselist.arr, list.ctmid, list.caseid, true)" title="删除案件" src="/static/icon/bizlist_del_icon.png"></p>
                            </li>
                            <li v-else>
                                暂未创建案件！
                            </li>
                            <div v-if="list.historyPanel" class="historylistwrap">
                                <li v-for="(li, liidx) in list.historylist">
                                    <p class="casename">
                                        <Badge :dot="li.status == 2">
                                            <a @click="$router.push({ name: 'caseEdit', params: { caseid: li.caseid}})" href="javascript:;" class="single_ellipsis">案件名称：{{li.casename}}</a>
                                        </Badge>
                                    </p>
                                    <p class="casetime">编辑时间：{{li.updated_at}}</p>
                                    <p class="casestate">处理状态：{{li.status == 2 ? '未处理' : li.status == 1 ? '已结案' : '处理中'}}</p>
                                    <p class="caseedit"><img v-if="li.status != 1" @click="editCase(li, list.ctmid)" title="编辑案件" src="/static/icon/bizlist_pen_icon.png"><img @click="delCase(liidx, list.historylist, list.ctmid, li.caseid, false)" title="删除案件" src="/static/icon/bizlist_del_icon.png"></p>
                                </li>
                                <Spin size="large" fix v-if="list.historyloading">
                                    <Icon type="load-c" size="18" class="spin-icon-load"></Icon>
                                </Spin>
                                <p v-if="!list.historylist.length && !list.historyloading" class="nodatalist">没有更多案件！</p>
                            </div>
                        </ul>
                    </div>
                </div>
                <!-- 加载动画 -->
                <Spin size="large" fix v-if="caselist.loading">
                    <Icon type="load-c" size="18" class="spin-icon-load"></Icon>
                    <div>加载中...</div>
                </Spin>
                <!-- 没有案件 -->
                <div v-if="!caselist.loading && !caselist.arr.length" class="nodatalist" style="padding: 72px;">
                    <img @click="openCreatePanel(false)" src="/static/img/nolistcontent.png" style="cursor: pointer;" alt="无相关的案件列表">
                </div>
            </div>
            <!-- 分页 -->
            <Page v-if="caselist.total > caselist.perpage" class="businesslistpage" :current.sync="caselist.page" :total="caselist.total" :page-size="caselist.perpage" @on-change="changCasePage"></Page>
        </div>
        <!-- end -->
        <addMember
            v-if="addMemberModal"
            :onlyLawyer="true"
            title="添加团队成员"
            :initSelectedUserIds="teamlist.arr"
            @close="addMemberModal = false"
            @selected-users="getAddMemberUsers"
            key="tjtdcy">
        </addMember>
        <Modal
            v-model="personalcaseModel"
            :closable="false"
            :mask-closable="false"
            width="1200"
            :styles="{top: '130px'}"
            class-name="personalcaseModel">
            <div class="main">
                <z_sendBiz v-if="personalcaseModel" :id="personalcaseModelID" :hideshow.sync="personalcaseModel" :readOnly="true"></z_sendBiz>
            </div>
            <div slot='footer'>
                <div class="btn_wrap">
                    <Button type="info" class="gray_btn" @click="personalcaseModel = false">关 闭</Button>
                </div>
            </div>
        </Modal>
        <Modal
            v-model="caseModal"
            :closable="false"
            :mask-closable="false"
            width="545"
            class-name="groupmodal">
            <div class="modal_tit tag_tit casecreateformselecttit">
                <!--  @click="caseModalNav = 'zs'" :class="{ active: caseModalNav == 'zs'}" -->
                <a href="javascript:;">新建客户 / 案件</a>
                <!-- <a @click="caseModalNav = 'qz'" :class="{ active: caseModalNav == 'qz'}" href="javascript:;">潜在客户</a> -->
            </div>
            <Form v-show="caseModalNav == 'zs'" :model="casecreateform" :rules="ruleValidate" ref="casecreateform" :label-width="120" class="casecreateform">
                <FormItem prop="selectid" label="客户归属：">
                    <Select v-model="casecreateform.selectid" @on-change="getCtmList" class="selectselectwrap" placeholder="请选择客户归属">
                        <Option v-for="list in teamOwnerList" :value="list.id" :key="list.id">{{list.name}}</Option>
                    </Select>
                </FormItem>
                <Row>
                    <Col span="22">
                        <FormItem prop="selectcmtid" label="客户名称：">
                            <Select v-model="casecreateform.selectcmtid" :key="casecreateform.selectid" ref="selectcmtid" class="selectselectwrap" placeholder="请选择或添加客户" filterable>
                                <div class="listul">
                                    <div v-for="list in ctmlist">
                                        <Option :value="list.ctmid" :key="list.ctmid">{{list.name}}</Option>
                                        <div v-if="list.child.length" class="listulchild">
                                            <Option v-for="li in list.child" :value="li.ctmaid" :key="li.ctmaid">{{li.name}}</Option>
                                        </div>
                                    </div>
                                    <ul v-if="!ctmlist.length" class="ivu-select-not-found"><li>此律师暂无客户</li></ul>
                                </div>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="2" class="newctmaddwrap" v-clickoutside="AddNewCTMCancel">
                        <div class="newctmaddicon">
                            <Icon @click.native="toAddNewCTM" type="android-add-circle" title="添加客户"></Icon>
                        </div>
                        <div v-if="isEditAddNewCtm" class="floatpanel newctmaddpanel">
                            <p class="newctmaddpaneltitle">添加客户</p>
                            <Input @on-enter="AddNewCTM" v-model.trim="addNewCtmVal" ref="addnewctmipt" placeholder="输入客户名称"></Input>
                            <div class="newctmaddpanelbtn">
                                <Button @click.native="AddNewCTM" type="info">提　交</Button>&nbsp;&nbsp;&nbsp;
                                <Button @click.native="AddNewCTMCancel" type="info" class="gray_btn">取　消</Button>
                            </div>
                        </div>
                    </Col>
                </Row>
                <FormItem label="案件名称：">
                    <Input :maxlength="30" v-model.trim="casecreateform.casename" placeholder="请输入案件名称"></Input>
                </FormItem>
            </Form>
            <!-- <Form v-show="caseModalNav == 'qz'" :model="qzcasecreateform" :rules="ruleValidate" ref="qzcasecreateform" :label-width="120" class="casecreateform">
                <FormItem prop="selectid" label="客户归属：">
                    <Select v-model="qzcasecreateform.selectid" @on-change="qzgetCtmList" class="selectselectwrap" placeholder="请选择客户归属">
                        <Option v-for="list in teamOwnerList" :value="list.id" :key="'qz' + list.id">{{list.name}}</Option>
                    </Select>
                </FormItem>
                <Row>
                    <Col span="22">
                        <FormItem prop="selectcmtid" label="客户名称：">
                            <Select v-model="qzcasecreateform.selectcmtid" :key="qzcasecreateform.selectid" ref="qzselectcmtid" class="selectselectwrap" placeholder="请选择或添加客户" filterable>
                                <div class="listul">
                                    <div v-for="list in qzctmlist">
                                        <Option :value="list.ctmid" :key="list.ctmid">{{list.name}}</Option>
                                        <div v-if="list.child.length" class="listulchild">
                                            <Option v-for="li in list.child" :value="li.ctmaid" :key="li.ctmaid">{{li.name}}</Option>
                                        </div>
                                    </div>
                                    <ul v-if="!qzctmlist.length" class="ivu-select-not-found"><li>此律师暂无潜在客户</li></ul>
                                </div>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="2" class="newctmaddwrap" v-clickoutside="qzAddNewCTMCancel">
                        <div class="newctmaddicon">
                            <Icon @click.native="qztoAddNewCTM" type="android-add-circle" title="添加客户"></Icon>
                        </div>
                        <div v-if="qzisEditAddNewCtm" class="floatpanel newctmaddpanel">
                            <p class="newctmaddpaneltitle">添加客户</p>
                            <Input @on-enter="qzAddNewCTM" v-model.trim="qzaddNewCtmVal" ref="qzaddnewctmipt" placeholder="输入潜在客户名称"></Input>
                            <div class="newctmaddpanelbtn">
                                <Button @click.native="qzAddNewCTM" type="info">提　交</Button>&nbsp;&nbsp;&nbsp;
                                <Button @click.native="qzAddNewCTMCancel" type="info" class="gray_btn">取　消</Button>
                            </div>
                        </div>
                    </Col>
                </Row>
                <FormItem label="案件名称：">
                    <Input :maxlength="30" v-model.trim="qzcasecreateform.casename" placeholder="请输入案件名称"></Input>
                </FormItem>
            </Form> -->
            <div slot="footer">
                <Button v-show="caseModalNav == 'zs'" @click="caseCreateBtn(true)" type="info">确 定</Button>
                <Button v-show="caseModalNav == 'zs'" @click="caseCreateBtn(false)" type="info" class="gray_btn">取 消</Button>
                <!-- <Button v-show="caseModalNav == 'qz'" @click="qzcaseCreateBtn(true)" type="info" style="margin-left: 0;">确 定</Button>
                <Button v-show="caseModalNav == 'qz'" @click="qzcaseCreateBtn(false)" type="info" class="gray_btn">取 消</Button> -->
            </div>
        </Modal>
        <Modal
            v-model="case_edit_modal"
            :closable="false"
            :mask-closable="false"
            width="545"
            class-name="groupmodal">
            <div class="modal_tit tag_tit">编辑案件基本信息</div>
            <Form :model="case_info_form" :rules="caseedit_form_ruleValidate" ref="case_edit_form" :label-width="120" class="casecreateform">
                <FormItem prop="name" label="案件名称：">
                    <Input v-model.trim="case_info_form.name" placeholder="请输入案件名称"></Input>
                </FormItem>
                <FormItem prop="status" label="处理状态：">
                    <Select v-model="case_info_form.status" :disabled="!case_info_form.isowner && !case_info_form.isteam" class="selectselectwrap">
                        <Option :value="0">处理中</Option>
                        <Option :value="1">结案</Option>
                    </Select>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="submit_case_info" type="info">确 定</Button>
                <Button @click="case_edit_modal = false" type="info" class="gray_btn">取 消</Button>
            </div>
        </Modal>
        <pay v-if="show_pay_modal" @close="close"></pay>
        <editCustomer v-if="userInfoEditId && userInfoEditModal" @getUserInfo="getUserInfoEdit" :ctmid="userInfoEditId" :display.sync="userInfoEditModal"></editCustomer>
    </div>
</template>

<script>
import moment from 'moment';
import addMember from '@/components/common/addMember';
import z_sendBiz from '@/components/common/z-sendBiz';
import pay from '@/components/personalSetter/pay';
import clickoutside from '@/common/directives/clickOutSide';
import editCustomer from '@/components/business/editCustomer';
import z_searchBox from '@/components/common/z-searchBox';

export default {
    name: 'businessList',
    components: { addMember, z_sendBiz, pay, editCustomer, z_searchBox},
    data () {
        return {
            // imgUrl,
            curbignav: 'biz',
            cursmallnav: 'qbyw',
            bizbignav: [
                { name: '业务列表', key: 'qbyw', url: ''},
                { name: '处理中', key: 'clz', url: '0'},
                { name: '已结案', key: 'ygd', url: '1'},
                { name: '未处理', key: 'wcl', url: '2'}
            ],
            teamListPanel: false,
            teamlist: {
                arr: [],
                loading: false,
                isfirst: true
            },
            addMemberModal: false,
            caselist: {
                arr: [],
                loading: false,
                page: 1,
                perpage: 6,
                total: 0
            },
            caseModal: false,
            caseModalNav: 'zs',
            casecreateform: {
                casename: '',
                selectcmtid: '',
                selectid: ''
            },
            ruleValidate: {
                casename: [
                    { required: true, message: '案件名不能为空', trigger: 'blur' }
                ],
                selectcmtid: [
                    { required: true, type: 'string', message: '请选择或添加客户', trigger: 'change' }
                ],
                selectid: [
                    { required: true, type: 'number', message: '请选择客户归属', trigger: 'change' }
                ]
            },
            qzcasecreateform: {
                casename: '',
                selectcmtid: '',
                selectid: ''
            },
            ctmlist: [],
            qzctmlist: [],
            teamOwnerList: [],
            isEditAddNewCtm: false,
            qzisEditAddNewCtm: false,
            addNewCtmVal: '',
            qzaddNewCtmVal: '',
            newAddCtmIds: [],
            qznewAddCtmIds: [],
            personalCasePanel: false,
            personalCaseList: [],
            personalLoading: false,
            personalcaseModel: false,
            personalcaseModelID: '',
            // showSettingAuth: false,
            // SettingAuthTitle: '',
            // SettingAuthUser: [],
            // SettingAuthType: '',
            // SettingAuthCtmid: '',
            // SettingAuthCaseid: '',
            show_pay_modal: false,
            expireSaveList: '',
            // 编辑案件modal
            case_edit_modal: false,
            case_info_form: {
                caseid: '',
                name: '',
                status: '',
                isowner: '',
                isteam: ''
            },
            caseedit_form_ruleValidate: {
                name: [
                    { required: true, message: '案件名不能为空', trigger: 'blur' }
                ],
                status: [
                    { required: true, type: 'number', message: '处理状态不能为空', trigger: 'change' }
                ]
            },
            userInfoEditId: '',
            userInfoEditModal: false,
            startsearchstate: false
        }
    },
    computed: {
        haveNewPersonalCase() {
            return this.personalCaseList.find((val => !val.unread));
        }
    },
    activated() {
        this.getCaseList();
        this.getPersonCaseList();
    },
    mounted() {
        if (this.$route.query.personalcaseid) {
            this.openPersonalCaseModel(this.$route.query.personalcaseid);
        }
    },
    methods: {
        toggleBizList(name) {
            this.cursmallnav = name;
            this.resetGetCasePage('biz');
        },
        getTeamList() {
            if( !this.teamlist.isfirst ) {
                return false;
            }

            this.teamlist.isfirst = false;

            this.$ajax('get', '/biz/team/list', 'teamlist.loading', (data) => {
                this.teamlist.arr = data.data;
            })
        },
        openTeamListPanel() {
            this.teamListPanel = !this.teamListPanel;
            if( this.teamListPanel ){
                // 打开团队成员面板关闭接受业务
                this.personalCasePanel = false;
                this.getTeamList();
            }
        },
        openAddMemberPanel() {
            this.getTeamList();
            this.addMemberModal = true;
        },
        getAddMemberUsers(users, ids, isNoChange) {
            if (isNoChange) {
                this.addMemberModal = false;
                return;
            }

            this.$ajax('post', '/biz/team/add', {aids: ids}, (data) => {
                let newArr = [];
                let flag = true;

                users.forEach((e, i) => {
                    let isExist = false;
                    let msg;

                    data.data.forEach(f => {
                        if( e.id == f.id ){
                            isExist = true;
                            msg = f.errmsg;
                        }
                    });

                    if( !isExist ){
                        newArr.push(e);
                    }else{
                        flag = false;
                        this.$Message.error( e.name + ' ' + msg );
                    }
                });
                this.teamlist.arr = newArr;

                if( flag ){
                    this.$Message.success('修改团队成员成功!');
                }

                this.addMemberModal = false;
            });
        },
        toDelTeam(list, i) {
            this.$Modal.confirm({
                title: '确认对话框',
                content: '确认把 ' + list.name + ' 移出团队吗？',
                onOk: () => {
                    this.delTeam(list, i);
                }
            });
        },
        delTeam(list, i) {
            this.$ajax('post', `/biz/team/del/${list.id}`, (data) => {
                this.teamlist.arr.splice(i, 1);
                this.$Message.success('删除成功！');
            });
        },
        getCaseList() {
            let url
            if( this.curbignav == 'biz' ){
                url = '/biz/case/list';
            }
            /*if( this.curbignav == 'qzkh' ){
                url = '/biz/customer/potentiallist';
            }*/
            let params = { page: this.caselist.page, perpage: this.caselist.perpage};
            if( this.cursmallnav != 'qbyw' && this.curbignav == 'biz' ){
                params.status = this.bizbignav.find((n) => n.key == this.cursmallnav).url;
            }
            this.$ajax('get', url, params, 'caselist.loading', (data) => {
                if( Object.prototype.toString.call(data.data) === '[object Array]' ){
                    // 没有数据
                    this.caselist.total = 0;
                    this.caselist.arr = [];
                }else{
                    this.caselist.total = data.data.total;
                    this.caselist.arr = data.data.data.map(val => {
                        val.historylist = [];
                        val.isGetHistory = false;
                        val.historyPanel = false;
                        val.historyloading = false;
                        return val;
                    });
                }
            });
        },
        resetGetCasePage(type) {
            // 请求前重置
            this.curbignav = type;
            this.caselist.arr = [];
            this.caselist.page = 1;
            this.caselist.total = 0;
            this.getCaseList();
            // 请求列表关闭接受业务
            this.personalCasePanel = false;
            // 关闭团队成员面板
            this.teamListPanel = false;
        },
        changCasePage(page) {
            // 关闭接受业务
            this.personalCasePanel = false;
            // 关闭团队成员面板
            this.teamListPanel = false;
            this.getCaseList();
        },
        getHistoryCaseList(list) {
            list.historyPanel = !list.historyPanel;
            if( list.isGetHistory ){
                return false;
            }
            list.historyloading = true;
            let params = { detail: 1};
            if( this.cursmallnav != 'qbyw' && this.curbignav == 'biz' ){
                params.status = this.bizbignav.find((n) => n.key == this.cursmallnav).url;
            }
            this.$ajax('get', `/biz/customer/caselist/${list.ctmid}`, params, (data) => {
                let cases = data.data.data;
                // 去掉重复的第一条
                cases.shift();
                cases.forEach(e => {
                    e.casestatus = e.status;
                });
                list.historylist = cases;
                list.isGetHistory = true;
                list.historyloading = false;
            }, (err) => {
                list.historyloading = false;
            });
        },
        // menuClick(name, list, index) {
        //     switch( name ) {
        //         case 'del':
        //             this.$Modal.confirm({
        //                 title: '确认对话框',
        //                 content: '确认删除吗？',
        //                 onOk: () => {
        //                     this.delCase(index, list.ctmid, list.caseid);
        //                 }
        //             });
        //             break;
        //         case 'coact':
        //             this.openPersonCaseModel(list, 'coactor', '协作者');
        //             break;
        //         case 'visit':
        //             this.openPersonCaseModel(list, 'visitor', '外访者');
        //             break;
        //     }
        // },
        delCase(idx, casearr, ctmid, caseid, isbig){
            this.$Modal.confirm({
                title: '确认对话框',
                content: '确认删除此案件？',
                onOk: () => {
                    this.$ajax('post', `/biz/case/${ctmid}/del/${caseid}`, (data) => {
                        if( isbig ){
                            this.getCaseList();
                        }else{
                            casearr.splice(idx, 1);
                        }
                        this.$Message.success('成功删除案件！');
                    });
                }
            });
        },
        getCtmList(ctmid) {
            if( !ctmid ){
                return false;
            }

            this.$ajax('get', `/biz/customer/${ctmid}/list`, { search: '', detail: 0, potential: 0}, (data) => {
                this.ctmlist = data.data.map(val => {
                    val.ctmid = val.ctmid.toString();
                    val.child = [];
                    // 循环获取子级
                    this.getCtmChildList(val);
                    return val;
                });
            });
        },
        qzgetCtmList(ctmid) {
            if( !ctmid ){
                return false;
            }

            this.$ajax('get', `/biz/customer/${ctmid}/list`, { search: '', detail: 0, potential: 1}, (data) => {
                this.qzctmlist = data.data.map(val => {
                    val.ctmid = val.ctmid.toString();
                    val.child = [];
                    // 循环获取子级
                    this.getCtmChildList(val);
                    return val;
                });
            });
        },
        getCtmChildList(customer) {
            this.$ajax('get', `/biz/customer/${customer.ctmid}/assoc/list`, { detail: 0}, (data) => {
                customer.child = data.data.map(val => {
                    val.ctmaid = customer.ctmid + '-' + val.ctmaid;
                    return val;
                })
            });
        },
        getTeamOwner(ispersonal) {
            this.$ajax('get', '/biz/team/listleader', (data) => {
                let myid = this.$store.state.mineInfo.id;
                if( data.data.map(e => e.id).includes(myid) ){

                }else{
                    data.data.push({ id: myid, name: this.$store.state.mineInfo.name});
                }
                this.teamOwnerList = data.data;
                if( !ispersonal ){
                    this.casecreateform.selectid = this.teamOwnerList[0].id;
                    // this.qzcasecreateform.selectid = this.teamOwnerList[0].id;
                }
            });
        },
        toAddNewCTM() {
            if( this.casecreateform.selectid ){
                this.isEditAddNewCtm = !this.isEditAddNewCtm;
                if( this.isEditAddNewCtm ){
                    this.$nextTick(() => {
                        this.$refs.addnewctmipt.focus();
                    });
                }
            }else{
                this.$Message.error( '请先选择客户归属！' );
            }
        },
        AddNewCTM() {
            if( this.addNewCtmVal == '' ){
                this.$Message.error( '客户名称不能为空！' );
                this.$nextTick(() => {
                    this.$refs.addnewctmipt.focus();
                });
                return false;
            }

            this.$ajax('post', `/biz/customer/${this.casecreateform.selectid}/store`, { name: this.addNewCtmVal, potential: 0}, (data) => {
                let strCtmid = data.ctmid + '';

                this.ctmlist.push({ ctmid: strCtmid, name: this.addNewCtmVal, child: []});
                // 记录新增的客户id
                this.newAddCtmIds.push(data.ctmid);
                // 重置状态
                this.addNewCtmVal = '';

                this.$nextTick(() => {
                    this.casecreateform.selectcmtid = strCtmid;
                });

                this.$Message.success( '成功添加客户！' );
            });
            this.isEditAddNewCtm = false;
        },
        AddNewCTMCancel() {
            this.addNewCtmVal = '';
            this.isEditAddNewCtm = false;
        },
        qztoAddNewCTM() {
            if( this.qzcasecreateform.selectid ){
                this.qzisEditAddNewCtm = !this.qzisEditAddNewCtm;
                if( this.qzisEditAddNewCtm ){
                    this.$nextTick(() => {
                        this.$refs.qzaddnewctmipt.focus();
                    });
                }
            }else{
                this.$Message.error( '请先选择客户归属！' );
            }
        },
        qzAddNewCTM() {
            if( this.qzaddNewCtmVal == '' ){
                this.$Message.error( '潜在客户名称不能为空！' );
                this.$nextTick(() => {
                    this.$refs.qzaddnewctmipt.focus();
                });
                return false;
            }

            this.$ajax('post', `/biz/customer/${this.qzcasecreateform.selectid}/store`, { name: this.qzaddNewCtmVal, potential: 1}, (data) => {
                let strCtmid = data.ctmid + '';

                this.qzctmlist.push({ ctmid: strCtmid, name: this.qzaddNewCtmVal, child: []});
                // 记录新增的潜在客户id
                this.qznewAddCtmIds.push(data.ctmid);
                // 重置状态
                this.qzaddNewCtmVal = '';

                this.$nextTick(() => {
                    this.qzcasecreateform.selectcmtid = strCtmid;
                });

                this.$Message.success( '成功添加潜在客户！' );
            });
            this.qzisEditAddNewCtm = false;
        },
        qzAddNewCTMCancel() {
            this.qzaddNewCtmVal = '';
            this.qzisEditAddNewCtm = false;
        },
        caseCreateBtn(isCreate) {
            if( isCreate ){
                this.$refs.casecreateform.validate((valid) => {
                    if(valid) {
                        // 案件名为空
                        if( this.casecreateform.casename == '' ){
                            this.cursmallnav = 'qbyw';
                            this.resetGetCasePage('biz');
                            this.$refs.casecreateform.resetFields();
                            this.casecreateform.casename = '';
                        }else{
                            let idarr = this.casecreateform.selectcmtid.split('-');
                            let params = { name: this.casecreateform.casename, status: false};
                            if( idarr[1] ){
                                params.ctmaid = idarr[1];
                            }

                            this.$ajax('post', `/biz/case/${idarr[0]}/store`, params, (data) => {
                                this.$refs.casecreateform.resetFields();
                                this.casecreateform.casename = '';
                                this.$router.push({ name: 'caseEdit', params: { caseid: data.caseid}});
                            });
                        }

                        this.caseModal = false;

                        // 只要点了确定 创建多少客户都保存 并且清空保存的新增客户ids
                        this.newAddCtmIds = [];
                    }
                })
            }else{
                this.$refs.casecreateform.resetFields();
                this.casecreateform.casename = '';
                this.caseModal = false;
                // 删除新增客户 并且清空
                if( this.newAddCtmIds.length ){
                    this.delCTM(this.newAddCtmIds);
                    this.newAddCtmIds = [];
                }
            }
        },
        qzcaseCreateBtn(isCreate) {
            if( isCreate ){
                this.$refs.qzcasecreateform.validate((valid) => {
                    if(valid) {
                        if( this.qzcasecreateform.casename == '' ){
                            this.resetGetCasePage('qzkh');
                            this.$refs.casecreateform.resetFields();
                            this.casecreateform.casename = '';
                            this.$refs.qzcasecreateform.resetFields();
                            this.qzcasecreateform.casename = '';
                        }else{
                            let idarr = this.qzcasecreateform.selectcmtid.split('-');
                            let params = { name: this.qzcasecreateform.casename, status: false};
                            if( idarr[1] ){
                                params.ctmaid = idarr[1];
                            }

                            this.$ajax('post', `/biz/case/${idarr[0]}/store`, params, (data) => {
                                this.resetGetCasePage('qzkh');
                                this.$refs.casecreateform.resetFields();
                                this.casecreateform.casename = '';
                                this.$refs.qzcasecreateform.resetFields();
                                this.qzcasecreateform.casename = '';
                            });
                        }

                        this.caseModal = false;

                        // 只要点了确定 创建多少客户都保存 并且清空保存的新增潜在客户ids
                        this.qznewAddCtmIds = [];
                    }
                })
            }else{
                this.$refs.qzcasecreateform.resetFields();
                this.qzcasecreateform.casename = '';
                this.caseModal = false;
                // 删除新增潜在客户 并且清空
                if( this.qznewAddCtmIds.length ){
                    this.delCTM(this.qznewAddCtmIds);
                    this.qznewAddCtmIds = [];
                }
            }
        },
        delCTM(ids, fn) {
            this.$ajax('post', `/biz/customer/del/${ids.join(',')}`, (data) => {
                if( fn ){
                    fn();
                }
            });
        },
        toggleCTMList(name, list, index) {
            // 关闭接受业务
            this.personalCasePanel = false;
            // 关闭团队成员面板
            this.teamListPanel = false;
            switch( name ) {
                case 'addcase':
                    // 判断是否有权为该客户创建案件
                    if( list.checkCustomer == 1 ){
                        this.$Modal.warning({
                            title: '不能创建案件的提示',
                            content: '无权为该客户创建案件！'
                        });
                    }else{
                        this.casecreateform.selectid = list.ctmbelongerid;
                        if( this.curbignav == 'biz' ){
                            this.casecreateform.selectcmtid = list.ctmid + '';
                        }

                        this.openCreatePanel(list);
                    }
                    break;
                case 'editctm':
                    if( list.checkCustomer == 1 ){
                        this.$Message.error('无权编辑客户！');
                    }else{
                        this.userInfoEditId = list.ctmid;
                        this.userInfoEditModal = true;
                    }
                    break;
                case 'changezx':
                    if( list.checkCustomer == 1 ){
                        this.$Message.error('无权操作！');
                    }else{
                        if( list.casenum ){
                            this.$Modal.confirm({
                                title: '确认对话框',
                                content: '确定将 '+ list.ctmname +' 转为正式客户吗？',
                                onOk: () => {
                                    this.$ajax('get', `/biz/customer/potentialtoofficial`, { ctmid: list.ctmid}, (data) => {
                                        this.$Message.success('成功转为正式客户！');
                                        this.caselist.arr.splice(index, 1);
                                    });
                                },
                                onCancel: () => {
                                    //this.$Message.info('点击了取消');
                                }
                            });
                        }else{
                            this.$Message.error('请先为此客户创建案件！');
                        }
                    }
                    break;
                case 'delctm':
                    if( list.checkCustomer == 1 ){
                        this.$Message.error('无权删除客户！');
                    }else{
                        this.$Modal.confirm({
                            title: '确认对话框',
                            content: '确认删除此客户吗？（此客户下的所有案件也会被删除）',
                            onOk: () => {
                                this.delCTM([list.ctmid], () => {
                                    this.resetGetCasePage(this.curbignav);
                                    this.$Message.success('删除客户成功！');
                                });
                            },
                            onCancel: () => {
                                //this.$Message.info('点击了取消');
                            }
                        });
                    }
                    break;
            }
        },
        openCreatePanel(list) {
            // 打开案件面板关闭接受业务
            this.personalCasePanel = false;
            // 关闭团队成员面板
            this.teamListPanel = false;
            this.$isExpire(() => {
                // 账号没过期
                this.getTeamOwner(!!list);
                if( this.curbignav == 'biz' ){
                    this.caseModalNav = 'zs';
                }/*else if( this.curbignav == 'qzkh' ){
                    this.caseModalNav = 'qz';
                }*/
                this.caseModal = true;

                // select组件中 filterable为true 搜索的input
                setTimeout(() => {
                    this.$refs.selectcmtid.$refs.input.tabIndex = -1;
                    // this.$refs.qzselectcmtid.$refs.input.tabIndex = -1;
                }, 500);
            }, () => {
                this.show_pay_modal = true;
                this.expireSaveList = list;
            });
        },
        close(oOrder) {
            this.show_pay_modal = false;
            if (oOrder) {
                this.$nextTick(() => {
                    this.openCreatePanel(this.expireSaveList);
                });
            }
        },
        getPersonCaseList() {
            this.$ajax('get', '/biz/case/personalcaselist', 'personalLoading', (data) => {
                this.personalCaseList = data.data;
            });
        },
        openPersonalCasePanel() {
            this.personalCasePanel = !this.personalCasePanel;
            if( this.personalCasePanel ){
                // 关闭团队成员面板
                this.teamListPanel = false;
                this.getPersonCaseList();
            }
        },
        editCase(list, ctmid) {
            this.case_info_form.ctmid = ctmid;
            this.case_info_form.caseid = list.caseid;
            this.case_info_form.name = list.casename;
            this.case_info_form.status = list.casestatus == 2 ? 0 : list.casestatus;
            this.case_info_form.isowner = list.role == 'owner';
            this.case_info_form.isteam = list.role == 'team';
            this.case_edit_modal = true;
        },
        submit_case_info() {
            this.$refs.case_edit_form.validate((valid) => {
                if( valid ) {
                    let params = {
                        name: this.case_info_form.name,
                        status: this.case_info_form.status
                    };
                    this.$ajax('post', `/biz/case/${this.case_info_form.ctmid}/store/${this.case_info_form.caseid}`, params, (data) => {
                        // 由于改过的案件会在最前面 所以重置页数
                        this.caselist.page = 1;
                        this.getCaseList();
                    });
                    this.case_edit_modal = false;
                }
            });
        },
        getUserInfoEdit(info) {
            this.caselist.arr.forEach(e => {
                if( e.ctmid == this.userInfoEditId ){
                    e.ctmname = info.name;
                }
            })
        },
        // openPersonCaseModel(list, type, typestr) {
        //     this.SettingAuthType = type;
        //     this.SettingAuthCtmid = list.ctmid;
        //     this.SettingAuthCaseid = list.caseid;
        //     this.SettingAuthTitle = typestr;
        //     this.SettingAuthUser = [];

        //     this.$ajax('get', `/biz/case/${this.SettingAuthCtmid}/assoc/${this.SettingAuthCaseid}`, (data) => {
        //         this.SettingAuthUser = data.data.filter(val => val.type == type);
        //     });

        //     this.showSettingAuth = true;
        // },
        // getSettingAuthUsers(users, ids, isNoChange) {
        //     this.showSettingAuth = false;

        //     if (isNoChange) {
        //         return;
        //     }

        //     this.$http.post(`/biz/case/${this.SettingAuthCtmid}/assoc/${this.SettingAuthCaseid}`, { uids: ids, type: this.SettingAuthType}).then(response => {
        //        if( response.data.retcode == RETCODE_OK ){
        //             this.$Message.success('修改' + this.SettingAuthTitle + '成功!');
        //         }else{
        //             let text;
        //             if( typeof response.data.errmsg == 'string'){
        //                 text = response.data.errmsg;
        //             }else{
        //                 text = response.data.errmsg.user.join('、') + ' 是' + response.data.errmsg.errmsg;
        //             }
        //             this.$Message.error( text );
        //         }
        //     });
        // },
        openPersonalCaseModel(caseid) {
            this.personalcaseModelID = caseid;
            this.personalcaseModel = true;
        },
        gotoCTMDetails(list) {
            if( list.checkCustomer == 1 ){
                this.$Message.error('无权查看客户！');
            }else{
                this.$router.push({ name: 'customerDetails', params: { ctmid: list.ctmid}});
            }
        }
    },
    filters: {
        timeFormat(date) {
            return moment(date).format('YYYY-MM-DD');
        }
    },
    directives: {
        clickoutside
    }
}
</script>
