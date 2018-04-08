<style lang="stylus">
.addMemberv2
    .myfollowlistselect
        padding: 15px 0
        min-height: 300px
        max-height: 360px
        overflow-y: auto
        .myfollowlistcol
            background-color: transparent
            border-radius: 0
            border: none
            .ivu-collapse-item
                border none
                .ivu-collapse-header
                    height 34px
                    line-height 34px
                    font-size 14px
                    color #333
                    padding-left: 0
                    // padding-left: 15px
                    // overflow hidden
                    display: flex
                    align-items: center
                    justify-content: space-between
                    & > .ivu-icon
                        float: right
                        margin: 0 23px 0 0
                        transform: rotate(-180deg)
                        order: 2
                    &:hover
                        // background: #eff3f5
                    .listname
                        display: inline-block
                        width: 135px
                        overflow: hidden
                        white-space: nowrap
                        order: 1
                .ivu-collapse-content
                    padding 0 0 0 36px
                    .ivu-collapse-content-box
                        padding 0
            .ivu-collapse-item-active
                // background: #eff3f5
                .ivu-collapse-header
                    & > .ivu-icon
                        transform: rotate(-270deg)
                        color: #1890ff
                .ivu-collapse-content,.ivu-collapse-content-box
                    // background: #eff3f5
            .allcheckbtnwrap
                display: inline-block
                width: 38px
                height: 100%
                text-align: right
                background-image: linear-gradient(left, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 36%, rgba(255, 255, 255, 1) 100%)
                order: 0
                &:hover
                    cursor: default
                .ivu-checkbox-wrapper
                    margin-right: 0
        .ivu-checkbox-group-item
            display: block
            margin-bottom: 8px
            white-space: nowrap
            .ivu-checkbox
                margin-right: 4px
    .contactlist
        padding: 15px 0
        min-height: 300px
        max-height: 360px
        overflow-y: auto
        .ivu-checkbox-group-item
            display: block
            margin-bottom: 8px
            margin-left: 25px
            white-space: nowrap
            .ivu-checkbox
                margin-right: 4px
</style>

<template>
    <div class="addMemberv2" v-clickoutside="close">
        <!-- <Modal
            v-model="addMemberModal"
            :closable="false"
            :mask-closable="false"
            width="570"
            class-name="addMember_modal">
            <div class="modal_tit addMember_tit">{{title}}</div>
            <div class="addMember_main">
                <Row class="transfer_wrap">
                    <Col span="9" offset="2" class="common">
                        <div class="title">我的关注</div>
                        <div class="content_wrap">
                            <Input class="search" v-model.trim="searchText" size="small" icon="android-search" @on-keyup.enter="toSearch(true)" @on-click="toSearch(true)"></Input>
                            <div v-if="searchUsers.length" class="search_box">
                                <CheckboxGroup v-model="leftSelectedUsers" v-if="searchUsers.length">
                                    <Checkbox
                                        v-for="(user,index) in searchUsers"
                                        :key="index"
                                        :label='`{"fid":"${user.id}","name":"${user.name}"}`'>
                                        {{user.remark? `${user.remark}(${user.name})`: user.name}}
                                    </Checkbox>
                                </CheckboxGroup>
                            </div>
                            @on-change="getUsers"
                            <Collapse class="left_list" v-if="followDatas.length" accordion>
                                <Panel v-for="(follow_group,index) in followDatas" :key="index">
                                    {{follow_group.name}}
                                    <span @click.stop class="allcheckbtnwrap" title="全选此分组">
                                        <Checkbox v-model="follow_group.allselect" @click.native.stop="allselectbtn(follow_group)"></Checkbox>
                                    </span>
                                    <div slot="content">
                                        <CheckboxGroup v-model="leftSelectedUsers" v-if="follow_group.users && follow_group.users.length">
                                            <Checkbox
                                                v-for="(user,user_index) in follow_group.users"
                                                :key="user_index"
                                                :label='`{"fid":"${user.fid}","name":"${user.name}"}`'>
                                                {{user.remark? `${user.remark}(${user.name})`: user.name}}
                                            </Checkbox>
                                        </CheckboxGroup>
                                    </div>
                                </Panel>
                            </Collapse>
                        </div>

                    </Col>

                    <Col span="2" class="mid_icon"></Col>

                    <Col span="9" class="common right_list">
                        <div class="title">已选择</div>
                        <ul class="content_wrap">
                            <li v-for="(user,index) in rightUsers" :key="index">
                                <span class="name">{{user.name}}</span>
                                <span class="del_icon" @click.stop="delRightUser(user,index)">
                                    <Icon type="android-close"></Icon>
                                </span>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </div>
            <div slot="footer" class="transfer_btn">
                <Button type="primary" @click="submitMember" style="margin-right: 25px">提 交</Button>
                <Button type="primary" class="gray_btn" @click="close">取 消</Button>
            </div>
        </Modal> -->
        <div class="commonselectsomethingwrapv2 floatpanel" ref="addMemberv2dom">
            <div class="toptit">{{title}}</div>
            <div class="topnav">
                <a @click="addMemberNav = 'recent'" :class="{nohover : addMemberNav == 'myfollow'}" href="javascript:;">最近联系人</a>
                <a @click="addMemberNav = 'myfollow'" :class="{nohover : addMemberNav == 'recent'}" href="javascript:;">我的关注</a>
            </div>
            <div v-if="addMemberNav == 'recent'" class="contactlist">
                <CheckboxGroup v-model="leftSelectedUsers">
                    <Checkbox
                        v-for="(user, user_index) in recentChat"
                        :key="user_index"
                        :label='`{"fid":"${user.uid}","name":"${user.name}"}`'>
                        {{user.remark? `${user.remark}(${user.name})`: user.name}}
                    </Checkbox>
                </CheckboxGroup>
            </div>
            <div v-if="addMemberNav == 'myfollow'" class="myfollowlistselect">
                <Collapse class="myfollowlistcol" accordion>
                    <Panel v-for="(follow_group, index) in followDatas" :key="index">
                        <span class="listname">{{follow_group.name}}</span>
                        <span @click.stop class="allcheckbtnwrap" title="全选此分组">
                            <Checkbox v-model="follow_group.allselect" @click.native.stop="allselectbtn(follow_group)"></Checkbox>
                        </span>
                        <div slot="content">
                            <CheckboxGroup v-model="leftSelectedUsers">
                                <Checkbox
                                    v-for="(user, user_index) in follow_group.users"
                                    @click.native.stop="submitMember(user)"
                                    :key="user_index"
                                    :label='`{"fid":"${user.fid}","name":"${user.name}"}`'>
                                    {{user.remark? `${user.remark}(${user.name})`: user.name}}
                                </Checkbox>
                            </CheckboxGroup>
                        </div>
                    </Panel>
                </Collapse>
            </div>
        </div>
    </div>
