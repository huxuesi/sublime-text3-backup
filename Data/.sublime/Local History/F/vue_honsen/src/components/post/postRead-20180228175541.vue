<style lang="stylus">
@import '../../common/stylus/mixin.styl'
active = #3dc1ff
.post_read
    color #555
    .no_post
        text-align: center
    .left_side
        position relative
        float left
        width 860px
        box-shadow -1px 0 10px rgba(0,0,0,0.2)
        .ivu-card-body
            min-height 835px
        .header
            height 30px
            .left
                float left
                width 560px
                font-size 18px
                color #585858
            .right
                float right
                .key_icon_content
                    float: left
                    width: 30px
                    height 64px
                    .ivu-poptip-popper
                        left 204px !important
                        top 80px !important
                    .key_icon
                        bgImg(30px,30px,'/static/icon/0018_.png')
                        background-position-x left
                        &:hover
                            background-image url('/static/icon/0018.png')
                    .ivu-poptip-body
                        padding 27px 35px
                        .auth_read_panel
                            .auth_read_panel_tit
                                margin-bottom 25px
                                font-size 16px
                            .auth_read_panel_list
                                padding 5px 0 15px
                                border-top 1px solid #d2d2d2
                                max-height: 125px
                                overflow: auto
                                .auth_read_panel_item
                                    margin-top 12px
                                    height 40px
                                    .auth_read_panel_item_c
                                        height 40px
                                        line-height 40px
                                    .avatar
                                        float left
                                    .name
                                        margin-left 12px
                                        float left
                                    .auth_text
                                        float right
                                        margin-right 22px
                                    .del_icon
                                        float right
                                        bgImg(15px,40px,'/static/icon/0020_.png')
                                        cursor pointer
                .lock_icon
                    float left
                    bgImg(30px,30px,'/static/icon/0019_.png')
                    background-position-x left
                    &:hover
                        background-image url('/static/icon/0019.png')
                .edit_icon
                    bgImg(38px,38px,'/static/icon/0049.png')
                    cursor pointer
                    position relative
                    .downArrow
                        position absolute
                        left 14px
                        top 40px
                        downArrow(5px, active)
                .right_item_select_dropdown
                    .ivu-select-dropdown
                        margin-top 15px
                    .ivu-dropdown-menu
                        min-width 90px
                    .ivu-dropdown-item
                        text-align center
                        &:hover
                            background: active
                            color #fff
        .post_other_info
            margin-top 30px
            height 45px
            .ivu-avatar
                float left
                width 47px
                height 47px
                border-radius 50%
            .post_other_info_text
                margin-left 65px
                font-size 12px
                .post_other_info_up
                    height 18px
                    line-height 18px
                    div
                        float left
                    .icon
                        margin-right 10px
                        background-position-x left
                        cursor pointer
                    .dianzan
                        bgImg(17px,18px,'/static/icon/0024_.png')
                        &:hover,&.active
                            background-image url('/static/icon/0024.png')
                    .collect
                        bgImg(17px,18px,'/static/icon/0025_.png')
                        &:hover,&.active
                            background-image url('/static/icon/0025.png')
                    .preview
                        bgImg(20px,18px,'/static/icon/0026_.png')
                        &:hover,&.active
                            background-image url('/static/icon/0026.png')
                    .num
                        margin-right 18px
                        color #818181
                .post_other_info_down
                    margin-top 8px
                    height 18px
                    line-height 18px
                    color #a6a4a4
                    .item
                        float left
                        margin-right 27px
                    a
                        color #a6a4a4
        .summary_wrapper
            margin-top: 36px
            padding: 17px
            background-color: #f2f7f9
            .title
                font-weight: bold
                font-size 14px
            .summary
                margin-top: 10px
                text-indent: 26px
                line-height: 23px
                font-size: 12px
                white-space: pre-line
                word-break: break-word
        #text-content
            margin-top: 30px
            overflow hidden
    .fixed_btn
        position fixed
        bottom 15px
        left 50%
        margin-left 190px
        bgImg(46px,46px,'/static/icon/0050.png')
        cursor pointer
        transition 0.7s all ease
        &.bottom
            bottom 135px
    .right_side
        float right
        width 325px
        .title
            padding-left 25px
            height 50px
            line-height 50px
            font-size: 16px
            color: #fff
            background-color #64778a
            .num
                font-size 12px
        .related
            margin-bottom: 17px
            padding-bottom 25px
            background #fff
            border 1px solid #e9eaec
            .list
                margin-top 10px
                padding-left 40px
                font-size 12px
            .item
                width 260px
                height: 30px
                line-height: 30px
                list-style-type: disc
                list-style-position: inside
                color #666
                cursor: pointer
                &:hover
                    color active
        .comment_wrapper
            width 325px
            background #fff
            border 1px solid #e9eaec
            &.fixed
                position fixed
                top 78px
                left: 0
                // margin-left 275px
            .comment_wrap
                max-height 500px
                overflow auto
                padding 0 15px 25px
