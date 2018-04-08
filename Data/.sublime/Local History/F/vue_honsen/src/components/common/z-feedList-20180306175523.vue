<style lang="stylus">
.z-feedList
    .feedlistcard
        margin: 0 0 14px
        &:hover
            box-shadow: 0 0 29px rgba(149, 159, 164, 0.3)
        &.ivu-card-dis-hover:hover
            box-shadow: none
        .ivu-card-body
            padding: 27px 31px 23px 6px
            .feedlist
                .lhead
                    float: left
                    width: 126px
                    text-align: center
                    .headimg
                        width: 71px
                        height: 71px
                        margin: 0 auto
                        border-radius: 50%
                        border: 3px solid #fff
                        box-shadow: 0 3px 9px #dcdcdc
                        position: relative
                        cursor: pointer
                        &:hover
                            border: 1px solid #3dc1ff
                            box-shadow: 0 0 20px #8ad9ff
                    .name
                        font-size: 14px
                        color: #000
                        margin: 10px 0 0
                    .zhiwei
                        font-size: 12px
                        color: #5c5c5c
                .linfo
                    margin: 0 0 0 126px
                    padding: 0 0 0 28px
                    border-left: 1px solid #e2eaee
                    .tit
                        font-size: 17px
                        .ctmname
                            font-size: 14px
                            color: #333
                            a
                                color: #3dc1ff
                        & > a
                            color: #16a9ee
                            display inline-block
                            max-width 85%
                            overflow: hidden
                            text-overflow: ellipsis
                            white-space: nowrap
                            &:hover
                                color: #2c2c2c !important
                        .titright
                            display: inline-block
                            float: right
                            font-size: 12px
                            color: #becad0
                            .iconwrap
                                display: inline-block
                                margin-right: 2px
                                vertical-align: middle
                                .ivu-icon
                                    font-size: 17px
                                &:hover
                                    .ivu-icon
                                        color: #3dc1ff
                                .ivu-poptip-body-content
                                    color: #818181
                                    max-height: 120px
                                    width: 256px
                                    .editlogs
                                        .lname
                                            float: left
                                            width: 70px
                                        .rtime
                                            float: right
                        .bizstit
                            height: 24px
                            a
                                color: #000
                            .bizstitname
                                display: inline-block
                                max-width: 328px
                    .flowlist
                        font-size: 14px
                        line-height: 1
                        margin-top: 8px
                    .deswrap
                        .des
                            margin-top: 9px
                            font-size: 12px
                            .content
                                line-height: 1.8
                                height: 46px
                                color: #595959
                                word-break: break-word
                                word-wrap: break-word
                                font-size: 13px
                                /*&:hover
                                    color: #64cdff*/
                            .readall
                                margin: 3px 0 0
                                text-align: right
                        &.haveimg
                            height: 72px
                            .desimg
                                width: 106px
                                height: 72px
                                overflow: hidden
                                float: left
                                background-size cover
                                background-repeat no-repeat
                            .des
                                margin-left: 119px
                    .plusmore
                        margin-top: 11px
                        font-size: 12px
                        span
                            margin: 0 35px 0 0
                            &:not(.tag)
                                cursor: pointer
                            img
                                vertical-align: text-bottom
                                margin: 0 6px 0 0
</style>

