<style lang="stylus" scoped>
$active = #3dc1ff
$notice = #ff7272
.calculation
    .side_cost,.side_lawyer_fee
        height 70px
        line-height 70px
        text-align center
        font-size 16px
        color #4d4d4d
        cursor pointer
        &.active
            background-color #fff
            color $active

    .mainTit_text
        line-height 53px
        text-indent 45px
        font-size 18px
        color #5b5b5b

    .tit_btn
        position relative
        height 54px
        line-height 54px
        text-align center
        font-size 16px
        color #fff
        cursor pointer
        background-color #85d8ff
        &.active
            background-color $active
        .triangle
            display block
            position absolute
            bottom -7px
            left 116px
            transform rotateX(180deg)

    .cost_count_wrap
        margin 34px 45px 0
        .money, .btn_wrap
            margin-top 20px
        .btn_wrap
            text-align center
            .gray_btn
                margin-left 20px
    .cost_result_wrap
        margin 30px 45px 0
        padding-top 20px
        border-top 1px solid #eee
        color #565656
        .cost_result_text
            float left
            width 120px
        .cost_result_content
            margin-left 120px
    .result_notice
        margin-top 10px
        font-size 12px
        color $notice
    .notice_color
        color $notice
        font-weight bold
    .notice
        color $notice
        font-size 12px
        font-weight normal
    .lawyer_fee_wrap
        .money
            margin-bottom 10px
        .w130
            width 130px
        .mt10
            margin-top 10px
        .mt20
            margin-top 20px
    .res_tip
        margin 15px 45px 0
        font-size 12px
        color #999
</style>

<template>
    <div class="calculation">
        <sideBase>
            <div slot="side">
                <div class="side_cost" @click="side_type = 'lawsuit_fee'" :class="{active: side_type == 'lawsuit_fee'}">诉讼费</div>
                <div class="side_lawyer_fee" @click="side_type = 'lawyer_fee'" :class="{active: side_type == 'lawyer_fee'}">律师费</div>
            </div>

            <div slot="mainTit">
                <div class="mainTit_text">律师助手</div>
            </div>

            <div slot="main">
                <div style="height: 467px; overflow-y: auto;">
                    <div v-show="side_type == 'lawsuit_fee'" class="cost_wrap">
                        <Row>
                            <Col span="12" class="tit_btn" :class="{active: lawsuit_type == 'accept'}">
                                <div @click="lawsuit_type = 'accept'">
                                    诉讼受理费
                                    <span v-show="lawsuit_type == 'accept'" class="triangle active"></span>
                                </div>
                            </Col>
                            <Col span="12" class="tit_btn" :class="{active: lawsuit_type == 'apply'}">
                                <div @click="lawsuit_type = 'apply'">
                                    诉讼申请费
                                    <span v-show="lawsuit_type == 'apply'" class="triangle active"></span>
                                </div>
                            </Col>
                        </Row>

                        <div class="cost_count_wrap">
                            <!-- 受理费选项 -->
                            <template v-if="lawsuit_type == 'accept'">
                                <Select v-model="curIdAccept" placeholder="---请选择诉讼受理费类型---">
                                    <Option v-for="accept in aLawsuitAccept" :key="accept.id" :value="accept.id">{{accept.val}}</Option>
                                </Select>
                                <Input
                                    v-show="curIdAccept && aLawsuitAccept[curIdAccept-1].input"
                                    class="money"
                                    v-model="lawsuitMoneyAccept"
                                    type="text"
                                    v-onlyNum
                                    placeholder="请输入数额（元）">
                                </Input>
                                <div class="btn_wrap">
                                    <Button type="info" @click="getLawsuitRes('Accept')">计 算</Button>
                                    <Button type="info" class="gray_btn" @click="resetLawsuit('Accept')">重 置</Button>
                                </div>
                            </template>

                            <!-- 申请费 -->
                            <template v-if="lawsuit_type == 'apply'">
                                <Select v-model="curIdApply" placeholder="---请选择诉讼申请费类型---">
                                    <Option v-for="apply in aLawsuitApply" :key="apply.id" :value="apply.id">{{apply.val}}</Option>
                                </Select>
                                <Input
                                    v-show="curIdApply && aLawsuitApply[curIdApply-1].input"
                                    class="money"
                                    v-model="lawsuitMoneyApply"
                                    type="text"
                                    v-onlyNum
                                    placeholder="请输入数额（元）">
                                </Input>
                                <div class="btn_wrap">
                                    <Button type="info" @click="getLawsuitRes('Apply')">计 算</Button>
                                    <Button type="info" class="gray_btn" @click="resetLawsuit('Apply')">重 置</Button>
                                </div>
                            </template>
                        </div>

                        <div class="cost_result_wrap">
                            <template v-if="lawsuit_type == 'accept'">
                                <div class="cost_result_text">
                                    计算结果（元）：
                                </div>
                                <div class="cost_result_content notice_color">
                                    {{lawsuitResAccept}}
                                    <span v-show="lawsuitResAccept" class="notice"> (仅作参考)</span>
                                </div>
                            </template>
                            <template v-if="lawsuit_type == 'apply'">
                                <div class="cost_result_text">
                                    计算结果（元）：
                                </div>
                                <div class="cost_result_content notice_color">
                                    {{lawsuitResApply}}
                                    <span v-show="lawsuitResApply" class="notice"> (仅作参考)</span>
                                </div>
                            </template>
                        </div>
                    </div>

                    <!-- <div v-show="side_type == 'lawyer_fee'" style="margin-top: 50px;text-align: center">开发中...</div> -->

                    <div v-show="side_type == 'lawyer_fee'" class="lawyer_fee_wrap">
                        <div class="cost_count_wrap">
                            <Select v-model="curSiteId" placeholder="---请选择所在地---">
                                <Option v-for="site in aLawyerFee" :key="site.id" :value="site.id">{{site.val}}</Option>
                            </Select>
                            <Select v-model="curMod" placeholder="---请选择收费类型---" class="mt20">
                                <Option value="ratio">按标的额比例收费</Option>
                                <Option value="piece">计件收费</Option>
                                <Option value="time">计时收费</Option>
                                <Option value="1" :disabled="true">风险代理</Option>
                            </Select>

                            <template v-if="curSiteId">
                                <div v-if="curMod == 'ratio'">
                                    <Input v-model="ratioMoney" class="money" type="text" placeholder="标的额（元）" v-onlyNum></Input>
                                    <Checkbox v-show="aLawyerFee[curSiteId-1].ratio.seriousMul > 1" @on-change="resLawyerFee = ''" v-model="aLawyerFee[curSiteId-1].ratio.isSerious">重大、疑难、复杂案件</Checkbox>
                                    <span v-show="aLawyerFee[curSiteId-1].ratio.seriousMul > 1" class="notice">（收费标准的{{aLawyerFee[curSiteId-1].ratio.seriousMul}}倍计算）</span>
                                </div>

                                <div v-if="curMod == '1'">
                                    <Input class="money" type="text" placeholder="基础费用" v-onlyNum></Input>
                                    <div>
                                        一审　
                                        <Input class="w130" type="text" placeholder="约定标的" v-onlyNum></Input>
                                        　X　
                                        <Input class="w130" type="text" placeholder="比例" v-onlyNum></Input>
                                        　%
                                    </div>
                                    <div style="margin-top: 10px">
                                        二审　
                                        <Input class="w130" type="text" placeholder="约定标的" v-onlyNum></Input>
                                        　X　
                                        <Input class="w130" type="text" placeholder="比例" v-onlyNum></Input>
                                        　%
                                    </div>
                                    <div class="result_notice">
                                        *风险代理收费金额不得高于收费合同约定标的的30%
                                    </div>
                                </div>

                                <Select v-if="curMod == 'piece'" v-model="curCase" placeholder="---请选择案件类型---" class="mt20">
                                    <Option v-for="oCase in aLawyerFee[curSiteId-1].piece.aCase" :key="oCase" :value="oCase">{{oCase}}</Option>
                                </Select>
                                <div v-if="curMod == 'piece'" class="mt10" v-show="aLawyerFee[curSiteId-1].piece.seriousMul > 1">
                                    <Checkbox @on-change="resLawyerFee = ''" v-model="aLawyerFee[curSiteId-1].piece.isSerious">重大、疑难、复杂案件</Checkbox>
                                    <span class="notice">（收费标准的{{aLawyerFee[curSiteId-1].piece.seriousMul}}倍计算）</span>
                                </div>

                                <div v-if="curMod == 'time'" class="mt20">
                                    <Input v-model="hourly" class="w130" type="text" placeholder="收费标准" v-onlyNum></Input>
                                     &nbsp;&nbsp;元/小时&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Input v-model="hours" class="w130" type="text" placeholder="工作时数" v-onlyNum></Input>
                                    &nbsp;&nbsp;小时
                                    <div v-if="aLawyerFee[curSiteId-1].time.guidePrice" class="result_notice">
                                        *政府指导价{{aLawyerFee[curSiteId-1].time.guidePrice}}元/小时（不满1小时请按1小时计算）
                                    </div>
                                    <div v-else class="result_notice">
                                        *暂无政府指导价（不满1小时请按1小时计算）
                                    </div>
                                </div>
                            </template>

                            <div class="btn_wrap">
                                <Button type="info" @click="getLawyerRes">计 算</Button>
                                <Button type="info" class="gray_btn" @click="resetLawyer">重 置</Button>
                            </div>
                        </div>

                        <div class="cost_result_wrap">
                            <div class="cost_result_text">
                                计算结果（元）：
                            </div>

                            <div v-if="curMod == 'piece'" class="cost_result_content piece_res" v-html="resLawyerFee"></div>
                            <div v-else class="cost_result_content notice_color" style="white-space: pre-line;">{{resLawyerFee}}<span v-show="resLawyerFee" class="notice"> (仅作参考)</span></div>
                        </div>

                        <div class="res_tip" v-show="resLawyerFee">*计算结果仅供参考！实际律师费会因时间、地区、案件复杂程度、律师负责程度等因素而不同。</div>
                    </div>
                </div>
            </div>
        </sideBase>
    </div>
