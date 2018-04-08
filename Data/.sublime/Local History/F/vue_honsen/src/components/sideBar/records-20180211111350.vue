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
            .del_mod
                float right
                width: 17px
                height: 19px
                background: url(/static//icon/0020_.png) center no-repeat
    .keeprecordcont, .taskcont
        padding: 20px 20px 0
        height: 467px
        overflow-y: auto
        position: relative
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
            position: relative
            .close
                width: 20px
                height: @width
                line-height: 16px
                position: absolute
                right: -(@width/2)
                top: -(@width/2)
                border-radius: 50%
                border: 1px solid #e5e5e5
                background: #fff
                text-align: center
                color: #b5b2b2
                cursor: pointer
                &:hover
                    background: #3dc1ff
                    color: #fff
    .addtplpanel
        position: absolute
        top: 20px
        left: 50%
        margin-left: -150px
        padding: 30px
        .addtplpanelipt
            width: 240px
            margin: 20px 0
        .addtplpanelbtnwrap
            text-align: center
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
                        <div v-if="!keeprecords.list.length && !keeprecords.listloading" class="nodatalist">
                            没有相关案件
                        </div>
                    </div>
                </div>
                <Spin size="large" fix v-if="keeprecords.listloading">
                    <Icon type="load-c" class="spin-icon-load"></Icon>
                    <div>加载中...</div>
                </Spin>
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
                            <Select v-model="selecttemId" @on-change="templateChange" class="selectselectwrap" placeholder="选择模板">
                                <Option v-for="(tpl, tplidx) in TPL" :value="tpl.id" :key="tpl.id">
                                    {{tpl.template_name}}
                                    <div class="del_mod" @click.stop="delTPL(TPL, tplidx)"></div>
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
                    <div v-if="!taskisAdding" :key="taskkey">
                        <div v-for="(list, taskidx) in curtasks" class="taskcontlist">
                            <div class="state">
                                <img @click="toogleFinish(list)" v-if="list.finish" src="/static/icon/keeprecords_dagou_icon.png">
                                <img @click="toogleFinish(list)" v-else src="/static/icon/keeprecords_budagou_icon.png">
                            </div>
                            <div
                                @blur="taskListBlur($event, list)"
                                :contenteditable="taskAllEditing"
                                :style="{ outline: taskAllEditing ? '#3dc1ff auto 5px' : ''}"
                                class="cont">{{list.content}}<span v-if="!taskAllEditing" @click="deltask(curtasks, taskidx)" class="close">x</span></div>
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
                    <div v-if="showaddtplpanel" v-clickoutside="closeaddtplpanel" class="addtplpanel floatpanel">
                        <div class="addtplpaneltit">保存为任务模板</div>
                        <Input v-model.trim="addtplpanelName" ref="addtplpanelipt" @on-keyup.enter="createTPL" :maxlength="8" placeholder="给模板命名" class="addtplpanelipt"></Input>
                        <div class="addtplpanelbtnwrap">
                            <Button type="info" @click="createTPL">提 交</Button>
                            <Button type="info" style="margin-left: 10px" class="gray_btn" @click="showaddtplpanel = false">取 消</Button>
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
import clickoutside from '@/common/directives/clickOutSide';

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
            TPL: [],
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
            selecttemId: '',
            taskkey: 1,
            showaddtplpanel: false,
            addtplpanelName: '',
        }
    },
    components: {sideBase},
    directives: {
        clickoutside
    },
    computed: {
        curKeeprecordsNavId() {
            return this.curKeeprecordsNavIdArr[0] || '';
        },
        curKeeprecords() {
            if( this.curKeeprecordsNavId && this.curKeeprecordsChildId ){
                let arr = this.keeprecords.list.find(e => e.ctmid == this.curKeeprecordsNavId).cases.find(e => e.caseid == this.curKeeprecordsChildId).records;
                return arr;
            }else{
                return false;
            }
        },
        curtasks() {
            if( this.curKeeprecordsNavId && this.curKeeprecordsChildId ){
                let arr = this.keeprecords.list.find(e => e.ctmid == this.curKeeprecordsNavId).cases.find(e => e.caseid == this.curKeeprecordsChildId).tasks;
                return arr;
            }else{
                return false;
            }
        }
    },
    beforeMount() {
        this.getCusCase();
        this.getTPL();
    },
    methods: {
        getCusCase() {
            this.$ajax('get', '/biz/case/customerforcase', 'keeprecords.listloading', (data) => {
                let v = data.data;
                v.forEach(e => {
                    e.cases.forEach(i => {
                        i.records.forEach(o => {

                        });
                        if( i.tasks ){
                            i.tasks = JSON.parse(i.tasks);
                            if( Object.prototype.toString.call(i.tasks) === '[object Array]' ){
                                i.tasks.forEach(o => {
                                    o.edittmp = '';
                                });
                            }else{
                                i.tasks = [];
                            }
                        }else{
                            i.tasks = [];
                        }
                    });
                });
                this.keeprecords.list = v;
            });
        },
        getTPL() {
            this.$ajax('get', '/task/tasktemplatelist', (data) => {
                this.TPL = data.data;
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
                    this.$ajax('get', '/record/delrecord', 'keeprecords.listloading', { id: e.id}, (data) => {
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
            this.cancelalltaskEdit();
        },
        submitkeepfrom() {
            this.$refs.keeprecordEditForm.validate((valid) => {
                if( valid ){
                    let obj = Object.assign({}, this.keeprecordEditForm);
                    if( obj.id ){
                        let curobj = this.curKeeprecords.find(e => e.id == obj.id);
                        this.$ajax('post', '/record/editrecord', obj, 'keeprecords.listloading', (data) => {
                            curobj.title = obj.title;
                            curobj.content = obj.content;
                            curobj.updated_at = moment().format("YYYY-MM-DD HH:mm:ss");
                        });
                    }else{
                        obj.caseid = this.curKeeprecordsChildId;
                        this.$ajax('post', '/record/createrecord', obj, 'keeprecords.listloading', (data) => {
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
                    let curobj = JSON.parse(JSON.stringify(this.curtasks));
                    curobj.push({ content: this.taskEditForm.content, finish: false});
                    let obj = {
                        content: JSON.stringify(curobj),
                    };
                    this.changeTask(obj);
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
            if( this.taskAllEditing ){
                return false;
            }
            let curobj = JSON.parse(JSON.stringify(this.curtasks));
            let obj = {
                content: JSON.stringify(curobj),
            };
            this.changeTask(obj);
        },
        changeTask(obj) {
            obj.caseid = this.curKeeprecordsChildId;
            this.$ajax('post', '/task/createtask', obj, 'keeprecords.listloading', (data) => {
                this.keeprecords.list.find(e => e.ctmid == this.curKeeprecordsNavId).cases.find(e => e.caseid == obj.caseid).tasks = JSON.parse(obj.content);
            });
        },
        templateChange(id) {
            if( !id ){
                return false;
            }
            this.$Modal.confirm({
                title: '确认对话框',
                content: `将会覆盖此案件下已有的任务，确定吗？`,
                onOk: () => {
                    let curTPL = this.TPL.find(e => e.id == id);
                    if( curTPL.isget ){
                        // 已经获取过内容
                        let curobj = JSON.parse(JSON.stringify(curTPL.content));
                        let obj = {
                            content: JSON.stringify(curobj),
                        };
                        this.changeTask(obj);
                    }else{
                        // 无内容  去获取
                        this.$ajax('get', '/task/tasktemplatedetails', { id: id}, 'keeprecords.listloading', (data) => {
                            this.$set(curTPL, 'isget', true);
                            this.$set(curTPL, 'content', JSON.parse(data.data));
                            let obj = {
                                content: data.data,
                            };
                            this.changeTask(obj);
                        });
                    }
                    this.selecttemId = '';
                },
                onCancel: () => {
                    this.selecttemId = '';
                }
            });
        },
        taskalledit() {
            if( !this.curtasks.length ){
                this.$Message.error('请新建任务！');
                return false;
            }
            this.taskisAdding = false;
            if( this.taskAllEditing ){
                this.taskAllEditing = false;
            }else{
                this.taskAllEditing = true;
            }
        },
        tasksavetpl() {
            if( !this.curtasks.length ){
                this.$Message.error('请新建任务！');
                return false;
            }
            this.cancelalltaskEdit();
            this.showaddtplpanel = true;
        },
        taskListBlur(e, list) {
            this.$set(list, 'edittmp', e.target.innerHTML.toString());
        },
        submitalltaskfrom() {
            this.$nextTick(() => {
                let curobj = JSON.parse(JSON.stringify(this.curtasks));
                curobj.forEach(e => {
                    e.content = e.edittmp;
                });
                let obj = {
                    content: JSON.stringify(curobj),
                };
                this.changeTask(obj);
                this.cancelalltaskEdit();
            });
        },
        cancelalltaskEdit() {
            this.taskAllEditing = false;
            this.taskkey += 1;
        },
        createTPL() {
            if( !this.addtplpanelName ){
                this.$Message.error('模板名不能为空！');
                return false;
            }
            let curobj = JSON.parse(JSON.stringify(this.curtasks));
            curobj.forEach(e => {
                e.edittmp = '';
                e.finish = false;
            });
            let obj = {
                caseid: this.curKeeprecordsChildId,
                template_name: this.addtplpanelName,
                content: JSON.stringify(curobj)
            }
            this.$ajax('post', '/task/tasktotemplate', obj, (data) => {
                this.TPL.push({
                    id: data.tasktemplateid,
                    template_name: obj.template_name,
                    content: JSON.parse(obj.content),
                    isget: true,
                });
                this.$Message.success('成功保存为模板！');
            });
            this.closeaddtplpanel();
        },
        closeaddtplpanel() {
            this.showaddtplpanel = false;
            this.addtplpanelName = '';
        },
        deltask(e, i) {
            this.$Modal.confirm({
                title: '确认对话框',
                content: `确定删除吗？`,
                onOk: () => {
                    let curobj = JSON.parse(JSON.stringify(e));
                    curobj.splice(i, 1);
                    let obj = {
                        content: JSON.stringify(curobj),
                    };
                    this.changeTask(obj);
                },
                onCancel: () => {

                }
            });
        },
        delTPL(e, i) {
            this.$Modal.confirm({
                title: '确认对话框',
                content: `确定删除吗？`,
                onOk: () => {

                },
                onCancel: () => {

                }
            });
        }
    },
}
</script>