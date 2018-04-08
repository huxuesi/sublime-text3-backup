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
            .intrustinfo
                padding: 14px 0
                .intrustinfoformwrap
                    padding: 17px 38px 0 68px
                    .content
                        max-height: 278px
                        padding-right: 16px
                        overflow-y: auto
            .commoncaseinfohead
                height: 40px
                border-bottom: 1px solid #e1e1e1
                margin: 0 35px
                display: flex
                align-items: center
                justify-content: space-between
                .item
                    padding: 3px 25px 3px 0
                    margin-right: 22px
                    border-right: 1px solid #f1f1f1
                .tit
                    color: #333
                    display: inline-block
                .author
                    display: inline-block
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
                    img
                        vertical-align: middle
                    .hov
                        display: none
                    &:hover, &.active
                        .def
                            display: none
                        .hov
                            display: inline-block
                .line
                    margin: 0 30px
                    color: #f1f1f1
                &.middlebottomitem2
                    font-size: 12px
                    color: #999
                    .num
                        margin-left: 7px
                    & > div
                        &:hover
                            cursor: pointer
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
                        padding: 7px 24px 7px 0
                        table
                            tr
                                td
                                    padding: 7px 0
                                td:first-child
                                    white-space: nowrap
                                    color: #999
                                    padding-left: 28px
                                    vertical-align: top
                                td:last-child
                                    color: #333
                        .ckedit
                            float: right
                            span
                                display: inline-block
                                width: 26px
                                text-align: center
                                cursor: pointer
                .fujianwrap
                    width: 50%
                    float: left
                    border-right: 1px solid #e1e1e1
                    &:last-child
                        border-right: 0
                    .tit
                        height: 40px
                        line-height: 40px
                        color: #333
                        padding-left: 60px
                        border: 1px solid #e1e1e1
                        border-left: 0
                        border-right: 0
                        background: #f0f6fe
                    .con
                        padding: 40px 0 20px 70px
                        li
                            height: 28px
                            line-height: 28px
                            .tuisong
                                color: #1890ff
                            .yituisong
                                color: #bbb
                            .tuisong, .down, .del
                                cursor: pointer
                            .tuisong, .down, .del, .yituisong
                                display: inline-block
                                padding: 0 3px
                                text-align: center
                                img
                                    vertical-align: text-top
                .pinglun
                    padding: 0 95px
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
            .caseeditbottomitemgroup
                display: inline-block
            .caseeditbottomitem
                width: 170px
                margin-right: 24px
                float: left
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
                        .thumbimg
                            opacity: 0
                    &:last-child
                        margin-right: 0
.allfilesmodalwrap
    //



.clock_panel_wrap
    padding-right: 12px
    .clock_icon
        position relative
        // float right
        // margin-right 10px
        padding: 0 20px 0 0
        // bgImg(18px,53px,'')
        cursor pointer
        & > img
            vertical-align: top
        .triangle
            position absolute
            top 50%
            right 0
            transform: translateY(-50%)
    .clock_panel
        .clock_panel_tit
            color #3dc1ff
            font-size 16px
            text-align center
            padding 10px 0 20px
            border-bottom 1px solid #eeeeee
        .clock_content
            margin-top 15px
            padding 0 40px
            text-align center
            .clock_content_item
                .ivu-input-number
                    width 60px
                    height 50px
                    line-height 50px
                    background-color #ebebeb
                    border-radius 10px
                    .ivu-input-number-handler-wrap
                        .ivu-input-number-handler
                            height 25px
                    .ivu-input-number-input-wrap
                        height 50px
                        .ivu-input-number-input
                            background-color #ebebeb
                            text-align center
                .text
                    margin-top 10px
                    color #9a9a9a
            .clock_content_item_split
                margin-top 10px
                font-size 18px
                font-weight bold
        .clock_btn
            margin 20px 0
            text-align center

.savetplform
    padding: 38px 47px 0 0
</style>

