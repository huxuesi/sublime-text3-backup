<style lang="stylus">
.toolnav
    .toolnavitem
        width: 33.33%
        margin-bottom: 0.3rem
        text-align: center
</style>

<template>
    <div class="toolnav">
        <div class="appsmallwrap">
            <div v-for="n in 10" class="toolnavitem">
                <p class="img"><img src="/static/icon/personal_bianqian_icon.png"></p>
                <p class="name">便签</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'toolnav',
    data () {
        return {

        }
    },
    computed: {

    },
    beforeMount() {

    },
    mounted() {

    },
    methods: {

    },
    filters: {

    },
    components: {

    }
}
</script>
