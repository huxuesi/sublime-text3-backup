<style lang="stylus">
@import '../../common/stylus/mixin.styl'
.caseeditv2
    .caseedittophead
        button
            font-size: 14px
            color: #333
            background: #fff
            border-color: #e1e1e1
            img
                vertical-align: middle
                margin-right: 3px
    .caseeditmiddlewrap
        .centerhead
            height: 50px
            background: #64778a
            display: flex
            align-items: center
            justify-content: space-between
            .casename
                color: #fff
                font-size: 17px
</style>

<template>
    <div class="caseeditv2">
        <div class="caseedittophead">
            <div class="wrap1150">
                <Button type="default" size="large"><img src="/static/icon/bizinfoback_icon.png"> 返回列表</Button>
            </div>
        </div>
        <div class="caseeditmiddlewrap">
            <div class="centerhead">
                <span class="casename">案件名称案件名称名称</span>
                <span><Button type="info" size="large">添加流程</Button></span>
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
