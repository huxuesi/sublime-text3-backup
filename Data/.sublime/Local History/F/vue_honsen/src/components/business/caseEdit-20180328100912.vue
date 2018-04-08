<style lang="stylus">
@import '../../common/stylus/mixin.styl'
/*.case_edit
    min-height: 322px
    position: relative*/
</style>

<template>
    <div class="caseeditv2">
        <div class="tophead"><Button type="default"><img src="/static/icon/bizinfoback_icon.png">返回列表</Button></div>
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
