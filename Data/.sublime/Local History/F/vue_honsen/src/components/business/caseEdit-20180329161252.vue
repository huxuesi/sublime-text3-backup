<style lang="stylus">
@import '../../common/stylus/mixin.styl'
.caseeditv2
    .caseedittophead
        margin-bottom: 14px
        button
            font-size: 14px
            color: #333
            background: #fff
            border-color: #e1e1e1
            img
                vertical-align: middle
                margin-right: 3px
    .caseeditmiddlewrap
        background: #fff
        box-shadow: 1px 0 8px rgba(24, 144, 255, 0.25)
        border-radius: 3px
        .middleheadwrap
            background: #64778a
            border-radius: 3px 3px 0 0
            .middlehead
                height: 50px
                display: flex
                align-items: center
                justify-content: space-between
            .casename
                color: #fff
                font-size: 17px
        .middlecenter
            .caseinfowrap
                padding: 14px 0
                .caseinfoformwrap
                    padding: 17px 0 0 68px
                    color: #333
                    display: flex
                    // align-items: center
                    // justify-content: space-between
                    flex-wrap: wrap
                    .formitem1, .formitem2
                        span.itemtit
                            color: #999
                    .formitem1
                        height: 44px
                        line-height: 44px
                        width: 550px
                    .formitem2
                        height: 44px
                        line-height: 44px
                        width: 470px
            .intrustinfo
                padding: 14px 0
                .intrustinfoformwrap
                    padding: 17px 68px 0 68px
                    .content
                        max-height: 278px
                        overflow-y: auto
            .commoncaseinfohead
                height: 40px
                border-bottom: 1px solid #e1e1e1
                margin: 0 35px
                display: flex
                align-items: center
                justify-content: space-between
                .tit
                    color: #333
                    display: inline-block
                    width: 867px
                .author
                    display: inline-block
                    width: 123px
                    color: #999
        .middlebottom
            display: flex
            align-items: center
            justify-content: space-between
            padding: 0 35px
            border-top: 1px solid #e1e1e1
            border-radius: 0 0 3px 3px
            .middlebottomitem
                height: 50px
                display: flex
                align-items: center
                & > div
                    .hov
                        display: none
                    &:hover
                        .def
                            display: none
                            cursor: pointer
                        .hov
                            display: inline-block
                            cursor: pointer
                .line
                    margin: 0 30px
                    color: #f1f1f1
                &.middlebottomitem2
                    font-size: 12px
                    color: #999
                    .num
                        margin-left: 7px
                .itemtreewrap
                    // position: relative
                    .itemtree
                        // position: absolute
                        // bottom: 39px
                        padding: 18px 0
                        // z-index: 1000
                        .ivu-btn
                            margin: 0 auto

                        .treewrap
                            max-height: 316px
                            overflow-y: auto
                            padding: 0 22px
                            p
                                white-space: nowrap
                            .tit1
                                color: #333
                                height: 22px
                                line-height: 22px
                                margin-top: 10px
                            .tit2
                                color: #666
                                height: 20px
                                line-height: 20px
                                padding-left: 28px
                    .ivu-select-dropdown
                        padding: 0 0
    .caseeditbottomwrap
        background: #fff
        box-shadow: 0 1px 10px rgba(102, 102, 102, 0.3)
        padding: 18px 0 14px
        margin-top: 20px
        .caseeditbottomcenter
            width: 1144px
            margin: 0 auto
            padding: 0 0 14px
            white-space: nowrap
            overflow-x: auto
            .caseeditbottomitem
                width: 170px
                display: inline-block
                margin-right: 24px
                &.active
                    .tit
                        color: #1890ff
                    .con
                        border: 2px solid #1890ff
                .tit
                    color: #333
                    text-align: center
                    margin-bottom: 12px
                .con
                    height: 123px
                    border-radius: 3px
                    cursor: pointer
                    .thumbimg
                        width: 100%
                        height: 100%
                &:last-child
                    margin-right: 0
                &.navaddnewflow
                    .con
                        background: #ddd
                        position: relative
                        cursor: default
                        .ivu-icon
                            font-size: 50px
                            color: #fff
                        .btndiv
                            display: none
                            text-align: center
                        .ivu-icon, .btndiv
                            position: absolute
                            top: 50%
                            left: 50%
                            transform: translate(-50%, -50%)
                        &:hover
                            .ivu-icon
                                display: none
                            .btndiv
                                display: block
.allfilesmodalwrap
    //
</style>

