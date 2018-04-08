<style lang="stylus">
.addMemberv2
    //
</style>

<template>
    <div class="addMemberv2">
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
            searchTimer: null
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
        L2R() {
            this.rightUsers = this.leftSelectedUsers.map(val => {
                return JSON.parse(val);
            });

            this.initAllSelectBtn();
        },
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
            });
        }
    }
}
</script>