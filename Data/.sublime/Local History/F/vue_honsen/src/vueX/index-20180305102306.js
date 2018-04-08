import Vue from 'vue'
import Vuex from 'vuex'
import {createRandom} from '@/common/js/createRandom'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        mineInfo: null,
        loginStatus: false,
        videopanel: false,
        recommendKey: createRandom(),
        /* 通知 */
        notifData: {}, // 当前推送来的通知
        readNotifs: false,
        /* 侧边栏的显示控制 */
        currentSide: '',
        schedureId: null,
        curcontactinfo: {},     // 当前聊天对象基本信息 id name
        singlechat: {},         // 当前接收的一条聊天信息
        chatread: {},
        headMenuKey: 1
    },
    getters: {
        /* 状态码拆分 4-30-0-1-0 */
        // 123表示vip
        auth_code_123(state) {
            return state.mineInfo && state.mineInfo.auth_code.toString().substring(0,3);
        },
        auth_code_1(state) {
            return state.mineInfo && state.mineInfo.auth_code.toString().substring(0,1);
        },
        auth_code_2(state) {
            return state.mineInfo && state.mineInfo.auth_code.toString().substring(1,3);
        },
        auth_code_3(state) {
            return state.mineInfo && state.mineInfo.auth_code.toString().substring(3,4);
        },
        auth_code_4(state) {
            return state.mineInfo && state.mineInfo.auth_code.toString().substring(4,5);
        },
        auth_code_5(state) {
            return state.mineInfo && state.mineInfo.auth_code.toString().substring(5,6);
        },
    },
    mutations: {
        rewriteMineInfo(state,data) {
            state.mineInfo = data;
        },
        /* 改变 mineInfo 中的一项*/
        changeMineInfo(state,keyvalueobj) {
            state.mineInfo[keyvalueobj.key] = keyvalueobj.value;
        },
        changeloginStatus(state,status) {
            state.loginStatus = status;
        },
        /*来的消息*/
        addNotiData(state, data) {
            state.notifData = data;
            state.readNotifs = false;
        },
        /*全部设置为已读(在消息页面时用)*/
        readAllNotifs(state) {
            state.readNotifs = true;
        },
        /* 侧边栏的显示 */
        setSide(state, name) {
            state.currentSide = state.currentSide == name?'': name;
        },
        showSchPanel(state) {
            state.currentSide = 'schedule';
        },
        addSchedure(state,data) {
            state.schedureId = data;
        },
        // 私信start
        // 改变当前聊天对象
        changeCurcontactInfo(state, data) {
            state.curcontactinfo = data;
        },
        changeSinglechat(state, data) {
            state.singlechat = data;
        },
        changeChatRead(state, data) {
            state.chatread = data;
        },
        // 私信end
        toggleVideo(state, data) {
            state.videopanel = data;
        },
        changeRecommendKey(state){
            state.recommendKey = createRandom();
        },
        changeHeadMenuKey(state) {
            state.headMenuKey += 1;
        }
    }
});