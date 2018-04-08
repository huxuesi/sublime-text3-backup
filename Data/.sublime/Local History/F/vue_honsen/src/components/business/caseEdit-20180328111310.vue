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
                padding: 14px 0 0
                .commoncaseinfohead
                    height: 40px
                    border-bottom: 1px solid #e1e1e1
                    margin: 0 35px
                    display: flex
                    align-items: center
                    justify-content: space-between
                    .tit
                        font-size: 14px
                        color: #333
                .caseinfoformwrap
                    padding: 0 0 0 68px
                    .formitem
                        &.formitem1
                            width: 550px
                        &.formitem2
                            width: 470px
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
                            <div class="formitem1 ctmname">客户名称：弘商信息技术（深圳）有限公司</div>
                            <div class="formitem2 contact">联系人：132132132</div>
                            <div class="formitem1 casename">案件名称：案件名称案件名称名称</div>
                            <div class="formitem2 xiezuozhe">协作者：221121221</div>
                            <div class="formitem1 ctmbelong">客户归属：胡小燕</div>
                            <div class="formitem2 outvisiter">外访者：132132132132132</div>
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
