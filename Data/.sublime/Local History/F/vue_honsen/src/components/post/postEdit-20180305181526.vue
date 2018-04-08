<style lang="stylus">
@import '../../common/stylus/mixin.styl'
hover = #e0f5fe
active = #3dc1ff
.post_edit
    margin 56px auto 0
    padding 0 84px
    width 950px
    border 1px solid #e7e7e7
    background #fff
    position relative
    .ivu-input
        border-color transparent
    .ivu-input:focus
        border-color #3dc1ff
    .main_tit
        margin-top 40px
        height 65px
        border-bottom 1px solid #ebebeb
        .ivu-input
            height 64px
            font-size 18px
            color #3c3c3c
            &:focus
                border-color #fff
                box-shadow: none
    .summary
        margin-top 20px
        height 85px
        .ivu-input
            height 84px
    .editor_wrap
        margin-top 20px
    .btn_wrapwrap
        width: 1200px
        position: fixed
        margin: 0 auto
        top: 74px
        left: 0
        right: 0
    .btn_wrap
        position absolute
        right: 0
        z-index 1000
        width 210px
        text-align right
        white-space: nowrap
        .ivu-tooltip-arrow
            display: none
        .ivu-tooltip-inner
            background: #fff
            border: 1px solid #7d7d7d
            box-shadow: none
            color: #000
            padding: 2px 6px
            min-height: 22px
            border-radius: 3px
        .submit_btn
            margin: 0 4px 0 5px
        .postsubmitbtn
            span
                font: 12px sans-serif
        .ivu-btn span
            display inline-block
            vertical-align middle
        .draft_btn
            background-color transparent
        .draft_icon
            bgImg(16px,21px,'/static/icon/0062.png')
        .drafts_icon
            bgImg(16px,21px,'/static/icon/0063.png')
        .cid_icon
            bgImg(16px,21px,'/static/icon/0064.png')
.draft_modal
    .ivu-modal-body, .ivu-modal-footer
        padding 0
    .tit
        position relative
        height 42px
        line-height 42px
        font-size 16px
        color #333
        background #e8f7fe
        text-align center
        .icon-dacha
            position absolute
            top 0px
            right 0px
            height 42px
            width 42px
            cursor pointer
            .ivu-icon
                font-size 22px
                color #3dc1ff
    .drafts_panel
        padding 0 44px
        height 540px
        overflow-y auto
    .drafts_item
        padding 12px 0 10px
        height 90px
        border-bottom 1px solid #e3e3e3
        .drafts_item_tit
            height 21px
            font-size 14px
            color #333
            cursor pointer
            &:hover,&.active
                color #3dc1ff
        .drafts_item_content
            margin-top 5px
            font-size 12px
            color #777
        .drafts_item_desc
            margin-top 2px
            .drafts_item_desc_time
                float left
                font-size 12px
                color #bebebe
            .drafts_item_desc_del
                float left
                margin-left 10px
                bgImg(15px,21px,'/static/icon/0020_.png')
                cursor pointer
.cid_tid_modal
    .ivu-modal-body
        padding 0
    .tit
        height 62px
        line-height 62px
        font-size 16px
        font-weight bold
        color #333
        text-indent 26px
    .panel
        padding 0 50px 20px
        .ivu-input
            padding 0
            width 85px
            height 26px
            line-height 26px
            border-radius: 17px
            text-align center
        .creat_category
            margin 0px 0 0 20px
            width 70px
            font-size 14px
            color #3dc1ff
            cursor pointer
            &.text:after
                display block
                content ''
                border-top 1px solid active
        .category
            margin-top 5px
            padding-bottom 10px
            height: 148px
            overflow: auto
            .item
                float: left
                margin: 10px
                width 85px
                height 26px
                line-height 26px
                text-align center
                background-color: #fff
                cursor: pointer
                &.is_child
                    background-color: #e1eaef
                &.is_selected
                    color: active
                    border-color active
            .item_pop
                border-radius: 17px
                border: 1px solid #CCCCCC
                .ivu-poptip-content
                    width: 80px
                    a
                        display block
            .categorysList-enter-active,.categorysList-leave-active
                transition: all .5s
            .categorysList-enter,.categorysList-leave-active
                opacity: 0
                transform: translateX(-60px)
    .post_cids
        background #e8f7fe
