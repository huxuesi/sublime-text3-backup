<style lang="stylus">
@import '../../common/stylus/mixin.styl'
/*.case_edit
    min-height: 322px
    position: relative*/
</style>

<template>
    <!-- <div v-if="caseId" class="case_edit">
        <div>
            <z_caseFlowWrap :id="caseId"></z_caseFlowWrap>
        </div>
    </div> -->
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
