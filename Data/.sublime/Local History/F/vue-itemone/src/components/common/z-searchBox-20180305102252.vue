<style lang="stylus">
.z-searchBox
    padding: 0.39rem 0 0.24rem
    .searchbox
        position: relative
        .searchipt
            width: 100%
            height: 0.68rem
            border: 1px solid #b4c6d1
            border-radius: 0.34rem
            padding: 0 1.18rem 0 0.45rem
            box-sizing: border-box
        .icon
            position: absolute
            top: 0
            right: 0
            width: 1.18rem
            line-height: 0.68rem
            text-align: center
            img
                position: relative
                top: -1px
                width: 0.38rem
                vertical-align: middle
</style>

<template>
    <div class="z-searchBox">
        <div class="searchbox appmiddlewrap">
            <input @keyup.enter="search" v-model.trim="keyword" type="search" :placeholder="placeholder" class="searchipt">
            <span @click="search" class="icon"><img src="/static/icon/earch_icon.png"></span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'z-searchBox',
    data () {
        return {
            placeholder: '',
            keyword: ''
        }
    },
    props: {
        type: {
            type: String,
            default: 'all'  // user post
        }
    },
    computed: {

    },
    beforeMount() {
        if( this.type == 'all' ){
            this.placeholder = '搜索知识、用户'
        }
        if( this.type == 'user' ){
            this.placeholder = '搜索用户'
        }
        if( this.type == 'post' ){
            this.placeholder = '搜索知识'
        }
        if( this.type == 'biz' ){
            this.placeholder = '搜索客户、业务'
        }
    },
    mounted() {

    },
    methods: {
        search() {
            if( this.keyword == '' ){
                return false
            }
            this.$router.push({ name: 'search', query: { type: this.type, word: this.keyword}})
        }
    },
    filters: {

    },
    components: {

    }
}
</script>
