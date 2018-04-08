<style lang="stylus" scoped>
$active = #3dc1ff
.contextMenu
    position fixed
    z-index 10002
    background-color #fff
    box-shadow 0 0 10px rgba(0,0,0,0.2)
    padding 6px 0
    border-radius 3px
    .contextMenu_item
        height: 28px
        line-height: 28px
        padding: 0 19px
        color: #5c5c5c
        font-size: 13px
        cursor pointer
        &:hover
            background: $active
            color: #fff
            font-weight: bold
</style>

<template>
    <div v-show="showMenu" class="contextMenu" ref="link_contextmenu" v-clickoutside="hide">
        <slot></slot>
    </div>
</template>

<script>
import clickoutside from '@/common/directives/clickOutSide';

export default {
    name: 'contextMenu',
    data() {
        return {
            showMenu: false
        }
    },
    methods: {
        show(event) {
            let e = event || window.event;
            let dom = this.$refs.link_contextmenu;
            dom.style.left = e.clientX+'px';
            dom.style.top = e.clientY +'px';

            this.showMenu = true;
        },
        hide() {
            this.showMenu = false;
        }
    },
    directives: {
        clickoutside
    }
}
</script>