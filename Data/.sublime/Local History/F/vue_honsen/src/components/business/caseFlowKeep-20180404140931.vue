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
            <span v-if="!editstate" class="edit"><Button @click="editstate = true" type="ghost" size="large">添 加</Button></span>
            <span v-else class="edit">
                <Dropdown @on-click="saveFlowKeep('cancel')" class="dropdown dropdowneditv2">
                    <Button @click="saveFlowKeep('save')" type="ghost" size="large">保 存</Button>
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
                        <Input v-model.trim="casekeepcreateform.startend" placeholder="请选择时间"></Input>
                    </FormItem>
                    <FormItem prop="remind" label="提醒时间：">
                        <Input v-model.trim="casekeepcreateform.remind" placeholder="请选择时间"></Input>
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
</template>

<script>
import moment from 'moment';

export default {
    name: 'caseFlowKeep',
    components: { },
    props: {
        caseInfo: [Object]
    },
    data() {
        return {
            editstate: false,
            casekeepcreateform: {
                title: '',
                content: '',
                startend: '',
                remind:'',
            },
            ruleValidate: {
                title: [
                    { required: true, type: 'string', message: '请输入标题', trigger: 'blur' }
                ]
            },
        }
    },
    computed: {

    },
    beforeMount() {
        console.log(1)
    },
    methods: {
        saveFlowKeep(type) {
            if( type == 'save' ){

            }else{

            }
        },
    },
    watch: {

    },
    filters: {

    },
}
</script>
