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
        .cusname, .cuslistname
            width: 244px
            justify-content: flex-start
        .creatname, .creatlistname, .state, .statelist, .time, .timelist
            width: 120px
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
        .cuscreatname, .cusetime, .cuscasename
            width: 210px
        .cusbelonglistname, .cusetimelist, .custimelist
            width: 210px
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
                height: 31px
                line-height: 31px
            .ivu-input
                font-size: 12px
                border-radius: 3px 3px 0 0
                border-color: #d2d2d2
                background: #fff
                padding-right: 32px
                padding-left: 19px
                &:hover,&:focus
                    border-color: #64cdff
            .ivu-input-icon
                font-size: 0
                color: transparent
                width: 47px
                cursor: pointer
                background: url('/static/icon/header_search_gray_icon.png') center no-repeat
    .cusnamesearchulwrap
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
</style>

<template>
    <div class="businesslistwrapv3">
        <div class="bizlistwrapv3">
            <div v-if="1" class="bizwrap">
                <div class="bizlisthead clearboth">
                    <div class="headitem casename">案件名称</div>
                    <div class="headitem cusname">
                        <Dropdown trigger="click">
                            <div class="cursorwrap">客户名称<div class="triangleiconwrap"><span class="triangleicondown"></span></div></div>
                            <DropdownMenu slot="list">
                                <div class="cusnamesearchwrap">
                                    <!--  v-model.trim="" @on-enter="" @on-click="" @on-change="" -->
                                    <Input icon="android-search" placeholder="搜索" ref="cusnamesearch"></Input>
                                </div>
                                <div class="cusnamesearchulwrap">
                                    <p><a href="javascript:;">深圳国投物联网络股份有限公司</a></p>
                                    <p><a href="javascript:;">深圳国投物联网络股份有限公司</a></p>
                                    <p><a href="javascript:;">深圳国投物联网络股份有限公司</a></p>
                                    <p><a href="javascript:;">深圳国投物联网络股份有限公司</a></p>
                                    <p><a href="javascript:;">深圳国投物联网络股份有限公司</a></p>
                                    <p><a href="javascript:;">深圳国投物联网络股份有限公司</a></p>
                                    <p><a href="javascript:;">深圳国投物联网络股份有限公司</a></p>
                                    <p><a href="javascript:;">深圳国投物联网络股份有限公司</a></p>
                                    <p><a href="javascript:;">深圳国投物联网络股份有限公司</a></p>
                                    <p><a href="javascript:;">深圳国投物联网络股份有限公司</a></p>
                                    <p><a href="javascript:;">深圳国投物联网络股份有限公司</a></p>
                                    <p><a href="javascript:;">深圳国投物联网络股份有限公司</a></p>
                                    <p><a href="javascript:;">深圳国投物联网络股份有限公司</a></p>
                                    <p><a href="javascript:;">深圳国投物联网络股份有限公司</a></p>
                                    <p><a href="javascript:;">深圳国投物联网络股份有限公司</a></p>
                                </div>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div class="headitem creatname">
                        <Dropdown trigger="click" class="dropdown">
                            <div class="cursorwrap">创建者<div class="triangleiconwrap"><span class="triangleicondown"></span></div></div>
                            <DropdownMenu slot="list">
                                <DropdownItem>驴打滚</DropdownItem>
                                <DropdownItem>炸酱面</DropdownItem>
                                <DropdownItem>驴打滚</DropdownItem>
                                <DropdownItem>驴打滚</DropdownItem>
                                <DropdownItem>驴打滚</DropdownItem>
                                <DropdownItem>驴打滚</DropdownItem>
                                <DropdownItem>驴打滚</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div class="headitem belongname">
                        <Dropdown trigger="click" class="dropdown">
                            <div class="cursorwrap">归属者<div class="triangleiconwrap"><span class="triangleicondown"></span></div></div>
                            <DropdownMenu slot="list">
                                <DropdownItem>驴打滚</DropdownItem>
                                <DropdownItem>炸酱面</DropdownItem>
                                <DropdownItem>驴打滚</DropdownItem>
                                <DropdownItem>驴打滚</DropdownItem>
                                <DropdownItem>驴打滚</DropdownItem>
                                <DropdownItem>驴打滚</DropdownItem>
                                <DropdownItem>驴打滚</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div class="headitem state">
                        <Dropdown trigger="click" class="dropdown">
                            <div class="cursorwrap">处理状态<div class="triangleiconwrap"><span class="triangleicondown"></span></div></div>
                            <DropdownMenu slot="list">
                                <DropdownItem>驴打滚</DropdownItem>
                                <DropdownItem>炸酱面</DropdownItem>
                                <DropdownItem>驴打滚</DropdownItem>
                                <DropdownItem>驴打滚</DropdownItem>
                                <DropdownItem>驴打滚</DropdownItem>
                                <DropdownItem>驴打滚</DropdownItem>
                                <DropdownItem>驴打滚</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div class="headitem etime"><div class="cursorwrap">编辑时间<div class="triangleiconwrap twoitems"><span class="triangleicontop gray"></span><span class="triangleicondown"></span></div></div></div>
                    <div class="headitem time"><div class="cursorwrap">创建时间<div class="triangleiconwrap twoitems"><span class="triangleicontop"></span><span class="triangleicondown gray"></span></div></div></div>
                    <div class="headitem edit">操作</div>
                </div>
                <div class="bizlistbody">
                    <div v-for="n in 10" class="bizlistbodyitem">
                        <div class="listitem caselistname"><a href="javascript:;" style="color: #0050b3;">投资合同协议书</a></div>
                        <div class="listitem cuslistname">投资合同协议书</div>
                        <div class="listitem creatlistname"><img src="/static/icon/cusgrayhead.png"></div>
                        <div class="listitem belonglistname">互选啊</div>
                        <div class="listitem statelist">未处理</div>
                        <div class="listitem etimelist">17-78-78</div>
                        <div class="listitem timelist">78-78-78</div>
                        <div class="listitem editlist">
                            <Dropdown @on-click="" class="dropdown">
                                <a href="javascript:;">
                                    <Icon class="editicon" type="android-more-vertical"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem name="addcase">编辑</DropdownItem>
                                    <DropdownItem name="editctm">删除</DropdownItem>
                                    <DropdownItem name="delctm">设置权限</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="cuswrap">
                <div class="bizlisthead clearboth">
                    <div class="headitem cuscusname">客户名称</div>
                    <div class="headitem cuscreatname">
                        <Dropdown trigger="click" class="dropdown">
                            <div class="cursorwrap">创建者<div class="triangleiconwrap"><span class="triangleicondown"></span></div></div>
                            <DropdownMenu slot="list">
                                <DropdownItem>驴打滚</DropdownItem>
                                <DropdownItem>炸酱面</DropdownItem>
                                <DropdownItem>驴打滚</DropdownItem>
                                <DropdownItem>驴打滚</DropdownItem>
                                <DropdownItem>驴打滚</DropdownItem>
                                <DropdownItem>驴打滚</DropdownItem>
                                <DropdownItem>驴打滚</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div class="headitem cusetime"><div class="cursorwrap">创建时间<div class="triangleiconwrap twoitems"><span class="triangleicontop gray"></span><span class="triangleicondown"></span></div></div></div>
                    <div class="headitem cuscasename"><div class="cursorwrap">案件数量<div class="triangleiconwrap twoitems"><span class="triangleicontop"></span><span class="triangleicondown gray"></span></div></div></div>
                    <div class="headitem edit">操作</div>
                </div>
                <div class="bizlistbody">
                    <div v-for="n in 10" class="bizlistbodyitem">
                        <div class="listitem cuscuslistname"><a href="javascript:;" style="color: #0050b3;">投资合同协议书</a></div>
                        <div class="listitem cusbelonglistname">互选啊</div>
                        <div class="listitem cusetimelist">17-78-78</div>
                        <div class="listitem custimelist">10</div>
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
                </div>
            </div>
            <div class="bizcuslistpage">
                <!-- 分页 -->
                <!-- v-if="caselist.total > caselist.perpage" class="businesslistpage" :current.sync="caselist.page" :total="caselist.total" :page-size="caselist.perpage" @on-change="changCasePage" -->
                <Page></Page>
            </div>
        </div>
    </div>
