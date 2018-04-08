<style lang="stylus">
.videopage_modal
    .ivu-modal-body
        padding 10px !important
    .ivu-modal-footer
        padding 0px !important
    .start
        width: 200px
        height: 200px
        position: absolute
        top: 50%
        left: 50%
        margin: -100px 0 0 -100px
        cursor: pointer
    .videopanel
        width: 100%
        height: 545px
    .close
        width: 54px
        height: 54px
        border-radius: 50%
        display: block
        position: absolute
        right: -46px
        top: -46px
        background: url('./close.png') no-repeat
</style>
<template>
    <Modal
        v-model="$store.state.videopanel"
        :closable="false"
        :mask-closable="false"
        width="967"
        class-name="videopage_modal">
        <a @click.stop="$store.commit('toggleVideo',false)" class="close" href="javascript:;"></a>
        <video
            v-if="$store.state.videopanel" class="videopanel" @click="togglePaly"
            src="//honsenflagstorage.oss-cn-hangzhou.aliyuncs.com/video/%E6%8A%9B%E7%89%A9%E7%BA%BF---%E5%BC%98%E5%95%86%E6%B3%95%E5%BE%8B%E8%BE%93%E5%87%BA%E6%9C%80%E7%BB%88%E6%A0%BC%E5%BC%8F%E6%A0%BC%E5%BC%8F%E5%B0%8F.mp4" controls="controls" poster="/static/img/vjpg.jpg" ref="oVideo" autoplay>
            您的浏览器不支持 video 标签。
        </video>
        <div slot="footer"></div>
    </Modal>
</template>

<script>
export default {
    name: 'videopage',
    computed: {
        isStop() {
            return this.$refs.oVideo && (this.$refs.oVideo.paused || this.$refs.oVideo.ended);
        }
    },
    methods: {
        togglePaly() {
            if (this.$refs.oVideo.paused || this.$refs.oVideo.ended) {
                this.$refs.oVideo.play();
            } else {
                this.$refs.oVideo.pause();
            }
        },
    }
}
</script>