<template>
    <div class="caseeditv2">
        <div class="caseedittophead">
            <Button @click.native="$goto({name: 'businessList'})" type="default" size="large"><img src="/static/icon/bizinfoback_icon.png"> 返回列表</Button>
        </div>

        <!-- 流程循环 -->
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
                    <div v-if="1" class="caseinfowrap">
                        <caseInfo
                            :caseInfo="caseInfo"
                            :contacts="allContacts"
                            :coactors="casecoactors"
                            :visitors="casevisitors">
                        </caseInfo>
                    </div>
                    <div class="intrustinfo">
                        <div class="commoncaseinfohead caseinfohead">
                            <div>
                                <span class="tit">立案</span>
                            </div>
                            <div>
                                <span class="item author">创建者：哈哈哈</span>
                                <span class="item settime">
                                    <Poptip v-if="1" v-model="show_clock_panel" class="clock_panel_wrap" placement="bottom" width="300" trigger="click" :transfer="false">
                                        <div class="clock_icon">
                                            <img src="/static/icon/0040.png">
                                            <div class="triangle" :class="{active: show_clock_panel}"></div>
                                        </div>
                                        <div class="clock_panel" slot="content">
                                            <div class="clock_panel_tit">设置提醒</div>
                                            <Row class="clock_content">
                                                <Col span="10" class="clock_content_item">
                                                    <InputNumber :min="0" v-model="clock_hour"></InputNumber>
                                                    <div class="text">时</div>
                                                </Col>
                                                <Col span="4" class="clock_content_item_split">：</Col>
                                                <Col span="10" class="clock_content_item">
                                                    <InputNumber :max="60" :min="0" :step="5" v-model="clock_minute"></InputNumber>
                                                    <div class="text">分</div>
                                                </Col>
                                            </Row>
                                            <div class="clock_btn"><Button type="primary" @click="confirmClock">确 定</Button></div>
                                        </div>
                                    </Poptip>
                                    <span>11:11:11</span>
                                </span>
                                <span class="edit"><Button type="ghost">编 辑</Button></span>
                            </div>
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
                                    <div style="text-align: center; margin-bottom: 11px;"><Button @click.native="savetplModal = true" type="ghost">保存为模板</Button></div>
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

            <!-- 案件跟进 -->
            <div v-if="bottomcasekeepnav" class="middleconnonnavwrap floatpanel">
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
                                    <td>
                                        <span class="ckname">全国人民代表大会常务委员会备案</span>
                                        <div class="ckedit">
                                            <span><img src="/static/icon/bizv2_penicon.png"></span>
                                            <span><img src="/static/icon/bizv2_delicon.png"></span>
                                            <span><img src="/static/icon/bizv2_aticon.png"></span>
                                            <span><img src="/static/icon/bizv2_dayplanicon.png"></span>
                                        </div>
                                    </td>
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

            <!-- 附件 -->
            <div v-if="bottomfilesnav" class="middleconnonnavwrap floatpanel">
                <div class="head">
                    <span class="tit">附件</span>
                    <span v-if="1" class="edit"><Button type="ghost" size="large">上 传</Button></span>
                </div>
                <div class="conwrap clearfix">
                    <div class="fujianwrap">
                        <div class="tit">
                            我的上传
                        </div>
                        <ul class="con">
                            <li v-for="n in 10">
                                <span class="filename">1.案件背景梳理.jpg</span>
                                <span v-if="1" class="tuisong">推送</span>
                                <span v-else class="yituisong">已推送</span>
                                <span class="down"><img v-if="1" src="/static/icon/bizv2_down_icon.png"><img v-else src="/static/icon/bizv2_down_icon_.png"></span>
                                <span class="del"><img v-if="1" src="/static/icon/bizv2_delicon.png"><img v-else src="/static/icon/bizv2_del_icon_.png"></span>
                            </li>
                        </ul>
                    </div>
                    <div class="fujianwrap">
                        <div class="tit">
                            客户上传
                        </div>
                        <ul class="con">
                            <li v-for="n in 10">
                                <span class="filename">1.案件背景梳理.jpg</span>
                                <span v-if="1" class="tuisong">推送</span>
                                <span v-else class="yituisong">已推送</span>
                                <span class="down"><img v-if="1" src="/static/icon/bizv2_down_icon.png"><img v-else src="/static/icon/bizv2_down_icon_.png"></span>
                                <span class="del"><img v-if="1" src="/static/icon/bizv2_delicon.png"><img v-else src="/static/icon/bizv2_del_icon_.png"></span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- 表单 -->
            <div v-if="bottomformnav" class="middleconnonnavwrap floatpanel">
                <div class="head">
                    <span class="tit">表单</span>
                    <span v-if="1" class="edit"><Button type="ghost" size="large">添 加</Button></span>
                </div>
                <div class="conwrap clearfix">
                    <div v-if="1" class="nodatalistcry">
                        <img src="/static/icon/nodata_cry_icon.png">
                        <p>您还未添加任何案件跟进！</p>
                    </div>
                </div>
            </div>

            <!-- 评论 -->
            <div v-if="bottomcommentnav" class="middleconnonnavwrap floatpanel">
                <div class="head">
                    <span class="tit">评论</span>
                </div>
                <div class="conwrap">
                    <div class="pinglun">
                        <comment :id="2654" type="flow" @changeCommentLength="changeProgressCommentLength($event)"></comment>
                    </div>
                </div>
            </div>
        </div>

        <div class="caseeditbottomwrap">
            <div class="caseeditbottomcenter clearfix">
                <div v-for="(flow, index) in aFlows" class="caseeditbottomitemgroup clearfix">
                    <!-- 父流程 -->
                    <div @click="curflowid = flow.casefid" :class="{active: flow.casefid == curflowid}" class="caseeditbottomitem">
                        <p class="tit">{{flow.name}}</p>
                        <div class="con"><img v-if="index == 0" src="/static/icon/bizinfo_caseindex_thumb.png" class="thumbimg"><img v-else src="/static/icon/bizinfo_caseflow_thumb.png" class="thumbimg"></div>
                    </div>
                    <!-- 子流程 -->
                    <div @click="curflowid = subflow.casefid" v-for="(subflow, subindex) in flow.sub_fids" :class="{active: subflow.casefid == curflowid}" class="caseeditbottomitem">
                        <p class="tit">{{subflow.name}}</p>
                        <div class="con"><img v-if="0" src="/static/icon/bizinfo_caseindex_thumb.png" class="thumbimg"><img v-else src="/static/icon/bizinfo_caseflow_thumb.png" class="thumbimg"></div>
                    </div>
                </div>

                <div class="caseeditbottomitemgroup clearfix">
                    <div class="caseeditbottomitem navaddnewflow">
                        <p class="tit" style="color: transparent; opacity: 0;">新建流程</p>
                        <div class="con">
                            <img src="/static/icon/bizinfo_caseflow_thumb.png" class="thumbimg">
                            <Icon type="android-add-circle"></Icon>
                            <div class="btndiv">
                                <Button class="btn1" type="info">&nbsp;添加流程&nbsp;</Button>
                                <Button class="btn2" type="ghost">添加子流程</Button>
                            </div>
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

        <!-- 保存案件模板 -->
        <Modal
            v-model="savetplModal"
            :closable="false"
            :mask-closable="false"
            @on-visible-change="closeCreatePanel($event, 'savetplform')"
            width="545"
            class-name="modalwrapv2">
            <div class="modal_tit">保存案件模板
                <div class="icon-can-dacha" @click.stop="savetplModal = false">
                    <Icon type="android-close"></Icon>
                </div>
            </div>
            <Form :model="savetplform" :rules="ruleValidate" ref="savetplform" :label-width="130" class="commonformv2 savetplform">
                <FormItem prop="selectid" label="客户归属：" class="formitemnoreddot">
                    <Select v-model="savetplform.selectid" class="selectselectwrap selectctmbelongwrap" placeholder="请选择客户归属">
                        <!-- <Option v-for="list in teamOwnerList" :value="list.id" :key="list.id">{{list.name}}</Option> -->
                        <Option v-for="n in 3" :value="n" :key="n">aaaaaaaaaaa</Option>
                    </Select>
                </FormItem>
                <FormItem prop="selectid" label="客户归属：" class="formitemnoreddot">
                    <Select v-model="savetplform.selectid" class="selectselectwrap selectctmbelongwrap" placeholder="请选择客户归属">
                        <!-- <Option v-for="list in teamOwnerList" :value="list.id" :key="list.id">{{list.name}}</Option> -->
                        <Option v-for="n in 3" :value="n" :key="n">aaaaaaaaaaa</Option>
                    </Select>
                </FormItem>
                <FormItem prop="ctmname" label="客户名称：">
                    <Input :maxlength="30" v-model.trim="savetplform.ctmname" placeholder="请输入客户名称"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="" type="info">确 定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import editor from '@/components/common/editor';
