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
    .caseeditmiddlecenter
        .centerhead
            height: 50px
            line-height: 50px
            background: #64778a
</style>

<template>
    <div class="caseeditv2">
        <div class="caseedittophead"><Button type="default" size="large"><img src="/static/icon/bizinfoback_icon.png"> 返回列表</Button></div>
        <div class="caseeditmiddlecenter">
            <div class="centerhead">

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
