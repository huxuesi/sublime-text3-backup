<style lang="stylus">
.addMember_modal
    .transfer_wrap
        margin 25px 0
        .title
            height 43px
            line-height 43px
            color #fff
            font-size 16px
            background-color #65778b
            text-align center
        .search
            margin 7px 15px
            width auto
            .ivu-input
                border-radius 16px
                background #eee
                border-color transparent
            .ivu-icon
                cursor pointer
        .search_box
            margin 0 15px
        .common
            border 1px solid #eeeeee
            border-radius 3px
            .content_wrap
                height 275px
                overflow auto
        .ivu-checkbox-group-item
            display block
            margin-bottom 10px
        .left_list
            background-color: transparent
            border-radius: 0
            border: none
            .ivu-collapse-item
                border none
                .ivu-collapse-header
                    height 45px
                    line-height 45px
                    font-size 14px
                    color #6f6f6f
                    padding-left: 15px
                    overflow hidden
                    i
                        margin-right 10px
                    span
                        float: right
                        padding-right 20px
                    &:hover
                        background: #eff3f5
                .ivu-collapse-content
                    padding 0 0 0 36px
                    .ivu-collapse-content-box
                        padding 0
            .ivu-collapse-item-active
                background: #eff3f5
                .ivu-collapse-content,.ivu-collapse-content-box
                    background: #eff3f5
        .mid_icon
            height 320px
            background-position center
            background-repeat no-repeat
            background-image url('/static/icon/0022_.png')
            background-size: 90%
        .right_list
            ul
                padding 10px 28px
            li
                margin-top 10px
                color #a1a1a1
                &:hover
                    .del_icon
                        display inline-block
            .del_icon
                display none
            .ivu-icon
                margin-left 10px
                vertical-align middle
                font-size 14px
                cursor pointer
                &:hover
                    color #3dc1ff
</style>

<template>
    <div class="addMember">
        <Modal
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

                            <Collapse class="left_list" v-if="followDatas.length" accordion @on-change="getUsers">
                                <Panel v-for="(follow_group,index) in followDatas" :key="index">
                                    {{follow_group.name}}
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
        </Modal>
    </div>
</template>

<script>
export default {
    name: 'addMember',
    data() {
        return {
            addMemberModal: true,
            followDatas: [],
            indexs: [], // 记录已经请求过的项
            leftSelectedUsers: [],
            rightUsers: [],
            searchText: '',
            searchUsers: [],
        }
    },
    props: {
        /* 传入已经选中的成员 格式：[{fid/id:'100115',name: '黄鑫'},{fid/id:'100142',name: 'tester'}]  */
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
    },
    mounted() {
        this.getFollowGroup();
        if (this.initSelectedUserIds.length) {
            this.initSelected();
        }
    },
    watch: {
        initSelectedUserIds(newval,oldval) {
            if (newval.length) {
                this.initSelected();
            }
        },
        leftSelectedUsers(newval,oldval) {
            this.L2R();
        },
        searchText(newval) {
            this.toSearch();
        }
    },
    methods: {
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
                this.$ajax('get', '/user/follow/searchfollowuser', {content: this.searchText}, (data) => {
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
        L2R() {
            this.rightUsers = this.leftSelectedUsers.map(val => {
                return JSON.parse(val);
            });
        },
        getFollowGroup() {
            this.$ajax('get', '/user/followclassify', (data) => {
                this.followDatas = data.data.map(val => {
                    val.users = [];
                    return val;
                });
            });
        },
        filterUser(users) {
            // 过滤掉弘商管家账号
            let _users = users.filter(val => val.fid != honsenId);

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
        submitMember() {
            let exportIds = this.rightUsers.map(val => Number(val.fid));
            let exportUsers = this.rightUsers.map(val => {
                return {id: Number(val.fid),name: val.name};
            });

            let isNoChange = false;
            let importIds = this.initSelectedUserIds.map(val => Number(val.fid || val.id));
            if (importIds.sort().toString() == exportIds.sort().toString()) {
                isNoChange = true;
            }

            this.$emit('selected-users', exportUsers, exportIds, isNoChange);
        },
        close() {
            this.$emit('close');
        },
    }
}
</script>