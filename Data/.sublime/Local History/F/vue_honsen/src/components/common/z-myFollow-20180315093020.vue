<style lang="stylus">
.z-myFollow
    .ivu-card-body
        padding: 0
        .headwrap
            background: url('/static/img/myfollowbg.png')
            height: 143px
            position: relative
            border-radius: 3px 3px 0 0
            &:before
                content: ''
                display: block
                width: 100%
                height: 100%
                background: -webkit-linear-gradient(bottom, rgba(0,0,0,0.5), rgba(0,0,0,0))
                background: linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0))
            .head
                position: absolute
                width: 100%
                height: 100%
                top: 0
                left: 0
                padding: 43px 20px 0
                .headimg
                    height: 84px
                    width: 84px
                    border: 3px solid #fff
                    border-radius: 50%
                    float: left
                    box-shadow: 0 1px 9px #8a8a8a
                    position: relative
                .headinfo
                    padding: 15px 0 0
                    width: 195px
                    float: right
                    color #fff
                    .name
                        font-weight: bold
                        a
                            display: inline-block
                            max-width: 155px
                            vertical-align: bottom
                            color #fff
                            cursor default
                            &:hover
                                color #fff !important
                        span
                            font-size: 14px
                            margin-left: 5px
                    .des
                        font-size: 12px
                        height: 36px
                        margin: 4px 0 0
        .tit
            height: 44px
            line-height: 44px
            color: #fff
            background: #64778a
            text-align: center
        .usertypelistwrap
            height: 332px
            overflow-y: auto
            border-bottom: 1px solid #eee
            .usertypelist
                background-color: transparent
                border-radius: 0
                border: none
                .ivu-collapse-item
                    border: none
                    .ivu-collapse-header
                        color: #595959
                        font-size: 15px
                        height: 54px
                        line-height: 54px
                        padding-left: 27px
                        .gname
                            display: inline-block
                            width: 190px
                            vertical-align: bottom
                        .gnum
                            float: right
                            font-size: 12px
                            color: #adadad
                            padding: 0 26px 0
                    .ivu-collapse-content,.ivu-collapse-content-box
                        padding: 0
                    .ivu-collapse-content-box
                        .userlist
                            padding: 0 0 9px
                            .userlistli
                                padding: 9px 0 9px 44px
                                cursor: pointer
                                .limg
                                    float: left
                                    width: 44px
                                    height: 44px
                                    cursor: pointer
                                    img
                                        display: block
                                        width: 100%
                                        height: 100%
                                        border-radius: 3px
                                .rdes
                                    float: left
                                    width: 190px
                                    margin-left: 12px
                                    .name
                                        font-size: 14px
                                        line-height: 1.3
                                        a
                                            color: #454545
                                        .nameedit
                                            display: inline-block
                                            max-width: 120px
                                            .namea
                                                display: inline-block
                                                min-width: 50px
                                                max-width: 120px
                                                &:hover
                                                   color: #454545 !important
                                            .ivu-input
                                                padding 0 5px
                                                width: 80px
                                                height: 20px
                                        .edit
                                            display: none
                                            float: right
                                            margin-right: 15px
                                            i
                                                display: block
                                                width: 15px
                                                float: left
                                                cursor: pointer
                                                img
                                                    width: 100%
                                                    display: block
                                                .hover
                                                    display: none
                                                &:hover
                                                    .normal
                                                        display: none
                                                    .hover
                                                        display: block
                                            .chaticon
                                                width: 19px
                                                margin-right: 9px
                                    .des
                                        margin-top: 5px
                                        font-size: 12px
                                        color: #767575
                                        height: 18px
                                &:hover
                                    background-color: #fdfeff
                                    /*.rdes
                                        .name
                                            .edit
                                                display: inline-block*/
                .ivu-collapse-item-active
                    background: #e9f8ff
                    .ivu-collapse-header
                        color: #29b8fb
                    .ivu-collapse-content//,.ivu-collapse-content-box
                        background: #e9f8ff
        .addgroup
            display: inline-block
            height: 44px
            line-height: 44px
            padding: 0 0 0 20px
            cursor: pointer
            font-size: 14px
            color: #2c2c2c
            i
                color: #3dc1ff
                font-size: 19px
                vertical-align: text-bottom
                position: relative
                top: -1px
