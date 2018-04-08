import Vue from 'vue';
import axios from 'axios';
import store from './vueX';
import router from './router.js';
import jsonp from 'jsonp';

/* 把axios调用方式改为this.$http */
Vue.prototype.$http = axios;
Vue.prototype.$jsonp = jsonp;

/* 全局配置 */
axios.defaults.baseURL = apiurl;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;

/* 请求拦截 */
axios.interceptors.request.use(config => {
    /*config.headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };*/
    return config;
}, err => {
    return Promise.reject(err);
})

var axiosFirst = true

/* 响应拦截 */
axios.interceptors.response.use(res => {
    return res;
}, err => {
    if( err.response ) {
        switch( err.response.status ) {
            case 401:
                // 返回 401
                if( !axiosFirst ){
                    store.commit('changeGotoLogin', true)
                    axiosFirst = false
                }
                break;
            case 500:
                console.log('服务器端错误！');
                break;
        }
    }
    console.log(err.response);
    return Promise.reject(err);
});

export default axios;
