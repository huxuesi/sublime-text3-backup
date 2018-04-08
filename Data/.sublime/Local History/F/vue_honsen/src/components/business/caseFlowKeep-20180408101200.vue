<style lang="stylus">
.caseFlowKeep
    .casekeepformwrap
        padding: 20px 109px 0 85px
    .casekeepitemwrap
        padding: 10px 90px 0
        .casekeepitem
            border: 1px solid #ddd
            border-radius: 3px
            margin: 12px 0
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
</style>

<template>
    <div class="caseFlowKeep">
        <!-- 案件跟进 -->
        <div class="head">
            <span class="tit">案件跟进</span>
            <span v-if="!editstate" class="edit"><Button @click="editstate = true" type="ghost">添 加</Button></span>
            <span v-else class="edit">
                <Dropdown @on-click="saveFlowKeep('cancel')" class="dropdown dropdowneditv2">
                    <Button @click="saveFlowKeep('save')" type="ghost">保 存</Button>
                    <DropdownMenu slot="list">
                        <DropdownItem name="cancel">取 消</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </span>
        </div>
        <div class="conwrap">
            <div v-if="editstate" class="casekeepformwrap">
                <Form :model="casekeepcreateform" :rules="ruleValidate" ref="casekeepcreateform" :label-width="100" class="commonformv2">
                    <FormItem prop="title" label="标　题：">
                        <Input :maxlength="50" v-model.trim="casekeepcreateform.title" placeholder="请输入标题名称"></Input>
                    </FormItem>
                    <FormItem prop="content" label="内　容：">
                        <Input v-model.trim="casekeepcreateform.content" type="textarea" :rows="3" placeholder="请输入跟进内容"></Input>
                    </FormItem>
                    <FormItem prop="startend" label="起止时间：">
                        <DatePicker
                            v-model="casekeepcreateform.startend"
                            :options="daterangeOptions"
                            type="datetimerange"
                            format="yyyy/MM/dd HH:mm:ss"
                            placeholder="请选择起止时间"
                            style="width: 100%;">
                        </DatePicker>
                    </FormItem>
                    <FormItem prop="remind" label="提醒时间：">
                        <Select v-model="casekeepcreateform.remind" placeholder="请选择提醒时间">
                            <Option v-if="option.time" v-for="option in timeOptions" :value="option.time" :key="option.time">{{ option.value }}</Option>
                        </Select>
                    </FormItem>
                </Form>
            </div>
            <div v-else class="casekeepitemwrap">
                <div v-for="(casekeep, index) in casekeeplist" class="casekeepitem">
                    <table style="width: 100%;">
                        <tr>
                            <td style="width: 100px;">标　　题：</td>
                            <td>
                                <span class="ckname">{{casekeep.title}}</span>
                                <div class="ckedit">
                                    <span @click="toEditCaseKeep(casekeep)"><img src="/static/icon/bizv2_penicon.png"></span>
                                    <span @click="toDelCaseKeep(casekeep, index)"><img src="/static/icon/bizv2_delicon.png"></span>
                                    <span><img src="/static/icon/bizv2_aticon.png"></span>
                                    <!-- <span><img src="/static/icon/bizv2_dayplanicon.png"></span> -->
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>内　　容：</td>
                            <td>{{casekeep.content}}</td>
                        </tr>
                        <tr v-if="casekeep.startend.length">
                            <td>起止时间：</td>
                            <td>{{casekeep.start}} 至 {{casekeep.end}}</td>
                        </tr>
                    </table>
                </div>
                <div v-if="!casekeeplist.length" class="nodatalistcry">
                    <img src="/static/icon/nodata_cry_icon.png">
                    <p>您还未添加任何案件跟进！</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';

