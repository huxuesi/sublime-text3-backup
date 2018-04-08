<style lang="stylus">
.aboutUs
    position: absolute
    top: 60px
    bottom: 43px
    left: 0
    right: 0
    overflow: hidden
    .radio_nav
        position: fixed
        z-index: 999
        left: 70px
        top: calc(50% - 84px)
        .radio
            margin-top 10px
            display block
            width: 14px
            height: 14px
            border-radius: 50%
            background: #adadad
            &.checked
                background: #ec6941
    .itemwrap
        position: absolute
        top: 0
        left: 0
        bottom: 0
        width: 100%
        transition: all 0.6s ease
    .item
        height: 100%
        width: 100%
        position: relative
        overflow: hidden
        background: #fff url('/static/img/aboutus1.png') no-repeat center
        background-size: 100% auto
        &.item1
            background-image: url('/static/img/aboutus1.png')
        &.item2
            background-image: url('/static/img/aboutus2.png')
        &.item3
            background-image: url('/static/img/aboutus3.png')
        &.item4
            background-image: url('/static/img/aboutus4.png')
        &.item5
            background-image: url('/static/img/aboutus5.png')
        &.item6
            background-image: url('/static/img/aboutus6.png')
        &.item7
            background-image: url('/static/img/aboutus7.png')
</style>

<template>
    <div class="aboutUs" @mousewheel.stop="handleMouseWheel($event)" @DOMMouseScroll.stop="handleMouseWheel($event)">
        <nav class="radio_nav">
            <a 
                v-for="n in 7"
                :key="n"
                @click="chk(n)" 
                class="radio"
                :class="{checked: n==curindex}"
                href="javascript:;"
                >
            </a>
        </nav>

        <div class="itemwrap" :style="{transform: `translateY(-${(curindex-1)*100}%)`}">
            <div class="item" v-for="n in 7" :key="n" :class="{['item' + n]: true}"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'aboutUs',
    data() {
        return {
            curindex: 1,
            page: 7,
            isscroll: true
        }
    },
    methods: {
        chk: function(index){
            this.curindex = index;
        },
        handleMouseWheel(event) {
            var value = event.wheelDelta || -event.detail;

            var delta = Math.max(-1, Math.min(1, value));

            if( this.isscroll ){
                this.isscroll = false

                // 下滚
                if(delta < 0 && this.curindex < this.page) {
                    this.curindex ++;
                }
                
                // 上滚
                if(delta >= 0 && this.curindex > 1) {
                    this.curindex --;
                }

                setTimeout(() => {
                    this.isscroll = true;
                }, 600)
            }
        }
    }
}
</script>
