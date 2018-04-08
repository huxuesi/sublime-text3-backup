
<style lang="stylus">
@import '../../common/stylus/mixin.styl'
active = #3dc1ff
.post_list
    position relative
    .left_side
        float left
        padding 0 30px
        width 956px
        background #fff
        border 1px solid #dedede
        .header
            margin-top 15px
            position relative
            .dropdown
                .ivu-btn
                    font-weight bold
            .post_sum
                font-size 12px
                color #373737
                vertical-align bottom
            .post_list_creat_btn
                right 0
        .body
            margin-top 15px
            position relative
            min-height 600px
            .tit
                padding 0 28px
                height 38px
                line-height 38px
                color #fff
                background #65778b
                font-size 15px
                .time
                    float right
                    margin-right 50px
                .creator
                    margin-right 35px
                    width 60px
                    text-align center
            .no_post_img
                width 100%
                position absolute
                left 0px
                top 100px
                text-align center
                img
                    cursor pointer
            .list
                padding 5px 0 20px 0
            .item
                position relative
                padding 3px 28px
                height 44px
                line-height 38px
                border-bottom 1px solid #ebebeb
                .right_tip
                    height 38px
                &:hover
                    background #eef9fe
                .up_icon
                    position absolute
                    top 0px
                    left 0px
                    bgImg(16px, 44px, '/static/icon/0051.png')
                .post_tit
                    float left
                    display block
                    width 600px
                    font-size 15px
                    color #1e96cf
                    &:hover
                        color #2c2c2c !important
                .post_time
                    float right
                    font-size 13px
                    color #4b4b4b
                .post_name
                    margin-right 35px
                    width 60px
                    text-align center
        .footer
            margin 20px 0
            text-align center
    .right_side
        float right
        width 214px
        .my_post
            background #fff
            border 1px solid #dedede
            cursor pointer
        .title
            padding 0 20px
            height 53px
            line-height 53px
            font-size 15px
            color #3a3a3a
            font-weight bold
            background linear-gradient(to top, #e0e0e0, #fff)
            .icon
                float right
                padding 0 10px
                &:hover
                    .ivu-icon
                        color active
        .list
            height 333px
            overflow auto
            transition: all .7s ease
        .item
            position relative
            padding 3px 20px 3px 45px
            height 37px
            line-height 31px
            font-size 14px
            color #2e2e2e
            border-bottom 1px solid #ebebeb
            .right_tip
                height 31px
            &:hover
                background #eef9fe
            &.active
                color active
            .triangle
                position absolute
                top 14px
                left 27px
                transform rotate(-90deg)
            .num
                float right
                font-size 12px
                color #b1b1b1
            .category_input
                position absolute
                top 2px
                left 0px
                padding 0 20px 0 45px
            .name
                margin-right 32px
        .others_post
            margin-top 17px
            background #fff
            border 1px solid #dedede
            cursor pointer
        .draft_post
            margin-top 17px
            background #fff
            border 1px solid #dedede
            .item
                font-size 15px
                cursor pointer
                &.active
                    background active
</style>
<template>
    <div class="post_list clearfix">
        <!-- 左侧 -->
        <div class="left_side">
            <div class="header">
                <Dropdown v-show="curType == 'myPost'" class="dropdown" @on-click="togglePost">
                    <Button long>我的知识 <Icon type="arrow-down-b"></Icon></Button>
                    <DropdownMenu slot="list">
                        <DropdownItem name="privacy">私密</DropdownItem>
                        <DropdownItem name="open">公开</DropdownItem>
                        <DropdownItem name="accredit">授权</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <span v-show="curType == 'myPost'" class="post_sum">（共{{iSum}}条）</span>

                <Dropdown v-show="curType == 'othersPost'" class="dropdown" @on-click="toggleOthersPost">
                    <Button long>他人知识 <Icon type="arrow-down-b"></Icon></Button>
                    <DropdownMenu slot="list">
                        <DropdownItem name="visit">授权阅读</DropdownItem>
                        <DropdownItem name="edit">授权编辑</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <span v-show="curType == 'othersPost'" class="post_sum">（共{{iSumOthers}}条）</span>

                <Dropdown v-show="curType == 'draftPost'" class="dropdown">
                    <Button long>草稿箱</Button>
                </Dropdown>
                <span v-show="curType == 'draftPost'" class="post_sum">（共{{iSumDraft}}条）</span>

                <Button
                    class="post_list_creat_btn"
                    type="primary"
                    size="large"
                    @click="toCreatePost">
                    新建知识
                    <span class="add_icon">+</span>
                </Button>
            </div>

            <div class="body">
                <div class="tit">
                    <span v-if="curType == 'myPost'">{{curCidName}}</span>
                    <template v-else>
                        <span>知识名称</span>
                        <span class="time">编辑时间</span>
                        <span v-show="curType == 'othersPost'" class="time creator">创建者</span>
                    </template>
                </div>

                <div v-if="noPost && !firstGetMyPost" class="no_post_img">
                    <span v-if="curType == 'othersPost'">暂无对您授权的知识</span>
                    <img v-else src="/static/img/nolistcontent.png" @click="toCreatePost" alt="没有知识">
                </div>

                <!-- 我的知识 -->
                <ul v-show="curType == 'myPost'" v-if="aPosts.length" class="list">
                    <li class="item clearfix" v-for="(post,index) in aPosts" :key="post.pid" @contextmenu.prevent="toHandlePost($event,post)">
                        <!-- title放在li里面部分浏览器有问题 -->
                        <div class="right_tip" title="右键操作">
                            <div class="up_icon" v-show="post.is_puttop"></div>
                            <a
                                :href="`/post/read/${post.pid}`"
                                class="post_tit single_ellipsis"
                                @click.prevent="$router.push({name: 'postRead', params: {read_pid: post.pid}})">
                                {{post.title}}
                            </a>
                            <div class="post_time">{{post.time}}</div>
                        </div>
                    </li>
                </ul>

                <!-- 他人知识 -->
                <ul v-show="curType == 'othersPost'" v-if="aOthersPosts.length" class="list">
                    <li class="item clearfix" v-for="(post,index) in aOthersPosts" :key="index" @contextmenu.prevent="toHandlePost($event,post)">
                        <div class="right_tip" title="右键操作">
                            <div class="up_icon" v-show="post.isputtop"></div>
                            <a
                                href="javascript:;"
                                class="post_tit single_ellipsis"
                                @click="$router.push({name: 'postRead', params: {read_pid: post.pid}})">
                                {{post.title}}
                            </a>
                            <div class="post_time">{{post.time | formatTime}}</div>
                            <div class="post_time post_name single_ellipsis">{{post.name}}</div>
                        </div>
                    </li>
                </ul>

                <!-- 草稿 -->
                <ul v-show="curType == 'draftPost'" v-if="aDraftPosts.length" class="list">
                    <li class="item clearfix" v-for="(post,index) in aDraftPosts" :key="post.pid" @contextmenu.prevent="toHandleDraft($event,post)">
                        <a
                            href="javascript:;"
                            class="post_tit single_ellipsis"
                            @click="$router.push({name: 'postEdit', params: {edit_pid: post.pid}})">
                            {{post.title}}
                        </a>
                        <div class="post_time">{{post.time}}</div>
                    </li>
                </ul>

                <contextMenu ref="draft_contextmenu">
                    <div class="contextMenu_item" @click.stop="delDraft">删除</div>
                </contextMenu>

            </div>

            <Page
                v-show="curType == 'myPost'"
                v-if="iSum > perpage"
                class="footer"
                :current="page"
                :total="iSum"
                :page-size="perpage"
                @on-change="changePage($event, 'myPost')">
            </Page>
            <Page
                v-show="curType == 'othersPost'"
                v-if="iSumOthers > perpage"
                class="footer"
                :current="pageOthers"
                :total="iSumOthers"
                :page-size="perpage"
                @on-change="changePage($event, 'othersPost')">
            </Page>
            <Page
                v-show="curType == 'draftPost'"
                v-if="iSumDraft > perpage"
                class="footer"
                :current="pageDraft"
                :total="iSumDraft"
                :page-size="perpage"
                @on-change="changePage($event, 'draftPost')">
            </Page>

            <!-- 右键操作 -->
            <contextMenu ref="post_contextmenu">
                <template v-if="curType == 'myPost'">
                    <div class="contextMenu_item" @click.stop="toEditPost">编辑知识</div>
                    <div class="contextMenu_item" @click.stop="delPost">删除知识</div>
                    <div class="contextMenu_item" @click.stop="toggleTop" v-if="handlePost && handlePost.is_puttop">取消置顶</div>
                    <div class="contextMenu_item" @click.stop="toggleTop" v-else>设为置顶</div>
                    <div class="contextMenu_item" @click.stop="toggleSecret" v-if="handlePost && handlePost.is_secret">取消私密</div>
                    <div class="contextMenu_item" @click.stop="toggleSecret" v-else>转为私密</div>
                    <div class="contextMenu_item" @click.stop="openCidModal">修改分类</div>
                    <div class="contextMenu_item" @click.stop="openAuth('edit')">编辑授权</div>
                    <div class="contextMenu_item" @click.stop="openAuth('view')">阅读授权</div>
                </template>
                <template v-if="curType == 'othersPost'">
                    <div class="contextMenu_item" @click.stop="othersToggleTop" v-if="handlePost && handlePost.isputtop">取消置顶</div>
                    <div class="contextMenu_item" @click.stop="othersToggleTop" v-else>设为置顶</div>
                </template>
            </contextMenu>

            <setCategory
                v-if="cidModal"
                :selectedCategorys="initCids"
                @selected-category="setPostCid"
                @categorysHaveChange="categorysHaveChange"
                @close="cidModal = false">
            </setCategory>

            <addMember
                v-if="authModal"
                :title="authModalTit"
                :initSelectedUserIds="initUsers"
                @close="authModal = false"
                @selected-users="setPostAuth">
            </addMember>
        </div>

        <!-- 右侧 -->
        <div class="right_side">
            <div class="my_post">
                <div class="title" @click="clickCategory(null)">
                    我的知识
                    <div class="icon" @click.stop="toToggleCidList">
                        <Icon :type="toggleCidList? 'chevron-down': 'chevron-up'"></Icon>
                    </div>
                </div>

                <ul v-if="aCategorys.length" v-show="toggleCidList" class="list" @contextmenu.prevent.stop="toHandleCategory($event)">
                    <li
                        class="item"
                        v-for="(category, index) in aCategorys"
                        :key="category.cid"
                        :class="{active: curCid == category.cid}"
                        :id="'category_item' + index"
                        :draggable="!!category.cid"
                        @dragstart="dragstart($event, category, index)"
                        @dragover.prevent
                        @drop.prevent="drop(category, index)"
                        @contextmenu.prevent.stop="toHandleCategory($event,category, index)"
                        @click="clickCategory(category.cid, category.is_editing)">
                        <!-- title放在li里面部分浏览器有问题 -->
                        <div class="right_tip" title="右键操作">
                            <div v-show="curCid == category.cid" class="triangle active"></div>

                            <Input
                                class="category_input"
                                :ref="`category${category.cid}`"
                                v-show="category.is_editing"
                                @on-keyup.enter="editCategory(category, index)"
                                @on-blur="editCategory(category, index)"
                                v-model="category.editname">
                            </Input>

                            <span class="num">（{{oCategoryNum[category.cid]}}）</span>
                            <div v-show="!category.is_editing" class="name single_ellipsis">{{category.name}}</div>

                        </div>
                    </li>
                </ul>

                <contextMenu ref="cid_contextmenu">
                    <div class="contextMenu_item" @click.stop="toAddCategory">添加分类</div>
                    <!-- 区分未分类 -->
                    <div class="contextMenu_item" @click.stop="toEditCategory" v-if="handleCategory && handleCategory.cid != 0">重 命 名</div>
                    <div class="contextMenu_item" @click.stop="delCategory" v-if="handleCategory && handleCategory.cid != 0">删除分类</div>
                </contextMenu>

            </div>

            <div class="others_post">
                <div class="title" @click="initOthersPost">
                    他人知识
                    <div class="icon" @click.stop="toToggleOthersPost">
                        <Icon :type="toggleOthersList? 'chevron-down': 'chevron-up'"></Icon>
                    </div>
                </div>

                <ul v-if="othersUsers.length" v-show="toggleOthersList" class="list">
                    <li
                        class="item"
                        v-for="(user, index) in othersUsers"
                        :key="user.id"
                        :class="{active: curOtherId == user.id}"
                        @click="clickOthersUser(user.id)">
                        <div v-show="curOtherId == user.id" class="triangle active"></div>

                        <span class="num">（{{user.num}}）</span>
                        <div class="name single_ellipsis">{{user.name}}</div>
                    </li>
                </ul>

            </div>

            <ul class="draft_post">
                <li class="item" @click="curCid = null; curType = 'draftPost'">
                    草稿箱
                    <span class="num">{{iSumDraft}}</span>
                </li>
            </ul>

        </div>

        <!-- <Spin size="large" fix v-if="spinShow">
            <Icon type="load-c" size=18 class="spin-icon-load"></Icon>
            <div>加载中...</div>
        </Spin> -->

    </div>
</template>

<script>
/*
    我的知识动画
*/
import moment from 'moment';
import addMember from '@/components/common/addMember';
import setCategory from './setCategory';
import contextMenu from '@/components/common/contextMenu';

const newCid = -999;
export default {
    name: 'postList',
    components: {addMember,setCategory,contextMenu},
    data() {
        return {
            authModalTit: '',
            firstGetMyPost: true,
            curType: 'myPost',

            aDraftPosts: [],
            pageDraft: 1,
            iSumDraft: 0,
            handleDraftPost: null,

            othersUsers: [],
            curOtherId: null,
            aOthersPosts: [],
            othersPostJurisdiction: null,
            pageOthers: 1,
            iSumOthers: 0,

            aPosts: [],
            myPostJurisdiction: null,
            iSum: 0,
            spinShow: false,
            page: 1,
            perpage: 12,
            curCid: null,
            handlePost: null,
            cidModal: false,
            initCids: [],
            authModal: false,
            initUsers: [],
            openAuthType: '',

            aCategorys: [],
            oCategoryNum: {}, // {cid: num}
            dragCategory: null,
            dragIndex: null,
            handleCategory: null,
            handleCategoryIndex: null,

            toggleOthersList: false,
            toggleCidList: true,
        }
    },
    computed: {
        noPost() {
            if (
                ((!this.aPosts.length && this.curType == 'myPost') ||
                (!this.aDraftPosts.length && this.curType == 'draftPost') ||
                (!this.aOthersPosts.length && this.curType == 'othersPost')) &&
                !this.spinShow
            )
            {
                return true;
            } else {
                return false;
            }
        },
        curCidName() {
            if (this.curCid == null) {
                return '全部知识';
            } else {
                return this.aCategorys.filter(item => item.cid == this.curCid)[0].name;
            }
        },
    },
    activated() {
        this.getPosts(this.curCid);
        this.getCategorys();
        this.getDraftPosts();
        this.getOthersUsers();
        this.getOthersPosts();
    },
    methods: {
        delDraft() {
            this.$refs.draft_contextmenu.hide();
            this.$Modal.confirm({
                title: '确认对话框',
                content: '确定删除吗？',
                onOk: () => {
                    this.$ajax('post', '/post/setinfos', {type: 'del', pids: [this.handleDraftPost.pid]}, (data) => {
                        this.$Message.success('删除草稿成功！');

                        this.getDraftPosts();
                    });
                }
            });
        },
        toToggleOthersPost() {
            this.toggleOthersList = !this.toggleOthersList;
            if (this.toggleOthersList) {
                this.toggleCidList = false;
            }
        },
        toToggleCidList() {
            this.toggleCidList = !this.toggleCidList;
            if (this.toggleCidList) {
                this.toggleOthersList = false;
            }
        },
        // 分类
        getCategorys() {
            this.$ajax('get', '/postcategory/list', {type: 'menu'}, (data) => {
                this.aCategorys = data.data.concat().map(val => {
                    this.$set(this.oCategoryNum, val.cid, val.num);

                    val.is_editing = false;
                    val.editname = val.name;
                    return val;
                });
            });
        },
        toHandleCategory(e,category, index) {
            if (category) {
                this.handleCategory = category;
                this.handleCategoryIndex = index;
            } else {
                this.handleCategory = null;
            }
            this.$refs.cid_contextmenu.show(e);
        },
        toAddCategory() {
            this.$refs.cid_contextmenu.hide();

            let oCid = {
                cid: newCid,
                name: '',
                editname: '',
                is_editing: true,
                num: 0,
            }
            // this.aCategorys.splice(this.handleCategoryIndex, 0, oCid);
            this.aCategorys.splice(this.aCategorys.length-1, 0, oCid);

            this.$nextTick(() => {
                this.$refs[`category${oCid.cid}`][0].focus();
            });
        },
        toEditCategory() {
            this.$refs.cid_contextmenu.hide();
            this.handleCategory.is_editing = true;
            this.$nextTick(() => {
                this.$refs[`category${this.handleCategory.cid}`][0].focus();
            });
        },
        editCategory(category, index) {
            category.is_editing = false;

            if( category.editname == category.name ){
                if (category.cid == newCid) {
                    this.aCategorys.splice(index, 1);
                }
                return false;
            }

            // 添加
            if (category.cid == newCid) {
                this.$ajax('post', '/postcategory/add', {name: category.editname}, (data) => {
                    category.cid = data.cid;
                    category.name = category.editname;
                    this.$set(this.oCategoryNum, data.cid, 0);
                    this.$Message.success('添加分类成功！');
                }, err => {
                    // 去掉提前写进的数据
                    this.aCategorys.splice(index, 1);
                });
            } else {
                this.$ajax('post', '/postcategory/update', {cid: category.cid, name: category.editname}, (data) => {
                    category.name = category.editname;
                    this.$Message.success('编辑分类成功！');
                });
            }
        },
        delCategory() {
            this.$refs.cid_contextmenu.hide();
            this.$Modal.confirm({
                title: '确认对话框',
                content: '确定删除吗？',
                onOk: () => {
                    this.$ajax('post', '/postcategory/del', {cid: this.handleCategory.cid}, (data) => {
                        if (this.handleCategory.cid == this.curCid) {
                            this.curCid = null;
                            this.getPosts();
                        }

                        this.getCategorys();
                        this.$Message.success('删除分类成功！');
                    });
                }
            });
        },
        clickCategory(cid, isEditing) {
            if ((isEditing && cid != null) || cid == newCid) {
                return;
            }
            this.toggleCidList = true;
            this.toggleOthersList = false;

            this.curOtherId = null;
            this.myPostJurisdiction = null;
            this.curType = 'myPost';
            this.curCid = cid;
            this.page = 1;
            this.getPosts(cid);
        },
        dragstart(ev, category, index) {
            console.log(ev, category, index)
            if (category.cid == 0) {
                return;
            }
            ev.dataTransfer.setData('Text', ev.target.id);
            this.dragCategory = JSON.parse(JSON.stringify(category));
            this.dragIndex = index;
        },
        drop(category, index) {
            console.log(category, index)
            if (category.cid == 0 || category.cid == this.dragCategory.cid) {
                return;
            }
            let dropCategory = JSON.parse(JSON.stringify(category));

            let param = {
                from: this.dragCategory.cid,
                to: category.cid
            };
            this.$ajax('post', '/postcategory/drag', param, (data) => {
                this.aCategorys.splice(this.dragIndex, 1);
                this.aCategorys.splice(index, 0, this.dragCategory);

                this.$Message.success('调整顺序成功！');
            });
        },

        togglePost(name) {
            this.page = 1;
            this.myPostJurisdiction = name;
            this.getPosts(this.curCid);
        },
        getPosts(cid) {
            let param = {
                type: 'menu',
                page: this.page,
                perpage: this.perpage
            };
            if (cid || cid == 0) {
                // 不传cid取全部的知识 cid=0表示未分类的知识
                param.cid = cid
            }

            // 按权限显示（'privacy', 'open', 'accredit'中的一种）
            if (this.myPostJurisdiction) {
                param.jurisdiction = this.myPostJurisdiction;
            }

            this.$ajax('get', '/post/list', param, 'spinShow', (data) => {
                this.aPosts = data.data;
                this.iSum = data.total || 0;

                this.firstGetMyPost = false;
            });
        },
        getDraftPosts() {
            let param = {
                type: 'menu',
                page: this.pageDraft,
                perpage: this.perpage
            };

            this.$ajax('get', '/post/list/is_draft', param, 'spinShow', (data) => {
                this.aDraftPosts = data.data;
                this.iSumDraft = data.total;
            });
        },
        toggleOthersPost(name) {
            this.pageOthers = 1;
            this.othersPostJurisdiction = name;
            this.getOthersPosts();
        },
        getOthersUsers() {
            this.$ajax('get', '/post/otherpostclassify', data => {
                this.othersUsers = data.data;
            });
        },
        clickOthersUser(userId) {
            this.othersPostJurisdiction = null;
            this.curCid = null;
            this.curType = 'othersPost';
            this.curOtherId = userId;
            this.getOthersPosts();
        },
        getOthersPosts() {
            let param = {
                page: this.pageOthers,
                perpage: this.perpage
            };
            // 按权限显示（'visit', 'edit'中的一种）
            if (this.othersPostJurisdiction) {
                param.jurisdiction = this.othersPostJurisdiction;
            }

            if (this.curOtherId) {
                param.id = this.curOtherId;
            }

            this.$ajax('get', '/post/otherpostlist', param, 'spinShow', (data) => {
                this.aOthersPosts = data.data.data;
                this.iSumOthers = data.data.total;
            });
        },
        initOthersPost() {
            this.toggleOthersList = true;
            this.toggleCidList = false;
            this.curCid = null;
            this.pageOthers = 1;
            this.othersPostJurisdiction = null;
            this.curOtherId = null;
            this.getOthersPosts();
            this.curType = 'othersPost';
        },

        toCreatePost() {
            this.$router.push({name: 'postEdit', params: {edit_pid: -1, curCid: this.curCid}});
        },
        toHandleDraft(e,post) {
            this.handleDraftPost = post;
            this.$refs.draft_contextmenu.show(e);
        },
        toHandlePost(e,post) {
            this.handlePost = post;
            this.$refs.post_contextmenu.show(e);
        },
        toEditPost() {
            this.$ajax('get', `/post/info/${this.handlePost.pid}/isEditing`, (data) => {
                if(data.is_editing){
                    this.$Message.warning('该知识正在编辑中...');
                }else{
                    this.$router.push({name: 'postEdit', params: {edit_pid: this.handlePost.pid}});
                }
            });
        },
        delPost() {
            this.$refs.post_contextmenu.hide();
            this.$Modal.confirm({
                title: '确认对话框',
                content: '确定删除吗？',
                onOk: () => {
                    this.$ajax('post', `/post/setinfos`, {type:'del', pids:[this.handlePost.pid]}, (data) => {
                        /*改变知识分类的数量*/
                        // 是未分类
                        if (!this.handlePost.cids.length) {
                            this.oCategoryNum[0] += -1;
                        }
                        this.handlePost.cids.forEach(cid => {
                            this.oCategoryNum[cid] += -1;
                        });

                        /*获取知识列表 (优化....)*/
                        if (this.aPosts.length == 1 && this.page > 1) {
                            this.page += -1
                        }
                        this.getPosts(this.curCid);

                        this.$Message.success('删除知识成功！');
                    });
                }
            });
        },
        toggleTop() {
            this.$refs.post_contextmenu.hide();
            let type = this.handlePost.is_puttop? 'untop': 'puttop';
            let param = {type:type, pids:[this.handlePost.pid]};

            this.$ajax('post', `/post/setinfos`, param, (data) => {
                let text = this.handlePost.is_puttop? '取消置顶成功！': '设置置顶成功！'
                this.handlePost.is_puttop = !this.handlePost.is_puttop;

                // 改变位置
                let oPost = Object.assign({}, this.handlePost);
                if (this.handlePost.is_puttop) {
                    this.aPosts = this.aPosts.filter(p => p.pid != this.handlePost.pid);
                    this.aPosts.unshift(oPost);
                } else {
                    this.aPosts = this.aPosts.filter(p => p.pid != this.handlePost.pid);
                    let n = 0;
                    this.aPosts.forEach((p, i) => {
                        if(p.is_puttop) {
                            n = i + 1;
                        }
                    });

                    this.aPosts.splice(n, 0, oPost);
                }

                this.$Message.success(text);
            });
        },
        othersToggleTop() {
            this.$refs.post_contextmenu.hide();

            if (this.handlePost.isputtop) {
                this.$ajax('get', `/post/otherpost/canceltop`, {postid: this.handlePost.pid}, (data) => {
                    this.handlePost.isputtop = 0;
                    let oPost = Object.assign({}, this.handlePost);

                    this.aOthersPosts = this.aOthersPosts.filter(p => p.pid != this.handlePost.pid);
                    let n = 0;
                    this.aOthersPosts.forEach((p, i) => {
                        if(p.isputtop) {
                            n = i + 1;
                        }
                    });
                    this.aOthersPosts.splice(n, 0, oPost);

                    this.$Message.success('取消置顶成功！');
                });
            } else {
                this.$ajax('get', `/post/otherpost/puttop`, {postid: this.handlePost.pid}, (data) => {
                    this.handlePost.isputtop = 1;
                    let oPost = Object.assign({}, this.handlePost);

                    this.aOthersPosts = this.aOthersPosts.filter(p => p.pid != this.handlePost.pid);
                    this.aOthersPosts.unshift(oPost);

                    this.$Message.success('设置置顶成功！');
                });
            }
        },
        toggleSecret() {
            this.$refs.post_contextmenu.hide();
            let type = this.handlePost.is_secret? 'unsecret': 'secret';
            let param = {type: type, pids: [this.handlePost.pid]};

            this.$ajax('post', `/post/setinfos`, param, (data) => {
                let text = this.handlePost.is_secret? '取消私密成功！': '设置私密成功！'
                this.handlePost.is_secret = !this.handlePost.is_secret;

                this.$Message.success(text);
            });
        },
        openCidModal() {
            this.$refs.post_contextmenu.hide();
            this.initCids = this.handlePost.cids;
            this.cidModal = true;
        },
        categorysHaveChange(categorysHaveChange) {
            if (categorysHaveChange) {
                this.getCategorys();
            }
        },
        setPostCid(cids) {
            if (!cids.length) {
                this.$Message.warning('至少选择一项分类！');
                return;
            }

            let URL = '/post/setinfos';
            let send_data = {cids: cids};
            let param = {type: 'changeCatogery', pids: [this.handlePost.pid], data: send_data};

            this.$ajax('post', `/post/setinfos`, param, (data) => {
                /* 改变分类列表数量(原来的类都减一，现在设置的类都加一) */
                // 减一
                if (!this.handlePost.cids.length) {
                    // 未分类
                    this.oCategoryNum[0] += -1;
                }else {
                    this.handlePost.cids.forEach(cid => {
                        this.oCategoryNum[cid] += -1;
                    });
                }
                // 加一
                cids.forEach(cid => {
                    this.oCategoryNum[cid] += 1;
                });

                this.handlePost.cids = cids;

                // 知识已经不再当前cid下
                if (this.curCid != null && !cids.includes(this.curCid)) {
                    this.getPosts(this.curCid);
                }

                this.cidModal = false;
                this.$Message.success('设置分类成功！');
            });
        },
        openAuth(type) {
            this.authModalTit = type == 'edit'? '编辑授权': '阅读授权';
            this.$refs.post_contextmenu.hide();
            this.initUsers = this.handlePost.auth[type];
            this.openAuthType = type;
            this.authModal = true;
        },
        /* 权限(单个设置为覆盖(要传之前有的) */
        setPostAuth(users,ids,isNoChange) {
            if (isNoChange) {
                this.authModal = false;
                return;
            }

            let send_data = null;
            if (this.openAuthType == 'edit') {
                send_data = {
                    edit:ids,
                    view: this.handlePost.auth.view.map(val => val.id)
                }
            } else {
                send_data = {
                    edit:this.handlePost.auth.edit.map(val => val.id),
                    view: ids
                }
            }
            let param = {type: 'auth', pids: [this.handlePost.pid], data: send_data};

            this.$ajax('post', `/post/setinfos`, param, (data) => {

                this.$set(this.handlePost.auth, this.openAuthType, users);

                let text = this.openAuthType == 'edit'? '设置编辑权限成功！': '设置阅读权限成功！';
                this.$Message.success(text);
                this.authModal = false;
            });
        },

        changePage(page, type) {
            switch (type) {
                case 'myPost':
                    this.page = page;
                    this.getPosts(this.curCid);
                    break;
                case 'othersPost':
                    this.pageOthers = page;
                    this.getOthersPosts();
                    break;
                case 'draftPost':
                    this.pageDraft = page;
                    this.getDraftPosts();
                    break;
            }
        },
    },
    filters: {
        formatTime(t) {
            return moment(t).format('YYYY-MM-DD HH:mm');
        }
    }
}
</script>