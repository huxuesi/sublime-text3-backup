<style lang="stylus">
.toolnav
    padding: 0.8rem 0 0
    margin: 0 0.3rem
    .toolnavitem
        width: 33.33%
        margin-bottom: 0.4rem
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
        .name
            margin: 0.18rem 0 0
</style>

<template>
    <div class="toolnav clearboth">
        <div @click="$router.push({ name: 'shortNote'})" class="toolnavitem">
            <p class="img"><img src="/static/icon/personal_bianqian_icon.png"></p>
            <p class="name">便签</p>
        </div>
        <div @click="$router.push({ name: 'schedule'})" class="toolnavitem">
            <p class="img"><img src="/static/icon/personal_richeng_icon.png"></p>
            <p class="name">日程</p>
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
