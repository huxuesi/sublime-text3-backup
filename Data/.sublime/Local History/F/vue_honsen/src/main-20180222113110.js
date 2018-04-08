import './config';
import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import store from './vueX';
import router from './router.js';
import axios from './vueAxios.js';
import sockets from './vueSocket.js';

Vue.config.productionTip = false;

// 自定义指令
import scrollUnique from './common/directives/scrollUnique';
import onlyNum from './common/directives/onlyNum';
Vue.directive('scrollUnique', scrollUnique);
Vue.directive('onlyNum', onlyNum);

// 头像去缓存函数
import {avatarHash} from './common/js/avatar';
Vue.prototype.$avatarHash = avatarHash;

// auth_code转换成具体身份函数
import {authCodeT} from './common/js/authCodeT';
Vue.prototype.$authCodeT = authCodeT;

// 账号过期判断
import {isExpire} from './common/js/expire';
Vue.prototype.$isExpire = isExpire;

// ajax
import {ajax} from './common/js/ajax';
Vue.prototype.$ajax = ajax;

// 路由跳转
import {goTo} from './common/js/goTo';
Vue.prototype.$goto = goTo;

/* iview */
import './common/js/iview';

// 全屏预览图片
import viewer from 'v-viewer';
Vue.use(viewer);

import './common/stylus/base.styl';

/* 入口 */
function getMine(callback) {
	let mineURL = '/userinfo/mine';
	axios.get(mineURL).then((response) => {
        let data = response.data;
        if (data.retcode === RETCODE_OK) {
            store.commit('changeloginStatus', true);
			store.commit('rewriteMineInfo', data.data);
			sockets(data.data.id);
        }else{
            console.log(data.errmsg);
        }
        if(callback) callback();
    }).catch(error => {
        if(callback) callback();
	});
}

//init
getMine(function () {
	new Vue({
		el: '#app',
		store,
        router,
		template: '<App/>',
		components: { App }
	});
});
