<style lang="stylus">
@import '../../common/stylus/mixin.styl'
$active = #3dc1ff

.side_collect
    .search_box
        position absolute
        top 10px
        left 130px
        width 150px
        height 34px
        .btn
            position absolute
            top 1px
            right 1px
            bgImg(19px, 30px, '/static/icon/header_search_icon.png')
    .side_post,.side_link
        height 70px
        line-height 70px
        text-indent 40px
        font-size 16px
        color #4d4d4d
        cursor pointer
        &.active
            background-color #fff
            color $active
        .ivu-icon
            margin-right 10px
            vertical-align text-bottom
            font-size 21px
    .ivu-collapse
        background-color: transparent
        border-radius: 0
        border: none
        .ivu-collapse-item
            border none
            .ivu-collapse-header
                padding-left: 80px
                height 60px
                line-height 60px
                font-size 16px
                color #4d4d4d
                border-bottom 1px solid #e6e6e6
                .tag_icon
                    margin-right 10px
                    transform rotate(0deg)
                .tag_edit_icon
                    padding 5px
                    position absolute
                    right 20px
                    top 20px
                    transform rotate(360deg)
                .ivu-icon-arrow-right-b
                    position absolute
                    top 24px
                    left 150px
                    transform rotate(90deg)
                    &::befor
                        content "\F107"
                
            .ivu-collapse-content
                padding 0
                .ivu-collapse-content-box
                    padding 0
                    font-size 14px
                    .tag_list
                        height 266px
                        overflow-y auto
                        &.noData
                            margin-top 0
                            padding-top 20px
                    .tag_item
                        height 40px
                        line-height 40px
                        color #4d4d4d
                        text-align center
                        cursor pointer
                        &.active,&:hover
                            color $active
                            background: #fff
        .ivu-collapse-item-active
            background: #f8f8f8
            color $active
            .ivu-collapse-header
                background: #f8f8f8
                color $active
                .ivu-icon-arrow-right-b
                    transform rotate(270deg)
            .ivu-collapse-content,.ivu-collapse-content-box
                background: #f8f8f8
                color $active

    .main_tit
        height 100%
        line-height 53px
        position relative
        border-bottom 1px solid #dcdcdc
        .tit_text
            text-indent 40px
            font-size 18px
            color #5b5b5b
        .add_icon
            position absolute
            top 12px
            right 50px
            addIcon(#3dc1ff)
    .main_list
        height 467px
        overflow auto
    .main_item
        padding 20px 40px
        cursor pointer
        &:hover, &.active
            background-color #f8f8f8
        .tit
            font-size 16px
            color #404040
        .content
            margin-top 5px
            font-size 12px
            color #777
        .thumb
            margin-left 90px
        .assistText
            padding-top 2px
            text-align right
            font-size 12px
            color #9d9d9d
        .img
            float left
            width: 80px
            height: 47px
            overflow: hidden
            background-size cover
            background-repeat no-repeat
    .main_item_link
        cursor default
    .noData 
        margin-top 20px
        text-align center
        color #777

.add_link_form
    margin 25px 25px -30px

.collect_post_modal
    .add_category_panel
        .add_category_panel_tit
            padding: 10px 0px 20px 15px
            border-bottom 1px solid #e9eaec
            font-size 16px
            color #7a7a7a
        .creat_category
            margin 15px 0 0 20px
            width 70px
            font-size 14px
            color #3dc1ff
            cursor pointer
            .ivu-input
                border-radius 16px
        .category
            margin-top 5px
            width: 100%
            .item
                float: left
                margin: 10px 18px
                width 85px
                height 30px
                line-height 30px
                text-align center
                background-color: #fff
                cursor: pointer
                &.is_selected
                    background-color: #3dc1ff
                    color: #fff
                    border: 1px solid transparent
            .item_input
                .ivu-input
                    border-radius: 17px
            .item_pop
                border-radius: 17px
                border: 1px solid #CCCCCC
                .ivu-poptip-body
                    padding 8px 16px
                .ivu-poptip-content
                    width: 80px
                    a
                        display block
            .categorysList-enter-active,.categorysList-leave-active
                transition: all .5s
            .categorysList-enter,.categorysList-leave-active
                opacity: 0
                transform: translateX(-60px)
        .add_category_panel_input
            margin-top 20px
            width 245px
        .add_category_panel_btn_wrap
            margin-top 20px
            text-align center
</style>
<template>
    <div class="side_collect">
        <sideBase ref="sideBase">
            <div slot="side">
                <div class="search_box">
                    <Input v-model.trim="searchText" placeholder="搜索收藏内容" @on-enter="search"></Input>
                    <Button class='btn' type="text" @click.stop="search"></Button>
                </div>
                
                <div class="side_post" @click="toggleSide('post')" :class="{active: side_type == 'post'}"><Icon type="android-apps"></Icon>知识收藏</div>
                <div class="side_link" @click="toggleSide('link')" :class="{active: side_type == 'link'}"><Icon type="link"></Icon>链接</div>
                
                <Collapse v-model="side_type" accordion @on-change="change_ollapse_panel">
                    <Panel name="tag">
                        <Icon class="tag_icon" type="pricetag"></Icon>标签
                        <span @click.stop="toEditTagFromMenu">
                            <Icon v-if="side_type == 'tag'" class="tag_edit_icon" type="edit"></Icon>
                        </span>
                        <template slot="content">
                            <div v-if="categorys.length" class="tag_list">
                                <div
                                    class="tag_item"
                                    :class="{active: current_category && current_category.cid == category.cid}"
                                    @click="to_get_category_posts(category)"
                                    v-for="category in categorys"
                                    :key="category.cid">
                                    {{category.name}}
                                </div>
                            </div>
                            <div v-if="!firstGetcategorys && !categorys.length" class="tag_list noData">
                                暂无标签！<a href="javascript:;" @click="collectPostModal = true">去创建</a>
                            </div>
                        </template>
                    </Panel>
                </Collapse>

            </div>

            <div slot="mainTit" class="main_tit">
                <div class="tit_text">收 藏</div>
                <div class="add_icon" v-if="side_type == 'link'" @click="toAddLink">+</div>
            </div>

            <div slot="main" style="position: relative">
                <div v-show="side_type == 'post' || side_type == 'tag' || side_type == 'search'" class="main_list">
                    <div 
                        v-if="showPost(post)"
                        v-for="post in posts" 
                        :key="post.pid" 
                        @click="clickPost(post)" 
                        title="右键编辑" 
                        @contextmenu.prevent="toHandlePost($event, post)">
                        <Row class="main_item" :class="{active: current_post && post.pid == current_post.pid}">
                            <Col span="17">
                                <div 
                                    v-if="post.thumb" 
                                    class="img" 
                                    :style="{'backgroundImage': `url('${post.thumb}')`}">
                                </div>
                                <div class="tit single_ellipsis" :class="{thumb: post.thumb}" v-html="post.title || '　'"></div>
                                <div class="content single_ellipsis" :class="{thumb: post.thumb}" v-html="post.summary || '　'"></div>
                            </Col> 
                            <Col span="7" class="assistText">
                                <div>{{post.updated_at | timeFormat}}</div>
                                <div>作者：{{post.user_name}}</div>
                            </Col>
                        </Row>
                    </div>
                    <infinite-loading @infinite="onInfinite" ref="infiniteLoading">
                        <span slot="no-more">没有更多收藏的知识了！</span>
                        <span slot="no-results">{{posts.length? '': '暂无收藏的知识！'}}</span>
                    </infinite-loading>
                </div>
                
                <div v-if="links.length" v-show="side_type == 'link'" class="main_list">
                    <div v-for="link in links" :key="link.id" title="右键编辑" @contextmenu.prevent="toHandleLink($event,link)">
                        <Row class="main_item main_item_link" :class="{active: current_link && link.id == current_link.id}">
                            <Col span="17">
                                <div class="tit single_ellipsis">{{link.name}}</div>
                                <div class="content single_ellipsis">
                                    <a v-if="link.href" :href="link.href.indexOf('http') == -1? ('http://'+link.href): link.href" target="_blank">
                                        {{link.href.indexOf('http') == -1? ('http://'+link.href): link.href}}
                                    </a>
                                </div>
                            </Col>
                            <Col span="7" class="assistText">
                                <div>{{link.updated_at}}</div>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div v-else v-show="side_type == 'link'" class="noData">暂无收藏链接！</div>

                <Spin size="large" :fix="true" v-if="spinShow">
                    <Icon type="load-c" size=18 class="spin-icon-load"></Icon>
                </Spin>
            </div>
        </sideBase>


        <Modal
            v-model="addLinkModal"
            :closable="false"
            :mask-closable="false"
            width="545"
            class-name="addLinkModal">
            <div class="modal_tit">添加收藏信息</div>
            <Form v-if="addLinkModal" :model="link_modal" :rules="ruleValidate" ref="link_add_form" class="add_link_form">
                <FormItem prop="href">
                    <Input v-model.trim="link_modal.href" placeholder="请输入网址"></Input>
                </FormItem>
                <FormItem prop="name">
                    <Input v-model.trim="link_modal.name" placeholder="请输入网址名称"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="submitLink('link_add_form')" :disabled="submitLinking" type="info">确 定</Button>
                <Button @click="closeLinkModal" type="info" class="gray_btn">取 消</Button>
            </div>
        </Modal>

        <contextMenu ref="link_contextmenu">
            <div class="contextMenu_item" @click.stop="toEditLink">编辑</div>
            <div class="contextMenu_item" @click.stop="delLink">删除</div>
        </contextMenu>

        <contextMenu ref="post_contextmenu">
            <div class="contextMenu_item" @click.stop="toEditTag">分类</div>
            <div class="contextMenu_item" @click.stop="delPostCollect">删除</div>
        </contextMenu>

        <Modal
            v-model="collectPostModal"
            :closable="false"
            :mask-closable="false"
            width="545"
            class-name="collect_post_modal">
            <div class="modal_tit">编辑标签</div>
            <div class="add_category_panel">
                <div class="creat_category" v-if="show_creat_category_text" @click.stop="to_creat_category_input">创建标签+</div>
                <Input class="creat_category" ref="creat_category_input" v-else v-model.trim="creat_category_model" @on-blur="creat_category"></Input>
                <div v-if="categorys.length>0" class="category">
                    <transition-group name="categorysList" class="clearfix">
                        <div v-for="(category,index) in categorys"
                            :key="index"
                            class="list"
                            v-show="category.cid != 0"
                            @click="category.is_selected = !category.is_selected">
                            <Input 
                                v-if="category.is_editing"
                                class="item item_input"
                                :ref="'item_input_'+category.cid"
                                type="text"
                                v-model="category.editname"
                                @on-blur="edit_category(category)">
                            </Input>

                            <div 
                                v-else 
                                class="item item_pop single_ellipsis"
                                title="右键编辑" 
                                @contextmenu.prevent="toHandleCategory($event,category)"
                                :class="{is_selected: category.is_selected}">
                                {{category.name}}
                            </div>

                            <contextMenu
                                :ref="`category_contextmenu${category.cid}`">
                                <div class="contextMenu_item" @click.stop="to_edit_category(category)">编辑</div>
                                <div class="contextMenu_item" @click.stop="del_category(category.cid,index)">删除</div>
                            </contextMenu>

                        </div>
                    </transition-group>
                </div>
            </div>
            <div slot="footer">
                <Button @click="setTag" type="info">确 定</Button>
                <Button @click="collectPostModal = false" type="info" class="gray_btn">取 消</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import moment from 'moment';
import sideBase from './sideBase';
import contextMenu from '@/components/common/contextMenu';
import InfiniteLoading from 'vue-infinite-loading';
export default {
    name: 'collect',
    components: {sideBase,contextMenu,InfiniteLoading},
    data() {
        return {
            searchText: '',
            side_type: 'post', // post tag link search
            current_tag: 1,
            links: [],
            firstGetlinks: true,
            spinShow: false,
            /* 知识 */
            page: 1,
            perpage: 7,
            posts: [],
            current_post: null,
            collectPostModal: false,
            show_creat_category_text: true,
            creat_category_model: '',
            categorys: [],
            firstGetcategorys: true,
            current_category: null,
            init_cids: [],
            /* 链接 */
            addLinkModal: false,
            submitLinking: false,
            current_link: null,
            link_modal: {
                name: '',
                href: '',
            },
            ruleValidate: {
                name: [
                    { required: true, message: '名称不能为空', trigger: 'change' }
                ],
                href: [
                    { required: true, message: '网址不能为空', trigger: 'change' }
                ],
            },

        }
    },
    watch: {
        side_type(newval,oldval){
            if (newval == 'tag') {
                this.get_categorys();
            }
        },
        current_post(newval,oldval) {
            if (newval) {
                this.init_selected_cids();
            }
        },
    },
    methods: {
        showPost(post) {
            if (this.current_category) {
                return post.cids.includes(this.current_category.cid);
            } else {
                return true;
            }
        },
        toEditTagFromMenu() {
            this.collectPostModal = true;
            this.get_categorys();
        },
        infiniteReset() {
            this.posts = [];
            this.page = 1;
            this.$nextTick(() => {
                this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
            });
        },
        onInfinite($state){
            let URL = '';
            if (this.side_type == 'post') {
                URL = `/post/collect/list?page=${this.page}&perpage=${this.perpage}`;
            } else if(this.side_type == 'tag') {
                URL = `/post/list?type=collect&page=${this.page}&perpage=${this.perpage}&cid=${this.current_category.cid}`;
            } else {
                URL = `/search/mycollectposts/${this.searchText}?page=${this.page}&perpage=${this.perpage}`;
            }

            this.$http.get(URL).then(response => {
                let data = response.data;
                if( data.retcode == RETCODE_OK ){
                    this.posts.push(...data.data);
                    if (data.data.length < this.perpage) {
                        $state.complete();
                    } else {
                        this.page += 1;
                        $state.loaded();
                    }
                }else{
                    this.$Message.error(response.data.errmsg);
                }
            }).catch(err => {});

        },
        to_get_category_posts(category) {
            this.current_category = category;
            this.infiniteReset()
        },
        search() {
            this.side_type = 'search';
            if (!this.searchText) {
                return false;
            }

            this.infiniteReset();
        },
        setTag() {
            /* 第一次去创建标签 */
            if (!this.current_post) {
                this.collectPostModal = false;
                return false;
            }

            let cids =  [];
            this.categorys.forEach(val => {
                if (val.is_selected) {
                    cids.push(val.cid);
                }
            });

            let URL = `/post/postsubmit/tag`;
            let param = {
                pid: this.current_post.pid,
                cids: cids
            };
            this.$http.post(URL,param).then(response => {
                let data = response.data;
                if( data.retcode == RETCODE_OK ){
                    this.current_post.cids = cids;
                    this.collectPostModal = false;
                }else{
                    this.$Message.error(response.data.errmsg);
                }
            }).catch(err => {});
        },
        init_selected_cids() {
            if (this.current_post && this.current_post.cids) {
                this.categorys.forEach((val) => {
                    if (this.current_post.cids.includes(val.cid)) {
                        val.is_selected = true;
                    } else {
                        val.is_selected = false;
                    }
                });
            } else {
                this.categorys.map(val => {
                    val.is_selected = false;
                    return val;
                })
            }
        },
        /* 标签操作 */
        get_categorys() {
            if (!this.firstGetcategorys) {
                return false;
            }
            let URL = `/postcategory/list?type=collect`;
            this.$http.get(URL).then(response => {
                let data = response.data;
                if( data.retcode == RETCODE_OK ){
                    this.categorys = data.data.concat().map(val => {
                        val.is_editing = false;
                        val.editname = val.name;
                        val.is_selected = false;
                        return val;
                    });

                    this.init_selected_cids();

                    this.firstGetcategorys = false;
                }else{
                    this.$Message.error(response.data.errmsg);
                }
            }).catch(err => {})
        },
        to_creat_category_input() {
            this.show_creat_category_text = false;
            this.$nextTick(() => {
                this.$refs.creat_category_input.focus();
            });
        },
        creat_category() {
            if (!this.creat_category_model) {
                this.show_creat_category_text = true;
                return;
            }
            let URL = `/postcategory/add`;
            this.$http.post(URL,{name: this.creat_category_model, type: 'collect'}).then(response => {
                let data = response.data;
                if( data.retcode == RETCODE_OK ){
                    let obj = {
                        cid: data.cid,
                        name: this.creat_category_model,
                        is_editing: false,
                        editname: this.creat_category_model,
                        is_selected: false,
                    }
                    this.categorys.unshift(obj);
                    this.creat_category_model = '';
                    this.show_creat_category_text = true;
                    this.$Message.success('创建标签成功！');
                }else{
                    this.$Message.error(response.data.errmsg);
                }
            }).catch(err => {
                console.log(err);
            });
        },
        /* 删除分类 */
        del_category(cid,index) {
            this.cur_contextmenu.hide();
            this.$nextTick(() => {
                this.$Modal.confirm({
                    title: '确认对话框',
                    content: '确认删除吗？',
                    onOk: () => {
                        let URL = `/postcategory/del`;
                        this.$http.post(URL,{cid: cid}).then(response => {
                            let data = response.data;
                            if( data.retcode == RETCODE_OK ){
                                this.categorys.splice(index,1);
                                this.$Message.success('删除标签成功！');
                            }else{
                                this.$Message.error(response.data.errmsg);
                            }
                        }).catch(err => {});
                    }
                });
            });
        },
        toHandleCategory(e, category) {
            this.cur_contextmenu && this.cur_contextmenu.hide();

            this.$refs[`category_contextmenu${category.cid}`][0].show(e);
            this.cur_contextmenu = this.$refs[`category_contextmenu${category.cid}`][0];
        },
        to_edit_category(category) {
            this.cur_contextmenu.hide();
            this.$nextTick(() => {
                category.is_editing = true;
                this.$nextTick(() => {
                    this.$refs[`item_input_${category.cid}`][0].focus();
                });
            });
        },
        /* 重命名分类 */
        edit_category(category) {
            category.is_editing = false;
            if( category.editname == category.name ){
                return false;
            }
            let URL = `/postcategory/update`;
            this.$http.post(URL,{cid: category.cid,name: category.editname, type: 'collect'}).then(response => {
                let data = response.data;
                if( data.retcode == RETCODE_OK ){
                    category.name = category.editname;
                    this.$Message.success('编辑标签成功！');
                }else{
                    this.$Message.error(response.data.errmsg);
                }
            }).catch(err => {});
        },
        getLinks() {
            if (!this.firstGetlinks) {
                return false;
            }
            this.spinShow = true;
            let URL = 'links';
            this.$http.get(URL).then((response) => {
                // 请求成功回调
                let data = response.data;
                if (data.retcode === RETCODE_OK) {
                    this.links = data.data;
                    this.firstGetlinks = false;
                }else {
                    this.$Message.error(data.errmsg);
                }
                this.spinShow = false;
            }).catch(err => {});
        },
        change_ollapse_panel(name) {
            this.side_type = 'tag';
        },
        toggleSide(type) {
            this.side_type = type;

            switch (type) {
                case 'link':
                    this.getLinks();
                    break;
                case 'post':
                    this.current_category = null;
                    this.infiniteReset();
                    break;
                default:
                    break;
            }
        },
        toHandlePost(e, post) {
            this.current_post = post;
            this.$refs.post_contextmenu.show(e);
        },
        clickPost(post) {
            this.$router.push({name: 'postRead', params: {read_pid: post.pid}});
            this.$store.commit('setSide','');
        },
        toEditTag() {
            this.collectPostModal = true;
            this.$refs.post_contextmenu.hide();
            this.get_categorys();
        },
        delPostCollect() {
            /* 取消收藏 */
            this.$Modal.confirm({
                title: '确认对话框',
                content: '确定删除吗？',
                onOk:() => {
                    let URL = `/post/collect/uncollect/${this.current_post.pid}`;
                    this.$http.post(URL).then(response => {
                        let data = response.data;
                        if( data.retcode == RETCODE_OK ){
                            this.posts = this.posts.filter(val => val.pid != this.current_post.pid);
                            this.$refs.post_contextmenu.hide();
                            this.$Message.success('链接删除成功！');
                        }else{
                            this.$Message.error(data.errmsg);
                        }
                    }).catch(err => {});
                }
            });
        },
        
        closeLinkModal() {
            this.link_modal.name = '';
            this.link_modal.href = '';
            this.addLinkModal = false;
        },
        submitLink(name) {
            this.$refs[name].validate((valid) => {
                if( valid ) {
                    let URL = this.current_link?`links/${this.current_link.id}`: 'links';
                    let param = {
                        name: this.link_modal.name,
                        href: this.link_modal.href,
                    };
                    this.submitLinking = true;
                    this.$http.post(URL,param).then((response) => {
                        // 请求成功回调
                        let data = response.data;
                        if (data.retcode === RETCODE_OK) {
                            if (this.current_link) {
                                // 编辑
                                this.links.forEach(val => {
                                    if (val.id == this.current_link.id) {
                                        val.name = this.link_modal.name;
                                        val.href = this.link_modal.href;
                                        val.updated_at = moment().format('YYYY-MM-DD hh:mm:ss');
                                    }
                                })
                                this.$Message.success('标签编辑成功！')
                            } else {
                                // 添加
                                this.links.unshift({
                                    id: data.id,
                                    name: this.link_modal.name,
                                    href: this.link_modal.href,
                                    updated_at: moment().format('YYYY-MM-DD hh:mm:ss')
                                });
    
                                this.$Message.success('标签添加成功！')
                            }
                        }else {
                            this.$Message.error(data.errmsg);
                        }
                        
                        this.closeLinkModal();
                        this.submitLinking = false;
                    }).catch(err => {});
                }
            });
        },
        toHandleLink(e, link) {
            this.current_link = link;
            this.$refs.link_contextmenu.show(e);
        },
        toAddLink() {
            this.current_link = null
            this.addLinkModal = true;
        },
        toEditLink() {
            this.link_modal.name = this.current_link.name;
            this.link_modal.href = this.current_link.href;
            this.addLinkModal = true;
        },
        delLink() {
            this.$Modal.confirm({
                title: '确认对话框',
                content: '确定删除吗？',
                onOk:() => {
                    let URL = `links/${this.current_link.id}/del`
                    this.$http.post(URL).then((response) => {
                        // 请求成功回调
                        let data = response.data;
                        if (data.retcode === RETCODE_OK) {
                            this.links = this.links.filter(val => val.id != this.current_link.id);
                            this.$refs.link_contextmenu.hide();
                            this.$Message.success('链接删除成功！');
                        }else {
                            this.$Message.error(data.errmsg);
                        }
                    }).catch(err => {});
                }
            });
        },
    },
    filters: {
        timeFormat(data) {
            return moment(data).format('YYYY/MM/DD');
        }
    }
}
</script>