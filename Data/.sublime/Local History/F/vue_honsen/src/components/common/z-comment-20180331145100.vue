<style lang="stylus">
.z-comment
    padding: 14px 0 0
    font-size: 12px
    .commentipt
        margin: 8px 0 0
        .nofileupcommentipt
            position: relative
            .commentiptleft
                margin-right: 68px
                .ivu-input
                    background: #f0f6fe
                    border-color: transparent
            .ivu-btn
                position: absolute
                bottom: 0
                right: 0
                padding: 6px 14px
        .fileupcommentipt
            border: 1px solid #d2d2d2
            border-radius: 3px
            &.iswriting
                border-color: #64cdff
                box-shadow: 0 0 0 2px rgba(61, 193, 255, 0.2)
                .filesee
                    border-color: #64cdff
            textarea
                border: none
                box-shadow: none
            .filesee
                border-top: 1px solid #d2d2d2
                height: 34px
                background: #fff
                & > .ivu-upload
                    display: inline-block
                    float: left
                    width: 46px
                    .fileupicon
                        display: inline-block
                        height: 34px
                        width: 46px
                        line-height: 31px
                        text-align: center
                        cursor: pointer
                        img
                            vertical-align: middle
                    .ivu-upload-list
                        margin-top: 0
                        position: absolute
                        background: #fff
                .commit
                    float: right
                    padding: 0 15px
                    height: 25px
                    margin: 4px 5px 0 0
                .filelistwrap
                    display: inline-block
                    width: 80%
                    height: 34px
                    line-height: 34px
                    & > .fileuplist
                        max-width: 32%
                    .moreupfiles
                        float: left
                        width: 4%
                        height: 34px
                        cursor: pointer
                        position: relative
                        &:hover
                            & > i
                                color: #3dc1ff
                            .moreupfilespanel
                                display: block
                        & > i
                            font-size: 27px
                            height: 100%
                            vertical-align: middle
                            width: 100%
                            text-align: center
                        .moreupfilespanel
                            display: none
                            width: 252px
                            position: absolute
                            right: 105%
                            top: 0
                            padding: 5px 15px
    .fileuplist
        padding: 2px 0
        float: left
        width: 100%
        span
            display: block
            max-width: 85%
            float: left
            a
                color: #757575
        i
            font-size: 18px
            vertical-align: text-bottom
            color: #b4c6d1
            cursor: pointer
            margin-left: 2px
            &:hover
                color: #7ec2ec
        .a_down
            padding-left: 9px
            float: left
    .commentlist
        margin: 16px 0 0
        .commenthead
            float: left
            width: 48px
            img
                width: 38px
                height: 38px
                border-radius: 50%
                cursor: pointer
        .commentbody
            margin: 0 0 0 48px
            padding: 0 16px 0 5px
            .content
                white-space: pre-wrap
                word-break: break-word
                word-wrap: break-word
                .name
                    color: #1890ff
            .bottom
                margin: 3px 0 0
                .replywrap
                    float: right
                    a
                        color: #1890ff
                    .del
                        margin: 0 0 0 10px
                    .ivu-poptip-body
                        white-space: nowrap
                    .moreupfileschild
                        width: 34px
                        display: inline-block
                        position: relative
                        text-align: center
                        margin: 0 7px 0 0
                        cursor: pointer
                        & > img
                            vertical-align: sub
                        .moreupfileschildpanel
                            display: none
                            position: absolute
                            right: 105%
                            top: 0
                            padding: 5px 15px
                            width: 252px
                            i
                                color: #3dc1ff
                        &:hover
                            .moreupfileschildpanel
                                display: block
            .commentlistchild
                background: #f5f8f9
                margin: 10px -16px 0 -12px
                padding: 0 16px 0 12px
                .commentlistchildlist
                    padding: 12px 0 12px
                    border-bottom: 1px solid #e4e6e6
                    &:last-child
                        border-bottom: 0
</style>

