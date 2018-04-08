<template>
    <div class="followwrap">
        <vue-head></vue-head>
        <transition name="toogle">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import head from '@/components/follow/head'
import z_searchBox from '@/components/common/z-searchBox'

export default {
    name: 'followwrap',
    data () {
        return {

        }
    },
    beforeMount() {

    },
    computed: {

    },
    methods: {

    },
    components: {
        'vue-head': head
    },
    watch: {

    }
}
</script>

<style lang="stylus" scoped>
.followwrap
    padding-top: 0.84rem
</style>