<template>
    <div class="caseeditv2">
        <div class="caseedittophead">
            <Button type="default" size="large"><img src="/static/icon/bizinfoback_icon.png"> 返回列表</Button>
        </div>
        <div class="caseeditmiddlewrap">
            <div class="middleheadwrap">
                <div class="wrap1150">
                    <div class="middlehead">
                        <span class="casename">案件名称案件名称名称</span>
                        <span><Button type="info" size="large">添加流程</Button></span>
                    </div>
                </div>
            </div>
            <div class="middlecenter">
                <div class="wrap1150">
                    <div class="caseinfowrap">
                        <div class="commoncaseinfohead caseinfohead">
                            <span class="tit">案件信息</span>
                            <span class="author">创建者：哈哈哈</span>
                            <span class="edit"><Button type="ghost">编 辑</Button></span>
                        </div>
                        <div class="caseinfoformwrap">
                            <div class="formitem1 ctmname"><span class="itemtit">客户名称：</span>弘商信息技术（深圳）有限公司</div>
                            <div class="formitem2 contact"><span class="itemtit">联系人：</span><Tag class="commontagwrapv2">标签一</Tag><Tag class="commontagwrapv2">标签一</Tag><Tag class="commontagwrapv2">标签一</Tag></div>
                            <div class="formitem1 casename"><span class="itemtit">案件名称：</span>案件名称案件名称名称</div>
                            <div class="formitem2 xiezuozhe"><span class="itemtit">协作者：</span><Tag class="commontagwrapv2">标签一</Tag><Tag class="commontagwrapv2">标签一</Tag><Tag class="commontagwrapv2">标签一</Tag></div>
                            <div class="formitem1 ctmbelong"><span class="itemtit">客户归属：</span>胡小燕</div>
                            <div class="formitem2 outvisiter"><span class="itemtit">外访者：</span><Tag class="commontagwrapv2">标签一</Tag><Tag class="commontagwrapv2">标签一</Tag><Tag class="commontagwrapv2">标签一</Tag></div>
                        </div>
                    </div>
                    <div class="intrustinfo">
                        <div class="commoncaseinfohead caseinfohead">
                            <span class="tit">案件信息</span>
                            <span class="author">创建者：哈哈哈</span>
                            <span class="edit"><Button type="ghost">编 辑</Button></span>
                        </div>
                        <div class="intrustinfoformwrap">
                            <div v-if="1" class="content">
                                民族自治地方的人民代表大会可以根据本法的原则，结合当地民族财产继承的具体情况，制定变通的或者补充的规定。自治区的规定，报全国人民代表大会常务委员会备案。自治州、自治县的规定，报省或者自治区的人民代表大会常务委员会批准后生效，并报全国人民代表大会常务委员会备案。 民族自治地方的人民代表大会可以根据本法的原则，结合当地民族财产继承的具体情况，制定变通的或者补充的规定。自治区的规定，报全国人民代表大会常务委员会备案。自治州、自治县的规定，报省或者自治区的人民代表大会常务委员会批准后生效，并报全国人民代表大会常务委员会备案。 民族自治地方的人民代表大会可以根据本法的原则，结合当地民族财产继承的具体情况，制定变通的或者补充的规定。自治区的规定，报全国人民代表大会常务委员会备案。自治州、自治县的规定，报省或者自治区的人民代表大会常务委员会批准后生效，并报全国人民代表大会常务委员会备案。 民族自治地方的人民代表大会可以根据本法的原则，结合当地民族财产继承的具体情况，制定变通的或者补充的规定。自治区的规定，报全国人民代表大会常务委员会备案。自治州、自治县的规定，报省或者自治区的人民代表大会常务委员会批准后生效，并报全国人民代表大会常务委员会备案。自治州、自治县的规定，报省或者自治区的人民代表大会常务委员会批准后生效，并报全国人民代表大会常务委员会备案。 民族自治地方的人民代表大会可以根据本法的原则，结合当地民族财产继承的具体情况，制定变通的或者补充的规定。自治区的规定，报全国人民代表大会常务委员会备案。自治州、自治县的规定，报省或者自治区的人民代表大会常务委员会批准后生效，并报全国人民代表大会常务委员会备案。自治州、自治县的规定，报省或者自治区的人民代表大会常务委员会批准后生效，并报全国人民代表大会常务委员会备案。 民族自治地方的人民代表大会可以根据本法的原则，结合当地民族财产继承的具体情况，制定变通的或者补充的规定。自治区的规定，报全国人民代表大民族自治地方的人民代表大会可以根据本法的原则，结合当地民族财产继承的具体情况，制定变通的或者补充的规定。自治区的规定，报全国人民代表大会常务委员会备案。自治州、自治县的规定，报省或者自治区的人民代表大会常务委员会批准后生效，并报全国人民代表大会常务委员会备案。 民族自治地方的人民代表大会可以根据本法的原则，结合当地民族财产继承的具体情况，制定变通的或者补充的规定。自治区的规定，报全国人民代表大会常务委员会备案。自治州、自治县的规定，报省或者自治区的人民代表大会常务委员会批准后生效，并报全国人民代表大会常务委员会备案。 民族自治地方的人民代表大会可以根据本法的原则，结合当地民族财产继承的具体情况，制定变通的或者补充的规定。自治区的规定，报全国人民代表大会常务委员会备案。自治州、自治县的规定，报省或者自治区的人民代表大会常务委员会批准后生效，并报全国人民代表大会常务委员会备案。 民族自治地方的人民代表大会可以根据本法的原则，结合当地民族财产继承的具体情况，制定变通的或者补充的规定。自治区的规定，报全国人民代表大会常务委员会备案。自治州、自治县的规定，报省或者自治区的人民代表大会常务委员会批准后生效，并报全国人民代表大会常务委员会备案。自治州、自治县的规定，报省或者自治区的人民代表大会常务委员会批准后生效，并报全国人民代表大会常务委员会备案。 民族自治地方的人民代表大会可以根据本法的原则，结合当地民族财产继承的具体情况，制定变通的或者补充的规定。自治区的规定，报全国人民代表大会常务委员会备案。自治州、自治县的规定，报省或者自治区的人民代表大会常务委员会批准后生效，并报全国人民代表大会常务委员会备案。自治州、自治县的规定，报省或者自治区的人民代表大会常务委员会批准后生效，并报全国人民代表大会常务委员会备案。 民族自治地方的人民代表大会可以根据本法的原则，结合当地民族财产继承的具体情况，制定变通的或者补充的规定。自治区的规定，报全国人民代表大
                            </div>
                            <div v-else>
                                <!-- 编辑器 -->
                                <editor
                                    :content="''"
                                    ref="flow_ueditor"
                                    :aboutType="'biz_case_node_flows'"
                                    :aboutId="1"
                                    :flag="'flowContent'+'1'">
                                </editor>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="middlebottom">
                <div class="middlebottomitem middlebottomitem1">
                    <div class="itemtreewrap">
                        <Dropdown placement="top-start">
                            <img src="/static/icon/bizinfo_middlebottom_icon1.png" class="def">
                            <img src="/static/icon/bizinfo_middlebottom_icon1_.png" class="hov">
                            <DropdownMenu slot="list">
                                <div class="itemtree floatpanel">
                                    <div style="text-align: center; margin-bottom: 11px;"><Button type="ghost">保存为模板</Button></div>
                                    <div class="treewrap">
                                        <p class="tit1">案件首页案件首页</p>
                                        <p class="tit1">案件首页</p>
                                        <p class="tit2">立案内容</p>
                                        <p class="tit2">立案内容</p>
                                        <p class="tit2">立案内容</p>
                                        <p class="tit1">案件首页案件首页</p>
                                        <p class="tit2">立案内容</p>
                                        <p class="tit2">立案内容</p>
                                        <p class="tit2">立案内容案件首页案件首页</p>
                                        <p class="tit1">案件首页</p>
                                        <p class="tit2">立案内容</p>
                                        <p class="tit2">立案内容</p>
                                        <p class="tit2">立案内容案件首页案件首页</p>
                                        <p class="tit1">案件首页</p>
                                        <p class="tit2">立案内容</p>
                                        <p class="tit2">立案内容</p>
                                        <p class="tit2">立案内容案件首页案件首页</p>
                                    </div>
                                </div>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <span class="line">|</span>
                    <div>
                        <Dropdown @on-click="allinfomenuClick" placement="top-start" class="dropdown">
                            <img src="/static/icon/bizinfo_middlebottom_icon2.png" class="def">
                            <img src="/static/icon/bizinfo_middlebottom_icon2_.png" class="hov">
                            <DropdownMenu slot="list">
                                <DropdownItem name="allfiles">所有附件</DropdownItem>
                                <DropdownItem name="sendflow">推送流程</DropdownItem>
                                <DropdownItem name="allkeep">所有跟进</DropdownItem>
                                <DropdownItem name="editlog">编辑日志</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
                <div class="middlebottomitem middlebottomitem2">
                    <div>
                        <Badge dot><img src="/static/icon/bizinfo_middlebottom_icon3.png" class="def"><img src="/static/icon/bizinfo_middlebottom_icon3_.png" class="hov"></Badge><span class="num">123</span>
                    </div>
                    <span class="line">|</span>
                    <div>
                        <Badge dot><img src="/static/icon/bizinfo_middlebottom_icon4.png" class="def"><img src="/static/icon/bizinfo_middlebottom_icon4_.png" class="hov"></Badge><span class="num">123</span>
                    </div>
                    <span class="line">|</span>
                    <div><img src="/static/icon/bizinfo_middlebottom_icon5.png" class="def"><img src="/static/icon/bizinfo_middlebottom_icon5_.png" class="hov"><span class="num">123</span></div>
                    <span class="line">|</span>
                    <div>
                        <Badge dot><img src="/static/icon/bizinfo_middlebottom_icon6.png" class="def"><img src="/static/icon/bizinfo_middlebottom_icon6_.png" class="hov"></Badge><span class="num">123</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="caseeditbottomwrap">
            <div class="caseeditbottomcenter">
                <div v-for="n in 3" :class="{active: n == 1}" class="caseeditbottomitem">
                    <p class="tit">案件首页{{n}}</p>
                    <div class="con"><img v-if="n == 1" src="/static/icon/bizinfo_caseindex_thumb.png" class="thumbimg"><img v-else src="/static/icon/bizinfo_caseflow_thumb.png" class="thumbimg"></div>
                </div>
                <div class="caseeditbottomitem navaddnewflow">
                    <p class="tit"></p>
                    <div class="con">
                        <Icon type="android-add-circle"></Icon>
                        <div class="btndiv">
                            <Button class="btn1" type="info">添加流程</Button>
                            <Button class="btn2" type="ghost">添加子流程</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 所有附件 -->
        <Modal
            v-model="allfilesmodal"
            :closable="false"
            :mask-closable="false"
            width="902"
            class-name="modalwrapv2">
            <div class="modal_tit" style="border-bottom: none;">
                <Dropdown @on-click="toggleallfilesNav" class="dropdown">
                    <Button>我的上传 <Icon type="arrow-down-b"></Icon></Button>
                    <DropdownMenu slot="list">
                        <DropdownItem :key="0" :name="0">客户上传</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <div class="icon-can-dacha" @click.stop="allfilesmodal = false">
                    <Icon type="android-close"></Icon>
                </div>
            </div>

            <div class="allfilesmodalwrap">
                <Table
                    :columns="columns1"
                    :data="data1"
                    :height="500">
                </Table>
            </div>

            <Spin size="large" fix v-if="0">
                <Icon type="load-c" class="spin-icon-load"></Icon>
            </Spin>

            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
