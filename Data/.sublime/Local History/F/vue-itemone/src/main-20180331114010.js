import config from './config'
import Vue from 'vue'
import App from './App'
import router from './router.js'
import store from './vueX'
import axios from './vueAxios.js'
import sockets from './vueSocket.js'

/*import fastclick from 'fastclick'
fastclick.attach(document.body)*/

// mint-ui
import { Loadmore, InfiniteScroll, Spinner, Popup, Tabbar, TabItem, Picker, Radio, Checklist } from 'mint-ui'
Vue.component(Loadmore.name, Loadmore)
Vue.use(InfiniteScroll)
Vue.component(Spinner.name, Spinner)
Vue.component(Popup.name, Popup)
Vue.component(Tabbar.name, Tabbar)
Vue.component(TabItem.name, TabItem)
Vue.component(Picker.name, Picker)
Vue.component(Radio.name, Radio)
Vue.component(Checklist.name, Checklist)

// 全屏预览图片
import viewer from 'v-viewer';
Vue.use(viewer);

// 引入公共样式
import 'normalize.css'
import '@/common/stylus/base.styl'

Vue.config.productionTip = false

/* auth_code转换成具体身份函数 */
import {authCodeT} from './common/js/authCodeT';
Vue.prototype.$authCodeT = authCodeT;
import {avatarHash} from './common/js/avatar';
Vue.prototype.$avatarT = avatarHash;

// 如果登录就获取用户信息
function getuserinfo(callback){
    axios.get('/userinfo/mine').then(response => {
        if( response.data.retcode == RETCODE_OK ){
            store.commit('addUserInfo', response.data.data)
            sockets(response.data.data.id)
        }else{
            console.log(response.data.errmsg)
        }
        if( callback ){
            callback()
        }
    }).catch(err => {
        if( err.response.status == 401 ){
            // window.location.href = apiurl + '/wechatpage?v=' + Math.random()
        }
        if( callback ){
            callback()
        }
    })
}

// init
getuserinfo(function(){
    new Vue({
        el: '#app',
        router,
        store,
        template: '<App/>',
        components: { App },
        data: {
            Bus: new Vue()
        }
    })
})
