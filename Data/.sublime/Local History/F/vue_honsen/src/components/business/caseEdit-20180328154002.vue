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
        .middleheadwrap
            background: #64778a
            .middlehead
                height: 50px
                display: flex
                align-items: center
                justify-content: space-between
            .casename
                color: #fff
                font-size: 17px
        .middlecenter
            background: #fff
            .caseinfowrap
                padding: 14px 0
                .caseinfoformwrap
                    padding: 17px 0 0 68px
                    color: #333
                    display: flex
                    // align-items: center
                    // justify-content: space-between
                    flex-wrap: wrap
                    .formitem1, .formitem2
                        span.itemtit
                            color: #999
                    .formitem1
                        height: 44px
                        line-height: 44px
                        width: 550px
                    .formitem2
                        height: 44px
                        line-height: 44px
                        width: 470px
            .intrustinfo
                padding: 14px 0
                .intrustinfoformwrap
                    padding: 17px 68px 0 68px
                    .content
                        max-height: 278px
                        overflow-y: auto
            .commoncaseinfohead
                height: 40px
                border-bottom: 1px solid #e1e1e1
                margin: 0 35px
                display: flex
                align-items: center
                justify-content: space-between
                .tit
                    color: #333
                    display: inline-block
                    width: 867px
                .author
                    display: inline-block
                    width: 123px
                    color: #999
</style>