<template>
    <div class="z-feedList">
        <Card v-if="type == 'posts'" v-for="list in feedlist" :key="list.pid" class="feedlistcard" :bordered="!dishover" :dis-hover="dishover">
            <div class="clearfix feedlist">
                <div class="lhead">
                    <div @click="$router.push({ name: 'personalCenter', params: { id: list.id}})" class="headimg">
                        <img class="img" :src="$avatarHash(list.id)">
                        <img v-if="list.isVip" class="icon" src="/static/icon/vip.png">
                    </div>
                    <div class="name single_ellipsis">{{list.name}}</div>
                    <div class="zhiwei">
                        <span>{{$authCodeT(list.vip).role}}1</span>
                    </div>
                </div>
                <div class="linfo">
                    <div class="tit">
                        <a @click.prevent="$router.push({ name: 'postRead', params: { read_pid: list.pid}})" :href="`/post/read/${list.pid}`">{{list.title}}</a>
                        <div class="titright">
                            <div class="iconwrap">
                                <Poptip v-if="list.editlogs.length" trigger="hover" placement="bottom">
                                    <Icon type="information-circled"></Icon>
                                    <div slot="content">
                                        <p class="editlogs clearfix" v-for="li in list.editlogs"><span class="lname single_ellipsis" :title="li.name">{{li.name}}</span><span class="rtime">修改于 {{li.time | timeconvert}}</span></p>
                                    </div>
                                </Poptip>
                                <Icon v-else type="information-circled"></Icon>
                            </div>
                            {{list.time | timeconvert2}}
                        </div>
                    </div>
                    <div :class="{ haveimg: list.thumb}" class="deswrap">
                        <!-- @click="$router.push({ name: 'postRead', params: { read_pid: list.pid}})" -->
                        <div
                            v-if="list.thumb"
                            class="desimg"
                            :style="{backgroundImage: `url(${list.thumb.substr(0,4) == 'http'?list.thumb: imgUrl + list.thumb})`}">
                        </div>
                        <div class="des">
                            <!-- @click="$router.push({ name: 'postRead', params: { read_pid: list.pid}})" -->
                            <div class="content ellipsis2" v-html="list.summary"></div>
                            <!-- <p class="readall"><a @click="$router.push({ name: 'postRead', params: { read_pid: list.pid}})" href="javascript:;">阅读全文&gt;&nbsp;</a></p> -->
                        </div>
                    </div>
                    <div class="plusmore">
                        <span @click="likefn(list)">
                            <img v-if="list.is_upvoted" src="/static/icon/feed_like_.png">
                            <img v-else src="/static/icon/feed_like.png">{{list.upvote_num}}
                        </span>
                        <span @click="list.displaycomment = !list.displaycomment">
                            <img v-if="list.displaycomment" src="/static/icon/feed_comment_.png">
                            <img v-else src="/static/icon/feed_comment.png">{{list.comment_num}}
                        </span>
                        <span @click="collectfn(list)">
                            <img v-if="list.is_collected" src="/static/icon/feed_star_.png">
                            <img v-else src="/static/icon/feed_star.png">{{list.collect_num}}
                        </span>
                    </div>
                    <div v-if="list.displaycomment" class="commentwrap">
                        <z_comment :id="list.pid" @changeCommentLength="changeCommentNum"></z_comment>
                    </div>
                </div>
            </div>
        </Card>

        <Card v-if="type == 'bizs'" v-for="list in feedlist" :key="list.caseid" class="feedlistcard" :bordered="false" :dis-hover="true">
            <div class="clearfix feedlist">
                <div class="lhead">
                    <div @click="$router.push({ name: 'personalCenter', params: { id: $store.state.mineInfo.id}})" class="headimg">
                        <img class="img" :src="$avatarHash(list.creator)">
                        <img v-if="list.isVip" class="icon" src="/static/icon/vip.png">
                    </div>
                    <div class="name">{{$store.state.mineInfo.name}}</div>
                    <div class="zhiwei">
                        <span>{{$authCodeT($store.getters.auth_code_123).role}}</span>
                    </div>
                </div>
                <div class="linfo">
                    <div class="tit">
                        <Row class="bizstit">
                            <Col span="9">
                                <a class="bizstitname single_ellipsis" @click="$router.push({ name: 'caseRead', params: { caseid: list.caseid}})" href="javascript:;">{{list.casename}}</a>
                            </Col>
                            <Col span="10">
                                <div class="ctmname single_ellipsis">客户名称：<a @click="$router.push({ name: 'customerDetails', params: { ctmid: list.ctmid}})" href="javascript:;">{{list.ctmname}}</a></div>
                            </Col>
                            <Col span="5">
                                <div class="titright">
                                    <div v-if="0" class="iconwrap">
                                        <Poptip v-if="0" trigger="hover" placement="bottom">
                                            <Icon type="information-circled"></Icon>
                                            <div slot="content">
                                                <p class="editlogs clearfix" v-for="li in list.editlogs"><span class="lname single_ellipsis" :title="li.name">{{li.name}}</span><span class="rtime">修改于 {{li.time | timeconvert}}</span></p>
                                            </div>
                                        </Poptip>
                                        <Icon v-else type="information-circled"></Icon>
                                    </div>
                                    {{list.time | timeconvert3}}
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div class="flowlist">{{list.flowName.join('　')}}</div>
                    <div :class="{ haveimg: 0}" class="deswrap">
                        <div v-if="0" class="desimg">
                            <img :src="list.thumb">
                        </div>
                        <div class="des">
                            <!-- @click="$router.push({ name: 'caseRead', params: { caseid: list.caseid}})"  -->
                            <div class="content ellipsis2">{{list.keep ? '跟进记录：' + list.keep : ''}}</div>
                            <!-- <p class="readall"><a @click="$router.push({ name: 'caseRead', params: { caseid: list.caseid}})" href="javascript:;">查看更多&gt;&nbsp;</a></p> -->
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        <Card v-if="type == 'bestPost'" v-for="list in feedlist" :key="list.pid" class="feedlistcard" :bordered="!dishover" :dis-hover="dishover">
            <div class="clearfix feedlist">
                <div class="lhead">
                    <div @click="$router.push({ name: 'personalCenter', params: { id: list.userid}})" class="headimg">
                        <img class="img" :src="$avatarHash(list.userid)">
                        <img v-if="list.isVip" class="icon" src="/static/icon/vip.png">
                    </div>
                    <div class="name single_ellipsis">{{list.userName}}</div>
                    <div class="zhiwei">
                        <span>{{$authCodeT(list.vip).role}}</span>
                    </div>
                </div>
                <div class="linfo">
                    <div class="tit">
                        <a @click.prevent="$router.push({ name: 'postRead', params: { read_pid: list.pid}})" :href="`/post/read/${list.pid}`">{{list.title}}</a>
                        <div class="titright">
                            {{list.time | timeconvert2}}
                        </div>
                    </div>
                    <div :class="{ haveimg: list.thumb}" class="deswrap">
                        <div
                            v-if="list.thumb"
                            class="desimg"
                            :style="{backgroundImage: `url(${list.thumb.substr(0,4) == 'http'?list.thumb: imgUrl + list.thumb})`}">
                        </div>
                        <div class="des">
                            <div class="content ellipsis2" v-html="list.summary"></div>
                        </div>
                    </div>
                    <div class="plusmore">
                        <span @click="likefn(list)">
                            <img v-if="list.is_upvoted" src="/static/icon/feed_like_.png">
                            <img v-else src="/static/icon/feed_like.png">{{list.upvoteNum}}
                        </span>
                        <span @click="list.displaycomment = !list.displaycomment">
                            <img v-if="list.displaycomment" src="/static/icon/feed_comment_.png">
                            <img v-else src="/static/icon/feed_comment.png">{{list.commentNum}}
                        </span>
                        <span @click="collectfn(list)">
                            <img v-if="list.is_collected" src="/static/icon/feed_star_.png">
                            <img v-else src="/static/icon/feed_star.png">{{list.collectNum}}
                        </span>
                        <span v-if="list.tagsName.length" class="tag">
                            <img src="/static/icon/tag.png">
                            {{list.tagsName.join('　')}}
                        </span>
                    </div>
                    <div v-if="list.displaycomment" class="commentwrap">
                        <z_comment :id="list.pid" @changeCommentLength="changeCommentNum"></z_comment>
                    </div>
                </div>
            </div>
        </Card>

        <infinite-loading @infinite="onInfiniteFeedList" ref="infiniteLoading">
            <span slot="no-more">没有更多了！</span>
            <span slot="no-results">没有更多了！</span>
        </infinite-loading>
    </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
