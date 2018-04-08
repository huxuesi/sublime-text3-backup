<style lang="stylus">
.toolnav
    padding: 0.8rem 0 0
    .toolnavitem
        width: 33.33%
        margin-bottom: 0.3rem
        text-align: center
        float: left
        .img
            width: 1.44rem
            height: 1.44rem
            line-height: 1.44rem
            margin: 0 auto
            border: 1px solid #3dc1ff
            box-shadow: 0 0 18px #cbeeff
            border-radius: 50%
            img
                width: 0.59rem
                vertical-align: middle
</style>

<template>
    <div class="toolnav clearboth">
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
