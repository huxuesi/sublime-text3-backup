<style lang="stylus">
.z-recommend
    .recommendleft
        position: relative
        .ivu-card-head
            border-bottom: none
            padding: 0
            .lefthead
                background: #64778a
                height: 68px
                line-height: 68px
                border-radius: 3px 3px 0 0
                color: #fff
                .hoticon
                    margin: -2px 5px 0 5px
                    vertical-align: middle
                .location
                    display: inline-block
                    padding-right: 2px
                    width: 100%
                    text-align: right
                    color: #fff
                    i:first-child
                        margin: 0 6px 0 0
                    i:last-child
                        margin: 0 0 0 6px
                    .locationname
                        display: inline-block
                        max-width: 82px
                        vertical-align: top
        .ivu-card-body
            .middle
                .categoryul
                    min-height: 399px
                    padding: 0 0 49px
                    li
                        line-height: 50px
                        padding: 0 0 0 20px
                        position: relative
                        a
                            color: #808080
                            &.active
                                color: #3dc1ff
                        .childcategory
                            position: absolute
                            top: 16px
                            left: 108px
                            width: 128px
                            a
                                display: block
                                height: 66px
                                line-height: 66px
                                text-align: center
                                &:hover,&.active
                                    background: #3dc1ff
                                    color: #fff !important
                                &:first-child
                                    border-radius: 3px 3px 0 0
                                &:last-child
                                    border-radius: 0 0 3px 3px
                                &:only-child
                                    border-radius: 3px
            .bottom
                text-align: center
        .locationpanel
            position: absolute
            top: 76px
            left: 100px
            width: 580px
            background: #fff
            box-shadow: 0 0 16px rgba(131,131,131,0.4)
            z-index: 1
            border: 1px solid #d1d1d1
            .locationhead
                height: 60px
                line-height: 60px
                padding: 0 0 0 33px
                color: #7c7c7c
                border-bottom: 1px solid #d1d1d1
                .addressicon
                    color: #3dc1ff
                    margin: 0 7px 0 25px
                .closeicon
                    font-size: 20px
                    float: right
                    height: 100%
                    width: 50px
                    line-height: 60px
                    cursor: pointer
                    text-align: center
            .locationbody
                padding: 21px 40px 49px
                font-size: 14px
                .titlep
                    margin: 0 0 20px
                    span
                        display: inline-block
                        padding: 0 10px
                        background: #b4c6d1
                        border-radius: 13px
                        height: 26px
                        line-height: 26px
                        color: #fff
                .hotcity
                    margin: 0 0 9px
                    li
                        text-align: center
                        margin: 0 0 11px
                        a
                            color: #929292
                            &.active
                                color: #64cdff !important
                    .ivu-col:first-child
                        li
                            a
                                color: #000
                .ivu-cascader-label
                    cursor: text
                .ivu-cascader-menu
                    min-width 170px !important
                    .ivu-cascader-menu-item
                        overflow hidden
                        // text-overflow ellipsis
                        white-space: nowrap !important
                .ivu-select-item
                    overflow hidden
                    white-space: nowrap !important
    .recommendright
        .userlistwrap
            padding: 17px 10px 13px
            .userlistul
                min-height: 516px
        .nodata
            padding: 212px 0 0
            color: #9a9494
            font-size: 14px
            text-align: center
    .smallwrap
        padding: 0 0 6px 0
        position: relative
        .smalluserlist
            padding: 0 16px 20px 20px
            margin-bottom: 6px
            height: 225px
            border-bottom: 1px solid #efefef
        .nodata
            padding: 94px 0 0
            color: #9a9494
            font-size: 14px
            text-align: center
    .changeuser
        text-align: center
        position: relative
        .changeuserbtn
            width: 296px
        .changeuserbtn,.refreshbtn
            i
                transform: rotate(45deg)
                font-size: 20px
                vertical-align: text-bottom
        .refreshbtn
            padding: 0 36px 0 30px
            // font-size: 14px
            // color: #b4c6d1
            // &:hover
            //     color: #64cdff
        .followall,.nextstep
            padding: 0 36px
            margin-left: 13px
        .intohomea
            position: absolute
            right: 0
            bottom: 0
            font-size: 14px
            color: #545454
    .changeuserloading
        .turnloadicon
            animation: turnload 1s linear infinite
    @keyframes turnload {
        from { transform: rotate(0deg)}
        50%  { transform: rotate(180deg)}
        to   { transform: rotate(360deg)}
    }
</style>

