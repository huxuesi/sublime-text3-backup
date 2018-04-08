import Vue from 'vue';
import axios from 'axios';
import router from './router.js';
import store from './vueX';

/* 把axios调用方式改为this.$http */
Vue.prototype.$http = axios;

/* 全局配置 */
axios.defaults.baseURL = imgUrl;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;

/* 请求拦截 */
axios.interceptors.request.use(config => {
    if (store.state.mineInfo) {
        config.headers.Cookie3 = store.state.mineInfo.cookie3 || '';
    }
    return config;
}, err => {
    return Promise.reject(err);
})

/* 响应拦截 */
axios.interceptors.response.use(res => {
    return res;
}, err => {
    if( err.response ) {
        switch( err.response.status ) {
            case 401:
                if (!err.response.request.responseURL.includes('/userinfo/mine')) {
                    window.location.href = '/login';
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