import comment from '@/components/common/z-comment';
import caseInfo from '@/components/business/caseInfo';

export default {
    name: 'caseEdit',
    components: { editor, comment, caseInfo},
    data() {
        return {
            caseId: null,
            caseInfo: {},
            aFlows: [],
            curflowid: null,
            caseloading: false,
            show_clock_panel: false,
            clock_hour: 0,
            clock_minute: 0,
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
            bottomcasekeepnav: false,
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
            },
            customerContacts: [],   // 所有的来自客户详情的客户联系人
            relateCustomers: [],
            savetplModal: false,
            savetplform: {
                selectid: '',
                ctmname: ''
            },
            ruleValidate: {
                casename: [
                    { required: true, message: '案件名不能为空', trigger: 'blur' }
                ],
                selectid: [
                    { required: true, type: 'number', message: '请选择客户归属', trigger: 'change' }
                ],
            }
        }
    },
    computed: {
        curflowobj() {
            let obj = {};
            if( this.aFlows.length ){
                this.aFlows.forEach(e => {
                    if( e.casefid == this.curflowid ){
                        obj = e;
                    }
                    e.sub_fids.forEach(f => {
                        if( f.casefid == this.curflowid ){
                            obj = f;
                        }
                    });
                });
            }
            return obj;
        },
        casecontacts() {
            return this.relateCustomers.filter(val => val.type == 'contact');
        },
        // 联系人(包含 客户详情的客户联系人+ 从这之外加的)
        allContacts() {
            let arr = [];
            this.customerContacts.forEach((val) => {
                val.isCustomerContacts = true;
                val.isAuth = false;
                arr.push(val);
            });

            // 确定customerContacts中哪些有权限
            arr.forEach((val) => {
                let is_exit_in_arr = false;
                this.casecontacts.forEach((val2) => {
                    if (val.id == val2.id) {
                        is_exit_in_arr = true;
                    }
                });
                if(is_exit_in_arr) {
                    val.isAuth = true;
                }
            });

            // 添加不是从customerContacts中选来的
            this.casecontacts.forEach((val) => {
                let is_exit_in_arr = false;
                this.customerContacts.forEach((val2) => {
                    if (val.id == val2.id) {
                        is_exit_in_arr = true;
                    }
                });
                if(!is_exit_in_arr) {
                    val.isCustomerContacts = false;
                    val.isAuth = true;
                    arr.push(val);
                }
            });

            return arr;
        },
        // 协作者
        casecoactors() {
            return this.relateCustomers.filter(val => val.type == 'coactor');
        },
        // 外访者
        casevisitors() {
            return this.relateCustomers.filter(val => val.type == 'visitor');
        },
    },
    watch: {

    },
    created() {
        this.caseId = Number(this.$route.params.caseid);
        if( this.caseId ){
            this.getCaseInfo();
        }
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
        },
        changeProgressCommentLength(e) {
            console.log(e)
        },
        getCaseInfo() {
            this.$ajax('get', this.$apiConfig.bizGroup.getCaseInfo.replace(/\{caseId\}/, this.caseId), 'caseloading', data => {
                if (this.$store.getters.auth_code_5 == 1) {
                    // 账号过期了(设置成没有其他角色的权限， 只能阅读)
                    data.data.role = '';
                }

                this.caseInfo = data.data;

                this.getFlowList();

                this.getRelateCustomers();
                this.getCustomerContacts();
            });
        },
        getFlowList() {
            this.$ajax('get', this.$apiConfig.bizGroup.getCaseFlow.replace(/\{caseId\}/, this.caseId), 'caseloading', data => {
                data.data.forEach(val => {
                    val.filesjson =  val.filesjson? JSON.parse(val.filesjson): [];
                    val.is_editing = false;
                    val.editname = '';
                    val.sub_fids.forEach((element) => {
                        element.is_editing = false;
                        element.editname = '';
                    });
                    val.creator_user = val.creator_user ? val.creator_user : {};
                    val.add_subflow_panel = false;
                    val.show_create_sub_flow = false;
                    val.create_sub_flow_text = '';

                    val.timer = -1;
                    val.record_time = 0;

                    val.curTab = 'content';
                    val.curFlow = val;
                });

                this.aFlows = data.data;

                if( data.data.length ){
                    this.curflowid = data.data[0].casefid;
                }

                /*this.$nextTick(() => {
                    let flowid = this.$route.query.from && this.$route.query.from.split('_')[0];
                    if (flowid) {
                        let parentFlowId = null;
                        for (let i = 0; i < this.aFlows.length; i++) {
                            const _flow = this.aFlows[i];
                            if (_flow.casefid == flowid || _flow.sub_fids.filter(sub => sub.casefid == flowid).length) {
                                parentFlowId = _flow.casefid;
                                break;
                            }
                        }

                        if (parentFlowId) {
                            let top = document.querySelector('#flow' + parentFlowId).offsetTop - 60;
                            document.documentElement.scrollTop = top;
                            document.body.scrollTop = top;
                        }

                    }
                });*/
            });
        },
        closeCreatePanel(state, ref) {
            if( !state ){
                this.$refs[ref].resetFields();
                this.savetplModal = false;
            }
        },
        confirmClock() {
            console.log('时间确定')
        },
        getRelateCustomers() {
            this.$ajax('get', this.$apiConfig.bizGroup.getCaseAuth.replace(/\{ctmid\}/, this.caseInfo.ctmid).replace(/\{caseid\}/, this.caseInfo.caseid), data => {
                this.relateCustomers = data.data;
            });
        },
        getCustomerContacts() {
            this.$ajax('get', this.$apiConfig.bizGroup.getCustomerContacts.replace(/\{ctmid\}/, this.caseInfo.ctmid), { detail: 0}, data => {
                this.customerContacts = data.data;
            });
        },
    },
}
</script>
