<style lang="stylus">
.caseFlowKeep
    //
</style>

<template>
    <div class="caseFlowKeep">
        <!-- 案件跟进 -->
        <div class="head">
            <span class="tit">案件跟进</span>
            <span v-if="1" class="edit"><Button type="ghost" size="large">添 加</Button></span>
            <span v-else class="edit">
                <Dropdown @on-click="navmenuClick" class="dropdown dropdowneditv2">
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
            casekeepcreateform: {
                ctmname: ''
            },
            ruleValidate: {
                ctmname: [
                    { required: true, type: 'string', message: '请输入客户名称', trigger: 'blur' }
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
        menuClick(name) {
            console.log(name)
        },
    },
    watch: {

    },
    filters: {

    },
}
</script>