</template>

<script>
import sideBase from './sideBase';
export default {
    name: 'calculation',
    components: {sideBase},
    data() {
        return {
            side_type: 'lawsuit_fee',
            lawsuit_type: 'accept',

            // 诉讼受理费数组(num为万元)
            aLawsuitAccept: [
                {id: 1, val: '财产案件', input: true,
                    fn: (num) => {
                        let aPres = [
                            {s: 0, e: 1, p: 0},
                            {s: 1, e: 10, p: 2.5},
                            {s: 10, e: 20, p: 2},
                            {s: 20, e: 50, p: 1.5},
                            {s: 50, e: 100, p: 1},
                            {s: 100, e: 200, p: 0.9},
                            {s: 200, e: 500, p: 0.8},
                            {s: 500, e: 1000, p: 0.7},
                            {s: 1000, e: 2000, p: 0.6},
                            {s: 2000, e: Number.POSITIVE_INFINITY, p: 0.5},
                        ];
                        return this.preUitl(num, aPres, 50) + '/件';

                    }
                },

                {id: 2, val: '离婚案件（不涉及财产分割）', input: false, fn() {return '50~300/件'}},

                {id: 3, val: '离婚案件（涉及财产分割）', input: true,
                    fn(num) {
                        let extra = (num - 20) * 10000 * 0.5 / 100;
                        return num > 20? `${extra + 50}~${extra + 300}/件`: '50~300/件';
                    }
                },

                {id: 4, val: '侵害人格案件（不涉及财产分割）', input: false, fn() {return '100~500/件'}},

                {id: 5, val: '侵害人格案件（涉及财产分割）', input: true,
                    fn:(num) => {
                        let aPres = [
                            {s: 0, e: 5, p: 0},
                            {s: 5, e: 10, p: 1},
                            {s: 10, e: Number.POSITIVE_INFINITY, p: 0.5},
                        ];
                        return `${this.preUitl(num, aPres, 100)}~${this.preUitl(num, aPres, 500)}/件`;
                    }
                },

                {id: 6, val: '其他非财产案件', input: false, fn() {return '50~100/件'}},

                {id: 7, val: '知识产权民事案件（没有争议金额或者价款）', input: false, fn() {return '500~1000/件'}},

                {id: 8, val: '知识产权民事案件（有争议金额或者价款）', input: true,
                    fn:(num) => {
                        let aPres = [
                            {s: 0, e: 1, p: 0},
                            {s: 1, e: 10, p: 2.5},
                            {s: 10, e: 20, p: 2},
                            {s: 20, e: 50, p: 1.5},
                            {s: 50, e: 100, p: 1},
                            {s: 100, e: 200, p: 0.9},
                            {s: 200, e: 500, p: 0.8},
                            {s: 500, e: 1000, p: 0.7},
                            {s: 1000, e: 2000, p: 0.6},
                            {s: 2000, e: Number.POSITIVE_INFINITY, p: 0.5},
                        ];
                        return `${this.preUitl(num, aPres, 50)}/件`;
                    }
                },
                {id: 9, val: '劳动争议案件', input: false, fn() {return '10/件'}},
                {id: 10, val: '行政案件（商标、专利、海事行政案件）', input: false, fn() {return '100/件'}},
                {id: 11, val: '行政案件（其他行政案件）', input: false, fn() {return '50/件'}},
                {id: 12, val: '管辖权异议不成立', input: false, fn() {return '50~100/件'}},
            ],
            curIdAccept: null,
            lawsuitMoneyAccept: '',

            // 诉讼申请费数组(num为万元)
            aLawsuitApply: [
                {id: 1, val: '申请执行（没有执行金额或者价额）', input: false, fn() {return '50~500/件'}},

                {id: 2, val: '申请执行（有执行金额或者价额）', input: true,
                    fn:(num) => {
                        let aPres = [
                            {s: 0, e: 1, p: 0},
                            {s: 1, e: 50, p: 1.5},
                            {s: 50, e: 500, p: 1},
                            {s: 500, e: 1000, p: 0.5},
                            {s: 1000, e: Number.POSITIVE_INFINITY, p: 0.1},
                        ];
                        return `${this.preUitl(num, aPres, 50)}/件`;
                    }
                },

                {id: 3, val: '申请保全（不涉及财产数额）', input: false, fn() {return '30/件'}},

                {id: 4, val: '申请保全（涉及财产数额）', input: true,
                    fn:(num) => {
                        let aPres = [
                            {s: 0, e: 0.1, p: 0},
                            {s: 0.1, e: 10, p: 1},
                            {s: 10, e: Number.POSITIVE_INFINITY, p: 0.5},
                        ];
                        let res = this.preUitl(num, aPres, 30);
                        return `${res > 5000? 5000: res}/件`;
                    }
                },

                {id: 5, val: '申请支付令', input: true,
                    fn:(num) => {
                        let aPres = [
                            {s: 0, e: 1, p: 0},
                            {s: 1, e: 10, p: 2.5},
                            {s: 10, e: 20, p: 2},
                            {s: 20, e: 50, p: 1.5},
                            {s: 50, e: 100, p: 1},
                            {s: 100, e: 200, p: 0.9},
                            {s: 200, e: 500, p: 0.8},
                            {s: 500, e: 1000, p: 0.7},
                            {s: 1000, e: 2000, p: 0.6},
                            {s: 2000, e: Number.POSITIVE_INFINITY, p: 0.5},
                        ];
                        return `${(this.preUitl(num, aPres, 50) / 3).toFixed(3)}/件`;
                    }
                },

                {id: 6, val: '申请公示催告', input: false, fn() {return '100/件'}},

                {id: 7, val: '申请撤销仲裁裁决', input: false, fn() {return '400/件'}},

                {id: 8, val: '申请认定仲裁协议效力', input: false, fn() {return '400/件'}},

                {id: 9, val: '破产案件', input: true,
                    fn:(num) => {
                        let aPres = [
                            {s: 0, e: 1, p: 0},
                            {s: 1, e: 10, p: 2.5},
                            {s: 10, e: 20, p: 2},
                            {s: 20, e: 50, p: 1.5},
                            {s: 50, e: 100, p: 1},
                            {s: 100, e: 200, p: 0.9},
                            {s: 200, e: 500, p: 0.8},
                            {s: 500, e: 1000, p: 0.7},
                            {s: 1000, e: 2000, p: 0.6},
                            {s: 2000, e: Number.POSITIVE_INFINITY, p: 0.5},
                        ];
                        let res = (this.preUitl(num, aPres, 50) / 2).toFixed(3);
                        return `${res > 300000? 300000: res}/件`;
                    }
                },
                {id: 10, val: '申请设立海事赔偿责任限制基金', input: false, fn() {return '1000~10000/件'}},
                {id: 11, val: '申请海事强制令', input: false, fn() {return '1000~5000/件'}},
                {id: 12, val: '申请船舶优先权催告', input: false, fn() {return '1000~5000/件'}},
                {id: 13, val: '申请海事债权登记', input: false, fn() {return '1000/件'}},
                {id: 14, val: '申请共同海损理算', input: false, fn() {return '1000/件'}},
            ],
            curIdApply: null,
            lawsuitMoneyApply: '',

            lawsuitResAccept: '',
            lawsuitResApply: '',

            // 律师费
            curSiteId: null,
            curMod: '', // 选择的计费方式
            curCase: '', // 选择的案件类型
            resLawyerFee: '',
            hours: '',
            hourly: '', // 小时费
            ratioMoney: '',
            aLawyerFee: [
                {
                    id: 1,
                    val: '北京市',
                    piece: {
                        isSerious: false,
                        seriousMul: 5,
                        aCase: ['刑事案件','民事诉讼案件','行政诉讼案件','国家赔偿案件'],
                        fn: (obj) => {
                            let json = {
                                '刑事案件': `<p>侦查阶段：${2000 * obj.seriousMul}~${15000 * obj.seriousMul}/件</p>
                                            <p>审查起诉阶段：${2000 * obj.seriousMul}~${15000 * obj.seriousMul}/件</p>
                                            <p>一审阶段	：${4000 * obj.seriousMul}~${45000 * obj.seriousMul}/件</p>
                                            `,
                                '民事诉讼案件': `<p>${3000 * obj.seriousMul}~${15000 * obj.seriousMul}/件</p>`,
                                '行政诉讼案件': `<p>${3000 * obj.seriousMul}~${15000 * obj.seriousMul}/件</p>`,
                                '国家赔偿案件': `<p>${3000 * obj.seriousMul}~${15000 * obj.seriousMul}/件</p>`,
                            };
                            return json[this.curCase];
                        },
                    },
                    time: {
                        guidePrice: '100~3000',
                    },
                    ratio: {
                        isSerious: false,
                        seriousMul: 5,
                        fn: (obj) => {
                            let aPres = [
                                {s: 0, e: 10, p: 10},
                                {s: 10, e: 100, p: 6},
                                {s: 100, e: 1000, p: 4},
                                {s: 1000, e: Number.POSITIVE_INFINITY, p: 2},
                            ];
                            let res =this.preUitl(obj.ratioMoney, aPres, 0) * obj.seriousMul;
                            let min = 3000 * obj.seriousMul;
                            return `${res < min?min: res}/件`;
                        },
                    }
                },
                {
                    id: 2,
                    val: '天津市',
                    piece: {
                        isSerious: false,
                        seriousMul: 5,
                        aCase: ['刑事案件','民事案件','各类诉讼案件的申诉'],
                        fn: (obj) => {
                            let json = {
                                '刑事案件': `<p>侦查阶段：0~${3000 * obj.seriousMul}/件</p>
                                            <p>审查起诉阶段：0~${3000 * obj.seriousMul}/件</p>
                                            <p>一审阶段	：0~${6000 * obj.seriousMul}/件</p>
                                            <p>二审阶段	：0~${6000 * obj.seriousMul}/件</p>
                                            `,
                                '民事案件': `<p>0~${5000 * obj.seriousMul}/件</p>`,
                                '各类诉讼案件的申诉': `<p>0~${5000 * obj.seriousMul}/件</p>`,
                            };
                            return json[this.curCase];
                        },
                    },
                    time: {
                        guidePrice: '500~3000',
                    },
                    ratio: {
                        isSerious: false,
                        seriousMul: 5,
                        fn: (obj) => {
                            let aPres = [
                                {s: 0, e: 10, p: 8},
                                {s: 10, e: 100, p: 6},
                                {s: 100, e: 1000, p: 4},
                                {s: 1000, e: Number.POSITIVE_INFINITY, p: 2},
                            ];
                            let res =this.preUitl(obj.ratioMoney, aPres, 0) * obj.seriousMul;
                            let min = 3000 * obj.seriousMul;
                            return `${res < min?min: res}/件`;
                        },
                    }
                },
                {
                    id: 3,
                    val: '广东省',
                    piece: {
                        isSerious: false,
                        seriousMul: 5,
                        aCase: ['刑事案件','公民请求涉及安全事故、环境污染、征地拆迁赔偿（补偿）等公共利益的群体性诉讼案件', '不涉及财产的民事、行政诉讼','国家赔偿案件'],
                        fn: (obj) => {
                            let json = {
                                '刑事案件': `<p>侦查阶段：${3000 * obj.seriousMul}~${30000 * obj.seriousMul}/件</p>
                                            <p>审查起诉阶段：${6000 * obj.seriousMul}~${50000 * obj.seriousMul}/件</p>
                                            <p>审判阶段：${6000 * obj.seriousMul}~${60000 * obj.seriousMul}/件</p>
                                            `,
                                '公民请求涉及安全事故、环境污染、征地拆迁赔偿（补偿）等公共利益的群体性诉讼案件': `<p>群体一方当事人每人${1000 * obj.seriousMul}~${20000 * obj.seriousMul}/件</p>`,
                                '不涉及财产的民事、行政诉讼': `<p>${3000 * obj.seriousMul}~${15000 * obj.seriousMul}/件</p>`,
                                '国家赔偿案件': ` <p>${3000 * obj.seriousMul}~${20000 * obj.seriousMul}/件</p>`,
                            };
                            return json[this.curCase];
                        },
                    },
                    time: {
                        guidePrice: '200~5000',
                    },
                    ratio: {
                        isSerious: false,
                        seriousMul: 5,
                        fn: (obj) => {
                            let aPres1 = [
                                {s: 0, e: 5, p: 0},
                                {s: 5, e: 10, p: 10},
                                {s: 10, e: 50, p: 8},
                                {s: 50, e: 100, p: 6},
                                {s: 100, e: Number.POSITIVE_INFINITY, p: 4},
                            ];
                            let res1 =this.preUitl(obj.ratioMoney, aPres1, 0) * obj.seriousMul;

                            let aPres2 = [
                                {s: 0, e: 5, p: 0},
                                {s: 5, e: 10, p: 10},
                                {s: 10, e: 50, p: 8},
                                {s: 50, e: 100, p: 6},
                                {s: 100, e: 500, p: 4},
                                {s: 500, e: 1000, p: 2},
                                {s: 1000, e: 5000, p: 1},
                                {s: 5000, e: Number.POSITIVE_INFINITY, p: 0.5},
                            ];
                            let res2 =this.preUitl(obj.ratioMoney, aPres2, 0) * obj.seriousMul;

                            return `民事诉讼、行政诉讼：${3000 * obj.seriousMul + res1}~${10000 * obj.seriousMul + res1}/件
                            公共利益的群体性诉讼案件：${3000 * obj.seriousMul + res2}~${10000 * obj.seriousMul + res2}/件`;
                        },
                    }
                },
                {
                    id: 4,
                    val: '山西省',
                    piece: {
                        isSerious: false,
                        seriousMul: 5,
                        aCase: ['刑事诉讼案件','民事、行政诉讼案件'],
                        fn: (obj) => {
                            let json = {
                                '刑事诉讼案件': `<p>侦查阶段：${2000 * obj.seriousMul}~${20000 * obj.seriousMul}/件</p>
                                            <p>审查起诉阶段：${2000 * obj.seriousMul}~${20000 * obj.seriousMul}/件</p>
                                            <p>审判阶段：${3500 * obj.seriousMul}~${35000 * obj.seriousMul}/件</p>
                                            `,
                                '民事、行政诉讼案件': `<p>${2000 * obj.seriousMul}~${20000 * obj.seriousMul}/件</p>`,
                            };
                            return json[this.curCase];
                        },
                    },
                    time: {
                        guidePrice: '200~3000',
                    },
                    ratio: {
                        isSerious: false,
                        seriousMul: 5,
                        fn: (obj) => {
                            let aPres = [
                                {s: 0, e: 10, p: 6},
                                {s: 10, e: 50, p: 5},
                                {s: 50, e: 100, p: 4},
                                {s: 100, e: 500, p: 3},
                                {s: 500, e: 1000, p: 2},
                                {s: 1000, e: 5000, p: 1.5},
                                {s: 5000, e: Number.POSITIVE_INFINITY, p: 1},
                            ];
                            let res =this.preUitl(obj.ratioMoney, aPres, 0) * obj.seriousMul;
                            let min = 2000 * obj.seriousMul;
                            return `${res < min? min: res}/件`;
                        },
                    }
                },
                {
                    id: 5,
                    val: '内蒙古自治区',
                    piece: {
                        isSerious: false,
                        seriousMul: 1,
                        aCase: ['刑事案件','民事、行政案件(不涉及财产关系)','各类诉讼案件的申诉'],
                        fn: (obj) => {
                            let json = {
                                '刑事案件': `<p>侦查阶段：A为500~1000/件;B为1001~3000/件;C为3001~5000/件。</p>
                                            <p>起诉阶段：A为500~1000/件;B为1001~3000/件;C为3001~5000/件。</p>
                                            <p>审判阶段：A为1000~5000/件;B为5001~10000/件;C为10001~20000/件。</p>
                                            `,
                                '民事、行政案件(不涉及财产关系)': `<p>A为1000~2000/件;B为2001~3000/件;C为3001~5000/件</p>
                                            `,
                                '各类诉讼案件的申诉': `<p>A为1000~2000/件;B为2001~3000/件;C为3001~5000/件</p>
                                            `,
                            };
                            return json[this.curCase] + '<p>（注：A为一般案件；B为比较复杂疑难案件；C为复杂疑难案件）</p>';
                        },
                    },
                    time: {
                        guidePrice: '100~2000',
                    },
                    ratio: {
                        isSerious: false,
                        seriousMul: 1,
                        fn: (obj) => {
                            let aPres1 = [
                                {s: 0, e: 1, p: 0},
                                {s: 1, e: 10, p: 6},
                                {s: 10, e: 50, p: 5},
                                {s: 50, e: 100, p: 4},
                                {s: 100, e: 500, p: 3},
                                {s: 500, e: 1000, p: 2},
                                {s: 1000, e: 5000, p: 1},
                                {s: 5000, e: Number.POSITIVE_INFINITY, p: 0.5},
                            ];
                            let res1 =this.preUitl(obj.ratioMoney, aPres1, 1000);

                            let aPres2 = [
                                {s: 0, e: 1, p: 0},
                                {s: 1, e: 10, p: 5},
                                {s: 10, e: 50, p: 4},
                                {s: 50, e: 100, p: 3},
                                {s: 100, e: 500, p: 2},
                                {s: 500, e: 1000, p: 1},
                                {s: 1000, e: 5000, p: 0.5},
                                {s: 5000, e: Number.POSITIVE_INFINITY, p: 0.5},
                            ];
                            let res2 =this.preUitl(obj.ratioMoney, aPres2, 1000);

                            let res = res1 == res2? res1: `${res2}~${res1}`;
                            return `${res}/件`;
                        },
                    }
                },
                {
                    id: 6,
                    val: '辽宁省',
                    piece: {
                        isSerious: false,
                        seriousMul: 1,
                        aCase: ['民事诉讼案件','代书法律事务文书','行政诉讼案件','各类诉讼案件申诉'],
                        fn: (obj) => {
                            let json = {
                                '民事诉讼案件': `<p>5000~30000/件（上浮不限）</p>`,
                                '代书法律事务文书': `<p>500~1000/件</p>`,
                                '行政诉讼案件': `<p>5000~30000/件（上浮不限）</p>`,
                                '各类诉讼案件申诉': `<p>5000~30000/件（上浮不超过150%）</p>`,
                            };
                            return json[this.curCase];
                        },
                    },
                    time: {
                        guidePrice: '300以上',
                    },
                    ratio: {
                        isSerious: false,
                        seriousMul: 1,
                        fn: (obj) => {
                            let min = 5000;
                            let aPres1 = [
                                {s: 0, e: 10, p: 10},
                                {s: 10, e: 50, p: 9},
                                {s: 50, e: 100, p: 8},
                                {s: 100, e: 500, p: 7},
                                {s: 500, e: 1000, p: 6},
                                {s: 1000, e: 2000, p: 5},
                                {s: 2000, e: 5000, p: 4},
                                {s: 5000, e: Number.POSITIVE_INFINITY, p: 3},
                            ];
                            let res1 =this.preUitl(obj.ratioMoney, aPres1, 0);
                            res1 = res1 < min?min: res1;

                            let aPres2 = [
                                {s: 0, e: 10, p: 8},
                                {s: 10, e: 50, p: 7},
                                {s: 50, e: 100, p: 6},
                                {s: 100, e: 500, p: 5},
                                {s: 500, e: 1000, p: 4},
                                {s: 1000, e: 2000, p: 3},
                                {s: 2000, e: 5000, p: 2},
                                {s: 5000, e: Number.POSITIVE_INFINITY, p: 1},
                            ];
                            let res2 =this.preUitl(obj.ratioMoney, aPres2, 0);
                            res2 = res2 < min?min: res2;

                            let res = (res2 == res1)? res1: `${res2}~${res1}`;
                            return `${res}/件（涉及到多语种可以按结果的2至4倍收费即：${res2*2}~${res1*4}/件）`;
                        },
                    }
                },
                {
                    id: 7,
                    val: '吉林省',
                    piece: {
                        isSerious: false,
                        seriousMul: 5,
                        aCase: ['民事诉讼案件','刑事诉讼案件','行政诉讼案件','国家赔偿案件','各类案件的申诉'],
                        fn: (obj) => {
                            let json = {
                                '民事诉讼案件': `<p>${3000 * obj.seriousMul}/件（可上浮50% ，下浮不限）</p>`,
                                '刑事诉讼案件': `<p>提供法律咨询：${200 * obj.seriousMul}/次</p>
                                               <p>侦查阶段（含申请取保候审）：${2000 * obj.seriousMul}/件</p>
                                               <p>审查起诉阶段：${3000 * obj.seriousMul}/件</p>
                                               <p>一审审判阶段：${5000 * obj.seriousMul}/件</p>
                                               <p>刑亊自诉案件和公诉案件被害人代理（不涉及财产关系）：${3000 * obj.seriousMul}/件</p>
                                               `,
                                '行政诉讼案件': `<p>${3000 * obj.seriousMul}/件（可上浮50%，下浮不限）</p>`,
                                '国家赔偿案件': `<p>${4000 * obj.seriousMul}/件（可上浮30%，下浮不限）</p>`,
                                '各类案件的申诉': `<p>${3000 * obj.seriousMul}/件（可上浮30%，下浮不限）</p>`,
                            };
                            return json[this.curCase];
                        },
                    },
                    time: {
                        guidePrice: '暂无政府指导价',
                    },
                    ratio: {
                        isSerious: false,
                        seriousMul: 5,
                        fn: (obj) => {
                            let aPres1 = [
                                {s: 0, e: 1, p: 0},
                                {s: 1, e: 10, p: 2},
                                {s: 10, e: 50, p: 1.7},
                                {s: 50, e: 100, p: 1.4},
                                {s: 100, e: 500, p: 0.7},
                                {s: 500, e: 1000, p: 0.4},
                                {s: 1000, e: Number.POSITIVE_INFINITY, p: 0.4},
                            ];
                            let res1 =this.preUitl(obj.ratioMoney, aPres1, 500) * obj.seriousMul;

                            let aPres2 = [
                                {s: 0, e: 1, p: 0},
                                {s: 1, e: 10, p: 5},
                                {s: 10, e: 50, p: 3.5},
                                {s: 50, e: 100, p: 2.8},
                                {s: 100, e: 500, p: 1.5},
                                {s: 500, e: 1000, p: 0.8},
                                {s: 1000, e: Number.POSITIVE_INFINITY, p: 0.4},
                            ];
                            let res2 =this.preUitl(obj.ratioMoney, aPres2, 1500) * obj.seriousMul;

                            return `${res1}~${res2}/件`;
                        },
                    }
                },
                {
                    id: 8,
                    val: '黑龙江',
                    piece: {
                        isSerious: false,
                        seriousMul: 5,
                        aCase: ['民事诉讼案件','刑事诉讼案件','行政诉讼案件','国家赔偿案件','代理申诉案件'],
                        fn: (obj) => {
                            let json = {
                                '民事诉讼案件': `<p>${3000 * obj.seriousMul}/件（可上浮30% ，下浮不限）</p>`,
                                '刑事诉讼案件': `<p>提供法律咨询：${200 * obj.seriousMul}/次</p>
                                               <p>侦查阶段（含检察院自侦）的代理申诉和控告（立案后另收费）申请取保候审：${1500 * obj.seriousMul}/件</p>
                                               <p>审查起诉阶段：${2000 * obj.seriousMul}/件</p>
                                               <p>一审审判阶段：${3000 * obj.seriousMul}/件</p>
                                               <p>刑亊自诉案件和公诉案件被害人代理（不涉及财产关系）：${3000 * obj.seriousMul}/件</p>
                                               <p>上述标准可根据实际情况上浮40%，下浮不限。</p>
                                               `,
                                '行政诉讼案件': `<p>${2500 * obj.seriousMul}/件（可上浮50%，下浮不限）</p>`,
                                '国家赔偿案件': `<p>${4000 * obj.seriousMul}/件（可上浮30%，下浮不限）</p>`,
                                '代理申诉案件': `<p>${3000 * obj.seriousMul}/件（可上浮30%，下浮不限）</p>`,
                            };
                            return json[this.curCase];
                        },
                    },
                    time: {
                        guidePrice: '暂无政府指导价',
                    },
                    ratio: {
                        isSerious: false,
                        seriousMul: 5,
                        fn: (obj) => {
                            let aPres1 = [
                                {s: 0, e: 2, p: 0},
                                {s: 2, e: 10, p: 4},
                                {s: 10, e: 50, p: 3},
                                {s: 50, e: 100, p: 5},
                                {s: 100, e: 500, p: 1},
                                {s: 500, e: 1000, p: 0.5},
                                {s: 1000, e: 5000, p: 0.25},
                                {s: 5000, e: Number.POSITIVE_INFINITY, p: 0},
                            ];
                            let res1 =this.preUitl(obj.ratioMoney, aPres1, 800) * obj.seriousMul;

                            let aPres2 = [
                                {s: 0, e: 2, p: 0},
                                {s: 2, e: 10, p: 4},
                                {s: 10, e: 50, p: 3},
                                {s: 50, e: 100, p: 5},
                                {s: 100, e: 500, p: 1},
                                {s: 500, e: 1000, p: 0.5},
                                {s: 1000, e: 5000, p: 0.25},
                                {s: 5000, e: Number.POSITIVE_INFINITY, p: 0.25},
                            ];
                            let res2 =this.preUitl(obj.ratioMoney, aPres2, 800) * obj.seriousMul;

                            let res = res1 == res2? res1: `${res1}~${res2}`;
                            return `${res}/件（以上费用可上浮30%，下浮不限）`;
                        },
                    }
                },
                {
                    id: 9,
                    val: '上海市',
                    piece: {
                        isSerious: false,
                        seriousMul: 5,
                        aCase: ['刑事诉讼案件', '不涉及财产关系的民事、行政诉讼和国家赔偿案件'],
                        fn: (obj) => {
                            let json = {
                                '刑事诉讼案件': `<p>法律咨询、代理申诉、控告、申请取保候审：${1500 * obj.seriousMul}~${10000 * obj.seriousMul}/件</p>
                                               <p>审查起诉阶段：${2000 * obj.seriousMul}~${10000 * obj.seriousMul}/件</p>
                                               <p>一审阶段：${3000 * obj.seriousMul}~${30000 * obj.seriousMul}/件</p>
                                               `,
                                '不涉及财产关系的民事、行政诉讼和国家赔偿案件': `<p>${3000 * obj.seriousMul}~${12000 * obj.seriousMul}/件</p>`,
                            };
                            return json[this.curCase];
                        },
                    },
                    time: {
                        guidePrice: '200~3000',
                    },
                    ratio: {
                        isSerious: false,
                        seriousMul: 5,
                        fn: (obj) => {
                            let min = 3000;
                            let aPres1 = [
                                {s: 0, e: 10, p: 8},
                                {s: 10, e: 100, p: 5},
                                {s: 100, e: 1000, p: 3},
                                {s: 1000, e: 10000, p: 1},
                                {s: 10000, e: Number.POSITIVE_INFINITY, p: 0.5},
                            ];
                            let res1 =this.preUitl(obj.ratioMoney, aPres1, 0) * obj.seriousMul;
                            res1 = res1 < min? min: res1;

                            let aPres2 = [
                                {s: 0, e: 10, p: 12},
                                {s: 10, e: 100, p: 7},
                                {s: 100, e: 1000, p: 5},
                                {s: 1000, e: 10000, p: 3},
                                {s: 10000, e: Number.POSITIVE_INFINITY, p: 1},
                            ];
                            let res2 =this.preUitl(obj.ratioMoney, aPres2, 0) * obj.seriousMul;
                            res2 = res2 < min? min: res2;

                            let res = res1 == res2? res1: `${res1}~${res2}`;
                            return `${res}/件`;
                        },
                    }
                },
                {
                    id: 10,
                    val: '江苏省',
                    piece: {
                        isSerious: false,
                        seriousMul: 5,
                        aCase: ['刑事案件', '民事案件', '行政诉讼、行政复议、国家赔偿案件'],
                        fn: (obj) => {
                            let json = {
                                '刑事案件': `<p>侦查阶段：${1000 * obj.seriousMul}~${8000 * obj.seriousMul}/件</p>
                                            <p>审查起诉阶段：${1500 * obj.seriousMul}~${10000 * obj.seriousMul}/件</p>
                                            <p>一审阶段：${3000 * obj.seriousMul}~${20000 * obj.seriousMul}/件</p>
                                            `,
                                '民事案件': `<p>${2500 * obj.seriousMul}~${10000 * obj.seriousMul}/件</p>`,
                                '行政诉讼、行政复议、国家赔偿案件': `<p>${2500 * obj.seriousMul}~${10000 * obj.seriousMul}/件</p>`,
                            };
                            return json[this.curCase];
                        },
                    },
                    time: {
                        guidePrice: '200~2500',
                    },
                    ratio: {
                        isSerious: false,
                        seriousMul: 5,
                        fn: (obj) => {
                            let aPres1 = [
                                {s: 0, e: 1, p: 0},
                                {s: 1, e: 10, p: 6},
                                {s: 10, e: 50, p: 5},
                                {s: 50, e: 100, p: 4},
                                {s: 100, e: 500, p: 3},
                                {s: 500, e: 1000, p: 2},
                                {s: 1000, e: 10000, p: 1},
                                {s: 10000, e: Number.POSITIVE_INFINITY, p: 0.5},
                            ];
                            let res1 =this.preUitl(obj.ratioMoney, aPres1, 2500) * obj.seriousMul;

                            let aPres2 = [
                                {s: 0, e: 1, p: 0},
                                {s: 1, e: 10, p: 7},
                                {s: 10, e: 50, p: 6},
                                {s: 50, e: 100, p: 5},
                                {s: 100, e: 500, p: 4},
                                {s: 500, e: 1000, p: 3},
                                {s: 1000, e: 10000, p: 2},
                                {s: 10000, e: Number.POSITIVE_INFINITY, p: 1},
                            ];
                            let res2 =this.preUitl(obj.ratioMoney, aPres2, 10000) * obj.seriousMul;

                            return `${res1}~${res2}/件`;
                        },
                    }
                },
                {
                    id: 11,
                    val: '浙江省',
                    piece: {
                        isSerious: false,
                        seriousMul: 5,
                        aCase: ['刑事案件', '民事诉讼案件', '行政诉讼、国家赔偿案件'],
                        fn: (obj) => {
                            let json = {
                                '刑事案件': `<p>侦查阶段：${1500 * obj.seriousMul}~${8000 * obj.seriousMul}/件</p>
                                            <p>审查起诉阶段：${1500 * obj.seriousMul}~${10000 * obj.seriousMul}/件</p>
                                            <p>一审阶段：${2500 * obj.seriousMul}~${25000 * obj.seriousMul}/件</p>
                                            `,
                                '民事诉讼案件': `<p>${2500 * obj.seriousMul}~${10000 * obj.seriousMul}/件</p>`,
                                '行政诉讼、国家赔偿案件': `<p>${2500 * obj.seriousMul}~${10000 * obj.seriousMul}/件</p>`,
                            };
                            return json[this.curCase];
                        },
                    },
                    time: {
                        guidePrice: '暂无政府指导价',
                    },
                    ratio: {
                        isSerious: false,
                        seriousMul: 5,
                        fn: (obj) => {
                            let min = 2500
                            let aPres1 = [
                                {s: 0, e: 10, p: 6},
                                {s: 10, e: 50, p: 5},
                                {s: 50, e: 100, p: 4},
                                {s: 100, e: 500, p: 3},
                                {s: 500, e: 1000, p: 2},
                                {s: 1000, e: Number.POSITIVE_INFINITY, p: 1},
                            ];
                            let res1 =this.preUitl(obj.ratioMoney, aPres1, 0) * obj.seriousMul;
                            res1 = res1 < min? min: res1;

                            let aPres2 = [
                                {s: 0, e: 10, p: 8},
                                {s: 10, e: 50, p: 6},
                                {s: 50, e: 100, p: 5},
                                {s: 100, e: 500, p: 4},
                                {s: 500, e: 1000, p: 3},
                                {s: 1000, e: Number.POSITIVE_INFINITY, p: 2},
                            ];
                            let res2 =this.preUitl(obj.ratioMoney, aPres2, 0) * obj.seriousMul;
                            res2 = res2 < min? min: res2;

                            let res = res1 == res2? res1: `${res1}~${res2}`;
                            return `${res}/件`;
                        },
                    }
                },
                {
                    id: 12,
                    val: '安徽省',
                    piece: {
                        isSerious: false,
                        seriousMul: 1,
                        aCase: ['刑事诉讼案件', '民事诉讼、行政诉讼和国家赔偿案件'],
                        fn: (obj) => {
                            let json = {
                                '刑事诉讼案件': `<p>侦查阶段：${1200 * obj.seriousMul}~${8000 * obj.seriousMul}/件</p>
                                            <p>审查起诉阶段：${1200 * obj.seriousMul}~${8000 * obj.seriousMul}/件</p>
                                            <p>审判阶段：${1200 * obj.seriousMul}~${15000 * obj.seriousMul}/件</p>
                                            `,
                                '民事诉讼、行政诉讼和国家赔偿案件': `<p>${1000 * obj.seriousMul}~${8000 * obj.seriousMul}/件</p>`,
                            };
                            return json[this.curCase];
                        },
                    },
                    time: {
                        guidePrice: '60~1200',
                    },
                    ratio: {
                        isSerious: false,
                        seriousMul: 1,
                        fn: (obj) => {
                            let aPres1 = [
                                {s: 0, e: 10, p: 0},
                                {s: 10, e: 50, p: 4},
                                {s: 50, e: 100, p: 3},
                                {s: 100, e: 500, p: 2},
                                {s: 500, e: 1000, p: 1},
                                {s: 1000, e: Number.POSITIVE_INFINITY, p: 1},
                            ];
                            let res1 =this.preUitl(obj.ratioMoney, aPres1, 1000) * obj.seriousMul;

                            let aPres2 = [
                                {s: 0, e: 10, p: 0},
                                {s: 10, e: 50, p: 6},
                                {s: 50, e: 100, p: 5},
                                {s: 100, e: 500, p: 4},
                                {s: 500, e: 1000, p: 3},
                                {s: 1000, e: Number.POSITIVE_INFINITY, p: 2},
                            ];
                            let res2 =this.preUitl(obj.ratioMoney, aPres2, 8000) * obj.seriousMul;

                            return `${res1}~${res2}/件`;
                        },
                    }
                },
                {
                    id: 13,
                    val: '福建省',
                    piece: {
                        isSerious: false,
                        seriousMul: 5,
                        aCase: ['刑事诉讼案件', '刑事自诉案件','担任被害人代理人','国家赔偿案件','各类诉讼案件'],
                        fn: (obj) => {
                            let json = {
                                '刑事诉讼案件': `<p>侦查阶段：${1000 * obj.seriousMul}~${5000 * obj.seriousMul}/件</p>
                                            <p>审查起诉阶段：${1000 * obj.seriousMul}~${6000 * obj.seriousMul}/件</p>
                                            <p>审判阶段：${1500 * obj.seriousMul}~${12000 * obj.seriousMul}/件</p>
                                            `,
                                '刑事自诉案件': `<p>${1500 * obj.seriousMul}~${10000 * obj.seriousMul}/件</p>`,
                                '担任被害人代理人': `<p>${1200 * obj.seriousMul}~${10000 * obj.seriousMul}/件</p>`,
                                '国家赔偿案件': `<p>${0 * obj.seriousMul}~${10000 * obj.seriousMul}/件</p>`,
                                '各类诉讼案件': `<p>${0 * obj.seriousMul}~${6000 * obj.seriousMul}/件</p>`,
                            };
                            return json[this.curCase];
                        },
                    },
                    time: {
                        guidePrice: '100~1200',
                    },
                    ratio: {
                        isSerious: false,
                        seriousMul: 5,
                        fn: (obj) => {
                            let aPres1 = [
                                {s: 0, e: 10, p: 0},
                                {s: 10, e: 50, p: 4},
                                {s: 50, e: 100, p: 3},
                                {s: 100, e: 500, p: 2},
                                {s: 500, e: 1000, p: 1.2},
                                {s: 1000, e: 5000, p: 0.7},
                                {s: 5000, e: Number.POSITIVE_INFINITY, p: 0.5},
                            ];
                            let res1 =this.preUitl(obj.ratioMoney, aPres1, 800) * obj.seriousMul;

                            let aPres2 = [
                                {s: 0, e: 10, p: 0},
                                {s: 10, e: 50, p: 4},
                                {s: 50, e: 100, p: 3},
                                {s: 100, e: 500, p: 2},
                                {s: 500, e: 1000, p: 1.2},
                                {s: 1000, e: 5000, p: 0.7},
                                {s: 5000, e: Number.POSITIVE_INFINITY, p: 0.5},
                            ];
                            let res2 =this.preUitl(obj.ratioMoney, aPres2, 6000) * obj.seriousMul;

                            return `${res1}~${res2}/件`;
                        },
                    }
                },
                {
                    id: 14,
                    val: '江西省',
                    piece: {
                        isSerious: false,
                        seriousMul: 3,
                        aCase: ['刑事案件', '民事、经济、行政案件','各类诉讼案件','解答法律咨询','制作法律事务文书'],
                        fn: (obj) => {
                            let json = {
                                '刑事案件': `<p>侦查阶段：${800 * obj.seriousMul}~${5000 * obj.seriousMul}/件</p>
                                            <p>审查起诉阶段：${800 * obj.seriousMul}~${5000 * obj.seriousMul}/件</p>
                                            <p>一审阶段：${1600 * obj.seriousMul}~${15000 * obj.seriousMul}/件</p>
                                            <p>未办一审而办二审的案件：${1000 * obj.seriousMul}~${10000 * obj.seriousMul}/件</p>
                                            <p>曾办一审又办二审的案件：${1000 * obj.seriousMul}~${5000 * obj.seriousMul}/件</p>
                                            `,
                                '民事、经济、行政案件': `<p>${1000 * obj.seriousMul}~${6000 * obj.seriousMul}/件</p>`,
                                '各类诉讼案件': `<p>${500 * obj.seriousMul}~${5000 * obj.seriousMul}/件</p>`,
                                '解答法律咨询': `<p>${10 * obj.seriousMul}~${100 * obj.seriousMul}/件</p>`,
                                '制作法律事务文书': `<p>${150 * obj.seriousMul}~${1500 * obj.seriousMul}/件</p>`,
                            };
                            return json[this.curCase];
                        },
                    },
                    time: {
                        guidePrice: '50~1000',
                    },
                    ratio: {
                        isSerious: false,
                        seriousMul: 3,
                        fn: (obj) => {
                            let aPres1 = [
                                {s: 0, e: 0.5, p: 0},
                                {s: 0.5, e: 10, p: 1.5},
                                {s: 10, e: 100, p: 1.2},
                                {s: 100, e: 500, p: 1},
                                {s: 500, e: 1000, p: 0.5},
                                {s: 1000, e: 5000, p: 0.2},
                                {s: 5000, e: Number.POSITIVE_INFINITY, p: 0.1},
                            ];
                            let res1 =this.preUitl(obj.ratioMoney, aPres1, 1000) * obj.seriousMul;

                            let aPres2 = [
                                {s: 0, e: 0.5, p: 0},
                                {s: 0.5, e: 10, p: 5},
                                {s: 10, e: 100, p: 4},
                                {s: 100, e: 500, p: 3},
                                {s: 500, e: 1000, p: 2},
                                {s: 1000, e: 5000, p: 1.5},
                                {s: 5000, e: Number.POSITIVE_INFINITY, p: 1},
                            ];
                            let res2 =this.preUitl(obj.ratioMoney, aPres2, 6000) * obj.seriousMul;

                            return `${res1}~${res2}/件`;
                        },
                    }
                },
                {
                    id: 15,
                    val: '山东省',
                    piece: {
                        isSerious: false,
                        seriousMul: 5,
                        aCase: ['刑事案件', '民事诉讼案件','行政诉讼案件和国家赔偿案件'],
                        fn: (obj) => {
                            let json = {
                                '刑事案件': `<p>侦查阶段：${1500 * obj.seriousMul}~${10000 * obj.seriousMul}/件</p>
                                            <p>审查起诉阶段：${2000 * obj.seriousMul}~${15000 * obj.seriousMul}/件</p>
                                            <p>审判阶段：${2500 * obj.seriousMul}~${25000 * obj.seriousMul}/件</p>
                                            `,
                                '民事诉讼案件': `<p>${2500 * obj.seriousMul}~${12000 * obj.seriousMul}/件</p>`,
                                '行政诉讼案件和国家赔偿案件': `<p>${2500 * obj.seriousMul}~${10000 * obj.seriousMul}/件</p>`,
                            };
                            return json[this.curCase];
                        },
                    },
                    time: {
                        guidePrice: '150~3000',
                    },
                    ratio: {
                        isSerious: false,
                        seriousMul: 5,
                        fn: (obj) => {
                            let aPres1 = [
                                {s: 0, e: 1, p: 0},
                                {s: 1, e: 10, p: 6},
                                {s: 10, e: 50, p: 5},
                                {s: 50, e: 100, p: 4},
                                {s: 100, e: 500, p: 3},
                                {s: 500, e: Number.POSITIVE_INFINITY, p: 0},
                            ];
                            let res1 =this.preUitl(obj.ratioMoney, aPres1, 2500) * obj.seriousMul;

                            let aPres2 = [
                                {s: 0, e: 1, p: 0},
                                {s: 1, e: 10, p: 9},
                                {s: 10, e: 50, p: 6},
                                {s: 50, e: 100, p: 5},
                                {s: 100, e: 500, p: 4},
                                {s: 500, e: Number.POSITIVE_INFINITY, p: 3},
                            ];
                            let res2 =this.preUitl(obj.ratioMoney, aPres2, 3000) * obj.seriousMul;

                            return `${res1}~${res2}/件`;
                        },
                    }
                },
                {
                    id: 16,
                    val: '河南省',
                    piece: {
                        isSerious: false,
                        seriousMul: 5,
                        aCase: ['刑事案件', '民事案件','行政案件和国家赔偿案件'],
                        fn: (obj) => {
                            let json = {
                                '刑事案件': `<p>侦查阶段：${3000 * obj.seriousMul}~${15000 * obj.seriousMul}/件</p>
                                            <p>审查起诉阶段：${5000 * obj.seriousMul}~${20000 * obj.seriousMul}/件</p>
                                            <p>一审案件：${5000 * obj.seriousMul}~${30000 * obj.seriousMul}/件</p>
                                            `,
                                '民事案件': `<p>${2000 * obj.seriousMul}~${10000 * obj.seriousMul}/件</p>`,
                                '行政案件和国家赔偿案件': `<p>${3000 * obj.seriousMul}~${20000 * obj.seriousMul}/件</p>`,
                            };
                            return json[this.curCase];
                        },
                    },
                    time: {
                        guidePrice: '100~3000',
                    },
                    ratio: {
                        isSerious: false,
                        seriousMul: 5,
                        fn: (obj) => {
                            let aPres1 = [
                                {s: 0, e: 10, p: 0},
                                {s: 10, e: 100, p: 3},
                                {s: 100, e: 1000, p: 2},
                                {s: 1000, e: 5000, p: 1},
                                {s: 5000, e: Number.POSITIVE_INFINITY, p: 0.5},
                            ];
                            let res1 =this.preUitl(obj.ratioMoney, aPres1, 3000) * obj.seriousMul;

                            let aPres2 = [
                                {s: 0, e: 10, p: 0},
                                {s: 10, e: 100, p: 5},
                                {s: 100, e: 1000, p: 4},
                                {s: 1000, e: 5000, p: 3},
                                {s: 5000, e: Number.POSITIVE_INFINITY, p: 2},
                            ];
                            let res2 =this.preUitl(obj.ratioMoney, aPres2, 5000) * obj.seriousMul;

                            return `${res1}~${res2}/件`;
                        },
                    }
                },
                {
                    id: 17,
                    val: '湖北省',
                    piece: {
                        isSerious: false,
                        seriousMul: 5,
                        aCase: ['一般刑事犯罪案件', '经济类犯罪、共同犯罪案件','民事诉讼案件','行政案件','各类诉讼案件'],
                        fn: (obj) => {
                            let json = {
                                '一般刑事犯罪案件': `<p>侦查阶段：${1000 * obj.seriousMul}~${5000 * obj.seriousMul}/件</p>
                                            <p>审查起诉阶段：${1000 * obj.seriousMul}~${5000 * obj.seriousMul}/件</p>
                                            <p>一审案件：${1000 * obj.seriousMul}~${10000 * obj.seriousMul}/件</p>
                                            `,
                                '经济类犯罪、共同犯罪案件': `<p>侦查阶段：${1000 * obj.seriousMul}~${10000 * obj.seriousMul}/件</p>
                                            <p>审查起诉阶段：${1000 * obj.seriousMul}~${10000 * obj.seriousMul}/件</p>
                                            <p>一审案件：${1500 * obj.seriousMul}~${15000 * obj.seriousMul}/件</p>
                                            `,
                                '民事诉讼案件': `<p>${600 * obj.seriousMul}~${8000 * obj.seriousMul}/件</p>`,
                                '行政案件': `<p>${500 * obj.seriousMul}~${8000 * obj.seriousMul}/件</p>`,
                                '各类诉讼案件': `<p>${500 * obj.seriousMul}~${8000 * obj.seriousMul}/件</p>`,
                            };
                            return json[this.curCase];
                        },
                    },
                    time: {
                        guidePrice: '100~2000',
                    },
                    ratio: {
                        isSerious: false,
                        seriousMul: 5,
                        fn: (obj) => {
                            let aPres1 = [
                                {s: 0, e: 10, p: 0},
                                {s: 10, e: 100, p: 1},
                                {s: 100, e: 500, p: 0.5},
                                {s: 500, e: 1000, p: 0.3},
                                {s: 1000, e: 5000, p: 0.2},
                                {s: 5000, e: Number.POSITIVE_INFINITY, p: 0.1},
                            ];
                            let res1 =this.preUitl(obj.ratioMoney, aPres1, 600) * obj.seriousMul;

                            let aPres2 = [
                                {s: 0, e: 10, p: 0},
                                {s: 10, e: 100, p: 5},
                                {s: 100, e: 500, p: 3},
                                {s: 500, e: 1000, p: 2},
                                {s: 1000, e: 5000, p: 1.5},
                                {s: 5000, e: Number.POSITIVE_INFINITY, p: 1},
                            ];
                            let res2 =this.preUitl(obj.ratioMoney, aPres2, 8000) * obj.seriousMul;

                            return `${res1}~${res2}/件`;
                        },
                    }
                },
                {
                    id: 18,
                    val: '河北省',
                    piece: {
                        isSerious: false,
                        seriousMul: 3,
                        aCase: ['刑事案件','民事、商事、行政诉讼案件','刑事附带民事'],
                        fn: (obj) => {
                            let json = {
                                '刑事案件': `<p>侦查阶段：${500 * obj.seriousMul}~${2000 * obj.seriousMul}/件</p>
                                            <p>审查起诉阶段：${800 * obj.seriousMul}~${3000 * obj.seriousMul}/件</p>
                                            <p>审判阶段：${1000 * obj.seriousMul}~${4000 * obj.seriousMul}/件</p>
                                            `,
                                '民事、商事、行政诉讼案件': `<p>${500 * obj.seriousMul}~${2000 * obj.seriousMul}/件</p>`,
                                '刑事附带民事': ` <p>其民事部分收费为${250 * obj.seriousMul}~${1000 * obj.seriousMul}/件</p>`,
                            };
                            return json[this.curCase];
                        },
                    },
                    time: {
                        guidePrice: '200~1000',
                    },
                    ratio: {
                        isSerious: false,
                        seriousMul: 3,
                        fn: (obj) => {
                            let aPres1 = [
                                {s: 0, e: 1, p: 0},
                                {s: 1, e: 10, p: 5},
                                {s: 10, e: 50, p: 4},
                                {s: 50, e: 100, p: 3},
                                {s: 100, e: 1000, p: 2},
                                {s: 1000, e: Number.POSITIVE_INFINITY, p: 1},
                            ];
                            let res1 =this.preUitl(obj.ratioMoney, aPres1, 2000) * obj.seriousMul;

                            let aPres2 = [
                                {s: 0, e: 1, p: 0},
                                {s: 1, e: 10, p: 4},
                                {s: 10, e: 50, p: 3},
                                {s: 50, e: 100, p: 2},
                                {s: 100, e: 1000, p: 1},
                                {s: 1000, e: Number.POSITIVE_INFINITY, p: 0.5},
                            ];
                            let res2 =this.preUitl(obj.ratioMoney, aPres2, 1500) * obj.seriousMul;

                            return `${res2}~${res1}/件`;
                        },
                    }
                },
                {
                    id: 19,
                    val: '湖南省',
                    piece: {
                        isSerious: false,
                        seriousMul: 5,
                        aCase: ['刑事案件', '国家赔偿案件'],
                        fn: (obj) => {
                            let json = {
                                '刑事案件': `<p>侦查阶段：${1000 * obj.seriousMul}~${10000 * obj.seriousMul}/件</p>
                                            <p>审查起诉阶段：${1000 * obj.seriousMul}~${10000 * obj.seriousMul}/件</p>
                                            <p>一审案件：${2000 * obj.seriousMul}~${20000 * obj.seriousMul}/件</p>
                                            <p>二审案件：${2000 * obj.seriousMul}~${30000 * obj.seriousMul}/件</p>
                                            <p>死刑复核阶段：${2000 * obj.seriousMul}~${20000 * obj.seriousMul}/件</p>
                                            <p>担任刑事自诉案件的原告或公诉案件被害人的代理人：${2000 * obj.seriousMul}~${20000 * obj.seriousMul}/件</p>
                                            `,
                                '国家赔偿案件': `<p>${1500 * obj.seriousMul}~${10000 * obj.seriousMul}/件</p>`,
                            };
                            return json[this.curCase];
                        },
                    },
                    time: {
                        guidePrice: '500~2000',
                    },
                    ratio: {
                        isSerious: false,
                        seriousMul: 5,
                        fn: (obj) => {
                            let aPres1 = [
                                {s: 0, e: 10, p: 0},
                                {s: 10, e: 50, p: 6},
                                {s: 50, e: 500, p: 4},
                                {s: 500, e: 2000, p: 2},
                                {s: 2000, e: 10000, p: 1},
                                {s: 10000, e: Number.POSITIVE_INFINITY, p: 0.5},
                            ];
                            let res1 =this.preUitl(obj.ratioMoney, aPres1, 3000) * obj.seriousMul;

                            let aPres2 = [
                                {s: 0, e: 10, p: 0},
                                {s: 10, e: 50, p: 8},
                                {s: 50, e: 500, p: 6},
                                {s: 500, e: 2000, p: 4},
                                {s: 2000, e: 10000, p: 1},
                                {s: 10000, e: Number.POSITIVE_INFINITY, p: 1},
                            ];
                            let res2 =this.preUitl(obj.ratioMoney, aPres2, 10000) * obj.seriousMul;

                            let aPres3 = [
                                {s: 0, e: 500, p: 4},
                                {s: 500, e: 2000, p: 3},
                                {s: 2000, e: 5000, p: 2},
                                {s: 5000, e: 10000, p: 1},
                                {s: 10000, e: Number.POSITIVE_INFINITY, p: 0.5},
                            ];
                            let res3 =this.preUitl(obj.ratioMoney, aPres3, 0) * obj.seriousMul;

                            let aPres4 = [
                                {s: 0, e: 500, p: 5},
                                {s: 500, e: 2000, p: 4},
                                {s: 2000, e: 5000, p: 3},
                                {s: 5000, e: 10000, p: 2},
                                {s: 10000, e: Number.POSITIVE_INFINITY, p: 1},
                            ];
                            let res4 =this.preUitl(obj.ratioMoney, aPres4, 0) * obj.seriousMul;

                            return `涉及财产关系的诉讼、仲裁案件：${res1}~${res2}/件
                            企业专项法律服务：${res3}~${res4}/件`;
                        },
                    }
                },

            ],
        }
    },
    watch: {
        curSiteId() {
            this.resLawyerFee = '';
        },
        curMod() {
            this.resLawyerFee = '';
        },
        hours() {
            this.resLawyerFee = '';
        },
        hourly() {
            this.resLawyerFee = '';
        },
        ratioMoney() {
            this.resLawyerFee = '';
        },
        curCase() {
            this.resLawyerFee = '';
        },
    },
    methods: {
        /*
            按区间返回价钱
            num -- 输入的金额（万元）
            aPres -- 区间信息
            minVal -- 基数（元） -- 少于一个特定值时的固定值 -- (不传或传0表示没有，即都按比例来算)
            返回显示的计算结果
        */
        preUitl(num, aPres, minVal) {
            // 计算每个区间价钱的公式函数
            let fnRes = function (start, end, pre) {
                return (end - start) * 10000 * pre / 100;
            }

            let curI = 0;
            aPres.forEach((val, index) => {
                if (num > val.s && num <= val.e) {
                    curI = index;
                }
            });

            // 每个区间的总价
            let aPreNums = aPres.map((val,index, arr) => {
                if (index == 0) {
                    return minVal? minVal: fnRes(val.s, val.e, val.p);
                } else if(index == arr.length-1) {
                    return 0;
                } else {
                    return fnRes(val.s, val.e, val.p);
                }
            });

            // 之前区间的和(在第一个区间时为0)
            let beforeSum = curI? aPreNums.reduce((temp, item, index) => {
                return index < curI? temp + item : temp;
            }) : 0;

            // 在本区间的费用
            let curPre = curI? fnRes(aPres[curI].s, num, aPres[curI].p): (minVal || fnRes(aPres[curI].s, num, aPres[curI].p))

            return (beforeSum + curPre).toFixed(3);
        },

        /*  */

        // 诉讼费
        getLawsuitRes(type) {
            if (!this[`curId${type}`]) {
                this.$Modal.warning({
                    title: '计算提示',
                    content: '请先选择类型'
                });
                return false;
            }

            let curItem = this[`aLawsuit${type}`][this[`curId${type}`] - 1];

            if (curItem.input && (!this[`lawsuitMoney${type}`] || /^\d(\.\d+)?$/.test(this[`lawsuitMoney${type}`]))) {
                this.$Modal.warning({
                    title: '计算提示',
                    content: '请先输入金额或金额有误'
                });
            } else {
                this[`lawsuitRes${type}`] = curItem.fn(this[`lawsuitMoney${type}`]/10000);
            }
        },
        resetLawsuit(type) {
            this[`curId${type}`] = null;
            this[`lawsuitRes${type}`] = '';
            this[`lawsuitMoney${type}`] = '';
        },

        // 律师费
        getLawyerRes() {
            if (!this.curSiteId) {
                this.$Modal.warning({
                    title: '计算提示',
                    content: '请先选择地区'
                });
                return false;
            }

            let curItem = this.aLawyerFee[this.curSiteId - 1];

            if (!this.curMod) {
                this.$Modal.warning({
                    title: '计算提示',
                    content: '请先选择收费类型'
                });
                return false;
            }

            if (this.curMod == 'ratio' && !this.ratioMoney) {
                this.$Modal.warning({
                    title: '计算提示',
                    content: '请先输入金额'
                });
                return false;
            }

            if (this.curMod == 'piece' && !this.curCase) {
                this.$Modal.warning({
                    title: '计算提示',
                    content: '请先选择案件类型'
                });
                return false;
            }

            if (this.curMod == 'time' && (!this.hourly || !this.hours)) {
                this.$Modal.warning({
                    title: '计算提示',
                    content: '请先输入小时价钱和时长'
                });
                return false;
            }

            let param = {
                ratioMoney: this.ratioMoney / 10000, // 转换为万元
                isSerious: curItem[this.curMod].isSerious,
                seriousMul: curItem[this.curMod].seriousMul,
                hours: this.hours,
                hourly: this.hourly
            };
            if (!param.isSerious) {
                param.seriousMul = 1;
            }

            if (this.curMod == 'time') {
                this.resLawyerFee = this.fnTime();
            } else {
                this.resLawyerFee = curItem[this.curMod].fn(param);
            }

        },
        fnTime() {
            return (this.hours * this.hourly).toFixed(3);
        },
        resetLawyer() {
            this.curSiteId = null;
            this.curMod = '';
            this.resLawyerFee = '';
            this.hours = '';
            this.hourly = '';
            this.ratioMoney = '';
            this.curCase = '';
            this.aLawyerFee.map(val => {
                val.piece.isSerious = false;
                val.time.isSerious = false;
                val.ratio.isSerious = false;
            });
        },
    }
}
</script>