<template>
    <div class="z-recommend">
        <div v-if="mode == 'small'" class="smallwrap">
            <ul class="smalluserlist">
                <Row :gutter="16">
                    <Col span="12" v-for="list in userlist" :key="list.id">
                        <z_lawyersList :list.sync="list" :mode="mode"></z_lawyersList>
                    </Col>
                    <Col span="24" v-if="!userlist.length && !userloading">
                        <div class="nodata">暂时没有推荐的律师</div>
                    </Col>
                </Row>
            </ul>
            <div :class="{changeuserloading: userloading}" class="changeuser commonform">
                <Button @click="changeUserList" type="info" class="btn refreshbtn"><Icon class="turnloadicon" type="ios-loop-strong"></Icon>&nbsp;&nbsp;换一批</Button>
            </div>
            <Spin size="large" fix v-if="userloading">
                <Icon type="load-c" class="spin-icon-load"></Icon>
                <div>加载中...</div>
            </Spin>
        </div>
        <Row v-else :gutter="20">
            <Col span="6">
                <Card :bordered="false" class="recommendleft" dis-hover>
                    <div slot="title" class="lefthead">
                        <Row>
                            <Col span="11"><img src="/static/icon/fire_icon.png" class="hoticon">热门律师</Col>
                            <Col span="13">
                                <a @click="togglelocationpanel" href="javascript:;" class="location">
                                    <Icon type="android-pin"></Icon>
                                    <span class="locationname single_ellipsis">{{selectlocation[selectlocation.length - 1]}}</span>
                                    <Icon type="chevron-down"></Icon>
                                </a>
                            </Col>
                        </Row>
                    </div>
                    <div class="middle">
                        <ul class="categoryul">
                            <Row>
                                <Col span="12" v-for="(list, index) in categoryList" :key="list.tid">
                                    <li @mouseenter="categoryHover(list.tid, index)" @mouseleave="categoryLeave(list.tid, index)">
                                        <a @click="changeCategory(list.tid)" :class="{active: curcategoryid === list.tid }" href="javascript:;">{{list.name}}</a>
                                        <div v-if="list.visible" class="childcategory floatpanel">
                                            <a @click="changeChildCategory(list.tid, li.tid)" v-for="li in list.child" :class="{active: curchildcategoryid === li.tid }" href="javascript:;">
                                                {{li.name}}
                                            </a>
                                        </div>
                                    </li>
                                </Col>
                            </Row>
                        </ul>
                    </div>
                    <div class="bottom">
                        <img src="/static/img/login_middle_bottom.png">
                    </div>
                    <div v-if="locationpanel" class="locationpanel">
                        <div class="locationhead">
                            地区选择<Icon class="addressicon" type="android-pin"></Icon>{{selectlocation[selectlocation.length - 1]}}<Icon @click.native="togglelocationpanel" class="closeicon" type="android-close"></Icon>
                        </div>
                        <div class="locationbody">
                            <p class="titlep"><span>热门城市</span></p>
                            <ul class="hotcity">
                                <Row>
                                    <Col span="3" v-for="list in hotcity" :key="list[list.length - 1]">
                                        <li><a @click="changelocation(list)" :class="{active: selectlocation[selectlocation.length - 1] === list[list.length - 1] }" href="javascript:;">{{list[list.length - 1]}}</a></li>
                                    </Col>
                                </Row>
                            </ul>
                            <p class="titlep"><span>精确地区</span></p>
                            <Row :gutter="10">
                                <Col span="16">
                                    <Cascader class="select_local" v-model="selectlocal" @on-change="selectlocalfn" @onChangeQueryWord="onChangeQueryWord" :data="siteJson" :clearable="false" filterable change-on-select placeholder="请输入或选择"></Cascader>
                                </Col>
                                <Col span="8">
                                    <Button @click="changelocation(false)" type="info">确 认</Button>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Card>
            </Col>
            <Col span="18">
                <Card :bordered="false" class="recommendright" dis-hover>
                    <div class="userlistwrap">
                        <ul class="userlistul">
                            <Row :gutter="40">
                                <Col span="12" v-for="list in userlist" :key="list.id">
                                    <z_lawyersList :list.sync="list" :mode="mode"></z_lawyersList>
                                </Col>
                                <Col span="24" v-if="!userlist.length && !userloading">
                                    <div class="nodata">此分类下暂时没有推荐的律师</div>
                                </Col>
                            </Row>
                        </ul>
                        <div :class="{changeuserloading: userloading}" class="changeuser commonform">
                            <div v-if="mode == 'recommendpage'">
                                <Button @click="changeUserList" type="info" class="btn refreshbtn"><Icon class="turnloadicon" type="ios-loop-strong"></Icon>&nbsp;&nbsp;换一批</Button>
                                <Button @click="allfollow" class="btn followall" type="ghost">全部关注</Button>
                                <a @click="$router.push({ name: 'feed'})" href="javascript:;" class="intohomea">进入动态页&gt;&gt;</a>
                            </div>
                            <div v-if="mode == 'loginpage'">
                                <Button @click="changeUserList" type="info" class="btn changeuserbtn"><Icon class="turnloadicon" type="ios-loop-strong"></Icon>&nbsp;&nbsp;换一批</Button>
                            </div>
                        </div>
                    </div>
                    <Spin size="large" fix v-if="userloading">
                        <Icon type="load-c" class="spin-icon-load"></Icon>
                        <div>加载中...</div>
                    </Spin>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import siteJson from '../../../static/json/siteJsonMin.json';
