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
        .editicon
            margin-left: 24px
            img
                vertical-align: middle
                cursor: pointer
        .selecticon
            display: inline-block
            min-width: 125px
            margin-left: 24px
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
                    display: inline-block
                    max-width: 220px
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
            margin: 16px 0
            button
                margin-left: 22px
                padding: 5px 16px
                &:first-child
                    margin-left: 0
    .taskcontlist
        margin-bottom: 17px
        .state
            float: right
            height: 56px
            line-height: 56px
            img
                vertical-align: middle
                cursor: pointer
        .cont
            padding: 9px 15px
            border: 1px solid #e9e9e9
            font-size: 12px
            color: #404040
            min-height: 56px
            border-radius: 3px
            margin-right: 40px
            white-space: pre-line
            word-break: break-all
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
                        {{curLeftNav == 'keeprecords' ? '案件随记' : '案件任务'}}
                    </div>
                    <div class="keeprecordsnavlistwrap" v-scrollUnique>
                        <Collapse @on-change="changeKeeprecordsNav" v-model="curKeeprecordsNavIdArr" class="keeprecordsnavlist" accordion>
                            <Panel v-for="list in keeprecords.list" :key="list.ctmid" :name="list.ctmid.toString()">
                                <span class="name single_ellipsis">&nbsp;{{list.ctmname}}</span><span class="gnum">{{list.cases.length}}</span>
                                <ul slot="content">
                                    <li @click="changeChild(child)" v-for="child in list.cases" :class="{ active: curKeeprecordsChildId == child.caseid}" :title="child.casename" class="single_ellipsis">
                                        {{child.casename}}
                                    </li>
                                </ul>
                            </Panel>
                        </Collapse>
                        <Spin size="large" fix v-if="keeprecords.listloading">
                            <Icon type="load-c" class="spin-icon-load"></Icon>
                            <div>加载中...</div>
                        </Spin>
                        <div v-if="!keeprecords.list.length && !keeprecords.listloading" class="nodatalist">
                            没有相关案件
                        </div>
                    </div>
                </div>
            </div>

            <div slot="mainTit">
                <div v-if="curKeeprecordsChildId" class="keeprecordtit">
                    <div v-if="curLeftNav == 'keeprecords'">
                        <Icon v-if="!keeprecordisEditing"  @click.native="toaddkeeprecord" class="addicon" title="添加案件记录" type="android-add-circle"></Icon>
                    </div>
                    <div v-else>
                        <Icon @click.native="toaddtask" class="addicon" title="添加案件任务" type="android-add-circle"></Icon>
                        <span class="editicon">
                            <img v-if="!taskAllEditing" @click="taskalledit" title="全部编辑" src="/static/icon/keeprecords_alledit_icon.png">
                            <img v-else @click="taskalledit" title="全部编辑" src="/static/icon/keeprecords_alledit_icon_a.png">
                        </span>
                        <span class="editicon"><img @click="tasksavetpl" title="保存为模板" src="/static/icon/keeprecords_save_icon.png"></span>
                        <span class="selecticon">
                            <Select v-model="selecttemname" @on-change="templateChange" class="selectselectwrap" placeholder="选择模板">
                                <Option v-for="(n, i) in 10" :value="n" :key="n">
                                    {{n}}
                                    <div class="del_mod"></div>
                                </Option>
                            </Select>
                        </span>
                    </div>
                </div>
            </div>

            <div slot="main">
                <div v-if="curLeftNav == 'keeprecords' && curKeeprecords" class="keeprecordcont" v-scrollUnique>
                    <div v-if="!keeprecordisEditing">
                        <div v-for="(list, idx) in curKeeprecords" class="keeprecordcontlist">
                            <div class="conthead clearboth">
                                <span class="name single_ellipsis">{{list.title}}</span>
                                <span class="time">{{list.updated_at}}</span>
                                <span class="edit"><img @click="startChangeKeeprecords(list)" title="编辑" src="/static/icon/keeprecord_edit_icon.png"><img @click="delkeeprecord(curKeeprecords, idx, list)" title="删除" src="/static/icon/keeprecord_del_icon.png"></span>
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
                                    <Input v-model.trim="keeprecordEditForm.content" placeholder="输入内容" type="textarea" :rows="13"></Input>
                                </FormItem>
                            </Form>
                            <div class="keeprecordEditFormsub"><Button @click.native="submitkeepfrom" type="info" size="large"> 提 交 </Button><Button @click.native="cancelkeeprecordEdit" class="gray_btn" type="info" size="large">取 消</Button></div>
                        </div>
                    </div>
                </div>
                <div v-if="curLeftNav == 'keeptasks' && curtasks" class="taskcont" v-scrollUnique>
                    <div v-if="!taskisAdding">
                        <div v-for="list in curtasks" class="taskcontlist">
                            <div class="state">
                                <img @click="toogleFinish(list)" v-if="list.finish" src="/static/icon/keeprecords_dagou_icon.png">
                                <img @click="toogleFinish(list)" v-else src="/static/icon/keeprecords_budagou_icon.png">
                            </div>
                            <div
                                @blur="taskListBlur($event, list)"
                                :contenteditable="taskAllEditing"
                                :style="{ outline: taskAllEditing ? '#3dc1ff auto 5px' : ''}"
                                class="cont">{{list.content}}</div>
                        </div>
                        <div v-if="taskAllEditing" class="keeprecordEditFormsub"><Button @click.native="submitalltaskfrom" type="info" size="large"> 提 交 </Button><Button @click.native="cancelalltaskEdit" class="gray_btn" type="info" size="large">取 消</Button></div>
                    </div>
                    <div v-else>
                        <div class="taskEditForm">
                            <Form ref="taskEditForm" :model="taskEditForm" :rules="ruleValidate">
                                <FormItem prop="content" style="margin-top: 15px">
                                    <Input v-model.trim="taskEditForm.content" placeholder="输入内容" type="textarea" :rows="10"></Input>
                                </FormItem>
                            </Form>
                            <div class="keeprecordEditFormsub"><Button @click.native="submittaskfrom" type="info" size="large"> 提 交 </Button><Button @click.native="canceltaskEdit" class="gray_btn" type="info" size="large">取 消</Button></div>
                        </div>
                    </div>
                </div>
            </div>
        </sideBase>
    </div>