import editor from '@/components/common/editor';

export default {
    name: 'caseEdit',
    components: { editor},
    data() {
        return {
            caseId: null,
            allfilesmodal: true,
            columns1: [
                {
                    title: '序号',
                    key: 'num'
                },
                {
                    title: '名称',
                    key: 'name'
                },
                {
                    title: '流程',
                    key: 'flow'
                },
                {
                    title: '上传者',
                    key: 'up'
                },
                {
                    title: '上传时间',
                    key: 'uptime'
                },
                {
                    title: '操作',
                    key: 'edit',
                    render: (h, params) => {
                        return h('div', [
                            h('span', {
                                style: {
                                    display: 'inline-block',
                                    width: '24px',
                                    textAlign: 'center'
                                },
                                on: {
                                    click: () => {
                                        console.log(params)
                                    }
                                }
                            }, [
                                h('img', {
                                    attrs: {
                                        src: "/static/icon/bizv2_down_icon.png"
                                    }
                                })
                            ]),
                            h('span', {
                                style: {
                                    display: 'inline-block',
                                    width: '24px',
                                    textAlign: 'center'
                                },
                                on: {
                                    click: () => {
                                        console.log(params)
                                    }
                                }
                            }, [
                                h('img', {
                                    attrs: {
                                        src: "/static/icon/bizv2_del_icon.png"
                                    }
                                })
                            ])
                        ]);
                    }
                }
            ],
            data1: [
                {
                    num: 1,
                    name: 'John Brown',
                    flow: 18,
                    up: 'New York No. 1 Lake Park',
                    uptime: '2016-10-03',
                },
                {
                    num: 2,
                    name: 'John Brown',
                    flow: 18,
                    up: 'New York No. 1 Lake Park',
                    uptime: '2016-10-03',
                },
                {
                    num: 3,
                    name: 'John Brown',
                    flow: 18,
                    up: 'New York No. 1 Lake Park',
                    uptime: '2016-10-03',
                },
                {
                    num: 4,
                    name: 'John Brown',
                    flow: 18,
                    up: 'New York No. 1 Lake Park',
                    uptime: '2016-10-03',
                }
            ]
        }
    },
    computed: {

    },
    watch: {

    },
    created() {
        this.caseId = Number(this.$route.params.caseid);
    },
    methods: {
        allinfomenuClick(name) {
            switch(name){
                case 'allfiles':
                    //;
                    break;
                case 'sendflow':
                    //;
                    break;
                case 'allkeep':
                    //;
                    break;
                case 'editlog':
                    //;
                    break;
            }
        },
        toggleallfilesNav(name) {
            console.log(name)
        }
    },
}
</script>
