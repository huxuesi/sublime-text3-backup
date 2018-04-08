<style lang="stylus">
.side_records
    .recordsnav
        .keeprecordsnavul
            margin: 10px 0 0
            li
                text-align: center
                height: 50px
                line-height: 50px
                cursor: pointer
                img
                    vertical-align: middle
                .clk
                    display: none
                &.active
                    .def
                        display: none
                    .clk
                        display: inline-block
    .keeprecordsnav
        .keeprecordshead
            height: 62px
            line-height: 62px
            color: #424242
            text-indent: 14px
            background: #ededed
            border: 1px solid #dcdcdc
            border-width: 1px 0
        .keeprecordsnavlistwrap
            position: relative
            height: 458px
            overflow-y: auto
        .keeprecordsnavlist
            background-color: transparent
            border-radius: 0
            border: none
            .ivu-collapse-header
                height: 50px
                line-height: 50px
                padding-left: 15px
                .name
                    max-width: 141px
                    display: inline-block
                    vertical-align: middle
                .gnum
                    font-size: 12px
                    color: #afafaf
                    float: right
                    padding: 0 15px 0 5px
            .ivu-collapse-content
                background-color: transparent
                padding: 0
                .ivu-collapse-content-box
                    padding: 0
                li
                    height: 46px
                    line-height: 46px
                    padding: 0 0 0 36px
            .ivu-collapse-item
                border-color: #e6e6e6
            .ivu-collapse-item-active
                background: #f8f8f8
    .keeprecordtit
        padding: 0 0 0 24px
        line-height: 53px
        .ivu-icon
            vertical-align: middle
            font-size: 28px
            color: #3dc1ff
    .keeprecordtitcont
        padding: 16px 20px 0
        height: 467px
        overflow-y: auto
        .keeprecordtitcontlist
            background: #f0faff
            padding: 13px 15px 17px
            border-radius: 3px
            margin-bottom: 16px
            .conthead
                .name
                    color: #545454
                .edit
                    float: right
                    margin-right: 15px
                    img
                        margin-left: 11px
                        &:first-child
                            margin-left: 0
                .time
                    font-size: 12px
                    color: #999
                    float: right
                    line-height: 21px
            .contbody
                font-size: 12px
                color: #6e6e6e
                margin-top: 9px
</style>
<template>
    <div class="side_records">
        <sideBase :haveSideNav="true" ref="sideBase">
            <div slot="sideNav">
                <div class="recordsnav">
                    <ul class="keeprecordsnavul">
                        <li @click="curLeftNav = 'keeprecords'" :class="{ active: curLeftNav == 'keeprecords'}"><img class="def" src="/static/icon/keeprecordsnav1_icon.png"><img class="clk" src="/static/icon/keeprecordsnav1_icon_a.png"></li>
                        <li @click="curLeftNav = 'keeptasks'" :class="{ active: curLeftNav == 'keeptasks'}"><img class="def" src="/static/icon/keeprecordsnav2_icon.png"><img class="clk" src="/static/icon/keeprecordsnav2_icon_a.png"></li>
                    </ul>
                </div>
            </div>

            <div slot="side">
                <div class="keeprecordsnav">
                    <div class="keeprecordshead">
                        案件记录
                    </div>
                    <div class="keeprecordsnavlistwrap" v-scrollUnique>
                        <Collapse @on-change="changeKeeprecordsNav" v-model="curKeeprecordsNavId" class="keeprecordsnavlist" accordion>
                            <Panel v-for="list in keeprecords.list" :key="list.id" :name="list.id.toString()">
                                <span class="name single_ellipsis">&nbsp;{{list.name}}</span><span class="gnum">{{list.num}}</span>
                                <ul slot="content">
                                    <li @click="curKeeprecordsChildId = child.id" v-for="child in list.child" class="single_ellipsis">
                                        {{child.name}}
                                    </li>
                                </ul>
                            </Panel>
                        </Collapse>
                        <Spin size="large" fix v-if="keeprecords.listloading">
                            <Icon type="load-c" class="spin-icon-load"></Icon>
                            <div>加载中...</div>
                        </Spin>
                    </div>
                </div>
            </div>

            <div slot="mainTit">
                <div class="keeprecordtit"><Icon type="android-add-circle"></Icon></div>
            </div>

            <div slot="main">
                <div class="keeprecordtitcont" v-scrollUnique>
                    <div v-for="list in 10" class="keeprecordtitcontlist">
                        <div class="conthead clearboth">
                            <span class="name single_ellipsis">案件随机{{list}}</span>
                            <span class="time">199644444</span>
                            <span class="edit"><img src="static/icon/keeprecord_edit_icon.png"><img src="static/icon/keeprecord_del_icon.png"></span>
                        </div>
                        <div class="contbody">
                            如果你无法简洁的表达你的想法，说明你还不够了解它如果你无法简洁的表达你的想法，说明你还不够了解它
                        </div>
                    </div>
                </div>
            </div>
        </sideBase>
    </div>
</template>
<script>
import sideBase from './sideBase';
export default {
    name: 'records',
    data() {
        return {
            curLeftNav: 'keeprecords',
            curKeeprecordsNavId: '',
            curKeeprecordsChildId: '',
            keeprecords: {
                list: [
                    {
                        id: 2,
                        name: '啊啊啊啊啊啊啊啊啊啊啊啊',
                        num: 100,
                        child: [
                            {
                                id: 2,
                                name: '仄仄仄仄仄仄仄仄仄仄仄仄仄',
                                note: [
                                    {
                                        id: 3,
                                        title: '案件随记',
                                        content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容'
                                    },
                                ]
                            },
                            {
                                id: 4,
                                name: '2222222222222222222222',
                                note: [
                                    {
                                        id: 5,
                                        title: '案件随记',
                                        content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容'
                                    },
                                ]
                            },
                            {
                                id: 6,
                                name: '333333333333333333333333',
                                note: [
                                    {
                                        id: 7,
                                        title: '案件随记',
                                        content: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容'
                                    },
                                ]
                            },
                        ],
                    },
                ],
                listloading: false,
            },
        }
    },
    components: {sideBase},
    computed: {
        curKeeprecords() {
            if( this.curKeeprecordsNavId && this.curKeeprecordsChildId ){
                let obj = this.keeprecords.list.find(e => e.id == this.curKeeprecordsNavId).child.find(e => e.id == this.curKeeprecordsChildId)
                return obj
            }else{
                return {}
            }
        }
    },
    methods: {
        changeKeeprecordsNav(k) {
            if( k.length ){
                this.curKeeprecordsNavId = k[0]
            }
            console.log(k)
        }
    },
}
</script>