</style>
<template>
    <div class="post_read clearfix">
        <div v-if="noPost" class="no_post">{{no_post}}</div>

        <Card v-if="!noPost" class="left_side" :bordered="true" :dis-hover="false" :padding="39">
            <div class="header clearfix">
                <h1 class="left single_ellipsis">{{post.title}}</h1>

                <div class="right">
                    <Poptip
                        v-show="0"
                        class="key_icon_content"
                        placement="bottom-end"
                        width="470"
                        trigger="hover"
                        :transfer="false"
                        v-if="post.auth && (post.auth.edit.length || (post.is_secret && post.auth.view.length))">
                        <div class="key_icon"></div>
                        <div class="auth_read_panel" slot="content">
                            <div class="auth_read_panel_tit">权限查看</div>
                            <div class="auth_read_panel_list" v-if="post.auth.edit.length">
                                <div class="auth_read_panel_item" v-for="(edit_item,edit_index) in post.auth.edit" :key="edit_index">
                                    <Avatar class="avatar" shape="square" size="large" :src="$avatarHash(edit_item.id)"/>
                                    <div class="auth_read_panel_item_c name">{{edit_item.name}}</div>
                                    <div class="auth_read_panel_item_c del_icon" @click.stop="delSubmitAuth('edit',edit_item,edit_index)"></div>
                                    <div class="auth_read_panel_item_c auth_text">编辑权限</div>
                                </div>
                            </div>
                            <div class="auth_read_panel_list" v-if="post.auth.view.length">
                                <div class="auth_read_panel_item" v-for="(view_item,view_index) in post.auth.view" :key="view_index">
                                    <Avatar class="avatar" shape="square" size="large" :src="$avatarHash(view_item.id)"/>
                                    <div class="auth_read_panel_item_c name">{{view_item.name}}</div>
                                    <div class="auth_read_panel_item_c del_icon"  @click.stop="delSubmitAuth('view',view_item,view_index)"></div>
                                    <div class="auth_read_panel_item_c auth_text">阅读权限</div>
                                </div>
                            </div>
                        </div>
                    </Poptip>

                    <div v-show="0" class="lock_icon" v-if="post.authable && post.is_secret"></div>

                    <div v-if="post.editable && !post.authable" class="edit_icon" @click="toEdit"></div>
                    <Dropdown v-if="post.authable" @on-click="toSetPost" class="right_item_select_dropdown">
                        <div class="edit_icon" @click="toEdit"><div class="downArrow"></div></div>
                        <DropdownMenu slot="list">
                            <DropdownItem class="first_item" name="del">删除知识</DropdownItem>
                            <DropdownItem name="puttop" v-if="post.is_puttop">取消置顶</DropdownItem>
                            <DropdownItem name="untop" v-else>设为置顶</DropdownItem>
                            <DropdownItem name="unsecret" v-if="post.is_secret">取消私密</DropdownItem>
                            <DropdownItem name="secret" v-else>转为私密</DropdownItem>
                            <DropdownItem name="changeCatogery">修改分类</DropdownItem>
                            <DropdownItem name="auth_edit">编辑权限</DropdownItem>
                            <DropdownItem name="auth_view">阅读权限</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>

            <div class="post_other_info">
                <Avatar @click.native="$router.push({ name: 'personalCenter', params: { id: post.id}})" style="cursor: pointer" size="large" :src="$avatarHash(post.id)" />
                <div class="post_other_info_text">
                    <div class="post_other_info_up clearfix">
                        <div class="icon dianzan" :class="{active: post.is_upvoted}" @click="toggleUpvote"></div>
                        <div class="num">{{post.upvote_num}}</div>
                        <div class="icon collect" :class="{active: post.is_collected}" @click="toggleCollect"></div>
                        <div class="num">{{post.collect_num}}</div>
                        <div class="icon preview"></div>
                        <div class="num">{{post.pv_num}}</div>
                    </div>
                    <div class="post_other_info_down clearfix">
                        <span class="item">作者： <a @click="$router.push({ name: 'personalCenter', params: { id: post.id}})" href="javascript:;">{{post.name}}</a></span>
                        <span class="item">更新： {{post.time}}</span>
                        <span class="item" v-if="!post.is_secret">
                            <shareJiathis ref="shareJiathis"></shareJiathis>
                        </span>
                    </div>
                </div>
            </div>

            <div class="summary_wrapper" v-if="post.summary && post.summary !== ''" >
                <div class="title">摘要：</div>
                <div class="summary" v-html="post.summary"></div>
            </div>

            <div id="text-content" class="text-content" v-html="post.content"></div>
        </Card>

        <div v-if="!noPost && post.editable" v-show="fixedBtn" class="fixed_btn" :class="{bottom: fixedBottom}" @click="toEdit"></div>

        <div v-if="!noPost" class="right_side">
            <!--相关知识-->
            <div v-if="more_posts.length" ref="more_posts" class="related">
                <div class="title">相关知识</div>
                <ul class="list">
                    <li
                        class="item single_ellipsis"
                        @click="$router.push({name: 'postRead', params: {read_pid: more_post.pid}})"
                        v-for="(more_post,index) in more_posts"
                        :key="index">
                        {{more_post.title}}
                    </li>
                </ul>
            </div>
            <div class="comment_wrapper" :class="{fixed: fixComment}">
                <div class="title">评论<span class="num"> /{{post.commentTotal}}</span></div>
                <div class="comment_wrap">
                    <comment :id="pid" @changeCommentLength="changeCommentNum"></comment>
                </div>
            </div>
        </div>

        <setCategory
            v-if="categoryModal"
            :selectedCategorys="post.cids"
            @selected-category="submitCategory"
            @close="categoryModal = false">
        </setCategory>
        <addMember
            v-if="addMemberModal"
            :title="authModeText"
            :initSelectedUserIds="initAuthUsers"
            @close="addMemberModal = false"
            @selected-users="submitAuth">
        </addMember>
    </div>