</template>
<script>
import sideBase from './sideBase';
import moment from 'moment';

export default {
    name: 'records',
    data() {
        return {
            curLeftNav: 'keeprecords',
            curKeeprecordsNavIdArr: [],
            curKeeprecordsChildId: '',
            keeprecords: {
                list: [],
                listloading: false,
            },
            keeprecordisEditing: false,
            keeprecordEditForm: {
                title: '',
                content: ''
            },
            taskEditForm: {
                content: ''
            },
            ruleValidate: {
                title: [
                    { required: true, message: '请输入标题', trigger: 'blur' }
                ],
                content: [
                    { required: true, message: '请输入内容', trigger: 'blur' }
                ],
            },
            taskisAdding: false,
            taskAllEditing: false,
            selecttemname: '',
        }
    },
    components: {sideBase},
    computed: {
        curKeeprecordsNavId() {
            return this.curKeeprecordsNavIdArr[0] || '';
        },
        curKeeprecords() {
            if( this.curKeeprecordsNavId && this.curKeeprecordsChildId ){
                let arr = this.keeprecords.list.find(e => e.ctmid == this.curKeeprecordsNavId).cases.find(e => e.caseid == this.curKeeprecordsChildId).records;
                return arr;
            }else{
                return [];
            }
        },
        curtasks() {
            if( this.curKeeprecordsNavId && this.curKeeprecordsChildId ){
                let arr = this.keeprecords.list.find(e => e.ctmid == this.curKeeprecordsNavId).cases.find(e => e.caseid == this.curKeeprecordsChildId).tasks;
                return arr;
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
            this.$ajax('get', '/biz/case/customerforcase', 'keeprecords.listloading', (data) => {
                let v = data.data;
                v.forEach(e => {
                    e.cases.forEach(i => {
                        i.records.forEach(o => {

                        });
                        i.tasks = ''
                        if( i.tasks ){
                            i.tasks = JSON.parse(i.tasks);
                            i.tasks.forEach(o => {
                                o.edittmp = '';
                            });
                        }else{
                            i.tasks = [];
                        }
                    });
                });
                console.log(v)
                this.keeprecords.list = v;
            });
        },
        changeKeeprecordsNav(k) {
            this.curKeeprecordsChildId = '';
            this.keeprecordisEditing = false;
            this.taskisAdding = false;
        },
        delkeeprecord(l, i, e) {
            this.$Modal.confirm({
                title: '确认对话框',
                content: `确定删除吗？`,
                onOk: () => {
                    this.$ajax('get', '/record/delrecord', { id: e.id}, (data) => {
                        l.splice(i, 1);
                    });
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
        changeChild(obj) {
            this.keeprecordisEditing = false;
            this.taskisAdding = false;
            this.curKeeprecordsChildId = obj.caseid;
        },
        submitkeepfrom() {
            this.$refs.keeprecordEditForm.validate((valid) => {
                if( valid ){
                    let obj = Object.assign({}, this.keeprecordEditForm);
                    if( obj.id ){
                        let curobj = this.curKeeprecords.find(e => e.id == obj.id);
                        this.$ajax('post', '/record/editrecord', obj, (data) => {
                            curobj.title = obj.title;
                            curobj.content = obj.content;
                            curobj.updated_at = moment().format("YYYY-MM-DD HH:mm:ss");
                        });
                    }else{
                        obj.caseid = this.curKeeprecordsChildId;
                        this.$ajax('post', '/record/createrecord', obj, (data) => {
                            this.curKeeprecords.push({
                                id: data.recordid,
                                title: obj.title,
                                content: obj.content,
                                updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
                                caseid: obj.caseid
                            });
                        });
                    }
                    this.cancelkeeprecordEdit();
                }else{
                    // 表单验证失败
                }
            })
        },
        toaddtask() {
            this.taskisAdding = true;
            this.taskAllEditing = false;
        },
        submittaskfrom() {
            this.$refs.taskEditForm.validate((valid) => {
                if( valid ){
                    let obj = {};
                    let curobj = JSON.parse(JSON.stringify(this.curtasks));
                    obj.caseid = this.curKeeprecordsChildId;
                    obj.origincontent = this.taskEditForm.content;
                    obj.content = JSON.stringify(curobj.push({
                        content: obj.origincontent,
                        finish: false
                    }));
                    this.$ajax('post', '/task/createtask', obj, (data) => {
                        this.curtasks = JSON.parse(obj.content);
                    });
                    this.canceltaskEdit();
                }else{
                    // 表单验证失败
                }
            })
        },
        canceltaskEdit() {
            this.taskisAdding = false;
            this.taskEditForm = {
                content: ''
            };
        },
        toogleFinish(list) {
            list.finish = !list.finish;
        },
        templateChange(name) {
            console.log(name)
        },
        taskalledit() {
            this.taskisAdding = false;
            if( this.taskAllEditing ){
                this.taskAllEditing = false;
            }else{
                this.taskAllEditing = true;
            }
        },
        tasksavetpl() {

        },
        taskListBlur(e, list) {
            list.edittmp = e.target.innerHTML.toString();
        },
        submitalltaskfrom() {

        },
        cancelalltaskEdit() {
            this.taskAllEditing = false;
        }
    },
}
</script>