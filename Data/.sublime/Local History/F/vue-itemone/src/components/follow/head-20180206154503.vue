<style lang="stylus" scoped>
.followhead
    position: fixed
    top: 0
    left: 0
    right: 0
    padding-bottom: 0
    z-index: 1000
    .headlist
        // box-shadow: 0 1px 15px #d8d8d8
        .item
            font-size: 0.32rem
            height: 0.84rem
            line-height: 0.84rem
            text-align: center
            color: #b4c6d1
            display: block
            float: left
            width: 50%
            background: #fff
            &.router-link-active
                color: #fff
                background: #3dc1ff
            span.number
                font-weight: normal
                background: #e46c1d
                border-radius: 0.16rem
                margin-left: 0.13rem
                padding: 0 0.09rem
                font-size: 0.23rem
</style>

<template>
    <div class="appwrap followhead">
        <div class="headlist clearboth">
            <router-link to="/follow" exact class="item" :class="{ 'router-link-active': this.$route.name == 'recommend'}">找律师</router-link>
            <router-link to="/follow/concern" class="item">已关注</router-link>
            <!-- <router-link to="/follow/contacts" class="item">消息<span class="number" v-if="num > 0">{{num}}</span></router-link> -->
        </div>
    </div>
</template>

<script>
export default {
    name: 'followhead',
    computed: {
        /*num() {
            let unreadnum = 0
            this.$store.state.contactslist.forEach((val, index) => {
                unreadnum = parseInt(unreadnum) + parseInt(val.unread_num)
            })
            return unreadnum > 99 ? '99+' : unreadnum
        }*/
    },
    beforeMount(){

    },
    methods: {

    }
}
</script>