</style>

<template>
    <div v-if="editable" class="post_edit">
        <Input class="main_tit" type="text" v-model.trim="title" placeholder="请输入文章标题"></Input>

        <Input class="main_tit summary" type="textarea" :rows="3" v-model.trim="summary" placeholder="请输入文章摘要"></Input>

        <editor
            v-if="post_require_ok"
            class="editor_wrap"
            :content="content"
            :needAutoSave="pid != NEW_POST_ID && !is_draft"
            ref="editor_dom">
        </editor>

        <div class="btn_wrapwrap">
            <div class="btn_wrap">
                <Tooltip class="tip" content="保存到草稿箱" placement="bottom" v-if="is_draft || pid == NEW_POST_ID">
                    <Button class="draft_btn" type="text" size="small" @click="submitPost(true)">
                        <div class="draft_icon"></div>
                    </Button>
                </Tooltip>
                <Tooltip class="tip" content="草稿箱" placement="bottom" v-if="authable">
                    <Button class="draft_btn" type="text" size="small" @click="openDraftModal">
                        <div class="drafts_icon"></div>
                    </Button>
                </Tooltip>
                <Tooltip class="tip" content="分类标签" placement="bottom">
                    <Button class="draft_btn" type="text" size="small" @click="openCidAndTidModal(false)">
                        <div class="cid_icon"></div>
                    </Button>
                </Tooltip>
                <Button class="submit_btn postsubmitbtn" type="info" size="small" @click="submitPost(false)">提交</Button><Button type="info" size="small" class="gray_btn postsubmitbtn" @click="$router.push({name: 'postList'})">返回</Button>
            </div>
        </div>

        <Spin size="large" v-if="spinShow">
            <Icon type="load-c" size=18 class="spin-icon-load"></Icon>
            <div>知识提交中...</div>
        </Spin>

        <Modal
            v-if="draftModal"
            v-model="draftModal"
            :closable="false"
            :mask-closable="false"
            width="456"
            :data-transfer="false"
            class-name="draft_modal">
            <div class="tit">
                草稿箱
                <div class="icon-dacha" @click.stop="draftModal = false">
                    <Icon type="android-close"></Icon>
                </div>
            </div>
            <div class="drafts_panel" v-scrollUnique>
                <template v-if="init_drafts_ok">
                    <div
                        v-if="draft_list.length" v-for="(draft,index) in draft_list"
                        :key="index"
                        class="drafts_item">
                        <div class="drafts_item_tit single_ellipsis" @click="$router.push({name: 'postEdit', params: {edit_pid: draft.pid}})">{{draft.title}}</div>
                        <div class="single_ellipsis drafts_item_content" v-html="draft.summary || '　'"></div>
                        <div class="drafts_item_desc">
                            <div class="drafts_item_desc_time">{{draft.time}}</div>
                            <div class="drafts_item_desc_del" @click.stop="delDraft(draft,index)"></div>
                        </div>
                    </div>
                    <div v-if="!draft_list.length" class="drafts_item" style="padding-top: 25px;">草稿箱暂无内容！</div>
                </template>
            </div>
            <div slot="footer"></div>
        </Modal>

        <Modal
            v-if="cidAndTidModal"
            v-model="cidAndTidModal"
            :closable="false"
            :mask-closable="false"
            width="650"
            :data-transfer="false"
            class-name="cid_tid_modal">

            <div class="post_cids" v-if="authable">
                <div class="tit">选择分类</div>
                <div class="panel">
                    <div class="creat_category text" v-if="createCategoryText" @click.stop="toCreateCategory">创建分类+</div>
                    <Input
                        v-else
                        class="creat_category"
                        ref="createCategoryInput"
                        v-model="createCategoryModel"
                        placeholder="输入新分类"
                        @on-blur="createCategory">
                    </Input>
                    <div class="category">
                        <transition-group v-if="categorys.length>0" name="categorysList" class="clearfix">
                            <div v-for="(category,index) in categorys"
                                :key="index"
                                @click="category.isPreselection = !category.isPreselection">
                                <Input
                                    v-if="category.is_editing"
                                    class="item item_input"
                                    :ref="'category_input_'+category.cid"
                                    type="text"
                                    v-model="category.editname"
                                    @on-blur="editCategory(category)">
                                </Input>

                                <div
                                    v-else
                                    class="item item_pop single_ellipsis"
                                    style="width: 85px"
                                    title="右键编辑"
                                    @contextmenu.prevent="toHandleCategory($event,category)"
                                    :class="{is_selected: category.isPreselection}">
                                    {{category.name}}
                                </div>
                            </div>
                        </transition-group>
                    </div>
                </div>
            </div>

            <div class="post_tags">
                <div class="tit">选择标签</div>
                <div class="panel">
                    <div class="creat_category text" v-if="createTagText && authable" @click.stop="toCreateTag">创建标签+</div>
                    <Input  v-if="!createTagText"
                            class="creat_category"
                            ref="creat_tag_input"
                            v-model.trim="creat_tag_model"
                            placeholder="输入新标签"
                            @on-blur="createTag">
                    </Input>

                    <div class="category">
                        <transition-group v-if="posttags.length>0" name="categorysList" class="clearfix">
                            <div v-if="authable || !tag.is_self" v-for="(tag,index) in posttags" :key="index" @click="getTags(tag,index)">

                                <Input
                                    v-if="tag.is_editing"
                                    class="item item_input"
                                    :ref="'tag_input_'+tag.tid"
                                    type="text"
                                    v-model="tag.editname"
                                    @on-blur="editTag(tag)">
                                </Input>

                                <div
                                    v-else
                                    class="item item_pop single_ellipsis"
                                    style="width: 85px"
                                    :title="tag.is_self? '右键编辑': ''"
                                    @contextmenu.prevent="toHandleTag($event,tag)"
                                    :class="{is_child: tag.is_child,is_selected: tag.isPreselection}">
                                    {{tag.name}}
                                </div>

                            </div>
                        </transition-group>
                    </div>
                </div>
            </div>

            <div slot="footer">
                <Button v-if="!isFromSubmit" class="submit_btn" type="info" @click="confirmCidAndTid">确 定</Button>
                <Button v-if="!isFromSubmit" type="info" class="gray_btn" @click="cancelCidAndTid">取 消</Button>
                <Button v-if="isFromSubmit" type="info" @click="submitPost(false)">提 交</Button>
            </div>
        </Modal>

        <contextMenu ref="cidsContextmenu">
            <div class="contextMenu_item" @click.stop="toEditCategory">编辑</div>
            <div class="contextMenu_item" @click.stop="delCategory">删除</div>
        </contextMenu>

        <contextMenu ref="tagsContextmenu">
            <div class="contextMenu_item" @click.stop="toEditTag">编辑</div>
            <div class="contextMenu_item" @click.stop="delTag">删除</div>
        </contextMenu>

    </div>