<template>
    <div class="z-comment">
        <!-- big评论 -->
        <div v-if="haveBigBtn" class="commentipt">
            <div v-if="type == 'keep'" :class="{ iswriting: bigvalwriting}" class="fileupcommentipt">
                <Input v-model.trim="bigval" @on-focus="bigvalwriting = true" @on-blur="bigvalwriting = false" type="textarea" :autosize="{ minRows: 2}" placeholder="评论："></Input>
                <div class="filesee clearfix">
                    <Upload
                        :action="`${imgUrl}/file/upload`"
                        :with-credentials="true"
                        :data="fileup_param"
                        :show-upload-list="true"
                        :on-success="fileUpSuccessBig"
                        :on-error="fileUpError"
                        ref="fileupbig"
                        name="upload">
                        <span title="上传文件" class="fileupicon"><img src="/static/icon/case_file_icon.png"></span>
                    </Upload>
                    <div class="filelistwrap">
                        <p v-if="index < 3" v-for="(file, index) in bigfilesjson" class="fileuplist">
                            <span class="single_ellipsis"><a target="_blank" :href="`${imgUrl}/file/preview/${file.hash}`" :title="file.name">{{file.name}}</a></span>
                            <Icon @click.native="delfileUp(bigfilesjson, index)" title="删除此文件" type="trash-a"></Icon>
                        </p>
                        <div v-if="isbiz && bigfilesjson.length > 3" class="moreupfiles">
                            <Icon type="ios-more"></Icon>
                            <div class="moreupfilespanel floatpanel">
                                <p v-if="index > 2" v-for="(file, index) in bigfilesjson" class="fileuplist">
                                    <span class="single_ellipsis"><a target="_blank" :href="`${imgUrl}/file/preview/${file.hash}`" :title="file.name">{{file.name}}</a></span>
                                    <Icon @click.native="delfileUp(bigfilesjson, index)" title="删除此文件" type="trash-a"></Icon>
                                </p>
                            </div>
                        </div>
                    </div>
                    <Button class="commit" @click="addComment(null, null, null)" type="info">提交</Button>
                </div>
            </div>
            <div v-else class="nofileupcommentipt">
                <Button @click="addComment(null, null, null)" type="info">提交</Button>
                <div class="commentiptleft">
                    <Input @on-enter="addComment(null, null, null)" v-model.trim="bigval" type="textarea" :autosize="true" :isPrevent="true" placeholder="评论："></Input>
                </div>
            </div>
        </div>
        <!-- 子评论 -->
        <transition-group tag="div" name="grouplist">
            <div v-for="(list, bidx) in data.data" :key="list.cid" class="commentlist clearfix">
                <div class="commenthead">
                    <img @click="$router.push({ name: 'personalCenter', params: { id: list.id}})" :src="$avatarHash(list.id)">
                </div>
                <div class="commentbody">
                    <p class="content"><a @click="$router.push({ name: 'personalCenter', params: { id: list.id}})" href="javascript:;" class="name">{{list.name}}</a>：{{list.content}}</p>
                    <p class="bottom clearfix">
                        <span class="time">{{list.time | timeconvert}}</span>
                        <span class="replywrap">
                            <div v-if="isbiz && list.filesjson.length" class="moreupfileschild">
                                <img src="/static/icon/case_file_icon.png">
                                <div class="moreupfileschildpanel floatpanel">
                                    <p v-for="(file, index) in list.filesjson" class="fileuplist">
                                        <span class="single_ellipsis"><a target="_blank" :href="`${imgUrl}/file/preview/${file.hash}`" :title="file.name">{{file.name}}</a></span>
                                        <a target="_blank" class="a_down" :href="`${imgUrl}/file/download/${file.hash}`"><Icon title="下载此文件" type="ios-download-outline"></Icon></a>
                                    </p>
                                </div>
                            </div>
                            <a @click="replyiffn(list.cid)" class="reply" href="javascript:;">回复</a>
                            <a v-if="list.delable" class="del" @click="delComment(list.cid, bidx, null)" href="javascript:;">删除</a>
                        </span>
                    </p>
                    <div v-if="list.cid == selectCid" class="commentipt">
                        <div v-if="type == 'keep'" :class="{ iswriting: list.childvalwriting}" class="fileupcommentipt">
                            <Input v-model.trim="list.childval" ref="childipt" @on-focus="list.childvalwriting = true" @on-blur="list.childvalwriting = false" type="textarea" :autosize="{ minRows: 2}" :placeholder="'评论 ' + list.name + '：'"></Input>
                            <div class="filesee clearfix">
                                <Upload
                                    :action="`${imgUrl}/file/upload`"
                                    :with-credentials="true"
                                    :data="fileup_param"
                                    :show-upload-list="true"
                                    :on-success="fileUpSuccessChild"
                                    :on-error="fileUpError"
                                    ref="fileupchild"
                                    name="upload">
                                    <span title="上传文件" class="fileupicon"><img src="/static/icon/case_file_icon.png"></span>
                                </Upload>
                                <div class="filelistwrap">
                                    <p v-if="index < 3" v-for="(file, index) in list.childfilesjson" class="fileuplist">
                                        <span class="single_ellipsis"><a target="_blank" :href="`${imgUrl}/file/preview/${file.hash}`" :title="file.name">{{file.name}}</a></span>
                                        <Icon @click.native="delfileUp(list.childfilesjson, index)" title="删除此文件" type="trash-a"></Icon>
                                    </p>
                                    <div v-if="isbiz && list.childfilesjson.length > 3" class="moreupfiles">
                                        <Icon type="ios-more"></Icon>
                                        <div class="moreupfilespanel floatpanel">
                                            <p v-if="index > 2" v-for="(file, index) in list.childfilesjson" class="fileuplist">
                                                <span class="single_ellipsis"><a target="_blank" :href="`${imgUrl}/file/preview/${file.hash}`" :title="file.name">{{file.name}}</a></span>
                                                <Icon @click.native="delfileUp(list.childfilesjson, index)" title="删除此文件" type="trash-a"></Icon>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <Button class="commit" @click="addComment(list.cid, bidx, list)" type="info">提交</Button>
                            </div>
                        </div>
                        <div v-else class="nofileupcommentipt">
                            <Button @click="addComment(list.cid, bidx, list)" type="info">提交</Button>
                            <div class="commentiptleft">
                                <Input @on-enter="addComment(list.cid, bidx, list)" v-model.trim="list.childval" ref="childipt" type="textarea" :autosize="true" :isPrevent="true" :placeholder="'评论 ' + list.name + '：'"></Input>
                            </div>
                        </div>
                    </div>
                    <!-- 子子评论 -->
                    <div class="commentlistchild">
                        <transition-group tag="div" name="grouplist">
                            <div v-for="(li, cidx) in list.sub" :key="li.cid" class="commentlistchildlist">
                                <p class="content"><a @click="$router.push({ name: 'personalCenter', params: { id: li.id}})" href="javascript:;" class="name">{{li.name}}</a> 回复 <a @click="$router.push({ name: 'personalCenter', params: { id: li.ruid}})" href="javascript:;" class="name">{{li.rname}}</a>：{{li.content}}</p>
                                <p class="bottom clearfix">
                                    <span class="time">{{li.time | timeconvert}}</span>
                                    <span class="replywrap">
                                        <div v-if="isbiz && li.filesjson.length" class="moreupfileschild">
                                            <img src="/static/icon/case_file_icon.png">
                                            <div class="moreupfileschildpanel floatpanel">
                                                <p v-for="(file, index) in li.filesjson" class="fileuplist">
                                                    <span class="single_ellipsis"><a target="_blank" :href="`${imgUrl}/file/preview/${file.hash}`" :title="file.name">{{file.name}}</a></span>
                                                    <a target="_blank" :href="`${imgUrl}/file/download/${file.hash}`"><Icon title="下载此文件" type="ios-download-outline"></Icon></a>
                                                </p>
                                            </div>
                                        </div>
                                        <a @click="replyiffn(li.cid)" class="reply" href="javascript:;">回复</a>
                                        <a v-if="li.delable" class="del" @click="delComment(li.cid, bidx, cidx)" href="javascript:;">删除</a>
                                    </span>
                                </p>
                                <div v-if="li.cid == selectCid" class="commentipt">
                                    <div v-if="type == 'keep'" :class="{ iswriting: list.childvalwriting}" class="fileupcommentipt">
                                        <Input v-model.trim="list.childval" ref="childipt" @on-focus="list.childvalwriting = true" @on-blur="list.childvalwriting = false" type="textarea" :autosize="{ minRows: 2}" :placeholder="'评论 ' + li.name + '：'"></Input>
                                        <div class="filesee clearfix">
                                            <Upload
                                                :action="`${imgUrl}/file/upload`"
                                                :with-credentials="true"
                                                :data="fileup_param"
                                                :show-upload-list="true"
                                                :on-success="fileUpSuccessChild"
                                                :on-error="fileUpError"
                                                ref="fileupchild"
                                                name="upload">
                                                <span title="上传文件" class="fileupicon"><img src="/static/icon/case_file_icon.png"></span>
                                            </Upload>
                                            <div class="filelistwrap">
                                                <p v-if="index < 3" v-for="(file, index) in list.childfilesjson" class="fileuplist">
                                                    <span class="single_ellipsis"><a target="_blank" :href="`${imgUrl}/file/preview/${file.hash}`" :title="file.name">{{file.name}}</a></span>
                                                    <Icon @click.native="delfileUp(list.childfilesjson, index)" title="删除此文件" type="trash-a"></Icon>
                                                </p>
                                                <div v-if="isbiz && list.childfilesjson.length > 3" class="moreupfiles">
                                                    <Icon type="ios-more"></Icon>
                                                    <div class="moreupfilespanel floatpanel">
                                                        <p v-if="index > 2" v-for="(file, index) in list.childfilesjson" class="fileuplist">
                                                            <span class="single_ellipsis"><a target="_blank" :href="`${imgUrl}/file/preview/${file.hash}`" :title="file.name">{{file.name}}</a></span>
                                                            <Icon @click.native="delfileUp(list.childfilesjson, index)" title="删除此文件" type="trash-a"></Icon>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <Button class="commit" @click="addComment(li.cid, bidx, li)" type="info">提交</Button>
                                        </div>
                                    </div>
                                    <div v-else class="nofileupcommentipt">
                                        <Button @click="addComment(li.cid, bidx, li)" type="info">提交</Button>
                                        <div class="commentiptleft">
                                            <Input @on-enter="addComment(li.cid, bidx, li)" v-model.trim="list.childval" ref="childipt" type="textarea" :autosize="true" :isPrevent="true" :placeholder="'评论 ' + li.name + '：'"></Input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </transition-group>
                    </div>
                </div>
            </div>
        </transition-group>
        <div v-if="!data.data.length" class="nodatalistcry">
            <img src="/static/icon/nodata_cry_icon.png">
            <p>暂时还没有评论！</p>
        </div>
    </div>
