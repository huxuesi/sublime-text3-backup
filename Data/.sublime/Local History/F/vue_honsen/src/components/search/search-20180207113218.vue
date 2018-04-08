<style lang="stylus">
.searchwrap
    margin-top: 17px
    .ivu-card-body
        padding: 22px 121px 30px
        .searchlist
            .head
                height: 44px
                line-height: 44px
                border-bottom: 1px solid #c2d2dc
                .tit
                    font-size: 14px
                    color: #90a8b7
                    display: inline-block
                    height: 42px
                    padding: 0 16px
                    border-bottom: 2px solid #3dc1ff
                .selectsearch
                    line-height: normal
                    height: 44px
                    float: right
                    .selectmenuwrap
                        .ivu-dropdown-rel
                            button
                                width: 102px
                                background: #f5f5f5
                        .ivu-select-dropdown
                            width: 102px
                        &:hover
                            .ivu-dropdown-rel
                                button
                                    background: #3dc1ff
                                    color: #fff
            .content
                    padding: 25px 0 0
                .postlistwrap
                    margin: 0 0 25px
                    font-size: 12px
                    padding: 0 0 15px 0
                    border-bottom: 1px solid #ebebeb
                    .title
                        font-size: 15px
                        a
                            color: #557080
                    .author
                        color: #9ca9af
                        margin: 1px 0 5px
                        a
                            color: #9ca9af
                    .flow
                        margin: 5px 0 0
                        color: #666
                    .des
                        color: #535353
                        margin: 3px 0 0
                        max-height: 36px
                .bizlistwrap
                    .bizcontent
                        span
                            float: left
                            display: inline-block
                        .bizname
                            width: 430px
                            a
                                color: #7c7c7c
                        .editname
                            width: 224px
    em
        font-style: normal
        color: #f00
</style>

<template>
    <div class="searchwrap">
        <Card :bordered="false" dis-hover>
            <Row :gutter="190" type="flex" justify="center">
                <Col v-if="(!type || list.type == type) && list.initdisplay" v-for="list in data" :key="list.type" :span="list.span">
                    <div class="searchlist postwrap">
                        <div class="head posirelative"><span class="tit">{{list.name}}</span>
                            <div class="selectsearch posirelative">
                                <Dropdown @on-click="menuClick($event, list)" class="dropdown" :key="bizmenukey">
                                    <Button>
                                        {{list.child.find((n) => n.key == list.key).name}}
                                        <Icon type="arrow-down-b"></Icon>
                                    </Button>
                                    <DropdownMenu slot="list">
                                        <DropdownItem v-if="li.key != list.key" v-for="(li, idx) in list.child" :key="li.key" :name="li.key" :divided="list.type == 'biz' && showdivided(list, li, idx)">{{li.name}}</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        </div>
                        <div class="content">
                            <div v-for="li in list.list">
                                <!-- 知识 -->
                                <div v-if="list.type == 'post'" class="postlistwrap">
                                    <h3 class="title"><a @click="$router.push({ name: 'postRead', params: { read_pid: li.post_id}})" href="javascript:;" v-html="li.post_title"></a></h3>
                                    <p class="author">{{li.creator_name}}　{{li.update_time | timeconvert}}</p>
                                    <p v-if="li.description" class="des ellipsis2" v-html="li.description"></p>
                                </div>
                                <!-- 用户 -->
                                <div v-if="list.type == 'user'" class="userlistwrap">
                                    <ul>
                                        <z_lawyersList :list.sync="li" mode="two"></z_lawyersList>
                                    </ul>
                                </div>
                                <!-- 业务 -->
                                <div v-if="list.type == 'biz'" class="postlistwrap bizlistwrap">
                                    <h3 class="title"><a @click="gotoCTMDetails(li)" href="javascript:;" v-html="li.customer_name"></a></h3>
                                    <p class="author"><a @click="$router.push({ name: 'personalCenter', params: { id: li.user_id}})" href="javascript:;">客户归属：{{li.user_name}}</a></p>
                                    <p v-if="li.case_id" class="bizcontent clearfix"><span class="bizname single_ellipsis"><a @click="$router.push({ name: 'caseEdit', params: { caseid: li.case_id}})" href="javascript:;">案件名称：<i style="font-style: normal;" v-html="li.case_name"></i></a></span><span class="editname">编辑时间：{{li.time}}</span><span class="bizstate">处理状态：{{li.case_status == 2 ? '未处理' : li.case_status == 1 ? '已结案' : '处理中'}}</span></p>
                                </div>
                            </div>
                            <infinite-loading @infinite="getData($event, list)" :ref="'infiniteLoading' + list.type" spinner="bubbles">
                                <span slot="no-more">没有更多了！</span>
                                <span slot="no-results">
                                    <template v-if="list.list.length">
                                        没有更多了！
                                    </template>
                                    <template v-else>
                                        &nbsp;<img src="/static/img/nosearch1.png" alt="没有搜到内容">
                                    </template>
                                </span>
                            </infinite-loading>
                        </div>
                    </div>
                </Col>
            </Row>
        </Card>
    </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
import z_lawyersList from '@/components/common/z-lawyersList';
import moment from 'moment';

