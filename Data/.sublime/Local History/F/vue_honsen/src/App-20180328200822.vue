<style scoped lang="stylus">
.layout
	position relative
	min-height 100%
	padding-top 60px
	background: #f0f6fe
	&.layoutbg1
		background: #ecf9ff
	&.have_footer
		padding-bottom 120px
.layout-footer
	position absolute
	bottom 0px
	width 100%
	height 43px
	line-height 43px
	text-align: center
	background-color #595959
	color: #fff
	font-size: 12px
	.copyright
		color: #b8b8b8
	a
		color: #fff
</style>

<template>
    <div class="layout" :class="{layoutbg1: this.$route.name == 'personalCenter',have_footer: this.$route.name != 'postEdit'}">
		<v-header></v-header>
		<keep-alive include="recommend">
			<router-view></router-view>
		</keep-alive>
        <div v-if="this.$route.name != 'postEdit'" class="layout-footer">
            <span class="copyright">©{{new Date().getFullYear()}} Honsen &nbsp;|</span>
            &nbsp; <a href="http://www.miitbeian.gov.cn" target="_blank">粤ICP备17098295号-2</a>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<!-- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;400-8888-666&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; --><a @click="$router.push({ name: 'aboutUs'})" href="javascript:;">关于弘商</a>
        </div>
		<v-sideBar v-if="$store.state.loginStatus"></v-sideBar>

		<videopage></videopage>

		<!-- 未绑定微信提示 -->
		<wechatTips></wechatTips>
	</div>
</template>

<script>
import header from '@/components/header/header';
import sideBar from '@/components/sideBar/sideBar';
import videopage from '@/components/videopage/videopage';
import wechatTips from '@/components/login/bindWechatTips';

export default {
	name: 'app',
	components: {
		'v-header': header,
		'v-sideBar': sideBar,
		videopage,
		wechatTips
	}
}
</script>

<style>

</style>
