<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'
.side_base
    position: fixed
    top: 250px
    right: 140px
    height: 520px
    background: #fff
    box-shadow: 0 0 10px rgba(0,0,0,0.3)
    border-radius 3px
    .side_wrap
        float left
        height 100%
        background-color #ededed
        border-right 1px solid #dcdcdc
        .tit
            height 53px
            border-bottom 1px solid #dcdcdc
            .nav_icon
                margin-left 15px
                bgImg(33px,53px,'/static/icon/0043.png')
                cursor pointer
            &.tit_close
                border-bottom: none
                .nav_icon
                    margin-left 0
                    width 50px
        .sideNav_wrap
            height 100%
            width 54px
            float left
            background-color #595959
            .tit
                border-bottom: none
                .nav_icon
                    margin-left 8px
                    bgImg(33px,53px,'/static/icon/0044.png')
        .sideContent_wrap
            width 232px
            float right
            height 100%
    .main_wrap
        float right
        height 100%
        width 490px
        .can_move_area
            height 53px
            cursor move
        .panel_close
            position absolute
            top 10px
            right 20px
            z-index 2
            .panel_close_icon
                font-size 26px
                color #b4c6d1
                cursor pointer
                &:hover
                    color #3dc1ff
</style>

<template>
    <div class="side_base clearfix" ref="movePanel">
        <div v-if="haveSide" class="side_wrap">
            <div v-if="haveSideNav" class="clearfix" style="height: 100%">
                <div class="sideNav_wrap">
                    <div class="tit">
                        <div class="nav_icon" @click="toggle"></div>
                    </div>
                    <slot name="sideNav"></slot>
                </div>
                <div v-show="isopen" class="sideContent_wrap">
                    <slot name="side"></slot>
                </div>
            </div>

            <!-- 没侧边导航 -->
            <div v-else>
                <div v-show="isopen" style="width: 286px">
                    <div class="tit">
                        <div class="nav_icon" @click="toggle"></div>
                    </div>
                    <slot name="side"></slot>
                </div>
                <div v-show="!isopen">
                    <div class="tit tit_close">
                        <div class="nav_icon" @click="toggle"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="main_wrap">
            <span class="panel_close"  @click="$store.commit('setSide','')">
                <Icon type="android-close" class="panel_close_icon"></Icon>
            </span>
            <div class="can_move_area" ref="barPanel" unselectable="on" onselectstart="return false;" style="-moz-user-select:none;">
                <slot name="mainTit"></slot>
            </div>
            <slot name="main"></slot>
        </div>

        <Spin size="large" fix v-if="spinShow">
            <Icon type="load-c" size=18 class="spin-icon-load"></Icon>
            <div>加载中...</div>
        </Spin>
    </div>
</template>

<script>
/*
    注：
    slot说明:  sideNav--侧边导航区,side--侧边内容区,mainTit-- 右边内容tit区,main--右边主内容区
    props: haveSideNav--是否有侧边导航（私信，跟进记录需要）
*/
import {startDrag} from '@/common/js/drag';
export default {
    name: 'sideBase',
    data() {
        return {
            isopen: true,
            spinShow: false,
        }
    },
    props: {
        haveSideNav: {
            type: Boolean,
            default: false
        },
        haveSide: {
            type: Boolean,
            default: true
        },
        initDragState: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        isopen(newval) {
            if (newval) {
                if (document.body.clientWidth - 777 < parseInt(this.$refs.movePanel.style.right)) {
                    this.$refs.movePanel.style.right = document.body.clientWidth - 777 + 'px';
                }
            }
            this.initDrag();
        },
    },
    activated() {
        this.initDrag();
    },
    mounted() {
        if( this.initDragState ){
            this.initDrag();
        }
        window.addEventListener('resize', () => {
            this.initDrag();
        }, false);
    },
    destroyed() {
        document.onmousemove = null;
        document.onmouseup = null;
    },
    methods: {
        initDrag() {
            this.$nextTick(() => {
                startDrag(this.$refs.barPanel, this.$refs.movePanel);
            });
        },
        setSpin(isShow) {
            this.spinShow = isShow;
        },
        toggle() {
            this.isopen = !this.isopen;
        }
    }
}
</script>