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
        position: relative
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
                    &:hover, &.active
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
        .middleconnonnavwrap
            position: absolute
            left: 0
            right: 0
            bottom: 52px
            height: 352px
            .head
                height: 51px
                padding: 0 26px
                border-bottom: 1px solid #e1e1e1
                display: flex
                justify-content: space-between
                align-items: center
                .tit
                    color: #333
                    font-size: 17px
            .conwrap
                height: 300px
                overflow-y: auto
                .nodatalistcry
                    img
                        width: 56px
                .casekeepformwrap
                    padding: 20px 109px 0 85px
                .casekeepitemwrap
                    padding: 10px 90px 0
                    .casekeepitem
                        border: 1px solid #ddd
                        border-radius: 3px
                        margin-top: 12px
                        table
                            tr
                                td:first-child
                                    white-space: nowrap
                                    color: #999
                                    padding-left: 28px
                                    vertical-align: top
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
                            .ivu-btn
                                display: block
                                margin: 0 auto 12px
                                &:last-child
                                    margin: 0 auto
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
            <Button @click.native="$goto({name: 'businessList'})" type="default" size="large"><img src="/static/icon/bizinfoback_icon.png"> 返回列表</Button>
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
                    <div @click="bottomcasekeepnav = !bottomcasekeepnav" :class="{active: bottomcasekeepnav}">
                        <Badge dot><img src="/static/icon/bizinfo_middlebottom_icon3.png" class="def"><img src="/static/icon/bizinfo_middlebottom_icon3_.png" class="hov"></Badge><span class="num">123</span>
                    </div>
                    <span class="line">|</span>
                    <div @click="bottomfilesnav = !bottomfilesnav" :class="{active: bottomfilesnav}">
                        <Badge dot><img src="/static/icon/bizinfo_middlebottom_icon4.png" class="def"><img src="/static/icon/bizinfo_middlebottom_icon4_.png" class="hov"></Badge><span class="num">123</span>
                    </div>
                    <span class="line">|</span>
                    <div @click="bottomformnav = !bottomformnav" :class="{active: bottomformnav}">
                        <img src="/static/icon/bizinfo_middlebottom_icon5.png" class="def"><img src="/static/icon/bizinfo_middlebottom_icon5_.png" class="hov"><span class="num">123</span>
                    </div>
                    <span class="line">|</span>
                    <div @click="bottomcommentnav = !bottomcommentnav" :class="{active: bottomcommentnav}">
                        <Badge dot><img src="/static/icon/bizinfo_middlebottom_icon6.png" class="def"><img src="/static/icon/bizinfo_middlebottom_icon6_.png" class="hov"></Badge><span class="num">123</span>
                    </div>
                </div>
            </div>
            <div class="middleconnonnavwrap floatpanel">
                <div class="head">
                    <span class="tit">案件跟进</span>
                    <span v-if="1" class="edit"><Button type="ghost" size="large">添 加</Button></span>
                    <span v-else class="edit">
                        <Dropdown @on-click="casekeepnavmenuClick" class="dropdown dropdowneditv2">
                            <Button type="ghost" size="large">保 存</Button>
                            <DropdownMenu slot="list">
                                <DropdownItem name="cancel">取 消</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </span>
                </div>
                <div class="conwrap">
                    <div v-if="0" class="casekeepformwrap">
                        <Form :model="casekeepcreateform" :rules="ruleValidate" ref="casekeepcreateform" :label-width="100" class="commonformv2">
                            <FormItem prop="ctmname" label="标　题：">
                                <Input :maxlength="30" v-model.trim="casekeepcreateform.ctmname" placeholder="请输入标题名称"></Input>
                            </FormItem>
                            <FormItem prop="ctmname" label="内　容：">
                                <Input v-model.trim="casekeepcreateform.ctmname" type="textarea" :rows="6" placeholder="请输入跟进内容"></Input>
                            </FormItem>
                            <FormItem prop="ctmname" label="起止时间：">
                                <Input v-model.trim="casekeepcreateform.ctmname" placeholder="请选择时间"></Input>
                            </FormItem>
                        </Form>
                    </div>
                    <div v-else class="casekeepitemwrap">
                        <div v-for="n in 10" class="casekeepitem">
                            <table>
                                <tr>
                                    <td>标　　题：</td>
                                    <td>全国人民代表大会常务委员会备案</td>
                                </tr>
                                <tr>
                                    <td>内　　容：</td>
                                    <td>全国人民代表大会常务委员会备案。自治州、自治县的规定，报省或者自治区的人民代表大会常务委员会批准后生效，并报全国人民代表大会常务委员会备案。自治州、自治县的规定，报省或者自治区的人民代表大会常务委员会批准后生效</td>
                                </tr>
                                <tr>
                                    <td>起止时间：</td>
                                    <td>2018-03-23 至 2018-03-25</td>
                                </tr>
                            </table>
                        </div>
                        <div v-if="0" class="nodatalistcry">
                            <img src="/static/icon/nodata_cry_icon.png">
                            <p>您还未添加任何案件跟进！</p>
                        </div>
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
                            <Button class="btn1" type="info">&nbsp;添加流程&nbsp;</Button>
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
                <span class="num">共8条</span>
                <div class="icon-can-dacha" @click.stop="allfilesmodal = false">
                    <Icon type="android-close"></Icon>
                </div>
            </div>

            <div class="allfilesmodalwrap">
                <Table
                    :columns="allfilecolumns"
                    :data="allfiledata"
                    :height="500">
                </Table>
            </div>

            <Spin size="large" fix v-if="0">
                <Icon type="load-c" class="spin-icon-load"></Icon>
            </Spin>

            <div slot="footer"></div>
        </Modal>

        <!-- 客户推送 -->
        <Modal
            v-model="sendflowmodal"
            :closable="false"
            :mask-closable="false"
            width="902"
            class-name="modalwrapv2">
            <div class="modal_tit" style="border-bottom: none;">
                <Dropdown @on-click="togglesendflowNav" class="dropdown">
                    <Button>律师推送 <Icon type="arrow-down-b"></Icon></Button>
                    <DropdownMenu slot="list">
                        <DropdownItem :key="0" :name="0">客户发布</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <span class="num">共8条</span>
                <div class="icon-can-dacha" @click.stop="sendflowmodal = false">
                    <Icon type="android-close"></Icon>
                </div>
            </div>

            <div class="allfilesmodalwrap">
                <Table
                    :columns="sendflowcolumns"
                    :data="sendflowdata"
                    :height="500">
                </Table>
            </div>

            <Spin size="large" fix v-if="0">
                <Icon type="load-c" class="spin-icon-load"></Icon>
            </Spin>

            <div slot="footer"></div>
        </Modal>

        <!-- 所有跟进 -->
        <Modal
            v-model="allkeepmodal"
            :closable="false"
            :mask-closable="false"
            width="902"
            class-name="modalwrapv2">
            <div class="modal_tit" style="border-bottom: none;">
                所有跟进
                <span class="num">共8条</span>
                <div class="icon-can-dacha" @click.stop="allkeepmodal = false">
                    <Icon type="android-close"></Icon>
                </div>
            </div>

            <div class="allfilesmodalwrap">
                <Table
                    :columns="allkeepcolumns"
                    :data="allkeepdata"
                    :height="500">
                </Table>
            </div>

            <Spin size="large" fix v-if="0">
                <Icon type="load-c" class="spin-icon-load"></Icon>
            </Spin>

            <div slot="footer"></div>
        </Modal>

        <!-- 操作日志 -->
        <Modal
            v-model="editlogmodal"
            :closable="false"
            :mask-closable="false"
            width="902"
            class-name="modalwrapv2">
            <div class="modal_tit" style="border-bottom: none;">
                操作日志
                <span class="num">共8条</span>
                <div class="icon-can-dacha" @click.stop="editlogmodal = false">
                    <Icon type="android-close"></Icon>
                </div>
            </div>

            <div class="allfilesmodalwrap">
                <Table
                    :columns="editlogcolumns"
                    :data="editlogdata"
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
            allfilesmodal: false,
            sendflowmodal: false,
            allkeepmodal: false,
            editlogmodal: false,
            allfilecolumns: [
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
                                attrs: {
                                    class: 'toggleimgnav'
                                },
                                on: {
                                    click: () => {
                                        console.log(params)
                                    }
                                }
                            }, [
                                h('img', {
                                    attrs: {
                                        class: 'def',
                                        src: "/static/icon/bizv2_down_icon.png"
                                    }
                                }),
                                h('img', {
                                    attrs: {
                                        class: 'hov',
                                        src: "/static/icon/bizv2_down_icon_.png"
                                    }
                                })
                            ]),
                            h('span', {
                                style: {
                                    display: 'inline-block',
                                    width: '24px',
                                    textAlign: 'center'
                                },
                                attrs: {
                                    class: 'toggleimgnav'
                                },
                                on: {
                                    click: () => {
                                        console.log(params)
                                    }
                                }
                            }, [
                                h('img', {
                                    attrs: {
                                        class: 'def',
                                        src: "/static/icon/bizv2_del_icon.png"
                                    }
                                }),
                                h('img', {
                                    attrs: {
                                        class: 'hov',
                                        src: "/static/icon/bizv2_del_icon_.png"
                                    }
                                })
                            ])
                        ]);
                    }
                }
            ],
            allfiledata: [
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
            ],
            sendflowcolumns: [
                {
                    title: '流程名称',
                    key: 'name'
                },
                {
                    title: '流程内容',
                    key: 'content'
                },
                {
                    title: '推送者',
                    key: 'sendauthor'
                },
                {
                    title: '推送时间',
                    key: 'time'
                }
            ],
            sendflowdata: [
                {
                    name: 'John Brown',
                    content: 'New York No. 1 Lake Park',
                    sendauthor: 'John Brown',
                    time: '2016-10-03',
                },
                {
                    name: 'John Brown',
                    content: 'New York No. 1 Lake Park',
                    sendauthor: 'John Brown',
                    time: '2016-10-03',
                },
                {
                    name: 'John Brown',
                    content: 'New York No. 1 Lake Park',
                    sendauthor: 'John Brown',
                    time: '2016-10-03',
                },
                {
                    name: 'John Brown',
                    content: 'New York No. 1 Lake Park',
                    sendauthor: 'John Brown',
                    time: '2016-10-03',
                },
                {
                    name: 'John Brown',
                    content: 'New York No. 1 Lake Park',
                    sendauthor: 'John Brown',
                    time: '2016-10-03',
                },
            ],
            allkeepcolumns: [
                {
                    title: '流程名称',
                    key: 'name'
                },
                {
                    title: '跟进标题',
                    key: 'title'
                },
                {
                    title: '跟进内容',
                    key: 'content'
                },
                {
                    title: '起止时间',
                    key: 'time'
                },
                {
                    title: '操作',
                    key: 'edit'
                }
            ],
            allkeepdata: [
                {
                    name: 'John Brown',
                    title: 'John Brown',
                    content: 'New York No. 1 Lake Park',
                    time: '2016-10-03',
                },
                {
                    name: 'John Brown',
                    title: 'John Brown',
                    content: 'New York No. 1 Lake Park',
                    time: '2016-10-03',
                },
                {
                    name: 'John Brown',
                    title: 'John Brown',
                    content: 'New York No. 1 Lake Park',
                    time: '2016-10-03',
                },
                {
                    name: 'John Brown',
                    title: 'John Brown',
                    content: 'New York No. 1 Lake Park',
                    time: '2016-10-03',
                },
                {
                    name: 'John Brown',
                    title: 'John Brown',
                    content: 'New York No. 1 Lake Park',
                    time: '2016-10-03',
                },
            ],
            editlogcolumns: [
                {
                    title: '流程',
                    key: 'name'
                },
                {
                    title: '操作内容',
                    key: 'content'
                },
                {
                    title: '操作者',
                    key: 'person'
                },
                {
                    title: '操作时间',
                    key: 'time'
                }
            ],
            editlogdata: [
                {
                    name: 'John Brown',
                    content: 'New York No. 1 Lake Park',
                    person: 'John Brown',
                    time: '2016-10-03',
                },
                {
                    name: 'John Brown',
                    content: 'New York No. 1 Lake Park',
                    person: 'John Brown',
                    time: '2016-10-03',
                },
                {
                    name: 'John Brown',
                    content: 'New York No. 1 Lake Park',
                    person: 'John Brown',
                    time: '2016-10-03',
                },
                {
                    name: 'John Brown',
                    content: 'New York No. 1 Lake Park',
                    person: 'John Brown',
                    time: '2016-10-03',
                },
                {
                    name: 'John Brown',
                    content: 'New York No. 1 Lake Park',
                    person: 'John Brown',
                    time: '2016-10-03',
                },
            ],
            bottomcasekeepnav: true,
            bottomfilesnav: false,
            bottomformnav: false,
            bottomcommentnav: false,
            casekeepcreateform: {
                ctmname: ''
            },
            ruleValidate: {
                casename: [
                    { required: true, message: '案件名不能为空', trigger: 'blur' }
                ],
                selectcmtid: [
                    { required: true, type: 'string', message: '请选择客户', trigger: 'change' }
                ],
                selectid: [
                    { required: true, type: 'number', message: '请选择客户归属', trigger: 'change' }
                ],
                ctmname: [
                    { required: true, type: 'string', message: '请输入客户名称', trigger: 'blur' }
                ]
            }
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
                    this.allfilesmodal = true;
                    break;
                case 'sendflow':
                    this.sendflowmodal = true;
                    break;
                case 'allkeep':
                    this.allkeepmodal = true;
                    break;
                case 'editlog':
                    this.editlogmodal = true;
                    break;
            }
        },
        toggleallfilesNav(name) {
            console.log(name)
        },
        togglesendflowNav(name) {
            console.log(name)
        },
        casekeepnavmenuClick(name) {
            console.log(name)
        }
    },
}
</script>
