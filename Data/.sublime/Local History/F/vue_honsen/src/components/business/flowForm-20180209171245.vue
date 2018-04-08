<style lang="stylus">
@import '../../common/stylus/mixin.styl'
.z-editForm
    .head
        position relative
        height: 44px
        line-height: 44px
        background: #f8f8f8
        padding: 0 0 0 25px
        color: #323232
        .closeeditform
            display: block
            font-size: 30px
            color: #b4c6d1
            line-height: 44px
            padding: 0 5px
            cursor: pointer
        .savetemp
            display: inline-block
            position: relative
            .savetempname
                position: absolute
                top: 6px
                right: 30px
                width: 200px
                .ivu-input-group-append
                    color: #fff
                    background-color: #00aeff
                    border-color: #00aeff
        .selectselectwrap
            margin: -2px 0 0 7px
            width: 278px
            .del_mod
                float right
                bgImg(17px,19px,('/static/icon/0020_.png'));
    .content
        position relative
        padding: 16px 27px
        min-height 200px
.editformmodal
    .ivu-modal-body, .ivu-modal-footer
        padding: 0 !important
        padding-bottom: 0 !important
</style>

<template>
    <Modal
        v-model="editformstate"
        :closable="false"
        :mask-closable="false"
        width="1146"
        :data-transfer="false"
        class-name="editformmodal">
        <div class="z-editForm floatpanel">
            <div class="editform">
                <div class="head clearfix">
                    <div style="float: left">
                        {{this.title}} &gt; 表单
                    </div>
                        
                    <div v-if="editable" style="float: right; margin-right: 50px">
                        <div class="savetemp">
                            <img @click="saveTemplateState = !saveTemplateState" title="保存为模板" style="vertical-align: middle; cursor: pointer;" src="/static/icon/businessformsave.png">
                            <div v-if='saveTemplateState' class="savetempname">
                                <Input v-model.trim="savetempname" placeholder="输入模板名"><Button @click="savetemp" slot="append" icon="checkmark-round"></Button></Input>
                            </div>
                        </div>
                        <Select v-model="selecttemname" @on-change="formTemplateChange" class="selectselectwrap" placeholder="选择模板">
                            <Option v-for="(list,index) in templateList" :value="list.id" :key="list.id">
                                {{list.name}}
                                <div class="del_mod" @click.stop="delMod(list,index)"></div>
                            </Option>
                        </Select>
                    </div>

                    <div  style="position: absolute; top: 0; right: 10px">
                        <Icon @click.native="closeEditForm" class="closeeditform" type="android-close"></Icon>
                    </div>
                </div>
                <div class="content">
                    <formTable ref="formTable" v-if="!isLoading" :data="tableData" @data="setTableData" :key="formTableKey" :editable="editable"></formTable>
                    <Spin size="large" fix v-if="isLoading">
                        <Icon type="load-c" size=18 class="spin-icon-load"></Icon>
                        <div>加载中...</div>
                    </Spin>
                </div>
            </div>
        </div>
        <div slot="footer"></div>
    </Modal>
</template>

<script>
import formTable from './formTable';

export default {
    name: 'flowForm',
    components: {formTable},
    data () {
        return {
            savetempname: '',
            templateList: [],
            selecttemname: '',
            selecttemname2: '',
            isLoading: true,
            saveTemplateState: false,
            editformstate: true,

            tableData: null,
            formTableKey: 0,
        }
    },
    props: {
        id: [String, Number],
        title: {
            type: String,
            default: '流程'
        },
        editable: {
            type: Boolean,
            default: false
        }
    },
    beforeMount() {
        this.getData();
        this.gettemp();
    },
    methods: {
        getData() {
            this.$ajax('get', `biz/flowsheet/${this.id}`, 'isLoading', data => {
                this.tableData = data.data[0].sheet || [];
            });
        },
      
        setTableData(data) {
            this.$http.post('biz/flowsheet/flow/add', { fid: this.id, content: data}).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    this.tableData = data;
                    this.$Message.success('保存成功！');
                    this.$emit('close', { isSave: true, closePanel: true, data: this.tableData});
                }else{
                    this.$Message.error( response.data.errmsg );
                }
            });
        },

        //模板相关
        delMod(mod, index) {
            this.$Modal.confirm({
                title: '确定框',
                content: '确定删除吗？',
                onOk: () => {
                    this.$http.post(`biz/flowsheet/model/del/${mod.id}`).then(response => {
                        if( response.data.retcode == RETCODE_OK ){
                            this.templateList.splice(index,1);
                        }else{
                            this.$Message.error( response.data.errmsg );
                        }
                    });
                },
            });
        },
        gettemp() {
            this.$http.get('biz/flowsheet/model/list').then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    this.templateList = response.data.data;
                }else{
                    this.$Message.error( response.data.errmsg );
                }
            }).catch(err => {});
        },
        savetemp() {
            if( this.savetempname == '' ){
                this.$Message.error( '模板名称不能为空！' );
                return false;
            }
            this.saveTemplateState = false;
            let name = this.savetempname;
            this.savetempname = '';
            let sendArr = this.$refs.formTable.exportTemp();
            this.$http.post('biz/flowsheet/model/add', { name: name, content: sendArr}).then(response => {
                if( response.data.retcode == RETCODE_OK ){
                    this.templateList.push({
                        id: response.data.id,
                        name: name,
                        content: sendArr
                    });
                    this.$Message.success( '模板保存成功！' );
                }else{
                    this.$Message.error( response.data.errmsg );
                }
            });
        },
        formTemplateChange(v) {
            this.$Modal.confirm({
                title: '确认对话框',
                content: '选择表单模板后将会覆盖该流程下现有的表单，确定吗？',
                onOk: () => {
                    this.selecttemname2 = v;
                    let str = JSON.parse(this.templateList.find((n) => n.id == v).content);
                    
                    this.tableData = str;
                    this.formTableKey++;
                },
                onCancel: () => {
                    this.selecttemname = this.selecttemname2;
                }
            });
        },
        closeEditForm() {
            if( this.$refs.formTable.exportData() !=  this.tableData){
                this.$Modal.confirm({
                    title: '确认对话框',
                    content: '存在未保存的表单数据，确定关闭吗？',
                    onOk: () => {
                        this.$emit('close', { isSave: false, closePanel: true});
                    }
                });
            }else{
                this.$emit('close', { isSave: false, closePanel: true})
            }
        }
    }
}
</script>