</template>

<script>
import moment from 'moment';
import editor from '@/components/common/editorPost';
import contextMenu from '@/components/common/contextMenu';
const NEW_POST_ID = -1;
let noticeEditingTimer = null;
export default {
    name: 'postEdit',
    components: {editor,contextMenu},
    data() {
        return {
            listCurCid: null,
            NEW_POST_ID,
            pid: '', // 知识id
            post: {},
            authable: true, // 是否为自己的知识
            editable: false,
            /* 分类 */
            categorysInited: false, // 初始化获取ok了
            categorys: [],
            createCategoryText: true,
            createCategoryModel: '',
            curCategory: null,
            /* 标签 */
            tagsInited: false,
            posttags: [],
            createTagText: true,
            creat_tag_model: '',
            tids: [],
            curTag: null,
            /* 文章 */
            title: '',  // 储存？..
            /* 摘要 */
            summary: '',
            /* 编辑区内容 */
            content: '',
            post_require_ok: false,
            /* 初始 */
            initCids: [],
            initTids: [],
            /* 草稿箱 */
            draft_list: [],
            init_drafts_ok: false,
            spinShow: false,
            is_draft: false,

            draftModal: false,
            cidAndTidModal: false,
            openedCidAndTidModal: false, // 打开过cidAndTidModal
            isFromSubmit: false,
            canleave: false
        }
    },
    computed: {
        posttagsIds() {
            return this.posttags.concat().map(item => item.tid);
        }
    },
    created() {
        this.pid = Number(this.$route.params.edit_pid);
        this.listCurCid = Number(this.$route.params.curCid);
    },
    mounted() {
        if (this.pid == NEW_POST_ID) {
            this.editable = true;
            this.post_require_ok = true;

            if (this.listCurCid) {
                this.initCids.push(this.listCurCid);
            }

            this.getTags(); // 没登录状态？？？
        } else {
            this.getPost();
        }

        window.localStorage.post_id = this.pid;
        window.localStorage.post_hash = '';

        window.addEventListener('scroll', this.scrollHandle, false);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.scrollHandle, false);
        window.onscroll = null; // 解除编辑器的onscroll

        clearTimeout(noticeEditingTimer);

        this.toQuit();

        window.localStorage.removeItem('post_id');
        window.localStorage.removeItem('post_hash');

        /* 清除编辑器生成的弹出框dom标签（插在body里） */
        let oEdui = document.getElementById('edui_fixedlayer');
        oEdui && oEdui.parentNode.removeChild(oEdui);
    },
    methods: {
        scrollHandle() {
            let top = document.documentElement.scrollTop || document.body.scrollTop;
            if (top > 0) {
                document.querySelector('.edui-editor-toolbarbox').style.boxShadow = '0px 3px 10px rgba(0,0,0,0.2)';
            } else {
                document.querySelector('.edui-editor-toolbarbox').style.boxShadow = 'none';
            }
        },
        toHandleCategory(e, category) {
            this.curCategory = category;
            this.$refs.cidsContextmenu.show(e);
        },
        toHandleTag(e, tag) {
            if (tag.is_self) {
                this.curTag = tag;
                this.$refs.tagsContextmenu.show(e);
            }
        },
        getPost() {
            this.$ajax('get', `/post/info/${this.pid}`, (data) => {
                if (!data.data.editable) {
                    this.$Message.error('无权编辑！');
                    return;
                }
                this.editable = data.data.editable;
                this.authable = data.data.authable;
                this.title = data.data.title;
                this.content = data.data.content;
                this.summary = data.data.summary;
                this.is_draft = data.data.is_draft;
                this.post_require_ok = true;
                // 已有分类、标签
                this.initTids = data.data.tags.map(val => val.tid);
                this.initCids = data.data.cids? data.data.cids: [];

                this.notice_editing();
            });
        },
        notice_editing() {
            if (this.is_draft) {
                return false;
            }

            // 通知服务器知识正在编辑中
            this.$ajax('get', `/post/edit/during/${this.pid}`, (data) => {
                console.log('通知服务器知识正在编辑中的请求成功！');
            });

            // 轮询
            noticeEditingTimer = setTimeout(() => {
                this.notice_editing();
            },175000);
        },
        toQuit() {
            if (this.pid == NEW_POST_ID || this.is_draft) {
                return false;
            }

            this.$ajax('get', `/post/edit/quit/${this.pid}`, (data) => {
                console.log('edit quit ok');
            });
        },
        submitPost(is_draft) {
            if(!this.title){
                this.$Message.warning('标题不能为空！');
                return;
            }

            let param = {
                'title': this.title,
                'summary': this.summary,
                'content': this.$refs.editor_dom.get_content().replace(/&amp;/g, '&'),// 将内容的 &amp; 转化为 &
                'cids': this.categorysInited? this.categorys.filter(val => val.isPreselection).map(item => item.cid): this.initCids,
                'tags': this.tagsInited? this.posttags.filter(val => val.isPreselection).map(item => item.tid).concat(this.initTids.filter(tid => !this.posttagsIds.includes(tid))): this.initTids,
                'is_draft': is_draft? true: false
            };

            if (!is_draft && this.pid == NEW_POST_ID && !this.openedCidAndTidModal && !param.cids.length) {
                this.openCidAndTidModal(true);
                return;
            }

            if (this.pid != NEW_POST_ID) {
                param.pid = this.pid;
            } else {
                /* 新建时需传上传文件的hash */
                param.hash_strs = window.localStorage.post_hash || '';
            }
            // 可直接离开当前页面
            this.canleave = true;
            this.$ajax('post', '/post/postsubmit', param, 'spinShow', (data) => {
                this.$refs.editor_dom.clearlocaldata();

                if (is_draft) {
                    if (this.pid == NEW_POST_ID) {
                        this.$router.push({name: 'postEdit', params: {edit_pid: data.pid}});
                    } else {
                        /* 更新草稿箱列表的数据 */
                        if (this.init_drafts_ok) {
                            let obj = {
                                pid: data.pid,
                                title: this.title,
                                summary: this.summary || this.$refs.editor_dom.get_content_text().substr(0,200),
                                time: moment().format('YYYY-MM-DD HH:mm'),
                            };
                            this.draft_list.forEach((val,i,arr) => {
                                if(val.pid == data.pid){
                                    arr.splice(i,1);
                                }
                            });
                            this.draft_list.unshift(obj);
                        }
                    }

                    this.$Message.success('草稿提交成功！');
                } else {
                    this.$Message.success('知识提交成功！');
                    this.$router.push({name: 'postRead', params: {read_pid: data.pid}});
                }
            });
        },
        openDraftModal() {
            this.draftModal = true;
            this.getDraftPosts();
        },
        openCidAndTidModal(isFromSubmit) {
            this.isFromSubmit = isFromSubmit;

            this.openedCidAndTidModal = true;
            this.cidAndTidModal = true;

            this.getCategorys();
            if (!this.tagsInited) {
                this.getTags();
            }
        },
        confirmCidAndTid() {
            this.posttags.forEach(item => {
                item.is_selected = item.isPreselection;
            });
            this.categorys.forEach(item => {
                item.is_selected = item.isPreselection;
            });
            this.cidAndTidModal = false;
        },
        cancelCidAndTid() {
            this.posttags.forEach(item => {
                item.isPreselection = item.is_selected;
            });
            this.categorys.forEach(item => {
                item.isPreselection = item.is_selected;
            });
            this.cidAndTidModal = false;
        },
        toEditCategory() {
            this.$refs.cidsContextmenu.hide();
            this.curCategory.is_editing = true;
            this.$nextTick(() => {
                this.$refs[`category_input_${this.curCategory.cid}`][0].focus();
            });
        },
        editCategory(category) {
            category.is_editing = false;
            if( category.editname == category.name ){
                return false;
            }

            this.$ajax('post', '/postcategory/update', {cid: category.cid,name: category.editname}, (data) => {
                category.name = category.editname;
                this.$Message.success('编辑分类成功！');
            });
        },
        delCategory() {
            this.$refs.cidsContextmenu.hide();
            this.$Modal.confirm({
                title: '确认对话框',
                content: '确定删除吗？',
                onOk:() => {
                    this.$ajax('post', '/postcategory/del', {cid: this.curCategory.cid}, (data) => {
                        this.categorys = this.categorys.filter(val => val.cid != this.curCategory.cid);
                        this.$Message.success('删除分类成功！');
                    });
                },
            });
        },
        toCreateCategory() {
            this.createCategoryText = false;
            this.$nextTick(() => {
                this.$refs.createCategoryInput.focus();
            });
        },
        createCategory() {
            if (!this.createCategoryModel) {
                this.createCategoryText = true;
            } else {
                this.$ajax('post', '/postcategory/add', {name: this.createCategoryModel}, (data) => {
                    let obj = {
                        cid: data.cid,
                        name: this.createCategoryModel,
                        is_editing: false,
                        is_selected: false,
                        isPreselection: false,
                        editname: this.createCategoryModel,
                        num: 0
                    }
                    this.categorys.push(obj);
                    this.createCategoryModel = '';

                    this.$Message.success('创建分类成功！');
                });

                this.createCategoryText = true;
            }

        },
        getCategorys() {
            if (this.categorysInited) {
                return;
            }

            this.$ajax('get', '/postcategory/list', {type: 'menu'}, (data) => {
                data.data.pop();

                this.categorys = data.data.map(val => {
                    val.is_selected = this.initCids.includes(val.cid)? true: false;
                    val.isPreselection = val.is_selected,
                    val.is_editing = false;
                    val.editname = val.name;
                    return val;
                });

                this.categorysInited = true;
            });
        },
        toEditTag() {
            this.$refs.tagsContextmenu.hide();
            this.curTag.is_editing = true;
            this.$nextTick(() => {
                this.$refs[`tag_input_${this.curTag.tid}`][0].focus();
            });
        },
        editTag() {
            this.curTag.is_editing = false;

            if( this.curTag.editname == this.curTag.name ){
                return false;
            }

            this.$ajax('post', `/knowledge/tag/${this.curTag.tid}`, {name: this.curTag.editname}, (data) => {
                this.curTag.name = this.curTag.editname;
                this.$Message.success('编辑标签成功！');
            });
        },
        delTag() {
            this.$refs.tagsContextmenu.hide();
            this.$Modal.confirm({
                title: '确认对话框',
                content: '确定删除吗？',
                onOk:() => {
                    this.$ajax('post', `/knowledge/tag/${this.curTag.tid}/del`, (data) => {
                        this.posttags = this.posttags.filter(tag => tag.tid != this.curTag.tid);

                        this.$Message.success('删除标签成功！');
                    });
                },
            });
        },
        createTag() {
            if (!this.creat_tag_model) {
                this.createTagText = true;
            } else {
                this.$ajax('post', '/knowledge/tag', {name: this.creat_tag_model}, (data) => {
                    this.posttags.push({
                        is_child: false,
                        is_selected: false,
                        isPreselection: false,
                        is_self: true,
                        tid: data.tid,
                        name: this.creat_tag_model,
                        editname: this.creat_tag_model,
                        is_editing: false
                    });

                    this.creat_tag_model = '';
                    this.$Message.success('标签创建成功！');
                });

                this.createTagText = true;
            }

        },
        toCreateTag() {
            this.createTagText = false;
            this.$nextTick(() => {
                this.$refs.creat_tag_input.focus();
            });
        },
        getTags(tag, i) {
            /* 点击获取时 */
            if(tag){
                tag.isPreselection = !tag.isPreselection;
            }

            // 过滤子标签、自创建标签和请求过的一级标签
            let id = tag && tag.tid;
            if(id && (this.tids.includes(id) || tag.is_child || tag.is_self)) {
                return;
            }

            let URL = id?`/knowledge/tag/${id}`: `/knowledge/tag`;
            this.$ajax('get', URL,(data) => {

                let _data = data.data.map((val) => {
                    val.is_selected = this.initTids.includes(val.tid)? true: false;
                    val.isPreselection = val.is_selected,
                    val.is_editing = false;
                    val.is_child = id? true: false;
                    val.editname = val.name;
                    return val;
                });

                if (id) {
                    // 记录请求过的tid
                    this.tids.push(id);

                    // 获取子tag
                    this.posttags.splice(i+1,0,..._data);
                }else{
                    this.posttags = _data
                }

                this.tagsInited = true;
            });
        },
        getDraftPosts() {
            if (this.init_drafts_ok) {
                return;
            }

            this.$ajax('get', '/post/list/is_draft', {page: 1, perpage: 1000, type: 'menu'}, (data) => {
                this.draft_list = data.data;
                this.init_drafts_ok = true;
            });
        },
        delDraft(draft,index) {
            this.$Modal.confirm({
                title: '确认对话框',
                content: '确定删除吗？',
                onOk: () => {
                    this.$ajax('post', '/post/setinfos', {type: 'del', pids: [draft.pid]}, (data) => {
                        let _pid = draft.pid;
                        this.draft_list.splice(index,1);
                        this.$Message.success('删除草稿成功！');

                        if(_pid == this.pid) {
                            /* 删除当前打开的草稿时，跳转至新建状态 */
                            this.$router.push({name: 'postEdit', params: {edit_pid: NEW_POST_ID}});
                        }
                    });
                }
            });
        },
    },
    beforeRouteLeave(to, from, next) {
        if( from.path == "/post/edit/-1" && (this.title || this.summary || this.$refs.editor_dom.get_content()) && !this.canleave ){
            this.$Modal.confirm({
                title: '确认对话框',
                content: '当前内容未保存，确定离开吗？',
                onOk: () => {
                    next();
                },
                onCancel: () => {
                    this.$store.commit('changeHeadMenuKey');
                    next(false);
                }
            });
        }else{
            next();
        }
    }
}
</script>