</template>

<script>
// import moment from 'moment';
// import addMember from '@/components/common/addMember';
// import z_sendBiz from '@/components/common/z-sendBiz';
// import pay from '@/components/personalSetter/pay';
// import clickoutside from '@/common/directives/clickOutSide';
// import editCustomer from '@/components/business/editCustomer';
// import z_searchBox from '@/components/common/z-searchBox';

export default {
    name: 'businessList',
    // components: { addMember, z_sendBiz, pay, editCustomer, z_searchBox},
    data () {
        return {
            // imgUrl,
            // curbignav: 'biz',
            // cursmallnav: 'qbyw',
            // bizbignav: [
            //     { name: '业务列表', key: 'qbyw', url: ''},
            //     { name: '处理中', key: 'clz', url: '0'},
            //     { name: '已结案', key: 'ygd', url: '1'},
            //     { name: '未处理', key: 'wcl', url: '2'}
            // ],
            // teamListPanel: false,
            // teamlist: {
            //     arr: [],
            //     loading: false,
            //     isfirst: true
            // },
            // addMemberModal: false,
            // caselist: {
            //     arr: [],
            //     loading: false,
            //     page: 1,
            //     perpage: 6,
            //     total: 0
            // },
            // caseModal: false,
            // caseModalNav: 'zs',
            // casecreateform: {
            //     casename: '',
            //     selectcmtid: '',
            //     selectid: ''
            // },
            // ruleValidate: {
            //     casename: [
            //         { required: true, message: '案件名不能为空', trigger: 'blur' }
            //     ],
            //     selectcmtid: [
            //         { required: true, type: 'string', message: '请选择或添加客户', trigger: 'change' }
            //     ],
            //     selectid: [
            //         { required: true, type: 'number', message: '请选择客户归属', trigger: 'change' }
            //     ]
            // },
            // qzcasecreateform: {
            //     casename: '',
            //     selectcmtid: '',
            //     selectid: ''
            // },
            // ctmlist: [],
            // qzctmlist: [],
            // teamOwnerList: [],
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
            // show_pay_modal: false,
            // expireSaveList: '',
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
            // startsearchstate: false
        }
    },
    computed: {
        // haveNewPersonalCase() {
        //     return this.personalCaseList.find((val => !val.unread));
        // }
    },
    activated() {
        // this.getCaseList();
        // this.getPersonCaseList();
    },
    mounted() {
        // if (this.$route.query.personalcaseid) {
        //     this.openPersonalCaseModel(this.$route.query.personalcaseid);
        // }
    },
    methods: {
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
        // getCaseList() {
        //     let url
        //     if( this.curbignav == 'biz' ){
        //         url = '/biz/case/list';
        //     }
        //     if( this.curbignav == 'qzkh' ){
        //         url = '/biz/customer/potentiallist';
        //     }
        //     let params = { page: this.caselist.page, perpage: this.caselist.perpage};
        //     if( this.cursmallnav != 'qbyw' && this.curbignav == 'biz' ){
        //         params.status = this.bizbignav.find((n) => n.key == this.cursmallnav).url;
        //     }
        //     this.$ajax('get', url, params, 'caselist.loading', (data) => {
        //         if( Object.prototype.toString.call(data.data) === '[object Array]' ){
        //             // 没有数据
        //             this.caselist.total = 0;
        //             this.caselist.arr = [];
        //         }else{
        //             this.caselist.total = data.data.total;
        //             this.caselist.arr = data.data.data.map(val => {
        //                 val.historylist = [];
        //                 val.isGetHistory = false;
        //                 val.historyPanel = false;
        //                 val.historyloading = false;
        //                 return val;
        //             });
        //         }
        //     });
        // },
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
        // getHistoryCaseList(list) {
        //     list.historyPanel = !list.historyPanel;
        //     if( list.isGetHistory ){
        //         return false;
        //     }
        //     list.historyloading = true;
        //     let params = { detail: 1};
        //     if( this.cursmallnav != 'qbyw' && this.curbignav == 'biz' ){
        //         params.status = this.bizbignav.find((n) => n.key == this.cursmallnav).url;
        //     }
        //     this.$ajax('get', `/biz/customer/caselist/${list.ctmid}`, params, (data) => {
        //         let cases = data.data.data;
        //         // 去掉重复的第一条
        //         cases.shift();
        //         cases.forEach(e => {
        //             e.casestatus = e.status;
        //         });
        //         list.historylist = cases;
        //         list.isGetHistory = true;
        //         list.historyloading = false;
        //     }, (err) => {
        //         list.historyloading = false;
        //     });
        // },
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
        // delCase(idx, casearr, ctmid, caseid, isbig){
        //     this.$Modal.confirm({
        //         title: '确认对话框',
        //         content: '确认删除此案件？',
        //         onOk: () => {
        //             this.$ajax('post', `/biz/case/${ctmid}/del/${caseid}`, (data) => {
        //                 if( isbig ){
        //                     this.getCaseList();
        //                 }else{
        //                     casearr.splice(idx, 1);
        //                 }
        //                 this.$Message.success('成功删除案件！');
        //             });
        //         }
        //     });
        // },
        // getCtmList(ctmid) {
        //     if( !ctmid ){
        //         return false;
        //     }

        //     this.$ajax('get', `/biz/customer/${ctmid}/list`, { search: '', detail: 0, potential: 0}, (data) => {
        //         this.ctmlist = data.data.map(val => {
        //             val.ctmid = val.ctmid.toString();
        //             val.child = [];
        //             // 循环获取子级
        //             this.getCtmChildList(val);
        //             return val;
        //         });
        //     });
        // },
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
        // getCtmChildList(customer) {
        //     this.$ajax('get', `/biz/customer/${customer.ctmid}/assoc/list`, { detail: 0}, (data) => {
        //         customer.child = data.data.map(val => {
        //             val.ctmaid = customer.ctmid + '-' + val.ctmaid;
        //             return val;
        //         })
        //     });
        // },
        // getTeamOwner(ispersonal) {
        //     this.$ajax('get', '/biz/team/listleader', (data) => {
        //         let myid = this.$store.state.mineInfo.id;
        //         if( data.data.map(e => e.id).includes(myid) ){

        //         }else{
        //             data.data.push({ id: myid, name: this.$store.state.mineInfo.name});
        //         }
        //         this.teamOwnerList = data.data;
        //         if( !ispersonal ){
        //             this.casecreateform.selectid = this.teamOwnerList[0].id;
        //             // this.qzcasecreateform.selectid = this.teamOwnerList[0].id;
        //         }
        //     });
        // },
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
        // AddNewCTM() {
        //     if( this.addNewCtmVal == '' ){
        //         this.$Message.error( '客户名称不能为空！' );
        //         this.$nextTick(() => {
        //             this.$refs.addnewctmipt.focus();
        //         });
        //         return false;
        //     }

        //     this.$ajax('post', `/biz/customer/${this.casecreateform.selectid}/store`, { name: this.addNewCtmVal, potential: 0}, (data) => {
        //         let strCtmid = data.ctmid + '';

        //         this.ctmlist.push({ ctmid: strCtmid, name: this.addNewCtmVal, child: []});
        //         // 记录新增的客户id
        //         this.newAddCtmIds.push(data.ctmid);
        //         // 重置状态
        //         this.addNewCtmVal = '';

        //         this.$nextTick(() => {
        //             this.casecreateform.selectcmtid = strCtmid;
        //         });

        //         this.$Message.success( '成功添加客户！' );
        //     });
        //     this.isEditAddNewCtm = false;
        // },
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
        // caseCreateBtn(isCreate) {
        //     if( isCreate ){
        //         this.$refs.casecreateform.validate((valid) => {
        //             if(valid) {
        //                 // 案件名为空
        //                 if( this.casecreateform.casename == '' ){
        //                     this.cursmallnav = 'qbyw';
        //                     this.resetGetCasePage('biz');
        //                     this.$refs.casecreateform.resetFields();
        //                     this.casecreateform.casename = '';
        //                 }else{
        //                     let idarr = this.casecreateform.selectcmtid.split('-');
        //                     let params = { name: this.casecreateform.casename, status: false};
        //                     if( idarr[1] ){
        //                         params.ctmaid = idarr[1];
        //                     }

        //                     this.$ajax('post', `/biz/case/${idarr[0]}/store`, params, (data) => {
        //                         this.$refs.casecreateform.resetFields();
        //                         this.casecreateform.casename = '';
        //                         this.$router.push({ name: 'caseEdit', params: { caseid: data.caseid}});
        //                     });
        //                 }

        //                 this.caseModal = false;

        //                 // 只要点了确定 创建多少客户都保存 并且清空保存的新增客户ids
        //                 this.newAddCtmIds = [];
        //             }
        //         })
        //     }else{
        //         this.$refs.casecreateform.resetFields();
        //         this.casecreateform.casename = '';
        //         this.caseModal = false;
        //         // 删除新增客户 并且清空
        //         if( this.newAddCtmIds.length ){
        //             this.delCTM(this.newAddCtmIds);
        //             this.newAddCtmIds = [];
        //         }
        //     }
        // },
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
        // openCreatePanel(list) {
        //     // 打开案件面板关闭接受业务
        //     this.personalCasePanel = false;
        //     // 关闭团队成员面板
        //     this.teamListPanel = false;
        //     this.$isExpire(() => {
        //         // 账号没过期
        //         this.getTeamOwner(!!list);
        //         if( this.curbignav == 'biz' ){
        //             this.caseModalNav = 'zs';
        //         }/*else if( this.curbignav == 'qzkh' ){
        //             this.caseModalNav = 'qz';
        //         }*/
        //         this.caseModal = true;

        //         // select组件中 filterable为true 搜索的input
        //         setTimeout(() => {
        //             this.$refs.selectcmtid.$refs.input.tabIndex = -1;
        //             // this.$refs.qzselectcmtid.$refs.input.tabIndex = -1;
        //         }, 500);
        //     }, () => {
        //         this.show_pay_modal = true;
        //         this.expireSaveList = list;
        //     });
        // },
        // close(oOrder) {
        //     this.show_pay_modal = false;
        //     if (oOrder) {
        //         this.$nextTick(() => {
        //             this.openCreatePanel(this.expireSaveList);
        //         });
        //     }
        // },
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
        // }
    },
    filters: {
        // timeFormat(date) {
        //     return moment(date).format('YYYY-MM-DD');
        // }
    },
    directives: {
        // clickoutside
    }
}
</script>