<template>
    <div class="caseeditv2">
        <div class="caseedittophead">
            <Button type="default" size="large"><img src="/static/icon/bizinfoback_icon.png"> 返回列表</Button>
        </div>
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
                    <div class="caseinfowrap">
                        <div class="commoncaseinfohead caseinfohead">
                            <span class="tit">案件信息</span>
                            <span class="author">创建者：哈哈哈</span>
                            <span class="edit"><Button type="ghost">编 辑</Button></span>
                        </div>
                        <div class="caseinfoformwrap">
                            <div class="formitem1 ctmname"><span class="itemtit">客户名称：</span>弘商信息技术（深圳）有限公司</div>
                            <div class="formitem2 contact"><span class="itemtit">联系人：</span><Tag class="commontagwrapv2">标签一</Tag><Tag class="commontagwrapv2">标签一</Tag><Tag class="commontagwrapv2">标签一</Tag></div>
                            <div class="formitem1 casename"><span class="itemtit">案件名称：</span>案件名称案件名称名称</div>
                            <div class="formitem2 xiezuozhe"><span class="itemtit">协作者：</span><Tag class="commontagwrapv2">标签一</Tag><Tag class="commontagwrapv2">标签一</Tag><Tag class="commontagwrapv2">标签一</Tag></div>
                            <div class="formitem1 ctmbelong"><span class="itemtit">客户归属：</span>胡小燕</div>
                            <div class="formitem2 outvisiter"><span class="itemtit">外访者：</span><Tag class="commontagwrapv2">标签一</Tag><Tag class="commontagwrapv2">标签一</Tag><Tag class="commontagwrapv2">标签一</Tag></div>
                        </div>
                    </div>
                    <div class="intrustinfo">
                        <div class="commoncaseinfohead caseinfohead">
                            <span class="tit">案件信息</span>
                            <span class="author">创建者：哈哈哈</span>
                            <span class="edit"><Button type="ghost">编 辑</Button></span>
                        </div>
                        <div class="intrustinfoformwrap">
                            <div class="content">
                                民族自治地方的人民代表大会可以根据本法的原则，结合当地民族财产继承的具体情况，制定变通的或者补充的规定。自治区的规定，报全国人民代表大会常务委员会备案。自治州、自治县的规定，报省或者自治区的人民代表大会常务委员会批准后生效，并报全国人民代表大会常务委员会备案。 民族自治地方的人民代表大会可以根据本法的原则，结合当地民族财产继承的具体情况，制定变通的或者补充的规定。自治区的规定，报全国人民代表大会常务委员会备案。自治州、自治县的规定，报省或者自治区的人民代表大会常务委员会批准后生效，并报全国人民代表大会常务委员会备案。 民族自治地方的人民代表大会可以根据本法的原则，结合当地民族财产继承的具体情况，制定变通的或者补充的规定。自治区的规定，报全国人民代表大会常务委员会备案。自治州、自治县的规定，报省或者自治区的人民代表大会常务委员会批准后生效，并报全国人民代表大会常务委员会备案。 民族自治地方的人民代表大会可以根据本法的原则，结合当地民族财产继承的具体情况，制定变通的或者补充的规定。自治区的规定，报全国人民代表大会常务委员会备案。自治州、自治县的规定，报省或者自治区的人民代表大会常务委员会批准后生效，并报全国人民代表大会常务委员会备案。自治州、自治县的规定，报省或者自治区的人民代表大会常务委员会批准后生效，并报全国人民代表大会常务委员会备案。 民族自治地方的人民代表大会可以根据本法的原则，结合当地民族财产继承的具体情况，制定变通的或者补充的规定。自治区的规定，报全国人民代表大会常务委员会备案。自治州、自治县的规定，报省或者自治区的人民代表大会常务委员会批准后生效，并报全国人民代表大会常务委员会备案。自治州、自治县的规定，报省或者自治区的人民代表大会常务委员会批准后生效，并报全国人民代表大会常务委员会备案。 民族自治地方的人民代表大会可以根据本法的原则，结合当地民族财产继承的具体情况，制定变通的或者补充的规定。自治区的规定，报全国人民代表大民族自治地方的人民代表大会可以根据本法的原则，结合当地民族财产继承的具体情况，制定变通的或者补充的规定。自治区的规定，报全国人民代表大会常务委员会备案。自治州、自治县的规定，报省或者自治区的人民代表大会常务委员会批准后生效，并报全国人民代表大会常务委员会备案。 民族自治地方的人民代表大会可以根据本法的原则，结合当地民族财产继承的具体情况，制定变通的或者补充的规定。自治区的规定，报全国人民代表大会常务委员会备案。自治州、自治县的规定，报省或者自治区的人民代表大会常务委员会批准后生效，并报全国人民代表大会常务委员会备案。 民族自治地方的人民代表大会可以根据本法的原则，结合当地民族财产继承的具体情况，制定变通的或者补充的规定。自治区的规定，报全国人民代表大会常务委员会备案。自治州、自治县的规定，报省或者自治区的人民代表大会常务委员会批准后生效，并报全国人民代表大会常务委员会备案。 民族自治地方的人民代表大会可以根据本法的原则，结合当地民族财产继承的具体情况，制定变通的或者补充的规定。自治区的规定，报全国人民代表大会常务委员会备案。自治州、自治县的规定，报省或者自治区的人民代表大会常务委员会批准后生效，并报全国人民代表大会常务委员会备案。自治州、自治县的规定，报省或者自治区的人民代表大会常务委员会批准后生效，并报全国人民代表大会常务委员会备案。 民族自治地方的人民代表大会可以根据本法的原则，结合当地民族财产继承的具体情况，制定变通的或者补充的规定。自治区的规定，报全国人民代表大会常务委员会备案。自治州、自治县的规定，报省或者自治区的人民代表大会常务委员会批准后生效，并报全国人民代表大会常务委员会备案。自治州、自治县的规定，报省或者自治区的人民代表大会常务委员会批准后生效，并报全国人民代表大会常务委员会备案。 民族自治地方的人民代表大会可以根据本法的原则，结合当地民族财产继承的具体情况，制定变通的或者补充的规定。自治区的规定，报全国人民代表大
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'caseEdit',
    components: { },
    data() {
        return {
            caseId: null
        }
    },
    computed: {

    },
    watch: {

    },
    created() {
        this.caseId = Number(this.$route.params.caseid);
    },
    methods: {

    },
}
</script>