import z_comment from '@/components/common/z-comment';
import moment from 'moment';

export default {
    name: 'z-feedList',
    data () {
        return {
            imgUrl,
            feedlist: [],
            addparams: {},
            likefnloading: false,
            collectfnloading: false
        }
    },
    props: {
        type: {
            type: String,
            default: 'posts'
        },
        num: {
            type: Number,
            default: 8
        },
        initid: {
            type: Number,
            default: 0
        },
        mark: {
            type: Number,
            default: null
        },
        dishover:{
            type: Boolean,
            default: true
        }
    },
    beforeMount() {
        moment.locale('zh-cn');
        if( this.initid ){
            this.addparams = {
                uid: this.initid
            };
        }
    },
    mounted() {

    },
    methods: {
        onInfiniteFeedList($state) {
            let url = '/feed';
            let params = {
                start: this.feedlist.length + 1,
                num: this.num,
                comments: 0,
                type: this.type,
                mark: this.mark
            };

            if( this.type == 'bizs' || this.type == 'bestPost'){
                url = this.type == 'bizs'? '/biz/case/mycaselist': '/post/highqualityposts';
                params = {};
                this.addparams = {
                    page: this.feedlist.length / this.num + 1,
                    perpage: this.num
                };
            }

            params = {
                params: Object.assign(params, this.addparams)
            };
            this.$http.get(url, params).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    let v = response.data.data;
                    let l;
                    if( this.type == 'bizs'){
                        this.feedlist = this.feedlist.concat(v.data);
                        l = v.data.length;
                    } else if(this.type == 'bestPost'){
                        v.data.forEach(e => {
                            e.displaycomment = false;
                        });
                        this.feedlist = this.feedlist.concat(v.data);
                        l = v.data.length;
                    } else{
                        v.forEach(e => {
                            e.displaycomment = false;
                        });
                        this.feedlist = this.feedlist.concat(v);
                        l = v.length;
                    }
                    if( l < this.num ){
                        $state.complete();
                    }else{
                        $state.loaded();
                    }
                }else{
                    this.$Message.error( response.data.errmsg );
                }
            }).catch(err => {

            });
        },
        changeFilter(type, id) {
            if( type == "group" ){
                this.addparams = {
                    utagid: id || 0
                };
            }else{
                this.addparams = {
                    uid: id
                };
            }
            this.feedlist = [];
            this.$nextTick(() => {
                this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
            });
        },
        likefn(list) {
            if (!this.$store.state.loginStatus) {
                this.$Message.warning('请先登录后再操作！');
                return false;
            }

            if( this.likefnloading ){
                return false;
            }
            let type = list.is_upvoted ? 'downvote' : 'upvote';

            this.$ajax('post', `/post/upvote/${type}/${list.pid}`, 'likefnloading', (data) => {
                if( type == 'downvote' ){
                    list.is_upvoted = 0;
                    if (this.type == 'bestPost') {
                        list.upvoteNum --;
                    } else {
                        list.upvote_num --;
                    }
                    this.$Message.success( '取消了点赞！' );
                }else{
                    list.is_upvoted = 1;
                    if (this.type == 'bestPost') {
                        list.upvoteNum ++;
                    } else {
                        list.upvote_num ++;
                    }
                    this.$Message.success( '点赞成功！' );
                }
            });
        },
        collectfn(list) {
            if (!this.$store.state.loginStatus) {
                this.$Message.warning('请先登录后再操作！');
                return false;
            }

            if( this.collectfnloading ){
                return false;
            }
            let type = list.is_collected ? 'uncollect' : 'collect';

            this.$ajax('post', `/post/collect/${type}/${list.pid}`, 'collectfnloading', (data) => {
                if( type == 'uncollect' ){
                    list.is_collected = 0;
                    if (this.type == 'bestPost') {
                        list.collectNum --;
                    } else {
                        list.collect_num --;
                    }
                    this.$Message.success( '取消了收藏！' );
                }else{
                    list.is_collected = 1;
                    if (this.type == 'bestPost') {
                        list.collectNum ++;
                    } else {
                        list.collect_num ++;
                    }
                    this.$Message.success( '收藏成功！' );
                }
            });
        },
        changeCommentNum(obj) {
            this.feedlist.forEach(e => {
                if( e.pid == obj.id ){
                    if (this.type == 'bestPost') {
                        e.commentNum = obj.total;
                    } else {
                        e.comment_num = obj.total;
                    }
                }
            });
        }
    },
    filters: {
        timeconvert(date) {
            return moment(date).format('YY-MM-DD HH:mm');
        },
        timeconvert2(date) {
            return moment(date).format('YY/MM/DD');
        },
        timeconvert3(date) {
            return moment(date).format('YYYY/MM/DD');
        }
    },
    components: {
        InfiniteLoading,
        z_comment
    }
}
</script>
