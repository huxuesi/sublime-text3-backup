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
                    padding: 0 10px 0 28px
                    cursor: pointer
                    &:hover, &.active
                        background: #fff
            .ivu-collapse-item
                border-color: #e6e6e6
            .ivu-collapse-item-active
                background: #f8f8f8
    .keeprecordtit
        padding: 0 0 0 24px
        line-height: 53px
        border-bottom: 1px solid #dcdcdc
        .addicon
            vertical-align: middle
            font-size: 28px
            color: #3dc1ff
            cursor: pointer
    .keeprecordcont, .taskcont
        padding: 20px 20px 0
        height: 467px
        overflow-y: auto
        .keeprecordcontlist
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
                        cursor: pointer
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
                white-space: pre-line
                word-break: break-all
        .keeprecordEditForm
            padding: 10px 20px 0
            .keeprecordEditFormsub
                text-align: center
                margin-top: 16px
                button
                    margin-left: 22px
                    padding: 5px 16px
                    &:first-child
                        margin-left: 0
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
                        <Collapse @on-change="changeKeeprecordsNav" v-model="curKeeprecordsNavIdArr" class="keeprecordsnavlist" accordion>
                            <Panel v-for="list in keeprecords.list" :key="list.id" :name="list.id.toString()">
                                <span class="name single_ellipsis">&nbsp;{{list.name}}</span><span class="gnum">{{list.num}}</span>
                                <ul slot="content">
                                    <li @click="keeprecordisEditing = false, curKeeprecordsChildId = child.id" v-for="child in list.child" :class="{ active: curKeeprecordsChildId == child.id}" :title="child.name" class="single_ellipsis">
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
                <div v-if="curKeeprecordsChildId" class="keeprecordtit">
                    <div v-if="curLeftNav == 'keeprecords'"><Icon v-if="!keeprecordisEditing"  @click.native="toaddkeeprecord" class="addicon" title="添加案件记录" type="android-add-circle"></Icon></div>
                    <div v-else>
                        <Icon @click.native="toaddtask" class="addicon" title="添加案件任务" type="android-add-circle"></Icon>
                    </div>
                </div>
            </div>

            <div slot="main">
                <div v-if="curLeftNav == 'keeprecords'" class="keeprecordcont" v-scrollUnique>
                    <div v-if="!keeprecordisEditing">
                        <div v-for="(list, idx) in curKeeprecords" class="keeprecordcontlist">
                            <div class="conthead clearboth">
                                <span class="name single_ellipsis">{{list.title}}</span>
                                <span class="time">199644444</span>
                                <span class="edit"><img @click="startChangeKeeprecords(list)" title="编辑" src="/static/icon/keeprecord_edit_icon.png"><img @click="delkeeprecord(curKeeprecords, idx)" title="删除" src="/static/icon/keeprecord_del_icon.png"></span>
                            </div>
                            <div class="contbody">{{list.content}}</div>
                        </div>
                    </div>
                    <div v-else>
                        <div class="keeprecordEditForm">
                            <Form ref="keeprecordEditForm" :model="keeprecordEditForm" :rules="ruleValidate">
                                <FormItem prop="title">
                                    <Input v-model.trim="keeprecordEditForm.title" placeholder="输入标题" @focus=""></Input>
                                </FormItem>
                                <FormItem prop="content" style="margin-top: 15px">
                                    <Input v-model.trim="keeprecordEditForm.content" placeholder="输入内容" type="textarea" :rows="14"></Input>
                                </FormItem>
                            </Form>
                            <div class="keeprecordEditFormsub"><Button @click.native="submitkeepfrom" type="info" size="large"> 提 交 </Button><Button @click.native="cancelkeeprecordEdit" class="gray_btn" type="info" size="large">取 消</Button></div>
                        </div>
                    </div>
                </div>
                <div v-else class="taskcont">
                    123
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
            curKeeprecordsNavIdArr: [],
            curKeeprecordsChildId: '',
            keeprecords: {
                list: [
                    {
                        id: 1,
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
                                        content: '111111111111111111111111111111111111111111111111111111111111111111111111111111'
                                    },
                                ],
                                task: [
                                    {
                                        id: 111,
                                        content: '任务一：内容内容内容内容内容内容内容内容内容内容内容内容内容内内容内容内容内容'
                                    },
                                    {
                                        id: 112,
                                        content: '任务二：内容内容内容内容内容内容内容内容内容内容内容内容内容内内容内容内容内容'
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
                                        content: '2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222'
                                    },
                                ],
                                task: [
                                    {
                                        id: 211,
                                        content: '任务三：内容内容内容内容内容内容内容内容内容内容内容内容内容内内容内容内容内容'
                                    },
                                    {
                                        id: 212,
                                        content: '任务四：内容内容内容内容内容内容内容内容内容内容内容内容内容内内容内容内容内容'
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
                                        content: '333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333'
                                    },
                                ],
                                task: [
                                    {
                                        id: 311,
                                        content: '任务五：内容内容内容内容内容内容内容内容内容内容内容内容内容内内容内容内容内容'
                                    },
                                    {
                                        id: 312,
                                        content: '任务六：内容内容内容内容内容内容内容内容内容内容内容内容内容内内容内容内容内容'
                                    },
                                ]
                            },
                        ],
                    },
                    {
                        id: 8,
                        name: '啊啊啊啊啊啊啊啊啊啊啊啊',
                        num: 100,
                        child: [
                            {
                                id: 9,
                                name: '仄仄仄仄仄仄仄仄仄仄仄仄仄',
                                note: [
                                    {
                                        id: 10,
                                        title: '案件随记',
                                        content: '111111111111111111111111111111111111111111111111111111111111111111111111111111'
                                    },
                                ],
                                task: [
                                    {
                                        id: 411,
                                        content: '任务七：内容内容内容内容内容内容内容内容内容内容内容内容内容内内容内容内容内容'
                                    },
                                    {
                                        id: 412,
                                        content: '任务八：内容内容内容内容内容内容内容内容内容内容内容内容内容内内容内容内容内容'
                                    },
                                ]
                            },
                            {
                                id: 11,
                                name: '2222222222222222222222',
                                note: [
                                    {
                                        id: 12,
                                        title: '案件随记',
                                        content: '2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222'
                                    },
                                ],
                                task: [
                                    {
                                        id: 511,
                                        content: '任务九：内容内容内容内容内容内容内容内容内容内容内容内容内容内内容内容内容内容'
                                    },
                                    {
                                        id: 512,
                                        content: '任务十：内容内容内容内容内容内容内容内容内容内容内容内容内容内内容内容内容内容'
                                    },
                                ]
                            },
                            {
                                id: 13,
                                name: '333333333333333333333333',
                                note: [
                                    {
                                        id: 14,
                                        title: '案件随记',
                                        content: '333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333'
                                    },
                                ],
                                task: [
                                    {
                                        id: 611,
                                        content: '任务十一：内容内容内容内容内容内容内容内容内容内容内容内容内容内内容内容内容内容'
                                    },
                                    {
                                        id: 612,
                                        content: '任务十二：内容内容内容内容内容内容内容内容内容内容内容内容内容内内容内容内容内容'
                                    },
                                ]
                            },
                        ],
                    },
                ],
                listloading: false,
            },
            keeprecordisEditing: false,
            keeprecordEditForm: {
                title: '',
                content: ''
            },
            ruleValidate: {
                title: [
                    { required: true, message: '请输入标题', trigger: 'blur' }
                ],
                content: [
                    { required: true, message: '请输入内容', trigger: 'blur' }
                ],
            }
        }
    },
    components: {sideBase},
    computed: {
        curKeeprecordsNavId() {
            return this.curKeeprecordsNavIdArr[0] || ''
        },
        curKeeprecords() {
            if( this.curKeeprecordsNavId && this.curKeeprecordsChildId ){
                let obj = this.keeprecords.list.find(e => e.id == this.curKeeprecordsNavId).child.find(e => e.id == this.curKeeprecordsChildId).note;
                return obj;
            }else{
                return [];
            }
        },
        curtasks() {
            if( this.curKeeprecordsNavId && this.curKeeprecordsChildId ){
                let obj = this.keeprecords.list.find(e => e.id == this.curKeeprecordsNavId).child.find(e => e.id == this.curKeeprecordsChildId).task;
                return obj;
            }else{
                return [];
            }
        }
    },
    beforeMount() {
        this.getCusCase();
    },
    methods: {
        getCusCase() {
            this.$ajax('get', '/biz/case/customerforcase', (data) => {
                console.log(data)
            });
        },
        changeKeeprecordsNav(k) {
            this.curKeeprecordsChildId = '';
        },
        delkeeprecord(l, i) {
            this.$Modal.confirm({
                title: '确认对话框',
                content: `确定删除吗？`,
                onOk: () => {
                    l.splice(i, 1);
                },
                onCancel: () => {

                }
            });
        },
        startChangeKeeprecords(list) {
            this.keeprecordisEditing = true;
            this.keeprecordEditForm = JSON.parse(JSON.stringify(list));
        },
        cancelkeeprecordEdit() {
            this.keeprecordisEditing = false;
            this.keeprecordEditForm = {
                title: '',
                content: ''
            };
        },
        toaddkeeprecord() {
            this.keeprecordisEditing = true;
            this.keeprecordEditForm = {
                title: '',
                content: ''
            };
        },
        submitkeepfrom() {
            console.log(1)
            this.$refs.keeprecordEditForm.validate((valid) => {
                if( valid ){
                    if( this.keeprecordEditForm.id ){
                        let obj = this.curKeeprecords.find(e => e.id == this.keeprecordEditForm.id);
                        obj.title = this.keeprecordEditForm.title;
                        obj.content = this.keeprecordEditForm.content;
                    }else{
                        this.curKeeprecords.push({ id: +new Date(), title: this.keeprecordEditForm.title, content: this.keeprecordEditForm.content})
                    }
                    this.cancelkeeprecordEdit();
                    // this.$ajax('post', '', this.keeprecordEditForm, (data) => {
                    //     if( this.keeprecordEditForm.id ){
                    //         let obj = this.curKeeprecords.find(e => e.id == this.keeprecordEditForm.id)
                    //         obj.title = this.keeprecordEditForm.title
                    //         obj.content = this.keeprecordEditForm.content
                    //     }else{
                    //         // 新增
                    //     }
                    // });
                }else{
                    // 表单验证失败
                }
            })
        },
        toaddtask() {
            console.log('添加任务')
        },
    },
}
</script>