</template>

<script>
import moment from 'moment';

export default {
    name: 'z-comment',
    data () {
        return {
            imgUrl,
            data: {
                data: []
            },
            url: {
                geturl: '',
                addurl: '',
                delurl: ''
            },
            bigval: '',
            bigfilesjson: [],
            bigvalwriting: false,
            selectCid: '',
            isbiz: false,
            fileup_param: {}
        }
    },
    props: {
        id: {
            type: Number
        },
        type: {
            type: String,
            default: 'posts'    // posts 知识评论 flow 流程评论 keep 跟进记录评论
        },
        haveBigBtn: {
            type: Boolean,
            default: true
        }
    },
    beforeMount() {
        moment.locale('zh-cn')
        if( this.type == "posts" ){
            this.url = {
                geturl: `/post/comments/list/${this.id}`,
                addurl: '/post/comments/add',
                delurl: '/post/comments/del'
            };
        }
        if( this.type == "flow" || this.type == "keep" ){
            this.isbiz = true;
            this.url = {
                geturl: '/biz/comment/list',
                addurl: '/biz/comment/store',
                delurl: '/biz/comment/del'
            };
            this.fileup_param = {
                'about_type': 'biz_keep_comment',
                'about_id': this.id
            };
        }

        this.getComment();
    },
    mounted() {

    },
    methods: {
        getComment() {
            let params;
            if( this.isbiz ){
                params = { params: { type: this.type, assid: this.id}};
            }
            this.$http.get(this.url.geturl, params).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    let v = response.data;
                    let users = [];
                    v.data.forEach(e => {
                        e.childval = '';
                        e.childfilesjson = [];
                        e.childvalwriting = false;
                        if( this.isbiz ){
                            e.cid = e.cmtid;
                            e.id = e.creator_user.id;
                            e.name = e.creator_user.name;
                            e.time = e.created_at;
                            e.filesjson = e.filesjson ? JSON.parse(e.filesjson) : [];
                            e.sub.forEach(f => {
                                f.cid = f.cmtid;
                                f.id = f.creator_user.id;
                                f.name = f.creator_user.name;
                                f.ruid = f.reply_user.id;
                                f.rname = f.reply_user.name;
                                f.time = f.created_at;
                                f.filesjson = f.filesjson ? JSON.parse(f.filesjson) : [];
                            });
                        }
                        users.push(e.id);
                    });
                    this.data = v;
                    this.$emit('bigUsers', users);
                }else{
                    this.$Message.error( response.data.errmsg );
                }
            }).catch(err => {

            });
        },
        addComment(cid, bidx, list) {
            if (!this.$store.state.loginStatus) {
                this.$Message.warning('请先登录后再进行评论！');
                return false;
            }

            let val;
            let ischild =  bidx === null ? false : true;
            let filesjson;
            if( ischild ){
                if( this.data.data[bidx].childval == '' ){
                    this.$Message.error( '评论内容不能为空！' );
                    return false;
                }
                val = this.data.data[bidx].childval;
                filesjson = this.data.data[bidx].childfilesjson;
                this.$set(this.data.data[bidx], 'childval', '');
                this.$set(this.data.data[bidx], 'childfilesjson', []);
                this.selectCid = '';
            }else{
                if( this.bigval == '' ){
                    this.$Message.error( '评论内容不能为空！' );
                    return false;
                }
                val = this.bigval;
                filesjson = this.bigfilesjson;
                this.bigval = '';
                this.bigfilesjson = [];
            }
            let params = { pid: this.id, cid: cid, content: val};
            if( this.isbiz ){
                params = { type: this.type, assid: this.id, content: val, filesjson: JSON.stringify(filesjson)};
                if( ischild ){
                    params = Object.assign({}, params, { rrid: this.data.data[bidx].cid, ruid: list.id});
                }
            }

            this.$ajax('post', this.url.addurl, params, (data) => {
                let obj = {
                    cid: data.cid || data.cmtid,
                    cmtid: data.cid || data.cmtid,
                    content: val,
                    delable: true,
                    id: this.$store.state.mineInfo.id,
                    name: this.$store.state.mineInfo.name,
                    time: moment().format('YYYY-MM-DD HH:mm:ss'),
                    filesjson: filesjson,
                };
                if( ischild ){
                    obj.rname = list.name;
                    obj.ruid = list.id;
                    this.data.data[bidx].sub.push(obj);
                }else{
                    obj.childfilesjson = [];
                    obj.childvalwriting = false;
                    obj.sub = [];
                    this.data.data.push(obj);
                }
                this.data.total += 1;
                this.$emit('changeCommentLength', {id: this.id, total: this.data.total});
                this.$Message.success( '评论成功！' );
            });
        },
        delComment(cid, bidx, cidx) {
            this.$Modal.confirm({
                title: '确认对话框',
                content: '确定删除吗？',
                onOk: () => {
                    this.$http.post(this.url.delurl + `/${cid}`).then(response => {
                        if( response.data.retcode == RETCODE_OK ){
                            // 存在cidx删除子评论 不存在删除根评论 删除根评论时要加上子评论长度
                            if( cidx === null ){
                                this.data.total -= this.data.data[bidx].sub.length + 1;
                                this.data.data.splice(bidx, 1);
                            }else{
                                this.data.total -= 1;
                                this.data.data[bidx].sub.splice(cidx, 1);
                            }
                            this.$emit('changeCommentLength', {id: this.id, total: this.data.total});
                            this.$Message.success( '删除评论成功！' );
                        }else{
                            this.$Message.error( response.data.errmsg );
                        }
                    });
                }
            });
        },
        replyiffn(id) {
            if( this.selectCid == id ){
                this.selectCid = '';
            }else{
                this.selectCid = id;
                this.$nextTick(()=>{
                    this.$refs.childipt[0].focus();
                });
            }
        },
        fileUpSuccessBig(response, file, fileList) {
            if( response.retcode == RETCODE_OK ){
                this.$refs.fileupbig.clearFiles();
                let newfile = {
                    name: file.name,
                    hash: response.hash
                };
                this.bigfilesjson.push(newfile);
            }else{
                this.$Message.error( '上传文件失败！' );
            }
        },
        fileUpSuccessChild(response, file, fileList) {
            if( response.retcode == RETCODE_OK ){
                this.$refs.fileupchild[0].clearFiles();
                let newfile = {
                    name: file.name,
                    hash: response.hash
                };
                this.data.data.forEach(e => {
                    let f = false;
                    if( e.cmtid == this.selectCid ){
                        f = true;
                    }else{
                        e.sub.forEach(i => {
                            if( i.cmtid == this.selectCid ){
                                f = true;
                            }
                        });
                    }
                    if( f ){
                        e.childfilesjson.push(newfile);
                    }
                });
            }else{
                this.$Message.error( '上传文件失败！' );
            }
        },
        fileUpError(error, file, fileList) {
            console.log(error, file, fileList);
        },
        delfileUp(list, idx) {
            this.$Modal.confirm({
                title: '确认对话框',
                content: '确定删除吗？',
                onOk: () => {
                    list.splice(idx, 1);
                }
            });
        }
    },
    filters: {
        timeconvert(date) {
            if( moment().diff(moment(date), 'days') <= 3 ){
                return moment(date).fromNow();
            }else{
                return moment(date).format('YY/MM/DD HH:mm:ss');
            }
        }
    },
    components: {

    }
}
</script>