export default {
    name: 'search',
    data () {
        return {
            data: [
                {
                    name: '知识',
                    type: 'post',
                    key: 'qbzs',
                    initkey: 'qbzs',
                    span: 12,
                    initspan: 12,
                    initdisplay: true,
                    child: [
                        { name: '全部知识', key: 'qbzs', keyurl: 'posts'},
                        { name: '公开知识', key: 'gkzs', keyurl: 'outwardposts'},
                        { name: '我的知识', key: 'wdzs', keyurl: 'myposts'},
                        { name: '授权知识', key: 'sqzs', keyurl: 'authposts'}
                    ],
                    list: [],
                    perpage: 9
                },
                {
                    name: '用户',
                    type: 'user',
                    key: 'qbyh',
                    initkey: 'qbyh',
                    span: 12,
                    initspan: 12,
                    initdisplay: true,
                    child: [
                        { name: '全部用户', key: 'qbyh', keyurl: 'user'},
                        { name: '已关注', key: 'ygzyh', keyurl: 'myfollowusers'},
                        { name: '未关注', key: 'wgzyh', keyurl: 'mynotfollowusers'},
                        { name: '认证用户', key: 'rzyh', keyurl: 'leveluser'},
                        { name: '普通用户', key: 'ptyh', keyurl: 'generaluser'}
                    ],
                    list: [],
                    perpage: 8
                },
                {
                    name: '业务',
                    type: 'biz',
                    key: 'qbyw',
                    initkey: 'qbyw',
                    span: 12,
                    initspan: 12,
                    initdisplay: false,
                    child: [
                        { name: '全部业务', key: 'qbyw', keyurl: 'allcasescustomer'},
                        { name: '处理中', key: 'clz', keyurl: 'beingprocessedcase'},
                        { name: '已结案', key: 'yja', keyurl: 'accomplishcase'},
                        { name: '未处理', key: 'wcl', keyurl: 'untreatedcase'},
                        { name: '客户名称', key: 'customername', keyurl: 'searchtocustomer'},
                        { name: '案件名称', key: 'casename', keyurl: 'searchtocase'}
                    ],
                    list: [],
                    perpage: 7
                },
            ],
            type: '',
            keyword: '',
            bizmenukey: 1
        }
    },
    beforeMount() {

    },
    mounted() {
        this.init(true);
    },
    methods: {
        init(isfirst) {
            this.type = this.$route.query.type;
            if( this.type ){
                this.data.forEach(e => {
                    e.key = e.initkey;
                    e.span = e.initspan;
                    e.list = [];
                    if( e.type == this.type ){
                        if( e.type == 'biz' ){
                            e.initdisplay = true;
                        }
                        e.span = 20;
                        if( !isfirst ){
                            this.$nextTick(() => {
                                this.$refs['infiniteLoading' + e.type][0].$emit('$InfiniteLoading:reset');
                            });
                        }
                    }else{
                        if( !isfirst ){
                            this.$nextTick(() => {
                                this.$refs['infiniteLoading' + e.type][0].$emit('$InfiniteLoading:reset');
                            });
                        }
                    }
                });
            }
            this.keyword = this.$route.query.keyword;
        },
        menuClick(e, t) {
            t.key = e;
            t.list = [];
            if( t.type == 'biz' ){
                this.bizmenukey += 1;
            }
            this.$nextTick(() => {
                this.$refs['infiniteLoading' + t.type][0].$emit('$InfiniteLoading:reset');
            });
        },
        getData($state, list) {
            /*if( !([].concat.apply([], this.data.map(e => e.child.map(v => v.key)))).includes(list.key) ){
                console.log('搜索类型错误！');
                return false;
            }*/
            this.$http.get(`/search/${list.child.find(n => n.key == list.key).keyurl}/${this.keyword}`, { params: { page: list.list.length / list.perpage + 1, perpage: list.perpage}}).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    let v = response.data.data;
                    // 如果搜索用户  需要处理
                    if( list.type == 'user' ){
                        v.forEach(e => {
                            e.id = e.user_id;
                            e.name = e.user_name;
                            e.speciality = typeof e.speciality == 'string' ? e.speciality : e.speciality.join('　');
                        });
                    }
                    if( list.type == 'biz' ){
                        v = v.data
                    }
                    list.list = list.list.concat(v);
                    if( v.length < list.perpage ){
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
        showdivided(list, li, idx) {
            // item为指定项时出现线条
            if( li.key == 'customername' || li.key == 'casename' ){
                if( list.key != 'customername' ){
                    return list.child[idx-1] && (list.child[idx-1].key != 'customername' && list.child[idx-1].key != 'casename');
                }else{
                    return true;
                }
            }else{
                return false;
            }
        },
        gotoCTMDetails(list) {
            if( list.checkCustomer == 1 ){
                this.$Message.error('无权查看客户！');
            }else{
                this.$router.push({ name: 'customerDetails', params: { ctmid: list.customer_id}});
            }
        }
    },
    filters: {
        timeconvert(date) {
            return moment(date).format('YY/MM/DD');
        }
    },
    watch: {
        /*$route() {
            this.init();
        }*/
    },
    components: {
        z_lawyersList,
        InfiniteLoading
    }
}
</script>
