<style lang="stylus">
.shortNoteInfo
    //
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