.groupmodal
    .ivu-modal-body
        .creat_tag
            padding 20px 0 10px 20px
            font-size 14px
            color #3dc1ff
            cursor pointer
            width: auto
            display: inline-block
            .ivu-input
                width 87px
                border-radius 16px
        .grouplistwrap
            .listli
                float: left
                height: 32px
                margin: 10px 18px
                cursor: pointer
                .listname
                    height: 32px
                    line-height: 32px
                    text-align: center
                    padding: 0 25px
                    border: 1px solid #ccc
                    border-radius: 15px
                    max-width: 478px
                .ivu-poptip-popper
                    min-width: initial
                    li
                        margin: 0 0 10px
                        &:last-child
                            margin: 0
                        a
                            color: #7c7c7c
                .edit_ipt
                    .ivu-input
                        width 87px
                        border-radius 16px
                &.active
                    .listname
                        background: #3dc1ff
                        color: #fff
</style>

<template>
    <div class="z-myFollow">
        <Card dis-hover>
            <div class="headwrap">
                <div v-if="$store.state.mineInfo" class="head clearfix">
                    <div class="headimg">
                        <img class="img" :src="$avatarHash($store.state.mineInfo.id)">
                        <img v-if="$store.state.mineInfo.isVip" class="icon" src="/static/icon/vip.png">
                    </div>
                    <div class="headinfo">
                        <p class="name">
                            <a class="single_ellipsis" href="javascript:;">{{$store.state.mineInfo.name}}</a>
                            <span v-if="$authCodeT($store.getters.auth_code_123).isLawyer || $store.state.mineInfo.job">{{$authCodeT($store.getters.auth_code_123).isLawyer ? $authCodeT($store.getters.auth_code_123).role : $store.state.mineInfo.job}}</span>
                        </p>
                        <p class="ellipsis2 des">{{$store.state.mineInfo.profile || '未填写自我描述'}}</p>
                    </div>
                </div>
            </div>
            <div class="tit">关注列表</div>
            <div class="usertypelistwrap posirelative">
                <Collapse @on-change="changeGroup" v-model="changeGroupidx" class="usertypelist" accordion>
                    <Panel
                        v-for="(list, index) in grouplist"
                        :key="index"
                        @drop.native.prevent="drop(list, index)"
                        :name="index.toString()">
                        <span class="gname single_ellipsis">&nbsp;&nbsp;{{list.name}}</span><span class="gnum">{{list.child.length}}</span>
                        <ul v-if="list.child.length" class="userlist" slot="content">
                            <li
                                v-for="(li, chidx) in list.child"
                                :id="'user_item' + chidx"
                                :draggable="li.fid != HONSEN_id"
                                @dragover.prevent
                                @dragstart="dragstart($event, li, chidx)"
                                @click="changeUser(li.fid)"
                                @contextmenu.prevent="toHandleUser($event,li,chidx)"
                                :style="{ backgroundColor: li.id == curClickUserId ? '#fdfeff' : ''}"
                                class="clearfix userlistli"
                                :title="li.id == HONSEN_id ? '' : '右键操作'">
                                <div @click.stop="$router.push({ name: 'personalCenter', params: { id: li.id}})" title="进入个人中心" class="limg">
                                    <img :src="$avatarHash(li.fid)">
                                </div>
                                <div class="rdes">
                                    <p class="name">
                                        <span class="nameedit">
                                            <a v-if="!li.iseditname" class="namea single_ellipsis" href="javascript:;">{{li.remark ? li.remark + ' (' + li.name + ')' : li.name}}</a>
                                            <Input v-else v-model="li.editname" @on-enter="startChangeName(li)" @on-blur="startChangeName(li)" :ref="'changeNameIpt' + chidx" placeholder="备注名"></Input>
                                        </span>
                                    </p>
                                    <p class="single_ellipsis des" :title="li.profile">{{li.profile || ' '}}</p>
                                </div>
                            </li>
                        </ul>
                    </Panel>
                </Collapse>
                <Spin size="large" fix v-if="grouplistLoading">
                    <Icon type="load-c" class="spin-icon-load"></Icon>
                    <div>加载中...</div>
                </Spin>
            </div>
            <div @click="groupModal = true" class="addgroup"><Icon type="android-add-circle"></Icon>&nbsp;编辑分类</div>
            <Modal
                v-model="groupModal"
                :closable="false"
                :mask-closable="false"
                width="545"
                class-name="groupmodal">
                <div class="modal_tit tag_tit">编辑分类</div>
                <div v-if="!groupAddstate" @click.stop="startAddGroup" class="creat_tag">创建分类+</div>
                <Input v-else v-model="addGroupName" @on-enter="changeAddGroup" @on-blur="changeAddGroup" ref="addGroupIpt" class="creat_tag" placeholder="分类名.."></Input>
                <div class="grouplistwrap">
                    <transition-group name="grouplist" tag="ul" class="list clearfix">
                        <li v-if="(list.tid && !changeUserGroupstate) || changeUserGroupstate" v-for="(list, index) in grouplist" :class="{ active: list.isselect}" :key="index" class="listli">
                            <div v-if="list.isediting">
                                <Input class="edit_ipt" v-model="list.editname" @on-enter="editGroup(list)" @on-blur="editGroup(list)" :ref="'editGroupIpt' + index"></Input>
                            </div>
                            <div @click.stop="selectGroup(list)" v-else>
                                <div class="listname single_ellipsis" :title="list.tid ? '右键编辑' : ''" @contextmenu.prevent="toHandleTid($event,list)">{{list.name}}</div>
                                <contextMenu :ref="`followTid_contextmenu${list.tid}`">
                                    <div class="contextMenu_item" @click.stop="comeInEdit(index)">编辑</div>
                                    <div class="contextMenu_item" @click.stop="delGroup(index)">删除</div>
                                </contextMenu>
                            </div>
                        </li>
                    </transition-group>
                </div>
                <div slot="footer">
                    <Button @click="editOk(1)" type="info">确 定</Button>
                    <Button v-if="changeUserGroupstate" @click="editOk(0)" type="info" class="gray_btn">取 消</Button>
                </div>
            </Modal>
        </Card>

        <contextMenu ref="followUser">
            <div class="contextMenu_item" @click.stop="startChat(cur_contextmenu_user)">发送私信</div>
            <div v-if="cur_contextmenu_user && cur_contextmenu_user.fid != HONSEN_id" class="contextMenu_item" @click.stop="changeUserGroup(cur_contextmenu_user)">修改分类</div>
            <div v-if="cur_contextmenu_user && cur_contextmenu_user.fid != HONSEN_id" class="contextMenu_item" @click.stop="changeName(cur_contextmenu_user, cur_contextmenu_user_chidx)">修改备注</div>
            <div class="contextMenu_item" @click.stop="$router.push({ name: 'personalCenter', params: { id: cur_contextmenu_user.fid}})">进入主页</div>
        </contextMenu>
    </div>
