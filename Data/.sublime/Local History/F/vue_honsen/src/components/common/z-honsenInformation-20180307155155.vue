<style lang="stylus">
@import '../../common/stylus/mixin.styl'
bgcolor = #64778a
activeColor = #3dc1ff

.z-honsenInformation
    position relative
    margin-top: 20px
    background #fff
    .header
        height 60px
        line-height 60px
        background bgcolor
        color #fff
        .left
            float left
            bgImg(200px, 60px, '/static/icon/login_active.png')
            background-position 15px center
            text-indent 46px
            font-size 18px
        .right
            float right
            margin-right 33px
            color #fff
            text-decoration underline
    .body
        margin 25px 90px 0
        padding-bottom 50px
        min-height 370px
        background #fff
        .ivu-tabs-tab
            color #666
            font-weight bold
        .ivu-tabs-tab-active
            color activeColor
        .item
            float left
            margin 0 2px
            position relative
            width 310px
            height 305px
            cursor pointer
            box-shadow 0 0 5px 0 rgba(0,0,0,0.2)
            border-radius: 3px
            &:nth-child(2)
                margin 0 40px
            &:hover
                box-shadow 0 0 5px 1px rgb(61,193,255)
            &.active
                transform: rotateY(180deg)
                transition: transform .5s
            .img
                width 100%
                height 188px
                border-radius: 3px
            .tit
                position absolute
                top 98px
                padding 0 25px
                width 310px
                height: 90px
                line-height: 124px
                font-size 15px
                color #fff
                background linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.4))
            .summary
                margin 10px 25px
                max-height 80px
                line-height 1.5
                color #777777
                font-size 13px
                ellipsis(4)
    .left_btn, .right_btn
        position absolute
        top 230px
        width 47px
        height 112px
        background #c4ecff
        text-align center
        cursor pointer
        &:hover
            background activeColor
        .ivu-icon
            line-height 112px
            color #fff
            font-size 50px
    .left_btn
        left 0px
    .right_btn
        right 0px
</style>

<template>
    <div class="z-honsenInformation">
        <div class="header clearfix">
            <div class="left">弘商官方信息</div>
            <a class="right" href="javascript:;" @click="toHongsenCenter">MORE+</a>
        </div>

        <Tabs class="body" v-model="curTag">
            <TabPane label="用户指引" name="guide">
                <div v-if="index >= curguidsidx && index < curguidsidx + 3" v-for="(post,index) in guides" :key="index" @click="toPost(post.pid)" :class="{ active: inactive}" class="item">
                    <img class="img" :src="`/static/img/honseninfo${index % 9}.png`">
                    <h3 class="tit single_ellipsis" :title="post.title">{{post.title}}</h3>
                    <div class="summary" v-html="post.summary"></div>
                </div>
            </TabPane>
            <TabPane label="精品知识" name="bestPost">
                <div v-if="index >= curbestPostsidx && index < curbestPostsidx + 3" v-for="(post,index) in bestPosts" :key="index" @click="toPost(post.pid)" class="item">
                    <img class="img" :src="`/static/img/honseninfo${(index % 12 + 9)}.png`">
                    <h3 class="tit single_ellipsis" :title="post.title">{{post.title}}</h3>
                    <div class="summary" v-html="post.summary"></div>
                </div>
            </TabPane>
        </Tabs>

        <div class="left_btn" @click="changecuridx(0)"><Icon type="ios-arrow-back"></Icon></div>
        <div class="right_btn" @click="changecuridx(1)"><Icon type="ios-arrow-forward"></Icon></div>
    </div>
</template>

<script>
export default {
    name: 'z-honsenInformation',
    data () {
        return {
            guides: [],
            bestPosts: [],
            curTag: 'guide',
            curguidsidx: 0,
            curbestPostsidx: 0,
            inactive: false,
            timer: null
        }
    },
    computed: {

    },
    beforeMount() {
        this.getGuides();
        this.getBestPost();
    },
    mounted() {

    },
    methods: {
        getGuides() {
            this.$ajax('get', '/post/userguide', (data) => {
                this.guides = data.data.data;
            });
        },
        getBestPost() {
            let param = {
                page: 1,
                perpage: 12
            };

            this.$ajax('get', '/post/highqualityposts', param, (data) => {
                this.bestPosts = data.data.data;
            });
        },
        toPost(pid) {
            this.$router.push({name: 'postRead', params: {read_pid: pid}});
        },
        toHongsenCenter() {
            this.$router.push({name: 'personalCenter', params: {id: honsenId}});
        },
        changecuridx(flag) {
            this.inactive = true;
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.inactive = false;
                if( !flag ){
                    if( this.curTag == 'guide' ){
                        this.curguidsidx = this.curguidsidx - 1 <= 0 ? 0 : this.curguidsidx - 1;
                    }
                    if( this.curTag == 'bestPost' ){
                        this.curbestPostsidx = this.curbestPostsidx - 1 <= 0 ? 0 : this.curbestPostsidx - 1;
                    }
                }else{
                    if( this.curTag == 'guide' ){
                        this.curguidsidx = this.curguidsidx + 1 >= this.guides.length - 3 ? this.guides.length - 3 : this.curguidsidx + 1;
                    }
                    if( this.curTag == 'bestPost' ){
                        this.curbestPostsidx = this.curbestPostsidx + 1 >= this.bestPosts.length - 3 ? this.bestPosts.length - 3 : this.curbestPostsidx + 1;
                    }
                }
            }, 260);
        }
    },
    filters: {

    },
    components: {

    }
}
</script>