</template>

<script>
import clickoutside from '@/common/directives/clickOutSide';

export default {
    name: 'addMember',
    data() {
        return {
            addMemberNav: 'recent',      // recent myfollow
            addMemberModal: true,
            followDatas: [],
            indexs: [], // 记录已经请求过的项
            leftSelectedUsers: [],
            rightUsers: [],
            searchText: '',
            searchUsers: [],
            searchTimer: null,
            recentChat: [],
        }
    },
    directives: {
        clickoutside
    },
    props: {
        /* 传入已经选中的成员 格式：[{fid/id:'100115',name: 'test'},{fid/id:'100142',name: 'tester'}]  */
        initSelectedUserIds: {
            type: Array,
            default() {
                return [];
            }
        },
        title: {
            type: String,
            default: '添加成员'
        },
        onlyLawyer: {
            type: Boolean,
            default: false
        },
        noLawyer: {
            type: Boolean,
            default: false,
        },
        needHonsen: {
            type: Boolean,
            default: false,
        },
        flowMouse: {
            type: Boolean,
            default: false,
        },
    },
    beforeMount() {

    },
    mounted() {
        this.getFollowGroup();
        this.getRecentChat();
        if (this.initSelectedUserIds.length) {
            this.initSelected();
        }
    },
    watch: {
        followDatas: {
            deep: true,
            handler: function(v, ov){
                this.initAllSelectBtn();
            }
        },
        initSelectedUserIds(newval,oldval) {
            if (newval.length) {
                this.initSelected();
            }
        },
        leftSelectedUsers(newval,oldval) {
            // this.L2R();
        },
        searchText(newval) {
            this.toSearch();
        }
    },
    methods: {
        show(event) {
            if( this.flowMouse ){
                let e = event || window.event;
                let dom = this.$refs.addMemberv2dom;
                dom.style.left = e.layerX+'px';
                dom.style.top = e.layerY +'px';
                console.log(e)
            }
        },
        getRecentChat() {
            this.$ajax('get', this.$apiConfig.userGroup.getRecentChatUser, (data) => {
                data.data.forEach(e => {
                    e.fid = e.uid;
                });
                this.recentChat = this.filterUser(data.data);
            });
        },
        toSearch(showMsg) {
            if (!this.searchText) {
                this.searchUsers = [];
                if (showMsg) {
                    this.$Message.warning('请输入搜索词再进行搜索！');
                }
                return;
            }

            let time = showMsg? 0: 500;

            clearTimeout(this.searchTimer);
            this.searchTimer = setTimeout(() => {
                this.$ajax('get', '/user/follow/searchfollowuser', {content: encodeURI(this.searchText)}, (data) => {
                    this.searchUsers = this.filterUser(data.data);
                    if (showMsg && !data.data.length) {
                        this.$Message.warning('没有搜索结果！');
                    }
                });
            }, time);
        },
        initSelected() {
            if (this.initSelectedUserIds.length) {

                this.rightUsers = this.initSelectedUserIds.map((val) => {
                    let fid = (val.fid || val.id).toString();
                    return {fid: fid, name: val.name};
                });

                this.rightUsers.forEach(val => {
                    this.leftSelectedUsers.push(JSON.stringify(val));
                });
            }
        },
        delRightUser(user,index) {
            this.rightUsers.splice(index,1);

            this.leftSelectedUsers = this.leftSelectedUsers.filter(val => JSON.parse(val).fid != user.fid);
        },
        // L2R() {
        //     this.rightUsers = this.leftSelectedUsers.map(val => {
        //         return JSON.parse(val);
        //     });

        //     this.initAllSelectBtn();
        // },
        initAllSelectBtn() {
            this.$nextTick(() => {
                this.followDatas.forEach(e => {
                    let state = true;
                    e.users.forEach(n => {
                        if( this.leftSelectedUsers.includes(JSON.stringify({fid: (n.fid || n.id).toString(), name: n.name})) ){

                        }else{
                            state = false;
                        }
                    });
                    if( state && e.users.length ){
                        e.allselect = true;
                    }else{
                        e.allselect = false;
                    }
                });
            });
        },
        getFollowGroup() {
            this.$ajax('get', this.$apiConfig.userGroup.getUserFollowClass, (data) => {
                this.followDatas = data.data.map(val => {
                    val.allselect = false;
                    val.users = [];
                    return val;
                });

                this.followDatas.forEach((e, i) => {
                    this.getUsers([i]);
                });
            });
        },
        filterUser(users) {
            // 过滤掉弘商管家账号
            let _users = users;

            if( !this.needHonsen ){
                _users = users.filter(val => val.fid != honsenId);
            }

            // 只需要律师
            if(this.onlyLawyer) {
                _users = _users.filter(val => this.$authCodeT(val.vip).isLawyer);
            }

            // 不需要律师
            if(this.noLawyer){
                _users = _users.filter(val => !this.$authCodeT(val.vip).isLawyer);
            }

            return _users;
        },
        getUsers(arrIndex) {
            // indexArr为当前展开组的索引值，收起时为undefined
            let index = Number(arrIndex[0]);
            if ((!index && index != 0) || this.indexs.includes(index)) {
                return;
            }

            let id = this.followDatas[index].tid;
            let url = id? `/user/usersinfollowclassify/${id}`: `/user/usersinfollowclassify`; // 我的关注tid为null

            this.$ajax('get', url, (data) => {
                this.indexs.push(index);

                this.followDatas[index].users = this.filterUser(data.data);
            });
        },
        submitMember(user) {
            this.rightUsers = this.leftSelectedUsers.map(val => {
                return JSON.parse(val);
            });

            if( user ){
                let findidx = this.rightUsers.findIndex(e => e.fid == user.fid);
                if( findidx > -1 ){
                    this.rightUsers.splice(findidx, 1);
                }else{
                    this.rightUsers.push(JSON.parse(`{"fid":"${user.fid}","name":"${user.name}"}`));
                }

                this.initAllSelectBtn();
            }

            let exportIds = this.rightUsers.map(val => Number(val.fid));
            let exportUsers = this.rightUsers.map(val => {
                return {id: Number(val.fid),name: val.name};
            });

            let isNoChange = false;
            let importIds = this.initSelectedUserIds.map(val => Number(val.fid || val.id));
            /*if (importIds.sort().toString() == exportIds.sort().toString()) {
                isNoChange = true;
            }*/

            this.$emit('selected-users', exportUsers, exportIds, isNoChange);
        },
        close() {
            this.$emit('close');
        },
        allselectbtn(g) {
            this.$nextTick(() => {
                let temparr = g.users.map(e => JSON.stringify({fid: (e.fid || e.id).toString(), name: e.name}));
                if( g.allselect ){
                    temparr.forEach(e => {
                        if( this.leftSelectedUsers.includes(e) ){
                            // 此用户已存在 不重复添加
                        }else{
                            this.leftSelectedUsers.push(e);
                        }
                    });
                }else{
                    temparr.forEach(e => {
                        let idx = this.leftSelectedUsers.findIndex(n => n == e);
                        if( idx > -1 ){
                            // 此用户已存在 去掉
                            this.leftSelectedUsers.splice(idx, 1);
                        }
                    });
                }

                this.submitMember();
            });
        },
        removeLeftUsers(user) {
            user.forEach(e => {
                let idx = this.leftSelectedUsers.findIndex(n => n.includes(e));
                this.leftSelectedUsers.splice(idx, 1);
            })
        }
    }
}
</script>