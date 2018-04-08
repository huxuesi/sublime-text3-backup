<style lang="stylus">
.recommend
    padding: 31px 0
</style>

<template>
    <div class="recommend appwrap">
        <z_recommend mode="recommendpage"></z_recommend>
        <z_honsenInformation></z_honsenInformation>
    </div>
</template>

<script>
import z_recommend from '@/components/common/z-recommend';
import z_honsenInformation from '@/components/common/z-honsenInformation';

export default {
    name: 'recommend',
    data () {
        return {

        }
    },
    beforeMount() {

    },
    mounted() {

    },
    methods: {

    },
    components: {
        z_recommend,
        z_honsenInformation
    }
}
</script>