export default {
    name: 'caseFlowKeep',
    components: { },
    props: {
        caseInfo: [Object],
        curflow: [Object],
    },
    data() {
        return {
            editstate: false,
            casekeeplist: [],
            casekeepcreateform: {
                recordid: '',   // 更新用到
                title: '',
                content: '',
                startend: [],
                remind:'',
            },
            ruleValidate: {
                title: [
                    { required: true, type: 'string', message: '请输入标题', trigger: 'blur' }
                ],
                content: [
                    { required: true, type: 'string', message: '请输入内容', trigger: 'blur' }
                ]
            },
            daterangeOptions: {
                disabledDate(date) {
                    return moment(date).isBefore(moment().subtract(1, 'day'))? true: false;
                },
            },
            timeOptions: [
                {time: '', value: ''},
                {time: 5*60, value: '5分钟'},
                {time: 10*60, value: '10分钟'},
                {time: 15*60, value: '15分钟'},
                {time: 30*60, value: '30分钟'},
                {time: 60*60, value: '1小时'},
                {time: 2*60*60, value: '两小时'},
                {time: 24*60*60, value: '1天'},
                {time: 2*24*60*60, value: '2天'}
            ],
        }
    },
    computed: {

    },
    beforeMount() {
        this.getFlowKeep();
    },
    methods: {
        getFlowKeep() {
            this.$ajax('get', this.$apiConfig.bizGroup.getCaseFlowKeep, {flowid: this.curflow.casefid}, (data) => {
                data.data.forEach(e => {
                    e.recordid = e.id;
                    e.start = e.start_at;
                    e.end = e.end_at;
                    if( e.start && e.end ){
                        e.startend = [e.start, e.end];
                    }else{
                        e.startend = [];
                    }
                });
                this.casekeeplist = data.data;
            });
        },
        saveFlowKeep(type) {
            if( type == 'save' ){
                this.$refs.casekeepcreateform.validate((valid) => {
                    if(valid) {
                        let url;
                        let str;
                        let params = {
                            title: this.casekeepcreateform.title,
                            content: this.casekeepcreateform.content,
                            remind: this.casekeepcreateform.remind,
                        };
                        if( this.casekeepcreateform.startend.length ){
                            params.start = moment(this.casekeepcreateform.startend[0]).format('YYYY-MM-DD HH:mm:ss');
                            params.end = moment(this.casekeepcreateform.startend[1]).format('YYYY-MM-DD HH:mm:ss');
                        }
                        if( this.casekeepcreateform.recordid ){
                            params.recordid = this.casekeepcreateform.recordid
                            url = this.$apiConfig.bizGroup.setCaseFlowKeep;
                            str = '成功修改跟进！';
                        }else{
                            params.caseid = this.caseInfo.caseid;
                            params.flowid = this.curflow.casefid;
                            url = this.$apiConfig.bizGroup.addCaseFlowKeep;
                            str = '成功添加跟进！';
                        }
                        this.$ajax('post', url, params, (data) => {
                            // 重置
                            if( this.casekeepcreateform.recordid ){
                                let ob = this.casekeeplist.filters(e => e.flowid == params.recordid);
                                ob = params;
                            }else{
                                this.getFlowKeep();
                            }
                            this.editstate = false;
                            this.casekeepcreateform = {
                                recordid: '',
                                title: '',
                                content: '',
                                startend: '',
                                remind:'',
                            };
                            this.$Message.success( str );
                        });
                    }
                })
            }else{
                this.editstate = false;
                this.casekeepcreateform = {
                    recordid: '',
                    title: '',
                    content: '',
                    startend: '',
                    remind:'',
                };
            }
        },
        toEditCaseKeep(o){
            this.casekeepcreateform = JSON.parse(JSON.stringify(o));
            this.editstate = true;
        },
        toDelCaseKeep(o, i){
            this.$Modal.confirm({
                title: '确认对话框',
                content: '确认删除此跟进吗？',
                onOk: () => {
                    this.$ajax('get', this.$apiConfig.bizGroup.delCaseFlowKeep, {recordid: o.recordid}, (data) => {
                        this.casekeeplist.splice(i, 1);
                        this.$Message.success( '删除成功！' );
                    });
                },
                onCancel: () => {
                    //this.$Message.info('点击了取消');
                }
            });
        },
    },
    watch: {

    },
    filters: {

    },
}
</script>