</template>

<script>
import shareJiathis from './shareJiathis'
import comment from '@/components/common/z-comment'
import setCategory from './setCategory'
import addMember from '@/components/common/addMember'
import Viewer from 'viewerjs'
export default {
    name: 'postRead',
    components: {shareJiathis,comment,setCategory,addMember},
    data() {
        return {
            fixedBtn: false,
            fixedBottom: false,
            fixComment: false,
            morePostsH: 0,
            no_post: '', // 知识不存在或没权限的情况
            pid: -1,
            post: null,
            /* 分类设置 */
            categoryModal: false,
            /* 权限设置 */
            addMemberModal: false,
            initAuthUsers: [],
            setAuthName: '',
            authModeText: '',
            /* 相关知识 */
            more_posts: [],
        }
    },
    computed: {
        noPost() {
            return !this.post || (this.post && !this.post.viewable);
        }
    },
    created() {
        this.pid = Number(this.$route.params.read_pid);
    },
    mounted() {
        this.getPost();

        document.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
        let oJiathis = document.querySelector('#jiathis_weixin_share');
        if (oJiathis) {
            oJiathis.parentNode.removeChild(oJiathis);
        }
    },
    destroyed() {
        document.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleScroll() {
            let top = document.documentElement.scrollTop || document.body.scrollTop;
            let pageH = document.documentElement.scrollHeight || document.body.scrollHeight;
            let offsetH = document.documentElement.offsetHeight || document.body.offsetHeight;

            this.fixedBtn = !!(top > 200);

            this.fixedBottom = !!(top > (pageH - offsetH) - 120);

            this.fixComment = !!(top > this.morePostsH + 24);

        },
        toggleUpvote() {
            if (!this.$store.state.loginStatus) {
                this.$Message.warning('请先登录后再进行操作！');
                return false;
            }

            let type = this.post.is_upvoted? 'downvote': 'upvote';

            this.$ajax('post', `/post/upvote/${type}/${this.post.pid}`, (data) => {
                this.post.upvote_num += type === 'downvote'? -1: 1;
                this.post.is_upvoted = !this.post.is_upvoted;
            });
        },
        toggleCollect() {
            if (!this.$store.state.loginStatus) {
                this.$Message.warning('请先登录后再进行操作！');
                return false;
            }

            let type = this.post.is_collected? 'uncollect': 'collect';

            this.$ajax('post', `/post/collect/${type}/${this.post.pid}`, (data) => {
                this.post.collect_num += type === 'uncollect'? -1: 1;
                this.post.is_collected = !this.post.is_collected;
            });
        },
        changeCommentNum(obj) {
            this.post.commentTotal = obj.total;
        },
        getPost() {
            this.$ajax('get', `/post/info/${this.pid}`, (data) => {
                if(!data.data.viewable){
                    this.no_post = '无权阅读该知识！';
                    return;
                }

                this.post = data.data;

                this.$nextTick(() => {
                    this.prettyFileCss();
                });

                if (this.$store.state.loginStatus) {
                    this.getMorePost();
                }

                // 分享配置
                window.jiathis_config = {
                    title: data.data.title
                };
            }, (err) => {
                this.no_post = err.errmsg;
            });
        },
        /*ueditContent*/
        prettyFileCss() {
            let fTypes = ['avi','doc','jpg','mp3','pdf','ppt','rar','xls','docx','pptx','xlsx','txt'];
            let canPreviwe = ['doc','ppt','xls'];
            let contentDom = document.querySelector('#text-content');

            if (!contentDom) {
                return false;
            }

            /* 原来的上传文件 */
            let elements1 = contentDom.querySelectorAll('.ck_file');
            if(elements1.length){
                Array.prototype.forEach.call(elements1,function(el) {
                    let fUrl = el.getAttribute('href');

                    el.className = 'ueditor_file';
                    el.setAttribute('href','http://office.honsenflag.com/op/view.aspx?src=' + fUrl);
                    el.setAttribute('target','_blank');

                    let fType = el.getAttribute('data-type');
                    if(fType == 'docx' || fType == 'pptx' || fType == 'xlsx'){
                        fType = fType.substring(0,3);
                    }

                    let oldText = el.innerText.trim();

                    if(fTypes.indexOf(fType) != -1){
                        el.innerHTML = `<img src="../../../static/img/${fType}.png" class="icon_img" width="18" height="18">${oldText}<a class="f_downLoad" href="${fUrl}"><div class="icon_xiazai"></div></a>`;
                    }else {
                        el.innerHTML = `${oldText}<a class="f_downLoad" href="${fUrl}"><div class="icon_xiazai"></div></a>`;
                    }
                });
            }
            /* 新上传的文件class="ck_file_2" */
            let elements = contentDom.querySelectorAll('.ck_file_2');
            if(elements.length){
                Array.prototype.forEach.call(elements,function(el) {
                    el.className = 'ueditor_file';
                    let hash = el.getAttribute('data-hash');
                    let oldText = el.innerText.trim();
                    let fType = oldText.split('.').pop();
                    if(fType == 'docx' || fType == 'pptx' || fType == 'xlsx'){
                        fType = fType.substring(0,3);
                    }
                    if(fTypes.indexOf(fType) != -1){
                        if(canPreviwe.indexOf(fType) != -1){
                            el.setAttribute('href',`${imgUrl}/file/preview/${hash}`);
                        }else{
                            el.setAttribute('href',`${imgUrl}/file/download/${hash}`);
                        }
                        el.innerHTML = `<img src="../../../static/img/${fType}.png" class="icon_img" width="18" height="18">${oldText}<a class="f_downLoad" href="${imgUrl}/file/download/${hash}"><div class="icon_xiazai"></div></a>`;
                    }else {
                        el.setAttribute('href',`${imgUrl}/file/download/${hash}`);
                        el.innerHTML = `${oldText}<a class="f_downLoad" href="${imgUrl}/file/download/${hash}"><div class="icon_xiazai"></div></a>`;
                    }
                });
            }

            /* ueditor上传的 */
            let els_ue = contentDom.querySelectorAll('.ueditor_file');
            if(els_ue.length){
                Array.prototype.forEach.call(els_ue,function(el) {

                    // 如果里面有图片就拿出图片 否则会不显示
                    if( el.querySelector('.ueditor_img') ){
                        el.parentNode.replaceChild(el.querySelector('.ueditor_img'), el);
                        return false;
                    }

                    // 移除firefox下编辑器enter生成的空a标签
                    if (!el.innerText.replace(/\s/, '')) {
                        el.parentNode.removeChild(el);
                        return false;
                    }


                    let hash = el.getAttribute('data_hash') || el.getAttribute('data-hash');
                    let oldText = el.innerText.trim();
                    let fType = oldText.split('.').pop().toLowerCase();

                    if(fType == 'docx' || fType == 'pptx' || fType == 'xlsx'){
                        fType = fType.substring(0,3);
                    }

                    if(canPreviwe.includes(fType)) {
                        el.setAttribute('href',`${imgUrl}/file/preview/${hash}`);
                    } else {
                        el.setAttribute('href',`${imgUrl}/file/download/${hash}`);
                    }

                    let icon_fType = fTypes.includes(fType)? fType: 'noa'; /* noa通用文件类型的图标 */
                    el.innerHTML = `<img src="../../../static/img/${icon_fType}.png" class="icon_img" width="18" height="18">
                                    ${oldText}
                                    <a class="f_downLoad" href="${imgUrl}/file/download/${hash}" target="_blank"></a>`;
                });
            }

            /* 图片预览 */
            let ue_imgs = contentDom.querySelectorAll('.ueditor_img');
            if(ue_imgs.length){
                Array.prototype.forEach.call(ue_imgs,function(el) {
                    new Viewer(el,{navbar: false, toolbar: false});
                });
            }

        },
        toSetPost(name) {
            switch (name) {
                case 'del':
                    this.delPost();
                    break;
                case 'puttop':
                case 'untop':
                    this.toggleTop();
                    break;
                case 'secret':
                case 'unsecret':
                    this.toggleSecret();
                    break;
                case 'changeCatogery':
                    this.categoryModal = true;
                    break;
                case 'auth_edit':
                    this.authModeText = '编辑授权';
                    this.initAuthUsers = this.post.auth? this.post.auth.edit: [];
                    this.setAuthName = name;
                    this.addMemberModal = true;
                    break;
                case 'auth_view':
                    this.authModeText = '阅读授权';
                    this.initAuthUsers = this.post.auth? this.post.auth.view: [];
                    this.setAuthName = name;
                    this.addMemberModal = true;
                    break;
                default:
                    break;
            };
        },
        toEdit() {
            this.$ajax('get', `/post/info/${this.pid}/isEditing`, data => {
                if(data.is_editing){
                    this.$Message.warning('该知识正在编辑中...');
                }else{
                    this.$router.push({name: 'postEdit', params: {edit_pid: this.pid}});
                }
            });
        },
        delPost() {
            this.$Modal.confirm({
                title: '确认框',
                content: '确认删除吗？',
                onOk: () => {
                    this.$ajax('post', '/post/setinfos', {type:'del', pids:[this.post.pid]}, data => {
                        this.$router.push({name: 'postList'});
                    });
                }
            });
        },
        toggleTop() {
            let type = this.post.is_puttop? 'untop': 'puttop';

            this.$ajax('post', '/post/setinfos', {type: type, pids:[this.post.pid]}, data => {
                let text =  this.post.is_puttop? '取消置顶成功！': '设置置顶成功！'
                this.$Message.success(text);

                this.post.is_puttop = !this.post.is_puttop;
            });
        },
        toggleSecret() {
            let type = this.post.is_secret? 'unsecret': 'secret';

            this.$ajax('post', '/post/setinfos', {type: type, pids:[this.post.pid]}, data => {
                let text =  this.post.is_secret? '取消私密成功！': '设置私密成功！'
                this.$Message.success(text);

                this.post.is_secret = !this.post.is_secret;
            });
        },
        submitCategory(cids) {
            if (!cids[0]) {
                this.$Message.warning('至少选择一项分类！');
                return;
            }

            let send_data = {cids: cids};
            this.$ajax('post', '/post/setinfos', {type: 'changeCatogery', pids: [this.post.pid], data: send_data}, data => {
                this.post.cids = cids;

                this.categoryModal = false;
                this.$Message.success('设置分类成功！');
            });
        },
        submitAuth(users,ids,isNoChange) {
            if (isNoChange) {
                this.addMemberModal = false;
                return;
            }

            let send_data = null;
            if (this.setAuthName == 'auth_edit') {
                send_data = {"edit": ids, "view": this.post.auth.view.map(item => item.id)};
            }else {
                send_data = {"edit": this.post.auth.edit.map(item => item.id), "view": ids};
            }

            this.$ajax('post', '/post/setinfos', {type: 'auth', pids: [this.post.pid], data: send_data}, data => {
                let text = this.setAuthName == 'auth_edit'? '设置编辑权限成功！': '设置阅读权限成功！';
                this.$Message.success(text);

                this.setAuthName == 'auth_edit'?this.$set(this.post.auth,'edit',users): this.$set(this.post.auth,'view',users);

                this.addMemberModal = false;
            });
        },
        delSubmitAuth(type, del_item, index) {
            if(!window.confirm('确认删除吗？')){
                return;
            }

            let send_data = null;
            if (type == 'edit') {
                let ids = this.post.auth.edit.map(item => item.id).filter(id => id != del_item.id);
                send_data = {"edit": ids, "view": this.this.post.auth.view.map(item => item.id)};
            } else {
                let ids = this.post.auth.view.map(item => item.id).filter(id => id != del_item.id);
                send_data = {"edit": this.this.post.auth.edit.map(item => item.id), "view": ids};
            }

            this.$ajax('post', '/post/setinfos', {type: 'auth', pids: [this.post.pid], data: send_data}, data => {
                let text = type == 'edit'? '删除编辑权限成功！': '删除阅读权限成功！';
                this.$Message.success(text);

                this.post.auth[type].splice(index,1);
            });
        },
        getMorePost() {
            this.$ajax('get', `/post/more/${this.pid}/10`, data => {
                this.more_posts = data.data;

                this.$nextTick(() => {
                    if (this.$refs.more_posts) {
                        this.morePostsH = this.$refs.more_posts.offsetHeight;
                    }
                });
            });
        },
    },
}
</script>