import z_lawyersList from '@/components/common/z-lawyersList';

export default {
    name: 'z-recommend',
    data () {
        return {
            imgUrl,
            siteJson,
            isfirst: true,
            categoryList: [],
            curcategoryid: '',
            curchildcategoryid: '',
            userlist: [],
            userloading: false,
            page: 1,
            locationpanel: false,
            selectlocation: ['定位中...'], //定位的地址
            selectlocal: [],    //下拉框
            querylocal: '',
            isselect: 0,
            hotcity: [
                ['全国'],
                ['北京市'],
                ['上海市'],
                ['广东省', '广州市'],
                ['广东省', '深圳市'],
                ['浙江省', '杭州市'],
                ['四川省', '成都市'],
                ['重庆市'],
                ['福建省', '厦门市'],
                ['天津市'],
                ['海南省', '三亚市'],
                ['江苏省', '南京市'],
                ['湖南省', '长沙市'],
                ['湖北省', '武汉市'],
                ['山东省', '青岛市'],
                ['云南省', '昆明市']
            ]
        }
    },
    props: {
        mode: String,
        perpage: {
            type: Number,
            default: 8
        }
    },
    computed: {
        recommendKey() {
            return this.$store.state.recommendKey;
        }
    },
    beforeMount() {
        this.getCategory();
        this.getuserip();
    },
    mounted() {
        // 只要进过本页就改 key
        if( this.mode != 'small' ){
            this.isfirst = false;
        }
    },
    activated() {
        this.locationpanel = false;
    },
    methods: {
        togglelocationpanel() {
            this.locationpanel = !this.locationpanel;
            if( !this.locationpanel ){
                this.selectlocal = [];
            }
        },
        getCategory(id, childidx) {
            let url;
            if( id ){
                url = `/posttag/get/${id}`;
            }else{
                url = '/posttag/get';
            }
            this.$http.get(url).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    let v = response.data.data;
                    if( id ){
                        this.$set(this.categoryList[childidx], 'child', v);
                    }else{
                        v.unshift({tid: '', name: '全部'});
                        v.forEach(val => {
                            val.child = [];
                            val.visible = false;
                            val.isgetchild = false;
                        });
                        this.categoryList = v;
                    }
                }else{
                    this.$Message.error( response.data.errmsg );
                }
            }).catch(err => {

            });
        },
        changeCategory(id) {
            this.curcategoryid = id;
            this.curchildcategoryid = '';
            this.getUserList(id);
        },
        changeChildCategory(fid, id) {
            this.curcategoryid = fid;
            this.curchildcategoryid = id;
            this.getUserList(id);
        },
        categoryHover(id, childidx) {
            if( id ){
                if( !this.categoryList[childidx].isgetchild ){
                    this.getCategory(id, childidx);
                    this.$set(this.categoryList[childidx], 'isgetchild', true);
                }
                this.$set(this.categoryList[childidx], 'visible', true);
            }
        },
        categoryLeave(id, childidx) {
            if( id ){
                this.$set(this.categoryList[childidx], 'visible', false);
            }
        },
        getUserList(id, ismore) {
            let url;
            if( id ){
                url = `/posttag/getuser/${id}`;
            }else{
                url = '/posttag/getuser';
            }
            if( ismore ){
                this.page ++;
            }else{
                this.page = 1;
            }
            this.userloading = true;
            let text = this.selectlocation[0] && this.selectlocation[0].indexOf('市') == -1? '': this.selectlocation[0] + '-';
            let params = {
                page: this.page,
                perpage: this.perpage,
                position: text + this.selectlocation.join('-'),
                isselect: this.isselect
            };
            this.$http.get(url, {params: params}).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    let v = response.data.data;
                    v.data.forEach(val => {
                        if( val.speciality.length ){
                            let arr = [];
                            val.speciality.forEach(val => {
                                arr.push(val.name);
                            })
                            val.speciality = arr.join("　");
                        }else{
                            val.speciality = '';
                        }
                    });
                    this.userlist = v.data;
                    if( this.page >= v.last_page ){
                        this.page = 0;
                    }
                }else{
                    this.$Message.error( response.data.errmsg );
                }
                this.userloading = false;
            }).catch(err => {
                this.userloading = false;
            })
        },
        changeUserList() {
            if( this.userloading ){
                return false;
            }
            if( this.curchildcategoryid ){
                this.getUserList(this.curchildcategoryid, true);
            }else if( this.curcategoryid ){
                this.getUserList(this.curcategoryid, true);
            }else{
                this.getUserList('', true);
            }
        },
        changelocation(v) {
            if( this.userloading ){
                return false;
            }
            if( v ){    // 直接选择城市
                this.selectlocation = v;
                // 一堆
                // this.curcategoryid = '';
                this.isselect = 1;
                this.getUserList(this.curcategoryid);
                this.selectlocal = [];
            }else{      // 通过选择框选择 也就是点了确定按钮
                this.userloading = true;
                setTimeout(() => {
                    // 判断点了确定时有没有下拉选择
                    if( this.selectlocal.length ){  // 选择了
                        this.userloading = false;
                        this.selectlocation = this.selectlocal;
                        // 一堆
                        // this.curcategoryid = '';
                        this.isselect = 1;
                        this.getUserList(this.curcategoryid);
                    }else{  // 没选择
                        // 没选择时判断搜索词是否有效 无效则不执行操作
                        if( this.querylocal.length > 1 ){  // 搜索词大于一个字
                            // 请求真实地址
                            this.$ajax('get', '/district/addressresolution', { address: this.querylocal}, 'userloading', (data) => {
                                let arr = data.address.split('-');
                                if( arr.length >= 2 && arr[0] == arr[1]){
                                    arr.shift();
                                }
                                this.selectlocation = arr;
                                // 一堆
                                // this.curcategoryid = '';
                                this.isselect = 1;
                                this.getUserList(this.curcategoryid);
                            });
                        }else{  // 一个字或以下
                            this.userloading = false;
                            this.$Message.error('无效的地址，不进行搜索！');
                        }
                    }
                    this.querylocal = '';
                    this.selectlocal = [];
                }, 500);
            }
            this.locationpanel = false;
        },
        selectlocalfn(v) {
            if( v.length ){
                let arr = [];
                v.forEach(e => {
                    if( e ){
                        arr.push(e);
                    }
                });
                this.selectlocal = arr;
            }
        },
        allfollow() {
            if( !this.userlist.length ){
                this.$Message.error('没有可关注的律师！');
                return false;
            }
            let v = [];
            this.userlist.forEach(e => {
                if( !e.follow && e.id != this.$store.state.mineInfo.id ){
                    v.push(e.id);
                }
            });
            if( !v.length ){
                this.$Message.error('本页律师已全部关注！');
                return false;
            }
            this.$http.post('/user/followall', { fids: v}).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    this.userlist.forEach(e => {
                        e.follow = 1;
                    });
                    this.$Message.success('本页律师全部关注成功!');
                }else{
                    this.$Message.error( response.data.errmsg );
                }
            }).catch(err => {

            });
        },
        getuserip() {
            this.userloading = true;
            let defaultlocation = ['广东省', '深圳市'];
            if( this.mode !== 'small' ){
                this.$http.get('/getip').then(response => {
                    if( response.data.retcode == RETCODE_OK ){
                        if( response.data.ip_province !== '' && response.data.ip_city !== '' ){
                            defaultlocation = [response.data.ip_province, response.data.ip_city];
                        }
                    }
                    this.selectlocation = defaultlocation;
                    this.getUserList();
                }).catch(err => {
                    this.selectlocation = defaultlocation;
                    this.getUserList();
                });
            }else{
                this.selectlocation = defaultlocation;
                this.getUserList();
            }
        },
        onChangeQueryWord(word) {
            if( word ){
                this.selectlocal = [];
                this.querylocal = word;
            }
        }
    },
    watch: {
        recommendKey(nv, ov) {
            if( this.mode != 'small' && !this.isfirst ){
                this.changeCategory('');
            }
        }
    },
    components: {
        z_lawyersList
    }
}
</script>
