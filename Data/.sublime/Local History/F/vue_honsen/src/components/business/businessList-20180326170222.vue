<style lang="stylus">
@import '../../common/stylus/mixin.styl'
.businesslistwrapv3
    .cursorwrap
         display: inline-flex
         cursor: pointer
         padding: 5px 0
    .bizlistwrapv3
        .bizlisthead
            height: 50px
            background: #65778b
            border-radius: 3px
            display: flex
            align-items: center
        .bizlistbodyitem
            height: 50px
            background: #fff
            border-radius: 3px
            margin-top: 16px
            box-shadow: 1px 0 8px rgba(24, 144, 255, 0.25)
            display: flex
            align-items: center
            &:hover
                box-shadow: 0 0 0 1px #188ffe
                .editlist
                    a
                        color: #1c92ff
        .headitem
            display: flex
            color: #fff
            justify-content: center
        .listitem
            display: flex
            color: #999
            justify-content: center
        .casename, .caselistname
            justify-content: flex-start
            padding-left: 45px
            flex: 1 1 auto
        .caselistname
            a
                display: inline-block
                color: #0050b3
                max-width: 247px
                &:hover
                    color: #333 !important
                    text-decoration: underline
        .cusname, .cuslistname
            width: 244px
            justify-content: flex-start
        .cuslistname
            a
                color: #333
        .creatname, .createlistname, .state, .statelist, .time, .timelist
            width: 120px
        .createlistname, .belonglistname
            a
                color: #999
        .belongname, .belonglistname, .etime, .etimelist
            width: 109px
        .edit, .editlist
            width: 76px
        .editlist
            a
                padding: 0 30px
                color: #474747
                display: inline-block
                .editicon
                    font-size: 26px;
                    vertical-align: middle
        .cuscusname, .cuscuslistname
            justify-content: flex-start
            padding-left: 45px
            flex: 1 1 auto
        .cuscuslistname
            a
                display: inline-block
                color: #0050b3
                max-width: 440px
        .cuscreatname, .cusetime, .cuscasename
            width: 210px
        .cusbelonglistname, .cusctimelist, .cusnumlist
            width: 210px
        .cusnumlist
            .casenumwrap
                padding: 0 32px
                width: 284px
                max-height: 222px
                overflow-y: auto
                & > div
                    .casenumtit
                        margin-top: 18px
                        a
                            font-size: 13px
                            color: #333
                    .casenumtime
                        font-size: 12px
                        padding-bottom: 11px
                        color: #999
                        border-bottom: 1px solid #dcdcdc
                        margin-bottom: 6px
                    &:last-child
                        .casenumtime
                            border-bottom: none
        .cusbelonglistname
            a
                color: #999
        .triangleiconwrap
            margin: 3px 0 0 6px
            display: flex
            align-items: center
            &.twoitems
                flex-direction: column
            .triangleicondown
                downArrow(6px, #fff)
                &.gray
                    border-top-color: #bbb
            .triangleicontop
                margin-bottom: 3px
                topArrow(6px, #fff)
                &.gray
                    border-bottom-color: #bbb
    .bizcuslistpage
        text-align: center
        margin-top: 40px
    .cusnamesearchwrap
        width: 290px
        .ivu-input-wrapper
            .ivu-input,.ivu-input-icon
                height: 40px
                line-height: 40px
            .ivu-input
                font-size: 12px
                border: none
                border-radius: 3px 3px 0 0
                border-bottom: 1px solid #e1e1e1
                background: #f0f6fe
                padding-right: 32px
                padding-left: 19px
                &:focus
                    border-color: #64cdff
            .ivu-input-icon
                font-size: 0
                color: transparent
                width: 47px
                cursor: pointer
                background: url('/static/icon/header_search_gray_icon.png') center no-repeat
    .cusnamesearchulwrap
        width: 290px
        max-height: 310px
        overflow-y: auto
        padding: 8px 0
        p
            padding: 5px 26px
            a
                color: #333
                &:hover
                    color: #0050b3 !important
                    text-decoration: underline
        $color = #69c0ff
        // chrome
        &::-webkit-scrollbar
            width: 6px
            height: 6px

        &::-webkit-scrollbar-track-piece
            background-color: #f0f6fe
            -webkit-border-radius: 12px

        &::-webkit-scrollbar-thumb:vertical
            height: 6px
            background-color: $color
            // -webkit-border-radius: 12px

        &::-webkit-scrollbar-thumb:horizontal
            width: 6px
            background-color: $color
            // -webkit-border-radius: 12px
    .bigbignavtoogle
        .ivu-dropdown-rel
            .ivu-btn
                background: #fff
        .ivu-select-dropdown
            margin: 0
            padding: 0
    .bizheadwrapv3
        margin-bottom: 14px
        display: flex
        justify-content: space-between
        align-items: center
        .bizheadright
            display: flex
            align-items: center
            & > div
                margin: 0 0 0 20px
            .bizheadrightitemicon
                cursor: pointer
                .hover
                    display: none
                &:hover
                    .default
                        display: none
                    .hover
                        display: inline-block
            .createcaseorcus
                .ivu-btn
                    font-size: 16px
                    padding: 5px 32px
    .havereddot
        position: relative
        &:before
            content: ''
            position: absolute
            width: 8px
            height: 8px
            top: 50%
            left: 29px
            margin-top: -4px
            border-radius: 50%
            background: #f00
.casecreateform
    padding: 37px 54px 0 0
    .ivu-form-item
        margin-bottom: 18px
    .ivu-select-selection, .ivu-input
        background-color: #f0f6fe
        border-color: transparent
        color: #333
    .ivu-form-item-error-tip
        background: linear-gradient(to right, rgba(255,255,255,0), #f0f6fe 8px) !important;
    .casecreateformtplvalipt
        input
            cursor: pointer
    .casecreateformtplval
        line-height: 25px
        color: #333
        position: absolute
        top: 4px
        bottom: 4px
        left: 4px
        right: 4px
        padding: 0 0 0 5px
        z-index: 4
        background: #f0f6fe
        cursor: pointer
        .ivu-icon
            font-size: 19px
            color: #a6a7a9
            vertical-align: text-bottom
            cursor: pointer
            &:hover
                color: #3dc1ff
.casecreateformtplvalselect
    .selecttypebtn
        display: flex
        height: 37px
        align-items: center
        justify-content: center
        a
            font-size: 14px
            color: #666
    .selecttplwrap
        max-height: 360px
        overflow-y: auto
        .tplitem
            width: 200px
            margin: 0 auto 12px
            color: #333
            border: 1px solid #ddd
            border-radius: 3px
            &.checked
                border-color: #1890ff
            .tplitemtop
                height: 36px
                display: flex
                padding: 0 13px 0 15px
                font-size: 13px
                align-items: center
                justify-content: space-between
                cursor: pointer
            .tplitembottom
                border-top: 1px solid #ddd
                padding: 10px 0
                p
                    height: 20px
                    line-height: 20px
                .first
                    padding-left: 17px
                .second
                    padding-left: 40px
                    font-size: 11px
                    color: #666
.selectctmbelongwrap
    .ivu-select-selection
        background: #fff !important
        border-color: #fff !important
        .ivu-icon-arrow-down-b
            display: none !important
.authsettingitem
    padding: 0 35px
    .itemtitle
        clor: #333
        font-size: 17px
        .ivu-icon
            color: #aaa
            font-size: 24px
</style>

<template>
    <div class="businesslistwrapv3">
        <div class="bizheadwrapv3">
            <div class="bizheadleft">
                <Dropdown @on-click="toggleBigBigNav" class="dropdown bigbignavtoogle">
                    <Button>{{bizBigNav.find((n) => n.key == curBigBigNav).name}} <Icon type="arrow-down-b"></Icon></Button>
                    <DropdownMenu slot="list">
                        <DropdownItem v-if="curBigBigNav != list.key" v-for="list in bizBigNav" :key="list.key" :name="list.key">{{list.name}}</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
            <div class="bizheadright">
                <div class="bizheadrightitemicon"><img class="default" src="/static/icon/bizlistv3_icon1.png"><img class="hover" src="/static/icon/bizlistv3_icon1_.png"></div>
                <div class="bizheadrightitemicon"><img class="default" src="/static/icon/bizlistv3_icon2.png"><img class="hover" src="/static/icon/bizlistv3_icon2_.png"></div>
                <div class="bizheadrightitemicon"><img class="default" src="/static/icon/bizlistv3_icon3.png"><img class="hover" src="/static/icon/bizlistv3_icon3_.png"></div>
                <div class="bizheadrightitemicon"><img class="default" src="/static/icon/bizlistv3_icon4.png"><img class="hover" src="/static/icon/bizlistv3_icon4_.png"></div>
                <div class="bizheadrightitemicon"><img class="default" src="/static/icon/bizlistv3_icon5.png"><img class="hover" src="/static/icon/bizlistv3_icon5_.png"></div>
                <div class="createcaseorcus"><Button v-if="curBigBigNav == 'biz'" @click.native="openCreatePanel(false)" type="info">新 建</Button><Button v-else @click.native="openCreateCusPanel()" type="info">新 建</Button></div>
            </div>
        </div>
        <div class="bizlistwrapv3">
            <!-- 案件列表 -->
            <div v-if="curBigBigNav == 'biz'" class="bizwrap">
                <div class="bizlisthead clearboth">
                    <div class="headitem casename">案件名称</div>
                    <div class="headitem cusname">
                        <Dropdown :visible="cusNameSearchShow" trigger="custom" class="dropdownnotoppadding" v-clickoutside="closeCusNameSearch">
                            <div @click="cusNameSearchShow = !cusNameSearchShow" class="cursorwrap">客户名称<div class="triangleiconwrap"><span class="triangleicondown"></span></div></div>
                            <DropdownMenu slot="list">
                                <div class="cusnamesearchwrap">
                                    <!--  v-model.trim="" @on-enter="" @on-click="" @on-change="" -->
                                    <Input v-model.trim="querycustomerword" icon="android-search" placeholder="搜索" ref="cusnamesearch"></Input>
                                </div>
                                <div class="cusnamesearchulwrap" v-scrollUnique>
                                    <p v-for="customer in searchBizSortData"><a @click="bizSortFn(customer.ctmid, 'customer'), closeCusNameSearch()" href="javascript:;">{{customer.name}}</a></p>
                                    <div v-if="!searchBizSortData.length" class="nodatalist">未找到客户</div>
                                </div>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div class="headitem creatname">
                        <Dropdown @on-click="bizSortFn($event, 'creator')" trigger="click" class="dropdown dropdownmaxh290">
                            <div class="cursorwrap">创建者<div class="triangleiconwrap"><span class="triangleicondown"></span></div></div>
                            <DropdownMenu slot="list">
                                <DropdownItem v-for="creator in bizsortdata.creator" :name="creator.id" :key="creator.id">{{creator.name}}</DropdownItem>
                                <p v-if="!bizsortdata.creator.length" class="nodatalist">没有创建者</p>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div class="headitem belongname">
                        <Dropdown @on-click="bizSortFn($event, 'owner')" trigger="click" class="dropdown dropdownmaxh290">
                            <div class="cursorwrap">归属者<div class="triangleiconwrap"><span class="triangleicondown"></span></div></div>
                            <DropdownMenu slot="list">
                                <DropdownItem v-for="owner in bizsortdata.owner" :name="owner.id" :key="owner.id">{{owner.name}}</DropdownItem>
                                <p v-if="!bizsortdata.owner.length" class="nodatalist">没有归属者</p>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div class="headitem state">
                        <Dropdown @on-click="bizSortFn($event, 'status')" trigger="click" class="dropdown">
                            <div class="cursorwrap">处理状态<div class="triangleiconwrap"><span class="triangleicondown"></span></div></div>
                            <DropdownMenu slot="list">
                                <DropdownItem v-for="status in bizsortdata.status" :name="status" :key="status">{{status == 2 ? '未处理' : status == 1 ? '已归档' : '处理中'}}</DropdownItem>
                                <p v-if="!bizsortdata.status.length" class="nodatalist">没有案件状态</p>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div class="headitem etime">
                        <div @click="bizSortFn(bizsortdata.etimesort ? 'update_up' : 'update_down', 'sortbytime'), bizsortdata.etimesort = !bizsortdata.etimesort, bizsortdata.addtimesort = true" class="cursorwrap">编辑时间<div class="triangleiconwrap twoitems"><span :class="{gray: bizsortdata.etimesort}" class="triangleicontop"></span><span :class="{gray: !bizsortdata.etimesort}" class="triangleicondown"></span></div></div>
                    </div>
                    <div class="headitem time">
                        <div @click="bizSortFn(bizsortdata.addtimesort ? 'create_up' : 'create_down', 'sortbytime'), bizsortdata.addtimesort = !bizsortdata.addtimesort, bizsortdata.etimesort = true" class="cursorwrap">创建时间<div class="triangleiconwrap twoitems"><span :class="{gray: bizsortdata.addtimesort}" class="triangleicontop"></span><span :class="{gray: !bizsortdata.addtimesort}" class="triangleicondown"></span></div></div>
                    </div>
                    <div class="headitem edit">操作</div>
                </div>
                <div class="bizlistbody">
                    <!-- <transition-group name="grouplist2" tag="div"> -->
                        <div v-for="(caseitem, index) in caselist.arr" :key="caseitem.caseid" class="bizlistbodyitem">
                            <div :class="{havereddot: !caseitem.unread}" class="listitem caselistname"><a @click="$goto({name: 'caseEdit', params: {caseid: caseitem.caseid}})" href="javascript:;" class="single_ellipsis">{{caseitem.casename}}</a></div>
                            <div class="listitem cuslistname"><a @click="$goto({name: 'customerDetails', params: {ctmid: caseitem.ctmid}})" href="javascript:;" class="single_ellipsis">{{caseitem.ctmname}}</a></div>
                            <div class="listitem createlistname"><a @click="$goto({name: 'personalCenter', params: {id: caseitem.creatorid}})" href="javascript:;" class="single_ellipsis">{{caseitem.creatorname}}</a><!-- <img src="/static/icon/cusgrayhead.png"> --></div>
                            <div class="listitem belonglistname"><a @click="$goto({name: 'personalCenter', params: {id: caseitem.ctmbelongerid}})" href="javascript:;" class="single_ellipsis">{{caseitem.ctmbelongername}}</a></div>
                            <div class="listitem statelist">{{caseitem.casestatus == 2 ? '未处理' : caseitem.casestatus == 1 ? '已结案' : '处理中'}}</div>
                            <div class="listitem etimelist">{{caseitem.updatetime | timeFormat}}</div>
                            <div class="listitem timelist">{{caseitem.createtime | timeFormat}}</div>
                            <div class="listitem editlist">
                                <Dropdown @on-click="bizmenuClick($event, caselist.arr, caseitem, index)" class="dropdown">
                                    <a href="javascript:;">
                                        <Icon class="editicon" type="android-more-vertical"></Icon>
                                    </a>
                                    <DropdownMenu slot="list">
                                        <DropdownItem name="editcase">编辑</DropdownItem>
                                        <DropdownItem name="delcase">删除</DropdownItem>
                                        <DropdownItem name="setcase">设置权限</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        </div>
                    <!-- </transition-group> -->
                </div>
            </div>
            <!-- 客户列表 -->
            <div v-else class="cuswrap">
                <div class="bizlisthead clearboth">
                    <div class="headitem cuscusname">客户名称</div>
                    <div class="headitem cuscreatname">
                        <Dropdown @on-click="cusSortFn($event, 'creator')" trigger="click" class="dropdown">
                            <div class="cursorwrap">创建者<div class="triangleiconwrap"><span class="triangleicondown"></span></div></div>
                            <DropdownMenu slot="list">
                                <DropdownItem v-for="creator in bizsortdata.cuscreator" :name="creator.id" :key="creator.id">{{creator.name}}</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div class="headitem cusetime">
                        <div @click="cusSortFn(bizsortdata.cusaddtimesort ? 'create_up' : 'create_down', 'sortbytime'), bizsortdata.cusaddtimesort = !bizsortdata.cusaddtimesort, bizsortdata.casenum = true" class="cursorwrap">创建时间<div class="triangleiconwrap twoitems"><span :class="{gray: bizsortdata.cusaddtimesort}" class="triangleicontop"></span><span :class="{gray: !bizsortdata.cusaddtimesort}" class="triangleicondown"></span></div></div>
                    </div>
                    <div class="headitem cuscasename">
                        <div @click="cusSortFn(bizsortdata.casenum ? 'up' : 'down', 'casenum'), bizsortdata.casenum = !bizsortdata.casenum, bizsortdata.cusaddtimesort = true" class="cursorwrap">案件数量<div class="triangleiconwrap twoitems"><span :class="{gray: bizsortdata.casenum}" class="triangleicontop"></span><span :class="{gray: !bizsortdata.casenum}" class="triangleicondown"></span></div></div>
                    </div>
                    <div class="headitem edit">操作</div>
                </div>
                <div class="bizlistbody">
                    <!-- <transition-group name="grouplist2" tag="div"> -->
                        <div v-for="cuslist in customerlist.arr" :key="cuslist.ctmid" class="bizlistbodyitem">
                            <div class="listitem cuscuslistname"><a @click="$goto({name: 'customerDetails', params: {ctmid: cuslist.ctmid}})" href="javascript:;" class="single_ellipsis">{{cuslist.name}}</a></div>
                            <div class="listitem cusbelonglistname"><a @click="$goto({name: 'personalCenter', params: {id: cuslist.creator}})" href="javascript:;" class="single_ellipsis">{{cuslist.creatorname}}</a></div>
                            <div class="listitem cusctimelist">{{cuslist.created_at | timeFormat}}</div>
                            <div class="listitem cusnumlist">
                                <Dropdown class="dropdown">
                                    <a @mouseenter="getcasehistory(cuslist)" href="javascript:;" style="color: #999; padding: 7px;">
                                        {{cuslist.casenum}}
                                    </a>
                                    <DropdownMenu slot="list">
                                        <div class="casenumwrap" v-scrollUnique>
                                            <div v-for="his in cuslist.historylist">
                                                <p class="casenumtit"><a @click="$goto({name: 'caseEdit', params: {caseid: his.caseid}})" href="javascript:;">{{his.casename}}</a></p>
                                                <p class="casenumtime">{{his.created_at}}</p>
                                            </div>
                                            <div v-if="!cuslist.historylist.length" class="nodatalist">
                                                暂无案件
                                            </div>
                                        </div>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                            <div class="listitem editlist">
                                <Dropdown @on-click="" class="dropdown">
                                    <a href="javascript:;">
                                        <Icon class="editicon" type="android-more-vertical"></Icon>
                                    </a>
                                    <DropdownMenu slot="list">
                                        <DropdownItem name="addcase">编辑</DropdownItem>
                                        <DropdownItem name="editctm">删除</DropdownItem>
                                        <DropdownItem name="editctm">创建案件</DropdownItem>
                                        <DropdownItem name="delctm">设置权限</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        </div>
                    <!-- </transition-group> -->
                </div>
            </div>

            <!-- 滚动加载 -->
            <div class="bizcuslistpage">
                <infinite-loading @infinite="onInfiniteLoading" ref="infiniteLoading">
                    <span slot="no-more">没有更多了！</span>
                    <span slot="no-results">没有更多了！</span>
                </infinite-loading>
            </div>
        </div>

        <!-- 新建案件 -->
        <Modal
            v-model="caseModal"
            :closable="false"
            :mask-closable="false"
            @on-visible-change="closeCreatePanel($event, 'casecreateform')"
            width="545"
            class-name="groupmodal modalwrapv2">
            <div class="modal_tit">新建案件
                <div class="icon-can-dacha" @click.stop="caseModal = false">
                    <Icon type="android-close"></Icon>
                </div>
            </div>
            <Form :model="casecreateform" :rules="ruleValidate" ref="casecreateform" :label-width="130" class="casecreateform">
                <FormItem prop="selectid" label="客户归属：" class="formitemnoreddot">
                    <Select v-model="casecreateform.selectid" @on-change="getCtmList" disabled class="selectselectwrap selectctmbelongwrap" placeholder="请选择客户归属">
                        <Option v-for="list in teamOwnerList" :value="list.id" :key="list.id">{{list.name}}</Option>
                    </Select>
                </FormItem>
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
                <FormItem prop="casename" label="案件名称：">
                    <Input :maxlength="30" v-model.trim="casecreateform.casename" placeholder="请输入案件名称"></Input>
                </FormItem>
                <FormItem label="案件模板：">
                    <Input @click.native="openCreateCaseTpl" readonly class="casecreateformtplvalipt">
                    </Input>
                    <div @click="openCreateCaseTpl" class="casecreateformtplval">
                        <div v-if="casecreateform.template">
                            {{casecreateform.template}} <Icon v-if="casecreateform.template" type="android-close"></Icon>
                        </div>
                        <div v-else>
                            <span :style="{color: caseTplModal ? '#1890ff' : '#bbbec4'}">请选择模板 +</span>
                        </div>
                    </div>
                </FormItem>
            </Form>
            <div v-if="caseTplModal" class="commonselectsomethingwrapv2 casecreateformtplvalselect floatpanel">
                <div class="toptit">选择模板</div>
                <div class="topnav">
                    <a @click="caseModalTplNav = 'gr'" :class="{nohover : caseModalTplNav == 'gg'}" href="javascript:;">个人模板</a>
                    <a @click="caseModalTplNav = 'gg'" :class="{nohover : caseModalTplNav == 'gr'}" href="javascript:;">公共模板</a>
                </div>
                <div v-if="caseModalTplNav == 'gr'" class="personaltpl">
                    <div class="selecttypebtn">
                        <Dropdown class="dropdown dropdownmaxh290">
                            <a href="javascript:;">
                                选择类型
                                <Icon type="arrow-down-b"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem v-for="n in 15" :key="n">类型</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div class="selecttplwrap">
                        <div v-for="n in 20" :class="{checked: casecreateform.template == n}" class="tplitem">
                            <div class="tplitemtop">
                                <span>进口量将</span>
                                <span @click="casecreateform.template = n" :class="{checked: casecreateform.template == n}" class="radiocommon">
                                    <span class="radiocommoninner"></span>
                                </span>
                            </div>
                            <div v-if="1" class="tplitembottom">
                                <p class="first">立案</p>
                                <p class="second">立案内容</p>
                                <p class="second">立案内容</p>
                                <p class="first">立案</p>
                                <p class="second">立案内容</p>
                                <p class="first">立案</p>
                                <p class="second">立案内容</p>
                                <p class="second">立案内容</p>
                                <p class="second">立案内容</p>
                                <p class="second">立案内容</p>
                                <p class="first">立案</p>
                                <p class="second">立案内容</p>
                                <p class="first">立案</p>
                                <p class="second">立案内容</p>
                                <p class="second">立案内容</p>
                                <p class="second">立案内容</p>
                                <p class="second">立案内容</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="caseModalTplNav == 'gg'" class="commontpl">
                    <div class="selecttypebtn">
                        <Dropdown class="dropdown dropdownmaxh290">
                            <a href="javascript:;">
                                选择类型
                                <Icon type="arrow-down-b"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem v-for="n in 15" :key="n">类型</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div class="selecttplwrap">
                        <div v-for="n in 20" :class="{checked: casecreateform.template == n}" class="tplitem">
                            <div class="tplitemtop">
                                <span>进口量将</span>
                                <span @click="casecreateform.template = n" :class="{checked: casecreateform.template == n}" class="radiocommon">
                                    <span class="radiocommoninner"></span>
                                </span>
                            </div>
                            <div v-if="0" class="tplitembottom">
                                <p class="first">立案</p>
                                <p class="second">立案内容</p>
                                <p class="second">立案内容</p>
                                <p class="first">立案</p>
                                <p class="second">立案内容</p>
                                <p class="first">立案</p>
                                <p class="second">立案内容</p>
                                <p class="second">立案内容</p>
                                <p class="second">立案内容</p>
                                <p class="second">立案内容</p>
                                <p class="first">立案</p>
                                <p class="second">立案内容</p>
                                <p class="first">立案</p>
                                <p class="second">立案内容</p>
                                <p class="second">立案内容</p>
                                <p class="second">立案内容</p>
                                <p class="second">立案内容</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="0" class="nodatalistcry">
                    <img src="/static/icon/nodata_cry_icon.png">
                    <p>您还未保存任何个人模板！</p>
                </div>
            </div>
            <div slot="footer">
                <Button @click="caseCreateBtn" type="info">确 定</Button>
            </div>
        </Modal>

        <!-- 新建客户 -->
        <Modal
            v-model="customerModal"
            :closable="false"
            :mask-closable="false"
            @on-visible-change="closeCreatePanel($event, 'cuscreateform')"
            width="545"
            class-name="groupmodal modalwrapv2">
            <div class="modal_tit">新建客户
                <div class="icon-can-dacha" @click.stop="customerModal = false">
                    <Icon type="android-close"></Icon>
                </div>
            </div>
            <Form :model="cuscreateform" :rules="ruleValidate" ref="cuscreateform" :label-width="130" class="casecreateform cuscreateform">
                <FormItem prop="selectid" label="客户归属：" class="formitemnoreddot">
                    <Select v-model="cuscreateform.selectid" disabled class="selectselectwrap selectctmbelongwrap" placeholder="请选择客户归属">
                        <Option v-for="list in teamOwnerList" :value="list.id" :key="list.id">{{list.name}}</Option>
                    </Select>
                </FormItem>
                <FormItem prop="ctmname" label="客户名称：">
                    <Input :maxlength="30" v-model.trim="cuscreateform.ctmname" placeholder="请输入客户名称"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="AddNewCTM" type="info">确 定</Button>
            </div>
        </Modal>

        <!-- 设置权限面板 -->
        <Modal
            v-model="authSettingModal"
            :closable="false"
            :mask-closable="false"
            width="580"
            class-name="groupmodal modalwrapv2 authsettingmodal">
            <div class="modal_tit" style="border-bottom: none;">
                <div class="icon-can-dacha" @click.stop="customerModal = false">
                    <Icon type="android-close"></Icon>
                </div>
            </div>
            <div class="authsettingitem authsettingedit">
                <div class="itemtitle">编辑权限 <Icon type="android-add-circle"></Icon></div>
            </div>
            <div class="authsettingitem authsettingread"></div>
            <div slot="footer">

            </div>
        </Modal>

        <!-- 支付 -->
        <pay v-if="show_pay_modal" @close="close"></pay>
    </div>
</template>

<script>
import moment from 'moment';
import myechart from 'echarts';
// import addMember from '@/components/common/addMember';
// import z_sendBiz from '@/components/common/z-sendBiz';
import pay from '@/components/personalSetter/pay';
import clickoutside from '@/common/directives/clickOutSide';
// import editCustomer from '@/components/business/editCustomer';
// import z_searchBox from '@/components/common/z-searchBox';
import InfiniteLoading from 'vue-infinite-loading';

export default {
    name: 'businessList',
    // components: { addMember, z_sendBiz, pay, editCustomer, z_searchBox},
    components: { pay, InfiniteLoading},
    directives: { clickoutside},
    data () {
        return {
            // imgUrl,
            curBigBigNav: 'biz',
            bizBigNav: [
                { name: '案件列表', key: 'biz', url: ''},
                { name: '客户列表', key: 'cus', url: ''}
            ],
            cusNameSearchShow: false,
            addparams: {},
            bizsortdata: {
                etimesort: true, // 编辑时间是否倒序
                addtimesort: true, // 创建时间是否倒序
                customer: [],
                creator: [],
                owner: [],
                status: [],
                cusaddtimesort: true, // 客户列表创建时间是否倒序
                cuscreator: [],
                casenum: true,
            },
            // teamListPanel: false,
            // teamlist: {
            //     arr: [],
            //     loading: false,
            //     isfirst: true
            // },
            // addMemberModal: false,
            caselist: {
                arr: [],
                loading: false,
                page: 1,
                perpage: 15,
                total: 0,
                objname: 'caselist'
            },
            customerlist: {
                arr: [],
                loading: false,
                page: 1,
                perpage: 15,
                total: 0,
                objname: 'customerlist'
            },
            caseModal: false,
            caseTplModal: false,
            // caseModalNav: 'zs',
            caseModalTplNav: 'gr',  // gr gg
            casecreateform: {
                casename: '',
                selectcmtid: '',
                selectid: '',
                template: ''
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
                ],
                ctmname: [
                    { required: true, type: 'string', message: '请输入客户名称', trigger: 'blur' }
                ]
            },
            customerModal: false,
            cuscreateform: {
                selectid: '',
                ctmname: ''
            },
            ctmlist: [],
            // qzctmlist: [],
            teamOwnerList: [],
            // isEditAddNewCtm: false,
            // qzisEditAddNewCtm: false,
            // addNewCtmVal: '',
            // qzaddNewCtmVal: '',
            // newAddCtmIds: [],
            // qznewAddCtmIds: [],
            // personalCasePanel: false,
            // personalCaseList: [],
            // personalLoading: false,
            // personalcaseModel: false,
            // personalcaseModelID: '',
            // showSettingAuth: false,
            // SettingAuthTitle: '',
            // SettingAuthUser: [],
            // SettingAuthType: '',
            // SettingAuthCtmid: '',
            // SettingAuthCaseid: '',
            show_pay_modal: false,
            expireSaveList: '',
            // 编辑案件modal
            // case_edit_modal: false,
            // case_info_form: {
            //     caseid: '',
            //     name: '',
            //     status: '',
            //     isowner: '',
            //     isteam: ''
            // },
            // caseedit_form_ruleValidate: {
            //     name: [
            //         { required: true, message: '案件名不能为空', trigger: 'blur' }
            //     ],
            //     status: [
            //         { required: true, type: 'number', message: '处理状态不能为空', trigger: 'change' }
            //     ]
            // },
            // userInfoEditId: '',
            // userInfoEditModal: false,
            // startsearchstate: false,
            querycustomerword: '',
            authSettingModal: false
        }
    },
    computed: {
        // haveNewPersonalCase() {
        //     return this.personalCaseList.find((val => !val.unread));
        // }
        searchBizSortData() {
            return this.bizsortdata.customer.filter(e => e.name.includes(this.querycustomerword));
        }
    },
    // activated() {
    //     console.log(1)
    //     // this.getCaseList();
    //     // this.getPersonCaseList();
    // },
    beforeMount() {
        this.getCaseSortData();
        this.getCusSortData();
    },
    mounted() {
        // if (this.$route.query.personalcaseid) {
        //     this.openPersonalCaseModel(this.$route.query.personalcaseid);
        // }
        console.log(myechart)
    },
    methods: {
        getCaseSortData() {
            this.$ajax('get', this.$apiConfig.bizGroup.getCaseSortData, (data) => {
                data.data.status = data.data.status.map(e => e.status).sort();
                this.bizsortdata = Object.assign(this.bizsortdata, data.data);
            });
        },
        getCusSortData() {
            this.$ajax('get', this.$apiConfig.bizGroup.getCusSortData, (data) => {
                this.bizsortdata = Object.assign(this.bizsortdata, {cuscreator: data.data.creator, cuscustomer: data.data.customer});
            });
        },
        toggleBigBigNav(key, noclear) {
            this.curBigBigNav = key;
            let commomparams = {
                arr: [],
                loading: false,
                page: 1,
                perpage: 15,
                total: 0
            };
            // 清除排序 参数
            if( !noclear ){
                this.bizsortdata.etimesort = true;
                this.bizsortdata.addtimesort = true;
                this.addparams = {};
            }
            if( key == 'biz' ){
                commomparams.objname = 'caselist';
                this.caselist = commomparams;
            }
            if( key == 'cus' ){
                commomparams.objname = 'customerlist';
                this.customerlist = commomparams;
            }
            this.$nextTick(() => {
                this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
            });
        },
        closeCusNameSearch() {
            this.cusNameSearchShow = false;
        },
        // toggleBizList(name) {
        //     this.cursmallnav = name;
        //     this.resetGetCasePage('biz');
        // },
        // getTeamList() {
        //     if( !this.teamlist.isfirst ) {
        //         return false;
        //     }

        //     this.teamlist.isfirst = false;

        //     this.$ajax('get', '/biz/team/list', 'teamlist.loading', (data) => {
        //         this.teamlist.arr = data.data;
        //     })
        // },
        // openTeamListPanel() {
        //     this.teamListPanel = !this.teamListPanel;
        //     if( this.teamListPanel ){
        //         // 打开团队成员面板关闭接受业务
        //         this.personalCasePanel = false;
        //         this.getTeamList();
        //     }
        // },
        // openAddMemberPanel() {
        //     this.getTeamList();
        //     this.addMemberModal = true;
        // },
        // getAddMemberUsers(users, ids, isNoChange) {
        //     if (isNoChange) {
        //         this.addMemberModal = false;
        //         return;
        //     }

        //     this.$ajax('post', '/biz/team/add', {aids: ids}, (data) => {
        //         let newArr = [];
        //         let flag = true;

        //         users.forEach((e, i) => {
        //             let isExist = false;
        //             let msg;

        //             data.data.forEach(f => {
        //                 if( e.id == f.id ){
        //                     isExist = true;
        //                     msg = f.errmsg;
        //                 }
        //             });

        //             if( !isExist ){
        //                 newArr.push(e);
        //             }else{
        //                 flag = false;
        //                 this.$Message.error( e.name + ' ' + msg );
        //             }
        //         });
        //         this.teamlist.arr = newArr;

        //         if( flag ){
        //             this.$Message.success('修改团队成员成功!');
        //         }

        //         this.addMemberModal = false;
        //     });
        // },
        // toDelTeam(list, i) {
        //     this.$Modal.confirm({
        //         title: '确认对话框',
        //         content: '确认把 ' + list.name + ' 移出团队吗？',
        //         onOk: () => {
        //             this.delTeam(list, i);
        //         }
        //     });
        // },
        // delTeam(list, i) {
        //     this.$ajax('post', `/biz/team/del/${list.id}`, (data) => {
        //         this.teamlist.arr.splice(i, 1);
        //         this.$Message.success('删除成功！');
        //     });
        // },
        getCaseList($state, list, url, resparams) {
            let params = {page: list.arr.length / list.perpage + 1, perpage: list.perpage};
            params = Object.assign(params, this.addparams);
            this.$ajax('get', url, params, list.objname + '.loading', (data) => {
                let dataarr = data.data.data;
                list.total = data.data.total;
                list.arr = list.arr.concat(dataarr.map(val => { return Object.assign(val, resparams);}));
                if( dataarr.length < list.perpage ){
                    $state.complete();
                }else{
                    $state.loaded();
                }
            });
        },
        // resetGetCasePage(type) {
        //     // 请求前重置
        //     this.curbignav = type;
        //     this.caselist.arr = [];
        //     this.caselist.page = 1;
        //     this.caselist.total = 0;
        //     this.getCaseList();
        //     // 请求列表关闭接受业务
        //     this.personalCasePanel = false;
        //     // 关闭团队成员面板
        //     this.teamListPanel = false;
        // },
        // changCasePage(page) {
        //     // 关闭接受业务
        //     this.personalCasePanel = false;
        //     // 关闭团队成员面板
        //     this.teamListPanel = false;
        //     this.getCaseList();
        // },
        getHistoryCaseList(list) {
            let params = { detail: 1};
            this.$ajax('get', `/biz/customer/caselist/${list.ctmid}`, params, (data) => {
                let cases = data.data.data;
                list.historylist = cases;
            }, (err) => {

            });
        },
        bizmenuClick(name, listarr, list, index) {
            switch( name ) {
                case 'delcase':
                    this.$Modal.confirm({
                        title: '确认对话框',
                        content: '确认删除此案件？',
                        onOk: () => {
                            this.delCase(index, listarr, list.ctmid, list.caseid);
                        }
                    });
                    break;
                case 'editcase':
                    this.$goto({name: 'caseEdit', params: {caseid: list.caseid}});
                    break;
                case 'setcase':
                    this.authSettingModal = true;
                    break;
            }
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
        delCase(idx, casearr, ctmid, caseid){
            this.$ajax('post', `/biz/case/${ctmid}/del/${caseid}`, (data) => {
                this.toggleBigBigNav('biz', true);
                this.$Message.success('成功删除案件！');
            });
        },
        getCtmList(ctmid) {
            console.log(ctmid)
            if( !ctmid ){
                return false;
            }

            this.$ajax('get', this.$apiConfig.bizGroup.getCtmList.replace(/\{ctmid\}/, ctmid), { search: '', detail: 0, potential: 0}, (data) => {
                this.ctmlist = data.data.map(val => {
                    val.ctmid = val.ctmid.toString();
                    val.child = [];
                    // 循环获取子级
                    this.getCtmChildList(val);
                    return val;
                });
            });
        },
        // qzgetCtmList(ctmid) {
        //     if( !ctmid ){
        //         return false;
        //     }

        //     this.$ajax('get', `/biz/customer/${ctmid}/list`, { search: '', detail: 0, potential: 1}, (data) => {
        //         this.qzctmlist = data.data.map(val => {
        //             val.ctmid = val.ctmid.toString();
        //             val.child = [];
        //             // 循环获取子级
        //             this.getCtmChildList(val);
        //             return val;
        //         });
        //     });
        // },
        getCtmChildList(customer) {
            this.$ajax('get', this.$apiConfig.bizGroup.getCtmChildList.replace(/\{ctmid\}/, customer.ctmid), { detail: 0}, (data) => {
                customer.child = data.data.map(val => {
                    val.ctmaid = customer.ctmid + '-' + val.ctmaid;
                    return val;
                })
            });
        },
        getTeamOwner(ispersonal) {
            this.$ajax('get', this.$apiConfig.bizGroup.getTeamOwner, (data) => {
                let myid = this.$store.state.mineInfo.id;
                if( !data.data.length ){
                    // 没加入团队
                    data.data.push({ id: myid, name: this.$store.state.mineInfo.name});
                }else{
                    // 加入了团队
                }
                this.teamOwnerList = [data.data[0]];
                if( !ispersonal ){
                    if( this.curBigBigNav == 'biz' ){
                        this.casecreateform.selectid = this.teamOwnerList[0].id;
                    }
                    if( this.curBigBigNav == 'cus' ){
                        this.cuscreateform.selectid = this.teamOwnerList[0].id;
                    }
                }
            });
        },
        // toAddNewCTM() {
        //     if( this.casecreateform.selectid ){
        //         this.isEditAddNewCtm = !this.isEditAddNewCtm;
        //         if( this.isEditAddNewCtm ){
        //             this.$nextTick(() => {
        //                 this.$refs.addnewctmipt.focus();
        //             });
        //         }
        //     }else{
        //         this.$Message.error( '请先选择客户归属！' );
        //     }
        // },
        AddNewCTM() {
            this.$refs.cuscreateform.validate((valid) => {
                if(valid) {
                    let name = this.cuscreateform.ctmname;
                    this.$ajax('post', this.$apiConfig.bizGroup.addCustomer.replace(/\{userid\}/, this.cuscreateform.selectid), { name: name, potential: 0}, (data) => {
                        // 重置
                        this.toggleBigBigNav('cus');
                        this.$Message.success( '成功添加客户！' );
                    });
                    this.customerModal = false;
                }
            });
        },
        // AddNewCTMCancel() {
        //     this.addNewCtmVal = '';
        //     this.isEditAddNewCtm = false;
        // },
        // qztoAddNewCTM() {
        //     if( this.qzcasecreateform.selectid ){
        //         this.qzisEditAddNewCtm = !this.qzisEditAddNewCtm;
        //         if( this.qzisEditAddNewCtm ){
        //             this.$nextTick(() => {
        //                 this.$refs.qzaddnewctmipt.focus();
        //             });
        //         }
        //     }else{
        //         this.$Message.error( '请先选择客户归属！' );
        //     }
        // },
        // qzAddNewCTM() {
        //     if( this.qzaddNewCtmVal == '' ){
        //         this.$Message.error( '潜在客户名称不能为空！' );
        //         this.$nextTick(() => {
        //             this.$refs.qzaddnewctmipt.focus();
        //         });
        //         return false;
        //     }

        //     this.$ajax('post', `/biz/customer/${this.qzcasecreateform.selectid}/store`, { name: this.qzaddNewCtmVal, potential: 1}, (data) => {
        //         let strCtmid = data.ctmid + '';

        //         this.qzctmlist.push({ ctmid: strCtmid, name: this.qzaddNewCtmVal, child: []});
        //         // 记录新增的潜在客户id
        //         this.qznewAddCtmIds.push(data.ctmid);
        //         // 重置状态
        //         this.qzaddNewCtmVal = '';

        //         this.$nextTick(() => {
        //             this.qzcasecreateform.selectcmtid = strCtmid;
        //         });

        //         this.$Message.success( '成功添加潜在客户！' );
        //     });
        //     this.qzisEditAddNewCtm = false;
        // },
        // qzAddNewCTMCancel() {
        //     this.qzaddNewCtmVal = '';
        //     this.qzisEditAddNewCtm = false;
        // },
        caseCreateBtn() {
            this.$refs.casecreateform.validate((valid) => {
                if(valid) {
                    let idarr = this.casecreateform.selectcmtid.split('-');
                    let params = { name: this.casecreateform.casename, status: false};
                    if( idarr[1] ){
                        params.ctmaid = idarr[1];
                    }
                    this.$ajax('post', this.$apiConfig.bizGroup.addCaseInfo.replace(/\{ctmid\}/, idarr[0]), params, (data) => {
                        // this.casecreateform.casename = '';
                        this.$goto({ name: 'caseEdit', params: { caseid: data.caseid}});
                    });
                    this.caseModal = false;
                }
            })
        },
        // qzcaseCreateBtn(isCreate) {
        //     if( isCreate ){
        //         this.$refs.qzcasecreateform.validate((valid) => {
        //             if(valid) {
        //                 if( this.qzcasecreateform.casename == '' ){
        //                     this.resetGetCasePage('qzkh');
        //                     this.$refs.casecreateform.resetFields();
        //                     this.casecreateform.casename = '';
        //                     this.$refs.qzcasecreateform.resetFields();
        //                     this.qzcasecreateform.casename = '';
        //                 }else{
        //                     let idarr = this.qzcasecreateform.selectcmtid.split('-');
        //                     let params = { name: this.qzcasecreateform.casename, status: false};
        //                     if( idarr[1] ){
        //                         params.ctmaid = idarr[1];
        //                     }

        //                     this.$ajax('post', `/biz/case/${idarr[0]}/store`, params, (data) => {
        //                         this.resetGetCasePage('qzkh');
        //                         this.$refs.casecreateform.resetFields();
        //                         this.casecreateform.casename = '';
        //                         this.$refs.qzcasecreateform.resetFields();
        //                         this.qzcasecreateform.casename = '';
        //                     });
        //                 }

        //                 this.caseModal = false;

        //                 // 只要点了确定 创建多少客户都保存 并且清空保存的新增潜在客户ids
        //                 this.qznewAddCtmIds = [];
        //             }
        //         })
        //     }else{
        //         this.$refs.qzcasecreateform.resetFields();
        //         this.qzcasecreateform.casename = '';
        //         this.caseModal = false;
        //         // 删除新增潜在客户 并且清空
        //         if( this.qznewAddCtmIds.length ){
        //             this.delCTM(this.qznewAddCtmIds);
        //             this.qznewAddCtmIds = [];
        //         }
        //     }
        // },
        // delCTM(ids, fn) {
        //     this.$ajax('post', `/biz/customer/del/${ids.join(',')}`, (data) => {
        //         if( fn ){
        //             fn();
        //         }
        //     });
        // },
        // toggleCTMList(name, list, index) {
        //     // 关闭接受业务
        //     this.personalCasePanel = false;
        //     // 关闭团队成员面板
        //     this.teamListPanel = false;
        //     switch( name ) {
        //         case 'addcase':
        //             // 判断是否有权为该客户创建案件
        //             if( list.checkCustomer == 1 ){
        //                 this.$Modal.warning({
        //                     title: '不能创建案件的提示',
        //                     content: '无权为该客户创建案件！'
        //                 });
        //             }else{
        //                 this.casecreateform.selectid = list.ctmbelongerid;
        //                 if( this.curbignav == 'biz' ){
        //                     this.casecreateform.selectcmtid = list.ctmid + '';
        //                 }

        //                 this.openCreatePanel(list);
        //             }
        //             break;
        //         case 'editctm':
        //             if( list.checkCustomer == 1 ){
        //                 this.$Message.error('无权编辑客户！');
        //             }else{
        //                 this.userInfoEditId = list.ctmid;
        //                 this.userInfoEditModal = true;
        //             }
        //             break;
        //         case 'changezx':
        //             if( list.checkCustomer == 1 ){
        //                 this.$Message.error('无权操作！');
        //             }else{
        //                 if( list.casenum ){
        //                     this.$Modal.confirm({
        //                         title: '确认对话框',
        //                         content: '确定将 '+ list.ctmname +' 转为正式客户吗？',
        //                         onOk: () => {
        //                             this.$ajax('get', `/biz/customer/potentialtoofficial`, { ctmid: list.ctmid}, (data) => {
        //                                 this.$Message.success('成功转为正式客户！');
        //                                 this.caselist.arr.splice(index, 1);
        //                             });
        //                         },
        //                         onCancel: () => {
        //                             //this.$Message.info('点击了取消');
        //                         }
        //                     });
        //                 }else{
        //                     this.$Message.error('请先为此客户创建案件！');
        //                 }
        //             }
        //             break;
        //         case 'delctm':
        //             if( list.checkCustomer == 1 ){
        //                 this.$Message.error('无权删除客户！');
        //             }else{
        //                 this.$Modal.confirm({
        //                     title: '确认对话框',
        //                     content: '确认删除此客户吗？（此客户下的所有案件也会被删除）',
        //                     onOk: () => {
        //                         this.delCTM([list.ctmid], () => {
        //                             this.resetGetCasePage(this.curbignav);
        //                             this.$Message.success('删除客户成功！');
        //                         });
        //                     },
        //                     onCancel: () => {
        //                         //this.$Message.info('点击了取消');
        //                     }
        //                 });
        //             }
        //             break;
        //     }
        // },
        openCreatePanel(list) {
            // 打开案件面板关闭接受业务
            // this.personalCasePanel = false;
            // 关闭团队成员面板
            // this.teamListPanel = false;
            this.$isExpire(() => {
                // 账号没过期
                this.getTeamOwner(!!list);
                // if( this.curbignav == 'biz' ){
                //     this.caseModalNav = 'zs';
                // }else if( this.curbignav == 'qzkh' ){
                //     this.caseModalNav = 'qz';
                // }
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
        openCreateCusPanel() {
            this.$isExpire(() => {
                // 账号没过期
                this.getTeamOwner();
                this.customerModal = true;
            }, () => {
                this.show_pay_modal = true;
            });
        },
        closeCreatePanel(state, ref) {
            if( !state ){
                this.$refs[ref].resetFields();
                this.caseTplModal = false;
                // this.casecreateform.casename = '';
            }
        },
        close(oOrder) {
            this.show_pay_modal = false;
            if (oOrder) {
                this.$nextTick(() => {
                    this.openCreatePanel(this.expireSaveList);
                });
            }
        },
        // getPersonCaseList() {
        //     this.$ajax('get', '/biz/case/personalcaselist', 'personalLoading', (data) => {
        //         this.personalCaseList = data.data;
        //     });
        // },
        // openPersonalCasePanel() {
        //     this.personalCasePanel = !this.personalCasePanel;
        //     if( this.personalCasePanel ){
        //         // 关闭团队成员面板
        //         this.teamListPanel = false;
        //         this.getPersonCaseList();
        //     }
        // },
        // editCase(list, ctmid) {
        //     this.case_info_form.ctmid = ctmid;
        //     this.case_info_form.caseid = list.caseid;
        //     this.case_info_form.name = list.casename;
        //     this.case_info_form.status = list.casestatus == 2 ? 0 : list.casestatus;
        //     this.case_info_form.isowner = list.role == 'owner';
        //     this.case_info_form.isteam = list.role == 'team';
        //     this.case_edit_modal = true;
        // },
        // submit_case_info() {
        //     this.$refs.case_edit_form.validate((valid) => {
        //         if( valid ) {
        //             let params = {
        //                 name: this.case_info_form.name,
        //                 status: this.case_info_form.status
        //             };
        //             this.$ajax('post', `/biz/case/${this.case_info_form.ctmid}/store/${this.case_info_form.caseid}`, params, (data) => {
        //                 // 由于改过的案件会在最前面 所以重置页数
        //                 this.caselist.page = 1;
        //                 this.getCaseList();
        //             });
        //             this.case_edit_modal = false;
        //         }
        //     });
        // },
        // getUserInfoEdit(info) {
        //     this.caselist.arr.forEach(e => {
        //         if( e.ctmid == this.userInfoEditId ){
        //             e.ctmname = info.name;
        //         }
        //     })
        // },
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
        // openPersonalCaseModel(caseid) {
        //     this.personalcaseModelID = caseid;
        //     this.personalcaseModel = true;
        // },
        // gotoCTMDetails(list) {
        //     if( list.checkCustomer == 1 ){
        //         this.$Message.error('无权查看客户！');
        //     }else{
        //         this.$router.push({ name: 'customerDetails', params: { ctmid: list.ctmid}});
        //     }
        // },
        openCreateCaseTpl() {
            this.caseTplModal = !this.caseTplModal;
        },
        onInfiniteLoading($state) {
            if( this.curBigBigNav == 'biz' ){
                this.getCaseList($state, this.caselist, this.$apiConfig.bizGroup.getBizList, {});
            }
            if( this.curBigBigNav == 'cus' ){
                this.getCaseList($state, this.customerlist, this.$apiConfig.bizGroup.getCusList, {historylist: [], isgethistory: false});
            }
        },
        bizSortFn(val, type) {
            this.addparams = {};
            this.addparams[type] = val;
            this.toggleBigBigNav('biz', true);
        },
        cusSortFn(val, type) {
            this.addparams = {};
            this.addparams[type] = val;
            this.toggleBigBigNav('cus', true);
        },
        getcasehistory(list) {
            if( list.casenum ){
                if( !list.isgethistory ){
                    this.getHistoryCaseList(list);
                    list.isgethistory = true;
                }
            }
        }
    },
    filters: {
        timeFormat(date) {
            return moment(date).format('YY-MM-DD');
        }
    }
}
</script>
