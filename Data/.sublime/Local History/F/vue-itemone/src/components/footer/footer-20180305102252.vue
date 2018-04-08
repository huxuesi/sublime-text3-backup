<style lang="stylus">
.footerwrap
    position: fixed
    bottom: 0
    padding-bottom: 0
    height: 55px
    z-index: 1003
    .mint-tabbar
        background-color: #fff
        box-shadow: 0 -1px 15px #d8d8d8
        & > .mint-tab-item.is-selected
            background-color: #fff
            .mint-tab-item-label
                color: #3dc1ff
        .mint-tab-item-label
            color: #b4c6d1
        .iconwrap
            position: relative
            img
                width: 100%
                height: 100%
$unread = 0.3rem
            .unreadnum
                position: absolute
                top: - $unread * 0.5
                right: - $unread * 0.5
                height: $unread
                line-height: $unread
                min-width: $unread
                background: #f00
                padding: 0 0.04rem
                font-size: 12px
                color: #fff
                border-radius: $unread * 0.5
</style>
<template>
    <div class="appwrap footerwrap clearboth">
        <mt-tabbar v-model="selected">
            <mt-tab-item v-for="list in navlist" @click.native="changeNav(list)" :id="list.id" :key="list.id">
                <div slot="icon" class="iconwrap">
                    <img v-if="list.id == selected" :src="list.icon_hover">
                    <img v-else :src="list.icon">
                    <div v-if="list.havedot && unReadNotif" class="unreadnum">{{unReadNotif}}</div>
                </div>
                {{list.name}}
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>

<script>
export default {
    name: 'feed',
    data () {
        return {
            selected: 'feed',
            navlist: [
                {
                    id: 'feed',
                    name: '动态',
                    icon: '/static/icon/home_icon.png',
                    icon_hover: '/static/icon/home_icon_.png',
                    params: {}
                },
                {
                    id: 'recommend',
                    name: '关注',
                    icon: '/static/icon/follow_icon.png',
                    icon_hover: '/static/icon/follow_icon_.png',
                    params: {}
                },
                {
                    id: 'notice',
                    name: '消息',
                    icon: '/static/icon/message_icon.png',
                    icon_hover: '/static/icon/message_icon_.png',
                    params: {},
                    havedot: true
                },
                {
                    id: 'personal',
                    name: '我的',
                    icon: '/static/icon/personal_icon.png',
                    icon_hover: '/static/icon/personal_icon_.png',
                    params: {
                        id: 'me'
                    }
                },
            ]
        }
    },
    computed: {
        unReadNotif(){
            return this.$store.state.unReadNotif
        }
    },
    beforeMount() {
        this.changeFootNav(this.$route.fullPath)
    },
    methods: {
        changeNav(list) {
            if( list.id == 'recommend' ){
                var u = navigator.userAgent
                if( !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ){
                    // ios
                    window.location.href = '/follow?v=' + Math.random()
                }else{
                    this.$router.push({ name: list.id, params: list.params})
                }
            }else{
                this.$router.push({ name: list.id, params: list.params})
            }
        },
        changeFootNav(name) {
            if( name.includes('/notice') ){
                this.selected = 'notice'
            }
            if( name.includes('/account') ){
                this.selected = 'personal'
            }
            if( name.includes('/follow') ){
                this.selected = 'recommend'
            }
            if( name.includes('/feed') ){
                this.selected = 'feed'
            }
        }
    },
    watch: {
        $route(to, from) {
            this.changeFootNav(to.fullPath)
        }
    }
}
</script>