</template>

<script>
import contextMenu from '@/components/common/contextMenu';
export default {
    name: 'z-myFollow',
    components: {contextMenu},
    data () {
        return {
            HONSEN_id,
            grouplist: [],
            grouplistLoading: false,
            groupModal: false,
            groupAddstate: false,
            changeGroupidx: '',
            addGroupName: '',
            delGroupidx: '',
            changeUserGroupstate: false,
            selectGroupidx: [],
            selectUser: {},
            current_list: null,
            current_index: 0,
            cur_contextmenu: null,
            cur_contextmenu_user: null,
            cur_contextmenu_user_chidx: -1,
            curClickUserId: '',
            dragUser: null,
            dragIndex: null
        }
    },
    computed: {
        isshowchatpanel() {
            return this.$store.state.currentSide == 'chat';
        }
    },
    beforeMount() {
        // tid为 null 是 我的关注 分组tid
        this.getGroup();
    },
    methods: {
        getGroup() {
            this.grouplistLoading = true;
            this.$http.get('/user/followclassify').then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    let v = response.data.data;
                    v.forEach((e,i) => {
                        e.child = [];
                        e.isediting = false;
                        e.editname = e.name;
                        if( e.num ){
                            this.getGroupUser(i, e.tid);
                        }
                        e.isselect = false;
                    });
                    this.grouplist = v;
                }else{
                    this.$Message.error( response.data.errmsg );
                }
                this.grouplistLoading = false;
            }).catch(err => {
                this.grouplistLoading = false;
            });
        },
        getGroupUser(idx, id) {
            let url;
            if( id ){
                url = `/user/usersinfollowclassify/${id}`;
            }else{
                url = '/user/usersinfollowclassify';
            }
            this.$http.get(url).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    let v = response.data.data;
                    v.forEach(e => {
                        e.id = e.fid;
                        e.editname = e.remark;
                        e.iseditname = false;
                    });
                    this.grouplist[idx].child = v;
                }else{
                    this.$Message.error( response.data.errmsg );
                }
            }).catch(err => {

            });
        },
        changeGroup(idx) {
            this.curClickUserId = '';
            if( idx.length ){
                this.$emit('changeGroup', this.grouplist[idx[0]].tid || 0);
            }
        },
        changeUser(id) {
            this.curClickUserId = id;
            this.$emit('changeUser', id);
        },
        startAddGroup() {
            this.groupAddstate = true;
            this.$nextTick(()=>{
                this.$refs.addGroupIpt.focus();
            });
        },
        changeAddGroup() {
            this.groupAddstate = false;
            if( this.addGroupName == '' ){
                return false;
            }
            let name = this.addGroupName;
            this.addGroupName = '';
            this.$http.post('/user/followclassify/add', { name: name}).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    this.grouplist.push({
                        child: [],
                        name: name,
                        num: 0,
                        tid: response.data.tid,
                        isediting: false,
                        editname: name,
                        isselect: false
                    });
                    this.$Message.success( '创建分类成功！' );
                }else{
                    this.$Message.error( response.data.errmsg );
                }
            }).catch(err => {

            });
        },
        delGroup(idx, skipif) {
            let delgroup = this.grouplist[idx];
            if( !skipif && delgroup.child.length ){
                // 存下index
                this.delGroupidx = idx;
                this.$Modal.confirm({
                    title: '确认对话框',
                    // content: `确定删除吗？（此分类中含有 ${delgroup.child.length} 个已关注用户，删除后将移至 我的关注）`,
                    content: `确定删除吗？`,
                    onOk: () => {
                        this.delOk();
                    },
                    onCancel: () => {
                        this.delCancel();
                    }
                });
                return false;
            }

            this.$http.post('/user/followclassify/del', { tid: delgroup.tid}).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    // 存当前被删除分组用户
                    let users = JSON.parse(JSON.stringify(delgroup.child));
                    let userids = users.map(e => e.fid);

                    // 改用户 tids
                    this.grouplist.forEach((e, gi) => {
                        e.child.forEach((v, vi) => {
                            if( userids.includes(v.fid) ){
                                v.tids.forEach((tid, tidi) => {
                                    if( tid == delgroup.tid ){
                                        v.tids.splice(tidi, 1);
                                    }
                                });
                            }
                        });
                    });

                    // 如果当前被删除分组用户只在这一个组里面就放入 我的关注 分组
                    users.forEach(e => {
                        if( e.tids.length == 1 && e.tids[0] == delgroup.tid ){
                            e.tids = [null];
                            this.grouplist[0].child.splice(1, 0, e);
                        }
                    })

                    this.grouplist.splice(idx, 1);
                    this.changeGroupidx = '';
                    this.$emit('changeGroup', '');
                    this.$Message.success( '删除分类成功！' );
                }else{
                    this.$Message.error( response.data.errmsg );
                }
            }).catch(err => {});
        },

        toHandleUser(e, li, chidx) {
            /*if( li.fid == HONSEN_id ){  // 如果是 弘商管家
                return false;
            }*/
            this.cur_contextmenu_user = li;
            this.cur_contextmenu_user_chidx = chidx;
            this.$refs.followUser.show(e);
        },

        toHandleTid(e, list) {
            this.cur_contextmenu && this.cur_contextmenu.hide();
            if( list.tid ){
                this.$refs[`followTid_contextmenu${list.tid}`][0].show(e);
                this.cur_contextmenu = this.$refs[`followTid_contextmenu${list.tid}`][0];
            }
        },
        delOk() {
            this.delGroup(this.delGroupidx, true);
        },
        delCancel() {
            this.delGroupidx = '';
        },
        comeInEdit(idx) {
            this.grouplist[idx].isediting = true;
            this.$nextTick(()=>{
                this.$refs['editGroupIpt' + idx][0].focus();
            });
        },
        editGroup(list) {
            list.isediting = false;
            if( list.editname == list.name ){
                return false;
            }
            let name = list.editname;
            this.$http.post('/user/followclassify/update', { tid: list.tid, name: name}).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    list.name = list.editname;
                    this.$Message.success( '修改分类名称成功！' );
                }else{
                    this.$Message.error( response.data.errmsg );
                }
            }).catch(err => {

            });
        },
        changeUserGroup(user) {
            this.$refs.followUser.hide();
            this.changeUserGroupstate = true;
            this.selectUser = JSON.parse(JSON.stringify(user));
            this.grouplist.forEach(e => {
                if( user.tids.includes(e.tid) ){
                    e.isselect = true;
                }
            });
            this.groupModal = true;
        },
        selectGroup(list) {
            if( this.changeUserGroupstate ){
                if( !list.isselect ){
                    if( list.tid === null ){
                        let flag = true;
                        this.grouplist.forEach(e => {
                            if( e.isselect && e.tid !== null ){
                                flag = false;
                            }
                        });
                        if( flag ){
                            list.isselect = true;
                        }else{
                            this.$Message.error( '已经分类的用户不能再移入 我的关注' );
                        }
                    }else{
                        this.grouplist.find(e => e.tid === null).isselect = false;
                        list.isselect = true;
                    }
                }else{
                    list.isselect = false;
                }
            }
        },
        editOk(t) {
            if( t ){
                if( this.changeUserGroupstate ){
                    let arr = [];
                    this.grouplist.forEach(e => {
                        if( e.isselect ){
                            arr.push(e.tid);
                        }
                    });
                    this.selectGroupidx = arr;
                    if( this.selectGroupidx.length ){
                        if( this.selectUser.tids.sort().toString() == this.selectGroupidx.sort().toString() ){
                            // console.log('与之前一样');
                        }else{
                            this.setUserGroup(this.selectUser, this.selectGroupidx);
                        }
                    }else{
                        this.$Message.error( '未选择分类，操作无效！' );
                    }
                }
            }
            this.groupModal = false;
            this.changeUserGroupstate = false;
            this.grouplist.forEach(e => {
                if( e.isselect ){
                    e.isselect = false;
                }
            });
        },
        setUserGroup(curuser, tid) {
            this.$http.post('/user/userfollow/setclassify', { fid: curuser.fid, tid: tid}).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    // 插入需要放入的组  同时更改 tids
                    this.grouplist.forEach(e => {
                        if( curuser.tids.includes(e.tid) && tid.includes(e.tid) ){     // 同时在以前和现在的组  同步tid
                            e.child.forEach((v, i) => {
                                if( v.fid == curuser.fid ){
                                    v.tids = JSON.parse(JSON.stringify(tid));
                                }
                            });
                        }else if( curuser.tids.includes(e.tid) && !tid.includes(e.tid) ){  // 在以前不在现在就删除
                            e.child.forEach((v, i) => {
                                if( v.fid == curuser.fid ){
                                    e.child.splice(i, 1);
                                }
                            });
                        }else if( !curuser.tids.includes(e.tid) && tid.includes(e.tid) ){  // 在现在不在以前就添加
                            e.child.splice(1, 0, Object.assign({}, curuser, { tids: tid}));
                        }else{  // 哪个组都不在

                        }
                    });
                    this.$Message.success( '修改分类成功！' );
                }else{
                    this.$Message.error( response.data.errmsg );
                }
            });
        },
        changeName(list, idx) {
            this.$refs.followUser.hide();
            list.iseditname = true;
            this.$nextTick(()=>{
                this.$refs['changeNameIpt' + idx][0].focus();
            });
        },
        startChangeName(list) {
            list.iseditname = false;
            if( list.editname == list.remark ){
                return false;
            }
            this.$http.post(`/user/follow/remark/${list.fid}`, { remark: list.editname}).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    list.remark = list.editname;
                    this.$Message.success( '修改备注名成功！' );
                }else{
                    this.$Message.error( response.data.errmsg );
                }
            }).catch(err => {

            });
        },
        startChat(user) {
            this.$refs.followUser.hide();
            this.$store.commit("changeCurcontactInfo", { id: user.id, name: user.name});
            if( !this.isshowchatpanel ){
                this.$store.commit('setSide', 'chat');
            }
        },
        dragstart(ev, userdata, index) {
            console.log(ev, userdata)
            if (userdata.fid == HONSEN_id) {
                return;
            }
            /*ev.dataTransfer.setData('Text', ev.target.id);
            this.dragUser = JSON.parse(JSON.stringify(post));
            this.dragIndex = index;*/
        },
        drop(userdata, index) {
            console.log(userdata, index)
            /*if (userdata.fid == HONSEN_id) {
                return;
            }*/
            // let dropPost = JSON.parse(JSON.stringify(post));

            // let param = {
            //     from: this.dragUser.pid,
            //     to: post.pid
            // };
            // this.$ajax('get', '/post/collect/dragcollect', param, (data) => {
            //     this.posts.splice(this.dragIndex, 1);
            //     this.posts.splice(index, 0, this.dragUser);

            //     this.$Message.success('调整顺序成功！');
            // });
        },
    }
}
</script>
