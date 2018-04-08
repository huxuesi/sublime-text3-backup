<style lang="stylus">
@import '../../common/stylus/mixin.styl'
.caseeditv2
    .caseedittophead
        button
            //
</style>

<template>
    <div class="caseeditv2">
        <div class="caseedittophead"><Button type="default" size="large"><img src="/static/icon/bizinfoback_icon.png">返回列表</Button></div>
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
