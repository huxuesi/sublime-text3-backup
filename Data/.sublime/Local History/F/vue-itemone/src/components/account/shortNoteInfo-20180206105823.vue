<style lang="stylus">
.shortNoteInfo
    .title
        font-size: 0.34rem
        color: #333
        border-bottom: 1px solid efefef
</style>

<template>
    <div class="shortNoteInfo">
        <div class="title">{{$store.state.curShortNoteInfo.title}}</div>
        <div class="content appsmallwrap">{{$store.state.curShortNoteInfo.content}}</div>
    </div>
</template>

<script>
export default {
    name: 'shortNoteInfo',
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
