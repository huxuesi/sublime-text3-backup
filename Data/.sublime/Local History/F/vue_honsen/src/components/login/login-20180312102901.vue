<style lang="stylus">
@import '../../common/stylus/mixin.styl'
topheight = 480px

.login
    margin-top -60px
    padding-bottom: 60px
    .topwrap
        height: topheight
        .bannerlist
            width 100%
            position: absolute
            top: 0
            .banner
                height: topheight
                background-repeat: no-repeat
                background-position: center
        .imgbg
            position: absolute
            top: 0
            width 100%
            background: -webkit-linear-gradient(top, rgba(0,0,0,0.4), rgba(0,0,0,0))
            background: linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0))
            height: 150px
        .headimg
            float left
            position relative
            z-index 1
            margin: 39px 0 0 22px
            cursor: pointer
        .headright
            float right
            margin-top: 80px
        .logregwrap
            position: relative
            z-index: 3
    .middlewrap
        margin-top: 22px
    .bottomwrap
        //
</style>

<template>
    <div class="login">
        <div class="topwrap">
            <Carousel v-model="curbanner" class="bannerlist" autoplay :autoplay-speed="5000">
                <CarouselItem v-for="list in bannerList" :key="list">
                    <div class="banner" :style="{backgroundImage: 'url(' + list + ')'}"></div>
                </CarouselItem>
            </Carousel>
            <div class="imgbg"></div>

            <div class="appwrap logregwrap">
                <img class="headimg" src="/static/img/logo_login.png" @click="$store.commit('toggleVideo', true)">
                <loginRegister class="headright"></loginRegister>
            </div>
        </div>

        <div class="middlewrap appwrap">
            <z_recommend mode="loginpage"></z_recommend>
        </div>

        <div class="bottomwrap appwrap">
            <z_honsenInformation></z_honsenInformation>
        </div>
    </div>
</template>

<script>
import loginRegister from '@/components/common/z-loginRegister';
import z_recommend from '@/components/common/z-recommend';
import z_honsenInformation from '@/components/common/z-honsenInformation';

export default {
    name: 'login',
    components: {loginRegister, z_recommend, z_honsenInformation},
    data () {
        return {
            curbanner: 0,
            bannerList: [
                '/static/img/banner1.png',
                '/static/img/banner2.png',
                '/static/img/banner3.png'
            ]
        }
    },
    mounted() {
        // 账号封禁
        if (this.$route.query.errmsg == '1') {
            this.$Modal.error({
                title: '登陆错误提示',
                content: '您已经被禁止登陆！',
                onOk: () => {
                    window.location.replace(window.location.href.split('?')[0]);
                }
            });
        }
    }
}
</script>
